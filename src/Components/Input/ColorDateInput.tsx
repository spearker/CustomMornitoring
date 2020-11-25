import React, {useEffect, useState} from 'react';
import Styled from 'styled-components'
import InputContainer from '../../Containers/InputContainer';
import Calendar from 'react-calendar'
import moment from 'moment';
import useOnclickOutside from 'react-cool-onclickoutside';
import EnrollmentBorderBox from '../Box/EnrollmentBorderBox';

//import "react-datepicker/dist/react-datepicker.css";

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    placeholder: string,
    value: string,
    onChangeEvent: any
}
const ColorDateInput = ({title, placeholder, value, onChangeEvent}: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOnclickOutside(() => {
        setIsOpen(false);
      });

    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };

  return (
        <>
            <EnrollmentBorderBox>
                <InputBox>
                    <Dot />
                    <p>{title}</p>
                    <div>
                        <p style={{color: value === "" ? '#11131970' : '#111319'}}>{value === '' ? placeholder : value}</p>
                        <div onClick={() => setIsOpen(!isOpen)}><p>날짜 선택</p></div>
                    </div>
                </InputBox>
                {
                    isOpen &&
                    <CalendarBox>
                        <Calendar
                            onChange={(date)=>{onChangeEvent(moment(String(date)).format("YYYY-MM-DD")); handleClickBtn()}}
                            value={value === "" ? moment().toDate() : moment(value).toDate() }
                        />
                    </CalendarBox>
                }
            </EnrollmentBorderBox>

            {/* <InputContainer title={title} width={170}>
                <div ref={ref} style={{ width: 'calc(100% - 180px)'}} >
                <InputBox onClick={()=>handleClickBtn()}>{value === ""|| value === undefined ? "(선택)" : value} </InputBox>
                {
                    isOpen ?
                    <div style={{marginTop:11}}>

                    <Calendar
                    className={title}
                    onChange={(date)=>{onChangeEvent(moment(String(date)).format("YYYY-MM-DD")); handleClickBtn()}}
                    value={value === "" ? moment().toDate() : moment(value).toDate() }
                    />
                </div>
                :
                null
                }

                </div>

            </InputContainer> */}
        </>
  );
}

const InputBox = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    *{
        box-sizing: border-box;
    }
    &>p{
        width: 122px;
        font-size: 15px;
        font-weight: bold;
    }
    &>div{
        &:not(:first-child){
            position: relative;
            width: calc(100% - 133px);
            height: 28px;
            border: solid 0.5px #b3b3b3;
            background-color: #f4f6fa;
            padding: 0 0 0 10px;
            &>div{
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 0;
                right: 0; 
                height: 100%;
                width: 83px;
                background-color: #19B9DF;
                cursor: pointer;
                &>p{
                    color: #0d0d0d;
                    font-size: 15px;
                    font-weight: 500;
                    text-align: center;
                }
            }
        }
    }
`

const Dot = Styled.div`
    width: 5px;
    height: 5px;
    margin-right: 6px;
    background-color: #111319;
    border-radius: 50%;
`
const CalendarBox = Styled.div`
    padding: 10px 0 10px 142px;
`


export default ColorDateInput;
