import React, {
    useEffect,
    useState,
    useCallback,
} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import {API_URLS, getMoldData,} from "../../Api/pm/preservation";

const chartOption = {
    chart: {
        type: 'area',
        height: 350,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        width: 2
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.35,
            opacityTo: 0,
        }
    },
    xaxis: {
        tickAmount: 10
    },
    grid:{
        borderColor: "#42444b",
        xaxis:{
            lines: {
                show: true
            }
        },
        yaxis:{
            lines: {
                show: true
            }
        }
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 20,
        labels:{
            show: true,
            formatter: (value) => {
                if(value === 100) {
                    return "(%)"
                }else{
                    if(value % 20 === 0){
                        return Math.floor(value)
                    }else{
                        return
                    }
                }
            }
        },
    },
    legend: {
        show: false
    },
    tooltip: {
        enable:false
    }
}

const dummyData: { pressPk: string; insert_oil_time: { Xaxis: number[]; Yaxis: number[] } } = {
    pressPk:"dummyPK1",
    insert_oil_time: {
        Xaxis: [0, 28, 29, 30, 1, 2, 3, 4, 0],
        Yaxis: [58, 55, 55, 60, 57, 58, 60, 55, 56 ],
    }
}

const DefectiveContainer = () => {
    const [data, setData] = React.useState(dummyData)
    const [list, setList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any>({
        pk: "",
        max_count: 0,
        current_count: 0,
    });
    const [index, setIndex] = useState({pk:'PK'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [selectDate, setSelectDate] = useState({start: moment().format("YYYY-MM-DD"), end: moment().format("YYYY-MM-DD")})

    const indexList = {
        defective: {
            pk: 'PK',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            mold_name: '금형명',
            worker: '작업자',
            work_registered: '작업기간',
        }
    }

    const dummy = [
        {
            pk: 'PK1',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            mold_name: '금형 01',
            worker: '김작업',
            work_registered: '2020.0707~2020.0909',
        },
        {
            pk: 'PK2',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            mold_name: '금형명',
            worker: '작업자',
            work_registered: '2020.0707~2020.0909',
        },
        {
            pk: 'PK3',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            mold_name: '금형명',
            worker: '작업자',
            work_registered: '2020.0707~2020.0909',
        },
        {
            pk: 'PK4',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            mold_name: '금형명',
            worker: '작업자',
            work_registered: '2020.0707~2020.0909',
        },
        {
            pk: 'PK5',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            mold_name: '금형명',
            worker: '작업자',
            work_registered: '2020.0707~2020.0909',
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
            setSelectMold(null);
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

    const WidthPercent = detaildummy[0].current_count/detaildummy[0].max_count*100


    return (
        <OvertonTable
            title={'프레스 불량률'}
            indexList={index}
            valueList={list}
            clickValue={selectValue}
            mainOnClickEvent={onClick}>
            {
                selectPk !== null ?
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <div>
                            <LineContainer>
                                <div style={{display:"flex",flexDirection: "row",justifyContent:"space-between"}}>
                                    <p>생산량</p>
                                    <p>0<span>ea</span></p>
                                </div>
                            </LineContainer>
                            <CapacityContainer style={{paddingTop: 30, paddingBottom: 20}}>
                                <div>
                                    <p>전체 불량률</p>
                                    <p>5.01</p>
                                </div>
                                <div>
                                    <p>전체 불량 갯수</p>
                                    <p>50</p>
                                </div>
                            </CapacityContainer>
                        </div>
                        <GraphContainer>
                            <div>
                                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginLeft: 30,marginRight:30, paddingTop: 25 }}>
                                    <div style={{alignSelf:"center"}}>
                                        <p>공정 04 불량률</p>
                                    </div>
                                    <CalendarDropdown type={'range'} selectRange={selectDate} onClickEvent={(start, end) => setSelectDate({start: start, end: end ? end : ''})}></CalendarDropdown>
                                </div>
                                <ReactApexChart options={{...chartOption, labels: [' ', ...data.insert_oil_time.Xaxis,'(일/day)']}} type={'area'} height={414} series={[{name: "data", data:data.insert_oil_time.Yaxis}]}/>
                            </div>
                        </GraphContainer>
                    </div>
                    :
                    null
            }
        </OvertonTable>
    );
}

const CapacityContainer = Styled.div`
  width: 391px;
  height: 82px;
  border-radius: 6px;
  background-color: #202020;
  div{
    width: 190px;
    height: 80px;
    float: left;
    display: inline-block;
    &:first-child{
            border-right: 1px solid #ffffff;
            }
    p {
        font-family: NotoSansCJKkr-Bold;
        font-size: 42px;
         &:first-child{
            font-size: 15px;
            }
    }
  }
`

const LineContainer = Styled.div`
  margin-bottom: 20px;
  width: 391px;
  height: 100px;
  border-radius: 6px;
  background-color: #202020;
  p{
    font-family: NotoSansCJKkr-Bold;
    font-size: 40px;
    padding: 12px 20px 32px 20px;
     &:first-child{
           margin-top: 20px;
           font-size: 15px;
            }          
     span {
        font-size: 24px;
        font-family: NotoSansCJKkr-Bold;
    }
  }
`


const GraphContainer = Styled.div`
  margin-left: 20px;
  width: 690px;
  height: 522px;
  border-radius: 6px;
  background-color: #202020;
  p {
    font-size: 20px;
    font-family: NotoSansCJKkr-Bold;
    &:first-child{
            font-size: 15px;
            }
  }
`

export default DefectiveContainer;
