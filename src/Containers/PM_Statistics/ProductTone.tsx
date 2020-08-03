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


const ProductToneContainer = () => {

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
        productTone: {
            pk: 'PK1',
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
            pk: 'PK1',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            all_dot: '00 ea',
            normal_dot: '00 ea',
            bad_dot: '6 ea',
            defective_product: '5 ea'
        },
        {
            pk: 'PK2',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            all_dot: '총 dot 개수',
            normal_dot: '정상 dot 개수',
            bad_dot: '불량 dot 개수',
            defective_product: '불량품 개수'
        },
        {
            pk: 'PK3',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            all_dot: '총 dot 개수',
            normal_dot: '정상 dot 개수',
            bad_dot: '불량 dot 개수',
            defective_product: '불량품 개수'
        },
        {
            pk: 'PK4',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            all_dot: '총 dot 개수',
            normal_dot: '정상 dot 개수',
            bad_dot: '불량 dot 개수',
            defective_product: '불량품 개수'
        },
        {
            pk: 'PK5',
            product_name: '품목(품목명)',
            factory_name: '공정명',
            segmentation_factory: '세분화 공정',
            all_dot: '총 dot 개수',
            normal_dot: '정상 dot 개수',
            bad_dot: '불량 dot 개수',
            defective_product: '불량품 개수'
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
        setIndex(indexList["ProductTone"])
        setList(dummy)
        setDetailList(detaildummy)
    },[])

    const WidthPercent = detaildummy[0].current_count/detaildummy[0].max_count*100


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

                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
        </div>
    );
}

const CountingContainer = Styled.div`
   display: flex;
   flex-direction: row;
   margin-right: 20px;
   p {
    font-size: 14px;
      &:first-child{
      font-family: NotoSansCJKkr-Bold;
      }
   }
`
const MoldArrowContainer = Styled.div`
  margin-top: 1px;
  margin-left: 85px;
  width: 870px;
  height: 20px;
  border: 0;
  border-radius: 25px;
  div {
    width: 10px;
    height: 20px;
    border: 0;
    border-radius: 25px;
    background-color: #fd6b00;
  }
`

const MoldMaxBar = Styled.div`
  margin-top: 1px;
  margin-left: 85px;
  width: 870px;
  height: 20px;
  border: 0;
  border-radius: 25px;
  background-color: #1b2333;
  div {
    height: 20px;
    border: 0;
    border-radius: 25px;
    background-color: #fd6b00;
  }
`

const CountingNum = Styled.p`
   margin-left: 85px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   span {
      font-size: 14px;
   }
`

const BottomBox = Styled.div`
    display: inline-block;
    p {
        font-size: 20px;
         &:first-child{
            font-size: 40px;
            }
    }
`

export default ProductToneContainer;
