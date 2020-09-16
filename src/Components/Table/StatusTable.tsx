import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';
import { Link } from 'react-router-dom';
import NormalNumberInput from '../Input/NormalNumberInput';
import StatusTag from '../Text/StatusTag';
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_dim.png'




interface IProps{
    indexList: any,
    contents: any,
    keyName: string,
    onClickEvent?: any,
    buttonName?: string,
    widthList?: string[],
    link?: string,
    newStock?: number,
    onChangeEvent?: any,
    eventType?: string,
}


const StatusTable = ({indexList, contents, widthList,eventType, link, keyName, onClickEvent ,buttonName, newStock, onChangeEvent}: IProps) => {

  useEffect(()=>{
   console.log(Object.keys(indexList))
  },[])

  return (
    <TableWrap>
      <table>
        <tbody>
         
          {/* 테이블 바디 */}
        
          {
            contents.map((v, i)=>{
              return(
              <tr key={i}>

                {
                  Object.keys(indexList).map((mv, mi)=>{
                    return(
                      <td key={mv} style={{ maxWidth: widthList !== undefined ? widthList[mi] : 'auto' , width: widthList !== undefined ? widthList[mi] : 'auto'}}>
                        {mi === 0 || mi=== 1 || mv === 'is_connect' ? '': 'ㅣ   '}
                        {mv === 'status' ? <StatusTag text={String(v[mv])}/>:v[mv] + ' '}
                        {mv === 'group' ? <img style={{height:19,float:'left', marginRight:8}} src={v['is_connect'] ? icCloudOn : icCloudOff} />:null}
                     
                      </td>
                    )
                  })
                }
                {
                  eventType !== 'input' && onClickEvent!== null?
                  <td style={{width: '100px', paddingTop:6, paddingBottom:6, paddingRight:0, textAlign:'right'}}>
                    <SmallButton name={buttonName} onClickEvent={()=>{onClickEvent(v[keyName], v['status'])}}/>
                  </td>
                :
                null
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
const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 5px;
    margin-left: 5px;
    width: 86px;
    display: inline-bolck
    background-color: #f4f6fa;
`


export default StatusTable;
