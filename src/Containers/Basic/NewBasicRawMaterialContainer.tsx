import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB2, POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import RegisterButton from '../../Components/Button/RegisterButton'
import {getToken} from '../../Common/tokenFunctions'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DropdownInput from '../../Components/Input/DropdownInput'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {getMaterialTypeList, transferCodeToName, transferStringToCode} from '../../Common/codeTransferFunctions'
import ListHeader from '../../Components/Text/ListHeader'
import BasicSearchContainer from '../Old_Basic/BasicSearchContainer'
import {JsonStringifyList} from '../../Functions/JsonStringifyList'
import useObjectInput from '../../Functions/UseInput'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import RadioInput from '../../Components/Input/RadioInput'
import GrayRegisterButton from '../../Components/Button/GrayRegisterButton'
import FactoryPickerModal from '../../Components/Modal/FactoryPickerModal'
import MachinePickerModal from '../../Components/Modal/MachinePickerModal'
import InputContainer from '../InputContainer'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import ModelRulesInput from '../../Components/Input/ModelRulesInput'
import FullAddInput from '../../Components/Input/FullAddInput'
import Notiflix from 'notiflix'
import * as _ from 'lodash'
import {API_URLS, getBasicList, registerBasicItem} from '../../Api/mes/basic'
import autoCustomType from '../../AutoCustomSetting/autoCustomConfig'
import IC_MINUS from '../../Assets/Images/ic_minus.png'
import ModalDropdown from '../../Components/Dropdown/ModalDropdown'
import CommonDropdown from '../../Components/Dropdown/CommonDropdown'

const materialType = [
  {value: 0, title: '원자재'},
  {value: 10, title: '반제품'},
  {value: 1, title: '부자재'},
  {value: 30, title: '완제품'}
]

const regExp = /^[0-9]*$/

// 품목 등록
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const NewBasicRawMaterialRegister = ({match}: any) => {
  const history = useHistory()
  const [document, setDocument] = useState<any>({id: '', value: '(선택)'})
  const [essential, setEssential] = useState<any[]>([])
  const [optional, setOptional] = useState<any[]>([])
  const [basesList, setBasesList] = useState<{ name: string, pk: string }[]>([])

  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [isDetail, setIsDetail] = useState<boolean>(false)
  const [pk, setPk] = useState<string>('')

  const [inputData, setInputData] = useObjectInput('CHANGE', {
    pk: '',
    material_name: '',
    material_type: 0,
    material_code: '',
    manufacturer: null,
    safe_stock: undefined,
    cost: undefined,
    location: {factory_name: '', pk: ''},
    info_list: null,
    material_spec_W: null,
    material_spec_H: null,
    material_spec_D: null,
    bases: [''],
    texture: null,
    model: [''],
    inspections: ['']
  })

  useEffect(() => {

    // if (getParameter('pk') !== '') {
    //   setPk(getParameter('pk'))
    //   setIsUpdate(true)
    //   getData()
    // }
    if (match.params.pk) {
      setPk(match.params.pk)
      setIsUpdate(true)
      getData()
    }

  }, [])


  const getData = useCallback(async () => {

    const tempUrl = `${API_URLS['material'].load}?pk=${match.params.pk}`
    const res = await getBasicList(tempUrl)

    if (res) {
      const data = res
      const form = {
        pk: match.params.pk,
        material_name: data.material_name,
        material_type: data.material_type,
        material_code: data.material_code === '-' ? undefined : data.material_code,
        location: {pk: data.location_pk, name: data.location_name === '-' ? undefined : data.location_name},
        manufacturer: data.manufacturer,
        material_spec_W: data.material_spec_W,
        material_spec_H: data.material_spec_H,
        material_spec_D: data.material_spec_D,
        cost: data.cost,
        safe_stock: data.safe_stock,
        material_spec: data.material_spec,
        stock: data.stock,
        texture: data.texture,
        bases: data.bases ? data.bases.map(v => {
          return v.material_pk
        }) : [''],
        inspections: data.inspections ?? [''],
        model: data.model ? data.model.toString().split(',') : ['']
      }

      setBasesList(data.bases.map(v => {
        return {
          name: v.material_name,
          pk: v.material_pk
        }
      }))
      setInputData('all', form)

    }
  }, [pk, optional, essential, inputData])


  const onsubmitFormUpdate = useCallback(async () => {
    if (validationData()) {
      const res = await registerBasicItem(`${API_URLS['material'].update}`, reConfigData(true))

      if (res) {
        //alert('성공적으로 등록 되었습니다')
        history.push('/basic/list/material')
      }
    }
  }, [pk, optional, essential, inputData])

  const onsubmitForm = useCallback(async () => {

    if (validationData()) {
      const res = await registerBasicItem(`${API_URLS['material'].create}`, reConfigData())

      if (res) {
        //alert('성공적으로 등록 되었습니다')
        history.push('/basic/list/material')
      }
    }

  }, [pk, optional, essential, inputData, document])

  const validationData = () => {
    if ((inputData.texture).trim() === '' || inputData.texture === null) {
      Notiflix.Notify.Failure('재질은 필수 항목입니다. 반드시 입력해주세요.')
      return false
    } else if (inputData.material_spec_W === '' || inputData.material_spec_D === '') {
      Notiflix.Notify.Failure('폭과 두께는는 필수 항목입니다. 반드시 입력해주세요.')
      return false
    }

    return true
  }

  const reConfigData = (isPk?: boolean) => {
    const data = {
      material_name: inputData.material_type === 0 ? `${inputData.texture}, ${inputData.material_spec_W} * ${inputData.material_spec_D}` : inputData.material_name,
      material_type: inputData.material_type,
      material_code: inputData.material_type === 0 ? undefined : inputData.material_code.trim() === '' ? undefined : inputData.material_code.trim(),
      manufacturer: inputData.manufacturer ?? undefined,
      safe_stock: inputData.safe_stock ?? 0,
      cost: inputData.cost ?? undefined,
      location: (inputData.location.pk === '' || !inputData.location.pk) ? undefined : inputData.location.pk,
      info_list: inputData.info_list,
      material_spec_W: inputData.material_spec_W ? Number(inputData.material_spec_W) : 0,
      material_spec_H: inputData.material_type === 0 ? 0 : inputData.material_spec_H,
      material_spec_D: inputData.material_spec_D ? Number(inputData.material_spec_D) : 0,
      texture: inputData.texture,
      bases: inputData.bases.filter((v) => v !== ''),
      model: inputData.model[0].trim() === '' ? undefined : inputData.model,
      inspections: inputData.inspections.filter((v) => v !== '')
    }

    if (isPk) {
      return {...data, pk: match.params.pk,}
    } else {
      return data
    }
  }

  const createInput = (type: string, title: string, onChangeStateName: string, placeholder?: string) => {
    return <NormalInput title={title} value={inputData[onChangeStateName]}
                        onChangeEvent={(input) => {
                          console.log(input.search(regExp))
                          if (type === 'number' && input.search(regExp) < 0) {
                            return
                          }
                          return setInputData(onChangeStateName, input)
                        }}
                        description={placeholder ? placeholder : ''}/>

  }

  return (
    <DashboardWrapContainer index={'basic'}>
      <InnerBodyContainer>
        <Header title={isUpdate ? '원자재 기본정보 수정' : '원자재 기본정보 등록'}/>
        <WhiteBoxContainer>
          {
            // document.id !== '' || isUpdate == true?
            <div>
              <ListHeader title="필수 항목"/>
              {createInput('string', '재질', 'texture', '재질을 입력해주세요')}
              {createInput('number', '폭', 'material_spec_W', '폭을 입력해주세요')}
              {createInput('number', '두께', 'material_spec_D', '두께를 입력해주세요')}
              <br/>
              <ListHeader title="선택 항목"/>

              <div>
                <FullAddInput title={'품목'} onChangeEvent={() => {
                  let temp = _.cloneDeep(inputData.bases)
                  temp.push('')
                  setInputData('bases', temp)
                }}>

                  {
                    inputData.bases && inputData.bases.map((v, i) => {
                      return (
                        <InputContainer title={i === 0 ? '품목' : ''} width={167.84} line={false} isPadding={7}>
                          <ProductionPickerModal
                            innerWidth={i !== 0 ? 842.16 : 872.16}
                            select={basesList[i]}
                            onClickEvent={(input) => {
                              let temp = _.cloneDeep(inputData.bases)
                              temp.splice(i, 1, input.pk)
                              setInputData('bases', temp)

                              let temp2 = _.cloneDeep(basesList)
                              temp2.splice(i, 1, input)
                              setBasesList([...temp2])
                            }}
                            text={'품목을 선택해주세요.'}
                          />
                          {
                            i !== 0 &&
                            <img src={IC_MINUS}
                                 style={{
                                   width: 20,
                                   height: 20,
                                   marginLeft: 8,
                                   cursor: 'pointer',
                                   padding: 5,
                                   backgroundColor: '#aaaaaa'
                                 }}
                                 onClick={() => {
                                   let temp = _.cloneDeep(inputData.bases)
                                   temp.splice(i, 1)
                                   setInputData('bases', temp)

                                   let temp2 = _.cloneDeep(basesList)
                                   temp2.splice(i, 1)
                                   setBasesList([...temp2])
                                 }}/>
                          }
                        </InputContainer>
                      )
                    })
                  }
                </FullAddInput>
              </div>
              {createInput('number', '안전재고', 'safe_stock', '안전재고를 입력해주세요')}
              <div>
                <FullAddInput title={'검수 항목'} onChangeEvent={() => {
                  if (inputData.inspections.length < 5) {
                    let temp = _.cloneDeep(inputData.inspections)
                    temp.push('')
                    setInputData('inspections', temp)
                  } else {
                    Notiflix.Report.Warning('추가할 수 없음', '5개 까지 입력할 수 있습니다.', '확인')
                  }
                }}>
                  {
                    inputData.inspections && inputData.inspections.map((v, i) => {
                      return (
                        <ModelRulesInput title={i === 0 ? `• 검수 항목` : ''} value={v} index={i}
                                         onRemoveEvent={() => {
                                           let temp = _.cloneDeep(inputData.inspections)
                                           temp.splice(i, 1)
                                           setInputData('inspections', temp)
                                         }}
                                         onChangeEvent={(input) => {
                                           let temp = _.cloneDeep(inputData.inspections)
                                           temp.splice(i, 1, input)
                                           setInputData('inspections', temp)
                                         }} buttonColor={'#aaaaaa'}
                        />
                      )
                    })
                  }
                </FullAddInput>
              </div>

              {inputData.material_type !== 0 && inputData.material_type !== 30 &&
              <NormalNumberInput title={'원가'} value={inputData.cost === 0 ? undefined : inputData.cost}
                                 onChangeEvent={(input) => setInputData(`cost`, input)}
                                 description={'원가를 입력해주세요 (단위 : 원)'}/>
              }
              {isUpdate ?
                <div style={{display: 'flex', marginTop: '40px', justifyContent: 'center'}}>
                  <TestButton onClick={() => onsubmitFormUpdate()}>
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
                : <div style={{display: 'flex', marginTop: '40px', justifyContent: 'center'}}>
                  <ButtonWrap style={{width: 360}} onClick={() => onsubmitForm()}>
                    <div>
                      <p style={{fontSize: 18}}>등록하기</p>
                    </div>
                  </ButtonWrap>
                </div>
              }
            </div>

          }
        </WhiteBoxContainer>

      </InnerBodyContainer>

    </DashboardWrapContainer>

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
export default NewBasicRawMaterialRegister
