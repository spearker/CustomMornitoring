import React, { useEffect , useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import DashboardNavigation from '../Components/Navigation/DashboardNavigation'
import Footer from '../Components/Footer/WelcomeFooter';
import ProfileBar from '../Components/Navigation/ProfileBar';
import TinyButton from '../Components/Button/TinyButton';
import SmallButton from '../Components/Button/SmallButton';
import IC_UP from '../Assets/Images/ic_reply_up.png'
import IC_DOWN from '../Assets/Images/ic_reply_down.png'

interface Props{
    children?: any,
    pk: string,
}
const CommentsContainer = ({children, pk}: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [file, setFile]= useState<any>(null)
    useEffect(()=>{
    
    },[])
/**
   * addFile()
   * 파일 등록
   * @param {object(file)} event.target.files[0] 파일
   * @returns X 
   */
  const addFile = (event: any): void => {
    console.log(event.target.files[0]);

    if(event.target.files[0] === undefined){
      setFile(null)

      return;
    }
    if(event.target.files[0].size < 10485760){ //파일 크기 10MB 이하
        setFile(event.target.files[0]);
      }else{
        alert('10MB 이하의 파일만 업로드 가능합니다.')
        setFile(null)
        return;
      }
    
  }

  /**
   * addComment()
   * 파일 등록
   * @param {string} pk 작업지시서, 게시글 pk
   * @returns X 
   */
  const addComment = (id: string): void => {
    
    
  }

  return (
 
    <WhiteWrapDiv>
        <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:14, marginTop:20}}/>
        <p className="p-bold" style={{fontSize: 14, marginBottom:8, display:'inline-block', marginRight:12}}>· 댓글</p>
        <img src={isOpen ? IC_UP : IC_DOWN} style={{float:'right', width:19}} onClick={()=>setIsOpen(!isOpen)} />
    
        {
            isOpen ?
            <div style={{marginTop:12}}>
                <div style={{width: '100%', textAlign:'left', color:'#252525', marginBottom:14}}>
                    {children}
                </div>
                <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:14, marginTop:14}}/>
                <div style={{ width:'100%'}}>
                    <textarea maxLength={160} onChange={(e)=>setText(e.target.value)} style={{border:0, fontSize:14, padding:12, height:'70px', width:'calc(100% - 24px)'}} placeholder="내용을 입력해주세요 (80자 미만)">
                        {text}
                    </textarea>
                    <div style={{textAlign:'right', marginTop:12, marginBottom:12}}>
                        <span style={{marginRight:10, fontSize:14}}>{file !== null ?file.name : ''}</span>
                        <LabelBox htmlFor={'file'}  style={{cursor:'pointer'}}>파일 선택</LabelBox>   
                        <ButtonBox onClick={()=>{}}>댓글등록</ButtonBox>
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