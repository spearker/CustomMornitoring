import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';


//작은 버튼 + 그레이 컬러

interface IProps{
    indexList: any,
    contents: any,
    keyName: string,
    onClickEvent?: any,
    buttonName?: string,
}


const NormalTable = ({indexList, contents, keyName, onClickEvent ,buttonName}: IProps) => {

  useEffect(()=>{
   console.log(Object.keys(indexList))
  },[])

  return (
    <TableWrap>
      <table>
        <tbody>
          <tr className="p-bold" style={{borderBottom:`10px solid ${BG_COLOR_SUB2}`}}>
          {/* 테이블 헤드 */}
          {
            Object.keys(indexList).map((v, i)=>{
              return(
              <th key={v}>{i === 0 ? '': 'ㅣ   '}{indexList[v]}</th>
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
                      <td key={mv}>{mi === 0 ? '': 'ㅣ   '}{v[mv]}</td>
                    )
                  })
                }
                <td>
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
      padding: 12px;
    }
`


export default NormalTable;