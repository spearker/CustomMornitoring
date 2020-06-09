import React, { useEffect , useRef, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcDown from '../../Assets/Images/ic_drop_down_w.png'
import useOnclickOutside from 'react-cool-onclickoutside';

//드롭다운 컴포넌트


interface IProps{
    select: string,
    onClickEvent: any
    contents: any,
}
const BasicBigDropdown = ({select, contents, onClickEvent}: IProps) => {
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
        <div style={{marginLeft:10, width:180, position:'relative', display:'inline-block', zIndex:3 }} ref={ref}>
                <BoxWrap onClick={()=>{setIsOpen(true)}} >               
                    <p className="p-bold" onClick={()=>{setIsOpen(true)}} style={{display:'inline-block', marginRight:10}}>{select}</p>
                    <img src={IcDown} onClick={()=>{setIsOpen(true)}} style={{width: 14, height: 14,position:'absolute',display:'inline-block',top:7, right:6, zIndex:4}}/>
                </BoxWrap>
            {
                isOpen ?       
                <div style={{position:'absolute',  top:0, right:0, textAlign:'left'}}>
                    <BoxWrap style={{borderRadius:0, backgroundColor:'BG_COLOR', paddingBottom:7}}>               
                        <p className="p-bold" onClick={()=>{setIsOpen(true)}} style={{display:'inline-block', marginRight:10}}>{select}</p>
                        <img src={IcDown} onClick={()=>{setIsOpen(true)}} style={{width: 14, height: 14,position:'absolute',display:'inline-block',top:7, right:6, zIndex:4}}/>
                    </BoxWrap>
                    {
                        contents.map((v, i)=>{
                            return(
                                <BoxWrap style={{borderRadius:0, borderTop:'1px solid #ffffff50',backgroundColor:'#717C90'}}>   
                                    <p style={{paddingBottom:3}} key={i} onClick={()=>{
                                    onClickEvent(i); 
                                    setIsOpen(false)
                                    }}>{v}</p>
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
    padding: 7px 15px 7px 15px;
    border-radius: 5px;
    color: white;
    min-width: 180px;
    font-size: 15px;
 
    background-color: ${BG_COLOR_SUB};
    border: none;
    font-weight: bold;
    text-algin: center;
    font-size: 13px;
    img {
    width: 14px;
    height: 14px;
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

export default BasicBigDropdown;