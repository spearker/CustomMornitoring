import React, { useEffect, useState } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, BG_COLOR_SUB3} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';
import { Link } from 'react-router-dom';
import NormalNumberInput from '../Input/NormalNumberInput';
import Nodata from '../Text/Nodata';



interface IProps{
    indexList: any,

    subIndexList: any,
    keyName: string,
    onClickEvent?: any,
    widthList?: any[],
    target?: any,
    contents: any[],
    events?: any[],
}


const MultiButtonTaskTable = ({events, indexList,target,subIndexList, contents,  widthList, keyName, onClickEvent }: IProps) => {


  const tCors = Object.keys(indexList).length  + 1;
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
              <th key={v}>{indexList[v]}</th>
              )
            })
          }

          <th></th>
          </tr>
          {/* 테이블 바디 */}

          {
            contents.map((v, i)=>{
              return(
                <>
              <tr key={i}>


                {
                  Object.keys(indexList).map((mv, mi)=>{
                    return(
                      <td key={mv} onClick={()=>onClickEvent(v)} style={{ maxWidth: widthList !== undefined ? widthList[mi] : 'auto' , width: widthList !== undefined ? widthList[mi] : 'auto'}}>

                          {v[mv]}

                      </td>
                    )
                  })
                }

              <td >

                    {
                      events!== undefined && events.map((m, i)=>{
                        return(
                        <ButtonBox onClick={()=>m.event(v)} style={m.color !== undefined? {backgroundColor: m.color} :{backgroundColor: POINT_COLOR}}>{m.name}</ButtonBox>

                        )
                      })
                    }

              </td>


              </tr>
                {
                  target !== null && target.pk !==undefined && target.pk ==  v.pk &&
                  <tr style={{backgroundColor:'#484F5A'}} >
                    <td colSpan={tCors}>
                    <InnerTable>
                      <tbody>
                      <tr>

                        {
                          Object.keys(subIndexList).map((v, i)=>{
                            return(
                            <th key={v}>{subIndexList[v]}</th>
                            )
                          })
                        }
                      </tr>
                      <tr>

                      {
                  Object.keys(subIndexList).map((mv, mi)=>{
                    return(
                      <td key={mv} >

                          {target[mv]}

                      </td>
                    )
                  })
                }

                   </tr>
                   </tbody>
                    </InnerTable>
                    </td>
                  </tr>
                }
                </>
              )
            })
          }

          <tr>

          </tr>

        </tbody>
      </table>
      {
        contents.length == 0 &&
        <Nodata />
      }
    </TableWrap>

  );
}

const InnerTable = Styled.table`

  width: 100%;
  background-color: transparent !important;
  border: 0;
  tr, td, th{
   background-color: transparent !important;
   border-radius: 0 !important;
  }
  border-radius: 0 !important;

  tr:first-child{
    th{
      text-align: left;
      border-bottom: 1.5px solid #ffffff50 !important;
    }
  }
`

const ButtonBox = Styled.span`
  display: inline-block;
  cursor: pointer;
  padding: 4px 20px;

  font-weigth: bold;
  font-size: 15px;
  float: right;
  margin-left: 5px;
  border-radius: 6px;
`
const TableWrap = Styled.div`

table {
  text-align: left;
  table-layout: fixed;
  max-width: 100%,
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  background-color: #f4f6fa;
  color: #252525;
  font-size: 14px;
  overflow-x: scroll;
  overflow: auto;
  background-color: ${BG_COLOR_SUB};
  border-collapse: separate;
  border-spacing: 0 0.4em;
}
tbody{
  max-width: 100%;
}
th{
  padding: 12px;
}
tr{
  cursor: pointer;
  box-sizing: border-box;
  border: 0;
  vertical-align: middle;
  background-color: ${BG_COLOR_SUB3};
  border: 1px;
  border-collapse: separate;
  border-spacing: 0 15px;
  margin-bottom: 12px;
  &:first-child{
    background-color: black;

  }
}
td{
  &:first-child{
    padding-left: 14px !important;
  }
  padding-left: 10px !important;
  padding-top: 10px;
  padding-bottom: 10px;


}

td, th {
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap
  overflow: visible;
  vertical-align: middle;
  text-align: left;
  color: white;
}
th:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
th:last-child  { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }

td:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
td:last-child  { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
td:last-child {
  padding-right:20px;
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


export default MultiButtonTaskTable;
