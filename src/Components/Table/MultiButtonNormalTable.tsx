import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';
import { Link } from 'react-router-dom';
import NormalNumberInput from '../Input/NormalNumberInput';



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
    onClickEvent2?: any,
    buttonName2?: string,
    eventType?: string,
}


const MultiButtonNormalTable = ({indexList, contents, buttonName2, onClickEvent2, widthList, eventType, link, keyName, onClickEvent ,buttonName, newStock, onChangeEvent}: IProps) => {

  useEffect(()=>{
   console.log(Object.keys(indexList))
  },[])

  return (
    <TableWrap>
      <table>
        <tbody>
          <tr className="p-bold" style={{borderBottom:`10px solid ${BG_COLOR_SUB2}`}}>
          {/* 테이블 헤드 */}
          <th style={{textAlign:'center', width:'40px', maxWidth:'45px'}}>번호</th>
          {
            Object.keys(indexList).map((v, i)=>{
              return(
              <th key={v}>{indexList[v]}</th>
              )
            })
          }
          <th> </th>
          <th> </th>
    
          </tr>
          {/* 테이블 바디 */}
        
          {
            contents.map((v, i)=>{
              return(
              <tr key={i}>
               
                <td style={{textAlign:'center', width:'40px', maxWidth:'45px'}}>{i+1}</td>
                {
                  Object.keys(indexList).map((mv, mi)=>{
                    return(
                      <td key={mv} style={{ maxWidth: widthList !== undefined ? widthList[mi] : 'auto' , width: widthList !== undefined ? widthList[mi] : 'auto'}}>
                        
                          v[mv]

                      </td>
                    )
                  })
                }
                {
                  eventType !== 'input'?
                  <>
                  <td style={{width: '100px'}}>
                    <SmallButton name={buttonName} onClickEvent={()=>{onClickEvent(v[keyName])}}/>
                  </td>
                  <td style={{width: '100px'}}>
                    <SmallButton name={buttonName2} onClickEvent={()=>{onClickEvent2(v[keyName])}}/>
                  </td>
                  </>
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

    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      background-color: #f4f6fa;
      color: #252525;
      font-size: 14px;
    }
    td, th {
      border-bottom: 1px solid ${BG_COLOR_SUB2};
      text-align: left;
      padding: 10px 4px 10px 4px;
      text-overflow: ellipsis;
      max-height: 50px;
      min-height: 50px;
      overflow: hidden;
      white-space: nowrap;
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


export default MultiButtonNormalTable;
