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
import {useHistory} from 'react-router-dom';
import DateInput from '../../Components/Input/DateInput';
import moment from 'moment';
import ListHeader from '../../Components/Text/ListHeader';
import OldFileInput from '../../Components/Input/OldFileInput';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import AddInput from '../../Components/Input/AddInput';
import TextList from '../../Components/List/TextList';
import SearchInput from '../../Components/Input/SearchInput';
import SearchedList from '../../Components/List/SearchedList';
import { onClickSearch, SEARCH_TYPES } from '../../Functions/SearchList';
import DropdownCode from '../../Components/Input/DropdownCode';
import { DROP_DOWN_LIST } from '../../Common/dropdownList';
import * as _ from 'lodash';
import CheckboxInput from '../../Components/Input/CheckboxInput';
const dummy = [
  
]
// 표준 문서 관리
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const BasicDocumentRegister = () => {
  const history = useHistory();
  const [pk, setPk] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [necessary, setNecessary] = useState<any>({
    document_name: {id: 'document_name', title: '문서명', type:'text', data:'',},
    standard_type: {id: 'standard_type', title: '카테고리', type:'dropdown', data:{id: 0, value: '기계 기준 정보 등록 문서'}},
    items: {id: 'items', title: '표준항목 -(필수항목 체크)', type:'checkbox', data:dummy},
  
  });
 
  const [isChange, setIsChange]= useState<boolean>(true);

  useEffect(()=>{
    if(isChange){
      getItems();
    }
  },[isChange]);

  useEffect(()=>{
    if(getParameter('pk') !== "" ){
      setPk(getParameter('pk'))
      //alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData();
    }

  },[])

  /**
   카테고리별 아이템로드
   */
  const getItems = useCallback(async()=>{
    
    const res = await getRequest('http://211.208.115.66:8099/api/v1/item/involved?category=' + necessary['standard_type'].data.id, getToken(TOKEN_NAME))
    setIsChange(false)
    if(res === false){
      //TODO: 에러 처리
      alert('[SERVER ERROR]표준 항목을 로드 할 수 없습니다.')
        const form = res.results;
        let temp = _.cloneDeep(necessary);
        temp[`items`].data = [];
    }else{
      if(res.status === 200 || res.status === "200"){
          const form = res.results;
          let temp = _.cloneDeep(necessary);
       
          temp[`items`].data = form;
          setNecessary(temp);
          setPk(form.pk);
        

      }else{
        //TODO:  기타 오류
        alert('표준 항목을 로드 할 수 없습니다.')
        const form = res.results;
        let temp = _.cloneDeep(necessary);
        temp[`items`].data = [];
      }
    }
  },[necessary, pk, isChange ])
   

  /**
   수정하기 위한 데이터 조회
   */
  const getData = useCallback(async()=>{
    
    const res = await getRequest('http://211.208.115.66:8099/api/v1/document/load?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200 || res.status === "200"){
         const form = res.results
        let temp = _.cloneDeep(necessary);
        temp.document_name.data = form.name;
        temp.standard_type.data = {id: form.category, value: DROP_DOWN_LIST.standard_type.filter(f=>f.id==form.category)[0].value};
        temp[`items`].data = form.items;
        setNecessary(temp);
        setPk(form.pk);

         
      }else{
        //TODO:  기타 오류
      }
    }
  },[necessary, pk ])

  /**
   * 기준 정보 수정
   */
  const onsubmitFormUpdate = useCallback(async(e)=>{
    e.preventDefault();

    const data = {
      pk: getParameter('pk'),
      name: necessary.document_name.data,
      category: necessary.standard_type.data.id,
      items: necessary.items.data.map((v)=> {return v.pk}),
      validations: necessary.items.data.map((v)=> {return v.validation2}),  
    };
    //alert(data);
  
    const res = await postRequest('http://211.208.115.66:8099/api/v1/document/update', data, getToken(TOKEN_NAME))

    if(res === false){
      alert('[SERVER ERROR] 요청을 처리 할 수 없습니다.')
    }else{
      if(res.status === 200){
          alert('성공적으로 수정 되었습니다')
          history.push('/basic/list/document')
      }else{
        alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  },[pk, necessary ])

  /**
   * onsubmitForm()
   *  정보 등록
   */
  const onsubmitForm = useCallback(async(e)=>{
    e.preventDefault();

   
    const data = {
        //pk: getParameter('pk'),
        name: necessary.document_name.data,
        category: necessary.standard_type.data.id,
        items: necessary.items.data.map((v)=> {return v.pk}),
        validations: necessary.items.data.map((v)=> {return v.validation2}),  
      };
      //alert(data);

    const res = await postRequest('http://211.208.115.66:8099/api/v1/document/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
      alert('[SERVER ERROR] 요청을 처리 할 수 없습니다.')

    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다');
         history.push('/basic/list/document')
      }else{
        //TODO:  기타 오류
        alert('요청을 처리 할 수 없습니다.')
      }
    }

  },[pk, necessary ])


  return (
    <>
      <DashboardWrapContainer index={'basic'}>
        <SubNavigation list={MES_MENU_LIST.basic}/>
        <InnerBodyContainer>
            <Header title={isUpdate ? '표준 문서 수정' : '표준 문서 등록'}/>
            <WhiteBoxContainer>
              <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                <ListHeader title="필수 항목"/>
                {
                  Object.keys(necessary).map((v, i)=>{

                    if(necessary[v].type == 'text'){
                      return(
                        <NormalInput title={necessary[v].title} value={necessary[v].data} description={''} onChangeEvent={(input)=>{let temp = _.cloneDeep(necessary); temp[v].data = input; setNecessary(temp)}} />
                      )
                    }else if(necessary[v].type == 'dropdown'){
                      if(!isUpdate)
                        return(
                          <DropdownCode title={necessary[v].title} target={necessary[v].data} contents={DROP_DOWN_LIST[necessary[v].id]} onChangeEvent={(input)=>{let temp = _.cloneDeep(necessary); temp[v].data = input; setNecessary(temp); setIsChange(true)}} />
                        )
                          
                      
                      
                    }else if(necessary[v].type == 'date'){
                      return(
                        <DateInput title={necessary[v].title} description={""} value={necessary[v].data} onChangeEvent={(input)=>{let temp = _.cloneDeep(necessary); temp[v].data = input; setNecessary(temp)}} />
                      )
                    }else if(necessary[v].type == 'checkbox'){
                      return(
                        <CheckboxInput title={necessary[v].title} nameKey={"item_name"} checkKey={"validation2"} list={necessary[v].data} onChangeEvent={(index, bool)=>{let temp = _.cloneDeep(necessary);  temp[v].data[index]["validation2"] = !bool ; setNecessary(temp)}} />
                      )
                    }
                })}
                        
              
              
                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />   
              </form>
            </WhiteBoxContainer>
           
            
        </InnerBodyContainer>
      
      </DashboardWrapContainer>
      </>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default BasicDocumentRegister;