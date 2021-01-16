import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'
import CalendarDropdown from '../../../Components/Dropdown/CalendarDropdown'
import {API_URLS, getCapacityTimeData} from '../../../Api/pm/analysis'
import tempImage from '../../../Assets/Images/temp_machine.png'
import NoDataCard from '../../../Components/Card/NoDataCard'
import LineTable from "../../../Components/Table/LineTable";
import CustomPressListCard from "../../../Components/Custom/pm_analysis/CustomPressListCard";
import Notiflix from "notiflix";

Notiflix.Loading.Init({svgColor: "#1cb9df",});

interface Props {
    manufacturer_code: string
    machine_name: string
    machine_ton: string
    produce_output: string
    analyze: {
        times: string[],
        productions: number[],
        max_count: number[],
        uph: number[],
        mold_change: [][],
        error: [][],
        runtime: string[],
        stoptime: string[],
        advice: [][],
    }
}

const MachineInitData: Props = {
    manufacturer_code: '',
    machine_name: '',
    machine_ton: '',
    produce_output: '',
    analyze: {
        times: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        productions: [],
        max_count: [],
        uph: [],
        mold_change: [],
        error: [],
        runtime: [],
        stoptime: [],
        advice: []
    }
}

const CustomCapacity = () => {


    const ChartInitOptions = {
        chart: {
            type: ['line', 'line', 'bar'],
            toolbar: {
                show: false
            },
            events: {
                click: function (chart, w, e) {
                    if (-1 < e.dataPointIndex && e.dataPointIndex < 24) {
                        if (e.dataPointIndex > 9) {
                            getDetail(e.dataPointIndex)
                        } else {
                            getDetail('0' + e.dataPointIndex.toString())
                        }
                    }
                    // if (-1 < e.dataPointIndex && e.dataPointIndex < 24) {
                    //     const runtime = machineData.analyze.runtime.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] !== null ? machineData.analyze.runtime.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] : ''
                    //     const stoptime = machineData.analyze.stoptime.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] !== null ? machineData.analyze.stoptime.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] : ''
                    //
                    //     setErrorLog(machineData.analyze.error.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] !== null ? machineData.analyze.error.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] : [])
                    //     setMoldLog(machineData.analyze.mold_change.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] !== null ? machineData.analyze.mold_change.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] : [])
                    //     setTimeLog([{runtime: runtime, stoptime: stoptime}])
                    //     const temp = machineData.analyze.advice.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] !== null ? machineData.analyze.advice.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] : []
                    //
                    //     setAdvice(temp)
                    // }
                },
            }
        },
        plotOptions: {
            column: {
                columnWidth: '55%',
                distributed: false
            }
        },
        stroke: {
            width: [2, 2, 0]
        },
        grid: {
            borderColor: '#42444b',
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
        },
        fill: {
            type: ['solid', 'solid', 'gradient'],
            gradient: {
                type: 'vertical',
                shadeIntensity: 0,
                opacityFrom: 1,
                opacityTo: .20,
                stops: [0, 100]
            }
        },
        colors: ['#bfbfbf', '#d8bf00', '#dd4bbe'],
        dataLabels: {
            enabled: false
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'right',
        },
        tooltip: {
            x: {
                show: false
            },
            y: {
                formatter: (i) => {
                    return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '개'
                }
            }
        },
        xaxis: {
            categories: [
                '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
            ],
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        }
    }

    const times: string[] = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    const [series, setSeries] = useState<{ name: string, data: number[], max: number, type: string }[]>([{
        name: 'value1',
        data: MachineInitData.analyze.uph,
        max: 0,
        type: 'line'
    }, {
        name: 'value1',
        data: MachineInitData.analyze.max_count,
        max: 0,
        type: 'line'
    }, {
        name: 'value1',
        data: MachineInitData.analyze.productions,
        max: 0,
        type: 'line'
    }])
    const [pressList, setPressList] = useState<IPressMachineType[]>([])
    const [materialList, setMaterialList] = useState<any[]>([])
    const [selectMaterial, setSelectMaterial] = useState<string>('All')

    const [advice, setAdvice] = useState<string[]>(['', ''])
    const [totalProduction, setTotalProduction] = useState<string>()
    const [avgProduction, setAvgProduction] = useState<string>()

    const [errorIndex, setErrorIndex] = useState({error_content: '에러 상태'})

    const [errorLog, setErrorLog] = useState<any[]>([])

    const [timeIndex, setTimeIndex] = useState({runtime: '가동시간'})

    const [timeLog, setTimeLog] = useState<any[]>([])

    const [moldIndex, setMoldIndex] = useState({mold_name: '금형 교체'})

    const [moldLog, setMoldLog] = useState<any[]>([])

    const [selectMachine, setSelectMachine] = useState<string>('')

    const [machineData, setMachineData] = useState<Props>(MachineInitData)

    const [selectDate, setSelectDate] = useState<string>(moment().subtract(1, 'days').format('YYYY-MM-DD'))

    /**
     * getData()
     * 생산량 분석 데이터 로드
     * @param {string} pk 프레스 pk
     * @param {string} date 요청 날짜
     * @returns X
     */
    const getData = useCallback(async () => {
        if (selectMachine !== '') {
            Notiflix.Loading.Circle()
            const tempUrl: any = await `${API_URLS['capacity'].load3}?pk=${selectMachine}&date=${selectDate}&material_pk=${selectMaterial}`
            const resultData = await getCapacityTimeData(tempUrl)
            if (resultData) {
                let tmp: number[] = []
                times.map((v, i) => {
                    let listIndex = machineData.analyze.times.indexOf(v)
                    if (listIndex !== -1) {
                        tmp.push(resultData.analyze.productions[listIndex])
                    } else {
                        tmp.push(0)
                    }
                })


                let tmpSPM: number[] = []

                times.map((v, i) => {
                    let listIndex = machineData.analyze.times.indexOf(v)
                    if (listIndex !== -1) {
                        tmpSPM.push(resultData.analyze.max_count[listIndex])
                    } else {
                        tmpSPM.push(0)
                    }
                })

                let tmpUPH: number[] = []

                times.map((v, i) => {
                    let listIndex = machineData.analyze.times.indexOf(v)
                    if (listIndex !== -1) {
                        tmpUPH.push(resultData.analyze.uph[listIndex])
                    } else {
                        tmpUPH.push(0)
                    }
                })

                let tmpMax = maxData(Math.max.apply(null, tmp))

                let tmpSPMMax = maxData(Math.max.apply(null, tmpSPM))

                let tmpUPHMax = maxData(Math.max.apply(null, tmpUPH))

                const AddComma = (num) => {
                    let tmpNum = num.toString().split('.')
                    let regexp = /\B(?=(\d{3})+(?!\d))/g
                    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
                }

                setAvgProduction(AddComma(resultData.analyze.avg_produce))
                setTotalProduction(AddComma(resultData.analyze.total_produce))

                setSeries([
                    {
                        name: 'UPH',
                        data: tmpUPH,
                        max: tmpUPHMax,
                        type: 'line'
                    }, {
                        name: 'SPM 최대 생산 가능량',
                        data: tmpSPM,
                        max: tmpSPMMax,
                        type: 'line'
                    }, {
                        name: '생산량',
                        data: tmp,
                        max: tmpMax,
                        type: 'column'
                    }])
            }
            setErrorLog([])
            setTimeLog([])
            setMoldLog([])
            setAdvice([])

            Notiflix.Loading.Remove()
        }
    }, [selectMachine, machineData, series, selectDate, selectMaterial])


    const getDetail = useCallback(async (hour) => {
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['capacity'].detail}?pk=${selectMachine}&date=${selectDate}&material_pk=${selectMaterial}&hour=${hour}`
        const resultData = await getCapacityTimeData(tempUrl)
        if (resultData) {
            setAdvice(resultData.advice[0] !== null ? resultData.advice : [])
            setErrorLog(resultData.error)
            setMoldLog(resultData.mold_change[0])
            setTimeLog([{runtime: resultData.runtime, stoptime: resultData.stoptime, error_range: ''}])
        }
        Notiflix.Loading.Remove()
    }, [selectMachine, selectDate, selectMaterial])

    const getList = useCallback(async () => {
        const tempUrl = `${API_URLS['pressList'].list}`
        const resultData = await getCapacityTimeData(tempUrl)

        setPressList(resultData)

    }, [])


    const getMaterialList = useCallback(async () => {
        if (selectMachine !== '') {
            const tempUrl = `${API_URLS['capacity'].list}?pk=${selectMachine}&date=${selectDate}`
            const resultData = await getCapacityTimeData(tempUrl)

            setMaterialList(resultData)
        }
    }, [selectDate, selectMachine])

    const moldIndexList = {
        mold: {
            mold_name: '금형 교체',
            start_time: '교체 시작 시간',
            end_time: '교체 완료 시간'
        }
    }


    const errorIndexList = {
        error: {
            error_content: '에러 상태',
            start_time: '에러 발생 시간',
        }
    }

    const timeIndexList = {
        time: {
            runtime: '가동시간',
            stoptime: '비가동시간',
            error_range: '오차범위 ±0.03%'
        }
    }


    const maxData = (x) => {
        return (x % 10000) ? x - x % 10000 + 10000 : x + 10000
    }

    useEffect(() => {
        getList()
        // getData()
        setMoldIndex(moldIndexList["mold"])
        setErrorIndex(errorIndexList["error"])
        setTimeIndex(timeIndexList['time'])
    }, [])

    useEffect(() => {
        getData()
        setAdvice([])
        setErrorLog([])
        setMoldLog([])
        setTimeLog([])
        setSelectMaterial('All')
        getMaterialList()
    }, [selectMachine, selectDate])

    useEffect(() => {
        getData()
    }, [selectMaterial])

    return (
        <div>
            <div style={{marginTop: 42, marginBottom: 19}}>
                <p style={{fontSize: 22, fontWeight: 'bold', textAlign: 'left'}}>프레스 생산량</p>
            </div>
            <CustomPressListCard pressList={pressList} selectMachine={selectMachine}
                                 onClickMachine={setSelectMachine} height={'827px'}/>
            {
                machineData.machine_name !== '' && <div>

                </div>
            }
            {
                selectMachine !== ''
                    ? <ChartDetailBox>
                        <div style={{marginTop: 25}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{
                                    float: 'left',
                                    display: 'inline-block',
                                    width: '210px',
                                }}>
                                    <p style={{
                                        textAlign: 'left',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>{machineData.machine_name}</p>
                                </div>
                                <p style={{marginRight: 10, marginBottom: 2}}>품목 :</p>
                                <select style={{
                                    width: '195px',
                                    height: '28px',
                                    borderRadius: 5,
                                    backgroundColor: '#353b48',
                                    color: '#ffffff',
                                    paddingLeft: 10,
                                }} onChange={(e) => setSelectMaterial(e.target.value)}>
                                    <option value={'All'} key={`All`}>전체</option>
                                    {
                                        materialList.map((v, i) => {
                                            return (
                                                <option value={v.material_pk}
                                                        key={`${v.material_pk}machine${i}`}>{v.material_name}</option>
                                            )
                                        })}
                                </select>
                                <CalendarDropdown type={'single'} select={selectDate}
                                                  onClickEvent={async (i) => setSelectDate(i)}/>
                            </div>
                        </div>
                        <div style={{
                            width: 640,
                            height: 699,
                            backgroundColor: '#111319',
                            margin: 0,
                            borderRadius: "6px",
                            padding: 0,
                            clear: 'both',
                            marginTop: 20
                        }}>
                            <ReactApexChart options={{
                                ...ChartInitOptions,
                                yaxis: {
                                    min: 0,
                                    max: Math.round(Math.max.apply(null, series[1].data) * 1.1) + 100,
                                    tickAmount: 25,
                                    labels: {
                                        formatter: (value, index) => {
                                            if (Math.round(value) === Math.round(Math.max.apply(null, series[1].data) * 1.1) + 100) {
                                                return '(생산량)'
                                            } else {
                                                if (index % 5 === 0) {
                                                    return Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                } else {
                                                    return
                                                }
                                            }

                                        }
                                    }
                                }
                            }} series={series} height={'40%'}/>
                            <div style={{display: 'flex'}}>
                                <p style={{
                                    textAlign: 'left',
                                    marginLeft: '20px',
                                    width: '310px',
                                    fontFamily: 'NotoSansCJKkr-bold',
                                    fontSize: '14px',
                                }}>총 생산 갯수: {totalProduction}</p>
                                <p style={{
                                    textAlign: 'left',
                                    fontFamily: 'NotoSansCJKkr-bold',
                                    fontSize: '14px',
                                }}>생산 시간당 평균 갯수: {avgProduction}</p>
                            </div>
                            <p style={{
                                textAlign: 'left',
                                marginLeft: '20px',
                                fontFamily: 'NotoSansCJKkr-bold',
                                fontSize: '14px',
                            }}>개선 방안: {advice[0]}</p>
                            <p style={{
                                textAlign: 'left',
                                marginLeft: '82px',
                                fontFamily: 'NotoSansCJKkr-bold',
                                fontSize: '14px',
                            }}>{advice[1]}</p>
                            <div style={{marginLeft: '20px'}}>
                                <LineTable
                                    contentTitle={errorIndex}
                                    settingHeight={"80px"}
                                    contentList={errorLog}>
                                    <Line/>
                                </LineTable>
                                <LineTable
                                    contentTitle={timeIndex}
                                    settingHeight={"40px"}
                                    contentList={timeLog}>
                                    <Line/>
                                </LineTable>
                                <LineTable
                                    contentTitle={moldIndex}
                                    settingHeight={"40px"}
                                    contentList={moldLog}>
                                    <Line/>
                                </LineTable>
                            </div>
                        </div>
                    </ChartDetailBox>
                    : <ChartDetailBox>
                        <NoDataCard contents={'기계를 선택해 주세요'} height={684} color={'#353b48'}/>
                    </ChartDetailBox>
            }
        </div>
    )
}

const ChartListBox = Styled.div`
    display: inline-block;
    width: 340px;
    height: 724px;
    padding: 0 21px 0 29px;
    background-color: #353b48;
    border-radius: 6px;
    float: left;
    overflow-y:scroll;
`

const ChartDetailBox = Styled.div`
    display: inline-block;
    width: 640px;
    height: 824px;
    padding: 0 25px 0 25px;
    background-color: #353b48;
    border-radius: 6px;
    float: left;
    margin-left: 20px;
    .apexcharts-tooltip{
        color: black;
    }
`

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`


export default CustomCapacity

