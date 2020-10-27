import React, {useState} from "react";
import Styled from "styled-components";
import CalendarDropdown from "../Dropdown/CalendarDropdown";
import moment from "moment";
import NumberPagenation from "../Pagenation/NumberPagenation";

interface Props {
    title?: string
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
    currentPage?:number
    totalPage?: number
    pageOnClickEvent?: any
    noChildren?: boolean
    children?: any
}

const HalfTalbe:React.FunctionComponent<Props> = ({title,calendar,titleOnClickEvent,indexList,valueList,EventList,allCheckbox,checkBox,clickValue,mainOnClickEvent,currentPage,totalPage,pageOnClickEvent,noChildren,children}:Props) => {

    const [selectDate, setSelectDate] = useState({start: moment().format("YYYY-MM-DD"), end: moment().format("YYYY-MM-DD")})
    const [checked, setChecked] = useState<any[]>([])
    const [allChecked, setAllChecked] = useState(false)


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
                {title !== undefined ?
                    <p className="p-bold" style={{fontSize: 20}}>{title}</p>
                    :
                    <p className="p-bold" style={{marginTop:28}}/>
                }
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
                                    console.log(checked)
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
                {console.log(valueList)}
            </TitleBar>
            {
                valueList !==  null &&  valueList.length  === 0
                    ? (<ValueBar style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>데이터가 없습니다.</p></ValueBar>)
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
                            <ValueBar key={i} style={{backgroundColor: clickValue=== v ? '#19b9df' : '#353b48', cursor: 'pointer'}}>
                                {
                                    checkBox !== undefined || false ?
                                        <div style={{paddingRight: 10, paddingLeft: 10, paddingTop: 5}}>
                                            <input type="checkbox" id={`check-${i}-${v}`} checked={checked[i]} onClick={(e) => {
                                                let tmpArr: boolean[] = checked
                                                tmpArr = tmpArr.map((vm,vi)=>{
                                                    if(vi===i){
                                                        return !vm
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
                                                <ButtonBox onClick={bv.Link} style={{width: bv.Width, color: bv.Color }} >{bv.Name}</ButtonBox>
                                            </div>
                                        )
                                    })
                                }


                            </ValueBar>

                        )
                    })
            }
            {currentPage && totalPage ?
                <NumberPagenation stock={totalPage ? totalPage : 0} selected={currentPage}
                                  onClickEvent={pageOnClickEvent}/>
                :
                null
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
    width: 530px;
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
    width: 530px;
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

export default HalfTalbe
