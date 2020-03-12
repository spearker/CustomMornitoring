import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton';
import Axios from 'axios';
import {dataSet} from '../../Common/dataset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import ThisHeader from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import { getToken } from '../../Common/tokenFunctions';
import { Button, Modal } from 'react-bootstrap';
import BasicModal from '../../Containers/SearchModalContainer';
import AddInput from '../../Components/Input/AddInput';
import SearchInput from '../../Components/Input/SearchInput';
import SmallButton from '../../Components/Button/SmallButton';
import AddList from '../../Components/List/AddList';
import TextList from '../../Components/List/TextList';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_REGISTER, ROUTER_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import DropdownInput from '../../Components/Input/DropdownInput';
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';
import IcButton from '../../Components/Button/IcButton';
import InputContainer from '../../Containers/InputContainer';
import Header from '../../Components/Text/Header';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import PopupButtons from '../../Components/Button/PopupButtons';



// 라인 정보 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const RegisterLine= () => {

  const [pk, setPk] = useState<string>('');
  const [no, setNo] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  //검색관련
  const [isPoupup, setIsPoupup] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [checkList, setCheckList] = useState<IMachine[]>([]);
  const [list, setList] = useState<IMachine[]>([]);
  const [searchList, setSearchList] = useState<IMachine[]>([]);

  useEffect(()=>{
    setSearchList(dataSet.machineList)
    const param = getParameter('pk');
    if(param !== ""){
        setPk(param)
        setList(dataSet.machineList)
        alert(`수정 페이지 진입 - pk :` + param)
        setIsUpdate(true)
    }

  },[])

  /**
   * getData()
   * 라인 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @returns X 
   */
  const getData = useCallback((e)=>{
    
    const res = getRequest(BASE_URL + '/api/v1/line/view/' + pk, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const results = res.results;
         setList([]);
         setPk('');
         setNo('');
         setInfo('');
      }else if(res.status === 1001 || res.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, list, info, no])



  /**
   * onClickSearch()
   * 라인 키워드 검색
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

    const res = getRequest(BASE_URL + '/api/v1/procedure/search?keyword=' + keyword, getToken(TOKEN_NAME))

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

  
  /**
   * onClickCheck()
   * 체크박스 선택
   * @param {string} id 체크 항목의 pk
   * @returns X 
   */
  const onClickCheck = useCallback((id: string)=>{

    /*
    console.log('체크박스 선택: ' + checkList.length + ' / ' +id)
    let tempArray = checkList.filter((v)=>(v !== id));
    if(checkList.indexOf(id) !== -1){
      setCheckList(tempArray);
    }else{
      if(checkList.length === 0){
        let tempArray = new Array();
        tempArray.push(id);
        setCheckList(tempArray);  
      }else{
        let tempArray = checkList.map((v)=>(v));
        tempArray.push(id);
        setCheckList(tempArray);
      }
    }
    console.log('체크박스 처리결과: ' + tempArray);
    */
  },[checkList])

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();
    console.log('--onSubmitForm')
   
  },[ no, info])

  return (
      <DashboardWrapContainer>
        <SubNavigation list={isUpdate ? ROUTER_LIST : ROUTER_REGISTER}/>
        <InnerBodyContainer>
            <Header title={isUpdate ? '라인 정보수정' : '라인 정보등록'}/>
            <WhiteBoxContainer>
              <form onSubmit={onsubmitForm} >
                <NormalInput title={'라인 번호'} value={no} onChangeEvent={setNo} description={'라인의 번호를 지정하세요'} />
                <NormalInput title={'라인 상세정보'} value={info} onChangeEvent={setInfo} description={'라인의 상세 정보를 자유롭게 작성하세요'} />
                {/* 팝업 여는 버튼 + 기계추가 */}
                <AddInput title={'기계 추가'} icType="solo" onChangeEvent={()=>{
                  setIsPoupup(true);  
                  setCheckList(list); 
                  setKeyword('')}
                  }>
                {
                  list.map((v, i)=>{ 
                    return ( 
                        <TextList key={i} onClickEvent={()=>{
                          const tempList = list.slice()
                          const idx = list.indexOf(v)
                          tempList.splice(idx, 1)
                          setList(tempList)
                        }} 
                        title={v.machine_code} name={v.machine_name}/>                    
                    )
                  })
                }
                </AddInput>
                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />  
                
              </form>
            </WhiteBoxContainer>

            {/* 검색창 */}
            <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup(false); 
                setList(checkList); 
                setKeyword('')}
            }
            isVisible={isPoupup} onClickClose={()=>{setIsPoupup(false)}} title={'기계 선택'} >
              <SearchInput description={'기계를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={()=>onClickSearch()}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    !isSearched ?
                    searchList.map((v: IMachine, i)=>{ 
                      return ( 
                          !v.is_registered ? //다른 라인에 등록되어있으면 선택 불가
                          <AddList key={i} pk={v.machine_code} dim={false} selected={checkList.find((k)=> k.pk === v.pk)? true : false } 
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
                            title={v.machine_code} name={v.machine_name} 
                          />
                          :
                          <AddList key={i} pk={v.machine_code} dim={true} selected={false} onClickEvent={()=>{}} title={v.pk} name={v.machine_name} />
                      )
                    })
                    :
                    null
                  }
                </div>
            </SearchModalContainer>
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default RegisterLine;