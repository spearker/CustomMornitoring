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
import { getRequest } from '../../Common/requestFunctions';
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

// 작업 지시서 등록
const TaskRegister = () => {

 
  const [option, setOption] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount]= useState<number>(0);
  const [end, setEnd] = useState<string>(moment().format('YYYY-MM-DD HH:mm'));
  const [start, setStart] = useState<string>(moment().format('YYYY-MM-DD HH:mm'));


 //검색관련
 const [isPoupup, setIsPoupup] = useState<boolean>(false);
 const [isPoupup2, setIsPoupup2] = useState<boolean>(false);
 const [isSearched, setIsSearched] = useState<boolean>(false);
 const [keyword, setKeyword] = useState<string>('');
 const [checkList, setCheckList] = useState<IMachineLine[]>([]);
 const [list, setList] = useState<IMachineLine[]>([]);
 const [searchList, setSearchList] = useState<IMachineLine[]>([]);
 const [searchList2, setSearchList2] = useState<IProductSearched[]>([]);
 const [checkList2, setCheckList2] = useState<IProductSearched[]>([]);
 const [list2, setList2] = useState<IProductSearched[]>([]);
 const tabList = [
   "기계", "라인"
 ]
 const [tab, setTab] = useState<string>(tabList[0]);

  const optionList = [
    "등록순", "기계이름 순", "기계종류 순", "기계번호 순", "제조사 순", "제조사 번호 순", "제조사 상세정보 순"
  ]
  const index = {
    machine_name:'기계 이름',
    machine_label:'기계 종류',
    machine_code:'기계 번호',
    manufacturer:'제조사', 
    manufacturer_code:'제조사 번호', 
    manufacturer_detail:'제조사 상세정보'
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

    setSearchList(dataSet.searchedItem.lines)
    setSearchList2(dataSet.products)
  },[])

 
  /**
   * onClickSearch()
   * 금형 키워드 검색
   * @param {string} url 요청 주소
   * @param {string} keyword 검색 키워드
   * @returns X 
   */
  const onClickSearch = useCallback(()=>{
  
   
    alert('테스트 : keyword - ' + keyword);
    return;
    if(keyword  === '' || keyword.length < 2){
      alert('2글자 이상의 키워드를 입력해주세요')

      return;
    } 
    setIsSearched(true)

    const res = getRequest(BASE_URL + '/api/v1/mold/search/' + keyword, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const results = res.results;
         setKeyword('')
         setSearchList(results);
      }else if(res.status === 1001){
        //TODO:  오류 처리 
      }else{
        //TODO:  기타 오류
      }
    }
  },[keyword])

  

  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)

  },[])

  return (
      <DashboardWrapContainer>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'작업 지시서 등록'}/>
          </div>
          <WhiteBoxContainer>
            <div style={{borderBottom:'solid 0.5px #d3d3d3'}}>
              <PlaneInput value={title} description={'작업지시서 제목 입력'} onChangeEvent={setTitle} fontSize={'26px'}/>
              <PlaneInput value={description} description={'상세 업무내용 작성 (200자 미만)'} onChangeEvent={setDescription} fontSize={'14px'}/>
            </div>
             {/* 팝업 여는 버튼 + 기계추가 */}
             <AddInput icType={'solo'} title={'기계 / 라인 선택'} onChangeEvent={()=>{
                  setIsPoupup(true);  
                  setCheckList(list); 
                  setKeyword('')}
                  }> 
                   
                {
                  list.map((v, i)=>{ 
                    return ( 
                        <SearchedList key={i} 
                          pk={v.pk}  option={v.end_date !== '' ? '작업완료 : ' + v.end_date : ''} widths={['15%', '60%']} type={'remove'} contents={[v.group, v.name]} isIconDimmed={false} isSelected={false }
                          onClickEvent={()=>{
                          const tempList = list.slice()
                          const idx = list.indexOf(v)
                          tempList.splice(idx, 1)
                          setList(tempList)
                        }} 
                        />                    
                    )
                  })
                }
     
                </AddInput>
         
              {/* 팝업 여는 버튼 + 생상품 추가 */}
              <AddInput icType={'solo'} title={'생산제품'} onChangeEvent={()=>{
                  setIsPoupup2(true);  
                  setCheckList2(list2); 
                  setKeyword('')}
                  }> 
                   
                {
                  list2.map((v, i)=>{ 
                    return ( 
                        <SearchedList key={i} 
                          pk={v.pk} widths={['15%', '15%', '70%']} contents={[v.product_code, v.molds, v.product_name]} type={'remove'} isIconDimmed={false} isSelected={false }
                          onClickEvent={()=>{
                          const tempList = list2.slice()
                          const idx = list2.indexOf(v)
                          tempList.splice(idx, 1)
                          setList2(tempList)
                        }} 
                        />                    
                    )
                  })
                }
     
                </AddInput>
                <NormalInput title={'생산목표량'} value={String(amount)} onChangeEvent={setAmount} description={'생산목표량을 입력하세요'} />
                <DateRangeInput title={'작업 목표 기간'} end={end} start={start} onChangeEventEnd={setEnd} onChangeEventStart={setStart}/>
          </WhiteBoxContainer>

           {/* 기계 라인 검색창 */}
           <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup(false); 
                setList(checkList); 
                setKeyword('')}
            }
            isVisible={isPoupup} onClickClose={()=>{setIsPoupup(false)}} title={''} >
              <>
              <div className="p-bold" style={{width:'100%', position:'absolute', marginBottom:20, display:'flex', zIndex:4, top:0, left:0,  color:'black', justifyItems:'center', alignItems:'center',textAlign:'center', fontSize:14}}>
                  <div style={{ width:'50%', padding:9, backgroundColor: `${tab === tabList[0] ? '#f4f6fa' : POINT_COLOR} `}} onClick={()=>setTab(tabList[0])}>
                      <p>{tabList[0]}</p>
                  </div>
                  <div style={{ width:'50%', padding:9, backgroundColor: `${tab === tabList[1] ? '#f4f6fa' : POINT_COLOR} `}} onClick={()=>setTab(tabList[1])}>
                      <p>{tabList[1]}</p>
                  </div>
              </div>
              <br/> <br/> <br/>
              <SearchInput description={'키워드로 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={()=>onClickSearch()}/>
                <div style={{width: '100%', marginTop:20}}>

                  {
                    !isSearched ?
                    searchList.map((v: IMachineLine, i)=>{ 
                      return ( 
                        
                          <SearchedList key={i} pk={v.pk} option={v.end_date !== '' ? '작업완료 : ' + v.end_date : ''} widths={['15%', '60%']} contents={[v.group, v.name]} isIconDimmed={false} isSelected={checkList.find((k)=> k.pk === v.pk)? true : false } 
                            onClickEvent={()=>{
                              const tempList = checkList.slice()
                              if(checkList.find((k, index)=> k.pk === v.pk) ){
                                  const idx = checkList.indexOf(v)
                                  tempList.splice(idx, 1)
                                  setCheckList(tempList)
                              }else{
                                  tempList.splice(0, 0, v)
                                  setCheckList(tempList)
                              }
                            }} 
       
                          />
                        )
                    })
                    :
                    null
                  }
                </div>
                </>
            </SearchModalContainer>
            {/* 생산제품 검색창 */}
           <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup2(false); 
                setList2(checkList2); 
                setIsSearched(false);
                setKeyword('')}
            }
            isVisible={isPoupup2} onClickClose={()=>{setIsPoupup2(false)}} title={'생산제품 선택'} >
              <>
              <SearchInput description={'생산제품을 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={()=>onClickSearch()}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    !isSearched ?
                    searchList2.map((v: IProductSearched, i)=>{ 
                      return ( 
                        
                          <SearchedList key={i} pk={v.pk} widths={['15%', '15%', '70%']} contents={[v.product_code, v.molds, v.product_name]} isIconDimmed={false} isSelected={checkList2.find((k)=> k.pk === v.pk)? true : false } 
                            onClickEvent={()=>{
                              const tempList = checkList2.slice()
                              if(checkList2.find((k, index)=> k.pk === v.pk) ){
                                  const idx = checkList2.indexOf(v)
                                  tempList.splice(idx, 1)
                                  setCheckList2(tempList)
                              }else{
                                  tempList.splice(0, 0, v)
                                  setCheckList2(tempList)
                              }
                            }} 
       
                          />
                        )
                    })
                    :
                    null
                  }
                </div>
                </>
            </SearchModalContainer>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}



export default TaskRegister;