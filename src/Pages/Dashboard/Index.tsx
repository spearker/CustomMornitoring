import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import SubHeader from '../../Components/Text/SubHeader';
import moment from 'moment';
import 'moment/locale/ko';
import { render } from '@testing-library/react';
import DayCard from '../../Components/Card/DayCard';

// 대시보드 메인 페이지
const Dashboard = () => {

  const [targetDay, setTagetDay] = useState<string>(moment().locale('en').format('YYYY-MM-DD'))
  const [dayList, setDayList] = useState<string[]>([])

  
  const getDayList = useCallback((e)=>{
    var tempList = new Array();
    for(var i = 0; i < 7 ; ++i){
      if(moment().add( 0 - i  ,"days").locale('en').format('dddd') === 'Sunday'){
        
        for(var j = 0; j < 7; ++j ){
          tempList.push(moment().add( 0 - i + j  ,"days").locale('en').format('YYYY-MM-DD'))
        }
        return tempList
      }
    }
    return tempList
  },[dayList])

  const onClickChangeDay = useCallback((day)=>{
    console.log(day)
    setTagetDay(day);
  },[targetDay])

  useEffect(()=>{
    console.log(targetDay)
    setDayList(getDayList());
  },[])

  return (
      <DashboardWrapContainer>
        <FullPageDiv>
            <div className="p-bold" style={{marginTop:75, display:'flex', borderBottom:'1px solid gray'}}>
              <div style={{width:380, marginRight: 20 }}>
                <SubHeader title={'오늘 일정'}/>
                <div style={{ fontWeight:'bold', color:'black', height:150, display:'flex', position:'relative',  paddingTop:24, paddingBottom:24, marginTop:14, marginBottom:30, backgroundColor:POINT_COLOR}}>
                  <div style={{ width: 137, borderRight:'1px solid #252525'}}>
                    <p style={{paddingLeft:24, fontSize:29, textAlign:'left'}}>{moment().format('YYYY')}.<br/>{moment().format('MM.DD')}</p>
                    <p style={{marginTop:45, paddingLeft: 24, fontSize:29, textAlign:'left'}}>{moment().format('dddd')}</p>
                  </div>
                  <div style={{width:60, fontSize:14, paddingLeft:22, paddingRight:22}}>
                    <p style={{borderTop:'1px solid black', paddingTop:7, marginBottom:10}}>기한 임박</p>
                    <p style={{fontSize:28}}>0</p>
                    <p style={{borderTop:'1px solid black', paddingTop:7, marginTop:11, marginBottom:10}}>기한 경과</p>
                    <p style={{fontSize:28}}>0</p>
                  </div>
                  <p style={{position:'absolute', fontWeight:'bold', top:16, right:24, fontSize:150}}>0</p>
                </div>
              </div>
              <div style={{width: 'calc(100% - 380px)' }}>
                <SubHeader title={'주간 일정 현황'}/>
                <div style={{ fontWeight:'bold', color:'black', height:150, display:'flex',paddingBottom:24, marginTop:13, marginBottom:30}}>
                  {
                    dayList.map((v, index)=>{
                      return(
                          <DayCard onClickEvent={index == 0 || index == 6 ? ()=>{} :onClickChangeDay} key={v} id={v} date={moment(v).format('dd MM.DD')} num={0} on={v === targetDay ? true : false} dim={index == 0 || index == 6 ? true : false}/>
                      )
                    })
                  }
                </div>
              </div>
            </div>
        </FullPageDiv>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  padding-top:40px;
  background-color: ${BG_COLOR_SUB2}
`


export default Dashboard;