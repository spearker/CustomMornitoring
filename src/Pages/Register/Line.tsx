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
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import DropdownInput from '../../Components/Input/DropdownInput';
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';
import IcButton from '../../Components/Button/IcButton';
import InputContainer from '../../Containers/InputContainer';
import Header from '../../Components/Text/Header';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import PopupButtons from '../../Components/Button/PopupButtons';
import { ROUTER_MENU_LIST } from '../../Common/routerset';



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
  const [searchList2, setSearchList2] = useState<ISubMachine[]>([]);
  const [isPoupup2, setIsPoupup2] = useState<boolean>(false);
  const [checkList2, setCheckList2] = useState<ISubMachine[]>([]);
  const [list2, setList2] = useState<ISubMachine[]>([]);


  useEffect(()=>{
    //setSearchList(dataSet.machineList)
    //setSearchList2(dataSet.subMachineList)
    if(getParameter('pk') !== "" ){
      setPk(getParameter('pk'))
      //alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData()
    }


  },[])

  /**
   * getData()
   * 라인 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @returns X 
   */
  const getData = useCallback(async()=>{
    
    const res = await getRequest(BASE_URL + '/api/v1/procedure/view/' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const data =res.results;
         setList(data.machines);
         setList2(data.peripherals)
         setPk(data.pk);
         setNo(data.line_code);
         setInfo(data.line_detail);
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, list, info, no, list2])



  /**
   * onClickSearch()
   * 라인 키워드 검색
   * @param {string} url 요청 주소
   * @param {string} keyword 검색 키워드
   * @returns X 
   */
  const onClickSearch = useCallback(async(e)=>{
  
    e.preventDefault();
    //alert('테스트 : keyword - ' + keyword);
    //return;
    if(keyword  === '' || keyword.length < 1){
      alert('2글자 이상의 키워드를 입력해주세요')

      return;
    } 
    setIsSearched(true)

    const res = await getRequest('http://211.208.115.66:8088/api/v1/procedure/search?keyword=' + keyword, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const data = res.results;
         //setKeyword('')
         setSearchList(data);
      }else{
        //TODO:  기타 오류
      }
    }
  },[keyword, searchList, searchList2])

   /**
   * onClickSearch()
   * 주변기기 키워드 검색
   * @param {string} url 요청 주소
   * @param {string} keyword 검색 키워드
   * @returns X 
   */
  const onClickSearch2 = useCallback(async(e)=>{
  
    e.preventDefault();
    //alert('테스트 : keyword - ' + keyword);
    //return;
    if(keyword  === '' || keyword.length < 1){
      alert('2글자 이상의 키워드를 입력해주세요')

      return;
    } 
    setIsSearched(true)

    const res = await getRequest('http://211.208.115.66:8088/api/v1/peripheral/search?keyword=' + keyword, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const data = res.results;
         //setKeyword('')
         setSearchList2(data);
      }else{
        //TODO:  기타 오류
      }
    }
  },[keyword, searchList, searchList2])

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

  const onsubmitForm = useCallback(async(e)=>{
    e.preventDefault();

    if(no === "" ){
      alert("라인 번호는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }

    let pks = new Array();
    let pks2 = new Array();
    list.forEach((v:IMachine, i)=>{
        pks[i] = v.pk
    })
    list2.forEach((v:ISubMachine, i)=>{
      pks2[i] = v.pk
    })
    const data = {
        procedure_code: no,
        procedure_detail: info,
        machines: pks,
        peripherals: pks2,

    }

    const res = await postRequest(BASE_URL + '/api/v1/procedure/register' , data, getToken(TOKEN_NAME))

    if(res === false){
      alert('실패하였습니다. 잠시후 다시 시도해주세요.')
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')
         setPk('')
         setList([]);
         setList2([]);
         setNo('');
         setInfo('')
      
      }else{
        alert('실패하였습니다. 잠시후 다시 시도해주세요.')
      }
    }

  
   
  },[ no, info, list, list2])

  return (
      <DashboardWrapContainer>
     
      
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
                        title={''} name={v.machine_name}/>                    
                    )
                  })
                }
                </AddInput>
                {/* 팝업 여는 버튼 + 주변장치 */}
                <AddInput title={'주변장치 추가'} icType="solo" onChangeEvent={()=>{
                  setIsPoupup2(true);  
                  setCheckList2(list2); 
                  setKeyword('')}
                  }>
                {
                  list2.map((v, i)=>{ 
                    return ( 
                        <TextList key={i} onClickEvent={()=>{
                          const tempList = list2.slice()
                          const idx = list2.indexOf(v)
                          tempList.splice(idx, 1)
                          setList2(tempList)
                        }} 
                        title={v.device_code} name={v.device_name}/>                    
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
                setSearchList([]);
                setKeyword('')}
            }
            isVisible={isPoupup} onClickClose={()=>{setIsPoupup(false); setSearchList([]);}} title={'기계 선택'} >
              <SearchInput description={'기계를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList.map((v: IMachine, i)=>{ 
                      return ( 
                          !v.is_registered ? //다른 라인에 등록되어있으면 선택 불가
                          <AddList key={i} pk={''} dim={false} selected={checkList.find((k)=> k.pk === v.pk)? true : false } 
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
                            title={''} name={v.machine_name} 
                          />
                          :
                          <AddList key={i} pk={''} dim={true} selected={false} onClickEvent={()=>{}} title={v.pk} name={v.machine_name} />
                      )
                    })
                    :
                    null
                  }
                </div>
            </SearchModalContainer>


            {/* 주변장치 검색창 */}
            <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup2(false); 
                setList2(checkList2); 
                setSearchList2([]);
                setKeyword('')}
            }
            isVisible={isPoupup2} onClickClose={()=>{setIsPoupup2(false); setSearchList2([])}} title={'주변장치 선택'} >
              <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch2}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList2.map((v: ISubMachine, i)=>{ 
                      return ( 
                          !v.is_registered ? //다른 라인에 등록되어있으면 선택 불가
                          <AddList key={i} pk={v.pk} dim={false} selected={checkList2.find((k)=> k.pk === v.pk)? true : false } 
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
                            title={v.device_code} name={v.device_name} 
                          />
                          :
                          <AddList key={i} pk={v.pk} dim={true} selected={false} onClickEvent={()=>{}} title={v.device_code} name={v.device_name} />
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