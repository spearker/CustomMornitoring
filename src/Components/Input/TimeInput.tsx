import React from 'react';
import Styled from 'styled-components'
import EnrollmentBorderBox from '../Box/EnrollmentBorderBox';

interface IProps {
    title: string,
    onChangeEvent?: (time: number) => void;
    value: number
    max?: number
    min?: number
    readOnly?: boolean
    sumTotalCheck?: boolean
    warning?: string
}

const TimeInput = ({ title, onChangeEvent, value, max, min, readOnly, sumTotalCheck, warning }: IProps) => {

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

    const hour = Math.floor(Number(value) / 3600);
    const minute = Math.floor((Number(value) - hour * 3600) / 60);
    const second = Number(value) - (hour * 3600 + minute * 60);

    return (
        <EnrollmentBorderBox>
            <InputBox>
                <Dot />
                <p>{title}</p>
                <div>
                    <div>
                        <input
                            value={numberPad(hour, 2)}
                            disabled={readOnly}
                            onChange={(e) => {
                                const value = e.target.value;
                                const str = regExp(value.replace(/(^0+)/, ""));

                                if ((max !== undefined ? max >= Number(str) * 3600 + minute * 60 + second : true) && (min !== undefined ? min <= Number(str) * 3600 + minute * 60 + second : true)) {
                                    if (onChangeEvent !== undefined) onChangeEvent(Number(str) * 3600 + minute * 60 + second);
                                }
                            }}
                        />
                    :
                    <input
                            value={numberPad(minute, 2)}
                            disabled={readOnly}
                            onChange={(e) => {
                                const value = e.target.value;
                                const str = regExp(value.replace(/(^0+)/, ""));

                                if ((max !== undefined ? max >= hour * 3600 + Number(str) * 60 + second : true) && (min !== undefined ? min <= hour * 3600 + Number(str) * 60 + second : true)) {
                                    if (onChangeEvent !== undefined) onChangeEvent(hour * 3600 + Number(str) * 60 + second);
                                }
                            }}
                        />
                    :
                    <input
                            value={numberPad(second, 2)}
                            disabled={readOnly}
                            onChange={(e) => {
                                const value = e.target.value;
                                const str = regExp(value.replace(/(^0+)/, ""));

                                if ((max !== undefined ? max >= hour * 3600 + minute * 60 + Number(str) : true) && (min !== undefined ? min <= hour * 3600 + minute * 60 + Number(str) : true)) {
                                    if (onChangeEvent !== undefined) onChangeEvent(hour * 3600 + minute * 60 + Number(str));
                                }
                            }}
                        />
                    </div>
                    <span>현재 초: {value}</span>
                    {warning && sumTotalCheck && <span style={{color: '#ff5549', margin: '3px 0 0 10px', fontSize: 13}}>{warning}</span>}
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

export default TimeInput;
