import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {Input} from 'semantic-ui-react'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import moment from 'moment'
import {POINT_COLOR} from '../../Common/configset'
import {API_URLS, getHistorySearch, postChitRegister} from '../../Api/mes/production'
import ProjectPlanPickerModal from '../../Components/Modal/ProjectPlanPickerModal'
import {useHistory} from 'react-router-dom'
import MemberPickerModal from '../../Components/Modal/MemberPickerModal'
import Notiflix from 'notiflix'
import RadioInput from '../../Components/Input/RadioInput'

interface modalData {
  name?: string,
  pk?: string
}

const regExp = /^(18|19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/

const ChitRegisterContainer = ({match}: any) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [memberType, setMemberType] = useState(-1)
  const [open, setOpen] = useState<boolean>(false)
  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [modalSelect, setModalSelect] = useState<{ production: { pk: string, project_name: string, material_name: string, supplier_name: string } }>({
    production: {material_name: '', supplier_name: '', pk: '', project_name: ''}
  })
  const history = useHistory()
  const [selectDateRange, setSelectDateRange] = useState<{ start: string, end: string }>({
    start: moment().format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
  })
  const [selectMember, setSelectMember] = useState<modalData>({})

  const [chitData, setChitData] = useState<{ project_pk: string, registerer: string, deadline: string, goal: Number }>({
    project_pk: '',
    registerer: '',
    deadline: moment().format('YYYY-MM-DD'),
    goal: 0
  })

  const postChitRegisterData = useCallback(async () => {
    if (selectMember.pk === undefined || selectMember.pk === '') {
      alert('등록자는 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (modalSelect.production?.pk === '') {
      alert('생산 계획은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectDate === '') {
      alert('납기일은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (Number(chitData.goal) <= 0) {
      alert('생산 목표 수량은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!selectDate.match(regExp)) {
      alert('납기일의 형식이 잘못되었습니다.')
      return
    }


    const tempUrl = `${API_URLS['chit'].register}`
    const resultData = await postChitRegister(tempUrl, {
      project_pk: modalSelect.production.pk,
      registerer: selectMember.pk,
      deadline: selectDate,
      goal: chitData.goal
    })

    if (resultData && resultData.status === 200) {
      history.goBack()
    }
  }, [chitData, modalSelect, selectDate])

  const postChitUpdateData = useCallback(async () => {
    if (selectMember.pk === undefined || selectMember.pk === '') {
      alert('등록자는 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (modalSelect.production?.pk === '') {
      alert('생산 계획은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectDate === '') {
      alert('납기일은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (Number(chitData.goal) <= 0) {
      alert('생산 목표 수량은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!selectDate.match(regExp)) {
      alert('납기일의 형식이 잘못되었습니다.')
      return
    }


    const tempUrl = `${API_URLS['chit'].update}`
    const resultData = await postChitRegister(tempUrl, {
      chit_pk: match.params.pk,
      registerer: selectMember.pk,
      deadline: selectDate,
      goal: chitData.goal
    })
    if (resultData && resultData.status === 200) {
      history.goBack()
    }
  }, [chitData, modalSelect, selectDate])

  const getChitUpdateData = async () => {
    const tempUrl = `${API_URLS['chit'].load}?pk=${match.params.pk}`
    const resultData = await getHistorySearch(tempUrl)

    if (resultData) {
      setSelectMember({name: resultData.registerer_name, pk: resultData.registerer})
      setModalSelect({
        production: {
          material_name: resultData.material_name,
          supplier_name: resultData.supplier_name,
          pk: resultData.pk,
          project_name: resultData.project_name
        }
      })
      setSelectDate(resultData.deadline)
      setChitData({...chitData, goal: resultData.goal})
    }
  }

  useEffect(() => {
    setSelectMember({})
  }, [memberType])

  useEffect(() => {
    if (match.params.pk) {
      getChitUpdateData()
      setIsUpdate(true)
    }
  }, [])

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{
            fontSize: 20,
            marginRight: 18,
            marginLeft: 3,
            fontWeight: 'bold'
          }}>{isUpdate ? '전표 수정' : '전표 등록'}</span>
        </div>
      </div>
      <ContainerMain>
        <div>
          <p className={'title'}>필수 항목</p>
        </div>
        <div>
          <table style={{color: 'black'}}>
            <tr>
              <td>• 등록자</td>
              <td>
                <MemberPickerModal onClickEvent={(e) => setSelectMember(e)}
                                   onChangeAuth={(e) => setMemberType(e)} auth={memberType}
                                   text={'등록자를 선택해 주세요'} select={selectMember} type={'등록자'}
                                   style={{width: 'calc(99% - 4px)'}}/>
              </td>
            </tr>
            <tr>
              <td>• 생산계획</td>
              <td><ProjectPlanPickerModal select={modalSelect.production} text={'생산계획을 검색해주세요.'}
                                          onClickEvent={(e) => setModalSelect({
                                            ...modalSelect,
                                            production: e
                                          })} disable={isUpdate} inputWidth={'calc(99% - 4px)'} buttonWid={30}/></td>
            </tr>
            <tr>
              <td>• 작업일</td>
              <td>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  width: 'calc(99% - 4px)',
                  margin: '0 auto'
                }}>
                  <InputBox style={{flex: 95}}>
                    <Input style={{width: '100%'}} placeholder="YYYY-MM-DD"
                           onChange={(e) => {
                             setSelectDate(e.target.value)
                           }} onBlur={() => {
                      if (!selectDate.match(regExp)) {
                        Notiflix.Report.Warning('올바르지 않은 형식입니다.', 'YYYY-MM-DD 형식에 맞추어 입력해주세요.', '확인')
                      }
                    }}
                           value={selectDate}/>
                  </InputBox>
                  <ColorCalendarDropdown unLimit select={selectDate} onClickEvent={(select) => {
                    setSelectDate(select)
                    setChitData({...chitData, deadline: select})
                  }} text={'날짜 선택'} type={'single'} customStyle={{marginLeft: 0}}/>
                </div>
              </td>
            </tr>
            <tr>
              <td>• 품목(품목명)</td>
              <td><Input disabled placeholder="Read only" value={modalSelect.production.material_name}/>
              </td>
            </tr>
            <tr>
              <td>• 납품 업체</td>
              <td><Input disabled placeholder="Read only" value={modalSelect.production.supplier_name}/>
              </td>
            </tr>
            <tr>
              <td>• 생산 목표 수량</td>
              <td><Input placeholder="생산 목표 수량은 입력해 주세요" type={'number'} value={chitData.goal}
                         onChange={(e) => setChitData({...chitData, goal: Number(e.target.value)})}/></td>
            </tr>
          </table>
        </div>
        <div style={{marginTop: 180}}>
          <ButtonWrap onClick={async () => {
            if (isUpdate) {
              await postChitUpdateData()
            } else {
              await postChitRegisterData()
            }
          }}>
            <div style={{}}>
              <p style={{fontSize: 18}}>전표 {isUpdate ? '수정하기' : '등록하기'}</p>
            </div>
          </ButtonWrap>
        </div>
      </ContainerMain>
    </div>
  )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: 798px;
    border-radius: 6px;
    background-color: white;
    padding: 35px 20px 0 20px;
    .title {
        font-size: 18px;
        font-family: NotoSansCJKkr-Bold;
        color: #19b8df;
        text-align: left;
    }
    table{
        width: 100%;
        height: 100%;
        margin-top: 35px;
    }
    td{
        font-family: NotoSansCJKkr-Bold;
        font-size: 15px;
        input{
            height: 28px;
            border: 0.5px solid #b3b3b3;
            width: 98%;
            background-color: #f4f6fa;
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

const CheckButton = Styled.button`
    position: absolute;
    bottom: 0px;
    height: 46px;
    width: 225px;
    div{
        width: 100%;
    }
    span{
        line-height: 46px;
        font-family: NotoSansCJKkr;
        font-weight: bold;
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
    width: 360px;
    height: 46px;
    box-sizing: border-box;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
  `
const InputBox = Styled.div`
&>div{
    &:first-child{
        &>input{
            width: 100%;
        }
    }
}
`

export default ChitRegisterContainer

