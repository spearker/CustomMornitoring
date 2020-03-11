import React, { useEffect,useRef, useState } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';
import Calendar from 'react-calendar'
import moment from 'moment';
import useOnclickOutside from 'react-cool-onclickoutside';
import DatetimeRangePicker from 'react-datetime-range-picker';

interface IProps{
    title: string,
    start: string,
    end: string,
    onChangeEventStart: any
    onChangeEventEnd: any
}
const DateRangeInput = ({title, start, end, onChangeEventStart, onChangeEventEnd}: IProps) => {
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
           
                <InputWrap style={{ width:'100%'}}>
                <DatetimeRangePicker inline={true} startDate={new Date(start)} endDate={new Date(end)} timeFormat={'HH:mm'} dateFormat={'YYYY-MM-DD'} onChange={(v)=>{
                    onChangeEventEnd(moment(v.end).format('YYYY-MM-DD HH:mm'))
                    onChangeEventStart(moment(v.start).format('YYYY-MM-DD HH:mm'))
                    }}/>
                
              </InputWrap>
         
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

const InputWrap = Styled.div`
    width: 500px;
    .rdt{
        display: inline-block;
        background-color: #f4f6fa;
        
    }
    input{
        margin-right: 10px;
        border: solid 0.5px #d3d3d3;
        font-size: 14px;
        padding: 6px;
        display: inline-block;
        width: 200px;
        padding-left: 10px;
        background-color: #f4f6fa;
    }

`

export default DateRangeInput;