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
import {    ROUTER_MENU_LIST } from '../../Common/routerset';
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
const MaintenanceRegisterContainer = () => {

  const [pk, setPk] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [term, setTerm]= useState<number>(30);
  const [infoList, setInfoList] = useState<IInfo[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [type, setType]= useState<string>('machine')
  const [targetPk, setTargetPk] = useState<string>('');
  //검색관련
  const [isPoupup, setIsPoupup] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  const [list, setList] = useState<ISearchedList[] >([]);
  const [checkList, setCheckList] = useState<ISearchedList[] >([]);
  const [searchList, setSearchList] = useState<ISearchedList[]>([]);

  const [isPoupup2, setIsPoupup2] = useState<boolean>(false);
  const [list2, setList2] = useState<ISearchedList []>([]);
  const [checkList2, setCheckList2] = useState<ISearchedList []>([]);
  const [searchList2, setSearchList2] = useState<ISearchedList[] >([]);

  const [isPoupup3, setIsPoupup3] = useState<boolean>(false);
  const [list3, setList3] = useState<ISearchedList []>([]);
  const [checkList3, setCheckList3] = useState<ISearchedList[] >([]);
  const [searchList3, setSearchList3] = useState<ISearchedList[] >([]);

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
        setType(getParameter('type'))
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

    const res = await getRequest('http://211.208.115.66:8299/api/v1/preserve/view?pk=' + getParameter('pk') + '&type=' + getParameter('type')  , getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{

      if(res.status === 200){
          setPk(getParameter('pk'));
          const data = res.results;
          setTempInfo(data.target)
          setInfoList(data.info_list)
          setType(data.type)

      }else if(res.status === 1001 || res.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, name, list, list2, list3, term,type, infoList, targetPk]);

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
    if(type === 'machine' && list3 !== []){
      tPk = list3[0].pk
    }else if(type==='mold'&& list2 !== []){
      tPk = list2[0].pk
    }else if(type==='peripheral'&& list !== []){
      tPk = list[0].pk
    }

    if(tPk === '' || tPk== undefined){
      return
    }
    const data = {
        type: type,
        target_pk: tPk,
        term:term,
        info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,
    }

    const res = await postRequest('http://211.208.115.66:8299/api/v1/preserve/register', data, getToken(TOKEN_NAME))

    if(res === false){
      alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')

         setType('machine')

         setList([]);
         setList2([]);
         setList3([]);
         setInfoList([])
         setTerm(30)

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

    const data = {
         pk:getParameter('pk'),
        type: type,
        term: term,
        target_pk: tempInfo!== undefined ? tempInfo.pk : '',
        info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

    }
    const res = await postRequest('http://211.208.115.66:8299/api/v1/preserve/update', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
      alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
    }else{
      if(res.status === 200){
         alert('성공적으로 업데이트 되었습니다')

      }else{
        alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
        //TODO:  기타 오류
      }
    }
  },[pk, name, list, list2, list3, type, term,infoList, tempInfo])
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

    const res = await getRequest(`http://211.208.115.66:8299/api/v1/common/search?keyword=${keyword}&type=${type}&orderBy=1` , getToken(TOKEN_NAME))

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
      <div>

            <Header title={isUpdate ? '보전 수정' : '보전 등록'}/>
            <WhiteBoxContainer>
             <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
               {
                 isUpdate ?
                <NormalInput title={'이름'} value={tempInfo !== undefined ? tempInfo.name :''} description={''}/>
                 :
               <>
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

               <AddInput title={'보전 주변장치'} icType="solo" onlyOne={list.length > 0 ? true: false} onChangeEvent={()=>{
                setIsPoupup(true);
                setCheckList(list);
                setKeyword('')
                setList([])}
                }>
              {
                list.map((v: ISearchedList, i)=>{
                  return (
                      <TextList key={i}
                      onClickSearch={()=>{
                        setIsPoupup(true);
                        setKeyword('');
                        setIsSearched(false);
                      }}
                      onClickEvent={()=>{
                        setList([])
                      }}
                      title={v.name !== undefined ? v.name : ""} name={v.code}/>
                  )
                })
              }
                </AddInput>
                :
                null}
                {/* 팝업 여는 버튼 + 사용금형 추가 */}
                {
               type === 'mold' ?
               <AddInput title={'보전 금형'} icType="solo" onlyOne={list2.length > 0 ? true: false} onChangeEvent={()=>{
                setIsPoupup2(true);
                setCheckList2(list);
                setKeyword('')
                setList2([])}
                }>
              {
                list2.map((v: ISearchedList, i)=>{
                  return (
                      <TextList key={i}
                      onClickSearch={()=>{
                        setIsPoupup2(true);
                        setKeyword('');
                        setIsSearched(false);
                      }}
                      onClickEvent={()=>{
                        setList2([])
                      }}
                      title={v.name !== undefined ? v.name : ""} name={v.code}/>
                  )
                })
              }
                </AddInput>
        :null}

                {/* 팝업 여는 버튼 + 기계 정보 추가 */}
                {
               type === 'machine' ?
               <AddInput title={'보전 기계'} icType="solo" onlyOne={list3.length > 0 ? true: false} onChangeEvent={()=>{
                setIsPoupup3(true);
                setCheckList3(list3);
                setKeyword('')
                setList3([])}
                }>
              {
                list3.map((v: ISearchedList, i)=>{
                  return (
                      <TextList key={i}
                      onClickSearch={()=>{
                        setIsPoupup3(true);
                        setKeyword('');
                        setIsSearched(false);
                      }}
                      onClickEvent={()=>{
                        setList3([])
                      }}
                      title={v.name !== undefined ? v.name : ""} name={v.code}/>
                  )
                })
              }
                </AddInput>
           :
           null}
           </>
           }

            {/* 자유항목 입력 창 */}
            <FullAddInput title={'보전 기준'} onChangeEvent={()=>{
                  const tempInfo = infoList.slice();
                  tempInfo.push({title:`보전 기준 항목 ${infoList.length + 1}`, value:""});
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


            {/*  검색창 */}
            <SearchModalContainer
              onClickEvent={ //닫혔을 때 이벤트
                ()=>{
                setIsPoupup(false);
                setList(checkList);
                setKeyword('')}
            }
            isVisible={isPoupup} onClickClose={()=>{setIsPoupup(false); setKeyword(''); setIsSearched(false); setSearchList([]); }} title={'기준 검색'} >
              <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList.map((v: ISearchedList, i)=>{
                      return (
                         <SearchedList key={i} pk={v.pk} widths={['52%', '52%']} contents={[v.name, v.code !== undefined ? v.code: '']} isIconDimmed={false} isSelected={checkList.find((k)=> k.pk === v.pk)? true : false }
                             onClickEvent={()=>{

                              const tempList = checkList.slice()
                              tempList.splice(0, 1, v)
                              setCheckList(tempList)
                            }}
                          />

                      )})
                    :
                    null
                  }
                </div>
            </SearchModalContainer>


          <SearchModalContainer
              onClickEvent={ //닫혔을 때 이벤트
                ()=>{
                setIsPoupup2(false);
                setList2(checkList2);
                setKeyword('')}
            }
            isVisible={isPoupup2} onClickClose={()=>{setIsPoupup2(false); setKeyword(''); setIsSearched(false); setSearchList2([]); }} title={'검색'} >
              <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList2.map((v: ISearchedList, i)=>{
                      return (
                         <SearchedList key={i} pk={v.pk} widths={['52%', '52%']} contents={[v.name, v.code !== undefined ? v.code: '']} isIconDimmed={false} isSelected={checkList2.find((k)=> k.pk === v.pk)? true : false }
                             onClickEvent={()=>{

                              const tempList = checkList2.slice()
                              tempList.splice(0, 1, v)
                              setCheckList2(tempList)
                            }}
                          />

                      )})
                    :
                    null
                  }
                </div>
            </SearchModalContainer>


            <SearchModalContainer
              onClickEvent={ //닫혔을 때 이벤트
                ()=>{
                setIsPoupup3(false);
                setList3(checkList3);
                setKeyword('')}
            }
            isVisible={isPoupup3} onClickClose={()=>{setIsPoupup3(false); setKeyword(''); setIsSearched(false); setSearchList3([]); }} title={'검색'} >
              <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList3.map((v: ISearchedList, i)=>{
                      return (
                         <SearchedList key={i} pk={v.pk} widths={['52%', '52%']} contents={[v.name, v.code !== undefined ? v.code: '']} isIconDimmed={false} isSelected={checkList3.find((k)=> k.pk === v.pk)? true : false }
                             onClickEvent={()=>{

                              const tempList = checkList3.slice()
                              tempList.splice(0, 1, v)
                              setCheckList3(tempList)
                            }}
                          />

                      )})
                    :
                    null
                  }
                </div>
            </SearchModalContainer>

      </div>

  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`



export default MaintenanceRegisterContainer;
