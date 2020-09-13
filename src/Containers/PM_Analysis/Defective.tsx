import React, {
    useEffect,
    useState,
    useCallback,
} from "react";
import styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import SettingToneBox from "../../Components/Box/SettingToneBox";
import {API_URLS, getDefectiveData,} from "../../Api/pm/analysis";
import ReactApexChart from "react-apexcharts";
import NoDataCard from "../../Components/Card/NoDataCard";
import {POINT_COLOR} from "../../Common/configset";

const ChartOptionDetailLable = {
    yaxis: {
        min: 0,
        max: 250,
        tickAmount: 25,
        labels:{
            formatter:(value) => {
                if(value===250){
                    return "(ton)"
                }else{
                    if(value%50===0){
                        return value
                    }
                }
            }
        }
    },
    xaxis: {
        type: 'numeric',
        tickAmount: 24,
        // categories: ["10","20","30","40","50","60","70","80","90","100","110","120"],
        min: 0,
        max: 120,
        labels: {
            style: {
                fontSize: '12px'
            },
            formatter: (value) => {
                if(value%10 === 0){
                    return value
                }
            }
        }
    },
}

interface PIDATA {
    amount: number
    material_name: string
    percentage: number
    production: number
}

const DefectiveContainer = () => {

    // const ChartInitOptions = {
    //     chart: {
    //         type: 'scatter',
    //         toolbar: {
    //             show: true,
    //             tools: {
    //                 download: false,
    //                 selection: true,
    //                 zoom: false,
    //                 zoomin: true,
    //                 zoomout: true,
    //             }
    //         },
    //         events: {
    //             click: function(chart, w, e) {
    //                 console.log(chart, w, e)
    //             }
    //         }
    //     },
    //     plotOptions: {
    //         scatter: {
    //             columnWidth: '55%',
    //             distributed: false
    //         }
    //     },
    //     grid: {
    //         borderColor: '#42444b',
    //         xaxis: {
    //             lines: {
    //                 show: true
    //             }
    //         },
    //         yaxis: {
    //             lines: {
    //                 show: true
    //             }
    //         },
    //     },
    //     colors: ['#ffffff'],
    //     dataLabels: {
    //         enabled: false
    //     },
    //     legend: {
    //         show: false
    //     },
    //     markers: {
    //         size: 3,
    //         strokeOpacity: 0,
    //     },
    //     tooltip: {
    //         custom: ({}) => {
    //             return  '<div style=" border-width: 0;    border-radius: 10px;    width: 170px;    height: 122px;    font-family: NotoSansCJKkr-Bold;    padding: 10px;">' +
    //                 '<div style="  padding: 5px;       display: flex;       flex-direction: row;        justify-content: space-between;">' +
    //                 '<p style="color: black">'+'설정톤'+'</p>'+
    //                 '<p style="color: black">'+`${detailList[0].settingTone}`+' ton'+'</p>'+
    //                 '</div>'+
    //                 '<div style="  padding: 5px;       display: flex;       flex-direction: row;        justify-content: space-between;">' +
    //                 '<p style="color: black">'+'평균톤'+'</p>'+
    //                 '<p style="color: black">'+`${detailList[0].normalTone}`+' ton'+'</p>'+
    //                 '</div>'+
    //                 '<div style="  padding: 5px;       display: flex;       flex-direction: row;        justify-content: space-between;">' +
    //                 '<p style="color: black">'+'최대톤'+'</p>'+
    //                 '<p style="color: black">'+`${detailList[0].maxTone}`+' ton'+'</p>'+
    //                 '</div>'+
    //                 '<div style="  padding: 5px;       display: flex;       flex-direction: row;        justify-content: space-between;">' +
    //                 '<p style="color: black">'+'최소톤'+'</p>'+
    //                 '<p style="color: black">'+`${detailList[0].minTone}`+' ton'+'</p>'+
    //                 '</div>'+
    //                 '</div>'
    //         }
    //     }
    // }



    const [list, setList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any>([]);
    const [index, setIndex] = useState({  process_name: '공정명'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [labelDatas, setLabelDatas] = useState<string[]>([])
    const [series, setSeries] = useState<number[]>([])
    const [pieData, setPieData] = useState<PIDATA[]>([])
    const [selectPie, setSelectPie] = useState<PIDATA>()

    const ChartInitOption = {
        chart: {
            events:{
                dataPointSelection: (event, chartContext, config) => {
                    console.log(event, chartContext, config)

                    pieOnClick(config.dataPointIndex)
                }
            },
            width: "40%",
            type: 'pie',
        },
        labels: labelDatas,
        colors: [POINT_COLOR, "rgba(98, 29, 167, .7 )", '#397485', '#ff341a', 'gray'],
        title: {
            style:{ color: 'white', fontSize: 20 },
            text: ""
        },
        dataLabels: {
            style: {
                fontSize: 20,
            },
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            }
        },
        legend: {
            show: false,
        },
        stroke: {
            show: false,
            width: 2,
            dashArray: 0
        }
    }

    const [chartOption, setChartOption] = useState(ChartInitOption)

    const indexList = {
        defective: {
            process_name: '공정명',
            total_defects: '총 불량 개수'
        }
    }

    const onClick = useCallback((process) => {
        console.log('dsfewfewf',process.pk);
        if(process.process_pk === selectPk){
            setSelectPk(null);
            setSelectValue(null);
            setDetailList({})
            setPieData([])
            setLabelDatas([])
        }else{
            setSelectPk(process.process_pk);
            setSelectValue(process)
            //TODO: api 요청
            getData(process.process_pk)
        }



    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['defective'].load}?pk=${pk}`
        const res = await getDefectiveData(tempUrl)

        let tmpList: number[] = []

        res.pies.map((v,i)=>{
            // series.push(v.percentage)
            tmpList.push(v.percentage)
            labelDatas.push(v.material_name)
            pieData.push(v)
        })

        console.log(pieData)
        setSeries(tmpList)
        setDetailList(res)

    },[detailList, pieData, labelDatas, series])


    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['defective'].list}`
        const res = await getDefectiveData(tempUrl)

        setList(res)

    },[list])

    const pieOnClick = useCallback((index)=>{
        console.log(pieData)
        setSelectPie(pieData[index])
    },[selectPie, pieData])

    useEffect(()=>{
        getList()
        setIndex(indexList["defective"])
    },[])

    useEffect(() => {
        console.log(pieData)
    }, [pieData])

    useEffect(()=>{
        setSelectPie(undefined)
    },[selectValue])

    return (
        <OvertonTable
            title={'불량 공정'}
            indexList={index}
            valueList={list}
            clickValue={selectValue}
            mainOnClickEvent={onClick}>
            {
                selectPk !== null ?
                    series.length !== 0 ?
                    <LineTable title={`${selectValue.process_name} 불량 분석 정보`}>
                        <div style={{display:'flex',flexDirection: 'row'}}>
                            <Chart>
                                <ReactApexChart options={chartOption} series={series} type="pie"/>
                            </Chart>
                            <Detail>
                                {selectPie && <table style={{width: "100%"}}>
                                    <tr>
                                        <td>제품명</td>
                                        <td>{selectPie.material_name}</td>
                                    </tr>
                                    <tr>
                                        <td>전체 생산품</td>
                                        <td>{selectPie.production} ea</td>
                                    </tr>
                                    <tr>
                                        <td>불량 개수</td>
                                        <td>{selectPie.amount} ea</td>
                                    </tr>
                                    <tr>
                                        <td>불량률</td>
                                        <td>{selectPie.percentage}</td>
                                    </tr>
                                </table>}
                            </Detail>
                        </div>
                    </LineTable>
                        :
                        <NoDataCard contents={'데이터가 없습니다.'} height={150}/>
                    :
                    null
            }
        </OvertonTable>
    );
}

const Chart = styled.div`
    width: 40%;
    height: 20%;
    marginLeft: 20px;
    background-color: #111319;
    margin: 0;
    padding: 0;
    clear: both;
    .apexcharts-tooltip{
        background-color: #ffffff;
        opacity: 0.65;
    }
`

const Detail = styled.div`
    width: 40%;
    height: 20%;
    marginLeft: 20px;
    margin: 0;
    padding: 0;
    clear: both;
`

export default DefectiveContainer;

