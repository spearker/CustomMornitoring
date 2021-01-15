import React, {useCallback, useEffect, useRef, useState} from 'react'
import Styled from 'styled-components'
import {Input} from 'semantic-ui-react'
import {POINT_COLOR} from '../../Common/configset'
import {API_URLS, getBarcode, postBarcode} from '../../Api/mes/barcode'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import Old_BasicBarcodePickerModal from '../../Components/Modal/Old_BasicBarcodePickerModal'
import ListHeader from '../../Components/Text/ListHeader'
import CustomPickerModal from '../../Components/Modal/CustomPickerModal'
import NormalInput from '../../Components/Input/NormalInput'
import useObjectInput from '../../Functions/UseInput'
import Header from '../../Components/Text/Header'
import * as _ from 'lodash'
import WhiteBoxContainer from '../WhiteBoxContainer'
import InnerBodyContainer from '../InnerBodyContainer'
import InputContainer from '../InputContainer'
import DropdownInput from '../../Components/Input/DropdownInput'
import {getBarcodeTypeList} from '../../Common/codeTransferFunctions'
import FullAddInput from '../../Components/Input/FullAddInput'
import BarcodeRulesInput from '../../Components/Input/BarcodeRulesInput'
import {getReadyTimeData} from '../../Api/pm/statistics'
import {getParameter} from '../../Common/requestFunctions'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT, SF_ENDPOINT_RESOURCE} from '../../Api/SF_endpoint'
import BarcodePickerModal from '../../Components/Modal/BarcodePickerModal'


const indexList = ['기계 기본정보', '주변장치 기본정보', '금형 기본정보', '품목 기본정보']
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

const BarcodeRegisterContainer = ({match}: Props) => {

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

  const getBarcodeImg = useCallback(async () => {
    const tempUrl = `${API_URLS['barcode'].upload}?barcode_number=${rules.toString()}&barcode_type=${BarcodeType[0]}`
    const resultData = await getBarcode(tempUrl)


    setBarcodeImg(`${SF_ENDPOINT}/api/v1/barcode/previewImg?barcode_img_name=` + resultData.barcode_photo)
  }, [rules, barcodeImg])

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
    setBarcodeImg(resultData.barcode_img_url)
    setSelectBarcode({name: resultData.barcode_name, pk: resultData.pk})
    setSelectMachine({name: resultData.detail_type, pk: resultData.item_pk})
    setRules(resultData.barcode_number.split(','))
    setReason(resultData.description)

  }, [inputData, rules, barcodeImg, reason, type, selectMachine])

  const postBarcodeUpdate = useCallback(async () => {

    const data = {
      pk: match.params.barcode_pk,
      barcode_type: 'barcode',
      barcode_number: rules.toString(),
      barcode_img_name: barcodeImg.split('=')[1],
    }

    const tempUrl = `${API_URLS['barcode'].update}`
    const resultData = await postBarcode(tempUrl, data)

    history.goBack()
  }, [inputData, selectMachine, rules, barcodeImg, reason, type])

  const postBarcodeRegister = useCallback(async () => {

    if (inputData.barcode_name === '') {
      alert('표준 바코드는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (indexList[type] === undefined) {
      alert('항목은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMachine?.name === undefined || selectMachine?.pk === undefined) {
      alert('상세항목은 필수 항목입니다. 반드시 선택해주세요.')
      return

    } else if (rules.toString() === '' || barcodeImg.split('=')[1] === undefined) {
      alert('바코드 번호는 필수 항목입니다. 반드시 바코드를 생성해주세요.')
      return
    }

    const data = {
      pk: selectBarcode?.pk,
      barcode_type: 'barcode',
      barcode_number: rules.toString(),
      barcode_img_name: barcodeImg.split('=')[1],
    }
    const tempUrl = `${API_URLS['barcode'].register}`
    const resultData = await postBarcode(tempUrl, data)
    if (resultData === 200) {
      history.goBack()
    } else if (resultData === 2500) {
      alert('[ERROR] 바코드 번호와 생성된 바코드 이미지가 맞지 않습니다.')
    } else {
      alert('바코드 등록에 실패하였습니다.')
    }

  }, [inputData, selectMachine, rules, barcodeImg, reason, type])

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
    <div>
      <Header title={isUpdate ? '바코드 수정' : '바코드 등록'}/>
      <WhiteBoxContainer>
        <div>
          <InputContainer title={'표준 바코드'}>
            <BarcodePickerModal select={selectBarcode} onClickEvent={(e) => setSelectBarcode(e)}
                                notOpen={true}
                                text={'바코드를 선택해주세요'}/>
          </InputContainer>
          <DropdownInput title={'바코드 종류'} target={indexBarcodeType[0]} contents={indexBarcodeType}
                         onChangeEvent={(input) => setInputData(`barcode_type`, BarcodeType[0])}/>
          <DropdownInput title={'항목'} target={indexList[type]} contents={[]}
                         onChangeEvent={() => null}/>
          <CustomPickerModal select={selectMachine} onClickEvent={(e) => setSelectMachine(e)}
                             text={'세부 항목을 검색해주세요.'}
                             type={indexType[type]} noOnClick={true}/>
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
                  flex: 85,
                  borderRight: 0,
                  width: 'calc(100% - 90px)',
                  padding: 6,
                  backgroundColor: '#f4f6fa',
                  paddingLeft: 8,
                  fontSize: 14
                }}/>
                <SearchButton style={{flex: 15}}
                              onClick={() => (Number(ruleLength) > 11 && Number(ruleLength) < 31) ? getBarcodeImg() : null}>
                  <p>바코드 번호 생성</p>
                </SearchButton>
              </InputWrapBox>
            </BodyDiv>
          </InputContainer>
          <div style={{
            marginTop: 12,
            marginLeft: 180,
            width: 310,
            height: 173,
            lineHeight: 10,
            border: '1px solid #707070'
          }}>
            {barcodeImg === '' ?
              <p style={{fontFamily: 'NotoSansCJKkr', color: '#b3b3b3', textAlign: 'center'}}>바코드 이미지가
                없습니다.</p>
              :
              <img src={barcodeImg ? `${barcodeImg}` : ''}
                   style={{width: '100%', height: '100%', float: 'right'}}/>
            }
          </div>
          <ListHeader title="선택 항목"/>
          <InputContainer title={'바코드 설명'} width={180}>
                      <textarea maxLength={120} ref={textBoxRef}
                                disabled={true}
                                value={reason}
                                style={{
                                  backgroundColor: 'white',
                                  border: 0,
                                  fontSize: 14,
                                  padding: 12,
                                  height: '70px',
                                  width: 'calc(100% - 124px)',
                                  resize: 'none'
                                }}
                                placeholder="바코드 설명"/>
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
    </div>
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

const SearchButton = Styled.button`
width: 32px;
height: 32px;
background-color: ${POINT_COLOR};
border: 1px solid #b3b3b3;
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


export default BarcodeRegisterContainer
