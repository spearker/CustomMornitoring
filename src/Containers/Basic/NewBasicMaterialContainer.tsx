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

// 품목 등록
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const NewBasicMaterialRegister = () => {
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
        safe_stock: undefined,
        cost: undefined,
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

        const tempUrl = `${API_URLS['material'].load}?pk=${getParameter('pk')}`
        const res = await getBasicList(tempUrl)

        if (res) {
            const data = res
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
                model: data.model ? data.model.toString().split(',') : ['']
            }
            setInputData('all', form)

        }
    }, [pk, optional, essential, inputData])


    const onsubmitFormUpdate = useCallback(async () => {
        if (!inputData.material_name || inputData.material_name.trim() === '') {
            Notiflix.Notify.Failure('품목 이름는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (inputData.location && !inputData.location.pk && inputData.location.pk === '') {
            Notiflix.Notify.Failure('기본 위치는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (inputData.safe_stock === '') {
            Notiflix.Notify.Failure('안전재고는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        if (inputData.material_type === 0) {
            if ((inputData.manufacturer).trim() === '' || inputData.manufacturer === null) {
                Notiflix.Notify.Failure('제조사는 필수 항목입니다. 반드시 입력해주세요.')
                return
            } else if (inputData.cost === '') {
                Notiflix.Notify.Failure('원가는 필수 항목입니다. 반드시 입력해주세요.')
                return
            } else if (inputData.texture !== null && (inputData.texture).trim() === '' || inputData.texture === null) {
                Notiflix.Notify.Failure('재질은 필수 항목입니다. 반드시 입력해주세요.')
                return
            }
        } else if (inputData.material_type === 30) {
            if (inputData.model.length !== 0) {
                if (inputData.model[0] && inputData.model[0].trim() === '') {
                    Notiflix.Notify.Failure('완제품의 모델은 필수 항목입니다. 반드시 입력해주세요.')
                    return
                }
            } else {
                Notiflix.Notify.Failure('완제품의 모델은 필수 항목입니다. 반드시 입력해주세요.')
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
        const tempUrl = `${API_URLS['material'].update}`
        const res = await registerBasicItem(tempUrl, data)

        if (res) {
            //alert('성공적으로 등록 되었습니다')
            history.push('/basic/list/material')
        }


    }, [pk, optional, essential, inputData])

    const onsubmitForm = useCallback(async () => {

        if (inputData.material_name.trim() === '') {
            Notiflix.Notify.Failure('품목 이름는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (inputData.material_code.trim() === '') {
            Notiflix.Notify.Failure('품목 번호는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (!inputData.location || !inputData.location.pk) {
            Notiflix.Notify.Failure('기본 위치는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (inputData.safe_stock === '') {
            Notiflix.Notify.Failure('안전재고는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        if (inputData.material_type === 0) {
            if ((inputData.manufacturer).trim() === '' || inputData.manufacturer === null) {
                Notiflix.Notify.Failure('제조사는 필수 항목입니다. 반드시 입력해주세요.')
                return
            } else if (inputData.cost === '') {
                Notiflix.Notify.Failure('원가는 필수 항목입니다. 반드시 입력해주세요.')
                return
            } else if (inputData.texture !== null && (inputData.texture).trim() === '' || inputData.texture === null) {
                Notiflix.Notify.Failure('재질은 필수 항목입니다. 반드시 입력해주세요.')
                return
            }
        } else if (inputData.material_type === 30) {
            if (inputData.model.length === 0 || inputData.model[0].trim() === '') {
                Notiflix.Notify.Failure('완제품의 모델은 필수 항목입니다. 반드시 입력해주세요.')
                return
            }
        }


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

        const res = await registerBasicItem(`${API_URLS['material'].create}`, data)

        if (res) {
            //alert('성공적으로 등록 되었습니다')
            history.push('/basic/list/material')
        }

    }, [pk, optional, essential, inputData, document])


    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <Header title={isUpdate ? '품목 정보수정' : '품목 기본정보 등록'}/>
                <WhiteBoxContainer>
                    {
                        // document.id !== '' || isUpdate == true?
                        <div>
                            <ListHeader title="필수 항목"/>
                            <RadioInput title={'품목 종류'} target={inputData.material_type}
                                        onChangeEvent={(e) => setInputData('material_type', e)}
                                        contents={[{value: 0, title: '원자재'}, {value: 10, title: '반제품'}, {
                                            value: 1, title: '부자재'
                                        }, {value: 30, title: '완제품'}]}/>

                            <NormalInput title={'품목(품목명)'} value={inputData.material_name}
                                         onChangeEvent={(input) => setInputData(`material_name`, input)}
                                         description={'품목명을 입력해주세요.'}/>
                            <NormalInput title={'품번'} value={inputData.material_code}
                                         onChangeEvent={(input) => setInputData(`material_code`, input)}
                                         description={'품번을 입력해주세요'}/>
                            {inputData.material_type === 30 &&
                            <div>
                                <FullAddInput title={'모델'} onChangeEvent={() => {
                                    let temp = _.cloneDeep(inputData.model)
                                    temp.push('')
                                    setInputData('model', temp)
                                }}>

                                    {
                                        inputData.model && inputData.model.map((v, i) => {
                                            return (
                                                <ModelRulesInput title={`• 모델 ${i + 1}`} value={v}
                                                                 onRemoveEvent={() => {
                                                                     let temp = _.cloneDeep(inputData.model)
                                                                     temp.splice(i, 1)
                                                                     setInputData('model', temp)
                                                                 }}
                                                                 onChangeEvent={(input) => {
                                                                     let temp = _.cloneDeep(inputData.model)
                                                                     temp.splice(i, 1, input)
                                                                     setInputData('model', temp)
                                                                 }}
                                                />
                                            )
                                        })
                                    }
                                </FullAddInput>
                            </div>
                            }
                            {inputData.material_type === 0 &&
                            <NormalInput title={'제조사'} value={inputData.manufacturer}
                                         onChangeEvent={(input) => setInputData(`manufacturer`, input)}
                                         description={'제조사를 입력해주세요'}/>
                            }
                            <NormalNumberInput title={'안전재고'} value={inputData.safe_stock}
                                               onChangeEvent={(input) => setInputData(`safe_stock`, input)}
                                               description={`안전재고량을 입력해주세요 (단위 : ${inputData.material_type === 0 ? 'kg' : '개'})`}/>
                            {(inputData.material_type === 0 || inputData.material_type === 30) &&
                            <NormalNumberInput title={'원가'} value={inputData.cost}
                                               onChangeEvent={(input) => setInputData(`cost`, input)}
                                               description={'원가를 입력해주세요 (단위 : 원)'}/>
                            }
                            {inputData.material_type === 0 &&
                            <NormalInput title={'재질 종류'} value={inputData.texture}
                                         onChangeEvent={(input) => setInputData(`texture`, input)}
                                         description={'재질 종류를 입력해주세요'}/>
                            }
                            <InputContainer title={'기본 위치'} width={167.84}>
                                <FactoryPickerModal select={inputData.location}
                                                    keyword={''}
                                                    option={1}
                                                    onClickEvent={(e) => {
                                                        setInputData('location', e)
                                                    }} text={'기본위치를 입력해주세요'}/>
                            </InputContainer>
                            <br/>
                            <ListHeader title="선택 항목"/>
                            {inputData.material_type !== 0 && autoCustomType() === 'jaewoo_material_trans' &&
                            <div>
                                <NormalNumberInput title={'폭 사이즈'} value={inputData.material_spec_W}
                                                   onChangeEvent={(input) => setInputData(`material_spec_W`, input)}
                                                   description={'폭 사이즈를 입력해주세요 (단위 : mm)'}/>
                                <NormalNumberInput title={'피치 사이즈'} value={inputData.material_spec_H}
                                                   onChangeEvent={(input) => setInputData(`material_spec_H`, input)}
                                                   description={'피치 사이즈를 입력해주세요 (단위 : mm)'}/>
                                <NormalNumberInput title={'T 사이즈'} value={inputData.material_spec_D}
                                                   onChangeEvent={(input) => setInputData(`material_spec_D`, input)}
                                                   description={'T 사이즈를 입력해주세요 (단위 : mm)'}/>
                            </div>
                            }
                            {inputData.material_type !== 0 && autoCustomType() === 'seain_material_trans' &&
                            <div>
                                <NormalInput title={'외경 사이즈'} value={inputData.material_spec_W}
                                             onChangeEvent={(input) => setInputData(`material_spec_W`, input)}
                                             description={'외경 사이즈를 입력해주세요 (단위 : mm)'}/>
                                <NormalInput title={'내경 사이즈'} value={inputData.material_spec_H}
                                             onChangeEvent={(input) => setInputData(`material_spec_H`, input)}
                                             description={'내경 사이즈를 입력해주세요 (단위 : mm)'}/>
                                <NormalInput title={'T 사이즈'} value={inputData.material_spec_D}
                                             onChangeEvent={(input) => setInputData(`material_spec_D`, input)}
                                             description={'T 사이즈를 입력해주세요 (단위 : mm)'}/>
                            </div>
                            }
                            {inputData.material_type !== 0 && autoCustomType() !== 'jaewoo_material_trans' && autoCustomType() !== 'seain_material_trans' &&
                            <div>
                                <NormalNumberInput title={'가로 사이즈'} value={inputData.material_spec_W}
                                                   onChangeEvent={(input) => setInputData(`material_spec_W`, input)}
                                                   description={'가로 사이즈를 입력해주세요 (단위 : mm)'}/>
                                <NormalNumberInput title={'세로 사이즈'} value={inputData.material_spec_H}
                                                   onChangeEvent={(input) => setInputData(`material_spec_H`, input)}
                                                   description={'세로 사이즈를 입력해주세요 (단위 : mm)'}/>
                                <NormalNumberInput title={'높이 사이즈'} value={inputData.material_spec_D}
                                                   onChangeEvent={(input) => setInputData(`material_spec_D`, input)}
                                                   description={'높이 사이즈를 입력해주세요 (단위 : mm)'}/>
                            </div>
                            }
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
                                    <ButtonWrap style={{width: 360}}
                                                onClick={() => isUpdate ? onsubmitFormUpdate() : onsubmitForm()}>
                                        <div>
                                            <p style={{fontSize: 18}}>{isUpdate ? '수정하기' : '등록하기'}</p>
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

const ProcessAddButton = Styled.button`
    
`
export default NewBasicMaterialRegister
