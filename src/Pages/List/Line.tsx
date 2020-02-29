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
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import CardList from '../../Components/Card/CardList';
import SmallButton from '../../Components/Button/SmallButton';
import { getRequest } from '../../Common/requestFunctions';

// 라인 리스트
const LineList = () => {

  interface Line{
    line_code: string,
    line_detail: string,
    line_machines: LineMachine[],
    line_name: string,
  }
  interface LineMachine{
    machine_code: string,
    machine_photo: string,
    machine_name: string,
    is_connected: boolean,
  }

  const [list, setList] = useState<Line[]>([]);
  const [option, setOption] = useState<number>(0);

  const optionList = [
    "등록순", "라인 이름 순", "라인 상세정보 순"
  ]

  const getList = () => {
    const results = getRequest(BASE_URL + '/password/send', getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
        
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  }

  useEffect(()=>{

    //setList(dataSet.listList); //TODO: 테스트용. 지울것.
    getList()
   
  },[])

  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)

  },[])

  return (
      <DashboardWrapContainer>
        <FullPageDiv>
          <div style={{position:'relative'}}>
            <Header title={'라인 정보 리스트'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={setOption}/>
            </div>
          </div>
          {
              list.map((value: Line)=>{
                return(
                <div style={{marginBottom:15}}>
                  <WhiteBoxContainer>
                    <div style={{display:'flex'}}>
                      <div style={{width:268, borderRight:'1px solid #525252', position:'relative'}}>
                        <p style={{fontSize:26}}>{value.line_code}</p>
                        <p style={{paddingRight:40, marginTop:49, height:'calc(100% - 90px)', fontSize:13, overflow:'scroll'}}>
                          {value.line_detail}
                        </p>
                        <div style={{position:'absolute', top: 0, right: 10}}>
                          <SmallButton name={'수정하기'} onClickEvent={()=>{onClickModify(value.line_name)}}/>
                        </div>
                        
                      </div>
                    <div style={{paddingLeft:19, width:'100%', overflow:'scroll'}}>
                    {
                      value.line_machines.map((v: LineMachine)=>{
                        return(
                          <CardList code={v.machine_code} imgUrl={v.machine_photo} name={v.machine_name} on={v.is_connected}/>
                        )
                      })
                    }
                    </div>
                  </div>
                </WhiteBoxContainer>
                </div>
                )
              })
            }
        
        </FullPageDiv>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default LineList;