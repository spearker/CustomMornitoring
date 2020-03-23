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
    onlyOne?: boolean,
    line?:boolean
}
const AddInput = ({title, onChangeEvent, line, children, icType, onlyOne}: IProps) => {
  useEffect(()=>{
   
  },[])
  const InputBox = Styled.a`
  border: solid 0.5px #d3d3d3;
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 6px;
  align-items: center;
  display: flex;
  width: 100%;
  margin-top: 4px;
  text-align: center;
  justify-content: center;
  background-color: #f4f6fa;

`

  return ( 
        <InputContainer title={title} line={line}>
            <InnerBox>
                <div style={{width:'100%'}}>
                {children}
                </div>
                {
                    onlyOne !== undefined && onlyOne ?
                    null
                    :
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
                }
                
            </InnerBox>
           
        </InputContainer >
  );
}

const InnerBox = Styled.div`
    width: calc(100% - 190px);
`


export default AddInput;