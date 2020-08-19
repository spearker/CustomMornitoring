import React, {
    useEffect,
    useState,
    useCallback,
} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import SettingToneBox from "../../Components/Box/SettingToneBox";
import {API_URLS, getMoldData,} from "../../Api/pm/preservation";
import ReactApexChart from "react-apexcharts";

const ChartInitOptions = {
    chart: {
        type: 'scatter',
        toolbar: {show: false},
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
    }
}

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

    const [list, setList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any>({
        pk: "",
        max_count: 0,
        current_count: 0,
    });
    const [index, setIndex] = useState({product_name:'품목'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const MachineInitData = {
        manufacturer_code:'',
        machine_name: '',
        machine_ton: '',
        temp: {
            Xaxis: [1,2,3,4,5,6,7,8,9,10],
            Yaxis: [1,2,3,4,5,6,7,8,9,10]
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
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            setting_ton: '설정 톤',
            normal_ton: '정상 톤',
            work_registered: '작업기간',
        }
    }

    const dummy = [
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            setting_ton: '97 ton',
            normal_ton: '100 ±5 ton',
            work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
        },
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            setting_ton: '97 ton',
            normal_ton: '100 ±5 ton',
            work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
        },
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            setting_ton: '97 ton',
            normal_ton: '100 ±5 ton',
            work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
        },
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            setting_ton: '97 ton',
            normal_ton: '100 ±5 ton',
            work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
        },
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            setting_ton: '97 ton',
            normal_ton: '100 ±5 ton',
            work_registered: '2020.07.09 : 13:00 -  2020.07.09 : 19:00',
        },
    ]

    const detaildummy = [
        {
            pk: 'PK1',
            max_count: 100,
            current_count: 20
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
        const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].list}`
        const res = await getMoldData(tempUrl)

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
                                    <SettingToneBox settingTone={97} normalTone={99} maxTone={120} minTone={93}/>
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

const ChartDiv = Styled.div`
    width: 95%;
    height: 280px;
    background-color: #111319;
    margin: 0;
    padding: 0;
    clear: both;
`


export default DefectiveContainer;
