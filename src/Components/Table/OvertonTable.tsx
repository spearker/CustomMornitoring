import React, {useEffect, useState} from "react";
import Styled from "styled-components";
import {BG_COLOR_SUB2, POINT_COLOR} from "../../Common/configset";
import {useHistory} from "react-router-dom";
import LineTable from "./LineTable";
import useOnclickOutside from "react-cool-onclickoutside";

interface Props {
    title: string
    indexList: any
    valueList: any[]
    EventList?: any[]
    type?:string
    pkKey?: string
    mainOnClickEvent?: any
    onClickEvent?: any
    children: any
}

const OvertonTable:React.FunctionComponent<Props> = ({title,indexList,valueList,EventList,type,pkKey,mainOnClickEvent,onClickEvent, children}:Props) => {

    const history = useHistory()

    React.useEffect(() => {
        console.log('valueList', valueList)
    }, [])

    return(
        <div>
            <div style={{textAlign:'left', }}>
                <p className="p-bold" style={{fontSize: 20, marginBottom:15, marginTop:75}}>{title}</p>
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
                {
                    onClickEvent !== undefined ?
                        <p className="p-limits"> </p>
                        :
                        null
                }
            </TitleBar>
            {
                valueList !== undefined && valueList.map((v, i) => {
                    /*
                    v:  {
                        pk: 'PK11212',
                        machine_name: '프레스 01',
                        machine_number: '000-000-00',
                        manufacturer_code: '공정 01',
                        machine_register_time: '2020.06.16 22:34:40',
                        more_Action: false
                    },
                    */
                    return (
                        <ValueBar key={i}>
                            {
                                Object.keys(indexList).map((mv, mi) => {
                                    {console.log(v)}
                                    //mv : [pk , machin_list, machine_name ... ]
                                    return (
                                            <p key={`td-${i}-${mv}`}
                                               className="p-limits"
                                               onClick={()=> mainOnClickEvent(v.pk,v.mold_name)}> {/* pk: 'PK11212' */}
                                                {
                                                    typeof v[mv] === 'object' ?
                                                        Object.keys(v[mv]).map(m => {
                                                            return  v[mv][m] + ' '
                                                        })
                                                        :
                                                        v[mv]
                                                }
                                            </p>

                                    )
                                })
                            }
                            {
                                EventList && EventList.map((bv,bi)=>{
                                                return(
                                                <div className="p-limits">
                                                    <ButtonBox onClick={()=>{onClickEvent([pkKey])}}>{bv.Name}</ButtonBox>
                                                </div>
                                                    )
                                })
                            }


                        </ValueBar>

                    )
                })
            }
            <BlackBg>
                {children == undefined  || children === null ? <p>데이터를 클릭해주세요</p> : children }
            </BlackBg>
        </div>
    )
}

const TitleBar = Styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #111319;
    width: 100%;
    max-height: 40px;
    min-height: 40px;
    align-items: center;
    p {
    text-align: left;
    color: #ffffff
    font-size: 14px;
      &:first-child{
        padding-left: 20px;
      }
    }
`

const BlackBg = Styled.div`
    padding: 20px 0px 30px 20px;
    border-radius: 6px;
    background-color: #111319;
    margin-top: 20px;
`

const ValueBar = Styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #353b48;
    width: 100%;
    max-height: 40px;
    min-height: 40px;
    align-items: center;
    p {
    text-align: left;
    color: #ffffff
    font-size: 14px;
      &:first-child{
        padding-left: 20px;
      }
    }
`

const ButtonBox = Styled.button`
    color: white;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 112px;
    height: 30px;
`


export default OvertonTable
