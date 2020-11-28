import React, {useEffect, useRef, useState} from 'react';
import Styled from 'styled-components'
import {
    BG_COLOR,
    BG_COLOR_SUB,
    SYSTEM_NAME,
    BG_COLOR_SUB2,
    COMPANY_LOGO,
    POINT_COLOR,
    MAX_WIDTH
} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcDown from '../../Assets/Images/ic_reply_down.png'
import useOnclickOutside from 'react-cool-onclickoutside';
import moment from "moment";
import Calendar from "react-calendar";

//캘린더 드롭다운 컴포넌트

interface IProps {
    select?: string
    text: string
    onClickEvent: (date: string, date2?: string) => void
    type: string
    selectRange?: { start: string, end: string }
    toDayLimit?: boolean
    zIndex?: number
    unLimit?: boolean
    customStyle?: object
}

const ColorCalendarDropdown = ({select, onClickEvent, text, type, selectRange, zIndex, unLimit, toDayLimit, customStyle}: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);

    const ref = useOnclickOutside(() => {
        setIsOpen(false);
    });

    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {

    }, [])

    return (
        <DropBoxContainer style={customStyle} ref={ref}>
            <BoxWrap onClick={() => handleClickBtn()} style={{height: 32}}>
                <span className="p-bold" onClick={() => {
                    setIsOpen(true)
                }}>{text}</span>
            </BoxWrap>
            {
                isOpen &&
                <InnerBoxWrap style={{zIndex: zIndex ? zIndex : 0, border: 1}}>
                    <BoxWrap style={{backgroundColor: 'white', flexDirection: 'row', display: 'flex'}}>
                        <div style={{display: "inline-block", float: "left", flex: 1, marginRight: 20}}>
                            {type === 'range' && <p>시작 날짜</p>}
                            <Calendar
                                maxDate={unLimit ? moment('2999-12-31').subtract(1, 'days').toDate() : (type === 'range' && selectRange) ? moment(selectRange.end).toDate() : moment().subtract(1, 'days').toDate()}
                                onChange={(date) => {
                                    if (type === 'range') {
                                        if (selectRange) {
                                            onClickEvent(moment(String(date)).format("YYYY-MM-DD"), selectRange.end)
                                        }
                                    } else {
                                        onClickEvent(moment(String(date)).format("YYYY-MM-DD"));
                                    }
                                    setIsOpen(false)
                                }}
                                value={type === 'single'
                                    ? select === "" ? moment().toDate() : moment(select).toDate()
                                    : selectRange ? selectRange.start === "" ? moment().toDate() : moment(selectRange.start).toDate() : moment().toDate()
                                }
                            />
                        </div>
                        {
                            type === 'range' &&
                            <div style={{display: "inline-block", float: "left", flex: 1}}>
                                {type === 'range' && <p>종료 날짜</p>}
                                <Calendar
                                    maxDate={unLimit ? moment('2999-12-31').subtract(1, 'days').toDate() : toDayLimit ? moment().toDate() : moment().subtract(1, 'days').toDate()}
                                    minDate={moment(selectRange?.start).toDate()}
                                    onChange={(date) => {
                                        if (selectRange) {
                                            onClickEvent(selectRange.start, moment(String(date)).format("YYYY-MM-DD"))
                                        }
                                        setIsOpen(false)
                                    }}
                                    value={
                                        selectRange ? selectRange.end === '' ? moment().toDate() : moment(selectRange.end).toDate() : moment().toDate()
                                    }
                                />
                            </div>
                        }
                    </BoxWrap>
                </InnerBoxWrap>
            }
        </DropBoxContainer>
    );
}

const DropBoxContainer = Styled.div`
    margin-left:10px; min-width: 100px;
    position:relative;
    display: flex;
`

const BoxWrap = Styled.button`
    padding: 4px 15px 5px 15px;
    color: black;
    min-width: 100px;
    height: 300px;
    background-color: #19b9df;
    border: none;
    font-weight: bold;
    text-align: center;
    font-size: 13px;
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

export default ColorCalendarDropdown;
