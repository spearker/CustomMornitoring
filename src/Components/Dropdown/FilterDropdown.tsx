import React, { useEffect , useRef, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcDown from '../../Assets/Images/ic_drop_down.png'
import useOnclickOutside from 'react-cool-onclickoutside';

//드롭다운 컴포넌트


interface IProps{
    select: string,
    onClickEvent: any
    contents: any,
}
const FilterDropdown = ({select, contents, onClickEvent}: IProps) => {
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
        <div style={{position:'relative', display:'inline-block', width: 124, zIndex:3 }} ref={ref}>
            {
                isOpen ?       
                <BoxWrap>
                    <p style={{paddingBottom:8, paddingRight:10, color:'black', fontWeight:'bold'}} onClick={()=>{
                                setIsOpen(false)
                                }}>{select}</p>
                    {
                        contents.map((v, i)=>{
                            return(
                            <p style={{paddingBottom:8, paddingRight:10}} key={i} onClick={()=>{
                                onClickEvent(i); 
                                setIsOpen(false)
                                }}>{v}</p>
                            )       
                        })
                    }
                </BoxWrap>
                :
                <>
                <BoxWrap>
                    <p onClick={()=>{setIsOpen(true)}} style={{marginRight:10}}>{select}</p>
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
    background-color: ${BG_COLOR};
    padding: 4px 12px 4px 12px;
    font-size: 13px;
    color: white;
    top: 0;
    cursor: pointer;
    left: 0;
`


export default FilterDropdown;
