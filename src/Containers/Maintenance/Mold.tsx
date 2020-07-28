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

  const indexList = {
    mold: {
      pk: 'PK',
      mold_name: '금형 명',
      location_name: '제조사 명',
      mold_type: '제조 번호',
    }
  }

  const onClick = useCallback((pk,mold_name) => {
    console.log(pk,mold_name);
    if(pk === selectPk){
      setSelectPk(null);
      setSelectMold(null);
    }else{
      setSelectPk(pk);
      setSelectMold(mold_name);
      //TODO: api 요청
      getData(pk);
    }



  }, [list, selectPk]);

  const getData = useCallback( async(pk)=>{
    //TODO: 성공시
    const res = await getRequest('http://211.208.115.66:8099/api/v1/preservation/press/mold/load?pk=' + pk, getToken(TOKEN_NAME))

    if(res === false){
      alert('[SERVER ERROR] 데이터를 로드 할 수 없습니다.')
    }else{
      if(res.status === 200){
        if(res.results === []){
          return;
        }
        setDetailList(res.results)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }

  },[detailList])


  const getList = useCallback(async ()=>{ // useCallback


    const res = await getRequest(`http://211.208.115.66:8099/api/v1/preservation/press/mold/list`, getToken(TOKEN_NAME))


    if(res === false){
        alert('[SERVER ERROR] 데이터를 로드 할 수 없습니다.')
    }else{
        if(res.status === 200){
            if(res.results === []){
                return;
            }
            console.log(res.results)
            setList(res.results)
        }else{
            alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        }
    }

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
          mainOnClickEvent={onClick}>
        {
          selectPk !== null ?
              <LineTable title={selectMold+' 수명 주기'}>
                {
                  <MoldBox>
                    <div>
                      <p>타수 카운팅</p>
                      <p>{detailList.max_count-detailList.current_count}회 남음</p>
                    </div>
                    <div>

                    </div>
                  </MoldBox>
                }
              </LineTable>
              :
              null
        }
      </OvertonTable>
  );
}

const MoldBox = Styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 30px 10px 0px;
`

export default MoldMaintenanceContainer;
