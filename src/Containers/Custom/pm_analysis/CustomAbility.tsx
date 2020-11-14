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

const ChartInitOptions = {
    chart: {
        type: 'bar',
        toolbar: {
            tools: {
                download: false
            }
        },
        events: {
            click: function (chart, w, e) {
                console.log(chart, w, e)
            },
            beforeMount: (chartContext, config) => {
                console.log(chartContext, config)
            }
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '55%',
            distributed: false
        }
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
        type: "gradient",
        gradient: {
            type: "vertical",
            shadeIntensity: 0,
            opacityFrom: 1,
            opacityTo: .20,
            stops: [0, 90, 100]
        }
    },
    colors: ['#dd4bbe'],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    tooltip: {
        x: {
            show: false
        },
        y: {
            formatter: (i) => {
                return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "개"
            }
        }
    },
    xaxis: {
        categories: [
            "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"
        ],
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    }
}
const detailChartOption = {}

const MachineInitData: IPressCapacity = {
    manufacturer_code: '',
    machine_name: '',
    machine_ton: '',
    analyze: {
        times: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
        productions: []
    }
}

const SeainAbility = () => {
    const times: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
    const [series, setSeries] = useState<{ name: string, data: number[], max: number }[]>([{
        name: "value1",
        data: MachineInitData.analyze.productions,
        max: 0
    }])

    const [index, setIndex] = useState({mold_name: '금형명'})

    const [pressList, setPressList] = useState<IPressMachineType[]>([])

    const [selectMachine, setSelectMachine] = useState<string>('')

    const [machineData, setMachineData] = useState<IPressCapacity>(MachineInitData);

    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"))

    const [max, setMax] = useState<number>(20000)

    const indexList = {
        ability: {
            mold_name: '금형명',
            material_name: '품목(품목명)'
        }
    }


    /**
     * getData()
     * 생산량 분석 데이터 로드
     * @param {string} pk 프레스 pk
     * @param {string} date 요청 날짜
     * @returns X
     */
    const getData = useCallback(async () => {
        const tempUrl = `${API_URLS['capacity'].load}?pk=${selectMachine}&date=${selectDate}`
        const resultData = await getCapacityTimeData(tempUrl);
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
        console.log(tmp)

        let tmpMax = maxData(Math.max.apply(null, tmp))

        setSeries([{name: '생산량', data: tmp, max: tmpMax}])
    }, [selectMachine, machineData, series, selectDate]);

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
        // getData()
    }, [])

    useEffect(() => {
        getData()
    }, [selectMachine, selectDate])

    return (
        <div>
            <div style={{marginTop: 42, marginBottom: 19}}>
                <p style={{fontSize: 22, fontWeight: "bold", textAlign: "left"}}>프레스 능력</p>
            </div>
            <ChartListBox>
                <div style={{marginTop: 25, marginBottom: 23}}>
                    <p style={{textAlign: "left", fontSize: 20, fontWeight: 'bold'}}>프레스 선택</p>
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
                        <div style={{height: 300,}}>
                            <DateTable indexList={index} selectDate={selectDate} calendarOnClick={setSelectDate}
                                       valueList={[{mold_name: '엔진 탱크 금형', material_name: '엔진 탱크 상판 케이스'},
                                           {mold_name: '엔진 탱크 금형', material_name: '엔진 탱크 상판 케이스'},
                                           {mold_name: '엔진 탱크 금형', material_name: '엔진 탱크 상판 케이스'},
                                           {mold_name: '엔진 탱크 금형', material_name: '엔진 탱크 상판 케이스'},]}/>
                        </div>
                        <div style={{
                            width: 640,
                            height: 400,
                            margin: 0,
                            padding: 0,
                            backgroundColor: '#111319',
                            clear: 'both',
                            marginTop: 20
                        }}>
                            <PressPower>
                                <p>최대 일량</p>
                                <div>
                                    <input value={"9,999,999"}/>
                                    <p>kgf.m</p>
                                </div>
                                <p>최소 일량</p>
                                <div>
                                    <input value={"9,999,999"}/>
                                    <p>kgf.m</p>
                                </div>
                                <ButtonWrap>
                                    분석
                                </ButtonWrap>
                            </PressPower>
                            <ReactApexChart options={{
                                ...ChartInitOptions,
                                yaxis: {
                                    min: 0,
                                    max: Math.round(Math.max.apply(null, series[0].data) * 1.1) + 100,
                                    tickAmount: 25,
                                    labels: {
                                        formatter: (value, index) => {
                                            if (Math.round(value) === Math.round(Math.max.apply(null, series[0].data) * 1.1) + 100) {
                                                return "(ton)"
                                            } else {
                                                if (index % 5 === 0) {
                                                    return Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                } else {
                                                    return
                                                }
                                            }

                                        }
                                    }
                                }
                            }} series={series} type={'bar'} height={"65%"}/>
                            <div style={{display: "flex"}}>
                                <Overtime>
                                    <p>최대 일일 초과 회수</p>
                                    <p>9,999,999</p>
                                </Overtime>
                                <Overtime>
                                    <p>최소 일일 초과 회수</p>
                                    <p>9,999,999</p>
                                </Overtime>
                            </div>
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
  width: 337px;
  height: 66px;
  margin: 10px 16px 0 20px;
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

export default SeainAbility;
