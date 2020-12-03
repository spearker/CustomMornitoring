import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB2, POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import {getToken} from '../../Common/tokenFunctions'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {getMaterialTypeList,} from '../../Common/codeTransferFunctions'
import ListHeader from '../../Components/Text/ListHeader'
import useObjectInput from '../../Functions/UseInput'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import RadioInput from '../../Components/Input/RadioInput'
import GrayRegisterButton from '../../Components/Button/GrayRegisterButton'
import FactoryPickerModal from '../../Components/Modal/FactoryPickerModal'
import InputContainer from '../InputContainer'
import ModelRulesInput from '../../Components/Input/ModelRulesInput'
import FullAddInput from '../../Components/Input/FullAddInput'
import * as _ from 'lodash'

// 품목 등록
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const CreateMemberContainer = () => {
  const history = useHistory()
  const [document, setDocument] = useState<any>({id: '', value: '(선택)'})
  const [type, setType] = useState<number>(0)
  const [essential, setEssential] = useState<any[]>([])
  const [optional, setOptional] = useState<any[]>([])

  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [isDetail, setIsDetail] = useState<boolean>(false)
  const [pk, setPk] = useState<string>('')
  const indexList = getMaterialTypeList('kor')

  const [inputData, setInputData] = useObjectInput('CHANGE', {
    pk: '',
    material_name: '',
    material_type: 0,
    material_code: '',
    manufacturer: null,
    safe_stock: '',
    cost: '',
    location: {factory_name: '', pk: ''},
    info_list: null,
    material_spec_W: null,
    material_spec_H: null,
    material_spec_D: null,
    texture: null,
    model: ['']
  })

  useEffect(() => {

    if (getParameter('pk') !== '') {
      setPk(getParameter('pk'))
      setIsUpdate(true)
      getData()
    }

  }, [])

  const getData = useCallback(async () => {

    const res = await getRequest(`${SF_ENDPOINT}/api/v1/material/load?pk=` + getParameter('pk'), getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200 || res.status === '200') {
        const data = res.results
        const form = {
          pk: data.pk,
          material_name: data.material_name,
          material_type: data.material_type,
          material_code: data.material_code,
          location: {pk: data.location_pk, name: data.location_name},
          manufacturer: data.manufacturer,
          material_spec_W: data.material_spec_W,
          material_spec_H: data.material_spec_H,
          material_spec_D: data.material_spec_D,
          cost: data.cost,
          safe_stock: data.safe_stock,
          material_spec: data.material_spec,
          stock: data.stock,
          texture: data.texture,
          model: data.model
        }

        setInputData('all', form)

      } else {
        //TODO:  기타 오류
      }
    }
  }, [pk, optional, essential, inputData])


  const onsubmitFormUpdate = useCallback(async () => {


    if (inputData.material_name.trim() === '') {
      alert('품목 이름는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (inputData.location === undefined || +inputData.location.pk === undefined || inputData.location.pk === '') {
      alert('기본 위치는 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (inputData.safe_stock === '') {
      alert('안전재고는 필수 항목입니다. 반드시 입력해주세요.')
      return
    }

    if (inputData.material_type === 0) {
      if ((inputData.manufacturer).trim() === '' || inputData.manufacturer === null) {
        alert('제조사는 필수 항목입니다. 반드시 입력해주세요.')
        return
      } else if (inputData.cost === '') {
        alert('원가는 필수 항목입니다. 반드시 입력해주세요.')
        return
      } else if ((inputData.texture).trim() === '' || inputData.texture === null) {
        alert('재질은 필수 항목입니다. 반드시 입력해주세요.')
        return
      }
    } else if (inputData.material_type === 3) {
      if (inputData.model[0].trim() === '') {
        alert('완제품의 모델은 필수 항목입니다. 반드시 입력해주세요.')
        return
      }
    }


    const data = {
      pk: getParameter('pk'),
      material_name: inputData.material_name,
      material_type: inputData.material_type,
      material_code: inputData.material_code.trim() === '' ? null : inputData.material_code.trim(),
      manufacturer: inputData.manufacturer,
      safe_stock: inputData.safe_stock,
      cost: inputData.cost,
      location: inputData.location.pk,
      info_list: inputData.info_list,
      material_spec_W: inputData.material_spec_W,
      material_spec_H: inputData.material_spec_H,
      material_spec_D: inputData.material_spec_D,
      texture: inputData.texture,
      model: inputData.model[0].trim() === '' ? null : inputData.model
    }
    const res = await postRequest(`${SF_ENDPOINT}/api/v1/material/update`, data, getToken(TOKEN_NAME))

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

  }, [pk, optional, essential, inputData])

  const onsubmitForm = useCallback(async () => {


    const data = {
      material_name: inputData.material_name,
      material_type: inputData.material_type,
      material_code: inputData.material_code.trim() === '' ? null : inputData.material_code.trim(),
      manufacturer: inputData.manufacturer,
      safe_stock: inputData.safe_stock,
      cost: inputData.cost,
      location: inputData.location.pk,
      info_list: inputData.info_list,
      material_spec_W: inputData.material_spec_W,
      material_spec_H: inputData.material_spec_H,
      material_spec_D: inputData.material_spec_D,
      texture: inputData.texture,
      model: inputData.model[0].trim() === '' ? null : inputData.model
    }

    const res = await postRequest(`${SF_ENDPOINT}/api/v1/material/register`, data, getToken(TOKEN_NAME))

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

  }, [pk, optional, essential, inputData, document])


  return (
    <div>
      <Header title={isUpdate ? '사용자 정보수정' : '사용자 정보 등록'}/>
      <WhiteBoxContainer>
        {
          // document.id !== '' || isUpdate == true?
          <div>
            <ListHeader title="필수 항목"/>
            <RadioInput title={'권한'} target={inputData.material_type}
                        onChangeEvent={(e) => isUpdate ? null : setInputData('material_type', e)}
                        opacity={isUpdate}
                        contents={[{value: 0, title: '관리자'}, {value: 1, title: '작업자'}, {
                          value: 2, title: '기타'
                        }]}/>

            <NormalInput title={'유저명'} value={inputData.material_name}
                         onChangeEvent={(input) => setInputData(`material_name`, input)}
                         description={'유저명을 입력해주세요.'}/>
            <NormalInput title={'비밀번호'} value={inputData.manufacturer}
                         onChangeEvent={(input) => setInputData(`manufacturer`, input)}
                         description={'비밀번호를 입력해주세요'}/>
            <NormalInput title={'비밀번호 확인'} value={inputData.safe_stock}
                         onChangeEvent={(input) => setInputData(`safe_stock`, input)}
                         description={'비밀번호를 한번 더 입력해주세요.'}/>
            <br/>
            <ListHeader title="선택 항목"/>
            {isUpdate ?
              <div style={{display: 'flex', marginTop: '40px', justifyContent: 'center'}}>
                <TestButton>
                  <div>
                    <p style={{fontSize: 18}}>수정하기</p>
                  </div>
                </TestButton>

                <ButtonWrap onClick={() => history.goBack()}>
                  <div>
                    <p style={{fontSize: 18}}>리스트 보기</p>
                  </div>
                </ButtonWrap>
              </div>
              :
              <GrayRegisterButton name={isUpdate ? '수정하기' : '등록하기'}
                                  onPress={() => isUpdate ? onsubmitFormUpdate() : onsubmitForm()}/>
            }
          </div>

        }
      </WhiteBoxContainer>
    </div>

  )
}

const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    width: 224px;
    height: 46px;
    border-radius: 6px;
    border-radius: 6px;
    border: none;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #0d0d0d;
`

const TestButton = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: #e7e9eb;
    width: 224px;
    height: 46px;
    border-radius: 6px;
    border-radius: 6px;
    border: none;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #666d79;
    margin-right: 20px;
`

const ProcessAddButton = Styled.button`
    
`

export default CreateMemberContainer
