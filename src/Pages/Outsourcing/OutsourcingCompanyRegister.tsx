import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import { getToken } from '../../Common/tokenFunctions';
import BasicModal from '../../Containers/SearchModalContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {    ROUTER_MENU_LIST, MES_MENU_LIST } from '../../Common/routerset';
import DropdownInput from '../../Components/Input/DropdownInput';
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';
import IcButton from '../../Components/Button/IcButton';
import InputContainer from '../../Containers/InputContainer';
import FullAddInput from '../../Components/Input/FullAddInput';
import CustomIndexInput from '../../Components/Input/CustomIndexInput';
import { uploadTempFile } from '../../Common/fileFuctuons';
import {getMachineTypeList} from '../../Common/codeTransferFunctions';
import DateInput from '../../Components/Input/DateInput';
import moment from 'moment';
import ListHeader from '../../Components/Text/ListHeader';
import OldFileInput from '../../Components/Input/OldFileInput';
import DropdownCode from '../../Components/Input/DropdownCode';
import SelectDocumentForm from '../../Containers/Basic/SelectDocumentForm';
import DocumentFormatInputList from '../../Containers/Basic/DocumentFormatInputList';
import BasicSearchContainer from '../../Containers/Basic/BasicSearchContainer';
import { JsonStringifyList } from '../../Functions/JsonStringifyList';
import * as _ from 'lodash';
import useObjectInput from '../../Functions/UseInput';
import RadioInput from '../../Components/Input/RadioInput';
import FileAddInput from '../../Components/Input/FileAddInput';
import NormalAddressInput from '../../Components/Input/NormalAddressInput';


// 외주사 등록
const OutsourcingCompanyRegister = () => {

  const [document, setDocument] = useState<any>({id:'', value:'(선택)'});
  
  const [inputData, setInputData] = useObjectInput('CHANGE', {
    name:'',
    pathceo:'',
    type: 0,
    photo: '',
    location: {
      postcode: '',
      roadAddress:'',
      detail:'',
    },
    telephone: null,
    ceo_email: '',
    fax: '',
    manager_phone: '',
    manager_email: '',
  });
 
  const [essential,setEssential] = useState<any[]>([]);
  const [optional,setOptional] = useState<any[]>([]);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [pk, setPk] = useState<string>('');
  
  useEffect(()=>{
    
    if(getParameter('pk') !== "" ){
      setPk(getParameter('pk'))
      //alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData()
    }

  },[])

  const getData = useCallback(async()=>{
    
    const res = await getRequest('http://211.208.115.66:8099/api/v1/outsourcing/load?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200 || res.status === "200"){
         inputData(res.results)
         
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, essential, optional, inputData ])

  
  const onsubmitFormUpdate = useCallback(async(e)=>{
    e.preventDefault();
    
    const data = {
      ...inputData,
      document_pk: document.pk,
      info_list: JsonStringifyList(essential, optional)
    } 

    const res = await postRequest('http://211.208.115.66:8099/api/v1/outsourcing/update', data, getToken(TOKEN_NAME))

    if(res === false){
      alert('[SERVER ERROR] 요청을 처리 할 수 없습니다.');
    }else{
      if(res.status === 200){
          alert('성공적으로 수정 되었습니다')
      }else{
        alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  },[pk, essential, optional, inputData ])

  const onsubmitForm = useCallback(async(e)=>{
    e.preventDefault();

    const data = {
      ...inputData,
      document_pk: document.pk,
      info_list: JsonStringifyList(essential, optional)
    } 

    const res = await postRequest('http://211.208.115.66:8099/api/v1/outsourcing/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
      alert('[SERVER ERROR] 요청을 처리 할 수 없습니다.');
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')
      }else{
        //TODO:  기타 오류
      }
    }

  },[pk, essential, optional, inputData ])




  return (
    <DashboardWrapContainer index={'basic'}>
     <SubNavigation list={MES_MENU_LIST.basic}/>
        <InnerBodyContainer>
            <Header title={isUpdate ? '회사 정보수정' : '회사 정보등록'}/>
            <WhiteBoxContainer>
              {
                document.id !== '' || isUpdate == true?

              <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                <ListHeader title="필수 항목"/>
                <NormalInput title={'거래처명'} value={inputData.name} onChangeEvent={(input)=>setInputData(`name`, input)} />
                <NormalInput title={'대표자명'} value={inputData.pathceo} onChangeEvent={(input)=>setInputData(`pathceo`, input)} />
                <RadioInput title={'사업자 구분'} target={inputData.type} contents={[{value:0, title:'법인'}, {value:1, title:'개인'}]} onChangeEvent={(input)=>setInputData(`type`, input)} />
                <NormalInput title={'사업자/법인 번호'} value={inputData.number} onChangeEvent={(input)=>setInputData(`number`, input)} />
                <FileAddInput title={'사업자 등록증 사진'} target={`image`} description={`사진 형식의 파일을 업로드 해주세요.`} value={inputData.photo} onChangeEvent={(input)=>setInputData(`photo`, input)} />
                <NormalInput title={'회사 연락처'} value={inputData.phone} onChangeEvent={(input)=>setInputData(`telephone`, input)} />
                
                <NormalAddressInput title={'사업장 주소'} value={inputData.location} onChangeEvent={(input)=>setInputData(`location`, input)} description={'클릭하여 주소를 입력해주세요'} />
                <NormalInput title={'회사 메일'} value={inputData.ceo_email} onChangeEvent={(input)=>setInputData(`ceo_email`, input)} />
                <NormalInput title={'회사 팩스'} value={inputData.fax} onChangeEvent={(input)=>setInputData(`fax`, input)} />
                <NormalInput title={'담당자명'} value={inputData.manager} onChangeEvent={(input)=>setInputData(`manager`, input)} />
                <NormalInput title={'담당자 전화번호'} value={inputData.manager_phone} onChangeEvent={(input)=>setInputData(`manager_phone`, input)} />
                <NormalInput title={'담당자 이메일'} value={inputData.manager_email} onChangeEvent={(input)=>setInputData(`manager_email`, input)} />

                <DocumentFormatInputList pk={document.pk} onChangeEssential={setEssential} onChangeOptional={setOptional}/>

                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />   

              </form>
              :
              <SelectDocumentForm category={0} onChangeEvent={setDocument}/>

            }
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


export default OutsourcingCompanyRegister;