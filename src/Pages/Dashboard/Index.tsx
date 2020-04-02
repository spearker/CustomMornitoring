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
    console.log(index)
      if(stock < 7){
        return
      }
      if(index < 1 || index >= Math.ceil(stock/6)){
        return
      }
      setPage(index)
      console.log(index)
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
            <div style={{marginTop:34, display:'flex'}}>

              {/* 오늘의 일정 */}
              <div style={{width:320, marginRight: 20 , textAlign:'left'}}>
                <SubHeader title={'오늘 일정'}/>
                <div style={{ color:'black', height:150, textAlign:'center',display:'flex', position:'relative',  paddingTop:24, paddingBottom:24, marginTop:14, marginBottom:30, borderRadius:5, backgroundColor:POINT_COLOR}}>
                  <div style={{ width: 100}}>
                    <p className="p-num p-bold" style={{paddingLeft:16, fontSize:26, textAlign:'left'}}>{moment().format('YYYY')}.<br/>{moment().format('MM.DD')}</p>
                    <p className="p-bold" style={{marginTop:50, paddingLeft: 16, fontSize:23, textAlign:'left'}}>{moment().format('dddd')}</p>
                  </div>
                  <div className="p-bold" style={{width:60, fontSize:12, paddingRight:22}}>
                    <p style={{borderTop:'1px solid black', paddingTop:5, marginBottom:11}}>기한 임박</p>
                    <p className="p-num"  style={{fontSize:28}}>{info.waring}</p>
                    <p style={{borderTop:'1px solid black', paddingTop:5, marginTop:11, marginBottom:11}}>기한 경과</p>
                    <p className="p-num"  style={{fontSize:28}}>{info.after}</p>
                  </div>
                  <div>
                  <p className="p-num" style={{position:'absolute', top:37, right:15, fontSize:114}}>{String(info.issue).padStart(2, '0')}</p>
               
                  </div>
                   </div>
              </div>
               {/* 주간 일정 */}
              <div style={{width: 'calc(100% - 300px)',borderRadius:5, textAlign:'left'}}>
                <SubHeader title={'주간 일정 현황'}/>
                <div style={{display:'flex', float:'right', marginTop:8}}>
                    <input type="checkbox" id="cb" onClick={(e)=>{setDim(!dim)}}/>
                    <label htmlFor="cb"></label>
                    <span style={{paddingLeft:7,fontSize:14}}>주말 표시</span> 
                </div>
                <div style={{  color:'black',borderRadius:5 ,height:'150',  backgroundColor: BG_COLOR_SUB, display:'flex', marginTop:13, marginBottom:30}}>
                  {
                    list.map((v, index)=>{
                      return(
                          <DayCard onClickEvent={onClickChangeDay} key={v.date} id={v.date} date={v.date} num={v.issue} on={v.date === targetDate ? true : false} dim={dim} weekend={index===0 || index ===6 ? true : false}/>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            {/* 전체장비현황  */}
            <div style={{width: '100%',marginTop:15,textAlign:'left'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                  <SubHeader title={'전체 장비현황'}/>
                  <img src={IC_REFRESH} onClick={()=>{getStatus(1); setPage(1)}} style={{width:20, height:20,marginLeft:7, cursor:'pointer'}}/>
                 
                </div>
               
                <div style={{  color:'black',borderRadius:5 ,height:'150', backgroundColor: BG_COLOR_SUB, display:'flex', alignItems: 'center',justifyContent: 'center',marginTop:13, marginBottom:30}}>
                  <div style={{width:'4%'}}> 
                   <img onClick={()=>onClickChangePage(page-1)} src={IC_BEFORE} style={{cursor:'pointer',width:24, margin:10}} />
                  </div>
                  <div className="p-limit" style={{flexWrap: 'wrap',marginTop: 25, width:'90%',marginBottom: 17, textAlign:'left'}}>
                    {
                      status.map((v: IStatus, index)=>{
                        return(
                            <StatusCard target={v}/>
                        )
                      })
                    }
                    
                    <div style={{marginTop:7, }}>
                      <DotPagenation stock={Math.ceil(stock/6)} selected={page} onClickEvent={onClickChangePage}/>
                    </div>
                  </div>
                  
                  <div style={{width:'4%'}}> 
                    <img onClick={()=>onClickChangePage(page+1)} src={IC_NEXT} style={{cursor:'pointer',width:24, margin:10}} />
                  </div>
                </div>
              </div>
              {/* 작업내역  */}
              <div style={{width: '100%',marginTop:44,textAlign:'left'}}>
                <SubHeader title={'작업내역'}/>
                <div style={{display:'inline-block', float:'right', }}>
                  <div style={{display:'flex', alignItems:'center'}}>
                  <ColorButtonLink url="/task/register" >{<><img src={IC_ADD}/> 추가하기</>}</ColorButtonLink>
                  <BasicDropdown contents={['등록순', '이름순']} select={['등록순', '이름순'][option]} onClickEvent={onClickFilter}/>
                  </div>
                </div>
                <div style={{marginTop:5}}>
                  <TaskTable indexList={indexList} keyName={'pk'} buttonName='수정하기' contents={taskList} onClickEvent={onClickTaskStatus}/>
           
                </div>
                
              </div>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}


export default Dashboard;