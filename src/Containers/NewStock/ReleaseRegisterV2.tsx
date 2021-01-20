import React, {useCallback, useEffect, useState} from 'react'
import {POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import RegisterButton from '../../Components/Button/RegisterButton'
import {getToken} from '../../Common/tokenFunctions'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {uploadTempFile} from '../../Common/fileFuctuons'
import ListHeader from '../../Components/Text/ListHeader'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {useHistory} from 'react-router-dom'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import moment from 'moment'
import InputContainer from '../InputContainer'
import Styled from 'styled-components'
import useObjectInput from '../../Functions/UseInput'
import RegisterDropdown from '../../Components/Dropdown/RegisterDropdown'
import {transferStringToCode} from '../../Common/codeTransferFunctions'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import {API_URLS, postStockRegister} from '../../Api/mes/manageStock'
import DateInput from '../../Components/Input/DateInput'
import NormalInput from '../../Components/Input/NormalInput'
import {getBasicList} from '../../Api/mes/basic'
import ItemPickerModal from '../../Components/Modal/ItemPickerModal'

const pickerModalData = [
  {title: 'Lot번호', key: 'LOT', width: 100},
  {title: '품목명', key: 'material_name', width: 200},
  {title: '재질', key: 'texture', width: 150},
  {title: '총 중량', key: 'current_stock', width: 150},
  {title: '보관장소', key: 'location_name', width: 180},
  {title: '입고일', key: 'warehousing_date', width: 120},
]

const typeDummy = [
  '정상 출고',
  '반품',
  '오류 정정'
]

const StockDummy = [
  '정상 출고',
  '생산 소진',
  '불량',
  '오류 정정',
  '금형 제작'
]

interface RawMaterialType {
  pk: string
  material_name: string
  LOT: string
  current_stock: number
  safe_stock: number
  location_name: string
  texture: string
  material_spec_W: string
  material_spec_D: string
  warehousing_date: string
}

interface Props {
  match: any;
  // chilren: string;
}

// 수주 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const ReleaseRegisterContainer_V2 = ({match}: Props) => {
  const history = useHistory()

  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [pk, setPk] = useState<string>('')
  const [typeList, setTypelist] = useState<string[]>(typeDummy)
  const [selectType, setSelectType] = useState<string>()
  const [amount, setAmount] = useState<number>()
  const [selectItem, setSelectItem] = useState<RawMaterialType>()

  const [texture, setTexture] = useState<string>('')
  const [w, setW] = useState<number>(0)
  const [d, setD] = useState<number>(0)

  const [paths, setPaths] = useState<any[1]>([null])
  const [oldPaths, setOldPaths] = useState<any[1]>([null])

  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  const [selectMaterial, setSelectMaterial] = useState<{ name?: string, pk?: string }>()

  //생산품 검색
  const [isPoupup, setIsPoupup] = useState<boolean>(false)
  const [isSearched, setIsSearched] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')

  const [inputData, setInputData] = useObjectInput('CHANGE', {
    name: '',
    description: '',
    location: {
      postcode: '',
      roadAddress: '',
      detail: '',
    },

  })

  useEffect(() => {
    getData()
    if (getParameter('pk') !== '') {
      setPk(getParameter('pk'))
      ////alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData()
    }

  }, [])

  const onClickSearch = useCallback(async (e) => {
    ////alert('keyword')
    e.preventDefault()
    let type = 'material'
    // //alert('keyword')
    if (isPoupup === true) {
      type = 'material'
    } else {
      return
    }

    if (keyword === '' || keyword.length < 2) {
      //alert('2글자 이상의 키워드를 입력해주세요')

      return
    }
    setIsSearched(true)

    const res = await getRequest(`${SF_ENDPOINT}/api/v1/${type}/search?keyword=` + keyword, getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200) {
        const results = res.results
        if (isPoupup === true) {
        } else {
          return
        }


      } else {
        //TODO:  기타 오류
      }
    }
  }, [keyword])

  /**
   * addFiles()
   * 사진 등록
   * @param {object(file)} event.target.files[0] 파일
   * @returns X
   */
  const addFiles = async (event: any, index: number): Promise<void> => {
    if (event.target.files[0] === undefined) {

      return
    }
    if (event.target.files[0].type.includes('image')) { //이미지인지 판별

      const tempFile = event.target.files[0]
      const res = await uploadTempFile(event.target.files[0])

      if (res !== false) {
        const tempPatchList = paths.slice()
        tempPatchList[index] = res
        setPaths(tempPatchList)
        return
      } else {
        return
      }

    } else {

      //alert('이미지 형식만 업로드 가능합니다.')
    }

  }


  /**
   * getData()
   * 기계 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @returns X
   */
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
            inspect: v,
            isFine: false
          }
        })
      })
    }
  }

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
    if (match.params.parts) {

      if (amount === undefined || String(amount) === '') {
        alert('출고 수량은 필수 항목입니다. 반드시 입력해주세요.')
        return
      } else if (selectType === undefined) {
        alert('출고 구분은 필수 항목입니다. 반드시 입력해주세요.')
        return
      }

      const data = {
        parts_pk: match.params.pk,
        amount: Number(amount),
        type: transferStringToCode('stock', selectType),
        date: selectDate
      }

      const tempUrl = `${API_URLS['stock'].partsReleaseRegister}`
      const res = await postStockRegister(tempUrl, data)

      if (res) {
        history.goBack()
      }
    } else {

      if (amount === undefined || String(amount) === '') {
        alert('출고 수량은 필수 항목입니다. 반드시 입력해주세요.')
        return
      } else if (selectType === undefined) {
        alert('출고 구분은 필수 항목입니다. 반드시 입력해주세요.')
        return
      }

      const data = {
        material_pk: match.params.pk,
        amount: Number(amount),
        type: transferStringToCode('stock', selectType),
        date: selectDate
      }

      const tempUrl = `${API_URLS['stock'].releaseRegister}`
      const res = await postStockRegister(tempUrl, data)

      if (res) {
        history.goBack()
      }
    }
  }, [selectType, amount, selectDate])


  return (
    <div>
      <Header title={isUpdate ? '출고 수정' : '출고 등록'}/>
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
          <p style={{fontSize: 14, marginTop: 5, fontWeight: 700, width: 120, display: 'inline-block'}}>• 품번/Lot</p>
          <ItemPickerModal onClickEvent={(item) => setSelectItem(item)} text={'품번/lot를 선택해 주세요'} type={'rawlot'}
                           title={'품번/Lot'} width={921.63}
                           tableHeaderValue={pickerModalData} select={selectItem} mainKey={'LOT'}/>
        </div>
        <div style={{
          borderBottom: 'solid 0.5px #d3d3d3',
          display: 'flex',
          paddingTop: 17,
          paddingBottom: 17,
          verticalAlign: 'top'
        }}>
          <p style={{fontSize: 14, marginTop: 5, fontWeight: 700, width: 120, display: 'inline-block'}}>• 출고
            종류</p>
          <RegisterDropdown type={'string'} onClickEvent={(e: string) => setSelectType(e)} select={selectType}
                            contents={typeList} text={'출고 종류을 선택해 주세요'}
                            buttonWid={30}/>
        </div>
        <NormalNumberInput title={'재고 수량'} width={120} value={selectItem?.current_stock} onChangeEvent={null}
                           description={'품번/Lot를 선택하면 자동으로 입력됩니다.'}/>
        <NormalInput title={'위치'} description={'품번/Lot를 선택하면 자동으로 입력됩니다.'}
                     value={selectItem ? selectItem.location_name : ''} width={120}></NormalInput>
        <DateInput title={'입고일'} description={'품번/Lot를 선택하면 자동으로 입력됩니다.'}
                   value={selectItem ? selectItem.warehousing_date : ''}
                   width={135} //readOnly
                   style={{width: '100%'}} inputStyle={{boxSizing: 'border-box'}}/>
        <NormalNumberInput title={'출고 중량'} width={120} value={amount}
                           onChangeEvent={(input) => setAmount(input)}
                           description={'출고 수량을 입력해주세요'}/>
        <DateInput title={'출고일'} description={''} value={selectDate} onChangeEvent={setSelectDate} width={135}
                   style={{width: '100%'}} inputStyle={{boxSizing: 'border-box'}}/>
        {/* 자유항목 입력 창
             <FullAddInput title={'자유 항목'} onChangeEvent={()=>{
              const tempInfo = infoList.slice();
              tempInfo.push({title:`자유 항목 ${infoList.length + 1}`, value:""});
              setInfoList(tempInfo)
            }}>
              {
                infoList.map((v: IInfo, i)=>{
                  return(
                      <CustomIndexInput index={i} value={v}
                      onRemoveEvent={()=>{
                        const tempInfo = infoList.slice();
                        tempInfo.splice(i, 1)
                        setInfoList(tempInfo)
                      }}
                      onChangeEvent={(obj: IInfo)=>{
                        const tempInfo = infoList.slice();
                        tempInfo.splice(i, 1, obj)
                        setInfoList(tempInfo)
                      }}
                      />
                  )
                })
              }
              </FullAddInput>

            */}
        <div style={{marginTop: 40, marginLeft: 320}}>
          <ButtonWrap onClick={async () => {
            await onsubmitForm()
          }}>
            <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
              <p style={{fontSize: 18}}>등록하기</p>
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
    margin-top: 24px;
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

export default ReleaseRegisterContainer_V2
