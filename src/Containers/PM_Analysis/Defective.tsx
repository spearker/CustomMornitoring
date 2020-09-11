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
    }
}

const DefectiveContainer = () => {

    const ChartInitOptions = {
        chart: {
            type: 'scatter',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    selection: true,
                    zoom: false,
                    zoomin: true,
                    zoomout: true,
                }
            },
            events: {
                click: function(chart, w, e) {
                    console.log(chart, w, e)
                }
            }
        },
        plotOptions: {
            scatter: {
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
        colors: ['#ffffff'],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        markers: {
            size: 3,
            strokeOpacity: 0,
        },
        tooltip: {
            custom: ({}) => {
                return  '<div style=" border-width: 0;    border-radius: 10px;    width: 170px;    height: 122px;    font-family: NotoSansCJKkr-Bold;    padding: 10px;">' +
                    '<div style="  padding: 5px;       display: flex;       flex-direction: row;        justify-content: space-between;">' +
                    '<p style="color: black">'+'설정톤'+'</p>'+
                    '<p style="color: black">'+`${detailList[0].settingTone}`+' ton'+'</p>'+
                    '</div>'+
                    '<div style="  padding: 5px;       display: flex;       flex-direction: row;        justify-content: space-between;">' +
                    '<p style="color: black">'+'평균톤'+'</p>'+
                    '<p style="color: black">'+`${detailList[0].normalTone}`+' ton'+'</p>'+
                    '</div>'+
                    '<div style="  padding: 5px;       display: flex;       flex-direction: row;        justify-content: space-between;">' +
                    '<p style="color: black">'+'최대톤'+'</p>'+
                    '<p style="color: black">'+`${detailList[0].maxTone}`+' ton'+'</p>'+
                    '</div>'+
                    '<div style="  padding: 5px;       display: flex;       flex-direction: row;        justify-content: space-between;">' +
                    '<p style="color: black">'+'최소톤'+'</p>'+
                    '<p style="color: black">'+`${detailList[0].minTone}`+' ton'+'</p>'+
                    '</div>'+
                    '</div>'
            }
        }
    }

    const [list, setList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any>([]);
    const [index, setIndex] = useState({process_pk:'품목'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const MachineInitData = {
        manufacturer_code:'',
        machine_name: '',
        machine_ton: '',
        temp: {
            Xaxis: [4,7,8,9,10,11,12,13,14,15],
            Yaxis: [100,105,97,110,101,112,102,104,106,103]
        }
    }

    const [series, setSeries] = useState<object[]>([{name: "value1", data: [[1, 120]]}])

    useEffect(() => {
        let tmpList: number[][] = [];
        MachineInitData.temp.Xaxis.map((v, i) => {
            tmpList.push([v,MachineInitData.temp.Yaxis[i]])
        })

        console.log("alasdkfjlkasjdfljsdalfjlsajdfkjsadlfjklsdjflk", tmpList)

        setSeries([{name: "value1", data: tmpList}])
    }, [])

    const indexList = {
        defective: {
            // product_name: '품목(품목명)',
            process_pk: '공정명',
            // segmentation_factory: '세분화 공정',
            // setting_ton: '설정 톤',
            // normal_ton: '정상 톤',
            // work_registered: '작업기간',
            total_defects: '총 불량품 개수'
        }
    }

    const dummy = [
        {
            process_pk: "라인공정01",
            // product_name: '품목(품목명)',
            //
            // segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            // setting_ton: '97 ton',
            // normal_ton: '100 ±5 ton',
            // work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
            total_defects: '10'
        },
        {
            // product_name: '품목(품목명)',
            process_pk: "단발공정",
            // segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            // setting_ton: '97 ton',
            // normal_ton: '100 ±5 ton',
            // work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
            total_defects: '20'
        },
        {
            // product_name: '품목(품목명)',
            process_pk: "검수공정",
            // segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            // setting_ton: '97 ton',
            // normal_ton: '100 ±5 ton',
            // work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
            total_defects: '15'
        },
        {
            // product_name: '품목(품목명)',
            process_pk: "라인공정02",
            // segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            // setting_ton: '97 ton',
            // normal_ton: '100 ±5 ton',
            // work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
            total_defects: '16'
        },
        {
            // product_name: '품목(품목명)',
            process_pk: "라인공정03",
            // segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            // setting_ton: '97 ton',
            // normal_ton: '100 ±5 ton',
            // work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
            total_defects: '4'
        },
    ]

    const detaildummy = [
        {
            settingTone: 97,
            normalTone: 99,
            maxTone: 120,
            minTone: 93
        }
    ]

    const onClick = useCallback((mold) => {
        console.log('dsfewfewf',mold.pk,mold.mold_name);
        if(mold.pk === selectPk){
            setSelectPk(null);
            setSelectValue(null);
        }else{
            setSelectPk(mold.pk);
            setSelectMold(mold.mold_name);
            setSelectValue(mold)
            //TODO: api 요청
            // getData(mold.pk)
        }



    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['defective'].load}?pk=${pk}`
        const res = await getDefectiveData(tempUrl)

        setDetailList(res)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['defective'].list}`
        const res = await getDefectiveData(tempUrl)

        setList(res)

    },[list])

    useEffect(()=>{
        // getList()
        setIndex(indexList["defective"])
        setList(dummy)
        setDetailList(detaildummy)
    },[])


    return (
        <OvertonTable
            title={'불량 공정'}
            indexList={index}
            valueList={list}
            clickValue={selectValue}
            mainOnClickEvent={onClick}>
                        {
                            selectPk !== null ?
                                <LineTable title={'품목(품목명) 의 공정 04'}>
                                    <ChartDiv>
                                        <ReactApexChart options={{...ChartInitOptions,...ChartOptionDetailLable,}} series={series} type={'scatter'} height={"100%"}></ReactApexChart>
                                    </ChartDiv>
                                </LineTable>
                                :
                                null
                        }
        </OvertonTable>
    );
}

const ChartDiv = styled.div`
    width: 95%;
    height: 280px;
    background-color: #111319;
    margin: 0;
    padding: 0;
    clear: both;
    .apexcharts-tooltip{
        background-color: #ffffff;
        opacity: 0.65;
    }
`

export default DefectiveContainer;
