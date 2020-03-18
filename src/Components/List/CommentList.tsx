import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import IcButton from '../Button/IcButton';
import icPlus from '../../Assets/Images/ic_plus.png'
import icDelete from '../../Assets/Images/ic_minus.png'
import IconSquareButton from '../Button/IconSquareButton';
import IMG_PROFILE from '../../Assets/Images/img_profile.png';
import TinyButton from '../Button/TinyButton';

interface Props{
  contents: IReply
  onClickEvent: any,
}


// 댓글 리스트
const CommentList = ({ contents, onClickEvent }: Props) => {
  
  
  useEffect(()=>{
   
  },[])

  return (
    
      <ListWrapDiv>
        <div style={{width: '15%', fontSize: 14, display:'flex'}}>
          <ImageBox src={contents.profile == "" ? IMG_PROFILE : contents.profile} />
          <p className="p-limit" style={{display:'inline-block'}}>{contents.name}</p>
        </div>
        <div style={{width: '75%', fontSize: 14}}>
          <p>{contents.detail}</p>
          <a className="p-bold" style={{fontSize:12, textDecoration:'underline', paddingTop:6, color:'#888888'}} href={contents.file_url} target="_blank">{contents.file_url !== "" ? '[첨부파일 다운로드]' : null}</a>
        </div>
        <div onClick={()=>onClickEvent(contents.pk)} style={{width:32, position:'absolute', top:0, right:12}}>
            <a onClick={()=>onClickEvent(contents.pk)} style={{fontSize:13, color:'gray'}}>삭제</a>
        </div> 
      </ListWrapDiv> 

  );
}
const ImageBox = Styled.img`
  border-radius: 10px;
  width: 21px;
  height: 21px;
  object-fit: cover;
  margin-left: 13px;
  margin-right: 9px;
  display: inline-block;
`


const ListWrapDiv = Styled.div`
  font-size: 14x;
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 14px;
`



export default CommentList;