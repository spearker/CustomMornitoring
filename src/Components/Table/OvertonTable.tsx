import React, {useCallback, useEffect, useState} from "react";
import Styled from "styled-components";
import {BG_COLOR_SUB2, POINT_COLOR, TOKEN_NAME} from "../../Common/configset";
import {useHistory} from "react-router-dom";
import LineTable from "./LineTable";
import useOnclickOutside from "react-cool-onclickoutside";
import CalendarDropdown from "../Dropdown/CalendarDropdown";
import moment from "moment";
import BasicDropdown from "../Dropdown/BasicDropdown";
import {getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import IcSearchButton from "../../Assets/Images/ic_search.png";
import {Input} from "semantic-ui-react";

interface Props {
    title: string
    calendar?: boolean
    searchBar?: boolean
    dropDown?: boolean
    titleOnClickEvent?: any
    indexList: any
    valueList: any[]
    EventList?: any[]
    allCheckbox?: boolean
    allCheckOnClickEvent?: any
    checkBox?: boolean
    checkOnClickEvent?: any
    pkKey?: string
    clickValue?: object
    mainOnClickEvent?: any
    onClickEvent?: any
    noChildren?: boolean
    children?: any
}


const OvertonTable:React.FunctionComponent<Props> = ({title,calendar,searchBar,dropDown,titleOnClickEvent,indexList,valueList,EventList,allCheckbox,allCheckOnClickEvent,checkBox,checkOnClickEvent,pkKey,clickValue,mainOnClickEvent,onClickEvent,noChildren,children}:Props) => {


    const [selectDate, setSelectDate] = useState({start: moment().format("YYYY-MM-DD"), end: moment().format("YYYY-MM-DD")})
    const [checked, setChecked] = useState<any[]>([])
    const [option, setOption] = useState<number>(0)
    const [allChecked, setAllChecked] = useState(false)


    const onClickFilter = useCallback(async (filter:number)=>{
        setOption(filter)
        ////alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
        //return;
        const results = await getRequest('http://203.234.183.22:8299/api/v1/task/list/' + filter, getToken(TOKEN_NAME))

        if(results === false){
            ////alert('서버에서 데이터를 불러 올 수없습니다.')
        }else{
            if(results.status === 200){

            }else{
                //alert('서버에서 데이터를 불러 올 수없습니다.')
            }
        }
    },[option])


    React.useEffect(() => {
        if(checkBox === true) {
            console.log('valueList', valueList)
            let tmpArr: boolean[] = []
            const arrData = valueList.map((v, i) => {
                tmpArr.push(false)
            })

            setChecked(tmpArr)
        } else {
            return
        }
    }, [valueList])


    return(
        <div>
            <Title>
                <p className="p-bold" style={{fontSize: 20 }}>{title}</p>
                <div>
                {dropDown !== undefined || false ?
                    <div style={{alignItems: "center"}}>
                        <BasicDropdown contents={['거래처명', '대표자명', '기타']} select={['거래처명', '대표자명', '기타'][option]}
                                       onClickEvent={onClickFilter}/>
                    </div> :
                    null
                }
                {searchBar !== undefined || false ?
                    <div style={{width: "300px"}}>
                        <SearchBox placeholder="검색어를 입력해주세요." style={{flex: 90}} onChange={(e) => console.log(e.target.value)}/>
                        <SearchButton style={{flex: 10}}>
                            <img src={IcSearchButton}/>
                        </SearchButton>
                    </div> :
                    null
                }
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
                                <TitleButtonBox onClick={bv.Link} style={{width: bv.Width}} >{bv.Name}</TitleButtonBox>
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
                            <input type="checkbox" id={'all'} onClick={(e) => {
                                if(allChecked === false) {
                                    allCheckOnClickEvent(valueList)
                                    let tmpArr: boolean[] = checked
                                    tmpArr = tmpArr.map(() => true)
                                    // console.log('asldfjlkasdjflksajdflkjadsklf', tmpArr)
                                    setChecked(tmpArr)
                                    setAllChecked(true)
                                    return true
                                } else {
                                    let tmpArr: boolean[] = checked
                                    tmpArr = tmpArr.map(() => false)
                                    // console.log('asldfjlkasdjflksajdflkjadsklf', tmpArr)
                                    setChecked(tmpArr)
                                    setAllChecked(false)
                                    return false
                                }
                            }} />
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
                    ? (<ValueBar style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>데이터가 없습니다. </p></ValueBar>)
                    : valueList?.map((v, i) => {
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
                        <ValueBar key={i} style={{backgroundColor: clickValue=== v ? '#19b9df' : '#353b48'}} onClick={mainOnClickEvent && mainOnClickEvent ? ()=>mainOnClickEvent(v) : ()=>console.log()}>
                            {
                                checkBox !== undefined || false ?
                                    <div style={{paddingRight: 10, paddingLeft: 10, paddingTop: 5}}>
                                            <input type="checkbox" id={`check-${i}-${v}`} checked={checked[i]} onClick={(e) => {
                                                let tmpArr: boolean[] = checked
                                                tmpArr = tmpArr.map((vm,vi)=>{
                                                     if(vi===i){
                                                         if(vm){
                                                             return false
                                                         }else {
                                                             checkOnClickEvent(v)
                                                            return true
                                                         }
                                                     } else {
                                                        return  vm
                                                     }
                                                 })
                                                // console.log('asldfjlkasdjflksajdflkjadsklf', tmpArr)
                                                setChecked(tmpArr)
                                                return false
                                            }}/>
                                            <label htmlFor={`check-${i}-${v}`} style={{backgroundColor: "white"}}></label>
                                    </div>
                                    :
                                    null
                            }
                            {
                                Object.keys(indexList).map((mv, mi) => {
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
                                           className="p-limits" >
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
                                            <ButtonBox onClick={()=>bv.Link(v)} style={{width: bv.Width, color: bv.Color }} >{bv.Name}</ButtonBox>
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
                    {children === undefined || children === null ? <p></p> : children}
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
    padding: 20px 20px 30px 20px;
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

const SearchBox = Styled(Input)`
    input{
        padding-left: 8px;
        font-famaily: NotoSansCJKkr;
        height: 28px;
        border: 0.5px solid #b3b3b3;
        border-radius: 10px 0 0px 10px;
        width: 100%;
        margin-right: -10%;
        background-color: #f4f6fa;
        font-size: 15px;
        &::placeholder:{
            color: #b3b3b3;
        };
     }
`

const SearchButton = Styled.button`
    width: 55px;
    height: 32px;
    border-radius: 5px 5px 5px 5px;
    background-color: ${POINT_COLOR};
    img{
        width: 20px;
        height: 20px;
        margin-top: 5px;
    }
`

export default OvertonTable
