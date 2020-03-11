import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import { getToken } from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_REGISTER, ROUTER_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getParameter, postRequest, getRequest } from '../../Common/requestFunctions';
import InputContainer from '../../Containers/InputContainer';
import DropdownInput from '../../Components/Input/DropdownInput';
import CustomIndexInput from '../../Components/Input/CustomIndexInput';
import SmallButton from '../../Components/Button/SmallButton';
import AddInput from '../../Components/Input/AddInput';
import FullAddInput from '../../Components/Input/FullAddInput';
import TextList from '../../Components/List/TextList';
import SearchInput from '../../Components/Input/SearchInput';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import AddList from '../../Components/List/AddList';
interface IInfo {
  title: string,
  value: string,
}

// 생산품 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const RegisterProduct = () => {

  const [pk, setPk] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [spec, setSpec] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [info, setInfo] = useState<IInfo[]>([]);

  //검색관련
  const [isPoupup, setIsPoupup] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [checkList, setCheckList] = useState<IMold[]>([]);
  const [list, setList] = useState<IMold[]>([]);
  const [searchList, setSearchList] = useState<IMold[]>([]);

  useEffect(()=>{

    const param = getParameter('pk');
    if(param !== ""){
        setPk(param)
        alert(`수정 페이지 진입 - pk :` + param)
        setIsUpdate(true)
    }

  },[]) 

  /**
   * getData()
   * 자재 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 자재 pk
   * @returns X 
   */
  const getData = useCallback((e)=>{
    
    const res = getRequest(BASE_URL + '/api/v1/product/view/' + pk, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const results = res.results;
         setName('');
          setList([]);
         setCode('');
         setSpec('');
         setPk('');
         setInfo([]);
      }else if(res.status === 1001 || res.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, list, code, info, spec, name]);

  /**
   * onsubmitForm()
   * 생산품 정보 등록
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {array} info 추가정보 리스트
   * @param {string} list 금형 리스트
   * @param {string} code 코드
   * @returns X 
   */
  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();
     //TODO: 지울것
    alert('테스트 : 전송 - ' + code + name + info + list + spec + info );
    return;
    const data = {
        material_name: name,
        material_code: code,
        material_spec: spec,
        molds: list,
        info_list : info
    }

    const res = postRequest(BASE_URL + '/api/v1/material/register' + pk, data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')
      }else if(res.status === 1001){
        //TODO:
      }else{
        //TODO:  기타 오류
      }
    }

  },[list, code, name, spec,info, pk])


  /**
   * onsubmitFormUpdate()
   * 생산품 정보 수정
   * @param {string} url 요청 주소
   * @param {string} pk pk
   * @param {string} name 이름
   * @param {array} info 항목 리스트
   * @param {string} list 금형리스트
   * @param {string} code 코드
   * @returns X 
   */
  const onsubmitFormUpdate = useCallback((e)=>{
    e.preventDefault();
     //TODO: 지울것
    alert('테스트 : 전송 - ' + pk +  code + name + info + list + spec + info );
    return;
    const data = {
        pk: pk,
        material_name: name,
        material_code: code,
        material_spec: spec,
        molds: list,
        info_list : info
    }

    const res = postRequest(BASE_URL + '/api/v1/material/update' + pk, data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 수정 되었습니다')
      }else if(res.status === 1001){
        //TODO:
      }else{
        //TODO:  기타 오류
      }
    }

  },[list, code, name, spec, info, pk])


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


  return (
      <DashboardWrapContainer>
        <SubNavigation list={isUpdate ? ROUTER_LIST :ROUTER_REGISTER}/>
        <InnerBodyContainer>
            <Header title={isUpdate ? '생산제품 정보수정' : '생산제품 정보등록'}/>
            <WhiteBoxContainer>
             <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
             <NormalInput title={'생산제품 이름'} value={name} onChangeEvent={setName} description={'이름을 입력하세요'} />
             <NormalInput title={'생산제품 코드'} value={code} onChangeEvent={setCode} description={'제조번호를 입력하세요'} />
             <NormalInput title={'스펙'} value={spec} onChangeEvent={setSpec} description={'스펙을 입력하세요'} />


             {/* 팝업 여는 버튼 + 기계추가 */}
             <AddInput title={''} onChangeEvent={()=>{
                  setIsPoupup(true);  
                  setCheckList(list); 
                  setKeyword('')}
                  }>
                {
                  list.map((v: IMold, i)=>{ 
                    return ( 
                        <TextList key={i} onClickEvent={()=>{
                          const tempList = list.slice()
                          const idx = list.indexOf(v)
                          tempList.splice(idx, 1)
                          setList(tempList)
                        }} 
                        title={v.mold_code} name={v.mold_name}/>                    
                    )
                  })
                }
                </AddInput>

                
             {/* 자유항목 입력 창 */}
             <FullAddInput title={'자유 항목'} onChangeEvent={()=>{
               const tempInfo = info.slice();
               tempInfo.push({title:`자유 항목 ${info.length + 1}`, value:""});
               setInfo(tempInfo)
             }}>
              {
                info.map((v: IInfo, i)=>{
                  return(
                      <CustomIndexInput index={i} value={v} 
                      onRemoveEvent={()=>{
                        const tempInfo = info.slice();
                        tempInfo.splice(i, 1)
                        setInfo(tempInfo)
                      }} 
                      onChangeEvent={(obj: IInfo)=>{
                        const tempInfo = info.slice();
                        tempInfo.splice(i, 1, obj)
                        setInfo(tempInfo)
                      }} 
                      />
                  )
                })
              }
              </FullAddInput>
      
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
            isVisible={isPoupup} onClickClose={()=>{setIsPoupup(false)}} title={'금형 선택'} >
              <SearchInput description={'금형을 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={()=>onClickSearch()}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    !isSearched ?
                    searchList.map((v: IMold, i)=>{ 
                      return ( 
                      
                          <AddList key={i} pk={v.mold_name} dim={false} selected={checkList.find((k)=> k.pk === v.pk)? true : false } 
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
                            title={v.mold_code} name={v.mold_name} 
                          />
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


export default RegisterProduct;