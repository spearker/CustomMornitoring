import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, POINT_COLOR} from '../../Common/configset'
import {useHistory} from 'react-router-dom';

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
  onClickLinkUrl?: string,
  onClickEvent?: any,
  onClickEventName?: string,
  onClickEvent2?: any,
  onClickEventName2?: string,
}


const InfoTable = ({ indexList, widthList, contents,type, pkKey, typeKey, typeChanger, onClickRemove, onClickEvent, onClickEventName, onClickEvent2, onClickEventName2,   onClickLinkUrl }: IProps) => {
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
            {
              onClickEvent !== undefined ?
                <th></th>
                :
                null
            }

          </tr>
          {/* 테이블 바디 */}

          {
            contents.length === 0  ?
                <tr>
                {Object.keys(indexList).map((mv, mi) => {
                  return(
                      <td>데이터가 없습니다.</td>
                  )})}
                </tr>
                :
            contents.map((v, i) => {
              return (

                <tr key={i} >

                  {
                    Object.keys(indexList).map((mv, mi) => {
                      return (
                        v[mv] !== null && v[mv] !== undefined  ?
                          <td key={mv} className="p-limits" onClick={() => onClickLinkUrl !== undefined ? history.push(onClickLinkUrl + v[pkKey]) : null}  >
                          {

                            typeof v[mv] === 'object' ?
                              Object.keys(v[mv]).map(m => {
                                return  v[mv][m] + ' '
                              })

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
                    onClickEvent !== undefined ?
                    <td style={{ textAlign:'right', paddingRight:8}}>
                    <ButtonBox onClick={() => { onClickEvent(v[pkKey]) }} >{onClickEventName}</ButtonBox>
                    {
                    onClickEvent2 !== undefined ?

                    <ButtonBox style={{marginLeft:8}} onClick={() => { onClickEvent2(v[pkKey]) }} >{onClickEventName2}</ButtonBox>

                      :
                      null
                  }
                  </td>
                      :
                      null
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
      &:first-child{
        padding-left: 20px;
      }

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
