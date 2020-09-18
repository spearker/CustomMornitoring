import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {useUser} from '../../Context/UserContext';
import IMG_PROFILE from '../../Assets/Images/img_profile.png';

interface Props{
  contents: IReply
  onClickEvent: any,
}


// 댓글 리스트
const CommentList = ({ contents, onClickEvent }: Props) => {
  const me = useUser()

  useEffect(()=>{

  },[])

  return (

      <ListWrapDiv>
        <div style={{width: '15%', minWidth:25, fontSize: 14, display:'flex'}}>
          <ImageBox src={contents.photo == "" ? IMG_PROFILE : contents.photo} />
          <p className="p-limit" style={{display:'inline-block'}}>{contents.name}</p>
        </div>
        <div style={{width: '75%', fontSize: 14}}>
          <p>{contents.detail === 'blind' ? '(작성자가 삭제하여 블라인드 처리된 댓글입니다)':contents.detail}</p>
          <a className="p-bold" style={{fontSize:12, textDecoration:'underline', paddingTop:6, color:'#888888'}} href={contents.file_url} target="_blank">{contents.file_url !== "" ? '[첨부파일 다운로드]' : null}</a>
        </div>
        <div style={{display:'inline-block', position:'absolute', top:0, right:12}}>
            {
              contents.writer_pk === me.pk ?
            <a onClick={()=>onClickEvent(contents.pk)} style={{fontSize:13, color:'gray'}}>숨기기</a>
            :
            null}
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
  min-width: 21px;
  margin-right: 9px;
`


const ListWrapDiv = Styled.div`
  font-size: 14x;
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 14px;
`



export default CommentList;
