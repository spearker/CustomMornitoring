import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import InputContainer from '../../Containers/InputContainer';
import IMG_PROFILE from '../../Assets/Images/img_profile.png';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    thisId: string,
    photo: string,
    name: string,
    onChangeEvent: any
    }

const ProfileInput = ({title, name, thisId, photo, onChangeEvent}: IProps) => {

  useEffect(()=>{

  },[])

  return (
        <InputContainer title={title}>
            <div style={{textAlign:'center'}}>
             <ImageBox src={photo === '' || photo === null ? IMG_PROFILE : photo} />
            { onChangeEvent !== null ?
            <InputWrapBox>
                <label htmlFor={thisId}  style={{border: 0, backgroundColor:POINT_COLOR, padding: '5px 12px 5px 12px', width:84, cursor:'pointer'}}>변경</label>
                <input type="file" name={name} id={thisId} style={{display:'none'}} onChange={onChangeEvent}/>
            </InputWrapBox>
            :
            null
            }
            </div>
        </InputContainer>
  );
}

const ImageBox = Styled.img`
  border-radius: 40px;
  width: 84px;
  height: 84px;
  object-fit: cover;
`


const InputWrapBox = Styled.div`
    font-size: 13px;
    margin-bottom: 19px;
    margin-top: 10px;
`



export default ProfileInput;
