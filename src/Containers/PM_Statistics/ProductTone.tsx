import React, {
    useEffect,
    useState,
    useContext,
    useCallback,
    ReactElement,
} from "react";
import Styled from "styled-components";
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import { ROUTER_MENU_LIST } from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";
import ReactShadowScroll from "react-shadow-scroll";
import OvertonTable from "../../Components/Table/OvertonTable";
import ReactApexChart from "react-apexcharts";
import LineTable from "../../Components/Table/LineTable";
import {getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import LoadtoneBox from "../../Components/Box/LoadtoneBox";
import {API_URLS, getProductData} from "../../Api/pm/statistics";
import HalfTalbe from "../../Components/Table/HalfTable";

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

const ProductToneContainer = () => {

    const ChartInitOptions = {
        chart: {
            type: 'scatter',
            events: {
                click: function(chart, w, e) {
                    console.log(chart, w, e)
                }
            },
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
        colors: ['#ffffff','#ff341a'],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        markers: {
            strokeOpacity: 0,
            size: 3,
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
    const [index, setIndex] = useState({product_name:'품목'});
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const MachineInitData = {
        manufacturer_code:'',
        machine_name: '',
        machine_ton: '',
        white: {
            Xaxis: [4,7,8,9,10,11,12,13,14,15],
            Yaxis: [100,105,97,110,101,112,102,104,106,103]
        },
        red: {
            Xaxis: [2,12,13,5,4,16,3,6,9,11],
            Yaxis: [97,80,130,134,128,140,150,138,130,80]
        },
    }

    const [series, setSeries] = useState<object[]>([{name: "value1", data: [[1, 120]]},{name: "value2", data: [[2, 120]]}])

    useEffect(() => {
        let tmpList: number[][] = [];
        MachineInitData.white.Xaxis.map((v, i) => {
            tmpList.push([v,MachineInitData.white.Yaxis[i]])
        })

        let tmpList2: number[][] = [];
        MachineInitData.red.Xaxis.map((v, i) => {
            tmpList2.push([v,MachineInitData.red.Yaxis[i]])
        })

        console.log("alasdkfjlkasjdfljsdalfjlsajdfkjsadlfjklsdjflk", tmpList)

        console.log("alasdkfjlkasjdfljsdalfjlsajdfkjsadlfjklsdjsdfdsfsdfsdflk", tmpList2)

        setSeries([{name: "value1", data: tmpList},{name: "value2", data: tmpList2}])
    }, [])

    const indexList = {
        productTone: {
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            all_dot: '총 dot 개수',
            normal_dot: '정상 dot 개수',
            bad_dot: '불량 dot 개수',
            defective_product: '불량품 개수'
        }
    }

    const dummy = [
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            all_dot: '00 ea',
            normal_dot: '00 ea',
            bad_dot: '6 ea',
            defective_product: '5 ea'
        },
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            all_dot: '00 ea',
            normal_dot: '00 ea',
            bad_dot: '6 ea',
            defective_product: '5 ea'
        },
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            all_dot: '00 ea',
            normal_dot: '00 ea',
            bad_dot: '6 ea',
            defective_product: '5 ea'
        },
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            all_dot: '00 ea',
            normal_dot: '00 ea',
            bad_dot: '6 ea',
            defective_product: '5 ea'
        },
        {
            product_name: '품목(품목명)',
            factory_name: ['공정 01','공정 02', '공정 03', '공정 04'],
            segmentation_factory: ['프레스 01', '프레스 02', '프레스 03','프레스 04'],
            all_dot: '00 ea',
            normal_dot: '00 ea',
            bad_dot: '6 ea',
            defective_product: '5 ea'
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
        const tempUrl = `${API_URLS['product'].load}?pk=${pk}`
        const res = await getProductData(tempUrl)

        setDetailList(res)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['product'].list}`
        const res = await getProductData(tempUrl)

        setList(res)

    },[list])

    useEffect(()=>{
        // getList()
        setIndex(indexList["productTone"])
        setList(dummy)
        setDetailList(detaildummy)
    },[])

    return (
        <div>
            <div style={{marginRight: 40}}>
                <HalfTalbe
                    title={'제품별 톤'}
                    indexList={index}
                    valueList={list}
                    clickValue={selectValue}
                    mainOnClickEvent={onClick}
                    noChildren={true}>
                </HalfTalbe>
            </div>
            <HalfTalbe
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                mainOnClickEvent={onClick}
                noChildren={true}>
            </HalfTalbe>
        </div>
    );
}

const ChartDiv = Styled.div`
    width: 95%;
    height: 250px;
    background-color: #111319;
    margin: 0;
    padding: 0; 
    clear: both;
    .apexcharts-marker{
    border: 0;
    }
`

export default ProductToneContainer;
