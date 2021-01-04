import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {uploadTempFile} from '../../Common/fileFuctuons'
import {API_URLS, getProjectList, postChitRegister} from '../../Api/mes/production'
import {getParameter, postRequest} from '../../Common/requestFunctions'
import {getToken} from '../../Common/tokenFunctions'
import {POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../WhiteBoxContainer'
import ListHeader from '../../Components/Text/ListHeader'
import NormalInput from '../../Components/Input/NormalInput'
import RadioInput from '../../Components/Input/RadioInput'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import NormalFileInput from '../../Components/Input/NormalFileInput'
import OldFileInput from '../../Components/Input/OldFileInput'
import RegisterButton from '../../Components/Button/RegisterButton'
import IcButton from '../../Components/Button/IcButton'
import searchImage from '../../Assets/Images/ic_search.png'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import MachinePickerModal from '../../Components/Modal/MachinePickerModal'
import moment from 'moment'
import Styled from 'styled-components'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import InputContainer from '../InputContainer'
import HistoryPickerModal from '../../Components/Modal/HistoryPickerModal'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import MemeberPickerModal from '../../Components/Modal/MemberPickerModal'
import {worker} from 'cluster'
import {postStockRegister} from '../../Api/mes/manageStock'
import DateInput from '../../Components/Input/DateInput'

interface Props {
  match: any;
  // chilren: string;
}

interface modalData {
  name?: string,
  pk?: string
}

const DefectiveRegisterContainer = ({match}: Props) => {

  const history = useHistory()
  const [open, setOpen] = useState<boolean>(false)
  const [selectHistory, setSelectHistory] = useState<{
    amount: number
    machine_name: string
    machine_pk: string
    material_name: string
    material_pk: string
    pk: string
    process_name: string
    worked: string
    worker: string
    worker_name: string
  }>()
  const [selectMaterial, setSelectMaterial] = useState<{ name?: string, pk?: string }>({name: '', pk: ''})
  const [selectMachine, setSelectMachine] = useState<{ name?: string, pk?: string }>({name: '', pk: ''})
  const [pk, setPk] = useState<string>('')
  const [name, setName] = useState<{ name?: string, pk?: string }>({name: '', pk: ''})
  const [amount, setAmount] = useState<number>()
  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [reason, setReason] = useState<string>('')
  const textBoxRef = useRef(null)
  const [infoList, setInfoList] = useState<IInfo[]>([])
  const [paths, setPaths] = useState<any[1]>([null])
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [selectMember, setSelectMember] = useState<modalData>({})
  const [memberType, setMemberType] = useState(-1)

  useEffect(() => {
    if (match.params.pk) {
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

    const tempUrl = `${API_URLS['defective'].load}?pk=${match.params.pk}`
    const res = await getProjectList(tempUrl)

    if (res === false) {
      //TODO: 에러 처리
    } else {
      //console.log('resresres------->', res)

      setPk(res.pk)

      setSelectHistory({
        amount: res.amount,
        machine_name: res.machine_name,
        machine_pk: res.machine_pk,
        material_name: res.material_name,
        material_pk: res.material_pk,
        pk: res.history_pk,
        process_name: res.process_name,
        worked: res.worked,
        worker: res.checker,
        worker_name: res.checker_name,
      })
      setSelectMachine({name: res.machine_name, pk: res.machine_pk})
      setSelectMaterial({name: res.material_name, pk: res.material_pk})
      setSelectMember({name: res.checker_name, pk: res.checker})
      setName(res.checker_name)
      setAmount(res.amount)
      setSelectDate(res.date)
      setReason(res.reason)


    }
  }, [pk, name, amount, paths])

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

    if (!selectHistory || selectHistory.pk === '' || selectHistory.pk == undefined) {
      alert('작업 이력은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMaterial.pk === '' || selectMaterial.pk == undefined) {
      alert('품목(품목명)은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMachine.pk === '' || selectMachine.pk == undefined) {
      alert('기계는 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMember.pk === '' || selectMember.pk == undefined) {
      alert('검수자는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (amount === null || amount == undefined) {
      alert('불량개수는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (selectDate === '' || selectDate == undefined) {
      alert('불량 검수일은 필수 항목입니다. 반드시 선택주세요.')
      return
    } else if (reason === '' || reason == undefined) {
      alert('불량 사유는 필수 항목입니다. 반드시 입력해주세요.')
      return
    }

    const data = {
      pk: pk,
      // name: name,
      // number: amount,
      // photo: paths[0],
      //info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,
      history_pk: selectHistory.pk,
      material_pk: selectMaterial.pk,
      machine_pk: selectMachine.pk,
      checker: selectMember.pk,
      amount: amount,
      date: selectDate,
      reason: reason
    }

    const tempUrl = `${API_URLS['defective'].update}`
    const res = await postChitRegister(tempUrl, data)

    if (res) {
      setIsUpdate(false)
      history.goBack()
    }

  }, [pk, name, amount, paths, selectHistory, selectMaterial, selectMachine, selectDate, reason])

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
    // console.log(infoList)
    // alert(JSON.stringify(infoList))
    // console.log(JSON.stringify(infoList))

    if (!selectHistory || selectHistory.pk === '' || selectHistory.pk == undefined) {
      alert('작업 이력은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMaterial.pk === '' || selectMaterial.pk == undefined) {
      alert('품목(품목명)은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMachine.pk === '' || selectMachine.pk == undefined) {
      alert('기계은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMember.pk === '' || selectMember.pk == undefined) {
      alert('검수자는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (amount === null || amount == undefined) {
      alert('불량개수는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (selectDate === '' || selectDate == undefined) {
      alert('불량 검수일은 필수 항목입니다. 반드시 선택주세요.')
      return
    } else if (reason === '' || reason == undefined) {
      alert('불량 사유는 필수 항목입니다. 반드시 입력해주세요.')
      return
    }


    const data = {

      history_pk: selectHistory.pk,
      material_pk: selectMaterial.pk,
      machine_pk: selectMachine.pk,
      checker: selectMember.pk,
      amount: amount,
      date: selectDate,
      reason: reason
      // info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

    }


    const tempUrl = `${API_URLS['defective'].register}`
    const res = await postChitRegister(tempUrl, data)

    if (res) {
      history.goBack()
    }

  }, [selectHistory, selectMaterial, selectMachine, name, amount, selectDate, reason])

  useEffect(() => {
    if (selectHistory) {
      setSelectMaterial({name: selectHistory?.material_name, pk: selectHistory?.material_pk})
      setSelectMachine({name: selectHistory.machine_name, pk: selectHistory.machine_pk})
      setSelectMember({name: selectHistory.worker_name, pk: selectHistory.worker})
    }
  }, [selectHistory])

  useEffect(() => {
    setSelectMember({})
  }, [memberType])

  return (
    <div>
      <Header title={isUpdate ? '불량 이력수정' : '불량 이력등록'}/>
      <WhiteBoxContainer>
        <ListHeader title="필수 항목"/>
        <InputContainer title={'작업 이력'} width={120}>
          <HistoryPickerModal select={{name: selectHistory?.worker_name, pk: selectHistory?.pk}}
                              onClickEvent={(e) => setSelectHistory({...selectHistory, ...e})}
                              text={'작업자명을 검색해주세요.'} buttonWid={30} isAllItem={true}/>
        </InputContainer>
        <InputContainer title={'품목(품목명)'} width={120}>
          <ProductionPickerModal select={selectMaterial}
                                 onClickEvent={(e) => {
                                   setSelectMaterial({...selectMaterial, ...e})
                                 }} text={'품목명을 검색해주세요.'} type={1} buttonWid={30}/>
        </InputContainer>
        <InputContainer title={'기계'} width={120}>
          <div style={{width: '100%', paddingLeft: 10}}>
            <MachinePickerModal select={
              selectMachine && (selectMachine.name && selectMachine.pk) ? selectMachine : undefined
            } text={'기계명을 검색해 주세요'} onClickEvent={(e: { name?: string, pk?: string }) => {
              setSelectMachine({...selectMachine, name: e.name, pk: e.pk})
            }} buttonWid={30}/>
          </div>
        </InputContainer>
        <RadioInput title={''} target={memberType}
                    onChangeEvent={(e) => setMemberType(e)}
                    contents={[{value: -1, title: '모든 권한'}, {value: 0, title: '관리자'}, {
                      value: 1, title: '작업자'
                    }]}/>
        <InputContainer title={'검수자'} width={120}>
          <div style={{width: '100%', paddingLeft: 10}}>
            <MemeberPickerModal onClickEvent={(e) => setSelectMember(e)} type={'검수자'}
                                text={'검수자를 선택해 주세요'} select={selectMember}/>
          </div>
        </InputContainer>
        <NormalNumberInput title={'불량 개수'} value={amount} onChangeEvent={setAmount}
                           description={'불량 개수를 입력하세요.'}
                           width={120}/>
        <DateInput title={'검수일'} description={''} value={selectDate} onChangeEvent={setSelectDate} width={135}
                   style={{width: '100%'}} inputStyle={{boxSizing: 'border-box'}}/>
        <InputContainer title={'불량 사유'} width={120}>
            <textarea maxLength={160} ref={textBoxRef} onChange={(e) => setReason(e.target.value)}
                      style={{
                        border: 0, fontSize: 14, padding: 12, height: '70px', width: 'calc(100% - 124px)',
                        resize: 'none'
                      }}
                      placeholder="내용을 입력해주세요 (80자 미만)" value={reason}/>
        </InputContainer>
        <div style={{marginTop: 40, display: 'flex', justifyContent: 'center'}}>
          <ButtonWrap onClick={async () => {
            await isUpdate ? onsubmitFormUpdate() : onsubmitForm()
          }}>
            <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
              <p style={{fontSize: 18}}>{isUpdate ? '수정하기' : '등록하기'}</p>
            </div>
          </ButtonWrap>
        </div>
      </WhiteBoxContainer>
    </div>
  )
}

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
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

export default DefectiveRegisterContainer
