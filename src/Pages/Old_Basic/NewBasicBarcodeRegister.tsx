import React, {useCallback, useEffect, useRef, useState} from 'react'
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import {API_URLS, loadBasicItem, registerBasicItem} from '../../Api/mes/basic'
import ListHeader from '../../Components/Text/ListHeader'
import CustomPickerModal from '../../Components/Modal/CustomPickerModal'
import NormalInput from '../../Components/Input/NormalInput'
import useObjectInput from '../../Functions/UseInput'
import Header from '../../Components/Text/Header'
import * as _ from 'lodash'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import InputContainer from '../../Containers/InputContainer'
import DropdownInput from '../../Components/Input/DropdownInput'
import {getBarcodeTypeList} from '../../Common/codeTransferFunctions'
import FullAddInput from '../../Components/Input/FullAddInput'
import BarcodeRulesInput from '../../Components/Input/BarcodeRulesInput'
import {getParameter} from '../../Common/requestFunctions'
import {useHistory} from 'react-router-dom'
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import BigWhiteBoxContainer from '../../Containers/BigWhiteBoxContainer'
import InputHeader from '../../Components/Text/InputHeader'
import ColorDropdownInput from '../../Components/Input/ColorDropdownInput'
import ColorCustomPickerModal from '../../Components/Modal/ColorCustomPickerModal'
import RadioInput from '../../Components/Input/RadioInput'
import WithTextBox from '../../Components/Input/WithTextBox'
import IC_MINUS from '../../Assets/Images/ic_minus.png'
import IcPlus from '../../Assets/Images/ic_plus.png'
import BarcodeInput from '../../Components/Input/BarcodeInput'
import EmptyPlace from '../../Components/Box/EmptyPlace'

const indexList = ['기계', '주변장치', '금형', '품목', '원자재']
const indexType = ['machine', 'device', 'mold', 'material', 'voucher']
const indexBarcodeType = getBarcodeTypeList('kor')
const BarcodeType = ['barcode']

const initialData = {
    barcode_name: '',
    item_type: {main_type: '', detail_type: ''},
    item_pk: '',
    barcode_type: 'barcode',
    barcode_number: 0,
    barcode_img_name: '',
    description: ''
}

interface Props {
    match: any
}

const NewBasicBarcodeRegister = ({match}: Props) => {

    const history = useHistory()

    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [reason, setReason] = useState('')
    const [barcodeImg, setBarcodeImg] = useState('')
    const [type, setType] = useState<number>(-1)
    const textBoxRef = useRef(null)


    const [rules, setRules] = useState<string[]>([''])
    const [inputData, setInputData] = useObjectInput('CHANGE', initialData)

    const [selectMachine, setSelectMachine] = useState<{ name?: string, pk?: string }>()
    const [typeFilter, setTypeFilter] = useState<number>(-1)

    const [overlapCheck, setOverlapCheck] = useState<boolean>(false)

    const getLoad = useCallback(async () => {
        const tempUrl = `${API_URLS['barcode'].load}?pk=${getParameter('pk')}`
        const resultData = await loadBasicItem(tempUrl)

        setType(indexList.indexOf(resultData.main_type))
        setInputData('barcode_name', resultData.barcode_name)
        setSelectMachine({name: resultData.detail_type, pk: resultData.item_pk})
        setRules(resultData.barcode_number.split(','))
        setReason(resultData.description)

    }, [inputData, rules, barcodeImg, reason, type, selectMachine])

    const postBarcodeUpdate = useCallback(async () => {

        if (inputData.barcode_name === '') {
            alert('바코드 명은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (indexList[type] === undefined) {
            alert('항목은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (selectMachine?.name === undefined || selectMachine?.pk === undefined || selectMachine?.name === '' || selectMachine?.pk === '') {
            alert('상세항목은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (rules.toString() === '') {
            alert('바코드 번호는 필수 항목입니다. 반드시 바코드를 생성해주세요.')
            return
        } else if (rules.toString().replace(',','').length < 12) {
            alert('바코드 번호는 12자 이상이어야 합니다.')
            return
        } else if (rules.toString().replace(',','').length > 30) {
            alert('바코드 번호는 30자 이하여야 합니다.')
            return
        }

        const data = {
            pk: getParameter('pk'),
            barcode_name: inputData.barcode_name,
            item_type: {main_type: indexList[type], detail_type: selectMachine?.name},
            item_pk: selectMachine?.pk,
            barcode_number: rules.toString().replace(/,/g, '-'),
            description: reason
        }

        const tempUrl = `${API_URLS['barcode'].update}`
        const resultData = await registerBasicItem(tempUrl, data)

        if (resultData) {
            history.goBack()
        }
    }, [inputData, selectMachine, rules, barcodeImg, reason, type])

    const postBarcodeRegister = useCallback(async () => {
        
        if (inputData.barcode_name === '') {
            alert('바코드 명은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (indexList[type] === undefined) {
            alert('항목은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (selectMachine?.name === undefined || selectMachine?.pk === undefined || selectMachine?.name === '' || selectMachine?.pk === '') {
            alert('상세항목은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (rules.toString() === '') {
            alert('바코드 번호는 필수 항목입니다. 반드시 바코드를 생성해주세요.')
            return
        } else if (rules.toString().replace(',','').length < 12) {
            alert('바코드 번호는 12자 이상이어야 합니다.')
            return
        } else if (rules.toString().replace(',','').length > 30) {
            alert('바코드 번호는 30자 이하여야 합니다.')
            return
        }

        const data = {
            barcode_name: inputData.barcode_name,
            item_type: {main_type: indexList[type], detail_type: selectMachine?.name},
            item_pk: selectMachine?.pk,
            barcode_number: rules.toString().replace(/,/g, '-'),
            description: reason === '' ? null : reason
        }
        const tempUrl = `${API_URLS['barcode'].create}`
        const resultData = await registerBasicItem(tempUrl, data)

        if (resultData) {
            history.goBack()
        }

    }, [inputData, selectMachine, rules, barcodeImg, reason, type])

    const ruleLength = rules.toString().replace(',', '').length

    useEffect(() => {

        if (getParameter('pk') !== "") {
            setIsUpdate(true)
            getLoad()
        }

    }, [])

    useEffect(() => {
        setSelectMachine({name: '', pk: ''})
    }, [indexType[type]])

    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <Header title={isUpdate ? '바코드 표준 정보 수정' : '바코드 표준 정보 등록'}/>
                <BigWhiteBoxContainer>
                    <div>
                        <InputHeader title="필수 항목"/>
                        <ColorDropdownInput
                            contents={indexList} 
                            title={'기준 정보 항목'} 
                            value={indexList[type]}
                            onChangeEvent={(input) => setType(input)} 
                            placeholder={'기준 정보 항목을 선택해 주세요'}
                            valueType={'string'}
                            borderStyle={'solid 0.5px #d3d3d3'}
                            placeholderColor={'#11131930'}
                        />
                        
                        <ColorCustomPickerModal select={selectMachine} onClickEvent={(e) => setSelectMachine(e)}
                                                text={'세부 항목을 검색해주세요.'} type={indexType[type]}/>
                        
                        <RadioBox>
                            <RadioInput title={'바코드 생성 방법'} width={120} line={true} target={typeFilter}
                                        onChangeEvent={(e) => setTypeFilter(e)}
                                        contents={[{value: 0, title: '직접 입력'}, {value: 1, title: '자동 생성'}]}/>
                        </RadioBox>
                        
                        {
                            rules.length > 0 && rules[0] !== null &&
                            <>
                                <BarcodeText>
                                    <br/>
                                    <span>현재 적용된 바코드 규칙 <b style={{color: (Number(ruleLength) > 11 && Number(ruleLength) < 31) ? '#19B9DF' : '#FF341A'}}>{(Number(ruleLength) > 11 && Number(ruleLength) < 31) ? '(사용가능한 바코드 규칙입니다)' : '(12자리 이상 30자 이하로 가능합니다)'}</b></span>
                                    <br/>
                                    {rules.map(v => {
                                        if (v !== null) return v + `-`
                                    }).join().replace(/,/g, '')}
                                </BarcodeText>
                            </>
                        }

                        {rules.map((v, i) => (
                            <BarcodeInput
                                title={`바코드 규칙 ${i + 1}`} 
                                padding={i === 0 ? '18px 0' :'0 0 18px 0'} 
                                value={v} 
                                onChangeEvent={(input) => {
                                    let temp = _.cloneDeep(rules)
                                    temp.splice(i, 1, input)
                                    setRules(temp)
                                }} 
                                onRemoveEvent={() => {
                                    let temp = _.cloneDeep(rules)
                                    temp.splice(i, 1)
                                    setRules(temp)
                                }} />
                        ))}

                        {30 > rules.length && <WithTextBox title={''} padding={rules.length > 0 && rules[0] !== null ? '0 0 18px 0' : '18px 0'}>
                            <InputBox onClick={() => {
                                let temp = _.cloneDeep(rules)
                                temp.push('')
                                setRules(temp)
                            }}>
                                <div className="plusBtn">
                                    <img alt="plus" src={IcPlus} />
                                    <p>바코드 규칙 추가</p>
                                </div>
                            </InputBox>
                        </WithTextBox>}

                        <WithTextBox title={'바코드 번호'}>
                            <InputBox>
                                <input type="text" disabled 
                                    style={{width: 'calc(100% - 86px)'}}
                                    value={rules.map(v => {
                                        if (v !== null) return v + `-`
                                    }).join().replace(/,/g, '').length === 0 ? '' : rules.map(v => {
                                        if (v !== null) return v + `-`
                                    }).join().replace(/,/g, '')} placeholder={'바코드 번호 생성 버튼을 눌러주세요.'}/>
                                <button onClick={() => {
                                    setOverlapCheck(!overlapCheck)
                                }}>
                                    중복 확인
                                </button>
                            </InputBox>
                        </WithTextBox>

                        <EmptyPlace height={'40px'} />
                        <InputHeader title="선택 항목"/>
                        
                        <WithTextBox title={'바코드 설명'} borderUse stretch>
                            <Explanation 
                                maxLength={80}
                                ref={textBoxRef}
                                onChange={(e) => setReason(e.target.value)}
                                value={reason}
                                placeholder="내용을 입력해주세요 (80자 미만)" />
                        </WithTextBox>
                    </div>

                    <div style={{width: 360, margin: '54px auto 0 auto'}}>
                        {isUpdate ?
                            <ButtonWrap onClick={async () => {
                                await postBarcodeUpdate()
                            }}>
                                <div style={{width: '100%', height: 46}}>
                                    <p style={{fontSize: 18, marginTop: 8}}>수정하기</p>
                                </div>
                            </ButtonWrap>
                            :
                            <>
                                <ButtonWrap 
                                    style={{backgroundColor: overlapCheck ? POINT_COLOR : '#E7E9EB', color: overlapCheck ? 'black' : '#666D79', fontSize: 18, padding: '10px 0', minWidth: 360}}
                                    onClick={async () => {
                                        if(overlapCheck){
                                            await postBarcodeRegister()
                                        }
                                    }}>등록하기
                                </ButtonWrap>
                            </>
                        }
                    </div>
                </BigWhiteBoxContainer>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

const RadioBox = Styled.div`
    display: flex;
    align-items: center;
    *{
        align-items: center;
    }
    &>div{
        width: 100%;
        span {
            padding-top: 0px !important;
        }
    }
`

const InputBox = Styled.div`
    background-color: #f4f6fa;
    border: solid 0.5px #d3d3d3;
    display: flex;
    &>input{
        width: calc(100% - 28px);
        height: 100%;
        background-color: transparent;
        border: 0;
        padding: 0 10px;
    }
    &>button{
        width: 86px;
        height: 100%;
        background-color: rgb(25, 185, 223);
        border-left: 0.5px solid rgb(211, 211, 211);
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
    }
    &>div{
        &:not(.plusBtn){
            cursor: pointer;
            width: 28px;
            height: 100%;
            background-color: #B3B3B3;
            text-align: center;
            &>img{
                width: 25px;
                vertical-align: middle;
            }
        }
    }
    .plusBtn{
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 30%;
        &>img{
            width: 17px;
            height: 17px;
            margin-right: 5px;
        }
    }
`
const Explanation = Styled.textarea`
    width: calc(100% - 133px);
    height: 80px;
    padding: 5px 10px;
    background-color: #F4F6FA;
    border: 0.5px solid #d3d3d3;
    resize: none;
`

const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
`

const ProcessAddButton = Styled.button`
`

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`

const BodyDiv = Styled.div`
    font-size: 14px;
    width: calc(100% - 190px);
    padding: 0px;
`
const InputWrapBox = Styled.div`
    font-size: 14px;
    width: 100%;
    display: flex;
    background-color: #f4f6fa;
`

const BarcodeText = Styled.p`
  text-align: center;
  color: #555555;
  font-size: 16px;
  span{
    font-weight: bold;
    font-size: 13px;
    padding-top: 14px;
    color: #252525;
    &>b{
        font-weight: normal;
    }
  }
`


export default NewBasicBarcodeRegister
