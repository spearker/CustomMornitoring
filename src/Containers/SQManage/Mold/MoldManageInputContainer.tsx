import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {uploadTempFile} from '../../../Common/fileFuctuons'
import {API_URLS, getProjectList} from '../../../Api/mes/production'
import {getParameter, postRequest} from '../../../Common/requestFunctions'
import {getToken} from '../../../Common/tokenFunctions'
import {POINT_COLOR, TOKEN_NAME} from '../../../Common/configset'
import Header from '../../../Components/Text/Header'
import WhiteBoxContainer from '../../WhiteBoxContainer'
import ListHeader from '../../../Components/Text/ListHeader'
import NormalInput from '../../../Components/Input/NormalInput'
import RadioInput from '../../../Components/Input/RadioInput'
import NormalNumberInput from '../../../Components/Input/NormalNumberInput'
import NormalFileInput from '../../../Components/Input/NormalFileInput'
import OldFileInput from '../../../Components/Input/OldFileInput'
import RegisterButton from '../../../Components/Button/RegisterButton'
import IcButton from '../../../Components/Button/IcButton'
import searchImage from '../../../Assets/Images/ic_search.png'
import ColorCalendarDropdown from '../../../Components/Dropdown/ColorCalendarDropdown'
import MachinePickerModal from '../../../Components/Modal/MachinePickerModal'
import moment from 'moment'
import Styled from 'styled-components'
import ProductionPickerModal from '../../../Components/Modal/ProductionPickerModal'
import InputContainer from '../../InputContainer'
import HistoryPickerModal from '../../../Components/Modal/HistoryPickerModal'
import {SF_ENDPOINT} from '../../../Api/SF_endpoint'

interface Props {
  match: any;
  // chilren: string;
}


const MoldManageInputContainer = ({match}: Props) => {

  const history = useHistory()
  const [open, setOpen] = useState<boolean>(false)
  const [selectHistory, setSelectHistory] = useState<{ name?: string, pk?: string }>({name: '', pk: ''})
  const [selectMaterial, setSelectMaterial] = useState<{ name?: string, pk?: string }>({name: '', pk: ''})
  const [selectMachine, setSelectMachine] = useState<{ name?: string, pk?: string }>({name: '', pk: ''})
  const [pk, setPk] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<number>()
  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [reason, setReason] = useState<string>('')
  const textBoxRef = useRef(null)
  const [infoList, setInfoList] = useState<IInfo[]>([])
  const [paths, setPaths] = useState<any[1]>([null])
  const [isUpdate, setIsUpdate] = useState<boolean>(false)


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
      setSelectHistory({name: res.history_name, pk: res.history_pk})
      setSelectMachine({name: res.machine_name, pk: res.machine_pk})
      setSelectMaterial({name: res.material_name, pk: res.material_pk})
      setName(res.checker)
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

    if (selectHistory.pk === '' || selectHistory.pk == undefined) {
      alert('작업 이력은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMaterial.pk === '' || selectMaterial.pk == undefined) {
      alert('품목(품목명)은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMachine.pk === '' || selectMachine.pk == undefined) {
      alert('기계은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (name === '' || name == undefined) {
      alert('검수자은 필수 항목입니다. 반드시 입력해주세요.')
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
      checker: name,
      amount: amount,
      date: selectDate,
      reason: reason
    }

    const res = await postRequest(`${SF_ENDPOINT}/a../../../defective/update/`, data, getToken(TOKEN_NAME))

    if (res === false) {
      //alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
    } else {
      //alert('성공적으로 수정 되었습니다')
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

    if (selectHistory.pk === '' || selectHistory.pk == undefined) {
      alert('작업 이력은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMaterial.pk === '' || selectMaterial.pk == undefined) {
      alert('품목(품목명)은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (selectMachine.pk === '' || selectMachine.pk == undefined) {
      alert('기계은 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (name === '' || name == undefined) {
      alert('검수자은 필수 항목입니다. 반드시 입력해주세요.')
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
      checker: name,
      amount: amount,
      date: selectDate,
      reason: reason
      // info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

    }


    const res = await postRequest(`${SF_ENDPOINT}/a../../../defective/register`, data, getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200) {
        //alert('성공적으로 등록 되었습니다')

        history.goBack()
      } else {
        //TODO:  기타 오류
      }
    }

  }, [selectHistory, selectMaterial, selectMachine, name, amount, selectDate, reason])


  return (
    <div>
      <Header title={isUpdate ? '불량 이력수정' : '불량 이력등록'}/>
      <WhiteBoxContainer>
        <ListHeader title="필수 항목"/>
        <NormalInput title={'금형명'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'금형 종류'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'제조 일자'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'제조(제품) 번호'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'최대 타수'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'점검 타수'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'적정 톤 수'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'공장/부속 공장'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'금형 치수(L)'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'금형 치수(W)'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'금형 치수(T)'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'투입 품목'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'생산 품목(완제품)'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>

        <NormalInput title={'제조사'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'현재 탸수'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'상금형 사진'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'하금형 사진'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
        <NormalInput title={'1타발 제조 개수'} value={name} onChangeEvent={setName} description={'검수자'} width={120}/>
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

export default MoldManageInputContainer
