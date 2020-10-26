import React, { useCallback, useEffect, useState } from 'react';
import Styled from 'styled-components'
import { BG_COLOR_SUB2, TOKEN_NAME } from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import { getToken } from '../../Common/tokenFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import DropdownInput from '../../Components/Input/DropdownInput';
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';
import { getMaterialTypeList, transferCodeToName, transferStringToCode } from '../../Common/codeTransferFunctions';
import ListHeader from '../../Components/Text/ListHeader';
import BasicSearchContainer from '../../Containers/Basic/BasicSearchContainer';
import { JsonStringifyList } from '../../Functions/JsonStringifyList';
import useObjectInput from '../../Functions/UseInput';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import { useHistory } from 'react-router-dom';

// 품목 등록
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const BasicMaterialRegister = () => {
  const history = useHistory();
  const [ document, setDocument ] = useState<any>({ id: '', value: '(선택)' });

  const [ essential, setEssential ] = useState<any[]>([]);
  const [ optional, setOptional ] = useState<any[]>([]);

  const [ isUpdate, setIsUpdate ] = useState<boolean>(false);
  const [ pk, setPk ] = useState<string>('');
  const indexList = getMaterialTypeList('kor');
  const [ inputData, setInputData ] = useObjectInput('CHANGE', {
    pk: '',
    material_name: '',
    material_type: 0,
    location: [],
    using_mold: [],
    cost: 0,
    safe_stock: 0,
    material_spec: '',
  });

  useEffect(() => {

    if (getParameter('pk') !== "") {
      setPk(getParameter('pk'))
      setIsUpdate(true)
      getData()
    }

  }, [])

  const getData = useCallback(async () => {

    const res = await getRequest('http://255.255.255.255:8299/api/v1/material/load?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200 || res.status === "200") {
        const data = res.results;
        const form = {

          pk: data.pk,
          material_name: data.material_name,
          material_type: data.material_type,
          location: [ { pk: data.location_pk, name: data.location_name } ],
          using_mold: data.mold !== undefined ? [ { pk: data.mold.mold_pk, name: data.mold.mold_name } ] : [],
          cost: data.cost,
          safe_stock: data.safe_stock,
          material_spec: data.material_spec,
          stock: data.stock,
        };

        setInputData('all', form)


      } else {
        //TODO:  기타 오류
      }
    }
  }, [ pk, optional, essential, inputData ])


  const onsubmitFormUpdate = useCallback(async (e) => {
    e.preventDefault();

    if (inputData.material_name === "") {
      alert("품목 이름는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (inputData.material_type === "") {
      alert("품목 종류는 필수 항목입니다. 반드시 선택해주세요.")
      return;
    } else if (inputData.location === undefined || inputData.location[0]?.pk === undefined || inputData.location[0]?.pk === '') {
      alert("공장은 필수 항목입니다. 반드시 선택해주세요.")
      return;
    } else if (inputData.safe_stock === "") {
      alert("안전재고는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (inputData.cost === "") {
      alert("원가는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }


    const data = {
      pk: getParameter('pk'),
      material_name: inputData.material_name,
      material_type: inputData.material_type,
      location: inputData.location[0].pk,
      using_mold: inputData.using_mold[0] ? inputData.using_mold[0].pk : null,
      cost: inputData.cost,
      safe_stock: inputData.safe_stock,
      material_spec: inputData.material_spec,
      info_list: JsonStringifyList(essential, optional)
    };
    const res = await postRequest('http://255.255.255.255:8299/api/v1/material/update', data, getToken(TOKEN_NAME))

    if (res === false) {
      // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
    } else {
      if (res.status === 200) {
        //alert('성공적으로 등록 되었습니다')
        history.push('/basic/list/material')
      } else {
        ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  }, [ pk, optional, essential, inputData ])

  const onsubmitForm = useCallback(async (e) => {
    e.preventDefault();

    if (inputData.material_name === "") {
      alert("품목 이름는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (inputData.material_type === "") {
      alert("품목 종류는 필수 항목입니다. 반드시 선택해주세요.")
      return;
    } else if (inputData.location === undefined || inputData.location[0]?.pk === undefined || inputData.location[0]?.pk === '') {
      alert("공장은 필수 항목입니다. 반드시 선택해주세요.")
      return;
    } else if (inputData.safe_stock === "") {
      alert("안전재고는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (inputData.cost === "") {
      alert("원가는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }

    const data = {
      document_pk: document.pk,
      material_name: inputData.material_name,
      material_type: inputData.material_type,
      cost: inputData.cost,
      location: inputData.location[0].pk,
      using_mold: inputData.using_mold[0] ? inputData.using_mold[0].pk : null,
      safe_stock: inputData.safe_stock,
      material_spec: inputData.material_spec,
      info_list: JsonStringifyList(essential, optional)
    };

    const res = await postRequest('http://255.255.255.255:8299/api/v1/material/register', data, getToken(TOKEN_NAME))

    if (res === false) {
      // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
    } else {
      if (res.status === 200) {
        //alert('성공적으로 등록 되었습니다')
        history.push('/basic/list/material')
      } else {
        ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  }, [ pk, optional, essential, inputData, document ])


  return (
      <DashboardWrapContainer index={'basic'}>

        <InnerBodyContainer>
          <Header title={isUpdate ? '품목 정보수정' : '품목 정보등록'}/>
          <WhiteBoxContainer>
            {
              // document.id !== '' || isUpdate == true?
              <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm}>
                <ListHeader title="필수 항목"/>
                <NormalInput title={'품목 이름'} value={inputData.material_name}
                             onChangeEvent={(input) => setInputData(`material_name`, input)}
                             description={'이름을 입력해주세요.'}/>
                <DropdownInput title={'품목 종류'} target={transferCodeToName('material', inputData.material_type)}
                               contents={indexList}
                               onChangeEvent={(input) => setInputData('material_type', transferStringToCode('material', indexList[input]))}/>
                <BasicSearchContainer
                    title={'공장 정보'}
                    key={'pk'}
                    value={'name'}
                    onChangeEvent={(input) => setInputData(`location`, input)}
                    option={1}
                    solo={true}
                    list={inputData.location}
                    searchUrl={'http://255.255.255.255:8299/api/v1/factory/search?'}
                />

                <NormalNumberInput title={'안전 재고'} value={inputData.safe_stock}
                                   onChangeEvent={(input) => setInputData(`safe_stock`, input)} description={''}/>
                <NormalNumberInput title={'원가'} value={inputData.cost}
                                   onChangeEvent={(input) => setInputData(`cost`, input)} description={''}/>

                <br/>
                <ListHeader title="선택 항목"/>
                <NormalInput title={'품목 스펙'} value={inputData.material_spec}
                             onChangeEvent={(input) => setInputData(`material_spec`, input)}
                             description={'이름을 입력해주세요.'}/>

                {/*<br/>*/}
                {/*<DocumentFormatInputList*/}
                {/*  pk={!isUpdate ? document.pk : undefined}*/}
                {/*  loadDataUrl={isUpdate? `http://255.255.255.255:8299/api/v1/material/load?pk=${pk}` :''}*/}
                {/*  onChangeEssential={setEssential} onChangeOptional={setOptional}*/}
                {/*  />*/}

                {/*<BasicSearchContainer*/}
                {/*    title={'사용 금형'}*/}
                {/*    key={'pk'}*/}
                {/*    value={'mold_name'}*/}
                {/*    onChangeEvent={(input)=>setInputData(`using_mold`, input)}*/}
                {/*    solo={true}*/}
                {/*    list={inputData.using_mold}*/}
                {/*    searchUrl={'http://255.255.255.255:8299/api/v1/mold/search?'}*/}
                {/*/>*/}

                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'}/>
              </form>
              // :
              //
              // <SelectDocumentForm category={3} onChangeEvent={setDocument}/>
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


export default BasicMaterialRegister;
