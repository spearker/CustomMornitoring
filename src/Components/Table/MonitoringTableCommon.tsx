import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';
import StatusTag from '../Text/StatusTag';
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_dim.png'
import { transferCodeToName } from '../../Common/codeTransferFunctions';


interface Props{
  pk?: string,
  contents: IMonitoringList[],
  openTarget?: string,

}

const MonitoringTableCommon = ({pk, contents, openTarget}: Props) => {

  useEffect(()=>{
   //console.log(Object.keys(indexList))
  },[])

  return (
    <TableWrap>
      <table>
        <tbody>
          <tr className="p-bold" style={{borderBottom:`10px solid ${BG_COLOR_SUB2}`}}>
          <th style={{fontSize:13}}>상태</th>
          <th style={{fontSize:13}}>장비명</th>
          <th style={{fontSize:13}}>번호</th>
          {/* 테이블 헤드 */}
          {
            contents.length > 0 && contents[0].info_list.map((v, i)=>{
              return(
              <th style={{fontSize:13}} key={'th-'+ i}>{transferCodeToName('title', v['title'])}</th>
              )
            })
          }
          <th> </th>
          </tr>
          {/* 테이블 바디 */}
          {
            contents.map((v, i)=>{
              return(
              <tr key={'tr-'+i}>
                <td><StatusTag text={String(v.operation)}/></td>
                <td>{v.name}</td>
                 <td>{v.code}</td>
                {
                  v.info_list.map((mv, mi)=>{
                    return(

                      <td key={'td-' + mi}>
                        {mv['value']}
                      </td>
                    )
                  })
                }

              </tr>
              )
            })
          }

        </tbody>
      </table>
    </TableWrap>

  );
}

const TableWrap = Styled.div`
    display: flex;
    table {
      max-width: 100%,
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      background-color: #f4f6fa;
      color: #252525;
      font-size: 14px;
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
      text-align: left;
      padding: 0;
      vertical-align: middle;
      color: white;
    }

    th{
      padding-top: 12px;
      padding-bottom: 12px;
    }
    th:first-of-type {
      width: 100px;
      min-width: 100px;
    }
    th:first-child{
      text-align: center;
    }
    th:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
    th:last-child { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }

    td:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
    td:last-child { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }

    td:last-child {
      padding-right:10px;
    }

    
`

export default MonitoringTableCommon;
