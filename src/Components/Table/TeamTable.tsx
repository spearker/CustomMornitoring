import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2} from '../../Common/configset'
import {useHistory} from 'react-router-dom';

// 기본적인 항목 테이블
// 수정, 삭제, 리스트 클릭 (이동)

interface IProps {
  indexList: any,
  contents: ITeam[],
  depth:number,
  onClickEvent: any,
  onChangeEvent: any,
  onClickRemove: any,
  onClickModify: any
}


const TeamTable = ({ indexList, contents, depth,onClickEvent, onChangeEvent, onClickRemove, onClickModify }: IProps) => {
  const history = useHistory()


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

             <th></th>

          </tr>
          {/* 테이블 바디 */}

          {

            contents.map((v, i) => {
              return (

                <tr key={i} onClick={() => depth !== 0 ? null : onClickEvent(v)}>

                  <td style={{ textAlign: 'center' }}>{i + 1}</td>
                  {
                    Object.keys(indexList).map((mv, mi) => {
                      return (
                        <td key={mv} className="p-limits" >
                            <InputBox value={ v[mv] } onChange={(e)=>onChangeEvent(depth, i, e.target.value)}></InputBox>
                        </td>

                      )
                    })
                  }

                  {
                    onClickRemove !== undefined ?
                      <td style={{ textAlign:'right', paddingRight:8}}>
                         <ButtonBox onClick={() => { onClickModify(v.pk, v.name) }} >이름수정</ButtonBox> &nbsp;
                        <ButtonBox onClick={() => { onClickRemove(v.pk) }} >삭제</ButtonBox>
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
    background-color: #dddddd;
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
    border: 0px;
    font-size: 14px;
    width: 100%;
    padding: 7px;
    background-color: transparent;

`

export default TeamTable;
