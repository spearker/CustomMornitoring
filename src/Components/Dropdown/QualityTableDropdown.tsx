import React from "react";
import IC_Dropdown from "../../Assets/Images/ic_dropdown_gray.png";
import IC_Dropup from "../../Assets/Images/ic_dropup_gray.png";
import Styled from "styled-components";

interface IProps {
    pk: string | null
    contentTitle: any
    contentList: any
    widthList: string[]
    clickValue?: string
    onClickEvent?: any
    noChildren?: boolean
    children?: any
}


const QualityTableDropdown = ({pk,contentTitle,contentList,widthList,clickValue,onClickEvent,noChildren,children}:IProps)  => {
    return(
        <TableWrap>
            <table>
                <tbody>
                <tr style={{borderBottom: '1px solid #353b48', paddingBottom: "5px"}}>
                    {
                        Object.keys(contentTitle).map((v, i) => {
                            return (
                                <th key={v} className="p-limits" style={{width:widthList[i], borderBottom: '1px solid #353b48', paddingBottom: "10px"}} >{contentTitle[v]}</th>
                            )
                        })
                    }
                </tr>
                {/* 테이블 바디 */}
                {
                    contentList?.map((v, i) => {
                        return(
                            <tr key={i} >
                                {Object.keys(contentTitle).map((mv, mi) => {
                                    return(
                                    <td className="p-limit" style={{width: widthList[i]}}>
                                        {v[mv] === '' ?
                                            'ㅡ'
                                            :
                                            v[mv]
                                        }
                                    </td>
                                    )})}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {noChildren !== undefined || false ?
                null :
                <>
                    {children === undefined || children === null ? <p></p> : children}
                </>
            }
        </TableWrap>
    )
}

const TableWrap = Styled.div`
    display: flex;
    table {
      max-width: 100%,
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      color: #ffffff;
      font-size: 14px;
      table-layout: fixed;

      border-collapse:separate; 
      border-spacing: 0 7px;
    }
    tbody{
      max-width: 100%;
    }
    th {
      vertical-align: middle;
      text-align: left;
    }
    tr{
      box-sizing: border-box;
      border: 0;
      vertical-align: middle;
      border-collapse: separate;
      border-spacing: 0 15px;
    }
    td{
      text-overflow:ellipsis;
      overflow:hidden;
      vertical-align: middle;
      text-align: left;
    }
`

export default QualityTableDropdown
