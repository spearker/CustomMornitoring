import React, {useEffect, useState} from 'react';
import Styled from 'styled-components'
import useOnclickOutside from 'react-cool-onclickoutside';
import EnrollmentBorderBox from '../Box/EnrollmentBorderBox';
import dropdownButton from '../../Assets/Images/ic_dropdownbutton.png'

//드롭다운 입력창
interface IProps{
    title: string,
    contents: string[],
    value: string | number,
    valueType: 'string' | 'number'
    onChangeEvent: (v: any)=>void
    placeholder?: string
    borderStyle?: string
    placeholderColor?: string
    readonly?: boolean
}
const ColorDropdownInput = ({ contents, title, value, onChangeEvent, placeholder, valueType, borderStyle, placeholderColor, readonly }: IProps) => {
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
                    <div ref={ref} style={{border: borderStyle ? borderStyle : '1px solid #b3b3b3'}}>
                        <div onClick={()=>setIsOpen(!isOpen)}>
                            <p style={{color: value === '' || value === undefined || value === null ? placeholderColor ? placeholderColor : '#11131970' : '#111319'}}>{value === '' || value === undefined || value === null ? placeholder : valueType === 'number' ? contents.filter((f, i) => i === value)[0] : value}</p>
                            <img src={dropdownButton} alt="arrow" style={{transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"}} />
                        </div>
                        {
                            isOpen && !readonly &&
                            <DropBox style={{border: borderStyle ? borderStyle : '1px solid #b3b3b3'}}>
                                <div style={{borderBottom: borderStyle ? borderStyle : '1px solid #b3b3b3'}}
                                     onClick={() => {
                                        if(valueType === 'number'){
                                            onChangeEvent(0);
                                        } else {
                                            onChangeEvent(-1);
                                        } 
                                        setIsOpen(false);
                                }}><p>(선택없음)</p></div>
                                {
                                    contents.map((v,i) => (
                                        v !== '(선택없음)' 
                                        && <div key={i} 
                                                style={{borderBottom: borderStyle ? borderStyle : '1px solid #b3b3b3'}} 
                                                onClick={() => {onChangeEvent(i); setIsOpen(false)}}
                                            >
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
    overflow: auto;
    &>div{
        width: 100%;
        height: 28px; 
        display: flex;
        align-items: center;
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
