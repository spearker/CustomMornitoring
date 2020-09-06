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
import { ROUTER_MENU_LIST } from '../../Common/routerset';
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

import StatusTable from '../../Components/Table/StatusTable';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import TaskTable from '../../Components/Table/TaskTable';
import CommentsContainer from '../../Containers/CommentsContainer';
import CommentList from '../../Components/List/CommentList';
import SearchInputSmall from '../../Components/Input/SearchInputSmall';

// 작업 지시서 내역
const TaskList = () => {

  const User = useUser();
  const [keyword, setKeyword] = useState<string>('');
  const [option, setOption] = useState(0);
 const [openTarget, setOpenTarget] = useState<string>('');
 const [list, setList] = useState<ITask[]>([]);
 const [task, setTask]= useState<any>('');
 const [reply, setReply]= useState<string>('');
 const [replyList, setReplyList]= useState<IReply[]>([]);

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
  output_name: '생산품',
  amount: '목표생산량',
  process: '공정',
  worker: '등록자',
  comments: '댓글'
 }
 useEffect(()=>{

  getData()
  //setList(dataSet.taskList)
  },[])



  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async(filter:number)=>{
    setOption(filter)
   // alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
    return;
    const results = await getRequest(BASE_URL + '',getToken(TOKEN_NAME))

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


 /**
   * onClickTaskStatus()
   * 작업 내역의 상태 변경
   * @param {string} pk 작업지시서 pk
   * @param {string} value 상태값
   * @returns X
   */
  const onClickTaskStatus = useCallback(async(pk: string, value:string)=>{
    //alert(`선택 테스트 : 작업지시서 pk: ${pk} - status : ${value}` )
    //return;
    const data = {
      pk: pk,
      status: value
    }
    const results = await postRequest('http://192.168.0.14:8088/api/v1/task/status', data,getToken(TOKEN_NAME))

    if(results === false){
      alert('요청을 처리 할 수 없습니다 잠시후 다시 시도해주세요.')
    }else{
      if(results.status === 200){
        alert('성공적으로 변경되었습니다.')
        getData();


      }else{
        alert('요청을 처리 할 수 없습니다 잠시후 다시 시도해주세요.')
      }
    }
  },[])


 /**
   * getSearchList()
   * 목록 검색
   * @param {string} url
   * @returns X
   */
  const getSearchList = useCallback(async (e)=>{
    e.preventDefault();
    const res = await getRequest('http://192.168.0.14:8088/api/v1/task/list/0', getToken(TOKEN_NAME))

    if(res === false){
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(res.status === 200){
        setList(res.results)
        setKeyword('')
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list, option, keyword, ])

  /**
   * getData()
   * 기계 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @returns X
   */
  const getData = useCallback(async()=>{

    const res = await getRequest('http://192.168.0.14:8088/api/v1/task/list/0', getToken(TOKEN_NAME))



    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const data = res.results;
         setList(data)

      }else{
        //TODO:  기타 오류
      }
    }
  },[list , keyword, option])




  return (
    <DashboardWrapContainer index={7}>
    <SubNavigation list={ROUTER_MENU_LIST[7]}/>
    <InnerBodyContainer>
    <div style={{position:'relative', width:'100%'}}>
        <Header title={`작업지시서 관리 (${list.length})`}/>
        <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
          <SmallButtonLink name="+ 등록하기" link="/task/register"/>
          <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
        </div>
      </div>


         {/* 작업내역  */}
         <div style={{marginTop:5}}>

              <TaskTable indexList={indexList} keyName={'pk'} buttonName='수정하기' contents={list} onClickEvent={onClickTaskStatus}/>
          </div>
        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}



export default TaskList;
