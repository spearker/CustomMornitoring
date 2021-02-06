import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import IcDown from '../../Assets/Images/ic_reply_down.png'
import useOnclickOutside from 'react-cool-onclickoutside'
import moment from 'moment'
import Calendar from 'react-calendar'

//캘린더 드롭다운 컴포넌트

interface IProps {
    select?: string
    selectRange?: { start: string, end: string }
    type: 'range' | 'single'
    onClickEvent: (date: string, date2?: string) => void
    startMin?: Date
    monthLimit?: boolean
    unLimit?: boolean
    toDayLimit?: boolean
    limitType?: 'electric'
    limitDate?: { min?: string, max?: string }
}

const CalendarDropdown = ({
                              select,
                              selectRange,
                              onClickEvent,
                              startMin,
                              type,
                              monthLimit,
                              unLimit,
                              toDayLimit,
                              limitType
                          }: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false)

    const ref = useOnclickOutside(() => {
        setIsOpen(false)
    })

    const handleClickBtn = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {

    }, [])

    return (
        <DropBoxContainer ref={ref}>
            <BoxWrap onClick={() => setIsOpen(!isOpen)}>
                {
                    limitType !== 'electric' ?
                        type === 'single'
                            ? <p className="p-bold" onClick={() => {
                                setIsOpen(true)
                            }} style={{display: 'inline-block', marginRight: 10}}>통계
                                날짜 {select === '' ? moment().format('YYYY-MM-DD') : select}</p>
                            : <p className="p-bold" onClick={() => {
                                setIsOpen(true)
                            }} style={{display: 'inline-block', marginRight: 10}}>
                                기간 선택 {
                                selectRange
                                    ?
                                    (selectRange.start === '' ? moment().format('YYYY-MM-DD') : selectRange.start)
                                    + ' ~ ' +
                                    (selectRange.end === '' ? moment().format('YYYY-MM-DD') : selectRange.end)
                                    :
                                    moment().format('YYYY-MM-DD') + ' ~ ' + moment().format('YYYY-MM-DD')
                            }
                            </p>
                        : <p className="p-bold" onClick={() => {
                            setIsOpen(true)
                        }} style={{display: 'inline-block', marginRight: 10}}>
                            기간 선택 {
                            selectRange
                                ?
                                moment(selectRange.end).subtract(2, 'days').format('YYYY-MM-DD')
                                + ' ~ ' +
                                (selectRange.end === '' ? moment().format('YYYY-MM-DD') : selectRange.end)
                                :
                                moment().format('YYYY-MM-DD') + ' ~ ' + moment().format('YYYY-MM-DD')
                        }
                        </p>
                }
                <img src={IcDown} onClick={() => {
                    setIsOpen(true)
                }} style={{width: 14, height: 14}}/>
            </BoxWrap>
            {
                isOpen &&
                <InnerBoxWrap>
                    <BoxWrap style={{backgroundColor: 'white', flexDirection: 'row', display: 'flex'}}>
                        <div style={{display: 'inline-block', float: 'left', flex: 1, marginRight: 20}}>
                            {type === 'range' && <p>시작 날짜</p>}
                            <Calendar
                                minDate={startMin ? startMin : undefined}
                                maxDate={(unLimit && type === 'single') ? moment('2999-12-31').subtract(1, 'days').toDate() : (type === 'range' && selectRange) ? moment(selectRange.end).toDate() : toDayLimit ? moment().toDate() : moment().subtract(1, 'days').toDate()}
                                onChange={(date) => {
                                    if (type === 'range') {
                                        if (selectRange) {
                                            onClickEvent(moment(String(date)).format('YYYY-MM-DD'), selectRange.end)
                                        }
                                    } else {
                                        onClickEvent(moment(String(date)).format('YYYY-MM-DD'))
                                    }
                                    setIsOpen(false)
                                }}

                                value={
                                    limitType !== 'electric' ?
                                        type === 'single'
                                            ? select === '' ? moment().toDate() : moment(select).toDate()
                                            : selectRange ? selectRange.start === '' ? moment().toDate() : moment(selectRange.start).toDate() : moment().toDate()
                                        : selectRange ? selectRange.end === '' ? moment().toDate() : moment(selectRange.end).toDate() : moment().toDate()
                                }
                            />
                        </div>
                        {
                            type === 'range' &&
                            <div style={{display: 'inline-block', float: 'left', flex: 1}}>
                                {type === 'range' && <p>종료 날짜</p>}
                                <Calendar
                                    maxDate={unLimit ? moment('2999-12-31').subtract(1, 'days').toDate() : monthLimit ? moment(selectRange?.start).endOf('months').toDate() : toDayLimit ? moment().toDate() : moment().subtract(1, 'days').toDate()}
                                    minDate={moment(selectRange?.start).toDate()}
                                    onChange={(date) => {
                                        if (selectRange) {
                                            onClickEvent(selectRange.start, moment(String(date)).format('YYYY-MM-DD'))
                                        }
                                        setIsOpen(false)
                                    }}
                                    value={
                                        selectRange
                                            ? selectRange.end === '' ? moment().toDate() : moment(selectRange.end).toDate() : moment().toDate()
                                    }
                                />
                            </div>
                        }
                    </BoxWrap>
                </InnerBoxWrap>
            }
        </DropBoxContainer>
    )
}

const DropBoxContainer = Styled.div`
    margin-left:10px; min-width: 100px;
    position:relative;
    display: inline-block;
    z-index:1;
    float: right;
`

const BoxWrap = Styled.button`
    padding: 4px 15px 5px 15px;
    border-radius: 5px;
    color: black;
    min-width: 100px;
    background-color: #b3b3b3;
    border: none;
    font-weight: bold;
    text-algin: center;
    font-size: 13px;
    img {
    width: 14px;
    height: 14px;
    }
    .react-calendar{
        border: 0;
    }
`

const InnerBoxWrap = Styled.div`
    position: absolute;
    top: 0;
    right:0;
    text-align: left;
    margin-top: 32px;
`

export default CalendarDropdown
