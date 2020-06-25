import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";
import styled from 'styled-components';

//보전 리스트

const Pass = () => {
  return (
    <Div>
      <Div1>
        <P3>점검항목</P3>
        <P4>권장 점검 주기</P4>
        <P7>비고</P7>
      </Div1>

      <Hr />

      <Div2>
        <P3>오일</P3>
        <P5>3개월</P5>
        <P6>-</P6>
      </Div2>

      <Div2>
        <P3>부품</P3>
        <P5>6개월</P5>
        <P6>-</P6>
      </Div2>
    </Div>
  )
}

const MaintenanceListContainer = () => {

  const [hidden, setHidden] = useState (true);
  const [hidden2, setHidden2] = useState (true);
  const [hidden3, setHidden3] = useState (true);
  const [hidden4, setHidden4] = useState (true);
  const [hidden5, setHidden5] = useState (true);

  useEffect(()=>{

  },[])

  return (
<<<<<<< Updated upstream
    <div>
      <DashboardWrapContainer index={5}>
        <SubNavigation list={ROUTER_MENU_LIST[5]}/>
        <InnerBodyContainer>
=======
>>>>>>> Stashed changes
          <div style={{position:'relative'}}>

            <Header title={'보전 리스트'} />
            <div style={{position:'absolute',display:'inline-block' ,top:1, right:0, zIndex:4, width: 110, height: 20,  backgroundColor: "#717c90", paddingTop:3, paddingBottom:9, borderRadius: '6px'}}>
              <button> + 보전 등록 </button>
            </div>
              <DIV>
                <P>기계명</P>
                <P1>기계번호</P1>
              </DIV>

              <DIV2>
                <P>프레스01</P>
                <P2>000-456-789</P2>
                <Button1 onClick={ () => {
                  if (hidden === true) {
                    setHidden(false);
                  } else {
                    setHidden(true)
                  }
                }}>자세히 보기</Button1>
                <Button2>수정</Button2>
                <Button2>삭제</Button2>
              </DIV2>
              <div hidden={hidden}>
                <Pass />
              </div>


              <DIV2>
                <P>프레스02</P>
                <P2>000-456-789</P2>
                <Button1 onClick={ () => {
                  if (hidden2 === true) {
                    setHidden2(false);
                  } else {
                    setHidden2(true)
                  }
                }}>자세히 보기</Button1>
                <Button2>수정</Button2>
                <Button2>삭제</Button2>
              </DIV2>

              <div hidden={hidden2}>
                <Pass />
              </div>

              <DIV2>
                <P>프레스03</P>
                <P2>000-456-789</P2>
                 <Button1 onClick={ () => {
                  if (hidden3 === true) {
                    setHidden3(false);
                  } else {
                    setHidden3(true)
                  }
                }}>자세히 보기</Button1>
                <Button2>수정</Button2>
                <Button2>삭제</Button2>
              </DIV2>

              <div hidden={hidden3}>
                <Pass />
              </div>

              <DIV2>
                <P>프레스04</P>
                <P2>000-456-789</P2>
                  <Button1 onClick={ () => {
                  if (hidden4 === true) {
                    setHidden4(false);
                  } else {
                    setHidden4(true)
                  }
                }}>자세히 보기</Button1>
                <Button2>수정</Button2>
                <Button2>삭제</Button2>
              </DIV2>

              <div hidden={hidden4}>
                <Pass />
              </div>

              <DIV2>
                <P>프레스05</P>
                <P2>000-456-789</P2>
                <Button1 onClick={ () => {
                  if (hidden5 === true) {
                    setHidden5(false);
                  } else {
                    setHidden5(true)
                  }
                }}>자세히 보기</Button1>
                <Button2>수정</Button2>
                <Button2>삭제</Button2>
              </DIV2>

              <div hidden={hidden5}>
                <Pass />
              </div>
          </div>
<<<<<<< Updated upstream

        </InnerBodyContainer>
      </DashboardWrapContainer>
    </div>
=======
>>>>>>> Stashed changes
  );
}

const Div = styled.div`
  width: 1100px;
  height: 162px;
  background-color: #515664;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  line-height: 1.12;
  text-align: left;
  color: #ffffff;
`
const Div1 = Styled.div `
  display: flex;
  color:withe;
  padding-top: 25px;
  font-weight: bold;
`

const Div2 = Styled.div `
  display: flex;
  color:withe;
  padding-bottom: 20px;
`

const Hr = styled.hr`
  width: 1060px;
  margin-top: 12px;
  margin-bottom: 13.5px;
  background-color: white;
`

const DIV = Styled.div`
  width: 1100px;
  height: 50px;
  border-radius: 6px;
  background-color: #17181c;
  display: flex;
  margin-bottom: 18px;
  margin-top: 35px;
`;

const P = Styled.p`
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: bold;
  line-height: 0.93;
  text-align: left;
  color: #ffffff;
  padding-left: 20px;
  padding-top: 16px;
`;


const DIV2 = Styled.div`
  width: 1100px;
  height: 50px;
  background-color: #2b2c3b;
  display: flex;
  margin-top: 6px;
`;

const P1 = Styled.p`
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: bold;
  line-height: 0.93;
  text-align: left;
  color: #ffffff;
  padding-left: 256px;
  padding-top: 16px;
`;

const P2 = Styled.p`
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: bold;
  line-height: 0.93;
  text-align: left;
  color: #ffffff;
  padding-left: 231px;
  padding-top: 16px;
`;

const P3 = Styled.p`
padding-left: 20px;
`;

const P4 = styled.p `
  padding-left: 245px;
`;

const P5 = styled.p`
  padding-left: 275px;
`
const P6 = styled.p `
  padding-left: 502px;
`

const P7 = styled.p `
  padding-left: 438px;
`

const Button1 = Styled.button`
  width: 112px;
  height: 30px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #717c90;
  margin-top: 10px;
  margin-left: 365px;
`;

const Button2 = Styled.button`
  width: 68px;
  height: 30px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #717c90;
  margin-top: 10px;
  margin-left: 16px;
`;


export default MaintenanceListContainer;
