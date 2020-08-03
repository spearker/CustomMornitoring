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
import LineTable from "../../Components/Table/LineTable";
import {getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import {API_URLS, getCluchData, getMoldData,} from "../../Api/pm/preservation";
import LoadtoneBox from "../../Components/Box/LoadtoneBox";


const DefectiveContainer = () => {

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
                {/*{*/}
                {/*    selectPk !== null ?*/}
                {/*        <div style={{display:"flex",flexDirection:"row"}}>*/}

                {/*            <div>*/}
                {/*            <CapacityContainer>*/}
                {/*            </CapacityContainer>*/}
                {/*            <LineContainer>*/}
                {/*            </LineContainer>*/}
                {/*            </div>*/}

                {/*            <GraphContainer>*/}
                {/*                <div style={{display:"flex",flexDirection:"row"}}>*/}
                {/*                    <p>공정 04 불량률</p>*/}
                {/*                </div>*/}
                {/*            </GraphContainer>*/}
                {/*        </div>*/}
                {/*        :*/}
                {/*        null*/}
                {/*}*/}
            </OvertonTable>
    );
}

const CapacityContainer = Styled.div`
  width: 391px;
  height: 154px;
  border-radius: 6px;
  background-color: #ffffff;
`

const LineContainer = Styled.div`
  margin-top: 20px;
  width: 391px;
  height: 154px;
  border-radius: 6px;
  background-color: #ffffff;
`


const GraphContainer = Styled.div`
  margin-left: 20px;
  width: 690px;
  height: 522px;
  border-radius: 6px;
  background-color: #202020;
  p {
    padding: 20px 230px 15px 20px;
    font-size: 20px;
    font-family: NotoSansCJKkr-Bold;
  }
`

export default DefectiveContainer;
