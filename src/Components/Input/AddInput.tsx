import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import IcPlus from '../../Assets/Images/ic_plus.png'
import IcPlusGray from '../../Assets/Images/ic_plus_gray.png'
import InputContainer from '../../Containers/InputContainer';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    onChangeEvent: ()=>void,
    children: any,
    icType?: string,
}
const AddInput = ({title, onChangeEvent, children, icType}: IProps) => {
  useEffect(()=>{
   
  },[])

  return ( 
        <InputContainer title={title}>
            <InnerBox>
                <div>
                {children}
                </div>
                <InputBox onClick={onChangeEvent}>
                    {icType !== 'solo' ?
                        <>
                            <img src={IcPlus} style={{width: 10, height: 10, marginRight:5}} />
                            <span className="p-bold" style={{paddingBottom:2, marginRight:10}}>{title+ ' 추가' }</span>
                        </>
                    :
                        <>
                            <img src={IcPlusGray} style={{width: 13, height: 13, marginTop:3, marginBottom:3}} />
                           
                        </>
                    
                    }
                
                </InputBox>
            </InnerBox>
           
        </InputContainer >
  );
}

const InnerBox = Styled.div`
    width: calc(100% - 200px);
`
const InputBox = Styled.a`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    align-items: center;
    display: flex;
    width: 100%;
    margin-top: 4px;
    padding-left: 10px;
    text-align: center;
    justify-content: center;
    width: 100%;
    background-color: #f4f6fa;

`


export default AddInput;