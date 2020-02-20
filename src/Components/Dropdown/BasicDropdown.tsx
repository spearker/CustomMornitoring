import React, { useEffect , useRef, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcDown from '../../Assets/Images/ic_drop_down.png'
import useOnclickOutside from 'react-cool-onclickoutside';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    select: string,
    onClickEvent: any
    contents: any,
}
const BasicDropdown = ({select, contents, onClickEvent}: IProps) => {
    const ref = useRef();
    const [openMenu, setOpenMenu] = useState(false);
    useOnclickOutside(ref, () => {
        setOpenMenu(false);
    });
   
    const handleClickBtn = () => {
        setOpenMenu(!openMenu);
    };
    useEffect(()=>{
    
    },[])

  return ( 
        <div style={{position:'relative', display:'inline-block', width: 124, zIndex:3 }} ref={ref}>
            {
                openMenu ?       
                <BoxWrap>
                    <p style={{paddingBottom:8, paddingRight:10, color:'black', fontWeight:'bold'}} onClick={()=>{
                                setOpenMenu(false)
                                }}>{select}</p>
                    {
                        contents.map((v, i)=>{
                            return(
                            <p style={{paddingBottom:8, paddingRight:10}} key={i} onClick={()=>{
                                onClickEvent(i); 
                                setOpenMenu(false)
                                }}>{v}</p>
                            )       
                        })
                    }
                </BoxWrap>
                :
                <>
                <BoxWrap>
                    <p onClick={()=>{setOpenMenu(true)}} style={{marginRight:10}}>{select}</p>
                </BoxWrap>
                </>
            }
             <a style={{position:'absolute', top:4, right:6, cursor:'pointer'}} onClick={handleClickBtn}>
                 <img src={IcDown} style={{width: 12}}/>
            </a>
        </div> 
  );
}

const BoxWrap = Styled.div`
    background-color: #efefef;
    padding: 6px;
    font-size: 13px;
    color: #525252;
    min-width: 100px;
    top: 0;
    cursor: pointer;
    left: 0;
`


export default BasicDropdown;