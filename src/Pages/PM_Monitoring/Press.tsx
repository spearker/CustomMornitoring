import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import HeaderLive from '../../Components/Text/HeaderLive';
import MonitoringToggle from '../../Components/Toggle/MonitoringToggle';
import MonitoringTabs from '../../Components/Tabs/MonitoringTabs';
import MonitoringOptionButton from '../../Components/Button/MonitoringOptionButton';
import MonitoringCard from '../../Components/Card/MonitoringCard';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchedList from '../../Components/List/SearchedList';
import {transferCodeToName} from '../../Common/codeTransferFunctions';
import {useHistory} from 'react-router-dom';
import MonitoringVerticalTable from '../../Components/Table/MonitoringVerticalTable';
import {API_URLS, getLoadTonList} from "../../Api/pm/monitoring";
import {API_URLS as MAP_URLS} from "../../Api/pm/map";
import MapBoard from "../../Components/Map/MapBoard";

// 모니터링 공통
const PressMonitoring = () => {

  const [arrayType2, setArrayType2] = useState<number>(0); //['공장 모니터링' , '기계별 모니터링']

  const [list, setList] = useState<IMonitoringList[]>([]);
  const history = useHistory();
  const [title, setTitile]= useState<string>('');
  const [arrayType, setArrayType] = useState<number>(0); //['카드형' , '리스트형']
  const [statusFilter, setStatusFilter] = useState<number>(1000);
  const [openList, setOpenList] = useState<string[]>([]);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [optionFilter, setOptionFilter] = useState<number | string>('all');
  const [optionList, setOptionList] = useState<number[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false);

  const onClickRefresh = useCallback(()=>{
    setStatusFilter(1000);
    setCheckList([]);
    setSelectedList([]);

  },[selectedList, statusFilter, checkList])
  /**
   * getData()
   * 모니터링 데이터 조회
   * @param {string} url 요청 주소
   * @returns X
   */
  const getList = useCallback(async()=>{
    if (document.hidden) { // Opera 12.10 and Firefox 18 and later support
      console.log('-- hidden browser -- ')
      //setCount(999)
      return
    }

    console.log('-- monitoring data load -- ' )
      const tempUrl = `${API_URLS['press'].monitoring}`
      const resultData = await getLoadTonList(tempUrl);
    setIsFirstLoad(true)
     const data = resultData;
     setList(data);
     console.log(data)
      if(data&&data.info_list) {
          const arr = data[0].info_list!.map((v, i) => {
              return (v['title'])
          })
          setOptionList(arr)
      }
  },[list, optionList]);

    useEffect(()=>{
      getList()
      //setList(dataSet.commonMonitoring)
      setIsFirstLoad(true)
      setTitile('프레스')
      },[])

    useEffect(()=>{

      const interval = setInterval(() => { getList(); }, 3000);

      return () => {
          console.log('-- monitoring end -- ' )
          clearTimeout(interval);
        };
    },[])

  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback( (filter:number | string)=>{
    setOptionFilter(filter);

  },[optionFilter, list])

  return (
      <DashboardWrapContainer index={'monitoring'}>

        <InnerBodyContainer>
          <div style={{position:'relative'}}>
              <HeaderLive title={ title + ' 모니터링'} isTurn={isFirstLoad}/>
              {
                arrayType2 === 1 &&
                <div style={{position:'absolute',display:'inline-block',top:0, right:0}}>
                <MonitoringToggle contents={['카드형 보기', '목록형 보기']} select={arrayType} onClickEvent={setArrayType}/>

              </div>
              }

          </div>
          <div style={{textAlign:'left', marginBottom: 21}}>
            <MonitoringToggle contents={['공장 프레스 현황', '장비별 프레스 현황']} select={arrayType2} onClickEvent={setArrayType2}/>
          </div>
          {
            arrayType2 === 0 ?
                <MapBoard
                    autoRendering={true}
                    type={0}
                    url={MAP_URLS['press'].monitoring}
                />
            :

          <>
          <WrapBox>
            <MonitoringTabs contents={
              [{title:'전체', value:1000},{title:'대기', value:10},{title:'진행', value:11},{title:'중지', value:15},{title:'완료', value:16},{title:'에러', value:0}]
            }
              onClickEvent={setStatusFilter}
              />
              <div style={{position:'absolute',display:'inline-block',top:0, right:0}}>
                {
                  openList !== undefined && openList !== null && openList === [] && openList.length === list.length ?
                  <MonitoringOptionButton title={'전체 접기'} color={'#b3b3b3'} onClickEvent={()=>{setOpenList([])}} />
                  :
                  <MonitoringOptionButton title={'전체 펼치기'} color={'#b3b3b3'} onClickEvent={()=>{
                      if (list && list.length > 0)
                        setOpenList(list.map((v:IMonitoringList)=>{return v.pk!})
                  )}} />
                }
                {/*<MonitoringOptionButton title={'전체화면 보기'} onClickEvent={()=>history.push('/monitoring/full')} />*/}
                {/*<MonitoringOptionButton title={'항목 골라보기'} color={'#b3b3b3'} onClickEvent={()=>{setIsPopup(true);setCheckList(selectedList);}} />*/}
                {/*<MonitoringOptionButton title={'초기화'} color={'#b3b3b3'} onClickEvent={()=>{onClickRefresh()}}/>*/}
              </div>
          </WrapBox><br/>

          {
            list && arrayType === 0 ?
                list.length !== 0 ? (
            list.map((v:IMonitoringList,i)=>{
              if(statusFilter === 1000){
                return(
                    <>
                  <MonitoringCard key={ 'm-' + i} contents={v}  optionList={selectedList.length === 0 ? v.info_list.map((m)=>{ return  Number(m.title)}) : selectedList}
                  onClickEvent={()=>{
                    if(openList.indexOf(v.pk) !== -1){ // 열렸으면
                      setOpenList(openList.filter(f => f !== v.pk))
                      console.log('추가'  + v.pk)
                    }else{// 닫혔으면
                      setOpenList(openList.concat(v.pk))
                      console.log('삭제' + v.pk)
                    }
                  }}
                  isOpen={openList.indexOf(v.pk) == -1 ? false : true}/>
                  </>
                )
              }else{
                if(v.operation === statusFilter){
                  return(
                    <MonitoringCard key={ 'm-' + i} contents={v} optionList={selectedList.length === 0 ? v.info_list.map((m)=>{ return  Number(m.title)}) : selectedList}
                    onClickEvent={()=>{
                      if(openList.indexOf(v.pk) !== -1){ // 열렸으면
                        setOpenList(openList.filter(f => f !== v.pk))
                        console.log('추가'  + v.pk)
                      }else{// 닫혔으면
                        setOpenList(openList.concat(v.pk))
                        console.log('삭제' + v.pk)
                      }
                    }}
                    isOpen={openList.indexOf(v.pk) == -1 ? false : true}/>
                  )
                }
              }
            })
                    ) :
                    (<p style={{margin:100}}>데이터가 없습니다.</p>)
            :

                list && <MonitoringVerticalTable contents={list} operation={statusFilter} filterList={selectedList.length === 0 && list.length > 0 ? list[0].info_list.map((m)=>{ return  Number(m.title)}) : selectedList}/>
          }
          </>
}
        </InnerBodyContainer>
        <SearchModalContainer
              onClickEvent={ //닫혔을 때 이벤트
                ()=>{
                setSelectedList(checkList);

                setIsPopup(false);
            }}
            isVisible={isPopup} onClickClose={()=>{setIsPopup(false)}} title={'항목 선택 하기'} >

                <div style={{width: '100%',maxHeight: 380, overflowY: 'scroll'}}>
                  {
                    optionList.map((v, i)=>{
                      if(v == 903 || v == 902 || v == 901 ){
                        return;
                      }
                      return (

                          <SearchedList key={'s' + i} pk={String(v)} widths={['100%']} contents={[transferCodeToName('title', v)]} isIconDimmed={false} isSelected={checkList.find((c)=> c === v) ? true : false }
                                        onClickEvent={()=>{
                              if(checkList.find((f)=> f === v)){
                                setCheckList(checkList.filter((f)=> f!== v))
                              }else{
                                setCheckList(checkList.concat(v))
                              }

                            }}
                          />

                        )
                      })
                  }
                </div>
            </SearchModalContainer>
      </DashboardWrapContainer>

  );
}

const WrapBox = Styled.div`
    text-align: left;
    margin-top: 24px;
    position: relative;
    display: block;
    margin-bottom: 2px;
`

export default PressMonitoring;
