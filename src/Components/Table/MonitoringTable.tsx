import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, BG_COLOR_SUB2} from '../../Common/configset'
import StatusTag from '../Text/StatusTag';
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_dim.png'


interface IProps{
    indexList: any,
    contents: any,
    keyName: string,
    //onClickEvent?: any,
}


const MonitoringTable = ({indexList, contents, keyName}: IProps) => {

  return (
    <TableWrap>
      <table>
        <tbody>
          <tr className="p-bold" style={{borderBottom:`10px solid ${BG_COLOR_SUB2}`}}>
          {/* 테이블 헤드 */}
          {
            Object.keys(indexList).map((v, i)=>{
              return(
              <th style={{fontSize:13}} key={v}>{i === 0 || i === 1 || indexList[i] === 'is_connect' ? ` ${indexList[v]}`: `ㅣ   ${indexList[v]}`}</th>
              )
            })
          }
          <th> </th>
          </tr>
          {/* 테이블 바디 */}
          {
            contents.map((v, i)=>{
              return(
              <tr key={i}>
                {
                  Object.keys(indexList).map((mv, mi)=>{
                    return(
                      <td key={mv}>
                        {mi === 0 || mi=== 1 || mv === 'is_connect' ? '': 'ㅣ   '}
                        {mv === 'status' ? <StatusTag text={String(v[mv])}/>:v[mv] + ' '}
                        {mv === 'group' ? <img style={{height:19,float:'left', marginRight:8}} src={v['is_connect'] ? icCloudOn : icCloudOff} />:null}
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

export default MonitoringTable;
