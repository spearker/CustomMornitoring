import React, {useEffect, useState} from "react";
import Styled from "styled-components";
import {BG_COLOR_SUB2, POINT_COLOR} from "../../Common/configset";
import {useHistory} from "react-router-dom";
import LineTable from "./LineTable";
import useOnclickOutside from "react-cool-onclickoutside";
import CalendarDropdown from "../Dropdown/CalendarDropdown";
import moment from "moment";

interface Props {
    title: string
    calendar?: boolean
    titleOnClickEvent?: any
    indexList: any
    valueList: any[]
    EventList?: any[]
    allCheckbox?: boolean
    checkBox?: boolean
    pkKey?: string
    clickValue?: object
    mainOnClickEvent?: any
    onClickEvent?: any
    noChildren?: boolean
    children?: any
}

const OvertonTable:React.FunctionComponent<Props> = ({title,calendar,titleOnClickEvent,indexList,valueList,EventList,allCheckbox,checkBox,pkKey,clickValue,mainOnClickEvent,onClickEvent,noChildren,children}:Props) => {

    const [selectDate, setSelectDate] = useState({start: moment().format("YYYY-MM-DD"), end: moment().format("YYYY-MM-DD")})


    const history = useHistory()

    React.useEffect(() => {
        console.log('valueList', valueList)
    }, [])

    return(
        <div>
            <Title>
                <p className="p-bold" style={{fontSize: 20 }}>{title}</p>
                <div>
                {calendar !== undefined || false ?
                    <div>
                        <CalendarDropdown type={'range'} selectRange={selectDate} onClickEvent={(start, end) => setSelectDate({start: start, end: end ? end : ''})}></CalendarDropdown>
                    </div>
                    :
                    null
                }
                {
                    titleOnClickEvent && titleOnClickEvent.map((bv,bi)=>{
                        return(
                            <div>
                                <TitleButtonBox onClick={()=>{onClickEvent([pkKey])}} style={{width: bv.Width}} >{bv.Name}</TitleButtonBox>
                            </div>
                        )
                    })
                }
                </div>
            </Title>
            <TitleBar>
                {
                    allCheckbox !== undefined || false ?
                        <div style={{paddingRight:10, paddingLeft: 10, paddingTop:5}}>
                            <input type="checkbox" id='all' onClick={(e) => true} />
                            <label htmlFor='all' style={{backgroundColor: "white"}}></label>
                        </div>
                        :
                        (
                            checkBox !== undefined || false ?
                            <div style={{paddingRight:10, paddingLeft: 10}}>
                                <p> </p>
                            </div>
                            :
                            null
                        )
                }
                {
                    Object.keys(indexList).map((v, i) => {
                        console.log(v)
                        return (
                            <p key={v} className="p-limits">{indexList[v]}</p>
                        )
                    })
                }
                {
                        EventList && EventList.map((bv,bi)=> {
                            return (
                                <p className="p-limits" > </p>
                            )
                        })
                }
            </TitleBar>
            {
                valueList !== undefined && valueList.length === 0
                    ? (<ValueBar style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>데이터를 불러오지 못했습니다.</p></ValueBar>)
                    : valueList.map((v, i) => {
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
                        <ValueBar key={i} style={{backgroundColor: clickValue=== v ? '#19b9df' : '#353b48'}}>
                            {
                                checkBox !== undefined || false ?
                                    <div style={{paddingRight:10, paddingLeft: 10, paddingTop: 5}}>
                                        <input type="checkbox" id={`check-${i}-${v}`} onClick={(e) => true} />
                                        <label htmlFor={`check-${i}-${v}`} style={{backgroundColor: "white"}}></label>
                                    </div>
                                    :
                                    null
                            }
                            {
                                Object.keys(indexList).map((mv, mi) => {
                                    {console.log(v)}
                                    //mv : [pk , machin_list, machine_name ... ]
                                    return (
                                        typeof v[mv] === 'object' ?
                                            <select className="p-limits" style={{backgroundColor: clickValue=== v ? '#19b9df' : '#353b48',borderColor: clickValue=== v ? '#19b9df' : '#353b48'}}>
                                                <option value={''}>선택</option>
                                                {
                                                    Object.keys(v[mv]).map(m => {
                                                        return(
                                                            <option value={v[mv][m]}>{v[mv][m]}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            :
                                        <p key={`td-${i}-${mv}`}
                                           className="p-limits"
                                           onClick={()=> (mainOnClickEvent(v))}>
                                            {
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
                                            <ButtonBox onClick={()=>{onClickEvent([pkKey])}} style={{width: bv.Width, color: bv.Color }} >{bv.Name}</ButtonBox>
                                        </div>
                                    )
                                })
                            }


                        </ValueBar>

                    )
                })
            }
            {noChildren !== undefined || false ?
                null :
                <BlackBg /*style={{backgroundColor:  !== undefind ?  '#ff341a' : '#353b48'}}*/>
                    {children === undefined || children === null ? <p>데이터를 클릭해주세요</p> : children}
                </BlackBg>
            }
        </div>
    )
}

const Title = Styled.div`
   textAlign: left;
   display: flex; 
   flex-direction: row;
   justify-content: space-between;
   margin-bottom: 15px;
   margin-top: 41px;
   div {
   display: flex;
   flex-direction: row;
        div {
        padding-left: 15px
        }
   }
`

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
    color: #ffffff;
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
    select {
     height: 40px;
     background-color: #353b48;
     border-color: #353b48;
     text-align: left;
     color: #ffffff;
     font-size: 14px;
    }
    p {
    text-align: left;
    color: #ffffff;
    font-size: 14px;
      &:first-child{
        padding-left: 20px;
      }
    }
`

const TitleButtonBox = Styled.button`
    color: white;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 70px;
    height: 30px;
`

const ButtonBox = Styled.button`
    color: black;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 112px;
    height: 30px;
`


export default OvertonTable
