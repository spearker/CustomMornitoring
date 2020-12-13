import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import {API_URLS, getCapacityTimeData} from "../../../Api/pm/analysis";
import tempImage from "../../../Assets/Images/temp_machine.png"
import NoDataCard from "../../../Components/Card/NoDataCard";
import DateTable from "../../../Components/Table/DateTable";
import {POINT_COLOR} from "../../../Common/configset";
import CustomPressListCard from "../../../Components/Custom/pm_analysis/CustomPressListCard";
import Notiflix from "notiflix";
import LineTable from "../../../Components/Table/LineTable";
import CalendarDropdown from "../../../Components/Dropdown/CalendarDropdown";


Notiflix.Loading.Init({svgColor: "#1cb9df",});

const chartOption = {
    chart: {
        height: 350,
        type: 'area',
        events: {
            beforeZoom: (e, {xaxis}) => {
                if (xaxis.min < 120 || xaxis.max > 210) {
                    return {
                        xaxis: {
                            min: 120,
                            max: 210
                        }
                    }
                }
            }
        },
        toolbar: {
            show: true,
            tools: {
                download: false,
                selection: false,
                pan: false,
                zoom: true,
                zoomin: true,
                zoomout: true,
            }
        },
    },
    colors: ['#bfbfbf55'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: ['smooth', 'straight', 'straight'],
        dashArray: [0, 0, 1, 15],
        width: 3
    },
    fill: {
        type: ['gradient', 'gradient'],
        gradient: {
            type: ['vertical', 'vertical', 'vertical'],
            shadeIntensity: 0,
            opacityFrom: 0.6,
            opacityTo: 0.1,
            inverseColors: true,
            stops: [0, 100]
        }
    },
    yaxis: {
        tickAmount: 25,
        labels: {
            formatter: (value, index) => {
                if (index === 25) {
                    return '(ton)'
                } else {
                    if (index % 5 === 0) {
                        return Math.floor(value)
                    } else {
                        return
                    }
                }
            }
        },
        tooltip: {
            enable: false
        }
    },
    xaxis: {
        type: 'numeric',
        tickAmount: 18,
        max: 210,
        min: 120,
        labels: {
            formatter: (value) => Number(value).toFixed(0),
        },
        tooltip: {
            enable: false
        }
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'right',
    },
    grid: {
        show: true,
        borderColor: '#42444b',
        yaxis: {
            lines: {
                show: true
            }
        },
        xaxis: {
            lines: {
                show: true
            }
        }
    },
    tooltip: {
        enable: false
    },

}

const MachineInitData: IPressCapacity = {
    manufacturer_code: '',
    machine_name: '',
    machine_ton: '',
    analyze: {
        times: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
        productions: []
    }
}

const CustomAbility = () => {
    const times: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
    const [series, setSeries] = React.useState([{name: 'basic', type: 'line', data: [[0, 0]], color: ''}])
    const [materialList, setMaterialList] = useState<any[]>([])
    const [selectMaterial, setSelectMaterial] = useState<string>('All')
    const [errorList, setErrorList] = useState<string[]>([''])
    const [selectError, setSelectError] = useState<string>('')
    const [degree, setDegree] = useState<number[]>([])

    const [index, setIndex] = useState({mold_name: '금형명'})

    const [pressList, setPressList] = useState<IPressMachineType[]>([])

    const [selectMachine, setSelectMachine] = useState<string>('')
    const [machineName, setMachineName] = useState<string>('')

    const [machineData, setMachineData] = useState<IPressCapacity>(MachineInitData);

    const [overTonIndex, setOverTonIndex] = useState({degree: '오버된 각도'})

    const [overTonLog, setOverTonLog] = useState<any[]>([])

    const [selectDate, setSelectDate] = useState<string>(moment().add(-1, "days").format("YYYY-MM-DD"))

    const [selectMold, setSelectMold] = useState<string>('')

    const [selectValue, setSelectValue] = useState<any>()

    const [overtime, setOvertime] = useState('')

    const [list, setList] = useState<any[]>([]);

    const indexList = {
        ability: {
            mold_name: '금형명',
            material_name: '품목(품목명)'
        }
    }

    const overTonIndexList = {
        ton: {
            degree: '오버톤 각도',
            time: '오버톤 시간',
            ton: '오버톤'
        }
    }

    const mainOnClick = useCallback((v) => {
        if (v.mold_pk === selectMold) {
            setSelectMold('')
            setSelectValue(null)
        } else {
            setSelectMold(v.mold_pk)
            setSelectValue(v)
        }
    }, [selectMold])

    const getDataList = useCallback(async () => {
        if (selectMachine !== '') {
            const tempUrl = `${API_URLS['capacity'].list}?pk=${selectMachine}&date=${selectDate}`
            const resultData = await getCapacityTimeData(tempUrl)

            setMaterialList(resultData)
        }
    }, [selectMachine, list, selectDate]);

    const getData = useCallback(async () => {
        if (selectMaterial !== '' && selectMachine !== '') {
            Notiflix.Loading.Circle()

            const tempUrl = `${API_URLS['ability'].error}?pk=${selectMachine}&date=${selectDate}&material_pk=${selectMaterial}`
            const resultData = await getCapacityTimeData(tempUrl);
            if (resultData) {
                setDegree(resultData.degree)
                let dummylineList: number[][] = []

                await resultData.degree.map((v, i) => {
                    dummylineList.push([Number(v), Number(resultData.capacity[i])])
                    return null
                })
                let tmpListTmp: number[][] = []

                await resultData.degree.map((v, i) => {
                    tmpListTmp.push([Number(v), (resultData.standard[i])])
                    return null
                })

                await setSeries([{
                    name: '기준 능력 곡선',
                    type: 'area',
                    data: dummylineList,
                    color: '#bfbfbf55'
                }, {
                    type: 'area',
                    data: tmpListTmp,
                    name: '제품 평균 그래프',
                    color: '#00FF0050'
                }])

                setErrorList(resultData.error)
                setOvertime(String(resultData.error.length))

            }
            Notiflix.Loading.Remove()
        }
    }, [selectMachine, selectDate, series, overtime, selectMaterial]);


    const getDetailError = useCallback(async () => {
        if (selectMaterial !== '' && selectError !== '') {
            const seriesTemp = series.splice(2, 1)
            Notiflix.Loading.Circle()

            const tempUrl = `${API_URLS['ability'].detail}?pk=${selectMachine}&time=${selectError}&material_pk=${selectMaterial}`
            const resultData = await getCapacityTimeData(tempUrl);

            if (resultData) {
                let ErrorLineList: number[][] = []

                await degree.map((v, i) => {
                    ErrorLineList.push([Number(v), Number(resultData.error_graph[i])])
                    return null
                })


                await setSeries([...series, {
                    name: '평균 초과 그래프',
                    type: 'area',
                    data: ErrorLineList,
                    color: '#FF000055'
                }])


            }
            Notiflix.Loading.Remove()
        }
    }, [selectMachine, selectDate, series, overtime, selectMaterial, selectError, degree]);


    const getList = useCallback(async () => {
        const tempUrl = `${API_URLS['pressList'].list}`
        const resultData = await getCapacityTimeData(tempUrl);
        setPressList(resultData)

    }, [])

    const maxData = (x) => {
        return (x % 10000) ? x - x % 10000 + 10000 : x + 10000
    }

    useEffect(() => {
        getList()
        setIndex(indexList['ability'])
        setOverTonIndex(overTonIndexList["ton"])
        // getData()
    }, [])

    useEffect(() => {
        setOvertime('')
        getDataList()
        // getData()
    }, [selectMachine, selectDate])

    useEffect(() => {
        getData()
    }, [selectMaterial])


    useEffect(() => {
        getDetailError()
    }, [selectError])

    return (
        <div>
            <div style={{marginTop: 42, marginBottom: 19}}>
                <p style={{fontSize: 22, fontWeight: "bold", textAlign: "left"}}>프레스 능력</p>
            </div>
            <CustomPressListCard pressList={pressList} selectMachine={selectMachine} onClickMachineName={setMachineName}
                                 onClickMachine={setSelectMachine}/>
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
                                    }}>{machineName}</p>
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
                                    {selectMaterial === 'All' ?
                                        <option value={''} key={`All`}>품목을 선택해주세요.</option>
                                        :
                                        null
                                    }
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
                            height: 635,
                            margin: 0,
                            padding: 0,
                            borderRadius: '6px',
                            backgroundColor: '#111319',
                            clear: 'both',
                            marginTop: 20
                        }}>
                            {overtime !== '' ?
                                <>
                                    <ReactApexChart options={chartOption} type={'line'} height={'85%'} series={series}/>
                                    <div style={{display: "flex"}}>
                                        <Overtime>
                                            <p>제품 평균 로드톤 초과 회수</p>
                                            <p>{overtime}</p>
                                        </Overtime>
                                        <Overtime>
                                            <select style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: '#000000',
                                                color: '#ffffff',
                                                border: 0
                                            }} onChange={(e) => setSelectError(e.target.value)}>
                                                {selectError !== '' ?
                                                    null
                                                    :
                                                    <option value={''} key={`All`}>에러 시간을 선택해주세요.</option>
                                                }
                                                {
                                                    errorList.map((v, i) => {
                                                        return (
                                                            <option value={v}
                                                                    key={`${v}Error${i}`}>{v}</option>
                                                        )
                                                    })}
                                            </select>
                                        </Overtime>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                    </ChartDetailBox>
                    : <ChartDetailBox>
                        <NoDataCard contents={'기계를 선택해 주세요'} height={684} color={'#353b48'}/>
                    </ChartDetailBox>
            }
        </div>
    );
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
                object-fit: resize;
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

const PressPower = Styled.div`
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      font-size: 14px;
      font-weight: bold;
    }
    div{
      display: flex;
      width: 120px;
      height: 20px;
      margin: 0 16px 0 6px;
      padding: 6px 12px;
      border-radius: 6px;
      background-color: #353b48;
      input{
        background-color: #353b48;
        border: 0;
        width: 90%;
        color: #ffffff;
      }
      p{
        font-size: 10px;
        font-weight: normal;
      }
    }
`

const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: white;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
 `

const Overtime = Styled.div`
  width: 287px;
  height: 66px;
  margin: 0 16px 0 20px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #000000; 
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  p{
     font-size: 20px;
     font-weight: bold;
    &:first-child{
      font-size: 15px;
      font-weight: normal;
    }
  }
`


const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default CustomAbility;
