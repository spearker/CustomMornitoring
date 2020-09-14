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
import {API_URLS as  MACHINE_URLS, getSearchMachine, postProcessRegister} from "../../Api/mes/process";

//
// const ChartOptionDetailLable = {
//     yaxis: {
//         min: 0,
//         max: 250,
//         tickAmount: 25,
//         labels:{
//             formatter:(value) => {
//                 if(value===250){
//                     return "(ton)"
//                 }else{
//                     if(value%50===0){
//                         return value
//                     }
//                 }
//             }
//         }
//     },
//     xaxis: {
//         type: 'numeric',
//         tickAmount: 24,
//         // categories: ["10","20","30","40","50","60","70","80","90","100","110","120"],
//         min: 0,
//         max: 120,
//         labels: {
//             style: {
//                 fontSize: '12px'
//             },
//             formatter: (value) => {
//                 if(value%10 === 0){
//                     return value
//                 }
//             }
//         }
//     },
// }

const DummyMachine = [
    {
        pk: "",
        machine_name: "",
        machine_type: "",
        manufacturer: "",
        manufacturer_code: ''
    }
]

const ProductToneContainer = () => {

    // const ChartInitOptions = {
    //     chart: {
    //         type: 'scatter',
    //         events: {
    //             click: function(chart, w, e) {
    //                 console.log(chart, w, e)
    //             }
    //         },
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
    //     colors: ['#ffffff','#ff341a'],
    //     dataLabels: {
    //         enabled: false
    //     },
    //     legend: {
    //         show: false
    //     },
    //     markers: {
    //         strokeOpacity: 0,
    //         size: 3,
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
    const [detailList,setDetailList] = useState<any[]>([]);
    const [detailTonList, setDetailTonList] = useState<any[]>([]);
    const [index, setIndex] = useState({product_name:'품목'});
    const [subIndex, setSubIndex] = useState({low: '최저'});
    const [sub2Index, setSub2Index] = useState({ ton: "톤"});
    const [machinPk, setMachinePk] = useState<string>('all');
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const [machineList, setMachineList] = useState(DummyMachine)
    const [searchName, setSearchName] = useState<string>('')

    // const ref = useOnclickOutside(() => {
    //     setIsOpen(false);
    // });

    const getMachineList = useCallback(async () => {
        const tempUrl = `${MACHINE_URLS['machine'].list}?keyword=${searchName}`
        const resultData = await getSearchMachine(tempUrl);
        setMachineList(resultData.results)
    }, [searchName])

    useEffect(() => {
        // console.log(searchName)
    },[searchName])

    useEffect(()=>{
        // console.log(machineList)
    },[machineList])

    useEffect(()=>{
        getMachineList()
    },[])
    //
    // const MachineInitData = {
    //     manufacturer_code:'',
    //     machine_name: '',
    //     machine_ton: '',
    //     white: {
    //         Xaxis: [4,7,8,9,10,11,12,13,14,15],
    //         Yaxis: [100,105,97,110,101,112,102,104,106,103]
    //     },
    //     red: {
    //         Xaxis: [2,12,13,5,4,16,3,6,9,11],
    //         Yaxis: [97,80,130,134,128,140,150,138,130,80]
    //     },
    // }

    const [series, setSeries] = useState<object[]>([{name: "value1", data: [[1, 120]]},{name: "value2", data: [[2, 120]]}])

    // useEffect(() => {
    //     let tmpList: number[][] = [];
    //     MachineInitData.white.Xaxis.map((v, i) => {
    //         tmpList.push([v,MachineInitData.white.Yaxis[i]])
    //     })
    //
    //     let tmpList2: number[][] = [];
    //     MachineInitData.red.Xaxis.map((v, i) => {
    //         tmpList2.push([v,MachineInitData.red.Yaxis[i]])
    //     })
    //
    //
    //     setSeries([{name: "value1", data: tmpList},{name: "value2", data: tmpList2}])
    // }, [])

    const indexList = {
        productTone: {
            product_name: '품목(품목명)',
            machine_name: '기계명',
            process_name: '공정명',
        }
    }

    const subIndexList = {
        productTone: {
            low: '최저',
            high: '최고',
            avg: '평균',
        }
    }

    const sub2IndexList = {
        productTone:{
            ton: "톤",
            date: "날짜"
        }
    }
    //
    // const detaildummy = [
    //     {
    //         settingTone: 97,
    //         normalTone: 99,
    //         maxTone: 120,
    //         minTone: 93
    //     }
    // ]


    const onClick = useCallback((product) => {
        // console.log('dsfewfewf',product.pk,product.mold_name);
        if(product.pk === selectPk){
            setSelectPk(null);
            setSelectMold(null);
            setSelectValue(null);
        }else{
            setSelectPk(product.pk);
            setSelectMold(product.mold_name);
            setSelectValue(product)
            //TODO: api 요청
            getData(product.mold_pk, product.process_pk,product.product_pk )
        }



    }, [list, selectPk]);

    const getData = useCallback( async(mold,process,product)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['product'].load}?mold_pk=${mold}&product_pk=${product}&process_pk=${process}&date=2020-09-11`
        const res = await getProductData(tempUrl)

        console.log(res.length,[res].length,res.dataList)
        setDetailList(res.length === undefined ? [] : [res])

        setDetailTonList(res.dataList)

    },[machinPk])

    const getList = useCallback(async (pk)=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['product'].list}?filter=${pk}`
        const res = await getProductData(tempUrl)

        setList(res)

    },[machinPk])

    useEffect(()=>{
        // getList()
        setIndex(indexList["productTone"])
        setSubIndex(subIndexList["productTone"])
        setSub2Index(sub2IndexList["productTone"])
        // setList(dummy)
        // setDetailList(detaildummy)
    },[])

    useEffect(()=>{
        getList(machinPk)
    },[machinPk])

    useEffect(()=>{
        setDetailList([])
        setDetailTonList([])
    },[selectValue])

    return (
        <div>
            <div style={{width: "100%", height: 50,marginTop: 41, borderRadius: 10,paddingLeft: '81%'}}>
                <div style={{display:"flex"}}>
                    <p style={{marginRight: 14,marginBottom: 3}}>기계 :</p>
                    <select className="p-limits" style={{width: '15%', borderRadius: 5, backgroundColor:'#353b48', color:'#ffffff', paddingLeft: 10,}} onChange={(e)=>setMachinePk(e.target.value)}>
                        <option value={'all'}>전체</option>
                        {
                            machineList.map((v,i)=>{
                                return(
                                    <option value={v.pk} key={`${v.pk}machine${i}`}>{v.machine_name}</option>
                                )
                        })}
                    </select>
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{marginRight: 40}}>
                    <HalfTalbe
                        title={'제품 별 톤'}
                        indexList={index}
                        valueList={list}
                        clickValue={selectValue}
                        mainOnClickEvent={onClick}
                        noChildren={true}>
                    </HalfTalbe>
                </div>
                <div>
                    <HalfTalbe
                        indexList={subIndex}
                        valueList={detailList}
                        noChildren={true}>
                    </HalfTalbe>
                    <HalfTalbe
                        indexList={sub2Index}
                        valueList={detailTonList}
                        noChildren={true}>
                    </HalfTalbe>
                </div>
            </div>
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
