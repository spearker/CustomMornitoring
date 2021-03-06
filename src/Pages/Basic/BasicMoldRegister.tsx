import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import {getParameter} from '../../Common/requestFunctions'
import {uploadTempFile} from '../../Common/fileFuctuons'
import {getMoldTypeList} from '../../Common/codeTransferFunctions'
import OldFileInput from '../../Components/Input/OldFileInput'
import {JsonStringifyList} from '../../Functions/JsonStringifyList'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import BigWhiteBoxContainer from '../../Containers/BigWhiteBoxContainer'
import InputHeader from '../../Components/Text/InputHeader'
import ColorInputWithText from '../../Components/Input/ColorInputWithText'
import ColorDropdownInput from '../../Components/Input/ColorDropdownInput'
import ColorSearchContainer from '../../Containers/Basic/ColorSearchContainer'
import ColorFileInput from '../../Components/Input/ColorFileInput'
import EmptyPlace from '../../Components/Box/EmptyPlace'
import ManyButton from '../../Components/Button/ManyButton'
import {API_URLS, getBasicList, registerBasicItem} from '../../Api/mes/basic'
import autoCustomType from '../../AutoCustomSetting/autoCustomConfig'
import DateInput from '../../Components/Input/DateInput'
import moment from 'moment'

const output_material_model_dummy = [
  '(선택없음)',
  '모델1'
]

// 금형 등록, 업데이트
const BasicMoldRegister = () => {

  const history = useHistory()
  const [document, setDocument] = useState<any>({id: '', value: '(선택)'})
  const [documentList, setDocumentList] = useState<any[]>([])

  const [essential, setEssential] = useState<any[]>([])
  const [optional, setOptional] = useState<any[]>([])

  const [pk, setPk] = useState<string>('')
  const [made, setMade] = useState<string>('')
  const [info, setInfo] = useState<string>('')
  const [infoList, setInfoList] = useState<IInfo[]>([])
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<number>(0) //1: 프레스, 0: 선택없음
  const [madeNo, setMadeNo] = useState<string>('')
  const [photoName, setPhotoName] = useState<string>('')
  const [factory, setFactory] = useState<any[]>([])

  const [limit, setLimit] = useState<number | undefined>(undefined)
  const [inspect, setInspect] = useState<number | undefined>(undefined)
  const [current, setCurrent] = useState<number>(0)
  const [proper, setProper] = useState<number | undefined>(undefined)
  const [files, setFiles] = useState<any[3]>([null, null])
  const [paths, setPaths] = useState<any[2]>([null, null])
  const [oldPaths, setOldPaths] = useState<any[2]>([null, null])
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [mold_spec_w, setMold_spec_w] = useState<number | undefined>(undefined)
  const [mold_spec_l, setMold_spec_l] = useState<number | undefined>(undefined)
  const [mold_spec_t, setMold_spec_t] = useState<number | undefined>(undefined)
  const [input_material, setInput_material] = useState<{ name: string, pk: string, type: number | '' }>({
    name: '',
    pk: '',
    type: ''
  })
  const [input_material_weight, setInput_material_weight] = useState<string>('')
  const [output_material, setOutput_material] = useState<{ type: number | '', pk: string, name: string }>({
    type: '',
    pk: '',
    name: ''
  })
  const [output_material_model, setOutput_material_model] = useState<string | number>('')
  const [cavity, setCavity] = useState<number | null>(null)

  const indexList = autoCustomType() === 'gj_all_trans' || autoCustomType() === 'siheung' ? ['(선택없음)', '프레스 금형'] : getMoldTypeList('kor')

  useEffect(() => {

    if (getParameter('pk') !== '') {
      setPk(getParameter('pk'))
      ////alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData()
    }

  }, [])


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


  const getData = useCallback(async () => {

    const tempUrl = `${API_URLS['mold'].load}?pk=${getParameter('pk')}`
    const res = await getBasicList(tempUrl)

    if (res) {
      const data = res

      setName(data.mold_name)
      setMade(data.manufacturer === null ? '' : data.manufacturer)
      setPhotoName(data.photo)
      setLimit(data.limit)
      setInspect(data.inspect)
      setCurrent(data.current)
      setDate(data.manufactured_at)
      setPk(data.pk)
      setFactory([{pk: data.location, name: data.location_name}])
      setMadeNo(data.manufacturer_code)
      setType(Number(data.mold_type))
      setInfoList(data.info_list)
      setProper(data.proper_tons)
      setMold_spec_w(Number(data.mold_spec_W))
      setMold_spec_l(Number(data.mold_spec_L))
      setMold_spec_t(Number(data.mold_spec_T))
      const tempList = paths.slice()
      tempList[0] = data.upper
      tempList[1] = data.below
      setOldPaths(tempList)
      setCavity(data.cavity)

    }
  }, [pk, made, madeNo, document, mold_spec_w, mold_spec_l, mold_spec_t, limit, date, name, proper, type, madeNo, infoList, cavity, paths, inspect, essential, optional, factory, output_material, input_material, current])


  const onsubmitFormUpdate = useCallback(async () => {

    if (name.trim() === '') {
      alert('금형 이름은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (type === 0) {
      alert('금형 종류는 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (madeNo.trim() === '') {
      alert('제품 번호는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!limit || limit <= 0) {
      alert('최대 타수는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!inspect || inspect <= 0) {
      alert('점검 타수는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!proper || proper < 0) {
      alert('적정 톤 수는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (factory === undefined || factory[0]?.pk === undefined || factory[0]?.pk === '') {
      alert('공장/부속공장는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!mold_spec_l || mold_spec_l <= 0) {
      alert('금형 치수 L 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!mold_spec_w || mold_spec_w <= 0) {
      alert('금형 치수 W 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!mold_spec_t || mold_spec_t <= 0) {
      alert('금형 치수 T 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (cavity === 0) {
      alert('캐비티는 0이 될 수 없습니다.')
      return
    }


    const data = {
      pk: getParameter('pk'),
      mold_name: name,
      mold_type: type,
      manufactured_at: date,
      limit: Number(limit),
      inspect: Number(inspect),
      proper_tons: Number(proper),
      current: current !== null ? Number(current) : null,
      location: factory[0].pk,
      info_list: JsonStringifyList(essential, optional),
      manufacturer: made.trim(),
      manufacturer_code: madeNo,
      mold_spec_L: Number(mold_spec_l),
      mold_spec_W: Number(mold_spec_w),
      mold_spec_T: Number(mold_spec_t),
      upper: paths[0],
      below: paths[1],
      cavity: cavity === null ? cavity : Number(cavity)
    }

    const tempUrl = `${API_URLS['mold'].update}`
    const res = await registerBasicItem(tempUrl, data)


    if (res) {
      history.push('/basic/list/mold')
    }


  }, [pk, made, madeNo, current, document, mold_spec_w, mold_spec_l, mold_spec_t, limit, date, name, proper, type, madeNo, cavity, infoList, paths, inspect, essential, optional, factory, output_material, input_material])

  /**
   * onsubmitForm()
   * 기계 정보 등록
   */
  const onsubmitForm = useCallback(async () => {
    //console.log(infoList)
    ////alert(JSON.stringify(infoList))
    //console.log(JSON.stringify(infoList))

    if (name.trim() === '') {
      alert('금형 이름은 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (type === 0) {
      alert('금형 종류는 필수 항목입니다. 반드시 선택해주세요.')
      return
    } else if (madeNo.trim() === '') {
      alert('제품 번호는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!limit || limit <= 0) {
      alert('최대 타수는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!inspect || inspect <= 0) {
      alert('점검 타수는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!proper || proper < 0) {
      alert('적정 톤 수는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (factory === undefined || factory[0]?.pk === undefined || factory[0]?.pk === '') {
      alert('공장/부속공장는 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!mold_spec_l || mold_spec_l <= 0) {
      alert('금형 치수 L 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!mold_spec_w || mold_spec_w <= 0) {
      alert('금형 치수 W 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (!mold_spec_t || mold_spec_t <= 0) {
      alert('금형 치수 T 필수 항목입니다. 반드시 입력해주세요.')
      return
    } else if (cavity === 0) {
      alert('캐비티는 0이 될 수 없습니다.')
      return
    }

    const data = {
      mold_name: name,
      mold_type: type,
      manufactured_at: date,
      limit: Number(limit),
      inspect: Number(inspect),
      proper_tons: Number(proper),
      current: current !== null ? Number(current) : null,
      location: factory[0].pk,
      info_list: JsonStringifyList(essential, optional),
      manufacturer: made.trim(),
      manufacturer_code: madeNo,
      mold_spec_L: Number(mold_spec_l),
      mold_spec_W: Number(mold_spec_w),
      mold_spec_T: Number(mold_spec_t),
      upper: paths[0],
      below: paths[1],
      cavity: cavity === null ? cavity : Number(cavity)
    }


    const tempUrl = `${API_URLS['mold'].create}`
    const res = await registerBasicItem(tempUrl, data)


    if (res) {
      history.push('/basic/list/mold')
    }


  }, [pk, made, madeNo, current, document, mold_spec_w, mold_spec_l, mold_spec_t, limit, date, name, proper, type, madeNo, infoList, paths, cavity, inspect, essential, optional, factory, output_material, input_material])


  return (
    <DashboardWrapContainer index={'basic'}>

      <InnerBodyContainer>
        <Header title={isUpdate ? '금형 정보수정' : '금형 정보등록'}/>
        <BigWhiteBoxContainer>
          {
            // document.id !== '' || isUpdate == true?
            <div>
              {/* <iframe src="#" name="iframe"
                                    style={{width: 1, height: 1, border: 0, visibility: "hidden"}}/> */}
              <InputHeader title="필수 항목"/>
              <ColorInputWithText title={'금형명'} value={name} onChangeEvent={setName}
                                  placeholder={'금형명을 입력해주세요'}/>
              <ColorDropdownInput contents={indexList} title={'금형 종류'} value={type === 0 ? '' : type}
                                  onChangeEvent={(v) => setType(v)} placeholder={'금형 종류를 선택해 주세요'}
                                  valueType={'number'}/>
              <DateInput title={'제조 연월'} description={''} value={date} onChangeEvent={setDate}
                         style={{width: '110%'}} inputStyle={{boxSizing: 'border-box'}}/>
              {autoCustomType() === 'seain_material_trans' ?
                <ColorInputWithText title={'관리번호'} value={madeNo} onChangeEvent={setMadeNo}
                                    placeholder={'관리번호를 입력해주세요'}/>
                :
                <ColorInputWithText title={'제조(제품) 번호'} value={madeNo} onChangeEvent={setMadeNo}
                                    placeholder={'제조 번호를 입력해주세요'}/>
              }
              <ColorInputWithText type={'number'} title={'최대 타수'} value={limit} onChangeEvent={setLimit}
                                  placeholder={'최대 타수를 입력해주세요'}/>
              <ColorInputWithText type={'number'} title={'점검 타수'} value={inspect}
                                  onChangeEvent={setInspect} placeholder={'점검 타수를 입력해주세요'}/>
              <ColorInputWithText unit={'Ton'} title={'적정 톤 수'} value={proper} onChangeEvent={setProper}
                                  type={'number'}
                                  placeholder={'적정 톤 수를 입력해주세요 (단위 : Ton)'}/>
              <ColorSearchContainer
                title={'공장/부속 공장'}
                key={'pk'}
                value={factory[0]?.name ? factory[0].name : ''}
                listValue={'name'}
                placeholder={'공장을 입력해주세요'}
                option={1}
                onChangeEvent={
                  (input) => {
                    setFactory(input)
                  }
                }
                solo={true}
                list={factory}
                searchUrl={`${SF_ENDPOINT}/api/v1/factory/search?&`}
              />
              <ColorInputWithText unit={'mm'} type={'number'} title={'금형 치수(가로)'} value={mold_spec_l}
                                  onChangeEvent={setMold_spec_l}
                                  placeholder={'금형의 가로 치수를 입력해주세요 (단위 : mm)'}/>
              <ColorInputWithText unit={'mm'} type={'number'} title={'금형 치수(세로)'} value={mold_spec_w}
                                  onChangeEvent={setMold_spec_w}
                                  placeholder={'금형의 세로 치수를 입력해주세요 (단위 : mm)'}/>
              <ColorInputWithText unit={'mm'} type={'number'} title={'금형 치수(높이)'} value={mold_spec_t}
                                  onChangeEvent={setMold_spec_t}
                                  placeholder={'금형의 높이 치수를 입력해주세요 (단위 : mm)'}/>
              {/*<ColorProductionPickerModal
                                title={'투입 품목'}
                                placeholder={'투입 품목을 입력해주세요'}
                                value={input_material.name ? input_material.name : ''}
                                select={input_material} onClickEvent={setInput_material}
                                type={0}
                                innerWidth={'100%'}
                                addIsOpen={input_material.type === 0 ? true : false}
                                addInputType={'input'}
                                addPlaceholder={'//투입 품목이 원자재일 경우 투입 중량 기입 필수'}
                                addValue={input_material_weight}
                                onAddChangeEvent={setInput_material_weight}/>*/}
              {/*<ColorProductionPickerModal
                                title={'생산 품목(완제품)'}
                                placeholder={'생산 품목을 입력해주세요'}
                                value={output_material.name ? output_material.name : ''}
                                select={output_material} onClickEvent={setOutput_material}
                                type={1}
                                innerWidth={'100%'}
                                addIsOpen={output_material.type === 30 ? true : false}
                                addInputType={'select'}
                                addPlaceholder={'//완제품 등록 할 때 같이 기입한 모델명 셀렉 박스로 선택'}
                                addValue={output_material_model}
                                onAddChangeEvent={setOutput_material_model}
                                addContents={output_material_model_dummy}/>*/}
              <EmptyPlace height={'40px'}/>
              <InputHeader title="선택 항목"/>
              <ColorInputWithText title={'제조사'} value={made} onChangeEvent={setMade}
                                  placeholder={'제조사를 입력해주세요'}/>
              <ColorInputWithText type={'number'} title={'현재 타수'} value={current}
                                  onChangeEvent={(e) => {
                                    setCurrent(parseInt(e))
                                  }} placeholder={'현재 타수를 입력해주세요'}/>
              <ColorFileInput title={'상금형 사진'} name={paths[0]} thisId={'machinePhoto0'}
                              value={paths[0] ? paths[0] : ''}
                              onChangeEvent={(e) => addFiles(e, 0)}
                              description={'상금형 사진을 업로드해주세요 (가능한 형식 : jpeg, pdf, png)'}
              />
              <ColorFileInput title={'하금형 사진'} name={paths[1]} thisId={'machinePhoto1'}
                              value={paths[1] ? paths[1] : ''}
                              onChangeEvent={(e) => addFiles(e, 1)}
                              description={'하금형 사진을 업로드해주세요 (가능한 형식 : jpeg, pdf, png) '}
              />
              {
                isUpdate ?
                  <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={['상금형', '하금형']}
                                isImage={true}/>
                  :
                  null
              }
              <ColorInputWithText title={'캐비티'} value={cavity} onChangeEvent={setCavity} type={'number'}
                                  placeholder={'캐비티를 입력해주세요'}/>
              <br/>
              {
                isUpdate ?
                  <>
                    <ManyButton
                      nameList={['수정하기', '리스트 보기']}
                      colorList={[{text: '#666d79', bg: '#e7e9eb'}, {
                        text: '#0d0d0d',
                        bg: '#19b9df'
                      }]}
                      onClickEventList={[
                        onsubmitFormUpdate
                      ]}/>
                  </>
                  : <div style={{justifyContent: 'center', display: 'flex'}}>
                    <ButtonWrap onClick={async () => {
                      await onsubmitForm()
                    }}>
                      <div style={{
                        width: 360,
                        height: 46,
                        boxSizing: 'border-box',
                        paddingTop: '9px'

                      }}>
                        <p style={{fontSize: 18}}>등록하기</p>
                      </div>
                    </ButtonWrap>
                  </div>
              }
            </div>
          }
        </BigWhiteBoxContainer>

      </InnerBodyContainer>

    </DashboardWrapContainer>

  )
}


const ButtonWrap = Styled.button`
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


export default BasicMoldRegister
