import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {Button, Input} from 'semantic-ui-react'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import moment from 'moment'
import {POINT_COLOR} from '../../Common/configset'
import IcButton from '../../Components/Button/IcButton'
import searchImage from '../../Assets/Images/ic_search.png'
import dropdownButton from '../../Assets/Images/ic_dropdownbutton.png'
import {API_URLS, getMarketing, postOrderModify, postOrderRegister} from '../../Api/mes/marketing'
import ContractPickerModal from '../../Components/Modal/ContractPIckerModal'
import {useHistory} from 'react-router-dom'

interface Props {
  match: any;
}

const OrderModifyContainer = ({match}: Props) => {
  const history = useHistory()
  const [open, setOpen] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectOpen, setSelectOpen] = useState<boolean>(false)
  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [customer, setCustomer] = useState<string>('')
  const [material, setMaterial] = useState<string>('')
  const [pk, setPk] = useState<string>('')
  const [orderData, setOrderData] = useState<{
    pk: string
    customer_name: string
    material_name: string
    amount: number
    date: string
    stock: number
    deadline: string
  }>({
    pk: '',
    customer_name: '',
    material_name: '',
    amount: 0,
    date: '',
    stock: 0,
    deadline: ''
  })

  const getContractLoadData = useCallback(async () => {
    const tempUrl = `${API_URLS['shipment'].load}?pk=${match.params.pk}`
    const resultData = await getMarketing(tempUrl)

    setSelectDate(resultData.date)

    setCustomer(resultData.customer_name)
    setMaterial(resultData.material_name)
    setPk(resultData.pk)
    setOrderData({
      pk: resultData.contract_pk,
      customer_name: resultData.customer_name,
      material_name: resultData.material_name,
      amount: resultData.amount,
      date: resultData.date,
      stock: resultData.stock,
      deadline: resultData.deadline
    })
  }, [])

  const postContractUpdateData = useCallback(async () => {
    const tempUrl = `${API_URLS['shipment'].update}`
    const resultData = await postOrderRegister(tempUrl, {
      pk: pk,
      contract_pk: orderData.pk,
      amount: orderData.amount,
      date: selectDate
    })

    if (resultData) {
      history.goBack()
    }
  }, [orderData])

  useEffect(() => {
    getContractLoadData()
  }, [])
  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>출하 수정</span>
        </div>
      </div>
      <ContainerMain>
        <div>
          <p className={'title'}>필수 항목</p>
        </div>
        <div>
          <table style={{color: 'black'}}>
            <tr>
              <td>• 수주 리스트</td>
              <td>
                <ContractPickerModal select={orderData} onClickEvent={(e) => {
                  setOrderData(e)
                  setCustomer(e.customer_name)
                  setMaterial(e.material_name)
                }} text={'수주 리스트를 선택해 주세요.'}/>
              </td>
            </tr>
            <tr>
              <td>• 거래처 명</td>
              <td>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: '#f4f6fa',
                  border: '0.5px solid #b3b3b3',
                  height: 32
                }}>
                  <div style={{width: 885, display: 'table-cell'}}>
                    <div style={{marginTop: 5}}>
                      {
                        orderData.customer_name === '' || orderData.customer_name === undefined
                          ? <InputText>&nbsp; 수주 리스트가 입력되면 자동 입력됩니다.</InputText>
                          : <InputText
                            style={{color: '#111319'}}>&nbsp;{orderData.customer_name}</InputText>
                      }
                    </div>
                  </div>
                  <div style={{width: 28}} onClick={() => {
                    setSelectOpen(true)
                  }}>
                    <Button>
                      <img src={dropdownButton} style={{width: 32, height: 32}}/>
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>• 품목(품목명)</td>
              <td>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: '#f4f6fa',
                  border: '0.5px solid #b3b3b3'
                }}>
                  <div style={{width: 885}}>
                    <div style={{marginTop: 5}}>
                      {
                        orderData.material_name === '' || orderData.material_name === undefined
                          ? <InputText>&nbsp; 수주 리스트가 입력되면 자동 입력됩니다.</InputText>
                          : <InputText
                            style={{color: '#111319'}}>&nbsp;{orderData.material_name}</InputText>
                      }
                    </div>
                  </div>
                  <div style={{width: 32}} onClick={() => {
                    setOpen(true)
                  }}>
                    <IcButton customStyle={{width: 32, height: 32}} image={searchImage} dim={true}
                              onClickEvent={() => {
                                setOpen(true)
                              }}/>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>• 현재 수량</td>
              <td>
                <div style={{display: 'flex'}}>
                  <input placeholder="수주 리스트가 입력되면 자동 입력됩니다." onChange={(e) => setOrderData({
                    ...orderData,
                    amount: Number(e.target.value)
                  })} disabled value={orderData.stock}/>
                </div>
              </td>
            </tr>
            <tr>
              <td>• 수량</td>
              <td>
                {isOpen ?
                  <div style={{display: 'flex'}}>
                    <input placeholder="수주 리스트가 입력되면 자동 입력됩니다." onChange={(e) => setOrderData({
                      ...orderData,
                      amount: Number(e.target.value)
                    })} value={Number(orderData.amount) === 0 ? '' : Number(orderData.amount)}/>
                    <BoxWrap style={{height: 36}}>
                                            <span className="p-bold" onClick={() => {
                                              setIsOpen(false)
                                            }}>수량 변경</span>
                    </BoxWrap>
                  </div> :
                  <div style={{display: 'flex'}}>
                    <input placeholder="수주 리스트가 입력되면 자동 입력됩니다." disabled={true}
                           onChange={(e) => setOrderData({
                             ...orderData,
                             amount: Number(e.target.value)
                           })}
                           value={Number(orderData.amount) === 0 ? '' : Number(orderData.amount)}/>
                    <BoxWrap style={{height: 36}}>
                                            <span className="p-bold" onClick={() => {
                                              setIsOpen(true)
                                            }}>수량 변경</span>
                    </BoxWrap>
                  </div>
                }
              </td>
            </tr>
            <tr>
              <td>• 출하 날짜</td>
              <td>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: '#f4f6fa',
                  border: '0.5px solid #b3b3b3',
                  height: 32
                }}>
                  <div style={{width: 817, display: 'table-cell'}}>
                    <div style={{marginTop: 5}}>
                      {
                        selectDate === ''
                          ? <InputText>&nbsp; 수주 날짜를 선택해 주세요</InputText>
                          : <InputText
                            style={{color: '#111319'}}>&nbsp; {selectDate}</InputText>
                      }
                    </div>
                  </div>
                  <ColorCalendarDropdown unLimit select={selectDate} onClickEvent={(select) => {
                    setSelectDate(select)
                    setOrderData({...orderData, date: select})
                  }} text={'날짜 변경'} type={'single'} customStyle={{height: 32, marginLeft: 0}}/>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div style={{marginTop: 40}}>
          <ButtonWrap onClick={async () => {
            await postContractUpdateData()
          }}>
            <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
              <p style={{fontSize: 18}}>수정하기</p>
            </div>
          </ButtonWrap>
        </div>
      </ContainerMain>
    </div>
  )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: 556px;
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
            height: 32px;
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

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`

const BoxWrap = Styled.button`
    padding: 4px 15px 5px 15px;
    color: black;
    min-width: 100px;
    height: 300px;
    background-color: #19b9df;
    border: none;
    font-weight: bold;
    text-align: center;
    font-size: 13px;
    .react-calendar{
        border: 0;
    }
`

export default OrderModifyContainer
