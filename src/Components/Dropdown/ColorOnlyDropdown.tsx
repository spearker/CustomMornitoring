import React, { useState } from 'react';
import Styled from 'styled-components'
import useOnclickOutside from 'react-cool-onclickoutside';
import dropdownButton from '../../Assets/Images/ic_dropdownbutton.png'

//드롭다운 입력창
interface IProps{
    list: string[],
    value: string | number,
    onChangeEvent: (v: any)=>void
    placeholder?: string
}
const ColorOnlyDropdown = ({ list, value, onChangeEvent, placeholder }: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOnclickOutside(() => {
        setIsOpen(false);
    });

    return (
        <>
            <InputBox className="noStyle">
                <div ref={ref}>
                    <div onClick={()=>setIsOpen(!isOpen)}>
                        <p style={{color: value === "" ? '#11131970' : '#111319'}}>{value === '' ? placeholder : list.filter((f, i) => i === value)[0]}</p>
                        <img src={dropdownButton} alt="arrow" style={{transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"}} />
                    </div>
                    {
                        isOpen &&
                        <DropBox>
                            <div onClick={() => {onChangeEvent(0); setIsOpen(false);}}><p>(선택없음)</p></div>
                            {
                                list.map((v,i) => (
                                    v !== '(선택없음)' && <div key={i} onClick={() => {onChangeEvent(i); setIsOpen(false)}}>
                                        <p>{v}</p>
                                    </div>
                                ))
                            }
                        </DropBox>
                    }
                </div>
            </InputBox>
        </>
    );
}

const InputBox = Styled.div`
    &>div{
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0 0 0 10px;
        align-items: center;
        cursor: pointer;
        &>div{
            &:first-child{
                position: relative;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
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

export default ColorOnlyDropdown;
