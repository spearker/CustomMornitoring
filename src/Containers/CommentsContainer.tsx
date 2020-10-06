import React, {useCallback, useEffect, useRef, useState} from 'react';
import Styled from 'styled-components'
import {POINT_COLOR, TOKEN_NAME} from '../Common/configset'
import IC_UP from '../Assets/Images/ic_reply_up.png'
import IC_DOWN from '../Assets/Images/ic_reply_down.png'
import {getRequest, postRequest} from '../Common/requestFunctions';
import CommentList from '../Components/List/CommentList';
import {getToken} from '../Common/tokenFunctions';
import {uploadTempFile} from '../Common/fileFuctuons';

interface Props{
    children?: any,
    pk: string,
}
const CommentsContainer = ({children, pk}: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [file, setFile]= useState<any>(null)
    const [replyList, setReplyList]= useState<IReply[]>([]);
    const [path, setPath]= useState<string | null>(null)
    const textBoxRef = useRef(null);
    const [isCreated, setIsCreated] = useState<boolean>(false)
    useEffect(()=>{

    },[])
/**
   * addFile()
   * 파일 등록
   * @param {object(file)} event.target.files[0] 파일
   * @returns X
   */
  const addFile = useCallback(async (event: any): Promise<void> => {
    console.log(event.target.files[0]);

    if(event.target.files[0] === undefined){
      setFile(null)

      return;
    }
    if(event.target.files[0].size < 10485760){ //파일 크기 10MB 이하
        setFile(event.target.files[0]);
        const temp = await uploadTempFile(event.target.files[0]);
        if(temp ===false){
          console.log(temp)

          setFile(null)

          return
        }else{
          console.log(temp)
          setPath(temp)

        }

      }else{
        ////alert('10MB 이하의 파일만 업로드 가능합니다.')
        setFile(null)
        return;
      }

  },[file, path])

     /**
   * onClickOpenComment()
   * 댓글 열기
   * @param {string} pk 작업지시서 pk
   * @returns X
   */
  const onClickOpenComment = useCallback(async(pk: string)=>{
    if(pk === undefined || pk === ""){
      return;
    }

    const results = await getRequest('http://293.234.183.22:8299/api/v1/task/comment/list?pk=' + pk, getToken(TOKEN_NAME))

    if(results === false){
        //alert('데이터를 불러올 수 없습니다.')
    }else{
      if(results.status === 200){
        setReplyList(results.results)
        //setProcess(results.results.process)
        //setReplyList(results.results.replyList)
      }else{
        //TODO : 지울것
        //alert('데이터를 불러올 수 없습니다.')
      }
    }

  },[]);

  /**
   * onClickDeleteComment()
   * 댓글 삭제
   * @param {string} pk 댓글 pk
   * @returns X
   */
  const onClickDeleteComment = useCallback(async(id: string)=>{


    ////alert(`삭제 테스트 : 댓글 pk: ${pk} ` )
    //return;
    const data = {
      pk: pk,
      comment_pk: id,

    }
    const res = await postRequest('http://293.234.183.22:8299/api/v1/task/comment/blind', data, getToken(TOKEN_NAME))

    if(res === false){
        ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }else{
        if(res.status === 200){
           //alert('성공적으로 블라인드 처리 되었습니다')
           onClickOpenComment(pk)
        }else{
          ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
        }
      }

  },[pk])


  /**
   * addComment()
   * 파일 등록
   * @param {string} pk 작업지시서, 게시글 pk
   * @returns X
   */
  const addComment = useCallback(async(e, pk: string)=>{

    e.preventDefault();

      const data = {
        pk: pk,
        comment: text,
        file: path
      }

      const res = await postRequest('http://293.234.183.22:8299/api/v1/task/comment/put', data, getToken(TOKEN_NAME))
      setIsCreated(true)
      if(res === false){
        setIsCreated(false)
        ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }else{
        if(res.status === 200){
           //alert('성공적으로 등록 되었습니다')
           setText('');
           onClickOpenComment(pk)
           setIsCreated(false)
           setFile(null);
           setPath(null)
           //setIsCreated(false)
           //textBoxRef.current !== null ? textBoxRef.current!.text(null) :  setText('');

        }else{
          setIsCreated(false)
          ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
        }
      }

  },[text, file, pk, path,textBoxRef, isCreated])

  return (

    <WhiteWrapDiv>
        <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:14, marginTop:20}}/>
        <p className="p-bold" style={{fontSize: 14, marginBottom:8, display:'inline-block', marginRight:12}}>· 댓글</p>
        <img src={isOpen ? IC_UP : IC_DOWN} style={{float:'right', width:19}} onClick={()=>{setIsOpen(!isOpen); onClickOpenComment(pk)}} />

        {
            isOpen ?
            <div style={{marginTop:12}}>
                <div style={{width: '100%', textAlign:'left', color:'#252525', marginBottom:14}}>
                    {replyList.map((v, i)=>{
                                return(
                                  <CommentList contents={v} onClickEvent={onClickDeleteComment}/>
                                )
                    })}
                </div>
                <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:14, marginTop:14}}/>
                <div style={{ width:'100%'}}>
                    {
                      isCreated ?
                      <div style={{border:0, fontSize:14, padding:12, height:'70px', width:'calc(100% - 24px)'}} >
                      </div>

                      :
                      <textarea maxLength={160} ref={textBoxRef} onChange={(e)=>setText(e.target.value)} style={{border:0, fontSize:14, padding:12, height:'70px', width:'calc(100% - 24px)'}} placeholder="내용을 입력해주세요 (80자 미만)">
                      {text}
                      </textarea>
                    }

                    <div style={{textAlign:'right', marginTop:12, marginBottom:12}}>
                        <span style={{marginRight:10, fontSize:14}}>{file !== null ?file.name : ''}</span>
                        <LabelBox htmlFor={'file'}  style={{cursor:'pointer'}}>파일 선택</LabelBox>
                        <ButtonBox onClick={(e)=>{addComment(e, pk)}}>댓글등록</ButtonBox>
                    </div>
                </div>
            <input type="file" name="file" id={'file'} style={{display:'none'}} onChange={addFile}/>
        </div>
        :
        null}
    </WhiteWrapDiv>


  );
}

const WhiteWrapDiv = Styled.div`
    margin-top: 11px;
    text-align: left;
    width: 100%;
    margin-bottom: 24px;
    color: black;
`
const LabelBox = Styled.label`
    display: inline-block;
    padding: 8px 13px 8px 13px;
    color: black;
    margin-left: 12px;
    border-radius: 5px;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 14px;
    font-weight: bold;
`
const ButtonBox = Styled.button`
    display: inline-block;
    padding: 8px 36px 8px 36px;
    color: black;
    margin-left: 12px;
    border-radius: 5px;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 14px;
    font-weight: bold;
`
export default CommentsContainer;
