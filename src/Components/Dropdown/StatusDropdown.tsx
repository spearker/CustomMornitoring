import React, { useEffect , useRef, useState, useCallback} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import IcMenu from '../../Assets/Images/ic_menu.png'
import IcDown from '../../Assets/Images/ic_drop_down.png'
import useOnclickOutside from 'react-cool-onclickoutside';

//상태 변경 드롭다운 컴포넌트

interface IProps{
    pk: string,
    select: string,
    onClickEvent: any
    contents: any,
}
const StatusDropdown = ({pk,select, contents, onClickEvent}: IProps) => {
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);

    useOnclickOutside(ref,() => {
            setIsOpen(false);
        }
    );
     
    const changeStatusToString = useCallback((status: string)=>{
        if(status === 'active'){
            return '진행'
        }else if(status === 'done'){
            return '완료'
        }else if(status === 'stop'){
            return '중지'
        }else if(status === 'share'){
            return '공유'
        }else if(status === 'ready'){
            return '대기'
        }else{
            return '대기'
        }
    
    },[])

    const changeStatusToColor = useCallback((status: string)=>{
        if(status === 'active'){
            return '#25b4b4'
        }else if(status === 'done'){
            return '#2760ff'
        }else if(status === 'stop'){
            return '#fd6b00'
        }else if(status === 'share'){
            return '#683be5'
        }else if(status === 'ready'){
            return '#717c90'
        }else{
            return '#717c90'
        }
    
    },[])

    const BoxWrap = Styled.div`
        background-color: ${changeStatusToColor(select)};
        padding: 12px;
        color: white;
        min-width: 100px;
        top: 0;
        align-items: center;
        font-size: 18px;
        cursor: pointer;
        left: 0;
        display: flex;
        border-radius: 6px;
    
    `
    const InnerList = Styled.div`
        background-color: ${changeStatusToColor(select)};
        padding: 12px;
        border-bottom: 1px solid #ffffff50;
        border-top: 0;
        color: white;
        min-width: 100px;
        top: 0;
        text-align: left;
        align-items: center;
        font-size: 18px;
        cursor: pointer;
        display: flex;
    `

    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{
    
    },[])

  return ( 
        <div style={{width: 90, position:'relative', display:'block'}} ref={ref}>
            {
                isOpen ?      
                <div > 
                <InnerList >
                    <img src={IcMenu} style={{width:24, height:24, marginRight:10}} onClick={()=>{setIsOpen(!isOpen)}}/>
                    <p className="p-bold" style={{display:'inline-block'}} onClick={()=>{setIsOpen(!isOpen)}}>
                        {changeStatusToString(select)}
                    </p>
                </InnerList>
                    <div style={{position:'absolute',backgroundColor: changeStatusToColor(select), borderRadius:6, zIndex:3, top:50}}> 
                    {   
                        contents.map((v, i)=>{
                            return(
                            <InnerList key={i} onClick={()=>{
                                onClickEvent(pk, v); 
                                setIsOpen(false)
                                }}>{changeStatusToString(v)}</InnerList>
                            )       
                        })
                    }
                     </div>
                </div>
                :
                <div onClick={()=>{setIsOpen(true)}}>
                <BoxWrap onClick={()=>{setIsOpen(true)}}>
                    <img onClick={()=>{setIsOpen(!isOpen)}} src={IcMenu} style={{width:24, height:24, marginRight:10}}/>
                    <p className="p-bold" style={{display:'inline-block'}} onClick={()=>{setIsOpen(!isOpen)}} >{changeStatusToString(select)}</p>
                </BoxWrap>
                </div>
            }
        </div> 
  );
}



export default StatusDropdown;