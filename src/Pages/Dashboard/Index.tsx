import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import SubHeader from '../../Components/Text/SubHeader';
import moment from 'moment';
import 'moment/locale/ko';
import { render } from '@testing-library/react';
import DayCard from '../../Components/Card/DayCard';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import IC_NEXT from '../../Assets/Images/ic_next_page.png';
import IC_BEFORE from '../../Assets/Images/ic_before_page.png';
import IC_REFRESH from '../../Assets/Images/ic_refresh.png';
import IC_ADD from '../../Assets/Images/ic_add.png';
import { dataSet } from '../../Common/dataset';
import StatusCard from '../../Components/Card/StatusCard';
import DotPagenation from '../../Components/Pagenation/DotPagenation';
import { getRequest, postRequest } from '../../Common/requestFunctions';
import { getToken } from '../../Common/tokenFunctions';
import TaskTable from '../../Components/Table/TaskTable';
import ColorButtonLink from '../../Components/Button/ColorButtonLink';
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';

interface IWeekInfo{
  date: string,
  issue: number,
}
interface ITodayInfo{
  issue: number,
  waring: number,
  after: number
}
// 대시보드 메인 페이지
const Dashboard = () => {

  const [today, setToday] = useState<string>(moment().format('YYYY-MM-DD'))
  const [targetDate, setTargetDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [list, setList] = useState<IWeekInfo[]>([])
  const [filter, setFilter] = useState<number>(0)
  const [status, setStatus] = useState<IStatus[]>([])
  const [stock, setStock] = useState<number>(16)
  const [info, setInfo] = useState<ITodayInfo>({issue: 0,after: 0,waring:0})
  const [dim, setDim]= useState<boolean>(true)
  const [page, setPage]=useState<number>(1)
  const [taskList, setTaskList]= useState<ITask[]>([])
  const [option, setOption] = useState<number>(0)

  const optionList = [
    "등록순", "기계이름 순", "기계종류 순", "기계번호 순", "제조사 순", "제조사 번호 순", "제조사 상세정보 순"
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

  /**
   * getSunday()
   * 그 주의 일요일(타겟 날짜)를 얻는 함수
   * @returns targetDate ('YYYY-MM-DD')
   */
  const getSunday = useCallback(()=>{
    for(var i = 0; i < 7 ; ++i){
      if(moment().add( 0 - i  ,"days").locale('en').format('dddd') === 'Sunday'){
        const targetDate = moment().add( 0 - i  ,"days").format('YYYY-MM-DD');
        return targetDate
      }
    }
  },[])

  /**
   * onClickChangeDay()
   * 날짜 카드를 선택하고 그 날의 일정을 얻기
   * @returns X
   */
  const onClickChangeDay = useCallback((day)=>{
    console.log(day)
    setTargetDate(day);
  },[targetDate])

  useEffect(()=>{
    
    setList(
      [
        { date: '2020-03-29' ,  issue: 0 },
        { date: '2020-03-30' ,  issue: 2 },
        { date: '2020-03-31' ,  issue: 1 },
        { date: '2020-04-01' ,  issue: 5 },
        { date: '2020-04-02' ,  issue: 1 },
        { date: '2020-04-03' ,  issue: 1 },
        { date: '2020-04-04' ,  issue: 0 },
      ]
    )

    setInfo({
      issue: 3,
      after: 2,
      waring:0
    })

    //setStatus(dataSet.statusList)
    getStatus(1);
    onClickFilter(0)
    //setTaskList(dataSet.taskList)
  },[])

  /**
   * getStatus()
   * 장비 현황 조회
   * @param {string} url 요청 주소
   * @param {string} pageIndex 페이지 인덱스 
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getStatus = useCallback(async (index: number)=>{
    const results = await getRequest('http://211.208.115.66:8087/api/v1/dashboard/machine/' + index, getToken(TOKEN_NAME))

    if(results === false){
      alert('8087포트 : 서버에서 데이터를 불러 올 수없습니다.')
    }else{
      if(results.status === 200){
          setStock(results.results.stock)
          setStatus(results.results.item_list)
      }else{
        alert('8087포트 : 서버에서 데이터를 불러 올 수없습니다.')
      }
    }
  },[page])

  /**
   * getTasks()
   * 작업지시서 현황 조회
   * @param {string} url 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getTasks = useCallback(async (index: number)=>{
    const results = await getRequest('http://211.208.115.66:8088/api/v1/task/list/' + filter, getToken(TOKEN_NAME))

    if(results === false){
      alert('8087포트 : 서버에서 데이터를 불러 올 수없습니다.')
    }else{
      if(results.status === 200){
          setStock(results.results.stock)
          setStatus(results.results.item_list)
      }else{
        alert('8087포트 : 서버에서 데이터를 불러 올 수없습니다.')
      }
    }
  },[page])

  /**
   * onClickChangePage()
   * 장비 현황 조회 페이지 변경
   * @param {string} index 페이지 번호
   * @returns X
   */
  const onClickChangePage = useCallback((index: number)=>{
   //alert(page + ' -> ' + index)
    console.log(index)
      if(stock < 7){
        //alert('미만')
        return
      }
      if(index < 1 || index > Math.ceil(stock/6)){
        //alert('뭐야')
        return
      }
      setPage(index)
      console.log(index)
      getStatus(index)
      //getStatus(index)
  },[page, stock])

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
    const results = await postRequest('http://211.208.115.66:8088/api/v1/task/status', data,getToken(TOKEN_NAME))

    if(results === false){
      alert('요청을 처리 할 수 없습니다 잠시후 다시 시도해주세요.')
    }else{
      if(results.status === 200){
        alert('성공적으로 변경되었습니다.')
        onClickFilter(0)
      }else{
        alert('요청을 처리 할 수 없습니다 잠시후 다시 시도해주세요.')
      }
    }
  },[])

  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async (filter:number)=>{
    setOption(filter)
    //alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
    //return;
    const results = await getRequest('http://211.208.115.66:8088/api/v1/task/list/' + filter, getToken(TOKEN_NAME))

    if(results === false){
      alert('서버에서 데이터를 불러 올 수없습니다.')
    }else{
      if(results.status === 200){
          setTaskList(results.results)
          
      }else{
        alert('서버에서 데이터를 불러 올 수없습니다.')
      }
    }
  },[option])
  return (
      <DashboardWrapContainer>
        <InnerBodyContainer>
            <p></p>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}


export default Dashboard;