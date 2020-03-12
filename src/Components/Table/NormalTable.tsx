import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';
import { Link } from 'react-router-dom';


//작은 버튼 + 그레이 컬러

interface IProps{
    indexList: any,
    contents: any,
    keyName: string,
    onClickEvent?: any,
    buttonName?: string,
    widthList?: string[],
    link?: string
}


const NormalTable = ({indexList, contents, widthList, link, keyName, onClickEvent ,buttonName}: IProps) => {

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
              <th key={v}>{`|　` + indexList[v]}</th>
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
               
                <td style={{textAlign:'center', width:'40px', maxWidth:'45px'}}>{i+1}</td>
                {
                  Object.keys(indexList).map((mv, mi)=>{
                    return(
                      <td key={mv} style={{ maxWidth: widthList !== undefined ? widthList[mi] : 'auto' , width: widthList !== undefined ? widthList[mi] : 'auto'}}>{'|　'+ v[mv]}</td>
                    )
                  })
                }
                <td style={{width: '100px'}}>
                  <SmallButton name={buttonName} onClickEvent={()=>{onClickEvent(v[keyName])}}/>
                </td>
               
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
      padding: 12px 4px 12px 4px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
`


export default NormalTable;