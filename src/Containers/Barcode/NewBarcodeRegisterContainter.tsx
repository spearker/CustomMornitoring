import React, {useCallback, useEffect, useRef, useState} from 'react'
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import {API_URLS, getBarcode} from '../../Api/mes/barcode'
import useObjectInput from '../../Functions/UseInput'
import Header from '../../Components/Text/Header'
import * as _ from 'lodash'
import {getParameter} from '../../Common/requestFunctions'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT_RESOURCE} from '../../Api/SF_endpoint'
import BigWhiteBoxContainer from '../BigWhiteBoxContainer'
import InputHeader from '../../Components/Text/InputHeader'
import ColorDropdownInput from '../../Components/Input/ColorDropdownInput'
import ColorCustomPickerModal from '../../Components/Modal/ColorCustomPickerModal'
import RadioInput from '../../Components/Input/RadioInput'
import BarcodeInput from '../../Components/Input/BarcodeInput'
import WithTextBox from '../../Components/Input/WithTextBox'
import EmptyPlace from '../../Components/Box/EmptyPlace'
import IcPlus from '../../Assets/Images/ic_plus.png'
import LotPickerModal from '../../Components/Modal/LotPickerModal'
import {registerBasicItem} from '../../Api/mes/basic'


const indexList = ['기계 기본정보', '주변장치 기본정보', '금형 기본정보', '품목 기본정보']
const indexType = ['machine', 'device', 'mold', 'material', 'voucher']

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

const NewBarcodeRegisterContainer = ({match}: Props) => {

    const history = useHistory()

    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [reason, setReason] = useState('')
    const [barcodeImg, setBarcodeImg] = useState('')
    const [type, setType] = useState<number>(-1)
    const textBoxRef = useRef(null)

    const [rules, setRules] = useState<string[]>([''])
    const [inputData, setInputData] = useObjectInput('CHANGE', initialData)
    const [selectBarcode, setSelectBarcode] = useState<{ name?: string, pk?: string }>()
    const [selectMachine, setSelectMachine] = useState<{ name?: string, pk?: string }>()

    const [typeFilter, setTypeFilter] = useState<number>(0)
    const [lotNumber, setLotNumber] = useState({name: '', pk: ''})

    const getLoad = useCallback(async (barcode_pk) => {
        const tempUrl = `${API_URLS['barcode'].getBarcodeInfo}?pk=${barcode_pk}`
        const resultData = await getBarcode(tempUrl)

        setType(indexList.indexOf(resultData.main_type))
        setInputData('barcode_name', resultData.barcode_name)
        setSelectMachine({name: resultData.detail_type, pk: resultData.item_pk})
        setRules(resultData.barcode_number.split(','))
        setReason(resultData.description)

    }, [inputData, rules, barcodeImg, reason, type, selectMachine])


    const getData = useCallback(async () => {
        const tempUrl = `${API_URLS['barcode'].detailInfo}?pk=${match.params.barcode_pk}`
        const resultData = await getBarcode(tempUrl)

        setType(indexList.indexOf(resultData.main_type))
        setInputData('barcode_name', resultData.barcode_name)
        setBarcodeImg(`${SF_ENDPOINT_RESOURCE}${resultData.barcode_img_url}`)
        setSelectBarcode({name: resultData.barcode_name, pk: resultData.pk})
        setSelectMachine({name: resultData.detail_type, pk: resultData.item_pk})
        setRules(resultData.barcode_number.split(','))
        setReason(resultData.description)

    }, [inputData, rules, barcodeImg, reason, type, selectMachine])

    const postBarcodeRegister = useCallback(async () => {

        if (indexList[type] === undefined) {
            alert('기준 정보 항목은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (selectMachine?.name === undefined || selectMachine?.pk === undefined || selectMachine?.name === '' || selectMachine?.pk === '') {
            alert('세부 항목은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (lotNumber.name === undefined || lotNumber?.pk === undefined || lotNumber?.name === '' || lotNumber?.pk === '') {
            alert('품번/Lot번호는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (typeFilter === 0) {
            if (rules.toString() === '') {
                alert('바코드 번호는 필수 항목입니다. 반드시 바코드를 생성해주세요.')
                return
            } else if (rules.toString().replace(',', '').length < 12) {
                alert('바코드 번호는 12자 이상이어야 합니다.')
                return
            } else if (rules.toString().replace(',', '').length > 30) {
                alert('바코드 번호는 30자 이하여야 합니다.')
                return
            }
        }

        const data = {
            item_type: {main_type: indexList[type], detail_type: selectMachine?.name, lot_number: lotNumber.name},
            item_pk: lotNumber.pk,
            number_type: typeFilter === 0 ? 'custom' : 'auto',
            barcode_number: typeFilter === 0 ? rules.toString().toString().replace(/,/g, '-') : null,
            description: reason === '' ? null : reason
        }

        const tempUrl = `${API_URLS['barcode'].register}`
        const resultData = await registerBasicItem(tempUrl, data)
        if (resultData) {
            history.goBack()
        }

    }, [inputData, selectMachine, rules, barcodeImg, reason, type, typeFilter, lotNumber])

    const ruleLength = rules.toString().replace(',', '').length


    useEffect(() => {
        if (match.params.barcode_pk) {
            ////alert(`수정 페이지 진입 - pk :` + param)
            setIsUpdate(true)
            getData()
        }

    }, [])

    useEffect(() => {
        if (selectBarcode?.pk !== undefined) {
            getLoad(selectBarcode?.pk)
        }
    }, [selectBarcode])

    return (
        <>
            <Header title={isUpdate ? '바코드 수정' : '바코드 등록'}/>
            <BigWhiteBoxContainer>
                <div>
                    <InputHeader title="필수 항목"/>
                    <ColorDropdownInput
                        readonly={getParameter('pk') === "" ? false : true}
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
                                            noOnClick={getParameter('pk') === "" ? false : true}
                                            text={'세부 항목을 검색해주세요.'} type={indexType[type]}/>

                    <LotPickerModal select={lotNumber} text={'품번/Lot 번호를 검색 해주세요'}
                                    onClickEvent={(e) => {
                                        setLotNumber(e)
                                    }}
                    />

                    {getParameter('pk') === "" && <RadioBox>
                        <RadioInput title={'바코드 생성 방법'} width={120} line={true} target={typeFilter}
                                    id={'Input-method'}
                                    onChangeEvent={(e) => setTypeFilter(e)}
                                    contents={[{value: 0, title: '직접 입력'}, {value: 1, title: '자동 생성'}]}/>
                    </RadioBox>}

                    {typeFilter === 0 && <>
                        {
                            rules.length > 0 && rules[0] !== null &&
                            <>
                                <BarcodeText>
                                    <br/>
                                    <span>현재 적용된 바코드 규칙 <b
                                        style={{color: (Number(ruleLength) > 11 && Number(ruleLength) < 31) ? '#19B9DF' : '#FF341A'}}>{(Number(ruleLength) > 11 && Number(ruleLength) < 31) ? '(사용가능한 바코드 규칙입니다)' : '(12자리 이상 30자 이하로 가능합니다)'}</b></span>
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
                                padding={i === 0 ? '18px 0' : '0 0 18px 0'}
                                value={v}
                                onChangeEvent={(input) => {
                                    if (getParameter('pk') === "") {
                                        let temp = _.cloneDeep(rules)
                                        temp.splice(i, 1, input)
                                        setRules(temp)
                                    }
                                }}
                                onRemoveEvent={() => {
                                    if (getParameter('pk') === "") {
                                        let temp = _.cloneDeep(rules)
                                        temp.splice(i, 1)
                                        setRules(temp)
                                    }
                                }}/>
                        ))}

                        {getParameter('pk') === "" && 30 > rules.length && <WithTextBox title={''}
                                                                                        padding={rules.length > 0 && rules[0] !== null ? '0 0 18px 0' : '18px 0'}>
                            <InputBox onClick={() => {
                                let temp = _.cloneDeep(rules)
                                temp.push('')
                                setRules(temp)
                            }}>
                                <div className="plusBtn">
                                    <img alt="plus" src={IcPlus}/>
                                    <p>바코드 규칙 추가</p>
                                </div>
                            </InputBox>
                        </WithTextBox>}
                    </>
                    }
                    <WithTextBox title={'바코드 번호'}>
                        <InputBox>
                            <input type="text" disabled
                                   value={typeFilter === 0 ? rules.map(v => {
                                       if (v !== null) return v + `-`
                                   }).join().replace(/,/g, '').length === 0 ? '' : rules.map(v => {
                                       if (v !== null) return v + `-`
                                   }).join().replace(/,/g, '') : ''}
                                   placeholder={typeFilter === 0 ? '바코드 번호 생성 버튼을 눌러주세요.' : '등록완료시 자동 생성됩니다.'}/>
                        </InputBox>
                    </WithTextBox>

                    <EmptyPlace height={'40px'}/>
                    <InputHeader title="선택 항목"/>

                    <WithTextBox title={'바코드 설명'} borderUse stretch>
                        <Explanation
                            readOnly={getParameter('pk') === "" ? false : true}
                            maxLength={80}
                            ref={textBoxRef}
                            onChange={(e) => setReason(e.target.value)}
                            value={reason}
                            placeholder="내용을 입력해주세요 (80자 미만)"/>
                    </WithTextBox>
                </div>

                <div style={{width: 360, margin: '54px auto 0 auto'}}>
                    {isUpdate ?
                        <ButtonWrap
                            style={{fontSize: 18, padding: '10px 0', minWidth: 360}}
                            onClick={() => {
                                history.push('/new/basic/list/barcode')
                            }}>리스트보기
                        </ButtonWrap>
                        :
                        <>
                            <ButtonWrap
                                style={{fontSize: 18, padding: '10px 0', minWidth: 360}}
                                onClick={async () => {
                                    await postBarcodeRegister()
                                }}>등록하기
                            </ButtonWrap>
                        </>
                    }
                </div>
            </BigWhiteBoxContainer>
        </>
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

export default NewBarcodeRegisterContainer
