import React, {useCallback, useEffect, useState} from 'react'
import {POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import RegisterButton from '../../Components/Button/RegisterButton'
import {getToken} from '../../Common/tokenFunctions'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {uploadTempFile} from '../../Common/fileFuctuons'
import ListHeader from '../../Components/Text/ListHeader'
import {useHistory} from 'react-router-dom'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import InputContainer from '../InputContainer'
import Styled from 'styled-components'
import useObjectInput from '../../Functions/UseInput'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import RegisterDropdown from '../../Components/Dropdown/RegisterDropdown'
import moment from 'moment'
import {transferStringToCode} from '../../Common/codeTransferFunctions'
import {SF_ENDPOINT, SF_ENDPOINT_RESOURCE} from '../../Api/SF_endpoint'
import {API_URLS, postStockRegister, getStockList, getItemSearch} from '../../Api/mes/manageStock'
import DateInput from '../../Components/Input/DateInput'
import NormalInput from '../../Components/Input/NormalInput'
import FactoryPickerModal from '../../Components/Modal/FactoryPickerModal'
import RadioInput from '../../Components/Input/RadioInput'
import Check from '../../Assets/Images/ic_checkbox_y.png'
import Radio from '../../Assets/Images/btn_radio.png'
import RadioCheck from '../../Assets/Images/btn_radio_check.png'
import {getBasicList} from '../../Api/mes/basic'
import Notiflix from 'notiflix'

interface Props {
  match: any;
  // chilren: string;
}

interface InputData {
  material_pk: String
  weight?: number
  location_pk: string
  LOT: string
  date: string
  inspections?: { inspection: string, isFine: boolean }[]
  passed?: boolean
  cost?: number
  quality_chart?: string
}

// 수주 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const WarehousingRegisterContainer_V2 = ({match}: Props) => {
  const history = useHistory()
  const [pk, setPk] = useState<string>('')
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [path, setPath] = useState<any>(null)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [texture, setTexture] = useState<string>('')
  const [w, setW] = useState<number>(0)
  const [d, setD] = useState<number>(0)
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)

  //생산품 검색
  const [location, setLocation] = useState<{ name: string, pk: string }>({name: '', pk: ''})
  const [radioList, setRadioList] = useState<number[]>([0, 0, 0, 0, 0])
  const [check, setCheck] = useState<number>(0)

  const [inputData, setInputData] = useState<InputData>({
    material_pk: '',
    weight: undefined,
    location_pk: '',
    LOT: '',
    date: moment().format('YYYY-MM-DD'),
    inspections: [],
    passed: false,
    cost: 0,
    quality_chart: ''
  })

  useEffect(() => {
    getData()
    if (match.params.warehousing_pk) {
      setPk(match.params.warehousing_pk)
      setIsUpdate(true)
      getDetailData()
    }

  }, [])

  const getData = async () => {

    const tempUrl = `${API_URLS['stock'].rawLoad}?pk=${match.params.pk}`
    const res = await getBasicList(tempUrl)

    if (res) {
      setTexture(res.texture)
      setW(res.material_spec_W)
      setD(res.material_spec_D)
      setInputData({
        ...inputData,
        material_pk: res.pk,
        inspections: res.inspections.map((v, i) => {
          return {
            inspection: v,
            isFine: false
          }
        })
      })
      setRadioList(new Array(res.inspections.length).fill(0))
    }
  }

  const getDetailData = async () => {
    const tempUrl = `${API_URLS['stock'].warehousingDetail}?pk=${match.params.warehousing_pk}`
    const res = await getBasicList(tempUrl)

    if (res) {
      setTexture(res.texture)
      setW(res.material_spec_W)
      setD(res.material_spec_D)
      setInputData({
        ...inputData,
        ...res
      })
      setLocation({name: res.location_name, pk: res.location_pk})
      setRadioList(new Array(res.inspections.length).fill(0))
      setCheck(res.passed ? 1 : 0)
      setRadioList(res.inspections.map(v => {
        return v.fine ? 1 : 0
      }))
    }
  }

  /**
   * addFiles()
   * 사진 등록
   * @param {object(file)} event.target.files[0] 파일
   * @returns X
   */
  const addFiles = async (event: any): Promise<void> => {

    if (event.target.files[0] === undefined) {

      return
    }

    const res = await uploadTempFile(event.target.files[0], true)

    if (res !== false) {
      setPath(res)
      setInputData({...inputData, quality_chart: res.results})
      return
    } else {
      return
    }
  }

  /**
   * onsubmitForm()
   * 입고 등록
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {string} no 넘버
   * @param {string} info 상세정보
   * @param {string} made 제조정보
   * @param {string} type 종류
   * @param {string} madeNo 제조사넘버
   * @returns X
   */
  const onsubmitForm = async () => {

    if (!inputData.weight || inputData.weight === 0) {
      alert('입고 중량은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (inputData.location_pk === '') {
      alert('위치는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (inputData.LOT === '') {
      alert('LOT번호는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (inputData.date === '') {
      alert('위치는 필수 항목입니다. 반드시 입력해주세요.')
      return
    }


    const tempUrl = `${API_URLS['stock'].warehousingRegister}`
    const res = await postStockRegister(tempUrl, {
      ...inputData,
      cost: inputData.cost === 0 ? undefined : inputData.cost,
      quality_chart: inputData.quality_chart === '' ? undefined : inputData.quality_chart,
      inspections: inputData.inspections && inputData.inspections.length !== 0 ? inputData.inspections : undefined,
      passed: inputData.inspections && inputData.inspections.length !== 0 ? check === 0 ? false : check === 1 ? true : inputData.passed : undefined,
    })


    if (res) {

      history.goBack()
    }

  }

  const onsubmitUpdateForm = async () => {
    console.log(inputData.location_pk)

    if (!inputData.weight || inputData.weight === 0) {
      alert('입고 중량은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (inputData.location_pk === '') {
      alert('위치는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (inputData.LOT === '') {
      alert('LOT번호는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (inputData.date === '') {
      alert('위치는 필수 항목입니다. 반드시 입력해주세요.')
      return
    }


    const tempUrl = `${API_URLS['stock'].warehousingUpdate}`
    const res = await postStockRegister(tempUrl, {
      ...inputData,
      cost: inputData.cost === 0 ? undefined : inputData.cost,
      quality_chart: !inputData.quality_chart || inputData.quality_chart === '' ? undefined : inputData.quality_chart,
      inspections: inputData.inspections && inputData.inspections.length !== 0 ? inputData.inspections : undefined,
      passed: inputData.inspections && inputData.inspections.length !== 0 ? check === 0 ? false : check === 1 ? true : inputData.passed : undefined,
    })


    if (res) {

      history.goBack()
    }

  }

  const getAutoLotNumber = async () => {
    const tempUrl = `${API_URLS['stock'].autoLotNumber}/0`
    const res = await getItemSearch(tempUrl)

    if (res) {
      setInputData({...inputData, LOT: res.results})
    }
  }

  const postDuplicateLot = async () => {
    const tempUrl = `${API_URLS['stock'].duplicateLot}`
    const res = await postStockRegister(tempUrl, {
      LOT: inputData.LOT
    })

    if (res) {
      if (res.results) {
        Notiflix.Report.Failure('사용 불가', '이미 사용중인 LOT번호입니다.', '확인')
      } else {
        Notiflix.Report.Success('사용 가능', '사용 가능한 LOT번호입니다.', '확인')
        setIsDuplicate(true)
      }
    }
  }

  return (
    <div style={{paddingBottom: 81}}>{console.log(inputData)}
      <Header title={isUpdate ? '원자재 입고 수정' : '원자재 입고 등록'}/>
      <WhiteBoxContainer>
        <ListHeader title={'필수 항목'}/>
        <NormalInput title={'재질'} value={texture} width={120}></NormalInput>
        <div style={{
          borderBottom: 'solid 0.5px #d3d3d3',
          display: 'flex',
          paddingTop: 17,
          paddingBottom: 17,
          verticalAlign: 'top'
        }}>
          <p style={{fontSize: 14, marginTop: 5, fontWeight: 700, width: 120, display: 'inline-block'}}>• 사이즈</p>
          <p style={{fontSize: 14, marginTop: 5, fontWeight: 700, width: 30, display: 'inline-block'}}>폭</p>
          <InputBox style={{width: 400}} type="text" value={String(w)} placeholder={'선택시 read only'} disabled/>
          <p style={{
            marginLeft: 13,
            fontSize: 14,
            marginTop: 5,
            fontWeight: 700,
            width: 40,
            display: 'inline-block'
          }}>두께</p>
          <InputBox style={{width: 400}} type="text" value={String(d)} placeholder={'선택시 read only'} disabled/>
        </div>
        <NormalNumberInput title={'입고 중량'} width={120} value={inputData.weight}
                           onChangeEvent={(input) => setInputData({...inputData, weight: input})}
                           description={'중량을 입력해주세요 (단위: t)'}/>
        <div style={{
          borderBottom: 'solid 0.5px #d3d3d3',
          display: 'flex',
          paddingTop: 17,
          paddingBottom: 17,
          verticalAlign: 'top'
        }}>
          <p style={{fontSize: 14, marginTop: 5, fontWeight: 700, width: 120, display: 'inline-block'}}>• 위치</p>
          <div style={{width: 921.63}}>
            <FactoryPickerModal onClickEvent={(e) => {
              setLocation(e)
              setInputData({...inputData, location_pk: e.pk})
            }} text={'위치를 선택해주세요'} keyword={'test'}
                                select={location} option={1} width={'100%'}/>
          </div>
        </div>
        <div style={{
          borderBottom: 'solid 0.5px #d3d3d3',
          display: 'flex',
          paddingTop: 17,
          paddingBottom: 17,
          verticalAlign: 'top'
        }}>
          <p style={{fontSize: 14, marginTop: 5, fontWeight: 700, width: 120, display: 'inline-block'}}>• 품번/Lot</p>
          <InputBox style={{width: 695}} type="text" value={inputData.LOT} placeholder={'품번/Lot 생산 버튼을 눌러 번호를 생성해 주세요'}
                    onChange={(e) => {
                      setInputData({...inputData, LOT: e.target.value})
                    }}/>
          <MiniButton style={{width: 113, marginRight: 8}} onClick={() => getAutoLotNumber()}><p>품번/Lot 생성</p>
          </MiniButton>
          <MiniButton style={{width: 83, marginRight: 8}} onClick={() => postDuplicateLot()}><p>중복 확인</p></MiniButton>
        </div>
        <DateInput title={'입고일'} description={''} value={date} onChangeEvent={setDate} width={135}
                   style={{width: '100%'}} inputStyle={{boxSizing: 'border-box'}}/>
        <br/>
        <ListHeader title={'선택 항목'}/>
        <NormalNumberInput title={'원가'} width={120} value={inputData.cost}
                           onChangeEvent={(input) => setInputData({...inputData, cost: input})}
                           description={'원가를 입력해주세요. (단위: 원)'}/>
        <div style={{
          borderBottom: 'solid 0.5px #d3d3d3',
          display: 'flex',
          paddingTop: 17,
          paddingBottom: 17,
          verticalAlign: 'top'
        }}>
          <p style={{fontSize: 14, marginTop: 5, fontWeight: 700, width: 120, display: 'inline-block'}}>• 품질 성적표</p>
          <InputBox style={{width: 725}} type="text" value={path ? path.results : ''} placeholder={'품질 성적표를 등록해 주세요'}
                    disabled/>
          <MiniButton style={{width: 83, marginRight: 8}}><a target='_blank'
                                                             href={path && SF_ENDPOINT_RESOURCE + path.url}>
            <p>보기</p></a></MiniButton>
          <input type="file" name="file" id={'file'} style={{display: 'none'}} onChange={(e) => addFiles(e)}/>
          {/*<MiniButton style={{width: 83, marginRight: 8}}><p>파일 선택</p></MiniButton>*/}
          <label htmlFor={'file'} style={{width: 83, backgroundColor: POINT_COLOR, padding: 3, cursor: 'pointer'}}>
            <p style={{textAlign: 'center', fontSize: '15px'}}>파일 선택</p>
          </label>
        </div>
        <div style={{
          borderBottom: 'solid 0.5px #d3d3d3',
          paddingTop: 17,
          paddingBottom: 17,
          verticalAlign: 'top'
        }}>
          {
            radioList.map((v, i) => {
              return (<div style={{
                display: 'flex',
                paddingTop: 18
              }}>
                <p style={{
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: 700,
                  width: 120,
                  display: 'inline-block'
                }}>{i === 0 ? '• 검수 항목' : ''}</p>
                <InputBox style={{width: 725}} type="text"
                          value={inputData.inspections ? inputData.inspections[i] ? inputData.inspections[i].inspection : '' : ''}
                          placeholder={'검수 항목'}
                          disabled/>
                <RadioBox>
                  <RadioInput title={''} width={0} line={false} target={radioList[i]} isPadding={0} index={i}
                              onChangeEvent={(e) => {
                                let tmp = radioList
                                tmp[i] = e
                                setRadioList([...tmp])
                                if (inputData.inspections) {
                                  let temp = inputData.inspections
                                  temp[i] = {...temp[i], isFine: e === 0 ? false : true}
                                  setInputData({
                                    ...inputData,
                                    inspections: temp
                                  })
                                }
                              }}
                              contents={[{title: '불량', value: 0}, {title: '양호', value: 1}]}/>
                </RadioBox>
              </div>)
            })
          }
        </div>
        <div style={{
          borderBottom: 'solid 0.5px #d3d3d3',
          display: 'flex',
          paddingTop: 17,
          paddingBottom: 17,
          verticalAlign: 'top'
        }}>
          <p style={{fontSize: 14, marginTop: 5, fontWeight: 700, width: 120, display: 'inline-block'}}>• 검수 결과</p>
          <RadioBox>
            <RadioInput title={''} width={0} line={false} target={check} isPadding={0} index={9999}
                        onChangeEvent={(e) => setCheck(e)}
                        contents={[{title: '불합격', value: 0}, {title: '합격', value: 1}]}/>
          </RadioBox>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
          <div style={{marginTop: 20}}>
            <ButtonWrap onClick={async () => {
              if (isUpdate) {
                await onsubmitUpdateForm()
              } else {
                await onsubmitForm()
              }
            }}>
              <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
                <p style={{fontSize: 18}}>{isUpdate ? '수정하기' : '등록하기'}</p>
              </div>
            </ButtonWrap>
          </div>
        </div>
      </WhiteBoxContainer>
    </div>
  )
}

const MiniButton = Styled.button`
    padding: 3px 12px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-size: 15px;
  `
const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 15px;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
  `
const InputBox = Styled.input`
                border: solid 0.5px #d3d3d3;
                font-size: 14px;
                padding: 6px;
                padding-left: 10px;
                width: calc(100% - 124px);
                background-color: #f4f6fa;
                `
const RadioBox = Styled.div`
  display: flex;
  align-items: center;
  *{
    align-items: center;
  }
  input::-ms-input-placeholder { color: #b3b3b3; }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    background: url(${Check}) left/18px no-repeat; 
    border: 0;
  }
  input[type="checkbox"] {
    display: none;
  }
  form label{
    font-size: 10px;
    font-weight: 700;
  }

  input[type="radio"]:not(old) {
      margin:0; padding:0; opacity:0; 
      background: url(${Radio}) left/24px no-repeat; 
      width:18px;
      height: 18px;
      
  } 
  input[type="radio"]:not(old) + label {
      width:18px;
      height: 18px;
      display: inline-block; 
      text-align: left;
      resize: cover; 
      background: url(${Radio}) left/24px no-repeat; 
      background-size: 18px 18px;
      line-height: 130%; vertical-align: top;
  }
  input[type="radio"]:not(old):checked + label {
    background: url(${RadioCheck}) left/24px no-repeat;
    background-size: 18px 18px; 
  }
`
export default WarehousingRegisterContainer_V2
