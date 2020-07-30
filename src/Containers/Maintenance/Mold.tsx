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

//금형 보전 관리

//캘린더 api 는 react-calendar
//사용법 : https://www.npmjs.com/package/react-calendar
const MoldMaintenanceContainer = () => {

  const [list, setList] = useState<any[]>([]);
  const [detailList,setDetailList] = useState<any>({
    max_count: 0,
    current_count: 0,
    pk: ""
  });
  const [index, setIndex] = useState({pk:'PK'});
  const [selectPk, setSelectPk ]= useState<any>(null);
  const [selectMold, setSelectMold ]= useState<any>(null);
  const [selectValue, setSelectValue ]= useState<any>(null);

  const indexList = {
    mold: {
      pk: 'PK',
      mold_name: '금형 명',
      location_name: '제조사 명',
      mold_type: '제조 번호',
    }
  }

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
      getData(mold.pk);
    }



  }, [list, selectPk]);

  const getData = useCallback( async(pk)=>{
    //TODO: 성공시
    const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
    const res = await getMoldData(tempUrl)

    setDetailList(res)

  },[detailList])

  const WidthPercent = detailList.current_count/detailList.max_count*100

  let firstData = 0

  const getList = useCallback(async ()=>{ // useCallback
    //TODO: 성공시
    const tempUrl = `${API_URLS['mold'].list}`
    const res = await getMoldData(tempUrl)

    setList(res)

  },[list])

  useEffect(()=>{
    getList()
    setIndex(indexList["mold"])

  },[])

  return (
      <OvertonTable
          title={'금형 수명 주기'}
          indexList={index}
          valueList={list}
          clickValue={selectValue}
          mainOnClickEvent={onClick}>
        {
          selectPk !== null ?
              <LineTable title={selectMold+' 수명 주기'}>
                {
                  <CountingContainer>
                    <div>
                      <p>타수 카운팅</p>
                      <p>{detailList.max_count-detailList.current_count}회 남음</p>
                    </div>
                    <div>
                      <MoldMaxBar>
                        <div style={{width: WidthPercent+"%" }}>

                        </div>
                      </MoldMaxBar>
                      <CountingNum>
                        {[0,1,2,3,4,5].map((v, i)=>{
                          return(
                              <span>{v*=(detailList.max_count/5)}</span>
                          )
                        })}
                      </CountingNum>
                      <div style={{display: "flex",justifyContent:"flex-end"}}>
                        <span>(회)</span>
                      </div>
                    </div>
                  </CountingContainer>
                }
              </LineTable>
              :
              null
        }
      </OvertonTable>
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

export default MoldMaintenanceContainer;
