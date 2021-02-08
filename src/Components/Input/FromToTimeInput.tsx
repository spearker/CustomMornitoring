import React, { useEffect } from 'react';
import Styled from 'styled-components'
import EnrollmentBorderBox from '../Box/EnrollmentBorderBox';

interface IProps {
    title: string,
    onChangeEvent?: (time: string) => void;
    value: string
    readOnly?: boolean
    fromReadOnly?: boolean
    toReadOnly?: boolean
}

const FromToTimeInput = ({ title, onChangeEvent, value, fromReadOnly, toReadOnly }: IProps) => {

    const numberPad = (n, width) => {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    const regExp = (str) => {
        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
        //특수문자 검증
        if (reg.test(str)) {
            //특수문자 제거후 리턴
            return str.replace(reg, "");
        } else {
            //특수문자가 없으므로 본래 문자 리턴
            return str;
        }
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

    const from = value.split('~')[0];
    const to = value.split('~')[1];
    
    const fromTotalSecond = secondForm(value.split('~')[0]);
    const toTotalSecond = secondForm(value.split('~')[1]);

    const fromMax = toTotalSecond; 
    const fromMin = 0; 
    const toMax = 86400; 
    const toMin = 0;

    const fromHour = Math.floor(Number(fromTotalSecond) / 3600);
    const fromMinute = Math.floor((Number(fromTotalSecond) - fromHour * 3600) / 60);
    const fromSecond = Number(fromTotalSecond) - (fromHour * 3600 + fromMinute * 60);

    const toHour = Math.floor(Number(toTotalSecond) / 3600);
    const toMinute = Math.floor((Number(toTotalSecond) - toHour * 3600) / 60);
    const toSecond = Number(toTotalSecond) - (toHour * 3600 + toMinute * 60);

    return (
        <EnrollmentBorderBox>
            <InputBox>
                <Dot />
                <p>{title}</p>
                <div>
                    <div>
                        <input
                            value={numberPad(fromHour, 2)}
                            disabled={fromReadOnly}
                            onChange={(e) => {
                                const value = e.target.value;
                                const str = regExp(value.replace(/(^0+)/, ""));

                                if (fromMax >= Number(str) * 3600 + fromMinute * 60 + fromSecond && (fromMin !== undefined ? fromMin <= Number(str) * 3600 + fromMinute * 60 + fromSecond : true)) {
                                    if (onChangeEvent !== undefined) onChangeEvent(`${timeForm(Number(str) * 3600 + fromMinute * 60 + fromSecond)}~${to}`);
                                }
                            }}
                        />
                    :
                    <input
                            value={numberPad(fromMinute, 2)}
                            disabled={fromReadOnly}
                            onChange={(e) => {
                                const value = e.target.value;
                                const str = regExp(value.replace(/(^0+)/, ""));

                                if (fromMax >= fromHour * 3600 + Number(str) * 60 + fromSecond && (fromMin !== undefined ? fromMin <= fromHour * 3600 + Number(str) * 60 + fromSecond : true)) {
                                    if (onChangeEvent !== undefined) onChangeEvent(`${timeForm(fromHour * 3600 + Number(str) * 60 + fromSecond)}~${to}`);
                                }
                            }}
                        />
                    :
                    <input
                            value={numberPad(fromSecond, 2)}
                            disabled={fromReadOnly}
                            onChange={(e) => {
                                const value = e.target.value;
                                const str = regExp(value.replace(/(^0+)/, ""));

                                if (fromMax >= fromHour * 3600 + fromMinute * 60 + Number(str) && (fromMin !== undefined ? fromMin <= fromHour * 3600 + fromMinute * 60 + Number(str) : true)) {
                                    if (onChangeEvent !== undefined) onChangeEvent(`${timeForm(fromHour * 3600 + fromMinute * 60 + Number(str))}~${to}`);
                                }
                            }}
                        />
                    </div>
                    ~
                    <div style={{marginLeft: 5}}>
                        <input
                            value={numberPad(toHour, 2)}
                            disabled={toReadOnly}
                            onChange={(e) => {
                                const value = e.target.value;
                                const str = regExp(value.replace(/(^0+)/, ""));

                                if (toMax >= Number(str) * 3600 + toMinute * 60 + toSecond && (toMin !== undefined ? toMin <= Number(str) * 3600 + toMinute * 60 + toSecond : true)) {
                                    if (onChangeEvent !== undefined) onChangeEvent(`${from}~${timeForm(Number(str) * 3600 + toMinute * 60 + toSecond)}`);
                                }
                            }}
                        />
                    :
                    <input
                            value={numberPad(toMinute, 2)}
                            disabled={toReadOnly}
                            onChange={(e) => {
                                const value = e.target.value;
                                const str = regExp(value.replace(/(^0+)/, ""));

                                if (toMax >= toHour * 3600 + Number(str) * 60 + toSecond && (toMin !== undefined ? toMin <= toHour * 3600 + Number(str) * 60 + toSecond : true)) {
                                    if (onChangeEvent !== undefined) onChangeEvent(`${from}~${timeForm(toHour * 3600 + Number(str) * 60 + toSecond)}`);
                                }
                            }}
                        />
                    :
                    <input
                            value={numberPad(toSecond, 2)}
                            disabled={toReadOnly}
                            onChange={(e) => {
                                const value = e.target.value;
                                const str = regExp(value.replace(/(^0+)/, ""));

                                if (toMax >= toHour * 3600 + toMinute * 60 + Number(str) && toMin <= toHour * 3600 + toMinute * 60 + Number(str)) {
                                    if (onChangeEvent !== undefined) onChangeEvent(`${from}~${timeForm(toHour * 3600 + toMinute * 60 + Number(str))}`);
                                }
                            }}
                        />
                    </div>
                    <span>총 작업시간: {timeForm(toTotalSecond-fromTotalSecond)} ({toTotalSecond-fromTotalSecond}초)</span>
                </div>
            </InputBox>
        </EnrollmentBorderBox>
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
            width: calc(100% - 133px);
            height: 28px;
            display: flex;
            &>div{
                width: 135px;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &>input{
                    width: calc(50% - 5px);
                    height: 100%;
                    border: solid 0.5px #b3b3b3;
                    background-color: #f4f6fa;
                    font-size: 15px;
                    text-align: center;
                    &::placeholder{
                        color: #11131970;
                        font-size: 15px;
                    }
                    margin-right: 5px;
                    &:not(:first-child){
                        margin-left: 5px;
                    }
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

export default FromToTimeInput;
