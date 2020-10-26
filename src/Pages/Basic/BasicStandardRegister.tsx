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
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';

import DateInput from '../../Components/Input/DateInput';
import ListHeader from '../../Components/Text/ListHeader';
import DropdownCode from '../../Components/Input/DropdownCode';
import { DROP_DOWN_LIST } from '../../Common/dropdownList';
import * as _ from 'lodash';
import { useHistory } from 'react-router-dom';


// 기준정보 등록
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const BasicStandardRegister = () => {
  const history = useHistory();
  const [ pk, setPk ] = useState<string>('');
  const [ isUpdate, setIsUpdate ] = useState<boolean>(false);
  const [ necessary, setNecessary ] = useState<any>({
    standard_name: { id: 'standard_name', title: '항목명', type: 'text', data: '', },
    standard_type: { id: 'standard_type', title: '카테고리', type: 'dropdown', data: { id: 0, value: '기계 기준 정보 등록 문서' } },
    standard_validation_type: {
      id: 'standard_validation_type',
      title: 'validation',
      type: 'dropdown',
      data: { id: 0, value: '숫자만 입력' }
    }
  });

  useEffect(() => {
    if (getParameter('pk') !== "") {
      setPk(getParameter('pk'))
      ////alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData();
    }

  }, [])

  /**
   수정하기 위한 데이터 조회
   */
  const getData = useCallback(async () => {

    const res = await getRequest('http://203.234.183.22:8299/api/v1/item/load?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200 || res.status === "200") {

        const temp = { ...necessary };
        temp[`standard_name`].data = res.results.name;
        temp[`standard_type`].data = {
          id: res.results.category,
          value: DROP_DOWN_LIST[`standard_type`].filter(f => f.id == res.results.category)[0].value
        };
        temp[`standard_validation_type`].data = {
          id: res.results.validation1,
          value: DROP_DOWN_LIST[`standard_validation_type`].filter(f => f.id == res.results.validation1)[0].value
        };
        setNecessary(temp);
        setPk(res.pk);


      } else {
        //TODO:  기타 오류
      }
    }
  }, [ necessary, pk ])

  /**
   * 기준 정보 수정
   */
  const onsubmitFormUpdate = useCallback(async (e) => {
    e.preventDefault();

    const data = {
      pk: getParameter('pk'),
      name: necessary['standard_name'].data,
      category: necessary['standard_type'].data.id,
      validation1: necessary['standard_validation_type'].data.id,
    };

    const res = await postRequest('http://203.234.183.22:8299/api/v1/item/update', data, getToken(TOKEN_NAME))

    if (res === false) {
      // //alert('[SERVER ERROR]요청을 처리 할 수 없습니다.')
    } else {
      if (res.status === 200) {
        //alert('성공적으로 수정 되었습니다')
        history.push('/basic/list/item')
      } else {
        ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  }, [ pk, necessary ])

  /**
   * onsubmitForm()
   *  정보 등록
   */
  const onsubmitForm = useCallback(async (e) => {
    e.preventDefault();


    const data = {
      name: necessary['standard_name'].data,
      category: necessary['standard_type'].data.id,
      validation1: necessary['standard_validation_type'].data.id,

    };
    ////alert(JSON.stringify(data ));

    const res = await postRequest('http://203.234.183.22:8299/api/v1/item/register', data, getToken(TOKEN_NAME))

    if (res === false) {
      // //alert('[SERVER ERROR]요청을 처리 할 수 없습니다.')
    } else {
      if (res.status === 200) {
        //alert('성공적으로 등록 되었습니다')
        history.push('/basic/list/item')
      } else {
        ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }


  }, [ pk, necessary ])

  const handleDataObject = useCallback((input, i) => {
    let temp = [ ...necessary ];
    temp[i].data = input;
    setNecessary(temp)
  }, [ necessary ])

  return (
      <>
        <DashboardWrapContainer index={'basic'}>

          <InnerBodyContainer>
            <Header title={isUpdate ? '표준 항목 수정' : '표준 항목 등록'}/>
            <WhiteBoxContainer>
              <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm}>
                <ListHeader title="필수 항목"/>
                {
                  Object.keys(necessary).map((v, i) => {

                    if (necessary[v].type == 'text') {
                      return (
                          <NormalInput title={necessary[v].title} value={necessary[v].data} description={''}
                                       onChangeEvent={(input) => {
                                         let temp = _.cloneDeep(necessary);
                                         temp[v].data = input;
                                         setNecessary(temp)
                                       }}/>
                      )
                    } else if (necessary[v].type == 'dropdown') {
                      return (
                          <DropdownCode title={necessary[v].title} target={necessary[v].data}
                                        contents={DROP_DOWN_LIST[necessary[v].id]} onChangeEvent={(input) => {
                            let temp = _.cloneDeep(necessary);
                            temp[v].data = input;
                            setNecessary(temp)
                          }}/>
                      )

                    } else if (necessary[v].type == 'date') {
                      return (
                          <DateInput title={necessary[v].title} description={""} value={necessary[v].data}
                                     onChangeEvent={(input) => {
                                       let temp = _.cloneDeep(necessary);
                                       temp[v].data = input;
                                       setNecessary(temp)
                                     }}/>
                      )
                    }
                  })}


                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'}/>
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


export default BasicStandardRegister;
