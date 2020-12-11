import React, {useEffect} from 'react'
import Styled from 'styled-components'
import EnrollmentBorderBox from '../Box/EnrollmentBorderBox'

//항목 명도 수정이 가능한 커스텀 인풋
interface IProps {
    title: string
    value: string | number | undefined | null
    onChangeEvent: (v: any) => void
    unit?: string
    placeholder?: string
    type?: string
}

const ColorInputWithText = ({type, title, value, onChangeEvent, unit, placeholder}: IProps) => {

    return (
        <EnrollmentBorderBox>
            <InputBox>
                <Dot/>
                <p>{title}</p>
                <div>
                    <input type={type ? type : 'text'} placeholder={placeholder ? placeholder : ''}
                           value={value ? value : ''} onChange={(e) => {
                        onChangeEvent(type === 'number' ? (e.target.value) : e.target.value)
                    }}/>
                    {unit && <p>{unit}</p>}
                </div>
            </InputBox>
        </EnrollmentBorderBox>
    )
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
            border: solid 0.5px #b3b3b3;
            background-color: #f4f6fa;
            padding: 0 20px 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &>input{
                width: 100%;
                height: 100%;
                border: 0;
                background-color: transparent;
                font-size: 15px;
                &::placeholder{
                    color: #11131970;
                    font-size: 15px;
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


export default ColorInputWithText
