import React, { useEffect, useState } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';
import StatusTag from '../Text/StatusTag';
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_dim.png'
import { transferCodeToName } from '../../Common/codeTransferFunctions';
import { changeStatusToString, changeStatusToColor } from '../../Common/statusFunctions';


interface IProps{
    contents: IMonitoringList[],
    filterList?: number[],
    status: string
}


const MonitoringVerticalTable = ({ contents, filterList, status}: IProps) => {

  const [list, setList] = useState(contents);
  const indexList: any[] = [];

  useEffect(()=>{
    if(status !== 'all'){
      console.log('change')
      setList(contents.filter(v => v.status === status))
    }else{
      setList(contents)
    }

  },[status])


  useEffect(()=>{


  },[])


  return (
    <WrapDiv>
      {
        list.length > 0 ?

      <TableWrapDiv>
          <tbody>
            <tr>
              <th>
                기계명
              </th>
              {
                list.map((v)=>{
                  return (<th>{v.name}</th>)
                })
              }
            </tr>

            <tr>
              <td>
                기계번호
              </td>
              {
                list.map((v)=>{
                  return (<td>{v.code}</td>)
                })
              }
            </tr>
            <tr>
              <td>
                장비상태
              </td>
              {
                list.map((v)=>{
                  return (<td><StatusDiv style={{backgroundColor:changeStatusToColor(v.status)}}>{changeStatusToString(v.status)}</StatusDiv></td>)
                })
              }
            </tr>
            <tr>
              <td>
                설명서
              </td>
              {
                list.map((v)=>{
                  return (<td>{v.file !== undefined &&  <DownloadButton href={v.file} target="_blank">다운로드</DownloadButton>}</td>)
                })
              }
            </tr>
            <tr>
              <td>
                연결상태
              </td>
              {
                list.map((v)=>{
                  return (
                  <td>
                  <img src={!v.is_connect ? icCloudOff : icCloudOn} style={{width:21}} />
                  </td>
                  )
                  }
                )
                }

            </tr>
            <tr>
              <td>
                가동율
              </td>
              {
                list.map((v)=>{
                  return (<td>{v.percent !== undefined && v.percent}</td>)
                })
              }
            </tr>
            <tr>
              <td>
                가동시간
              </td>
              {
                list.map((v)=>{
                  return (<td>{v.running_time !== undefined && v.running_time}</td>)
                })
              }
            </tr>
            <tr>
              <td>
                비가동시간
              </td>
              {
                list.map((v)=>{
                  return (<td>{v.ready_time !== undefined && v.ready_time}</td>)
                })
              }
            </tr>
            {
                list.length > 0 && list[0].info_list.filter(v => filterList!.indexOf( Number(v.title)) !== -1 ).map((m, i)=>{
                  return (
                    <tr key={'i'+ i}>
                      <td> {transferCodeToName('title', m['title'])}</td>
                      {
                        list.map((c)=>{
                          return (
                            c.info_list.map((ci, i)=>{

                              if(ci['title'] == m['title']){
                                return(<td>{ci['value']}</td>)
                              }

                            })
                          )
                        })
                      }
                    </tr>
                    )
                })
              }

          </tbody>
      </TableWrapDiv>
        :
        <p style={{margin:100}}>모니터링 데이터가 없습니다</p>
            }
    </WrapDiv>

  );
}
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
const StatusDiv = Styled.p`
height: 100%;
color: white;
padding: 3px 9px 3px 9px;
display: inline-block;
border-radius: 5px;
font-size: 14px;
font-weight: bold;
`
const WrapDiv = Styled.div`
    width: 100%;
    overflow-x: scroll;
    table {
      text-align: center;
      max-width: 100%,
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      background-color: #f4f6fa;
      color: #252525;
      font-size: 15px;
      overflow-x: scroll;
      overflow: auto;
      vertical-align: middle;
      background-color: ${BG_COLOR_SUB2};
      border-collapse:separate; 
      border-spacing: 0 1em;
      .img{
        float:left 
      }
    }
    tbody{
      max-width: 100%;
    }
    th, td{
      max-width: 218px !important;
    }
    tr{
    
      box-sizing: border-box;
      border: 0;
      vertical-align: middle;
      border-radius: 5px;
      vertical-align: middle;
      background-color: ${BG_COLOR_SUB};
      border: 1px;
      border-collapse: separate;
      border-spacing: 0 15px;
      margin-bottom: 12px;
    }
    td, th {
      overflow: visible;
      vertical-align: middle;
    
      padding: 0;
      vertical-align: middle;
      color: white;
    }
    td{
      
      padding-top: 12px;
      padding-bottom: 12px;
    }
    th{
      padding-top: 12px;
      padding-bottom: 12px;
    }
    th:first-child {
      width: 100px;
      min-width: 100px;
    }
    th:first-child{
      text-align: center;
    }
    tr:first-child{
      background-color: black;
    }
    th:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
    th:last-child { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }

    td:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
    td:last-child { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }

    td:first-child {
      text-align: center;
    }
   
`

const TableWrapDiv  = Styled.table`

  
   
`


export default MonitoringVerticalTable;
