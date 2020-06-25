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
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import { getRequest } from '../../Common/requestFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {    PM_MENU_LIST,   ROUTER_MENU_LIST } from '../../Common/routerset';
import MonitoringTable from '../../Components/Table/MonitoringTable';
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'
import HeaderLive from '../../Components/Text/HeaderLive';
import MonitoringTableCommon from '../../Components/Table/MonitoringTableCommon';
import MonitoringDropdown from '../../Components/Dropdown/MonitoringDropdown';
import MonitoringTableFilter from '../../Components/Table/MonitoringTableFilter';
import MonitoringToggle from '../../Components/Toggle/MonitoringToggle';
import MonitoringTabs from '../../Components/Tabs/MonitoringTabs';
import MonitoringOptionButton from '../../Components/Button/MonitoringOptionButton';
import MonitoringCard from '../../Components/Card/MonitoringCard';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchedList from '../../Components/List/SearchedList';
import { transferCodeToName } from '../../Common/codeTransferFunctions';
import { useHistory } from 'react-router-dom';
import MonitoringVerticalTable from '../../Components/Table/MonitoringVerticalTable';
import TEMP_IMG_1 from '../../Assets/Images/monitoring_press.png'
import CMS from "../../Assets/Images/image_cms.png";
// 모니터링 공통
const PressMonitoring = () => {

  const [arrayType2, setArrayType2] = useState<number>(0); //['공장 모니터링' , '기계별 모니터링']

  const [list, setList] = useState<IMonitoringList[]>([]);
  const history = useHistory();
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
    const res = await getRequest(`http://211.208.115.66:8088/api/v1/monitoring?type=press&from=mobile`, getToken(TOKEN_NAME))
    setIsFirstLoad(true)
    if(res === false){
      alert('서버에서 데이터를 받아올 수 없습니다.')

      window.location.href="/dashboard"
    }else{
      if(res.status === 200){
         const data = res.results;
         setList(data);
         //alert(data.info_list);
         console.log(data.info_list)
         const arr = data[0].info_list.map((v, i)=>{
          return( v['title'] )
         })
         setOptionList(arr)
      }else{
        alert('서버에서 데이터를 받아올 수 없습니다.')

        window.location.href="/dashboard"
      }
    }
  },[list, optionList]);

    useEffect(()=>{
      getList()
      //setList(dataSet.commonMonitoring)
      setIsFirstLoad(true)
      setTitile('프레스')
      },[])



    useEffect(()=>{

      const interval = setInterval(() => { getList(); }, 9000);

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
      <DashboardWrapContainer index={0}>
        <SubNavigation list={PM_MENU_LIST[0]}/>
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
                <div style={{position:'relative'}}>
                    <img src={TEMP_IMG_1} style={{marginTop:15,width:1100,height:780}}/>
                    {/*//*/}
                    {/*//     <p style={{position:"absolute",left:148,top:365,fontSize:18}}>{dBox.length > 0 ? dBox[0].name : '-'} </p>*/}
                    {/*//     <p style={{position:"absolute",left:173,top:553,fontSize:15,color:'#000'}}>{dBox.length > 0 ? dBox[0].ampere : '-'}A</p>*/}
                    {/*//*/}
                    {/*//     <p style={{position:"absolute",left:395,top:120,fontSize:15}}>{mList.length > 0 ? mList[0].name : '-'}</p>*/}
                    {/*//     /!*<img src={setting} style={{position:"absolute",left:295,top:75}}/>*!/*/}
                    {/*//     <p style={{position:"absolute",left:435,top:143,fontSize:13}}>{mList.length > 0 ? mList[0].option : '-'}ton</p>*/}
                    {/*//     <p style={{position:"absolute",left:464,top:291,fontSize:15, color:'#000'}}>{mList.length > 0 ? mList[0].percent : '-'}%</p>*/}
                    {/*//     <p style={{position:"absolute",left:455,top:319,fontSize:15,color:'#000'}}>{mList.length > 0 ? mList[0].ampere : '-'}A</p>*/}
                    {/*//*/}
                    {/*//     <p style={{position:"absolute",left:412,top:413,fontSize:18}}>{bList.length > 0 ? bList[0].pk : '-'}</p>*/}
                    {/*//     <img src={setting} style={{position:"absolute",left:500,top:415}}/>*/}
                    {/*//     <p style={{position:"absolute",left:450,top:457,fontSize:15}}>{bList.length > 0 ? bList[0].percent : '-'}%</p>*/}
                    {/*//     <p style={{position:"absolute",left:459,top:484,fontSize:15}}>{bList.length > 0 ? bList[0].ampere : '-'}A</p>*/}
                    {/*//*/}
                    {/*//     <p style={{position:"absolute",left:872,top:354,fontSize:18}}>{mList.length > 0 ? mList[1].name : '-'}</p>*/}
                    {/*//     <img src={setting} style={{position:"absolute",left:961,top:358,width:15,height:15}}/>*/}
                    {/*//     <p style={{position:"absolute",left:894,top:382,fontSize:13}}>{mList.length > 0 ? mList[1].option : '-'}ton</p>*/}
                    {/*//     <p style={{position:"absolute",left:920,top:528,fontSize:15, color:'#000'}}>{mList.length > 0 ? mList[1].percent : '-'}%</p>*/}
                    {/*//     <p style={{position:"absolute",left:919,top:556,fontSize:15, color:'#000'}}>{mList.length > 0 ? mList[1].ampere : '-'}A</p>*/}
                    {/*//*/}
                    {/*//     <p style={{position:"absolute",left:666,top:413,fontSize:18}}>{bList.length > 0 ? bList[1].pk : '-'}</p>*/}
                    {/*//     <img src={setting} style={{position:"absolute",left:762,top:415}}/>*/}
                    {/*//     <p style={{position:"absolute",left:712,top:457,fontSize:15}}>{bList.length > 0 ? bList[1].percent : '-'}%</p>*/}
                    {/*//     <p style={{position:"absolute",left:723,top:484,fontSize:15}}>{bList.length > 0 ? bList[1].ampere : '-'}A</p>*/}

                    <p style={{position:"absolute",left:238,top:73,fontSize:12}}>프레스01</p>
                    <p style={{position:"absolute",left:242,top:89,fontSize:10}}>1000ton</p>
                    <p style={{position:"absolute",left:280,top:193,fontSize:12, color:'#000'}}>진행</p>
                    <p style={{position:"absolute",left:263,top:213,fontSize:12, color:'#000'}}>3,800A</p>

                    <p style={{position:"absolute",left:358,top:73,fontSize:12}}>프레스02</p>
                    <p style={{position:"absolute",left:366,top:89,fontSize:10}}>800ton</p>
                    <p style={{position:"absolute",left:399,top:193,fontSize:12, color:'#000'}}>진행</p>
                    <p style={{position:"absolute",left:392,top:214,fontSize:12, color:'#000'}}>800A</p>

                    <p style={{position:"absolute",left:478,top:73,fontSize:12}}>프레스03</p>
                    <p style={{position:"absolute",left:487,top:89,fontSize:10}}>800ton</p>
                    <p style={{position:"absolute",left:522,top:193,fontSize:12, color:'#000'}}>진행</p>
                    <p style={{position:"absolute",left:505,top:214,fontSize:12, color:'#000'}}>1,800A</p>

                    <p style={{position:"absolute",left:598,top:73,fontSize:12}}>프레스04</p>
                    <p style={{position:"absolute",left:607,top:89,fontSize:10}}>800ton</p>
                    <p style={{position:"absolute",left:638,top:193,fontSize:12, color:'#000'}}>중지</p>
                    <p style={{position:"absolute",left:632,top:213,fontSize:12, color:'#000'}}>700A</p>

                    <p style={{position:"absolute",left:718,top:73,fontSize:12}}>프레스05</p>
                    <p style={{position:"absolute",left:724,top:89,fontSize:10}}>1000ton</p>
                    <p style={{position:"absolute",left:759,top:193,fontSize:12, color:'#000'}}>대기</p>
                    <p style={{position:"absolute",left:742,top:213,fontSize:12, color:'#000'}}>2,100A</p>

                    <p style={{position:"absolute",left:838,top:73,fontSize:12}}>프레스06</p>
                    <p style={{position:"absolute",left:842,top:89,fontSize:10}}>1000ton</p>
                    <p style={{position:"absolute",left:879,top:193,fontSize:12, color:'#000'}}>완료</p>
                    <p style={{position:"absolute",left:862,top:213,fontSize:12, color:'#000'}}>2,100A</p>

                    <p style={{position:"absolute",left:958,top:73,fontSize:12}}>프레스07</p>
                    <p style={{position:"absolute",left:962,top:89,fontSize:10}}>1000ton</p>
                    <p style={{position:"absolute",left:1000,top:193,fontSize:12, color:'#000'}}>중지</p>
                    <p style={{position:"absolute",left:983,top:213,fontSize:12, color:'#000'}}>2,100A</p>

                </div>
            :

          <>
          <WrapBox>
            <MonitoringTabs contents={
              [{title:'전체', value:'all'},{title:'대기', value:'ready'},{title:'진행', value:'active'},{title:'중지', value:'stop'},{title:'완료', value:'done'},{title:'에러', value:'error'}]
            }
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
               {/* <MonitoringOptionButton title={'전체화면 보기'} onClickEvent={()=>history.push('/monitoring/full')} />*/}
                <MonitoringOptionButton title={'항목 골라보기'} color={'#b3b3b3'} onClickEvent={()=>{setIsPopup(true);setCheckList(selectedList);}} />
                <MonitoringOptionButton title={'초기화'} color={'#b3b3b3'} onClickEvent={()=>{onClickRefresh()}}/>
              </div>

          </WrapBox><br/>

          {
            arrayType === 0 ?
            list.map((v:IMonitoringList,i)=>{
              if(statusFilter === 'all'){

                return(
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
                )
              }else{
                if(v.status === statusFilter){
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
            :
            <MonitoringVerticalTable contents={list} status={statusFilter} filterList={selectedList.length === 0 && list.length > 0 ? list[0].info_list.map((m)=>{ return  Number(m.title)}) : selectedList}/>
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

                          <SearchedList key={'s' + i} pk={String(v)} widths={['100%']} contents={[transferCodeToName('title', v,'kor')]} isIconDimmed={false} isSelected={checkList.find((c)=> c === v) ? true : false }
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
