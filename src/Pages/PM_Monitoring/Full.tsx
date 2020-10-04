import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {TOKEN_NAME} from '../../Common/configset'
import {getToken} from '../../Common/tokenFunctions';
import 'react-dropdown/style.css'
import {getRequest} from '../../Common/requestFunctions';
import HeaderLive from '../../Components/Text/HeaderLive';
import MonitoringOptionButton from '../../Components/Button/MonitoringOptionButton';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchedList from '../../Components/List/SearchedList';
import {transferCodeToName} from '../../Common/codeTransferFunctions';
import FullSizeContainer from '../../Containers/FullSizeContainer';
import {useHistory} from 'react-router-dom';
import MonitoringCardSmall from '../../Components/Card/MonitoringCardSmall';

// 풀사이즈 모니터링
const FullMonitoring = () => {

  const [list, setList] = useState<[]>([]);

  const [title, setTitile]= useState<string>('');
  const [arrayType, setArrayType] = useState<number>(0); //['카드형' , '리스트형']
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [openList, setOpenList] = useState<string[]>([]);
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [optionFilter, setOptionFilter] = useState<number | string>('all');
  const [optionList, setOptionList] = useState<number[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false);
  const history = useHistory();
  const onClickRefresh = useCallback(()=>{
    setStatusFilter('all');
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
    const res = await getRequest(`http://112.186.20.155:8299/api/v1/monitoring?type=press&from=mobile`, getToken(TOKEN_NAME))
    setIsFirstLoad(true)
    if(res === false){
      //alert('서버에서 데이터를 받아올 수 없습니다.')

      window.location.href="/dashboard"
    }else{
      if(res.status === 200){
         const data = res.results;
         setList(data);
         ////alert(data.info_list);
         console.log(data.info_list)
         const arr = data[0].info_list.map((v, i)=>{
          return( v['title'] )
         })
         setOptionList(arr)
      }else{
        //alert('서버에서 데이터를 받아올 수 없습니다.')

        window.location.href="/dashboard"
      }
    }
  },[list, optionList]);

    useEffect(()=>{
      getList()
      setIsFirstLoad(true)
      setTitile('프레스')
      },[])
    useEffect(()=>{

      const interval = setInterval(() => { getList();  }, 9000)

      return () => {
          //console.log('-- monitoring end -- ' )
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
    <FullSizeContainer index={'monitoring'}>
        <div style={{marginLeft: 44, marginRight:44}}>
          <div style={{position:'relative'}}>
              <HeaderLive title={ title + ' 모니터링'} isTurn={isFirstLoad}/>
              <div style={{position:'absolute',display:'inline-block',top:0, right:0}}>

              </div>
          </div>
          <WrapBox>
            {/*<MonitoringTabs contents={*/}
            {/*  [{title:'전체', value:'all'},{title:'대기', value:'ready'},{title:'진행', value:'active'},{title:'중지', value:'stop'},{title:'완료', value:'done'},{title:'에러', value:'error'}]*/}
            {/*}*/}
              onClickEvent={setStatusFilter}
              />
              <div style={{position:'absolute',display:'inline-block',top:0, right:0}}>
                {
                  openList.length === list.length ?
                  <MonitoringOptionButton title={'전체 접기'} color={'#b3b3b3'} onClickEvent={()=>{setOpenList([])}} />
                  :
                  <MonitoringOptionButton title={'전체 펼치기'} color={'#b3b3b3'} onClickEvent={()=>{setOpenList(
                    list.map((v:IMonitoringList)=>{return v.pk!})
                  )}} />
                }
                <MonitoringOptionButton title={'전체화면 끄기'} onClickEvent={()=>history.push('/monitoring/press')} />
                <MonitoringOptionButton title={'항목 골라보기'} color={'#b3b3b3'} onClickEvent={()=>{setIsPopup(true);setCheckList(selectedList);}} />
                <MonitoringOptionButton title={'초기화'} color={'#b3b3b3'} onClickEvent={()=>{onClickRefresh()}}/>
              </div>

          </WrapBox><br/>
          <ListWrap>


          {
            list.map((v:IMonitoringList,i)=>{
              if(statusFilter === 'all'){

                return(
                  <MonitoringCardSmall key={ 'm-' + i} contents={v}  optionList={selectedList.length === 0 ? v.info_list.map((m)=>{ return  Number(m.title)}) : selectedList}
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
              }else{
                // if(v.operation === statusFilter){
                //   return(
                //     <MonitoringCardSmall key={ 'm-' + i} contents={v} optionList={selectedList.length === 0 ? v.info_list.map((m)=>{ return  Number(m.title)}) : selectedList}
                //     onClickEvent={()=>{
                //       if(openList.indexOf(v.pk) !== -1){ // 열렸으면
                //         setOpenList(openList.filter(f => f !== v.pk))
                //         console.log('추가'  + v.pk)
                //       }else{// 닫혔으면
                //         setOpenList(openList.concat(v.pk))
                //         console.log('삭제' + v.pk)
                //       }
                //     }}
                //     isOpen={openList.indexOf(v.pk) == -1 ? false : true}/>
                //   )
                // }
              }

            })
          }
         </ListWrap>
        </div>
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
      </FullSizeContainer>

  );
}

const WrapBox = Styled.div`
    text-align: left;
    margin-top: 24px;
    position: relative;
    display: block;
    margin-bottom: 2px;
    
`

const ListWrap = Styled.div`
    text-align: left;
    display: flex;
   flex-wrap: wrap;
   margin-bottom: 120px;
`

export default FullMonitoring;
