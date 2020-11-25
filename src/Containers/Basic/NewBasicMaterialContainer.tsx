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
import BasicSearchContainer from '../../Containers/Basic/BasicSearchContainer'
import {JsonStringifyList} from '../../Functions/JsonStringifyList'
import useObjectInput from '../../Functions/UseInput'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT} from "../../Api/SF_endpoint";
import RadioInput from "../../Components/Input/RadioInput";
import GrayRegisterButton from "../../Components/Button/GrayRegisterButton";
import FactoryPickerModal from "../../Components/Modal/FactoryPickerModal";
import MachinePickerModal from "../../Components/Modal/MachinePickerModal";
import InputContainer from "../InputContainer";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";

// 품목 등록
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const NewBasicMaterialRegister = () => {
    const history = useHistory()
    const [document, setDocument] = useState<any>({id: '', value: '(선택)'})
    const [type, setType] = useState<number>(0)
    const [essential, setEssential] = useState<any[]>([])
    const [optional, setOptional] = useState<any[]>([])

    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [pk, setPk] = useState<string>('')
    const indexList = getMaterialTypeList('kor')
    const [inputData, setInputData] = useObjectInput('CHANGE', {
        pk: '',
        material_name: '',
        material_type: 0,
        location: [],
        using_mold: [],
        cost: '',
        safe_stock: '',
        material_spec: '',
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
                    location: [{pk: data.location_pk, name: data.location_name}],
                    using_mold: data.mold !== undefined ? [{pk: data.mold.mold_pk, name: data.mold.mold_name}] : [],
                    cost: data.cost,
                    safe_stock: data.safe_stock,
                    material_spec: data.material_spec,
                    stock: data.stock,
                }

                setInputData('all', form)


            } else {
                //TODO:  기타 오류
            }
        }
    }, [pk, optional, essential, inputData])


    const onsubmitFormUpdate = useCallback(async (e) => {
        e.preventDefault()

        if (inputData.material_name.trim() === '') {
            alert('품목 이름는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (inputData.material_type === '') {
            alert('품목 종류는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (inputData.location === undefined || inputData.location[0]?.pk === undefined || inputData.location[0]?.pk === '') {
            alert('공장은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (inputData.safe_stock === '') {
            alert('안전재고는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (inputData.cost === '') {
            alert('원가는 필수 항목입니다. 반드시 입력해주세요.')
            return
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

    const onsubmitForm = useCallback(async (e) => {
        e.preventDefault()

        if (inputData.material_name.trim() === '') {
            alert('품목 이름는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (inputData.material_type === '') {
            alert('품목 종류는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (inputData.location === undefined || inputData.location[0]?.pk === undefined || inputData.location[0]?.pk === '') {
            alert('공장은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (inputData.safe_stock === '') {
            alert('안전재고는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (inputData.cost === '') {
            alert('원가는 필수 항목입니다. 반드시 입력해주세요.')
            return
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
        <DashboardWrapContainer index={'basic'}>

            <InnerBodyContainer>
                <Header title={isUpdate ? '품목 정보수정' : '품목 정보등록'}/>
                <WhiteBoxContainer>
                    {
                        // document.id !== '' || isUpdate == true?
                        <div>
                            <ListHeader title="필수 항목"/>
                            <RadioInput title={'품목 종류'} target={type} onChangeEvent={isUpdate ? null : setType}
                                        opacity={true}
                                        contents={[{value: 0, title: '원자재'}, {value: 1, title: '반제품'}, {
                                            value: 2, title: '부자재'
                                        }, {value: 3, title: '완제품'}]}/>

                            <NormalInput title={'품목(품목명)'} value={inputData.material_name}
                                         onChangeEvent={(input) => setInputData(`material_name`, input)}
                                         description={'품목명을 입력해주세요.'}/>
                            {type === 3 &&
                            <div>
                                <NormalInput title={'모델'} value={inputData.material_name}
                                             onChangeEvent={(input) => setInputData(`material_name`, input)}
                                             description={'모델을 입력해주세요'}/>
                                <InputContainer title={''} width={167.84}>
                                    <ProcessAddButton onClick={() => {
                                        // let tmpList = processData.processes
                                        // //@ts-ignore
                                        // tmpList.push({machine_pk: ''})
                                        // setProcessData({
                                        //     ...processData,
                                        //     processes: tmpList
                                        // })
                                    }}>
                                        <div style={{
                                            width: 872,
                                            height: 30,
                                            backgroundColor: '#f4f6fa',
                                            border: '1px solid #b3b3b3'
                                        }}>
                                            <div style={{alignSelf: 'center'}}>
                                                <p style={{color: '#b3b3b3',}}>+ 모델 추가</p>
                                            </div>
                                        </div>
                                    </ProcessAddButton>
                                </InputContainer>
                            </div>
                            }
                            {type === 0 &&
                            <NormalInput title={'제조사'} value={inputData.material_name}
                                         onChangeEvent={(input) => setInputData(`material_name`, input)}
                                         description={'제조사를 입력해주세요'}/>
                            }
                            <NormalNumberInput title={'안전재고'} value={inputData.safe_stock}
                                               onChangeEvent={(input) => setInputData(`safe_stock`, input)}
                                               description={'안전재고량을 입력해주세요 (단위 : kg)'}/>
                            {type === 0 || type === 3 &&
                            <NormalNumberInput title={'원가'} value={inputData.cost}
                                               onChangeEvent={(input) => setInputData(`cost`, input)}
                                               description={'원가를 입력해주세요 (단위 : 원)'}/>
                            }
                            {type === 0 &&
                            <NormalInput title={'재질 종류'} value={inputData.material_name}
                                         onChangeEvent={(input) => setInputData(`material_name`, input)}
                                         description={'재질 종류를 입력해주세요'}/>
                            }
                            <InputContainer title={'기본 위치'} width={167.84}>
                                <FactoryPickerModal select={inputData}
                                                    keyword={''}
                                                    option={1}
                                                    onClickEvent={(e) => {

                                                    }} text={'기본위치를 입력해주세요'}/>
                            </InputContainer>
                            <br/>
                            <ListHeader title="선택 항목"/>
                            <NormalNumberInput title={'품번'} value={inputData.safe_stock}
                                               onChangeEvent={(input) => setInputData(`safe_stock`, input)}
                                               description={'품번을 입력해주세요'}/>
                            {type !== 0 &&
                            <div>
                                <NormalNumberInput title={'가로 사이즈'} value={inputData.cost}
                                                   onChangeEvent={(input) => setInputData(`cost`, input)}
                                                   description={'가로 사이즈를 입력해주세요 (단위 : mm)'}/>
                                <NormalNumberInput title={'세로 사이즈'} value={inputData.cost}
                                                   onChangeEvent={(input) => setInputData(`cost`, input)}
                                                   description={'세로 사이즈를 입력해주세요 (단위 : mm)'}/>
                                <NormalNumberInput title={'높이 사이즈'} value={inputData.cost}
                                                   onChangeEvent={(input) => setInputData(`cost`, input)}
                                                   description={'높이 사이즈를 입력해주세요 (단위 : mm)'}/>
                            </div>
                            }
                            {type !== 0 && type !== 3 &&
                            <NormalNumberInput title={'원가'} value={inputData.cost}
                                               onChangeEvent={(input) => setInputData(`cost`, input)}
                                               description={'원가를 입력해주세요 (단위 : 원)'}/>
                            }
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
                                <GrayRegisterButton name={isUpdate ? '수정하기' : '등록하기'}/>
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
