import React, {
    useEffect,
    useState,
    useCallback,
} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldData,} from "../../Api/pm/preservation";

const ProductToneContainer = () => {

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
        white: {
            Xaxis: [1,2,3,4,5,6,7,8,9,10],
            Yaxis: [1,2,3,4,5,6,7,8,9,10]
        },
        red: {
            Xaxis: [11,12,13,14,15,16,17,18,19,20],
            Yaxis: [11,12,13,14,15,16,17,18,19,20]
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



    }, [selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    },[])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].list}`
        const res = await getMoldData(tempUrl)

        setList(res)

    },[])

    useEffect(()=>{
        // getList()
        setIndex(indexList["productTone"])
        setList(dummy)
        setDetailList(detaildummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'제품별 톤'}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'품목(품목명) 별 톤 그래프 보기'}>
                            <ChartDiv>
                                <ReactApexChart options={{...ChartInitOptions,...ChartOptionDetailLable,}} series={series} type={'scatter'} height={"100%"}></ReactApexChart>
                            </ChartDiv>
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
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
