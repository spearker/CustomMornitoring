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
import { uploadTempFile } from '../../Common/fileFuctuons';
import OldFileInput from '../../Components/Input/OldFileInput';

interface IInfo {
  title: string,
  value: string,
}

// 재고 변경 페이지
const StockChangeIn = () => {

  const [pk, setPk] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<Number>(0)
  const [amount, setAmount] = useState<number>(0);
  const [targetPk, setTargetPk]= useState<string>('');
  //검색관련
  const [isPoupup, setIsPoupup] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  
  
  const [list, setList] = useState<ISearchedList[]>([]);
  const [checkList, setCheckList] = useState<ISearchedList[]>([]);
  const [searchList, setSearchList] = useState<ISearchedList[]>([]);

  const [isPoupup2, setIsPoupup2] = useState<boolean>(false);
  const [list2, setList2] = useState<ISearchedList[]>([]);
  const [checkList2, setCheckList2] = useState<ISearchedList[]>([]);
  const [searchList2, setSearchList2] = useState<ISearchedList[]>([]);

  const [paths, setPaths] = useState<any[1]>([null]);
  const [oldPaths, setOldPaths] = useState<any[1]>([null]);


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
    
    const res = await getRequest('http://211.208.115.66:8088/api/v1/process/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{

  
      if(res.status === 200){
       
         const data = res.results;
         setName(data.name);
         setList(new Array(data.material));
         setList(new Array(data.s))
        
      }else if(res.status === 1001 || res.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, name, list, list2]);

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
    
     if (list.length < 1 ||  list2.length<1 ){
      alert('상품, 기준 바코드는 필수 항목입니다. ')
      return;
    }
    //alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
    //return;
    const data = {
      material_pk: list[0].pk,
      barcode_pk: list2[0].pk,
      coder: code,
      photo: paths[0]
    }

    const res = await postRequest('http://211.208.115.66:8088/api/v1/barcode/product/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')
         setName('')
         setList([])
         setList2([])
        
      }else{
        alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
        //TODO:  기타 오류
      }
    }

  },[pk, list, list2, paths])


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
     
    if (list.length < 1 ||  list2.length<1 ){
      alert('상품, 기준 바코드는 필수 항목입니다. ')
      return;
    }
   //alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
   //return;
   const data = {
       pk: getParameter('pk'),
       material_pk: list[0].pk,
      barcode_pk: list2[0].pk,
      coder: code,
      photo: paths[0]
      
   }
    const res = await postRequest(BASE_URL + '/api/v1/barcode/product/update/' + getParameter('pk'), data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 수정 되었습니다')
      }else{
        //TODO:  기타 오류
      }
    }

  },[pk, name, list, list2, paths])

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

    if(isPoupup === true  ){
      type= 'material'
    }else if(isPoupup2 === true){
      type= 'barcode'
    }else{
      return;
    }

    if(keyword  === '' || keyword.length < 2){
      alert('2글자 이상의 키워드를 입력해주세요')

      return;
    } 
    setIsSearched(true)

    const res = await getRequest(`http://211.208.115.66:8088/api/v1/name/search?keyword=${keyword}&type=${type}`, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const results = res.results;
         if(isPoupup === true ){
          setSearchList(results);
        }else if(isPoupup2 === true){
          setSearchList2(results);
        }
    
         
      }else{
        //TODO:  기타 오류
      }
    }
  },[keyword])


   /**
   * addFiles()
   * 사진 등록
   * @param {object(file)} event.target.files[0] 파일
   * @returns X 
   */
  const addFiles = async (event: any, index: number): Promise<void> => {
    console.log(event.target.files[0]);
    console.log(index)
    if(event.target.files[0] === undefined){

      return;
    }
    console.log(event.target.files[0].type);
    if(event.target.files[0].type.includes('image')){ //이미지인지 판별

      const tempFile  = event.target.files[0];
      console.log(tempFile)
      const res = await uploadTempFile(event.target.files[0]);
      
      if(res !== false){
        console.log(res) 
        const tempPatchList= paths.slice()
        tempPatchList[index] = res;
        console.log(tempPatchList) 
        setPaths(tempPatchList)
        return
      }else{
        return
      }
      
    }else{
      
      alert('이미지 형식만 업로드 가능합니다.')
    }
    
  }

 



  return (
      <DashboardWrapContainer index={8}>
        <SubNavigation list={ROUTER_MENU_LIST[8]}/>
        <InnerBodyContainer>
            <Header title={'입고 등록'}/>
            <WhiteBoxContainer>
             <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
             <div style={{display:'flex', alignItems:'center',marginTop:12, marginBottom:8}}>
              <div style={{paddingLeft:1, paddingTop:5}}>
                <input type="radio" id="cb" name="type" checked={type === 0 ? true: false} onClick={(e)=>{setType(0)}}/>
                <label htmlFor="cb"></label>
              </div>
              <div>
                <span style={{paddingLeft:4,fontSize:14, marginRight:20}}>정상 입고</span> 
              </div>
              <div style={{paddingLeft:1, paddingTop:5}}>
                <input type="radio" id="cb2"  name="type"  checked={type === 1 ? true: false} onClick={(e)=>{setType(1)}}/>
                <label htmlFor="cb2"></label>
              </div>
              <div>
                <span style={{paddingLeft:4,fontSize:14, marginRight:20}}>생산으로 소진</span> 
              </div>
              <div style={{paddingLeft:1, paddingTop:5}}>
                <input type="radio" id="cb3"  name="type"  checked={type === 2 ? true: false} onClick={(e)=>{setType(2)}}/>
                <label htmlFor="cb3"></label>
              </div>
              <div>
                <span style={{paddingLeft:4,fontSize:14, marginRight:20}}>기타 (누락 정정 등)</span>
              </div>
              </div>
              
          
             
              {
              targetPk == '' || targetPk == undefined ?
               
              <AddInput title={'재고 품목 선택'} icType="solo" onlyOne={list.length > 0 ? true: false} onChangeEvent={()=>{
                setIsPoupup(true);  
                setCheckList(list); 
                setKeyword('')}
                }>
              {
                list.map((v: IMaterial, i)=>{ 
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
                      title={v.material_code !== undefined ? v.material_code : ""} name={v.material_name}/>                    
                  )
                })
              }
              </AddInput>
              :
              null
            }
        
         
        
              
                <NormalNumberInput title={'입고 수량'} value={amount} onChangeEvent={setAmount} description={'불량 발생 수량을 입력해주세요'} />
             
             
                
              <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} /> 
              </form>
            </WhiteBoxContainer>

            {/* 상품-자재 검색창 */}
            <SearchModalContainer 
              onClickEvent={ //닫혔을 때 이벤트 
                ()=>{
                setIsPoupup(false); 
                setList(checkList); 
                setKeyword('')}
            }
            isVisible={isPoupup} onClickClose={()=>{setIsPoupup(false); setKeyword(''); setSearchList([]); setIsSearched(false)}} title={'상품(자재) 선택'} >
              <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e)=>setKeyword(e.target.value)} onClickEvent={onClickSearch}/>
                <div style={{width: '100%', marginTop:20}}>
                  {
                    isSearched ?
                    searchList.map((v: ISearchedList, i)=>{ 
                      return ( 
                    
                          <SearchedList key={i} pk={v.pk} widths={['52%', '52%']} contents={[v.name, v.code !== undefined ? v.code : ""]} isIconDimmed={false} isSelected={checkList.find((k)=> k.pk === v.pk)? true : false } 
                             onClickEvent={()=>{
                              const tempList = checkList.slice()
                              tempList.splice(0, 1, v)
                              setCheckList(tempList)
                            }} 
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
export default StockChangeIn;