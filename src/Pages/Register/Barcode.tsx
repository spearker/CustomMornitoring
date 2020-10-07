import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import {getToken} from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions';
import DropdownInput from '../../Components/Input/DropdownInput';
import {getBarcodeTypeList} from '../../Common/codeTransferFunctions';
import ListHeader from '../../Components/Text/ListHeader';

interface IInfo {
  title: string,
  value: string,
}

// 바코드 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const RegisterBarcode = () => {

  const [pk, setPk] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [spec, setSpec] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [info, setInfo] = useState<IInfo[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<number>(0);
  const indexList = getBarcodeTypeList('kor')


  useEffect(()=>{
    //setIsSearched(true)
    //setSearchList(dataSet.moldList);
    if(getParameter('pk') !== "" ){
        setPk(getParameter('pk'))
        ////alert(`수정 페이지 진입 - pk :` + param)
        setIsUpdate(true)
        getData()
    }

  },[])

  /**
   * getData()
   * 자재 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 자재 pk
   * @returns X
   */
  const getData = useCallback(async()=>{

    const res = await getRequest('http://61.101.55.224:8299/api/v1/barcode/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const data = res.results;

          setType(Number(data.type));
          setName(data.name);
          setCode(data.code);
          setSpec(data.description);
          setPk(data.pk);

      }else if(res.status === 1001 || res.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, code, spec, name, type]);

  /**
   * onsubmitForm()
   * 자재 정보 등록
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {array} info 항목 리스트
   * @param {string} made 유통사
   * @param {string} spec 종류
   * @param {string} code 코드
   * @returns X
   */
  const onsubmitForm = useCallback(async(e)=>{
    e.preventDefault();
     //TODO: 지울것
      ////alert(info)
     if(name == "" || code == ""){
       //alert('이름, 코드, 타입은 필수 항목입니다. ')
       return;
     }

     if(code.includes('_')){
      //alert('코드에 _(언더바) 특수문자를 사용 할 수 없습니다.')
      return;
     }

    const data = {
        name: name,
        code: code,
        description: spec,
        type: type,

    }

    const res = await postRequest('http://61.101.55.224:8299/api/v1/barcode/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         //alert('성공적으로 등록 되었습니다')
         setName('')
         setCode('')
         setSpec('')
         setType(0)


      }else{
        //alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
        //TODO:  기타 오류
      }
    }

  },[ code, name, spec, pk, type])


  /**
   * onsubmitFormUpdate()
   * 자재 정보 수정
   * @param {string} url 요청 주소
   * @param {string} pk pk
   * @param {string} name 이름
   * @param {array} info 항목 리스트
   * @param {string} made 유통사
   * @param {string} spec 종류
   * @param {string} code 코드
   * @returns X
   */
  const onsubmitFormUpdate = useCallback(async(e)=>{
    e.preventDefault();
     //TODO: 지울것
    ////alert('테스트 : 전송 - ' + pk +  code + name + info + made + spec + info );
    //return;



    const data = {
        pk: pk,
        name: name,
        code: code,
        description: spec,
        type: type,
    }

    if(name == "" || code == ""){
      //alert('이름, 코드, 타입은 필수 항목입니다. ')
      return;
    }

    if(code.includes('_')){
     //alert('코드에 _(언더바) 특수문자를 사용 할 수 없습니다.')
     return;
    }


    const res = await postRequest('http://61.101.55.224:8299/api/v1/barcode/update', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         //alert('성공적으로 수정 되었습니다')
      }else{
        //TODO:  기타 오류
      }
    }

  },[ code, name, spec, pk, type])


  return (
      <DashboardWrapContainer index={0}>
        <SubNavigation list={ROUTER_MENU_LIST[0]}/>
        <InnerBodyContainer>
            <Header title={isUpdate ? '바코드 기본정보 수정' : '바코드 기본정보 등록'}/>
            <WhiteBoxContainer>
             <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
             <ListHeader title="필수 항목"/>
             <NormalInput title={'바코드 이름'} value={name} onChangeEvent={setName} description={'이름 혹은 별칭을 입력하세요'} />
             <NormalInput title={'바코드 규칙'} value={code} onChangeEvent={setCode} description={'규칙이 되는 기본 코드를 입력하세요 ex) SIZL-0000-0000'} />
             <DropdownInput title={'바코드 타입'} target={indexList[type]} contents={indexList} onChangeEvent={(v)=>setType(v)} />

             <br/>
            <ListHeader title="선택 항목"/>
             <NormalInput title={'바코드 설명'} value={spec} onChangeEvent={setSpec} description={'바코드의 설명을 입력하세요'} />



              <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />
              </form>
            </WhiteBoxContainer>

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


export default RegisterBarcode;
