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

interface Props {
    manufacturer_code: string
    machine_name: string
    machine_ton: string
    produce_output: string
    analyze: {
        times: string[],
        productions: number[],
        max_count: number[],
        mold_change: [][],
        error: [][],
        runtime: string[],
        stoptime: string[]
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
        mold_change: [],
        error: [],
        runtime: [],
        stoptime: []
    }
}

const PMCapacityStaticsContiner = () => {


    const ChartInitOptions = {
        chart: {
            type: ['line', 'bar'],
            toolbar: {
                tools: {
                    download: false
                }
            },
            events: {
                click: function (chart, w, e) {
                    const runtime = machineData.analyze.runtime.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] !== null ? machineData.analyze.runtime.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] : ''
                    const stoptime = machineData.analyze.stoptime.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] !== null ? machineData.analyze.stoptime.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] : ''

                    setErrorLog(machineData.analyze.error.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] !== null ? machineData.analyze.error.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] : [])
                    setMoldLog(machineData.analyze.mold_change.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] !== null ? machineData.analyze.mold_change.slice(e.dataPointIndex, e.dataPointIndex + 1)[0] : [])
                    setTimeLog([{runtime: runtime, stoptime: stoptime}])
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
            width: [2, 0]
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
            type: ['solid', 'gradient'],
            gradient: {
                type: 'vertical',
                shadeIntensity: 0,
                opacityFrom: 1,
                opacityTo: .20,
                stops: [0, 100]
            }
        },
        colors: ['#d8bf00', '#dd4bbe'],
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

    const [errorIndex, setErrorIndex] = useState({error_content: '에러 상태'})

    const [errorLog, setErrorLog] = useState<any[]>([])

    const [timeIndex, setTimeIndex] = useState({runtime: '가동시간'})

    const [timeLog, setTimeLog] = useState<any[]>([])

    const [moldIndex, setMoldIndex] = useState({mold_name: '금형 교체'})

    const [moldLog, setMoldLog] = useState<any[]>([])

    const [selectMachine, setSelectMachine] = useState<string>('')

    const [machineData, setMachineData] = useState<Props>(MachineInitData)

    const [selectDate, setSelectDate] = useState<string>(moment().subtract(1, 'days').format('YYYY-MM-DD'))

    const [max, setMax] = useState<number>(20000)


    /**
     * getData()
     * 생산량 분석 데이터 로드
     * @param {string} pk 프레스 pk
     * @param {string} date 요청 날짜
     * @returns X
     */
    const getData = useCallback(async () => {
        if (selectMachine !== '') {
            const tempUrl = `${API_URLS['capacity'].load2}?pk=${selectMachine}&date=${selectDate}`
            const resultData = await getCapacityTimeData(tempUrl)
            setMachineData(resultData)

            let tmp: number[] = []
            times.map((v, i) => {
                let listIndex = resultData.analyze.times.indexOf(v)
                if (listIndex !== -1) {
                    tmp.push(resultData.analyze.productions[listIndex])
                } else {
                    tmp.push(0)
                }
            })


            let tmpSPM: number[] = []

            times.map((v, i) => {
                let listIndex = resultData.analyze.times.indexOf(v)
                if (listIndex !== -1) {
                    tmpSPM.push(resultData.analyze.max_count[listIndex])
                } else {
                    tmpSPM.push(0)
                }
            })

            let tmpMax = maxData(Math.max.apply(null, tmp))

            let tmpSPMMax = maxData(Math.max.apply(null, tmpSPM))

            setSeries([{
                name: '평균 SPM 당 최대 생산 가능량',
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
    }, [selectMachine, machineData, series, selectDate])

    const getList = useCallback(async () => {
        const tempUrl = `${API_URLS['pressList'].list}`
        const resultData = await getCapacityTimeData(tempUrl)
        console.log(resultData)
        setPressList(resultData)

    }, [])

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
            stoptime: '비가동시간'
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
    }, [selectMachine, selectDate])

    useEffect(() => {
        console.log(timeLog)
    }, [timeLog])

    return (
        <div>
            <div style={{marginTop: 42, marginBottom: 19}}>
                <p style={{fontSize: 22, fontWeight: 'bold', textAlign: 'left'}}>프레스 생산량</p>
            </div>
            <ChartListBox>
                <div style={{marginTop: 25, marginBottom: 23}}>
                    <p style={{textAlign: 'left', fontSize: 20, fontWeight: 'bold'}}>프레스 선택</p>
                </div>
                <CustomPressListCard pressList={pressList} selectMachine={selectMachine}
                                     onClickMachine={setSelectMachine}/>
                {
                    machineData.machine_name !== '' && <div>

                    </div>
                }
            </ChartListBox>
            {
                selectMachine !== ''
                    ? <ChartDetailBox>
                        <div style={{marginTop: 25, paddingBottom: 23}}>
                            <div>
                                <div style={{float: 'left', display: 'inline-block'}}>
                                    <p style={{
                                        textAlign: 'left',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>{machineData.machine_name} ({machineData.produce_output})</p>
                                </div>
                                <CalendarDropdown type={'single'} select={selectDate}
                                                  onClickEvent={async (i) => setSelectDate(i)}/>
                            </div>
                        </div>
                        <div style={{
                            width: 640,
                            height: 649,
                            backgroundColor: '#111319',
                            margin: 0,
                            padding: 0,
                            clear: 'both',
                            marginTop: 20
                        }}>
                            <ReactApexChart options={{
                                ...ChartInitOptions,
                                yaxis: {
                                    min: 0,
                                    max: Math.round(Math.max.apply(null, series[0].data) * 1.1) + 100,
                                    tickAmount: 25,
                                    labels: {
                                        formatter: (value, index) => {
                                            if (Math.round(value) === Math.round(Math.max.apply(null, series[0].data) * 1.1) + 100) {
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
                            <div style={{marginLeft: '20px'}}>
                                <LineTable
                                    contentTitle={errorIndex}
                                    settingHeight={"120px"}
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
    height: 724px;
    padding: 0 25px 0 25px;
    background-color: #353b48;
    border-radius: 6px;
    float: left;
    margin-left: 20px;
    .apexcharts-tooltip{
        color: black;
    }
`

const ChartMiniBox = Styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
    margin-bottom: 20px;
    img{
        object - fit: resize;
    }
`

const ChartBorderMiniBox = Styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
    border: 4px solid #19b9df;
    margin-bottom: 20px;
`

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`


export default PMCapacityStaticsContiner

