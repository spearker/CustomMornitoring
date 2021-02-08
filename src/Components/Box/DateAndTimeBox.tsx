import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import ColorInputWithText from '../Input/ColorInputWithText';
import TimeInput from '../Input/TimeInput';
import IC_Dropdown from "../../Assets/Images/ic_dropdown_gray.png"
import IC_Dropup from "../../Assets/Images/ic_dropup_gray.png"
import { KeyboardDateTimePicker, KeyboardTimePicker, MuiPickersUtilsProvider, TimePickerView } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import WithTextBox from '../Input/WithTextBox';
import { TimePicker } from 'antd';
import FromToTimeInput from '../Input/FromToTimeInput';

interface DateListArray {
    date: string,
    working_time: string,
    motor_run_time: string,
    run_time: string, 
    stop_time: string, 
    spm: string, 
    preset_counter: string
}

interface IProps {
    data: DateListArray;
    onChangeEvent: (value) => void;
    max: number;
    fromReadOnly?: boolean;
    toReadOnly?: boolean;
}

const numberPad = (n, width) => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

const timeForm = (second) => {
    const HH = Math.floor(Number(second) / 3600);
    const mm = Math.floor((Number(second) - HH * 3600) / 60);
    const ss = Number(second) - (HH * 3600 + mm * 60);

    return `${numberPad(HH, 2)}:${numberPad(mm, 2)}:${numberPad(ss, 2)}`;
}

const secondForm = (time) => {
    const dateTime = time.split(':');

    const second = Number(dateTime[0])*3600 + Number(dateTime[1])*60 + Number(dateTime[2]);

    return second;
}

const regExp = (str) => {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    //특수문자 검증
    if (reg.test(str.replace(/(^0+)/, ""))) {
        //특수문자 제거후 리턴
        return str.replace(/(^0+)/, "").replace(reg, "");
    } else {
        //특수문자가 없으므로 본래 문자 리턴
        return str.replace(/(^0+)/, "");
    }
}


const DateAndTimeBox = ({data, onChangeEvent, max, fromReadOnly, toReadOnly}: IProps) => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Box style={{height: open ? 'auto' : 50}}>
                <div onClick={()=>setOpen(!open)}>
                    <p>{data.date}</p>
                    <div>
                        <img alt="drop image" src={open ? IC_Dropup : IC_Dropdown} />
                    </div>
                </div>
                {
                    open &&
                    <>
                        <hr />
                        <div>
                            <FromToTimeInput title={'작업시간'} onChangeEvent={(e) => onChangeEvent({ ...data, working_time: e })}
                                    value={data.working_time} fromReadOnly={fromReadOnly} toReadOnly={toReadOnly} />
                            <TimeInput title={'가동시간'} onChangeEvent={(e) => onChangeEvent({ ...data, run_time: timeForm(e) })}
                                    value={secondForm(data.run_time)} max={max - secondForm(data.stop_time)} warning={"(가동시간과 비가동시간의 합이 총작업시간를 넘었습니다.)"}
                                    sumTotalCheck={secondForm(data.run_time)+secondForm(data.stop_time) > max ? true : false} />
                            <TimeInput title={'비가동시간'} onChangeEvent={(e) => onChangeEvent({ ...data, stop_time: timeForm(e) })}
                                    value={secondForm(data.stop_time)} max={max - secondForm(data.run_time)} warning={"(가동시간과 비가동시간의 합이 총작업시간를 넘었습니다.)"} 
                                    sumTotalCheck={secondForm(data.run_time)+secondForm(data.stop_time) > max ? true : false} />
                            <TimeInput title={'모터가동시간'} onChangeEvent={(e) => onChangeEvent({ ...data, motor_run_time: timeForm(e) })}
                                    value={secondForm(data.motor_run_time)} max={secondForm(data.run_time)} />
                            <ColorInputWithText title={'SPM'} value={data.spm} onChangeEvent={(e) => onChangeEvent({ ...data, spm: regExp(e) })}
                                                placeholder={'SPM을 입력해주세요'} />
                            <ColorInputWithText title={'프리셋 카운트'} value={data.preset_counter}
                                                onChangeEvent={(e) => {
                                                    if (Number(e) <= 999999) onChangeEvent({ ...data, preset_counter: regExp(e) });
                                                }} placeholder={'프리셋 카운트를 입력해주세요 (최대: 999,999)'} />
                        </div>
                    </>
                }
            </Box>
        </>
    );
}

const Box = Styled.div`
    border-bottom: 2px solid #00000080;
    &:hover{
        border-bottom: 2px solid #000;
    }
    transition: border-bottom 0.5s ease-in-out;
    &>div{
        &:first-child{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
            cursor: pointer;
            transition: color 0.5s ease-in-out;
            color: #00000090;
            &:hover{
                color: #000;
            }
            &>p{
                font-size: 25px;
                font-weight: bold;
            }
        }
    }

`

export default DateAndTimeBox;