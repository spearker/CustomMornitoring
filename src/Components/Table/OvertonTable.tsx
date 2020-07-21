import React from "react";
import Styled from "styled-components";
import {BG_COLOR_SUB2, POINT_COLOR} from "../../Common/configset";
import {useHistory} from "react-router-dom";

interface Props {
    indexList: any
    valueList: any[]
    buttonList?: any[]
    type:string
    pkKey: string
    onClickEvent?: any
    onClickLink?: string
    onClickRemove?: any
}

const OvertonTable:React.FunctionComponent<Props> = ({indexList,valueList,buttonList,type,pkKey,onClickEvent,onClickLink,onClickRemove}:Props) => {
    const history = useHistory()

    return(
        <div>
            <div style={{textAlign:'left', }}>
                <p className="p-bold" style={{fontSize: 20, marginBottom:15, marginTop:75}}>{'프레스 오버톤'}</p>
            </div>
            <TitleBar>
                {
                    Object.keys(indexList).map((v, i) => {
                        console.log(v)
                        return (
                            <p key={v} className="p-limits">{indexList[v]}</p>
                        )
                    })
                }
            </TitleBar>
            {

                valueList.map((v, i) => {
                    {console.log(v)}
                    return (

                        <ValueBar key={i} >

                            {
                                Object.keys(indexList).map((mv, mi) => {
                                    return (
                                        v[mv] !== null && v[mv] !== undefined  ?
                                            <td key={mv} className="p-limits"  onClick={() => onClickLink !== undefined ? history.push(onClickLink + v[pkKey]) : null}>
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
                                buttonList && buttonList.map((v,i)=>{
                                    switch(v.Type) {
                                        case 'DETAIL':
                                            {
                                                valueList.map((mv, mi) => {
                                                return(
                                                onClickEvent !== undefined &&
                                                <td style={{ textAlign:'right', paddingRight:8}}>
                                                    <ButtonBox onClick={() => { onClickEvent(mv[pkKey]) }} >{v.Name}</ButtonBox>
                                                </td>
                                                    )
                                                })
                                            }
                                            break
                                        case 'CREATE':
                                            {
                                                valueList.map((mv, mi) => {
                                                    return(
                                                        onClickEvent !== undefined &&
                                                        <td style={{ textAlign:'right', paddingRight:8}}>
                                                            <ButtonBox onClick={() => { onClickEvent(mv[pkKey]) }} >{v.Name}</ButtonBox>
                                                        </td>
                                                    )
                                                })
                                            }
                                                break
                                        case 'UPDATE':
                                            {
                                                valueList.map((mv, mi) => {
                                                    return(
                                                        onClickEvent !== undefined &&
                                                        <td style={{ textAlign:'right', paddingRight:8}}>
                                                            <ButtonBox onClick={() => { onClickEvent(mv[pkKey]) }} >{v.Name}</ButtonBox>
                                                        </td>
                                                    )
                                                })
                                            }
                                                break
                                        case 'DELETE':
                                            {
                                                valueList.map((mv, mi) => {
                                                    return(
                                                        onClickRemove !== undefined &&
                                                        <td style={{ textAlign:'right', paddingRight:8}}>
                                                            <ButtonBox onClick={() => { onClickRemove(v[pkKey]) }} >삭제</ButtonBox>
                                                        </td>
                                                    )
                                                })
                                            }
                                                break
                                        }
                                })
                            }


                        </ValueBar>

                    )
                })
            }
        </div>
    )
}

const TitleBar = Styled.div`
    display: flex;
    flex-direction: row;  
    border-radius: 8px;
    background-color: #111319;
    color: #ffffff
    font-size: 14px;
    width: 100%;
    max-height: 40px;
    min-height: 40px;
    align-items: center;
    text-align: left;
    padding-left: 20px;
`

const ValueBar = Styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: row;  
    border-radius: 8px;
    background-color: #353b48;
    color: #ffffff
    font-size: 14px;
    width: 100%;
    max-height: 40px;
    min-height: 40px;
    align-items: center;
    text-align: left;
    padding-left: 20px;
`

const ButtonBox = Styled.button`
    padding: 7px 18px 7px 18px;
    color: black;
    border-radius: 5px;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 14px;
    font-weight: bold;
`


export default OvertonTable
