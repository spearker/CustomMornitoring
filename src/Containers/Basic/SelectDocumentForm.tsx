import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {getToken} from '../../Common/tokenFunctions';
import {getRequest} from '../../Common/requestFunctions';
import {useHistory} from 'react-router-dom'
import DropdownCode from '../../Components/Input/DropdownCode';
import {TOKEN_NAME} from '../../Common/configset';

const docDummy = [
  {pk: null, name:'선택 안함'},
  {pk: 'qfqwf', name:'도큐먼트 2'},
  {pk: 'ehki', name:'도큐먼트 2'},
  {pk: 'qfqw412f', name:'도큐먼트 3'},
  {pk: 'efgrhtjyu', name:'도큐먼트 4'},
  {pk: 'kmcd', name:'도큐먼트 5'},
]

interface Props{
  category : string | number,
  onChangeEvent : any
}

const SelectDocumentForm = ({category, onChangeEvent}:Props) => {

  const [document, setDocument] = useState<any>({pk:'', value:'(선택)'});
  const [documentList, setDocumentList] = useState<any[]>([]);
  const history = useHistory();

  useEffect(()=>{
    setDocumentList(docDummy.map((v)=>{return({pk: v.pk, value: v.name})}))
    getDocumentData();
  },[])

  const getDocumentData = useCallback(async()=>{

    const res = await getRequest('http://61.101.55.224:8299/api/v1/document/form/list?category=' + category, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200 || res.status === "200"){
         setDocumentList([{pk: null, value:'선택 안함'}, ...res.results.map((v)=>{return({pk: v.pk, value: v.name})})])


      }else{
        //TODO:  기타 오류
      }
    }
  },[document, documentList ])




  return (


      <form style={{minHeight:400}}>
        <DropdownCode title={'표준 문서 선택'} target={document} contents={documentList} onChangeEvent={(input)=>{ onChangeEvent(input)}} />
        <br/>
        <TextNotice>조회가능한 표준문서가 없다면, <span onClick={()=>history.push('/basic/document/register')}>표준문서 등록</span>에서 등록해주세요. </TextNotice>
      </form>


  );
}
const TextNotice = Styled.p`
  font-size: 14px;
  color: gray;
  span{
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
  }
`


export default SelectDocumentForm;
