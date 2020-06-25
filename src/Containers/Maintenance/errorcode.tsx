import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";
import ErrorCodeTrs from "./errorCodeTrs"
import Styled, { css } from 'styled-components'

//에러 코드 로그 (디자인 안나옴)

//캘린더 api 는 react-calendar
//사용법 : https://www.npmjs.com/package/react-calendar
const ErrorCodeMaintenanceContainer = () => {

  const [press, setPress] = useState([
    {
      id: '1',
      name: '프레스01',
      number: '000-000-00000',
      errorCode: 'FFFFFF',
      date: '2020-06-02',
      remark:'-',
      moreAction: false,
      action: true,
    },
    {
      id: '2',
      name: '프레스02',
      number: '000-000-00000',
      errorCode: 'FFFFFF',
      date: '2020-05-26',
      remark:'-',
      moreAction: false,
      action: true,
    },
    {
      id: '3',
      name: '프레스03',
      number: '000-000-00000',
      errorCode: 'FFFFFF',
      date: '2020-05-25',
      remark:'-',
      moreAction: false,
      action: true,
    },
    {
      id: '4',
      name: '프레스04',
      number: '000-000-00000',
      errorCode: 'FFFFFF',
      date: '2020-05-25',
      remark:'-',
      moreAction: false,
      action: true,
    },
    {
      id: '5',
      name: '프레스05',
      number: '000-000-00000',
      errorCode: 'FFFFFF',
      date: '2020-05-02',
      remark:'-',
      moreAction: false,
      action: true,
    }
  ]);

  useEffect(()=>{

  },[]);

  const onToggle = useCallback(id => {
    setPress(press.map(
        pres => pres.id === id
            ? { ...pres, moreAction: !pres.moreAction }
            : pres
    ));
  }, [press]);

  const onToggle2 = useCallback(id => {
    setPress(press.map(
        pres => pres.id === id
            ? { ...pres, action: !pres.action }
            : pres
    ));
  }, [press]);

  return (
      <div>
<<<<<<< Updated upstream
        <DashboardWrapContainer index={5}>
          <SubNavigation list={ROUTER_MENU_LIST[5]}/>
          <InnerBodyContainer>
            <div style={{position:'relative'}}>

              <Header title={'에러코드 로그'} />
=======
      <Header title={'에러코드 로그'} />
>>>>>>> Stashed changes

            </div>
            <ListBox>
              <ListTitleDiv>
                <Span1>기계명</Span1>
                <Span2>기계 번호</Span2>
                <Span3>에러코드</Span3>
                <Span4>날짜</Span4>
                <Span5>비고</Span5>
              </ListTitleDiv>
              {
                press.map(
                    (pres, index) => (
                        <ErrorCodeTrs key={index} pres={pres} onToggle={onToggle} onToggle2={onToggle2} />
                    )
                )
              }

            </ListBox>
          </InnerBodyContainer>
        </DashboardWrapContainer>
      </div>
  );
}

const ListBox = Styled.div`
  width: 1100px;
  text-align: left;
`;
const ListTitleDiv = Styled.div`
  display: table;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  background-color: #17181c;
  margin-bottom: 20px;
`;

const Display = css`
  display: table-cell;
  vertical-align: middle;
`;

const Span1 = Styled.p`
  padding-left: 20px;
  width: 200px;
  ${Display}
`;

const Span2 = Styled.p`
  width: 200px;
  ${Display}
`;

const Span3 = Styled.p`
  width: 200px;
  ${Display}
`;

const Span4 = Styled.p`
  width: 200px;
  ${Display}
`;

const Span5 = Styled.div`
   width: 200px;
  ${Display}
`;




export default ErrorCodeMaintenanceContainer;
