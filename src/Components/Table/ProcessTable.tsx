import React, { useEffect, useCallback, useState } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, BASE_URL, TOKEN_NAME} from '../../Common/configset'
import IC_REPLY from '../../Assets/Images/ic_reply_w.png'
import IC_CLOSE from '../../Assets/Images/ic_task_close.png'
import IC_DOC from '../../Assets/Images/ic_file_doc.png'
import IC_IMAGE from '../../Assets/Images/ic_file_img.png'
import BTN_UP from '../../Assets/Images/btn_up_rank.png';
import BTN_DOWN from '../../Assets/Images/btn_down_rank.png';
import BTN_DELETE from '../../Assets/Images/btn_delete_rank_g.png';
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';

import IMG_PROFILE from '../../Assets/Images/img_profile.png'
import StatusDropdown from '../Dropdown/StatusDropdown';
import { postRequest } from '../../Common/requestFunctions';
import CommentsContainer from '../../Containers/CommentsContainer';
import CommentList from '../List/CommentList';
import { dataSet } from '../../Common/dataset';
import { getToken } from '../../Common/tokenFunctions';
import TinyButtonLink from '../Button/TinyButtonLink';
import ReadOnlyInput from '../Input/ReadOnlyInput';
import ReadOnlyInputTask from '../Input/ReadOnlyInputTask';
import SmallButtonG from '../Button/SmallButtonG';

interface IProps{
    indexList: string[],
    contents: IProcess[],
    onClickModify?: any,
    onClickSelect?: any,
    onClickSearch?: any,
    widthList: string[],
    select?: number,
    pk: string,
}



const ProcessTable = ({indexList, contents,pk, select,widthList, onClickModify, onClickSelect, onClickSearch}: IProps) => {

  const [openTarget, setOpenTarget] = useState<string>('');
  const [task, setTask]= useState<any>('');
  const [replyList, setReplyList]= useState<IReply[]>([]);
  
  const changeStatusToString = useCallback((status: string | undefined)=>{
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
    }else if(status === 'off'){
        return '꺼짐'
    } else if(status === 'error'){
        return '에러'
    }else if(status ==='reservation'){
        return '예약'
    }else{
        return '대기'
    }

},[])

const changeStatusToColor = useCallback((status: string| undefined)=>{
    if(status === 'active'){
        return '#25b4b4'
    }else if(status === 'done'){
        return '#2760ff'
    }else if(status === 'stop'){
        return '#fd6b00'
    }else if(status === 'error'){
        return '#ff461a'
    }else if(status === 'share'){
        return '#683be5'
    }else if(status === 'ready'){
        return '#717c90'
    }else if(status === 'reservation'){
        return '#f8a506'
    }else{
        return '#717c90'
    }

},[])

/**
   * onClickDeleteComment()
   * 댓글 삭제
   * @param {string} pk 댓글 pk
   * @returns X
   */
  const onClickDeleteComment = useCallback(async(pk: string)=>{


    alert(`삭제 테스트 : 댓글 pk: ${pk} ` )
    return;
    const data = {
      pk: pk,

    }
    const results = await postRequest(BASE_URL + '', data, getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
       
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[])


  

  /**
   * onClickOpenTask()
   * 작업지시서 열기
   * @param {string} pk 작업지시서 pk
   * @returns X
   */
  const onClickOpenTask = useCallback(async(pk: string)=>{
    setOpenTarget(pk)
    console.log(`오픈 테스트 : 댓글 pk: ${pk} ` )
    return;
    const data = {
      pk: pk,

    }
    const results = await postRequest(BASE_URL + '', data,getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
       
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[]);

  useEffect(()=>{
   console.log(Object.keys(indexList))
  },[])

  return (
    <div style={{width:'100%',  backgroundColor:'#e7e9eb', borderRadius:5, paddingBottom:12}}>
      {
        onClickModify == undefined && select !== undefined ?
        <div style={{padding:24, paddingBottom:0, marginTop:18}}>
          <span className="p-bold" style={{fontSize:24}}>{'추천 ' + (Number(pk) + 1)  }</span>
          <div style={{float:'right'}}>
            {
                select !== undefined && String(select) === pk ?
                <SmallButton name={'+ 선택하기'} onClickEvent={()=>{onClickSelect(Number(pk))}}/>
                :
                <SmallButton name={'+ 선택하기'} color={'#d3d3d3'} onClickEvent={()=>{onClickSelect(Number(pk))}}/>
            }
           
          </div>        
        </div>
        :
        <div style={{padding:24, paddingBottom:0, marginTop:18}}>
          <span style={{color:'#ff461a', fontSize:14}}>* 버튼을 눌러서 공정 추가 및 순서 변경이 가능합니다.</span>
          <div style={{float:'right'}}>
              {onClickSearch !== undefined ?
                <SmallButton name={'+ 추가하기'} onClickEvent={onClickSearch} color={'#d3d3d3'}  />
                :
                null
                }
               
             
          </div>        
        </div>
      }
    <TableWrap>
      <table>
        <tbody>
          <tr>     
            {
              indexList.map((v,i)=>{
                return(
                  <th className="p-limit" style={{width:widthList[i]}}>
                    {v === "" ? " " : `· ${v}`}
                  </th>
                )
              })
            }
          </tr>

          {/*
          
          
          */}
          {/* 테이블 바디 */}
          {
            contents.map((v:IProcess, i)=>{
              return(
              <tr key={i} >
                {
                  onClickModify == undefined ?
                  <td style={{width:widthList[0]}}></td>
                  :
                  <td style={{width:widthList[0]}}>
                        <a onClick={()=>onClickModify('UP', i)}><img style={{height:28, margin:'6px 3px 3px 0px'}} src={BTN_UP} /></a>
                        <a onClick={()=>onClickModify('DOWN', i)}><img src={BTN_DOWN} style={{width:28, margin:'6px 3px 3px 3px'}}/></a>
                        <a onClick={()=>onClickModify('DELETE', i)}><img src={BTN_DELETE} style={{width:28, margin:'6px 3px 3px 3px'}}/></a>
                  </td>
                }
                <td className="p-limit" style={{width:widthList[1]}}>
                    {v.name}
                </td>
                <td className="p-limit" style={{width:widthList[2]}}>
                    <span style={{padding:'11px 18px 11px 18px',backgroundColor:changeStatusToColor(v.machine.status), color:'white', borderRadius:6, marginRight:9, minWidth:'100px', width:100}}>{changeStatusToString(v.machine.status)}</span>
                  {v.machine.machine_name} 
                </td>
                <td className="p-limit" style={{width:widthList[3]}}>
                    | {v.mold_name} 
                </td>
                <td className="p-limit" style={{width:widthList[4]}}>
                    | {v.output.material_name}
                    <span className="p-eng-r" style={{float:'right'}}>{v.output.stock} 개</span>
                </td>
            
              </tr>
              )
            })
          }
          
        </tbody>
      </table>
    </TableWrap>
    </div>
      
  );
}

const TableWrap = Styled.div`
    margin: 24px;
    display: flex;
    table {
      max-width: 100%,
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      color: #252525;
      font-size: 14px;
      table-layout: fixed;

      border-collapse:separate; 
      border-spacing: 0 7px;


    }
    tbody{
      max-width: 100%;
    }
    tr{
      box-sizing: border-box;
      border: 0;
      border-radius: 5px;
      vertical-align: middle;
      border: 1px;
      border-collapse: separate;
      border-spacing: 0 15px;
      margin-bottom: 12px;
    }
    td{
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap
      vertical-align: middle;
      text-align: left;
      background-color: #f4f6fa;
    }
    th {
      overflow: visible;
      vertical-align: middle;
      text-align: left;
      
    }
    td:nth-child(2) {
      
      border-top-right-radius: 6px; border-bottom-right-radius: 6px;
      margin-right: 6px;
    }
    td:nth-child(3) {
      border-left: 8px solid #e7e9eb;
    }
    td:first-child {
      padding-left: 8px;
    }
    td:last-child {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    td:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
    td:last-child  { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
    td:last-child {
      padding-right:20px;
    }

    
`


export default ProcessTable;