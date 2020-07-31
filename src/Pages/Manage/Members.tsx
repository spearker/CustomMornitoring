import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import { getRequest } from '../../Common/requestFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {      ROUTER_MENU_LIST } from '../../Common/routerset';
import InfoTable from '../../Components/Table/InfoTable';

// 직원 리스트
const Members = () => {

  const [list, setList] = useState<IMmember[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [option, setOption] = useState<number>(0);

  const index = {
    name:'성명',
    team:'소속부서',
    appointment:'직급',
    year:'연차',
    join_date:'입사일',
    join_type:'채용형태',
    email:'이메일',
    status:'상태'
  }

  /**
   * getList()
   * 직원 리스트 조회
   * @param {string} url 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getList = useCallback(async ()=> {
    const results = await getRequest('http://211.208.115.66:8299/api/v1/member/list?keyword='+keyword +'&orderBy='+option, getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === undefined){
        return;
      }
      if(results.status === 200){
          setList(results.results)

      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[list, keyword, option])



  useEffect(()=>{

    //setList(dataSet.memberList); //TODO: 테스트용. 지울것.
    getList();

  },[])



  return (
      <DashboardWrapContainer index={1}>
        <SubNavigation list={ROUTER_MENU_LIST[1]}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'구성원 관리'}/>
          </div>

          <InfoTable indexList={index} type={'member'} pkKey={'pk'} onClickLinkUrl="/manage/members/update?pk=" contents={list} />

        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}

export default Members;
