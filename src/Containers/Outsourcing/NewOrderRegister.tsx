import React, {useCallback, useEffect, useState} from 'react'
import {POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import RegisterButton from '../../Components/Button/RegisterButton'
import {getToken} from '../../Common/tokenFunctions'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {uploadTempFile} from '../../Common/fileFuctuons'
import ListHeader from '../../Components/Text/ListHeader'
import {useHistory} from 'react-router-dom'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import InputContainer from '../InputContainer'
import Styled from 'styled-components'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import NormalAddressInput from '../../Components/Input/NormalAddressInput'
import useObjectInput from '../../Functions/UseInput'
import OutsourcingPickerModal from '../../Components/Modal/OutsourcingRegister'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import {API_URLS, getOutsourcingList, postOutsourcingRegister} from '../../Api/mes/outsourcing'
import DateInput from '../../Components/Input/DateInput'
import moment from 'moment'
import RadioInput from '../../Components/Input/RadioInput'
import NewItemPickerModal from '../../Components/Modal/NewItemPickerModal'
import { transferCodeToName } from '../../Common/codeTransferFunctions'
import BigWhiteBoxContainer from '../BigWhiteBoxContainer'

// 발주 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
interface Props {
  match: any;
  // chilren: string;
}


const pickerModalData = {
  productLot: [
    {title: '품목명', key: 'material_name', width: 100},
    {title: '로트번호', key: 'LOT', width: 70},
    {title: '현재 재고량', key: 'current_stock', width: 70},
    {title: '보관장소', key: 'location_name', width: 100},
    {title: '재질', key: 'texture', width: 100},
    {title: '입고일', key: 'warehousing_date', width: 100},
  ],
  product: [
    {title: '품목명', key: 'material_name', width: 100},
    {title: '품목 종류', key: 'material_type', width: 100},
    {title: '현재 수량', key: 'stock', width: 100},
    {title: '공장', key: 'location', width: 100},
  ],
}

const NewOutsourcingRegister = ({match}: Props) => {
  const history = useHistory()

  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [pk, setPk] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [no, setNo] = useState<number>()
  const [type, setType] = useState<number>(0) //0: 법인, 1:개인
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [fax, setFax] = useState<string>('')
  const [phoneM, setPhoneM] = useState<string>('')
  const [emailM, setEmailM] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [manager, setManager] = useState<string>('')
  const [ceo, setCeo] = useState<string>('')
  const [infoList, setInfoList] = useState<IInfo[]>([])

  const [paths, setPaths] = useState<any[1]>([null])
  const [oldPaths, setOldPaths] = useState<any[1]>([null])

  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))

  const [selectMaterial, setSelectMaterial] = useState<{ name?: string, pk?: string }>()
  const [selectOutsource, setSelectOutsource] = useState<{ name?: string, pk?: string }>()
  const [quantity, setQuantity] = useState<number>()
  const [unpaid, setUnpaid] = useState<number>()
  const [paymentCondition, setPaymentCondition] = useState('')
  const [inputData, setInputData] = useObjectInput('CHANGE', {
    name: '',
    description: '',
    location: {
      postcode: '',
      roadAddress: '',
      detail: '',
    },

  })

  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  const [materialType, setMaterialType] = useState<number>(30)
  const [materials, setMaterials] = useState<any[]>([])
  const [sendMaterials, setSendMaterials] = useState<any[]>([])
  const [material, setMaterial] = useState<string>('')

  useEffect(() => {
    if (match.params.pk) {
      ////alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData()
    }
  }, [])


  /**
   * getData()
   * 기계 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @returns X
   */
  const getData = useCallback(async () => {

    const tempUrl = `${API_URLS['order'].load2}?pk=${match.params.pk}`
    const res = await getOutsourcingList(tempUrl)


    if (res) {
      //TODO: 에러 처리
      const data = res;
      setSelectOutsource({name: data.company_name, pk: data.company_pk});
      setInputData('location', data.address);
      setSelectDate(data.due_date);
      setPaymentCondition(data.payment_condition);

      setMaterialType(Number(data.type));
      setSendMaterials(data.material_info.map((v) => {
        return {material_pk: v.material_pk, count: Number(v.count), unpaid: v.unpaid === '' || v.unpaid === '0' || v.unpaid === 0 ? '0' : String(Number(v.unpaid))}
      }));
      setMaterials(data.material_info.map((v) => {
        return {...v, pk: v.material_pk, count: Number(v.count), unpaid: Number(v.unpaid), material_type: Number(data.type)}
      }));
    }
  }, [pk, selectOutsource, selectMaterial, selectDate, paymentCondition, inputData])

  /**
   * onsubmitFormUpdate()
   * 기계 정보 수정 요청
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @param {string} name 이름
   * @param {string} no 넘버
   * @param {object(file)} file 사진 파일
   * @param {string} info 상세정보
   * @param {string} made 제조정보
   * @param {string} type 종류
   * @param {string} madeNo 제조사넘버
   * @returns X
   */
  const onsubmitFormUpdate = useCallback(async () => {

      if (selectOutsource?.pk === '') {
        alert('외주처는 필수 항목입니다. 반드시 선택해주세요.')
        return
      } else if (sendMaterials.length === 0) {
        alert('품목은 필수 항목입니다. 반드시 선택해주세요.')
        return
      } else if (sendMaterials.filter(f => !(f.count) || f.count === 0).length > 0) {
        alert('수량은 필수 항목입니다. 반드시 입력해주세요.')
        return
      } else if (sendMaterials.filter(f => f.unpaid !== 0 && !(f.unpaid)).length > 0) {
        alert('미납 수량은 필수 항목입니다. 반드시 입력해주세요.')
        return
      } else if (paymentCondition === '') {
        alert('대급 지불조건은 필수 항목입니다. 반드시 입력해주세요.')
        return
      } else if (selectDate === '') {
        alert('납기일은 필수 항목입니다. 반드시 선택주세요.')
        return
      } else if (inputData.location.postcode === '') {
        alert('공장 주소는 필수 항목입니다. 반드시 입력해주세요.')
        return
      }

      const data = {
        pk: match.params.pk,
        company: selectOutsource?.pk,
        material_info: sendMaterials,
        due_date: selectDate.toString(),
        payment_condition: paymentCondition,
        address: inputData.location
      }
      const tempUrl = `${API_URLS['order'].update2}`
      const res = await postOutsourcingRegister(tempUrl, data)

      if (res) {
        history.push('/new/outsourcing/order/list')
      }
    }

    ,
    [match.params.pk, pk, selectOutsource, sendMaterials, selectDate, paymentCondition, inputData]
  )

  /**
   * onsubmitForm()
   * 기계 정보 등록
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {string} no 넘버
   * @param {string} info 상세정보
   * @param {string} made 제조정보
   * @param {string} type 종류
   * @param {string} madeNo 제조사넘버
   * @returns X
   */
  const onsubmitForm = useCallback(async () => {

    if (selectOutsource?.pk === '') {
      alert('외주처는 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (sendMaterials.length === 0) {
      alert('품목은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (sendMaterials.filter(f => !(f.count) || f.count === 0).length > 0) {
      alert('수량은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (sendMaterials.filter(f => f.unpaid !== '0' && !(f.unpaid)).length > 0) {
      alert('미납 수량은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (paymentCondition === '') {
      alert('대급 지불조건은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (selectDate === '') {
      alert('납기일은 필수 항목입니다. 반드시 선택주세요.')
      return
    } else if (inputData.location.postcode === '') {
      alert('공장 주소는 필수 항목입니다. 반드시 입력해주세요.')
      return
    }
    
    const data = {
      company: selectOutsource?.pk,
      material_info: sendMaterials,
      due_date: selectDate.toString(),
      payment_condition: paymentCondition,
      address: inputData.location
    }

    const tempUrl = `${API_URLS['order'].register2}`
    const res = await postOutsourcingRegister(tempUrl, data)


    if (res) {
      //TODO: 에러 처리
      history.push('/new/outsourcing/order/list')
    }

  }, [selectOutsource, sendMaterials, selectDate, paymentCondition, inputData])


  return (
    <div>
      <Header
        title={isUpdate ? '발주 수정' : '발주 등록'}
      />
      <BigWhiteBoxContainer padding={'35px 20px 20px 20px'}>
        <ListHeader title="필수 항목"/>
        <InputContainer title={'외주처 명'} width={120}>
          <OutsourcingPickerModal select={selectOutsource}
                                  onClickEvent={(e) => {
                                    setSelectOutsource({...selectOutsource, ...e})
                                  }} text={'외주처 명을 검색해주세요.'}/>
        </InputContainer>

        <>
        <RadioBox>
            <RadioInput 
                title={'품목 종류'}
                id={''}
                contents={[
                {value: 30, title: '완제품'},
                {value: 10, title: '반제품'}
                ]}
                target={materialType}
                onChangeEvent={(e) => {
                setMaterials([])
                setSendMaterials([])
                setMaterialType(e)
                }}
                width={120}
                line={false}/>
        </RadioBox>
        <div style={{display: 'flex'}}>
          <div style={{width: 120}} />
          <div style={{width: 'calc(100% - 120px)', border: '0.5px solid #b3b3b3', fontFamily: 'NotoSansCJKkr', fontWeight: 'bold', fontSize: 15}}>
            <NewItemPickerModal isMultiSelect onClickEvent={(e) => {
              setMaterials(e.map((v) => {
                return {...v, current_count: v.current_stock, count: v.current_stock, unpaid: String(v.current_stock)}
              }))
              setSendMaterials(e.map((v) => {
                return {material_pk: v.pk, current_count: v.current_stock, count: v.current_stock, unpaid: v.current_stock === 0 || v.current_stock === '0' ? '0' : String(Number(v.current_stock))}
              }))
            }}
              text={'품목을 선택해주세요'} type={materialType === 30 ? 'rawlot' : 'product'} title={'품목'}
              mainKey={'LOT'}
              etc={
                materialType === 30
                  ? `option=1${material ? `&material=${material}` : ''}`
                  : `option=1&filter=10`
              }
              tableHeaderValue={materialType === 30 ? pickerModalData.productLot : pickerModalData.product}
              select={materials}
            />
            <div>
              {
                //@ts-ignore
                materials && materials.length !== 0
                  ?
                  <div style={{width: '100%', height: 'auto'}}>
                    <div style={{
                      display: 'flex',
                      marginTop: 5,
                      padding: 5
                    }}>
                      <div style={{flex: 1, textAlign: 'left'}}>품목타입
                      </div>
                      <div style={{flex: 1, textAlign: 'left'}}>품목명
                      </div>
                      {
                        materialType === 10 && <div style={{flex: 1, textAlign: 'left'}}>현재 수량
                        </div>
                      }
                      <div style={{flex: 1, textAlign: 'left'}}>발주 수량
                      </div>
                      <div style={{flex: 1, textAlign: 'left'}}>미납 수량
                      </div>
                    </div>
                    {
                      //@ts-ignore
                      materials && materials.map((value, index) => {
                        return <div style={{
                          display: 'flex',
                          marginTop: 5,
                          padding: 5
                        }}>
                          <div style={{
                            flex: 1, textAlign: 'left',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                          }}>
                            <p
                              style={{
                                textAlign: 'left',
                              }}>{transferCodeToName('material', value.material_type)}</p>
                          </div>
                          <div style={{
                            flex: 1, textAlign: 'left',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                          }}>
                            <p
                              style={{
                                textAlign: 'left',
                              }}>{value.material_name}</p>
                          </div>
                          {
                            materialType === 10 && <div style={{
                              flex: 1, textAlign: 'left',
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center'
                            }}>
                                <p
                                    style={{
                                      textAlign: 'left',
                                    }}>{value.stock}</p>
                            </div>
                          }
                          <div style={{
                            flex: 1,
                            textAlign: 'left',
                            width: 112,
                            height: 36
                          }}>
                            <input type={'number'}
                                    style={{
                                      width: '112px',
                                      height: '24px',
                                      padding: 0,
                                      margin: '5px 0'
                                    }}
                                    value={
                                      //@ts-ignore
                                      materials[index].count ? materials[index].count + '' : 0
                                    }
                                    onChange={(e) => {
                                      const tmpDetailMaterials = materials
                                      const tmpDetailSendMaterials = sendMaterials

                                      //@ts-ignore
                                      tmpDetailMaterials[index] = {
                                        //@ts-ignore
                                        ...tmpDetailMaterials[index],
                                        count: Number(e.target.value)
                                      }

                                      //@ts-ignore
                                      tmpDetailSendMaterials[index] = {
                                        //@ts-ignore
                                        ...tmpDetailSendMaterials[index],
                                        count: e.target.value === '' || e.target.value === '0' ? '0' : String(Number(e.target.value))
                                      }

                                      setMaterials([...tmpDetailMaterials])
                                      setSendMaterials([...tmpDetailSendMaterials])

                                    }}/>
                          </div>
                          
                          <div style={{
                            flex: 1,
                            textAlign: 'left',
                            width: 112,
                            height: 36
                          }}>
                            <input type={'number'}
                                    style={{
                                      width: '112px',
                                      height: '24px',
                                      padding: 0,
                                      margin: '5px 0'
                                    }}
                                    value={
                                      //@ts-ignore
                                      materials[index].unpaid ? materials[index].unpaid + '' : 0
                                    }
                                    onChange={(e) => {
                                      const tmpDetailMaterials = materials
                                      const tmpDetailSendMaterials = sendMaterials

                                      //@ts-ignore
                                      tmpDetailMaterials[index] = {
                                        //@ts-ignore
                                        ...tmpDetailMaterials[index],
                                        unpaid: Number(e.target.value)
                                      }

                                      //@ts-ignore
                                      tmpDetailSendMaterials[index] = {
                                        //@ts-ignore
                                        ...tmpDetailSendMaterials[index],
                                        unpaid: e.target.value === '' || e.target.value === '0' ? '0' : String(Number(e.target.value))
                                      }

                                      setMaterials([...tmpDetailMaterials])
                                      setSendMaterials([...tmpDetailSendMaterials])

                                    }}/>
                          </div>
                        </div>
                      })
                    }
                  </div>
                  : <div style={{padding: '10px 0 10px 0', textAlign: 'center'}}>발주 할 품목을
                    선택해주세요.</div>
                }
              </div>
            </div>
          </div>
        </>
        <NormalInput title={'대금 지불조건'} value={paymentCondition} onChangeEvent={setPaymentCondition}
                     description={'대금 지불조건을 입력해 주세요.'} width={120}/>
        <DateInput title={'납기일'} description={''} value={selectDate} onChangeEvent={setSelectDate} width={135}
                   style={{width: '100%'}} inputStyle={{boxSizing: 'border-box'}}/>
        <NormalAddressInput title={'공장 주소'} value={inputData.location} titleWidth={'120px'}
                            onChangeEvent={(input) => setInputData(`location`, input)}/>
        
        <div style={{width: 360, margin: '54px auto 0 auto'}}>
          {isUpdate ?
              <ButtonWrap onClick={async () => {
                await onsubmitFormUpdate()
              }}>
                <div style={{width: 360, height: 40}}>
                  <p style={{fontSize: 18, marginTop: 15}}>수정하기</p>
                </div>
              </ButtonWrap>
            :
              <ButtonWrap 
                  style={{fontSize: 18, padding: '10px 0', minWidth: 360}}
                  onClick={async () => {
                      await onsubmitForm()
                  }}>등록하기
              </ButtonWrap>
          }
        </div>
      </BigWhiteBoxContainer>
    </div>
  )
}

  
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

export default NewOutsourcingRegister
