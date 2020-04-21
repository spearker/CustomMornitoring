import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';
import IC_DOC from '../../Assets/Images/ic_file_doc.png'
import IC_IMAGE from '../../Assets/Images/ic_file_img.png'
//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    urlList: string[],
    isImage?: boolean,
    nameList?: string[],
}
const OldFileInput = ({title, urlList, nameList, isImage}: IProps) => {
  useEffect(()=>{
   
  },[])

  return ( 
      
        <InputContainer title={title}>
            { 
            urlList.map((f,i)=>{

                return(
                <a key={'file-'+ i} href={f} target="_blank" style={{textAlign:'center', display:'inline-block', marginRight:11}}>
                    {
                        f !== "" && f !== null ?
                        <>
                        <img src={isImage !==undefined && isImage === true ?  f : IC_DOC} style={{width:140, height:140, objectFit: 'cover'}}/>
                        
                        {nameList !== undefined ?
                        <p className="p-limit p-bold" style={{fontSize:13, textAlign:'center'}}>{nameList[i]}</p>
                        :
                        null}
                        </>
                    
                    :
                    null
                    }
                    
                  
                </a>
                )
            })
            }
        </InputContainer> 
  );
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: calc(100% - 200px);
    background-color: #f4f6fa;
`


export default OldFileInput;