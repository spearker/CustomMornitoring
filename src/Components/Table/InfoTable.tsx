import React, { useEffect } from 'react';
import Styled from 'styled-components'
import { BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH } from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';
import { Link, Router } from 'react-router-dom';
import NormalNumberInput from '../Input/NormalNumberInput';
import { useHistory } from 'react-router-dom'

// 기본적인 항목 테이블
// 수정, 삭제, 리스트 클릭 (이동)

interface IProps {
  indexList: any,
  contents: any,
  widthList?: string[],
  type:string,
  pkKey: string,
  typeKey?: string,
  typeChanger?: any,
  onClickRemove?: any,
  onClickLinkUrl?: string
}


const InfoTable = ({ indexList, widthList, contents,type, pkKey, typeKey, typeChanger, onClickRemove, onClickLinkUrl }: IProps) => {
  const history = useHistory()
  
  useEffect(() => {
    console.log(Object.keys(indexList))
  }, [])

  return (
    <TableWrap>
      <table>
        <tbody>
          <tr className="p-bold" style={{ borderBottom: `10px solid ${BG_COLOR_SUB2}` }}>
            {/* 테이블 헤드 */}
            <th style={{ textAlign: 'center', width: '40px', maxWidth: '45px' }}>No.</th>
            {
              Object.keys(indexList).map((v, i) => {
                return (
                  <th key={v} className="p-limits">{indexList[v]}</th>
                )
              })
            }
            {
              onClickRemove !== undefined ?
                <th></th>
                :
                null
            }
          </tr>
          {/* 테이블 바디 */}

          {

            contents.map((v, i) => {
              return (
           
                <tr key={i} onClick={() => onClickLinkUrl !== undefined ? history.push(onClickLinkUrl + v[pkKey]) : null}>

                  <td style={{ textAlign: 'center' }}>{i + 1}</td>
                  {
                    Object.keys(indexList).map((mv, mi) => {
                      return (
                        v[mv] !== null && v[mv] !== undefined  ?
                          <td key={mv} className="p-limits" >
                          {typeChanger !== undefined && typeKey !== undefined && mv === typeKey ? 
                            typeChanger(type, Number(v[mv]), 'kor') //타입 
                            :  
                            v[mv] 
                          }
                         </td>
                          :
                          null
                        
                      )
                    })
                  }
                  {
                    onClickRemove !== undefined ?
                      <td style={{ textAlign:'right', paddingRight:8}}>
                        <ButtonBox onClick={() => { onClickRemove(v[pkKey]) }} >삭제</ButtonBox>
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
const ButtonBox = Styled.button`
    padding: 7px 18px 7px 18px;
    color: black;
    border-radius: 5px;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 14px;
    font-weight: bold;
`

const TableWrap = Styled.div`

    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      table-layout: fixed;
      background-color: #f4f6fa;
      color: #252525;
      font-size: 14px;
    }
    td, th {
      border-bottom: 1px solid ${BG_COLOR_SUB2};
      text-align: left;
      cursor: pointer;
      padding: 10px 4px 10px 4px;
      text-overflow: ellipsis;
      width: auto;
      max-height: 50px;
      min-height: 50px;
      overflow: hidden;
      white-space: nowrap;

    }
    tr {
      &:hover{
        background-color: white;
      }
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


export default InfoTable;