import React, {useEffect} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB} from '../../Common/configset'
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'
import IC_UP from '../../Assets/Images/ic_monitoring_close.png'
import IC_DOWN from '../../Assets/Images/ic_monitoring_open.png'
import {changeStatusToColor, changeStatusToString} from '../../Common/statusFunctions'
import {transferCodeToName} from '../../Common/codeTransferFunctions'


interface Props {
  contents: IMonitoringList,
  isOpen: boolean,
  optionList?: number[],
  onClickEvent: any
}


// 모니터링 기본 카드
const MonitoringCard = ({contents, isOpen, optionList, onClickEvent}: Props) => {


  useEffect(() => {

  }, [])

  const StatusDiv = Styled.p`
    height: 100%;
    color: black;
    padding: 6px 11px 6px 11px;
    display: inline-block;
    border-radius: 5px;
    margin-right: 10px;
    float: left;
    font-size: 15px;
    font-weight: bold;
    background-color: ${changeStatusToColor(contents.operation)};
  `
  const NavDiv = Styled.div`
    background-color: ${contents.operation === 0 ? '#5E1114' : 'black;'};
    border-radius: 6px;
    margin-top: 12px;
    text-align: left;
  
    p, span{
      display: inline-block;
      font-weight: bold;
      font-size: 17px;
      padding-top: 4px;
    }
`
  return (
    <WrapDiv>
      <NavDiv>
        <StatusDiv>{changeStatusToString(contents.operation)}</StatusDiv>
        <span style={{width: 190}}
              className="p-limits">{contents.line !== undefined && ' (' + contents.line + ') '}{contents.name} </span>
        <p style={{width: 190}} className="p-limits">{contents.code} </p>
        {
          contents.running_time !== undefined &&
          <>
              <p style={{width: 190}} className="p-limits">가동시간
                {' ' + contents.running_time}
              </p>
              <p style={{width: 200}} className="p-limits">비가동시간
                {' ' + contents.ready_time}
              </p>
              <p style={{width: 200}} className="p-limits">가동율
                {' ' + contents.percent + '%'}
              </p>
          </>
        }


        <img src={!isOpen ? IC_DOWN : IC_UP} onClick={onClickEvent}
             style={{width: 20, cursor: 'pointer', float: 'right', paddingTop: 7, marginRight: 11}}/>
        <img src={!contents.is_connected ? icCloudOff : icCloudOn}
             style={{width: 21, float: 'right', paddingTop: 7, marginRight: 11}}/>
      </NavDiv>
      {/*{contents.file !== undefined ?*/}
      {/*  <DownloadButton href={contents.file}*/}
      {/*                  target="_blank">설명서다운로드</DownloadButton>*/}
      {/*  :*/}
      {/*  <DownloadButton target="_blank">설명서다운로드</DownloadButton>*/}
      {/*}*/}
      <ErrorText>{contents.operation !== 0 && !contents.error ?
        <span style={{color: '#717c90'}}>에러 정보가 없습니다.</span> : contents.error} </ErrorText>
      <BodyDiv>
        {
          optionList !== undefined &&
          contents.info_list.filter(f => optionList.indexOf(Number(f.title)) !== -1).map((v, i) => {


            if (!isOpen) {
              if (i < 10) {
                return (
                  <>
                    <CardDiv>
                      <p className="p-limits" style={{
                        fontSize: 15,
                        marginBottom: 6,
                        marginTop: 4
                      }}>{transferCodeToName('title', v.title)}</p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: v.title === 113 && v.value === 2 || v.value === 4 ? 30 : 40,
                        paddingTop: v.title === 113 && v.value === 2 || v.value === 4 ? 10 : 0
                      }}>
                        <ValueText className="p-limits"
                                   style={
                                     String(v.value).length > 3
                                       ? {fontSize: 22}
                                       : v.title === 113 && v.value === 2 || v.value === 4
                                       ? {fontSize: 15}
                                       : {fontSize: 27}
                                   }
                        >{v.value === '' ? '-' : v.title === 113 ? transferCodeToName('keycam', v.value) : v.value}</ValueText>
                      </div>
                      <p style={{
                        fontSize: 12,
                        marginBottom: 6,
                        marginTop: 6
                      }}>{transferCodeToName('unit', v.title)}&nbsp;</p>
                    </CardDiv>
                  </>
                )
              }
            } else {
              return (
                <>
                  <CardDiv>
                    <p className="p-limits" style={{
                      fontSize: 15,
                      marginBottom: 6,
                      marginTop: 4
                    }}>{transferCodeToName('title', v.title)}</p>
                    <div>
                      <ValueText className="p-limits"
                                 style={
                                   String(v.value).length > 3
                                     ? {fontSize: 22}
                                     : v.title === 113 && v.value === 2 || v.value === 4
                                     ? {fontSize: 15}
                                     : {fontSize: 27}
                                 }
                      >{v.value === '' ? '-' : v.title === 113 ? transferCodeToName('keycam', v.value) : v.value}</ValueText>
                    </div>
                    <p style={{
                      fontSize: 12,
                      marginBottom: 6,
                      marginTop: 6
                    }}>{transferCodeToName('unit', v.title)}&nbsp;</p>
                  </CardDiv>
                </>
              )
            }
          })
        }

      </BodyDiv>
    </WrapDiv>
  )
}


const StatusDiv = Styled.div`
    padding: 2px 11px 3px 11px;
    color: white;
    display: inline-block;
    border-radius: 5px;
    margin-right: 14px;
    font-size: 15px;
`
const WrapDiv = Styled.div`
    background-color: ${BG_COLOR_SUB};
    border-radius: 6px;
    margin-bottom: 28px;
    padding-bottom: 11px;
`

const ProcessBody = Styled.div`
  margin: 10px;
  color: #252525;
`
const ProcessCardDiv = Styled.div`
   width: 240px;
   background-color: #e7e9eb;
   display: inline-block;
   border-radius: 5px;
   margin: 12px;
`

const BodyDiv = Styled.div`
  text-align: left;
  align-items: stretch;
  justify-content: flex-start;
  padding: 5px;
  padding-bottom: 0;
`

const ErrorText = Styled.p`
  padding: 10px;
  padding-left: 12px;
  color: #ff461a;
  text-align: left;
`

const ValueText = Styled.p`
  height: 37px;
`

const CardDiv = Styled.div`
  border: solid 2px #3f3f4a;
  border-radius: 6px; 
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  margin-bottom: 10px;
  margin-right: 5px;
  height: 100px !important;
  min-height: 100px !important;
  width: calc(10% - 16px);
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

export default MonitoringCard
