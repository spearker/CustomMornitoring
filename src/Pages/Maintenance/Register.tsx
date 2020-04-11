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
import { ROUTER_REGISTER, ROUTER_LIST, ROUTER_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getParameter, postRequest, getRequest } from '../../Common/requestFunctions';
import InputContainer from '../../Containers/InputContainer';
import DropdownInput from '../../Components/Input/DropdownInput';
import CustomIndexInput from '../../Components/Input/CustomIndexInput';
import SmallButton from '../../Components/Button/SmallButton';
import AddInput from '../../Components/Input/AddInput';
import FullAddInput from '../../Components/Input/FullAddInput';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import TextList from '../../Components/List/TextList';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchInput from '../../Components/Input/SearchInput';
import AddList from '../../Components/List/AddList';
import { dataSet } from '../../Common/dataset';
import SearchedList from '../../Components/List/SearchedList';
import MachineList from '../List/Machine';
import SearchedMachineList from '../../Components/List/SearchedMachineList';

interface IInfo {
  title: string,
  value: string,
}

interface ITempInfo {
  pk: string,
  name: string,
}

// 보전 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const RegisterMaintenance = () => {

  const [pk, setPk] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [infoList, setInfoList] = useState<IInfo[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [type, setType]= useState<string>('machine')
  //검색관련
  const [isPoupup, setIsPoupup] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  
  const [list, setList] = useState<ISubMachine >();
  const [checkList, setCheckList] = useState<ISubMachine >();
  const [searchList, setSearchList] = useState<ISubMachine[]>([]);

  const [isPoupup2, setIsPoupup2] = useState<boolean>(false);
  const [list2, setList2] = useState<IMold >();
  const [checkList2, setCheckList2] = useState<IMold >();
  const [searchList2, setSearchList2] = useState<IMold[] >([]);

  const [isPoupup3, setIsPoupup3] = useState<boolean>(false);
  const [list3, setList3] = useState<IMachine >();
  const [checkList3, setCheckList3] = useState<IMachine >();
  const [searchList3, setSearchList3] = useState<IMachine[] >([]);

  const [tempInfo, setTempInfo] = useState<ITempInfo >();

  useEffect(()=>{
    //setIsSearched(true)
    //setSearchList(dataSet.materialList);
    //setSearchList3(dataSet.machineList);

    if(getParameter('pk') !== "" ){
        setPk(getParameter('pk'))
        //alert(`수정 페이지 진입 - pk :` + param)
        setIsUpdate(true)
        getData()
    }

  },[]) 

  /**
   * getData()
   * 공정 조회
   * @param {string} url 요청 주소
   * @param {string} pk 자재 pk
   * @returns X 
   */
  const getData = useCallback(async()=>{
    
    const res = await getRequest('http://211.208.115.66:8088/api/v1/preserve/view?pk=' + getParameter('pk') + '?type=' + getParameter('type')  , getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{

      if(res.status === 200){
          setType(getParameter('pk'));
          const data = res.results;
          setTempInfo(data.target)
          setInfoList(data.info_list)
       
        
      }else if(res.status === 1001 || res.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, name, list, list2, list3, type, infoList]);

  /**
   * onsubmitForm()
   * 공정 정보 등록
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {string} mold 금형 pk
   * @param {string} material 자재 pk
   * @param {string} output 생산품 pk
   * @param {string} machine 기계 pk
   * @returns X 
   */
  const onsubmitForm = useCallback(async(e)=>{
    e.preventDefault();
     //TODO: 지울것
    
   
    //alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
    //return;
    let tPk = '';
    if(type === 'machine' && list !== undefined){
      tPk = list!.pk
    }else if(type==='mold'&& list2 !== undefined){
      tPk = list2!.pk
    }else if(type==='peripheral'&& list3 !== undefined){
      tPk = list3!.pk
    }
 
    if(tPk === '' || tPk== undefined){
      return
    }
    const data = {
        type: type,
        target_pk:tPk,
        info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,
    }

    const res = await postRequest('http://211.208.115.66:8088/api/v1/preserve/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')

         setType('machine')
         setList(undefined);
         setList2(undefined)
         setList3(undefined)
         setInfoList([])

      }else{
        alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
        //TODO:  기타 오류
      }
    }

  },[pk, name, list, list2, list3, type, infoList])


  /**
   * onsubmitFormUpdate()
   * 공정 정보 수정
   * @param {string} url 요청 주소
   * @param {string} pk pk
   * @param {string} name 이름
   * @param {array} mold 금형 pk
   * @param {string} material 자재 pk
   * @param {string} output 생산품 pk
   * @param {string} machine 기계 pk
   * @returns X 
   */
  const onsubmitFormUpdate = useCallback(async(e)=>{
    e.preventDefault();
     
    let tPk = '';
    if(type === 'machine' && list !== undefined){
      tPk = list!.pk
    }else if(type==='mold'&& list2 !== undefined){
      tPk = list2!.pk
    }else if(type==='peripheral'&& list3 !== undefined){
      tPk = list3!.pk
    }
 
    if(tPk === '' || tPk== undefined){
      return
    }
    const data = {
         pk:getParameter('pk'),
        type: type,
        target_pk:tPk,
        info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,
        
    }
    const res = await postRequest(BASE_URL + '/api/v1/material/update/' + getParameter('pk'), data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 업데이트 되었습니다')

      }else{
        alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
        //TODO:  기타 오류
      }
    }
  },[pk, name, list, list2, list3, type, infoList])
/**
   * onClickSearch()
   *  키워드 검색
   * @param {string} url 요청 주소
   * @param {string} keyword 검색 키워드
   * @returns X 
   */
  const onClickSearch = useCallback(async(e)=>{
  
    e.preventDefault();
    let type = "material";

    if(isPoupup === true ){
      type= 'peripheral'
    }else if(isPoupup2 === true){
      type= 'mold'
    }else if(isPoupup3 === true){
      type= 'machine'
    }else{
      return;
    }

    if(keyword  === '' || keyword.length < 2){
      alert('2글자 이상의 키워드를 입력해주세요')

      return;
    } 
    setIsSearched(true)

    const res = await getRequest(`http://211.208.115.66:8088/api/v1/${type}/search?keyword=` + keyword, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const results = res.results;
         if(isPoupup === true ){
          setSearchList(results);
        }else if(isPoupup2 === true){
          setSearchList2(results);
        }else if(isPoupup3 === true){
          setSearchList3(results);
        }else{
          return;
        }
    
         
      }else{
        //TODO:  기타 오류
      }
    }
  },[keyword])

  return (
      <DashboardWrapContainer index={5}>
        <SubNavigation list={ROUTER_MENU_LIST[5]}/>
        <InnerBodyContainer>
            <Header title={isUpdate ? '보전 수정' : '보전 등록'}/>
            <WhiteBoxContainer>
             <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
             <div style={{display:'flex', alignItems:'center',marginTop:12, marginBottom:24}}>
              <div style={{paddingLeft:1, paddingTop:5}}>
                <input type="radio" id="cb" name="type" checked={type === 'machine' ? true: false} onClick={(e)=>{setType('machine')}}/>
                <label htmlFor="cb"></label>
              </div>
              <div>
                <span style={{paddingLeft:4,fontSize:14, marginRight:20}}>기계</span> 
              </div>
              <div style={{paddingLeft:1, paddingTop:5}}>
                <input type="radio" id="cb2"  name="type"  checked={type === 'peripheral' ? true: false} onClick={(e)=>{setType('peripheral')}}/>
                <label htmlFor="cb2"></label>
              </div>
              <div>
                <span style={{paddingLeft:4,fontSize:14, marginRight:20}}>주변장치</span> 
              </div>
              <div style={{paddingLeft:1, paddingTop:5}}>
                <input type="radio" id="cb3"  name="type" checked={type === 'mold' ? true: false}  onClick={(e)=>{setType('mold')}}/>
                <label htmlFor="cb3"></label>
              </div>
              <div>
                <span style={{paddingLeft:4,fontSize:14, marginRight:20}}>금형</span> 
              </div>
            </div>
             {/* 팝업 여는 버튼 + 보전 주변장치 추가 */}
             {
               type === 'peripheral' ? 
           
             <AddInput title={'보전 주변장치'} icType="solo" onlyOne={true} onChangeEvent={()=>{
                  setIsPoupup(true);  
                  setCheckList(list); 
                  setKeyword('')}
                  }>
                    {
                     list !== undefined?
                      <TextList 
                        onClickSearch={()=>{
                          setIsPoupup(true);
                          setKeyword(''); 
                          setIsSearched(false);
                        }}
                        onClickEvent={()=>{
                          setList(undefined)
                        }} 
                        title={list.device_name} name={""}/>      
                        :
                        <TextList 
                        onClickSearch={()=>{
                          setIsPoupup(true);
                          setKeyword(''); 
                          setIsSearched(false);
                        }}
                        onClickEvent={()=>{
                          setList(undefined)
                        }} 
                        title={tempInfo !== undefined ? tempInfo.name :'' } name={""}/>      
                        
                    }

                </AddInput>
                :
                null}
                {/* 팝업 여는 버튼 + 사용금형 추가 */}
                {
               type === 'mold' ? 
             <AddInput title={'보전 금형 '} icType="solo" onlyOne={true} onChangeEvent={()=>{
                  setIsPoupup2(true);  
                  setCheckList2(list2); 
                  setKeyword('')}
                  }>
                {
                     list2 !== undefined?
                      <TextList 
                        onClickSearch={()=>{
                          setIsPoupup2(true);
                          setKeyword(''); 
                          setIsSearched(false);
                        }}
                        onClickEvent={()=>{
                          setList2(undefined)
                        }} 
                        title={list2.mold_name} name={""}/>      
                        :
                        <TextList 
                        onClickSearch={()=>{
                          setIsPoupup2(true);
                          setKeyword(''); 
                          setIsSearched(false);
                        }}
                        onClickEvent={()=>{
                          setList2(undefined)
                        }} 
                        title={tempInfo !== undefined ? tempInfo.name :'' } name={""}/>      
                        
                    }
                </AddInput>
        :null}

                {/* 팝업 여는 버튼 + 기계 정보 추가 */}
                {
               type === 'machine' ? 
             <AddInput title={'보전 기계 '} icType="solo" onlyOne={true} onChangeEvent={()=>{
                  setIsPoupup3(true);  
                  setCheckList3(list3); 
                  setKeyword('')}
                  }>
                
                {
                  list3 !== undefined?
                   <TextList 
                     onClickSearch={()=>{
                       setIsPoupup3(true);
                       setKeyword(''); 
                       setIsSearched(false);
                     }}
                     onClickEvent={()=>{
                       setList3(undefined)
                     }} 
                     title={list3.machine_name} name={""}/>      
                     :
                     <TextList 
                     onClickSearch={()=>{
                       setIsPoupup3(true);
                       setKeyword(''); 
                       setIsSearched(false);
                     }}
                     onClickEvent={()=>{
                       setList3(undefined)
                     }} 
                     title={tempInfo !== undefined ? tempInfo.name :'' } name={""}/>      
                     
                 }
                </AddInput>
           :
           null}
            {/* 자유항목 입력 창 */}
            <FullAddInput title={'자유 항목'} onChangeEvent={()=>{
                  const tempInfo = infoList.slice();
                  tempInfo.push({title:`자유 항목 ${infoList.length + 1}`, value:""});
                  setInfoList(tempInfo)
                }}>
                  {
                    infoList.map((v: IInfo, i)=>{
                      return(
                          <CustomIndexInput index={i} value={v} 
                          onRemoveEvent={()=>{
                            const tempInfo = infoList.slice();
                            tempInfo.splice(i, 1)
                            setInfoList(tempInfo)
                          }} 
                          onChangeEvent={(obj: IInfo)=>{
                            const tempInfo = infoList.slice();
                            tempInfo.splice(i, 1, obj)
                            setInfoList(tempInfo)
                          }} 
                          />
                      )
                    })
                  }
                  </FullAddInput>
               

              <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} /> 
              </form>
            </WhiteBoxContainer>

            {/* 주변장치 검색창 */}
            <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup(false); 
                setList(checkList); 
                setTempInfo(undefined);
                setKeyword('')}
            }
            isVisible={isPoupup} onClickClose={()=>{setIsPoupup(false); setKeyword(''); setSearchList([]); setIsSearched(false)}} title={'주변장치 선택'} >
              <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList.map((v: ISubMachine, i)=>{ 
                      return ( 
                    
                          <SearchedList key={i} pk={v.pk} widths={['96%']} contents={[v.device_name]} isIconDimmed={false} isSelected={checkList !== undefined &&checkList.pk === v.pk? true : false } 
                             onClickEvent={()=>{                            
                              setCheckList(v)
                            }} 
                          />
                         
                        )
                    })
                    :
                    null
                  }
                </div>
            </SearchModalContainer>

            {/* 금형 검색창 */}
            <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup2(false); 
                setList2(checkList2); 
                setTempInfo(undefined);
                setKeyword('')}
            }
            isVisible={isPoupup2} onClickClose={()=>{setIsPoupup2(false); setKeyword(''); setIsSearched(false); setSearchList2([]); }} title={'금형 선택'} >
              <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList2.map((v: IMold, i)=>{ 
                      return (
                        <SearchedList key={i} pk={v.pk} widths={['96%']} contents={[v.mold_name]} isIconDimmed={false} isSelected={checkList !== undefined &&checkList.pk === v.pk? true : false } 
                        onClickEvent={()=>{                            
                         setCheckList2(v)
                       }} 
                     />
                      
                      )})
                    :
                    null
                  }
                </div>
            </SearchModalContainer>


            {/* 기계 검색창 */}
            <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup3(false); 
                setList3(checkList3); 
                setTempInfo(undefined);
                setKeyword('')}
            }
            isVisible={isPoupup3} onClickClose={()=>{setIsPoupup3(false); setKeyword(''); setSearchList3([]); setIsSearched(false)}} title={'기계 선택'} >
              <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch}/>
              <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList3.map((v: IMachine, i)=>{ 
                      return (
                        <SearchedList key={i} pk={v.pk} widths={['96%']} contents={[v.machine_name]} isIconDimmed={false} isSelected={checkList !== undefined &&checkList.pk === v.pk? true : false } 
                        onClickEvent={()=>{                            
                         setCheckList3(v)
                       }} 
                     />
                      
                      )})
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


export default RegisterMaintenance;