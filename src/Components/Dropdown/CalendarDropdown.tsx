import React, { useEffect , useRef, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcDown from '../../Assets/Images/ic_reply_down.png'
import useOnclickOutside from 'react-cool-onclickoutside';
import moment from "moment";
import Calendar from "react-calendar";

//드롭다운 컴포넌트


interface IProps{
    select: string
    onClickEvent: (date: string) => void
}
const CalendarDropdown = ({select, onClickEvent}: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);

    const ref = useOnclickOutside(() => {
        setIsOpen(false);
    });

    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{

    },[])

    return (
        <div style={{marginLeft:10, minWidth:100, position:'relative', display:'inline-block', zIndex:100, float: "right", marginRight: 20 }} ref={ref}>
            <BoxWrap onClick={()=>{setIsOpen(!isOpen)}} >
                <p className="p-bold" onClick={()=>{setIsOpen(true)}} style={{display:'inline-block', marginRight:10}}>통계기간 {select === '' ? moment().format('YYYY-MM-DD') : select}</p>
                <img src={IcDown} onClick={()=>{setIsOpen(true)}} style={{width: 14, height: 14}}/>
            </BoxWrap>
            {
                isOpen &&
                    <div style={{position:'absolute',  top:0, right:0, textAlign:'left', marginTop: 25}}>
                        <BoxWrap>
                            <Calendar
                                onChange={(date)=>{
                                    onClickEvent(moment(String(date)).format("YYYY-MM-DD"));
                                }}
                                value={select === "" ? moment().toDate() : moment(select).toDate() }
                            />
                        </BoxWrap>
                    </div>

            }
        </div>
    );
}

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
    background-color: ${BG_COLOR};
    color: white;
    }
`

const InnerBoxWrap = Styled.button`
    padding: 5px 15px 4px 15px;
    border-radius: 0px;
    color: white;
    min-width: 100px;
    background-color: ${BG_COLOR_SUB};
    border: none;
    font-weight: bold;
    text-algin: left;
    p{
        text-algin: left;
     }
    font-size: 13px;
    img {
    margin-right: 7px;
    width: 14px;
    height: 14px;
    }
`

export default CalendarDropdown;
