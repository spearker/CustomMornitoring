import React, { useEffect,useRef, useState } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';
import Calendar from 'react-calendar'
import moment from 'moment';
import useOnclickOutside from 'react-cool-onclickoutside';

//import "react-datepicker/dist/react-datepicker.css";

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    description: string,
    value: string,
    onChangeEvent: any
}
const DateInput = ({title, description, value, onChangeEvent}: IProps) => {
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);
    useOnclickOutside(ref,() => {
        setIsOpen(false);
        }
    );
    
    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
  useEffect(()=>{
   
  },[])



  return ( 
        <InputContainer title={title}>
            <div ref={ref} style={{ width: 'calc(100% - 200px)'}} >
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
            
        </InputContainer> 
  );
}

const InputBox = Styled.p`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    width: 100%;
    padding-left: 10px;
    background-color: #f4f6fa;
`


export default DateInput;