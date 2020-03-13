import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import moment from 'moment';
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest, getParameter, postRequest } from '../../Common/requestFunctions';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import InputContainer from '../../Containers/InputContainer';
import PlaneInput from '../../Components/Input/PlaneInput';
import AddInput from '../../Components/Input/AddInput';
import TextList from '../../Components/List/TextList';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchInput from '../../Components/Input/SearchInput';
import AddList from '../../Components/List/AddList';
import SearchedList from '../../Components/List/SearchedList';
import NormalInput from '../../Components/Input/NormalInput';
import DateRangeInput from '../../Components/Input/DateRangeInput';
import MemberInput from '../../Components/Input/MemberInput';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import { useUser } from '../../Context/UserContext';
import 'react-dropdown/style.css'
import { ROUTER_MANAGE } from '../../Common/routerset';
import StatusTable from '../../Components/Table/StatusTable';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import TaskTable from '../../Components/Table/TaskTable';
import CommentsContainer from '../../Containers/CommentsContainer';
import CommentList from '../../Components/List/CommentList';

// 작업 지시서 내역
const TaskList = () => {

  const User = useUser();

  const [option, setOption] = useState(0);
 const [isOpen, setIsOpen] = useState<boolean>(false);
 const [list, setList] = useState<ITask[]>([]);
 const [task, setTask]= useState<any>('');
 const [reply, setReply]= useState<string>('');
 const [replyList, setReplyList]= useState<IReply[]>(dataSet.commentList);

 const tabList = [
   "기계", "라인"
 ]
 const [tab, setTab] = useState<string>(tabList[0]);

 const optionList = [
  "등록순", "이름순", "시작시간 순", "마감시간 순", 
]
const indexList = {
  status: '상태',
  title:'이름',
  registered: '등록일',
  machines: '장비명',
  products: '생산품',
  amount: '목표생산량',
  worker: '등록자',
  comments: '댓글'
 }

  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback((filter:number)=>{
    setOption(filter)
    alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
    return;
    const results = getRequest(BASE_URL + '',getToken(TOKEN_NAME))

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
  },[option])

  useEffect(()=>{

  
    setList(dataSet.taskList)
  },[])

 
 /**
   * onClickTaskStatus()
   * 작업 내역의 상태 변경 
   * @param {string} pk 작업지시서 pk
   * @param {string} value 상태값
   * @returns X
   */
  const onClickTaskStatus = useCallback((pk: string, value:string)=>{
    alert(`선택 테스트 : 작업지시서 pk: ${pk} - status : ${value}` )
    return;
    const data = {
      pk: pk,
      status: value
    }
    const results = postRequest(BASE_URL + '', data,getToken(TOKEN_NAME))

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

 
  useEffect(()=>{

  
    setList(dataSet.taskList)
  },[])

 
 /**
   * onClickDeleteComment()
   * 댓글 삭제
   * @param {string} pk 댓글 pk
   * @returns X
   */
  const onClickDeleteComment = useCallback((pk: string)=>{
    alert(`삭제 테스트 : 댓글 pk: ${pk} ` )
    return;
    const data = {
      pk: pk,

    }
    const results = postRequest(BASE_URL + '', data,getToken(TOKEN_NAME))

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
  const onClickOpenTask = useCallback((pk: string)=>{
    alert(`삭제 테스트 : 댓글 pk: ${pk} ` )
    return;
    const data = {
      pk: pk,

    }
    const results = postRequest(BASE_URL + '', data,getToken(TOKEN_NAME))

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

  
  
  

  return (
      <DashboardWrapContainer>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'작업지시서 내역'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <SmallButtonLink name="+ 작업지시서 등록" link="/task/register"/>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
            </div>
          </div>
          {
            isOpen && task !== "" && task !== null ?
            <div>

            </div>
            :
            <div style={{}}>
                <CommentsContainer pk={"wdwdwd"}>
                    {replyList.map((v, i)=>{
                        return(
                          <CommentList contents={v} onClickEvent={onClickDeleteComment}/>
                        )
                    })}
                </CommentsContainer>
            </div>
          }
         {/* 작업내역  */}
         <div style={{marginTop:5}}>
              <TaskTable indexList={indexList} keyName={'pk'} buttonName='수정하기' contents={list} onClickEvent={onClickTaskStatus}/>
          </div>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}



export default TaskList;