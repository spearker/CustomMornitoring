import React, { useEffect,useState,useCallback} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import tempIamge from '../../Assets/Images/temp_machine.png'
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'
import IC_UP from '../../Assets/Images/ic_monitoring_close.png'
import IC_DOWN from '../../Assets/Images/ic_monitoring_open.png'
import icCircle from '../../Assets/Images/ic_circle.png'
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'
import { Link } from 'react-router-dom';
import { changeStatusToString, changeStatusToColor } from '../../Common/statusFunctions';
import { machineCodeToName,transferCodeToName } from '../../Common/codeTransferFunctions';


interface Props{
    contents: IMonitoringList,
    isOpen: boolean,
    optionList?: number[],
    onClickEvent: any
}



// 모니터링 기본 카드 (가로 다섯개)
const MonitoringCardSmall = ({ contents , isOpen, optionList, onClickEvent}: Props) => {



  useEffect(()=>{
   
  },[])

  const StatusDiv = Styled.p`
    height: 100%;
    color: white;
    padding: 6px 11px 6px 11px;
    display: inline-block;
    border-radius: 5px;
    margin-right: 10px;
    float: left;
    font-size: 15px;
    font-weight: bold;
    background-color: ${changeStatusToColor(contents.status)};
  `
  const NavDiv = Styled.div`
    background-color: ${contents.status === 'error' ? '#5E1114' : 'black;'};
    border-radius: 6px;
    text-align: left;
  
    p, span{
      display: inline-block;
      font-weight: bold;
      font-size: 17px;
      padding-top: 4px;
    }
`
//717c90


  return (
    <WrapDiv>
      <BgDiv>
      <NavDiv>
      <StatusDiv>{changeStatusToString(contents.status)}</StatusDiv>
      <span style={{width:190}} className="p-limits">{contents.line!== undefined && ' (' + contents.line + ') '}{contents.name} </span>
        <p style={{width:190}} className="p-limits">{contents.code} </p>
        
         <img src={!isOpen ? IC_DOWN : IC_UP} onClick={onClickEvent} style={{width:20, cursor:'pointer', float: 'right', paddingTop: 7, marginRight: 11}} />
         <img src={!contents.is_connect ? icCloudOff : icCloudOn} style={{width:21, cursor:'pointer', float: 'right', paddingTop: 7, marginRight: 11}} />
      </NavDiv>
      <DownloadButton href={contents.file !== undefined ? contents.file : ''}  target="_blank">설명서다운로드</DownloadButton>
      <ErrorText>{contents.status === 'error' ? contents.info_list.find( v=> v.title === 903)?.value : ''}&nbsp;</ErrorText>
      <TimeDiv>
        {contents.running_time!== undefined &&
        <>
      <p className="p-limits">가동시간 
        { ' ' + contents.running_time  }
         </p>
         <p className="p-limits">비가동시간 
        { ' ' + contents.ready_time }
         </p>
         <p className="p-limits">가동율 
         {' ' + contents.percent + '%'}
         </p>
         </>
}
      </TimeDiv>
      <BodyDiv>
         
        {
          optionList !== undefined && 
          contents.info_list.filter(f => optionList.indexOf(Number(f.title)) !== -1).map((v,i)=>{
           
  
            if(!isOpen ){
              if(i < 5){
                return(
                  <>
                  <CardDiv>
                    <p className="p-limits" style={{fontSize:15, marginBottom:6, marginTop:4}}>{transferCodeToName('title', v.title,'kor')}</p>
                    <ValueText className="p-limits" style={String(v.value).length > 3 ? {fontSize:22} :{fontSize:27} }>{v.value === '' ? '-' : v.value }</ValueText>
                    <p style={{fontSize:12, marginBottom:6, marginTop:6}}>{transferCodeToName('unit', v.title,'kor')}&nbsp;</p>
                  </CardDiv>
                  </>
                )
              }
            }else{
              return(
                <>
                  <CardDiv>
                    <p className="p-limits" style={{fontSize:15, marginBottom:6, marginTop:4}}>{transferCodeToName('title', v.title,'kor')}</p>
                    <ValueText className="p-limits" style={String(v.value).length > 3 ? {fontSize:22} :{fontSize:27} }>{v.value === '' ? '-' : v.value }</ValueText>
                    <p style={{fontSize:12, marginBottom:6, marginTop:6}}>{transferCodeToName('unit', v.title,'kor')}&nbsp;</p>
                  </CardDiv>
                  
                  </>
              )
            }
          })
        }

      </BodyDiv>
      </BgDiv>
    </WrapDiv>

  );
}

const WrapDiv = Styled.div`
    border-radius: 6px;
    margin-bottom: 28px;
    margin-right: 28px;
    display: inline-block;
    width: 602px;
    color: white;
    padding-bottom: 11px;
`
const TimeDiv = Styled.div`
  p, span{
    width: 30%;
    padding-left: 12px;
    display: inline-block;
    font-weight: bold;
    font-size: 17px;
    text-align: left;
    padding-top: 4px;
  }
`

const BodyDiv = Styled.div`
  text-align: left;
  align-items: stretch;
  justify-content: flex-start;
  padding: 5px;
  padding-bottom: 0;
  border-radius: 6px;

`

const BgDiv = Styled.div`
  border-radius: 6px;
  background-color: ${BG_COLOR_SUB};
`


const CardDiv = Styled.div`
  border: solid 2px #3f3f4a;
  border-radius: 6px; 
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  margin-bottom: 10px;
  margin-right: 5px;
  min-height: 100px !important;
  width: calc(20% - 16px);
`

const DownloadButton = Styled.a`
  background-color: #717c90;
  padding: 3px 8px 3px 8px;
  font-weight: bold;
  float: right;
  font-size: 14px;
  border-radius: 3px;
  margin-top: 8px;
  margin-right: 11px;
`


const ErrorText = Styled.p`
  padding: 10px;
  padding-left: 12px;
  color: #ff461a;
  text-align: left;
`

const ValueText =  Styled.p`
  height: 37px;
`


export default MonitoringCardSmall;