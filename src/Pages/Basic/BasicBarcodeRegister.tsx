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


const indexList = ['기계 기본정보', '주변장치 기본정보', '금형 기본정보', '품목 기본정보', '전표 리스트']
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

const BasicBarcodeRegister = ({match}: Props) => {

    const history = useHistory()

    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [reason, setReason] = useState('')
    const [barcodeImg, setBarcodeImg] = useState('')
    const [type, setType] = useState<number>(-1)
    const textBoxRef = useRef(null)


    const [rules, setRules] = useState<string[]>([''])
    const [inputData, setInputData] = useObjectInput('CHANGE', initialData)

    const [selectMachine, setSelectMachine] = useState<{ name?: string, pk?: string }>()


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

        const data = {
            pk: getParameter('pk'),
            barcode_name: inputData.barcode_name,
            item_type: {main_type: indexList[type], detail_type: selectMachine?.name},
            item_pk: selectMachine?.pk,
            barcode_number: rules.toString(),
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

        } else if (selectMachine?.name === undefined || selectMachine?.pk === undefined) {
            alert('상세항목은 필수 항목입니다. 반드시 선택해주세요.')
            return

        } else if (rules.toString() === '') {
            alert('바코드 번호는 필수 항목입니다. 반드시 바코드를 생성해주세요.')
            return
        }

        const data = {
            barcode_name: inputData.barcode_name,
            item_type: {main_type: indexList[type], detail_type: selectMachine?.name},
            item_pk: selectMachine?.pk,
            barcode_number: rules.toString(),
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
        console.log(match)
    }, [])

    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <Header title={isUpdate ? '바코드 정보수정' : '바코드 정보등록'}/>
                <WhiteBoxContainer>
                    <div>
                        <NormalInput title={'바코드 명'} value={inputData.barcode_name}
                                     onChangeEvent={(e) => setInputData('barcode_name', e)}
                                     description={'바코드 이름을 입력해주세요.'}/>
                        <DropdownInput title={'항목'} target={indexList[type]} contents={indexList}
                                       onChangeEvent={(input) => setType(input)}/>
                        <CustomPickerModal select={selectMachine} onClickEvent={(e) => setSelectMachine(e)}
                                           text={'세부 항목을 검색해주세요.'}
                                           type={indexType[type]}/>
                        {
                            rules.length > 0 && rules[0] !== null &&
                            <>
                                <BarcodeText><br/><span>현재 규칙</span><br/>{rules.map(v => {
                                    if (v !== null) return v + `-`
                                }).join().replace(/,/g, '')}</BarcodeText>
                                <p style={{
                                    textAlign: 'center',
                                    color: (Number(ruleLength) > 11 && Number(ruleLength) < 31) ? 'black' : 'red'
                                }}>{(Number(ruleLength) > 11 && Number(ruleLength) < 31) ? '사용 할 수 있는 바코드 규칙입니다.' : '자리수는 12자 이상 30자 이하로 가능합니다.'}</p>
                            </>
                        }
                        <FullAddInput title={'바코드 규칙'} onChangeEvent={() => {
                            let temp = _.cloneDeep(rules)
                            temp.push('')
                            setRules(temp)
                        }}>

                            {
                                rules.map((v, i) => {
                                    return (
                                        <BarcodeRulesInput title={`· 바코드 규칙 ${i + 1}`} value={v}
                                                           onRemoveEvent={() => {
                                                               let temp = _.cloneDeep(rules)
                                                               temp.splice(i, 1)
                                                               setRules(temp)
                                                           }}
                                                           onChangeEvent={(input) => {
                                                               let temp = _.cloneDeep(rules)
                                                               temp.splice(i, 1, input)
                                                               setRules(temp)
                                                           }}
                                        />
                                    )
                                })
                            }
                        </FullAddInput>
                        <InputContainer title={'바코드 번호'}>
                            <BodyDiv>
                                <InputWrapBox>
                                    <input type="text" disabled value={rules.map(v => {
                                        if (v !== null) return v + `-`
                                    }).join().replace(/,/g, '').length === 0 ? '' : rules.map(v => {
                                        if (v !== null) return v + `-`
                                    }).join().replace(/,/g, '')} placeholder={'바코드 번호 생성 버튼을 눌러주세요.'} style={{
                                        textAlign: 'left',
                                        border: 'solid 0.5px #d3d3d3',
                                        flex: 100,
                                        width: 'calc(100% - 90px)',
                                        padding: 6,
                                        backgroundColor: '#f4f6fa',
                                        paddingLeft: 8,
                                        fontSize: 14
                                    }}/>
                                </InputWrapBox>
                            </BodyDiv>
                        </InputContainer>
                        <ListHeader title="선택 항목"/>
                        <InputContainer title={'바코드 설명'} width={180}>
              <textarea maxLength={120} ref={textBoxRef} onChange={(e) => setReason(e.target.value)} value={reason}
                        style={{border: 0, fontSize: 14, padding: 12, height: '70px', width: 'calc(100% - 124px)'}}
                        placeholder="내용을 입력해주세요 (80자 미만)"/>
                        </InputContainer>
                    </div>
                    <div style={{marginTop: 72, marginLeft: 330}}>
                        {isUpdate ?
                            <ButtonWrap onClick={async () => {
                                await postBarcodeUpdate()
                            }}>
                                <div style={{width: 360, height: 46}}>
                                    <p style={{fontSize: 18, marginTop: 8}}>수정하기</p>
                                </div>
                            </ButtonWrap>
                            :
                            <ButtonWrap onClick={async () => {
                                await postBarcodeRegister()
                            }}>
                                <div style={{width: 360, height: 46}}>
                                    <p style={{fontSize: 18, marginTop: 8}}>등록하기</p>
                                </div>
                            </ButtonWrap>
                        }
                    </div>
                </WhiteBoxContainer>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: 827px;
    border-radius: 6px;
    background-color: white;
    padding: 35px 20px 0 20px;
    .title {
        font-size: 18px;
        font-family: NotoSansCJKkr;
        font-weight: bold;
        color: #19b8df;
        text-align: left;
    }
    table{
        width: 100%;
        height: 100%;
        margin-top: 35px;
    }
    td{
        font-family: NotoSansCJKkr;
        font-weight: bold;
        font-size: 15px;
        input{
            padding-left: 8px;
            font-family: NotoSansCJKkr;
            height: 28px;
            border: 0.5px solid #b3b3b3;
            width: calc( 100% - 8px );
            background-color: #f4f6fa;
            font-size: 15px;
            &::placeholder:{
                color: #b3b3b3;
            };
        }
        &:first-child{
            width: 133px;
            text-align: left;
        }
    }
    tr{
        height: 65px;
    }
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
  }
`


export default BasicBarcodeRegister
