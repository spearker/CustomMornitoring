import React, { useCallback, useEffect, useState } from 'react';
import Styled from 'styled-components'
import { BG_COLOR_SUB3, TOKEN_NAME } from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import SubHeader from '../../Components/Text/SubHeader';
import moment from 'moment';
import 'moment/locale/ko';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import IC_NEXT from '../../Assets/Images/ic_next_page.png';
import IC_BEFORE from '../../Assets/Images/ic_before_page.png';
import IC_REFRESH from '../../Assets/Images/ic_refresh.png';
import DotPagenation from '../../Components/Pagenation/DotPagenation';
import { getRequest, postRequest } from '../../Common/requestFunctions';
import { getToken } from '../../Common/tokenFunctions';
import TaskTable from '../../Components/Table/TaskTable';
import StatusCard2 from '../../Components/Card/StatusCard2';
import { changeStatusToColor } from '../../Common/statusFunctions';

interface IWeekInfo {
  date: string,
  issue: number,
}

interface ITodayInfo {
  issue: number,
  waring: number,
  after: number
}

const dummy = []


// 대시보드 메인 페이지
const Dashboard = () => {

  const [ today, setToday ] = useState<string>(moment().format('YYYY-MM-DD'))
  const [ targetDate, setTargetDate ] = useState<string>(moment().format('YYYY-MM-DD'))
  const [ list, setList ] = useState<IWeekInfo[]>([])
  const [ filter, setFilter ] = useState<number>(0)
  const [ status, setStatus ] = useState<IStatus2[]>(dummy)
  const [ stock, setStock ] = useState<number>(16)
  const [ info, setInfo ] = useState<ITodayInfo>({ issue: 0, after: 0, waring: 0 })
  const [ dim, setDim ] = useState<boolean>(true)
  const [ page, setPage ] = useState<number>(1)
  const [ taskList, setTaskList ] = useState<ITask[]>([])
  const [ option, setOption ] = useState<number>(0)
  const [ taskFilter, setTaskFilter ] = useState<number>(1000);


  const optionList = [
    "등록순", "기계이름 순", "기계종류 순", "기계번호 순", "제조사 순", "제조사 번호 순", "제조사 상세정보 순"
  ]
  const indexList = {
    status: '상태',
    title: '이름',
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
  const getSunday = useCallback(() => {
    for (var i = 0; i < 7; ++i) {
      if (moment().add(0 - i, "days").locale('en').format('dddd') === 'Sunday') {
        const targetDate = moment().add(0 - i, "days").format('YYYY-MM-DD');
        return targetDate
      }
    }
  }, [])


  /**
   * onClickChangeDay()
   * 날짜 카드를 선택하고 그 날의 일정을 얻기
   * @returns X
   */
  const onClickChangeDay = useCallback((day) => {
    console.log(day)
    setTargetDate(day);
  }, [ targetDate ])

  useEffect(() => {

    setList(
        [
          { date: '2020-05-31', issue: 0 },
          { date: '2020-06-01', issue: 1 },
          { date: '2020-06-02', issue: 0 },
          { date: '2020-06-03', issue: 3 },
          { date: '2020-06-04', issue: 4 },
          { date: '2020-06-05', issue: 0 },
          { date: '2020-06-06', issue: 0 },
        ]
    )

    setInfo({
      issue: 3,
      after: 2,
      waring: 0
    })

    //setStatus(dataSet.statusList)
    getStatus(1);
    onClickFilter(0)
    //setTaskList(dataSet.taskList)
  }, [])

  /**
   * getStatus()
   * 장비 현황 조회
   * @param {string} url 요청 주소
   * @param {string} pageIndex 페이지 인덱스
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getStatus = useCallback(async (index: number) => {
    const results = await getRequest('http://203.234.183.22:8299/api/v1/dashboard/machine/' + index, getToken(TOKEN_NAME))

    if (results === false) {
      ////alert('8087포트 : 서버에서 데이터를 불러 올 수없습니다.')
    } else {
      if (results.status === 200) {
        setStock(results.results.stock)
        setStatus(results.results.item_list)
      } else {
        //alert('8087포트 : 서버에서 데이터를 불러 올 수없습니다.')
      }
    }
  }, [ page ])

  /**
   * getTasks()
   * 작업지시서 현황 조회
   * @param {string} url 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getTasks = useCallback(async (index: number) => {
    const results = await getRequest('http://203.234.183.22:8299/api/v1/task/list/' + filter, getToken(TOKEN_NAME))

    if (results === false) {
      ////alert('8087포트 : 서버에서 데이터를 불러 올 수없습니다.')
    } else {
      if (results.status === 200) {
        setStock(results.results.stock)
        setStatus(results.results.item_list)
      } else {
        //alert('8087포트 : 서버에서 데이터를 불러 올 수없습니다.')
      }
    }
  }, [ page ])

  /**
   * onClickChangePage()
   * 장비 현황 조회 페이지 변경
   * @param {string} index 페이지 번호
   * @returns X
   */
  const onClickChangePage = useCallback((index: number) => {
    ////alert(page + ' -> ' + index)
    console.log(index)
    if (stock < 7) {
      ////alert('미만')
      return
    }
    if (index < 1 || index > Math.ceil(stock / 6)) {
      ////alert('뭐야')
      return
    }
    setPage(index)
    console.log(index)
    getStatus(index)
    //getStatus(index)
  }, [ page, stock ])

  /**
   * onClickTaskStatus()
   * 작업 내역의 상태 변경
   * @param {string} pk 작업지시서 pk
   * @param {string} value 상태값
   * @returns X
   */
  const onClickTaskStatus = useCallback(async (pk: string, value: string) => {
    ////alert(`선택 테스트 : 작업지시서 pk: ${pk} - status : ${value}` )
    //return;
    const data = {
      pk: pk,
      status: value
    }
    const results = await postRequest('http://203.234.183.22:8299/api/v1/task/status', data, getToken(TOKEN_NAME))

    if (results === false) {
      ////alert('요청을 처리 할 수 없습니다 잠시후 다시 시도해주세요.')
    } else {
      if (results.status === 200) {
        //alert('성공적으로 변경되었습니다.')
        onClickFilter(0)
      } else {
        //alert('요청을 처리 할 수 없습니다 잠시후 다시 시도해주세요.')
      }
    }
  }, [])

  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async (filter: number) => {
    setOption(filter)
    ////alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
    //return;
    const results = await getRequest('http://203.234.183.22:8299/api/v1/task/list/' + filter, getToken(TOKEN_NAME))

    if (results === false) {
      ////alert('서버에서 데이터를 불러 올 수없습니다.')
    } else {
      if (results.status === 200) {
        setTaskList(results.results)

      } else {
        //alert('서버에서 데이터를 불러 올 수없습니다.')
      }
    }
  }, [ option ])
  return (
      <DashboardWrapContainer>
        <InnerBodyContainer>


          {/* 전체장비현황  */}
          <div style={{ width: '100%', marginTop: 29, textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SubHeader title={'전체 장비현황'}/>
              <img src={IC_REFRESH} onClick={() => {
                getStatus(1);
                setPage(1)
              }} style={{ width: 20, height: 20, marginLeft: 7, cursor: 'pointer' }}/>

            </div>

            <div style={{
              color: 'black',
              borderRadius: 5,
              height: '150',
              backgroundColor: BG_COLOR_SUB3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 13,
              marginBottom: 30
            }}>
              <div style={{ width: '4%' }}>
                <img onClick={page > 1 ? () => onClickChangePage(page - 1) : () => {
                }} src={IC_BEFORE} style={{ cursor: 'pointer', width: 24, height: 24, margin: 10, zIndex: 3 }}/>
              </div>
              <div style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: 25,
                width: '90%',
                marginBottom: 17,
                textAlign: 'center'
              }}>
                <div className="p-limit"
                     style={{ display: 'flex', flexDirection: 'row', width: '100%', textAlign: 'center' }}>
                  {dummy !== undefined && dummy.length === 0 ?
                      <p style={{ color: '#ffffff', textAlign: "center", marginLeft: '43%' }}>comming soon</p> :
                      dummy.map((v: IStatus2, index) => {
                        if ((page - 1) * 6 <= index) {
                          if ((page - 1) * 6 + 5 >= index) {
                            return (
                                <StatusCard2 target={v} key={index}/>
                            )
                          }
                        }

                      })
                  }
                </div>

                <div style={{ marginTop: 7, }}>
                  <DotPagenation stock={Math.ceil(dummy.length / 6)} selected={page} onClickEvent={onClickChangePage}/>
                </div>
              </div>

              <div style={{ width: '4%' }}>
                <img onClick={page < Math.ceil(dummy.length / 6) ? () => onClickChangePage(page + 1) : () => {
                }} src={IC_NEXT} style={{ cursor: 'pointer', width: 24, margin: 10 }}/>
              </div>
            </div>
          </div>
          {/* 작업내역  */}
          <div style={{ width: '100%', marginTop: 44, textAlign: 'left', marginBottom: 10 }}>
            <SubHeader title={'작업지시서 내역 '}/>
            <span> </span>
            <FilterButton onClick={() => setTaskFilter(1000)}
                          style={{ backgroundColor: changeStatusToColor(1000) }}>전체</FilterButton>
            <FilterButton onClick={() => setTaskFilter(11)}
                          style={{ backgroundColor: changeStatusToColor(11) }}>진행</FilterButton>
            <FilterButton onClick={() => setTaskFilter(10)}
                          style={{ backgroundColor: changeStatusToColor(10) }}>완료</FilterButton>
            {/*<FilterButton onClick={()=>setTaskFilter('share')} style={{backgroundColor: changeStatusToColor('share')}}>공유</FilterButton>*/}
            {/*<FilterButton onClick={()=>setTaskFilter('ready')} style={{backgroundColor: changeStatusToColor('ready')}}>대기</FilterButton>*/}

            <div style={{ display: 'inline-block', float: 'right', }}>
              {/*<div style={{display:'flex', alignItems:'center'}}>*/}
              {/*<ColorButtonLink url="/task/register" >{<><img src={IC_ADD}/> 작업 지시서 추가하기</>}</ColorButtonLink>*/}
              {/*<BasicDropdown contents={['등록순', '이름순']} select={['등록순', '이름순'][option]} onClickEvent={onClickFilter}/>*/}
              {/*</div>*/}
            </div>
            <div style={{ marginTop: 12 }}>
              <TaskTable indexList={indexList} keyName={'pk'} buttonName='수정하기'
                         contents={taskFilter === 1000 ? taskList : taskList.filter(f => f.status === taskFilter)}
                         onClickEvent={onClickTaskStatus}/>

            </div>
            {
              taskList.length === 0 &&
              <NullBox>
                {/*등록된 작업지시서가 없습니다.*/} comming soon
              </NullBox>
            }

          </div>
        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}

const NullBox = Styled.div`
  background-color: ${BG_COLOR_SUB3};
  padding: 12px;
  color: #666d79;
  font-size: 17px;
  font-weight: bold; 
  text-align: center;
  border-radius: 5px;
  margin-top: 5px;
`

const FilterButton = Styled.div`
  padding: 7px 18px;
  font-size: 15px;
  font-weight: bold;

  display: inline-block;
  border-radius: 4px;
  margin-left: 10px;


`
export default Dashboard;
