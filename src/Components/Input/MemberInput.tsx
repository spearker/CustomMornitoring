import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';
import IMG_PROFILE from '../../Assets/Images/img_profile.png';

interface IProps{
    title: string,
    contents: {
        pk: string,
        name: string,
        image: string,
    }[],
    isMultiRegistered: boolean,
    onChangeEvent?: any,
    onRemoveEvent?: any,
    target?:{
        pk: string,
        name: string,
        image: string,
    },
    type?: string
}
const MemberInput = ({title, isMultiRegistered, contents, target, onChangeEvent, type, onRemoveEvent}: IProps) => {
  useEffect(()=>{
   
  },[])

  return ( 
        <InputContainer title={title}>
            <div style={{display:'inline-block', textAlign:'center'}}>
                {
                isMultiRegistered ? 
                contents.map((v, i)=>{
                    return(
                        <>
                        <ImageBox src={v.image === '' || v.image === null ? IMG_PROFILE : v.image} />
                        <button onClick={onRemoveEvent}></button>
                        </>
                    )
                })
                :
                    target !== undefined ? 
                    <ImageBox src={target.image === '' || target.image === null ? IMG_PROFILE : target.image} />
                    :
                    null
                }
            </div>
            {
                onChangeEvent !== undefined ? 
                <InputWrapBox> 
                    <label htmlFor={title}  style={{border: 0, backgroundColor:POINT_COLOR, padding: '5px 12px 5px 12px', width:84, cursor:'pointer'}}>{isMultiRegistered ? '등록' : '변경'}</label>
                    <input type="file" name={name} id={title} style={{display:'none'}} onChange={onChangeEvent}/>
                </InputWrapBox>
                :
                null
            }
        </InputContainer> 
  );
}
const InputWrapBox = Styled.div`
    font-size: 13px;
    margin-bottom: 19px;
    margin-top: 10px;
`
const InputBox = Styled.div`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: calc(100% - 200px);
    background-color: #f4f6fa;
`
const ImageBox = Styled.img`
  border-radius: 40px;
  width: 84px;
  height: 84px;
  object-fit: cover;
`

export default MemberInput;