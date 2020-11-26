import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, POINT_COLOR} from '../../Common/configset'
import SmallButton from '../Button/SmallButton';


//작은 버튼 + 그레이 컬러

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


const NormalTable = ({indexList, contents, widthList,eventType, link, keyName, onClickEvent ,buttonName, newStock, onChangeEvent}: IProps) => {



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
          {
          eventType !== 'input'?
            <th> </th>
            :
            null
          }

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
                        {
                          mv == 'stock' && onChangeEvent !== undefined && eventType == 'input'?
                          <>
                          <InputBox type="number" value={v[mv]} style={{float:'left'}} onChange={ (e: React.ChangeEvent<HTMLInputElement>): void =>{
                            const tempList = contents.slice();
                            tempList[i][`stock`] = e.target.value;
                            onChangeEvent(tempList)
                          }} />
                          <button onClick={()=>{onClickEvent(v['pk'], v['stock'])}} className="p-bold" style={{padding:4, backgroundColor:POINT_COLOR, marginLeft:6, borderRadius:5, fontSize:13}}>변경</button>
                          </>
                          :
                          '|　'+ v[mv]

                        }

                        </td>
                    )
                  })
                }
                {
                  eventType !== 'input'?
                  <td style={{width: '100px'}}>
                    <SmallButton name={buttonName} onClickEvent={()=>{onClickEvent(v[keyName])}}/>
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


export default NormalTable;
