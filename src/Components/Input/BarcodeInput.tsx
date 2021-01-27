import React, {useEffect} from 'react';
import Styled from 'styled-components'
import IC_MINUS from '../../Assets/Images/ic_minus.png'
import WithTextBox from './WithTextBox';


//바코드 규칙
interface IProps{
    title: string,
    value: string,
    onChangeEvent: any,
    onRemoveEvent: any,
    padding?: string
}


const BarcodeInput = ({ title, value, onChangeEvent, onRemoveEvent, padding}: IProps) => {
  const BarcodeType = /^[A-Za-z0-9+]*$/;
    
  return (
    <WithTextBox title={title} borderUse padding={padding}>
        <InputBox>
            <input 
                type="text"
                value={value} 
                placeholder={'알파벳 또는 숫자만 가능합니다'}
                onChange={(e)=>onChangeEvent(BarcodeType.test(e.target.value) ? e.target.value : value)} />
            <div onClick={() => onRemoveEvent()}>
                <img alt='minus' src={IC_MINUS} />
            </div>
        </InputBox>
    </WithTextBox>
  );
}


const InputBox = Styled.div`
    background-color: #f4f6fa;
    border: solid 0.5px #d3d3d3;
    display: flex;
    &>input{
        width: calc(100% - 28px);
        height: 100%;
        background-color: transparent;
        border: 0;
        padding: 0 10px;
    }
    &>div{
        &:not(.plusBtn){
            cursor: pointer;
            width: 28px;
            height: 100%;
            background-color: #B3B3B3;
            text-align: center;
            &>img{
                width: 25px;
                vertical-align: middle;
            }
        }
    }
    .plusBtn{
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 30%;
        &>img{
            width: 17px;
            height: 17px;
            margin-right: 5px;
        }
    }
`

export default BarcodeInput;
