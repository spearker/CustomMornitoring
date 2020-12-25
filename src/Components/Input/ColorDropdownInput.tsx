import React, {useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, BG_COLOR_SUB2, POINT_COLOR} from '../../Common/configset'
import InputContainer from '../../Containers/InputContainer';
import useOnclickOutside from 'react-cool-onclickoutside';
import IC_ARROW from '../../Assets/Images/ic_drop_down.png'
import IC_ARROW_UP from '../../Assets/Images/ic_drop_up.png'
import EnrollmentBorderBox from '../Box/EnrollmentBorderBox';
import dropdownButton from '../../Assets/Images/ic_dropdownbutton.png'

//드롭다운 입력창
interface IProps{
    title: string,
    contents: string[],
    value: string | number,
    onChangeEvent: (v: any)=>void
    placeholder?: string
}
const ColorDropdownInput = ({ contents, title, value, onChangeEvent, placeholder }: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOnclickOutside(() => {
        setIsOpen(false);
      });

    useEffect(()=>{

    },[])

    return (
        <>
            <EnrollmentBorderBox>
                <InputBox>
                    <Dot />
                    <p>{title}</p>
                    <div ref={ref}>
                        <div onClick={()=>setIsOpen(!isOpen)}>
                            <p style={{color: value === "" ? '#11131970' : '#111319'}}>{value === '' ? placeholder : contents.filter((f, i) => i === value)[0]}</p>
                            <img src={dropdownButton} alt="arrow" style={{transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"}} />
                        </div>
                        {
                            isOpen &&
                            <DropBox>
                                <div onClick={() => {onChangeEvent(0); setIsOpen(false);}}><p>(선택없음)</p></div>
                                {
                                    contents.map((v,i) => (
                                        v !== '(선택없음)' && <div key={i} onClick={() => {onChangeEvent(i); setIsOpen(false)}}>
                                            <p>{v}</p>
                                        </div>
                                    ))
                                }
                            </DropBox>
                        }
                    </div>
                </InputBox>
            </EnrollmentBorderBox>
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
        height: 100%;
        font-size: 15px;
        font-weight: bold;
    }
    &>div{
        &:not(:first-child){
            position: relative;
            width: calc(100% - 133px);
            height: 28px;
            border: solid 1px #b3b3b3;
            background-color: #f4f6fa;
            padding: 0 0 0 10px;
            cursor: pointer;
            &>div{
                &:first-child{
                    position: relative;
                    height: 100%;
                    &>img{
                        position: absolute;
                        width: 28px;
                        height: 100%;
                        top: 0;
                        right: 0;
                    }
                }
            }
        }
    }
`

const DropBox = Styled.div`
    z-index: 2;
    position: absolute;
    top: 26px;
    left: -1px;
    width: calc(100% + 2px);
    border: 1px solid #b3b3b3;
    overflow: auto;
    &>div{
        width: 100%;
        height: 28px; 
        display: flex;
        align-items: center;
        border-bottom: 1px solid #b3b3b3; 
        background-color: white;
        padding: 0 0 0 5px;
    }
`

const Dot = Styled.div`
    width: 5px;
    height: 5px;
    margin-right: 6px;
    background-color: #111319;
    border-radius: 50%;
`

export default ColorDropdownInput;
