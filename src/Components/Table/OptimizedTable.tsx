import React, {useState} from "react";
import IcDropDownButton from "../../Assets/Images/ic_dropdown_white.png";
import Styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";

interface Props {
    title: string
    selectBoxChange?: any
    indexList: any
    valueList: any[]
    EventList?: any[]
    allCheckOnClickEvent?: any
    checkOnClickEvent?: any
    clickValue?: object
    mainOnClickEvent?: any
    onClickEvent?: any
    buttonState?: boolean
    currentPage?: number
    totalPage?: number
    pageOnClickEvent?: any
    noChildren?: boolean
    children?: any
}

const OptimizedTable: React.FunctionComponent<Props> = ({title, selectBoxChange, indexList, valueList, EventList, allCheckOnClickEvent, checkOnClickEvent, buttonState, clickValue, mainOnClickEvent, noChildren, children, currentPage, totalPage, pageOnClickEvent}) => {

    const [checked, setChecked] = useState<any[]>([])

    React.useEffect(() => {
        if (checkOnClickEvent) {
            let tmpArr: boolean[] = []
            const arrData = valueList.map((v, i) => {
                tmpArr.push(false)
            })

            setChecked(tmpArr)
        } else {
            return
        }
    }, [valueList])


    return (
        <div>
            <TitleBar>
                {
                    allCheckOnClickEvent ?
                        <div style={{paddingRight: 10, paddingLeft: 10, paddingTop: 5}}>
                            <input type="checkbox" id={'all'}
                                   checked={valueList.length > 0 && valueList.length === checked.filter(f => f === true).length}
                                   onChange={(e) => {
                                       if (valueList.length > 0 && valueList.length !== checked.filter(f => f === true).length) {
                                           allCheckOnClickEvent(valueList)
                                           let tmpArr: boolean[] = checked
                                           tmpArr = tmpArr.map(() => true)
                                           setChecked(tmpArr)
                                           return true
                                       } else {
                                           let tmpArr: boolean[] = checked
                                           tmpArr = tmpArr.map(() => false)
                                           allCheckOnClickEvent([])
                                           setChecked(tmpArr)
                                           return false
                                       }
                                   }}/>
                            <label htmlFor='all' style={{backgroundColor: 'white'}}/>
                        </div>
                        :
                        (
                            checkOnClickEvent ?
                                <div style={{paddingRight: 10, paddingLeft: 10}}>
                                    <p></p>
                                </div>
                                :
                                null
                        )
                }
                {
                    Object.keys(indexList).map((v, i) => {
                        return (
                            typeof indexList[v] === 'object' ?
                                <select className="p-limits"
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: '#111319',
                                            borderColor: '#111319',
                                            color: 'white',
                                            fontSize: '14px',
                                            width: '70%',
                                            marginRight: 30,
                                            background: `url(${IcDropDownButton}) no-repeat 95% 50%`
                                        }}
                                        onChange={(e) => selectBoxChange(e.target.value)}
                                >
                                    {
                                        Object.keys(indexList[v]).map(m => {
                                            return (
                                                <>
                                                    <option value={indexList[v][m]}
                                                            style={{
                                                                backgroundColor: '#111319',
                                                                cursor: 'pointer'
                                                            }}>{indexList[v][m]}</option>

                                                </>
                                            )
                                        })
                                    }
                                </select>
                                :
                                <p key={v} className="p-limits">{indexList[v]}</p>
                        )
                    })
                }
                {
                    EventList && EventList.map((bv, bi) => {
                        return (
                            <p className="p-limits"/>
                        )
                    })
                }
            </TitleBar>
            {
                valueList !== undefined && valueList.length === 0
                    ? (
                        <ValueBar style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>데이터가
                            없습니다. </p>
                        </ValueBar>)
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
                            <ValueBar key={i}
                                      style={{
                                          backgroundColor: clickValue === v ? '#19b9df' : '#353b48',
                                          cursor: children === undefined || noChildren ? title.indexOf('제품 검사') !== -1 || title.indexOf('금형 제작') !== -1 ? 'pointer' : 'default' : 'pointer'
                                      }}>
                                {
                                    checkOnClickEvent ?
                                        <div style={{paddingRight: 10, paddingLeft: 10, paddingTop: 5}}>
                                            <input type="checkbox" id={`check-${i}-${v}`} checked={checked[i]}
                                                   onClick={(e) => {
                                                       let tmpArr: boolean[] = checked
                                                       tmpArr = tmpArr.map((vm, vi) => {
                                                           if (vi === i) {
                                                               if (vm) {
                                                                   checkOnClickEvent(v)
                                                                   return false
                                                               } else {
                                                                   checkOnClickEvent(v)
                                                                   return true
                                                               }
                                                           } else {
                                                               return vm
                                                           }
                                                       })
                                                       // console.log('asldfjlkasdjflksajdflkjadsklf', tmpArr)
                                                       setChecked(tmpArr)
                                                       return false
                                                   }}/>
                                            <label htmlFor={`check-${i}-${v}`} style={{backgroundColor: 'white'}}></label>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    Object.keys(indexList).map((mv, mi) => {
                                        //mv : [pk , machin_list, machine_name ... ]
                                        return (
                                            typeof v[mv] === 'object' ?
                                                <select className="p-limits" style={{
                                                    backgroundColor: clickValue === v ? '#19b9df' : '#353b48',
                                                    borderColor: clickValue === v ? '#19b9df' : '#353b48'
                                                }}>
                                                    <option value={''}>선택</option>
                                                    {
                                                        Object.keys(v[mv]).map(m => {
                                                            return (
                                                                <option value={v[mv][m]}>{v[mv][m]}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                :
                                                <p key={`td-${i}-${mv}`}
                                                   className="p-limits"
                                                   onClick={mainOnClickEvent && mainOnClickEvent ? () => mainOnClickEvent(v, i) : () => console.log()}
                                                >
                                                    {v[mv] === '' || v[mv] === null || v[mv] === undefined ?
                                                        ''
                                                        :
                                                        v[mv]
                                                    }
                                                </p>

                                        )
                                    })
                                }
                                {
                                    EventList && EventList.map((bv, bi) => {
                                        return (
                                            <div className="p-limits">
                                                {buttonState ?
                                                    <ButtonBox onClick={() => bv.Link(v)} style={{
                                                        width: bv.Width,
                                                        color: v.status === '진행중' ? 'white' : 'white',
                                                        backgroundColor: v.status === '진행중' ? '#717c90' : '#19b9df'
                                                    }}
                                                    >{v.status === '진행중' ? '완료 하기' : '취소 하기'}</ButtonBox>
                                                    :
                                                    <ButtonBox disabled={(v.finished === '완료' && bv.Name !== '수정')}
                                                               onClick={() => bv.Link(v)}
                                                               style={{
                                                                   width: bv.Width,
                                                                   color: bv.Color,
                                                                   backgroundColor: (v.finished === '완료' && bv.Name !== '수정') ? '#19b9df' : '#717c90'
                                                               }}>{bv.Name}</ButtonBox>
                                                }
                                            </div>
                                        )
                                    })
                                }


                            </ValueBar>

                        )
                    })
            }
            {currentPage && totalPage ?
                <PaginationBox>
                    <Pagination count={totalPage ? totalPage : 0} page={currentPage} onChange={pageOnClickEvent}
                                boundaryCount={1} color={'primary'}/>
                </PaginationBox>
                :
                null
            }
            {noChildren !== undefined || false ?
                null :
                <div>
                    {children === undefined || children === null ? <p></p> : children}
                </div>
            }
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
    color: #ffffff;
    font-size: 14px;
      &:first-child{
        padding-left: 20px;
      }
    }
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


const PaginationBox = Styled.div`
    padding-top: 10pt;
    display: flex;
    justify-content: center;
    .MuiButtonBase-root {
        color: white;
    }
    .MuiPaginationItem-root{
        color: white;
    }
`


export default OptimizedTable
