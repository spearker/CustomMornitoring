import React, { useEffect , useRef, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import useOnclickOutside from 'react-cool-onclickoutside';
import { transferCodeToName } from '../../Common/codeTransferFunctions';
import IcDown from '../../Assets/Images/ic_dropdown.png'
//드롭다운 컴포넌트


interface IProps{
    select: string | number,
    onClickEvent: any,
    contents: number[] | undefined, // [902, 901,902]
}
const MonitoringDropdown = ({select, contents, onClickEvent}: IProps) => {
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
        <div style={{marginLeft:10, minWidth:100, position:'relative', display:'inline-block', zIndex:3 }} ref={ref}>
                <BoxWrap onClick={()=>{setIsOpen(true)}} >               
                    <p className="p-bold" onClick={()=>{setIsOpen(true)}} style={{display:'inline-block', marginRight:10}}>{select === 'all' ? '전체보기' : transferCodeToName('title',select,'kor')}</p>
                    <img src={IcDown} onClick={()=>{setIsOpen(true)}} style={{width: 14, height: 14, float:'right', marginTop:2}}/>
                </BoxWrap>
            {
                isOpen ?       
                <div style={{position:'absolute',  top:0, right:0, textAlign:'left'}}>
                    <BoxWrap style={{borderRadius:0, backgroundColor:'BG_COLOR', paddingBottom:5}}>               
                        <p className="p-bold" onClick={()=>{setIsOpen(true)}} style={{display:'inline-block', marginRight:10}}>{select === 'all' ? '전체보기' : transferCodeToName('title',select,'kor')}</p>
                        <img src={IcDown} style={{width: 14, height: 14, float:'right', marginTop:2}}/>
                    </BoxWrap>
                    <BoxWrap style={{borderRadius:0, borderTop:'1px solid #ffffff50',backgroundColor:'#717C90'}}>   
                        <p style={{paddingBottom:3}} onClick={()=>{
                        onClickEvent('all');
                        setIsOpen(false)
                        }}>전체보기</p>
                    </BoxWrap>
                    {
                        contents !== undefined && contents!.map((v, i)=>{
                            return(
                                <BoxWrap style={{borderRadius:0, borderTop:'1px solid #ffffff50',backgroundColor:'#717C90'}}>   
                                
                                    <p style={{paddingBottom:3}} key={i} onClick={()=>{
                                    onClickEvent(v); 
                                    setIsOpen(false)
                                    }}>{transferCodeToName('title',v,'kor')}</p>
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
    padding: 4px 15px 5px 15px;
    border-radius: 5px;
    color: white;
    min-width: 128px;
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


export default MonitoringDropdown;