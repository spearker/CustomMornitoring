import React, { useEffect , useRef, useState} from 'react';
import Styled from 'styled-components'
import useOnclickOutside from 'react-cool-onclickoutside';

interface IProps{
    select: any,
    onClickEvent: any
    contents: any,
}
const CommonDropdown = ({select, contents, onClickEvent}: IProps) => {
    
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
        <div style={{position:'relative', display:'inline-block', width: 124, zIndex:3 }} ref={ref}>
            {
                isOpen ?       
                <BoxWrap>
                    <p style={{paddingBottom:8, paddingRight:10, color:'black', fontWeight:'bold'}} onClick={()=>{
                                setIsOpen(false)
                                }}>{contents[select]}</p>
                    {
                        Object.keys(contents).map((v, i)=>{
                            return(
                            <p  style={{paddingBottom:8, paddingRight:10}} key={i} onClick={()=>{
                               
                                onClickEvent(v); 
                                setIsOpen(false)
                                }}>{contents[v]}</p>
                            )       
                        })
                    }
                </BoxWrap>
                :
                <>
                <BoxWrap>
                    <p onClick={()=>{setIsOpen(true)}} 
                        style={{marginRight:10}}>
                        {contents[select]}
                    </p>
                </BoxWrap>
                </>
            }
             <a style={{position:'absolute', top:4, right:6, cursor:'pointer'}} onClick={handleClickBtn}>
                 
            </a>
        </div> 
  );
}

const BoxWrap = Styled.div`
    padding: 4px 12px 4px 12px;
    font-size: 13px;
    top: 0;
    cursor: pointer;
    left: 0;
`


export default CommonDropdown;
