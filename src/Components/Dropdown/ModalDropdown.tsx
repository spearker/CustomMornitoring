import React, { useEffect , useRef, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcDown from '../../Assets/Images/ic_drop_down.png'
import useOnclickOutside from 'react-cool-onclickoutside';

//드롭다운 컴포넌트

interface IProps{
    select?: string,
    onClickEvent: any
    contents: any,
    text: string
    customStyle? : any
}
const ModalDropdown = ({select, contents, onClickEvent, text, customStyle}: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);

    const ref = useOnclickOutside(() => {
        setIsOpen(false);
    });



    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{

    },[])

    return (
        <div style={{marginLeft:10, position:'relative', display:'inline-block', zIndex:3, ...customStyle}} ref={ref}>
            <BoxWrap onClick={()=>{setIsOpen(true)}} style={{padding: 0}}>
                <div style={{display:'inline-block', width: !customStyle ? 161 : customStyle.width - 27}}>
                    {
                        select ? <p onClick={()=>{setIsOpen(true)}} style={{ marginRight:10,margin:0}}>&nbsp; {select}</p>
                        : <p onClick={()=>{setIsOpen(true)}} style={{ marginRight:10,margin:0, color: '#b3b3b3'}}>&nbsp; {text}</p>
                    }

                </div>
                <div style={{display:'inline-block', backgroundColor: POINT_COLOR, width: 27, height: 27}}>
                    <img src={IcDown} onClick={()=>{setIsOpen(true)}} style={{width: 14, height: 14, marginTop: 5}}/>
                </div>

            </BoxWrap>
            {
                isOpen ?
                    <div style={{position:'absolute', top:0, right:0, textAlign:'left'}}>
                        <BoxWrap onClick={()=>{setIsOpen(true)}} style={{padding: 0}}>
                            <div style={{display:'inline-block', width: 161}}>
                                {
                                    select ? <p onClick={()=>{setIsOpen(true)}} style={{ marginRight:10,margin:0}}>&nbsp; {select}</p>
                                        : <p onClick={()=>{setIsOpen(true)}} style={{ marginRight:10,margin:0, color: '#b3b3b3'}}>&nbsp; {text}</p>
                                }
                            </div>
                            <div style={{display:'inline-block', backgroundColor: POINT_COLOR, width: 27, height: 28}}>
                                <img src={IcDown} onClick={()=>{setIsOpen(true)}} style={{width: 14, height: 14, marginTop: 5}}/>
                            </div>

                        </BoxWrap>
                        {
                            contents.map((v, i)=>{
                                return(
                                    <BoxWrap style={{borderRadius:0, borderTop:'1px solid #ffffff50'}}>
                                        <div style={{display:'inline-block', width: 161}}>
                                            <p style={{margin:0}} key={i} onClick={()=>{
                                                onClickEvent(v);
                                                setIsOpen(false)
                                            }}>{v}</p>
                                        </div>
                                    </BoxWrap>
                                )
                            })
                        }
                    </div>
                    :
                    null

            }
        </div>
    );
}

const BoxWrap = Styled.button`
    color: black;
    width: 190px;
    height: 28px;
    background-color: white;
    border: 1px solid #b3b3b3;
    font-weight: bold;
    text-algin: center;
    font-size: 13px;
    img {
    width: 14px;
    height: 14px;
    }
    p{
        text-align: left;
    }
`

const InnerBoxWrap = Styled.button`
    padding: 5px 15px 4px 15px;
    border-radius: 0px;
    color: white;
    min-width: 100px;
    background-color: ${BG_COLOR_SUB};
    border: none;
    font-weight: bold;
    text-algin: left;
    p{
        text-algin: left;
     }
    font-size: 13px;
    img {
    margin-right: 7px;
    width: 14px;
    height: 14px;
    }
`

export default ModalDropdown;
