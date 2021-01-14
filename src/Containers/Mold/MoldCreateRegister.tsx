import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {Input} from 'semantic-ui-react'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import moment from 'moment'
import {POINT_COLOR} from '../../Common/configset'
import {API_URLS, getMoldList, postMoldRegister} from '../../Api/mes/manageMold'
import RegisterDropdown from '../../Components/Dropdown/RegisterDropdown'
import {useHistory} from 'react-router-dom'
import MoldPickerModal from '../../Components/Modal/MoldPickerModal'
import MoldPartDropdown from '../../Components/Dropdown/MoldPartDropdown'
import NormalInput from '../../Components/Input/NormalInput'
import PartInput from '../../Components/Input/PartInput'
import IcSearchButton from '../../Assets/Images/ic_search.png'
import IcPlusGray from '../../Assets/Images/ic_plus_gray.png'
import PartsPickerModal from '../../Components/Modal/PartsPickerModal'
import {uploadTempFile} from '../../Common/fileFuctuons'
import Notiflix from 'notiflix'

const initParts = {
  name: '',
  steel_grade: '',
  standard: {
    w: 0, h: 0, l: 0
  },
  material: [{
    material_pk: '',
    name: '',
    current: '',
    usage: ''
  }]
}

const initComponent = {
  material_pk: '',
  name: '',
  current: '',
  usage: ''
}

const initDrawing = ''

const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi
const MoldCreateRegisterContainer = ({match}: any) => {
  const history = useHistory()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [moldData, setMoldData] = useState<{ name: string, pk: string }>()
  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [selectParts, setSelectParts] = useState<{ part: { pk: string, name: string, current: string }[][], parts: { pk: string, name: string, current: string }[] }>({
    part: [[{
      pk: '',
      name: '',
      current: ''
    }]],
    parts: [{
      pk: '',
      name: '',
      current: ''
    }]
  })

  const [components, setComponents] = useState<{ name: string, current: string, material_pk: string, usage: string }[]>([{
    name: '',
    current: '',
    material_pk: '',
    usage: '',
  }])

  const [parts, setParts] = React.useState<{ name: string, steel_grade: string, standard: { w: number | undefined, h: number | undefined, l: number | undefined }, material: { name: string, current: string, material_pk: string, usage: string }[] }[]>(
    [{
      name: '',
      steel_grade: '',
      standard: {
        w: undefined, h: undefined, l: undefined
      },
      material: [{
        material_pk: '',
        current: '',
        name: '',
        usage: ''
      }]
    }]
  )

  const [drawing, setDrawing] = useState<string[]>([''])

  const getManageMoldDetail = useCallback(async () => {
    const tempUrl = `${API_URLS['making'].detail}?pk=${match.params.pk}`
    const resultData = await getMoldList(tempUrl)

    setMoldData({name: resultData.mold_name, pk: resultData.mold_pk})
    setComponents([...resultData.component])
    setParts([...resultData.part])
    setDrawing([...resultData.drawing])
    setSelectDate(resultData.schedule)

  }, [])

  useEffect(() => {
  }, [components])

  const postContractRegisterData = useCallback(async () => {
    const tempUrl = `${API_URLS['making'].register}`

    let state = false
    let tmpParts = parts.map((v, i) => {
      let partsState = 0

      v.material.map((value, index) => {
        if (value.material_pk === '' && value.usage === '') {
          partsState = 0
          // state = true
        } else if (value.material_pk !== '' && value.usage !== '') {
          partsState = 2
        } else {
          partsState = 1
        }
      })

      if (
        v.name === '' && partsState === 0 &&
        (!v.standard.w || v.standard.w === 0) &&
        (!v.standard.h || v.standard.h === 0) &&
        (!v.standard.l || v.standard.l === 0) &&
        v.steel_grade === ''
      ) {
        return null
      } else {
        if (
          v.name !== '' && partsState === 2 &&
          (v.standard.w && v.standard.w !== 0) &&
          (v.standard.h && v.standard.h !== 0) &&
          (v.standard.l && v.standard.l !== 0) &&
          v.steel_grade !== ''
        ) {
          return v
        } else {
          state = true
        }
      }
    }).filter((value) => {
      return value
    })


    const tmpCompo = components.map((v, i) => {
      if (v.material_pk === '' && v.usage === '') {
        return null
      } else if (v.material_pk !== '' && v.usage !== '') {
        return v
      } else {
        state = true
        return null
      }
    }).filter((value) => {
      return value
    })

    const tmpDrawing = drawing.map((v) => {
      if (v === '') {
        return null
      } else {
        return v
      }
    })

    if (!moldData?.pk || !selectDate || state) {
      Notiflix.Report.Warning('모든 칸을 입력해주세요.', '모든 칸을 입력해주세요')
    } else if (!selectDate.match(regExp)) {
      Notiflix.Report.Warning('형식이 잘못되었습니다.', 'YYYY-MM-DD 형식을 맞추어서 입력해주세요.')
    } else {
      const resultData = await postMoldRegister(tempUrl, {
        mold_pk: moldData?.pk,
        schedule: selectDate,
        part: tmpParts,
        component: tmpCompo,
        drawing: tmpDrawing[0] === null ? [] : tmpDrawing
      })
      if (resultData.status === 200) {
        history.push('/mold/create/list')
      }
    }
  }, [parts, drawing, components, moldData, selectDate])

  const postContractModifyData = useCallback(async () => {
    const tempUrl = `${API_URLS['making'].update}`

    let state = false
    let tmpParts = parts.map((v, i) => {
      let partsState = 0

      v.material.map((value, index) => {
        if (value.material_pk === '' && value.usage === '') {
          partsState = 0
          // state = true
        } else if (value.material_pk !== '' && value.usage !== '') {
          partsState = 2
        } else {
          partsState = 1
        }
      })

      if (
        v.name === '' && partsState === 0 &&
        (!v.standard.w || v.standard.w === 0) &&
        (!v.standard.h || v.standard.h === 0) &&
        (!v.standard.l || v.standard.l === 0) &&
        v.steel_grade === ''
      ) {
        return null
      } else {
        if (
          v.name !== '' && partsState === 2 &&
          (v.standard.w && v.standard.w !== 0) &&
          (v.standard.h && v.standard.h !== 0) &&
          (v.standard.l && v.standard.l !== 0) &&
          v.steel_grade !== ''
        ) {
          return v
        } else {
          state = true
        }
      }
    }).filter((value) => {
      return value
    })


    const tmpCompo = components.map((v, i) => {
      if (v.material_pk === '' && v.usage === '') {
        return null
      } else if (v.material_pk !== '' && v.usage !== '') {
        return v
      } else {
        state = true
        return null
      }
    }).filter((value) => {
      return value
    })

    const tmpDrawing = drawing.map((v) => {
      if (v === '') {
        return null
      } else {
        return v
      }
    })

    if (!moldData?.pk || !selectDate || state) {
      Notiflix.Report.Warning('모든 칸을 입력해주세요.')
    } else if (!selectDate.match(regExp)) {
      Notiflix.Report.Warning('형식이 잘못되었습니다.', 'YYYY-MM-DD 형식을 맞추어서 입력해주세요.')
    } else {
      const resultData = await postMoldRegister(tempUrl, {
        pk: match.params.pk,
        mold_pk: moldData?.pk,
        schedule: selectDate,
        part: tmpParts,
        component: tmpCompo,
        drawing: tmpDrawing[0] === null ? [] : tmpDrawing
      })
      if (resultData.status === 200) {
        history.push('/mold/create/list')
      }
    }
  }, [parts, drawing, components, moldData, selectDate])

  useEffect(() => {

    if (match.params.pk) {
      // alert(`수정 페이지 진입 - pk :` + match.params.pk)
      setIsUpdate(true)
      getManageMoldDetail()
    }

  }, [match.params.pk])

  const addFile = async (event: any, index: number): Promise<void> => {

    if (event.target.files[0] === undefined) {
      return
    }


    // if(target !== undefined && !event.target.files[0].type.includes('image')){ //이미지인지 판별
    //     //alert('이미지 형식만 업로드 가능합니다.');
    //     return onChangeEvent('');
    // }

    const res = await uploadTempFile(event.target.files[0])

    let tmp = drawing
    if (res) {
      tmp[index] = res
    } else {
      tmp[index] = ''
    }
    setDrawing([...tmp])
  }

  const onChangeNumberInput = (name: 'w' | 'h' | 'l', index: number, num: any) => {
    let tmp = parts
    tmp[index] = {
      ...tmp[index], standard: {
        ...tmp[index].standard,
        [name]: num
      }
    }
    return setParts([...tmp])
  }

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{
            fontSize: 20,
            marginRight: 18,
            marginLeft: 3,
            fontWeight: 'bold'
          }}>금형 제작 {isUpdate ? '수정' : '등록'}</span>
        </div>
      </div>
      <ContainerMain>
        <div>
          <p className={'title'}>필수 항목</p>
        </div>
        <div>
          <table style={{color: 'black'}}>
            <tr>
              <td>• 금형명</td>
              <td><MoldPickerModal text={'금형을 선택해 주세요'} onClickEvent={(e) => setMoldData(e)}
                                   select={moldData}/></td>
            </tr>
            {/*<tr>*/}
            {/*    <td>• 금형 바코드 번호</td>*/}
            {/*    <td><Input placeholder="Read only" disabled onChangeText={(e:string) => setMoldBarcode(e)} /></td>*/}
            {/*</tr>*/}
            <tr>
              <td>• 제작 일정</td>
              <td>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: '#f4f6fa',
                  height: 32
                }}>
                  <div style={{width: 817, display: 'table-cell'}}>
                    <div>
                      {
                        <InputTextChanger
                          onChange={(e) => {
                            setSelectDate(e.target.value)
                          }}
                          onBlur={() => {
                            if (!selectDate.match(regExp)) {
                              Notiflix.Report.Warning('올바르지 않은 형식입니다.', 'YYYY-MM-DD 형식에 맞추어 입력해주세요.', '확인')
                            }
                          }} style={{color: '#111319'}} value={selectDate}></InputTextChanger>
                      }
                    </div>
                  </div>
                  <ColorCalendarDropdown unLimit={true} select={selectDate}
                                         onClickEvent={(select) => {
                                           setSelectDate(select)
                                         }} text={'날짜 선택'} type={'single'}
                                         customStyle={{height: 36, marginLeft: 0}}/>
                </div>
              </td>
            </tr>
          </table>
        </div>
        {
          parts && parts.length !== 0 ? parts.map((v, i) =>
              <MoldPartDropdown title={'파트'} part={true} onClick={() => {
                setSelectParts({
                  ...selectParts,
                  part: [...selectParts.part, [{pk: '', name: '', current: ''}]]
                })
                setParts([...parts, initParts])
              }} onClickDelete={() => {
                let tmpParts = parts
                let tmp = selectParts

                tmpParts.splice(i, 1)
                tmp.part.splice(i, 1)
                setParts([...tmpParts])
                setSelectParts({...selectParts, ...tmp})

              }}>
                <PartInput title={'파트명'} value={parts[i].name} onChangeEvent={(input) => {
                  let tmp = parts
                  tmp[i] = {...tmp[i], name: input}
                  return setParts([...tmp])
                }}/>
                <PartInput title={'강종'} value={parts[i].steel_grade} onChangeEvent={(input) => {
                  let tmp = parts
                  tmp[i] = {...tmp[i], steel_grade: input}
                  return setParts([...tmp])
                }}/>
                <div style={{display: 'flex', paddingTop: 16, verticalAlign: 'top'}}>
                  <p style={{
                    fontSize: 14,
                    marginTop: 5,
                    fontWeight: 700,
                    width: '13%',
                    textAlign: 'left',
                    display: 'inline-block'
                  }}>{`• 규격`}</p>
                  <div style={{width: '90%', justifyContent: 'space-around', display: 'flex'}}>
                    <InputWrap>
                      <InputBox type="number" value={parts[i].standard.w} onChange={(input) => {
                        onChangeNumberInput('w', i, input.target.value)
                      }} placeholder={'가로규격 입력'}/>
                      <p>mm</p>
                    </InputWrap>
                    <InputWrap>
                      <InputBox type="number" value={parts[i].standard.l} onChange={(input) => {
                        onChangeNumberInput('l', i, input.target.value)
                      }} placeholder={'세로규격 입력'}/>
                      <p>mm</p>
                    </InputWrap>
                    <InputWrap>
                      <InputBox type="number" value={parts[i].standard.h} onChange={(input) => {
                        onChangeNumberInput('h', i, input.target.value)
                      }} placeholder={'높이규격 입력'}/>
                      <p>mm</p>
                    </InputWrap>
                  </div>
                </div>
                {
                  parts[i].material.map((value, index) =>
                    <div style={{display: 'flex', paddingTop: 16, verticalAlign: 'top'}}>
                      <p style={{
                        fontSize: 14,
                        marginTop: 5,
                        fontWeight: 700,
                        width: '13%',
                        textAlign: 'left',
                        display: 'inline-block'
                      }}>{`• 부품`}</p>
                      <div style={{width: '87%', display: 'flex', alignItems: 'center'}}>
                        <PartsPickerModal text={'부품을 검색해 주세요.'} onClickEvent={(e) => {
                          let tmpArr = parts
                          let tmp = selectParts
                          tmp.part[i][index] = e
                          tmpArr[i].material[index] = {
                            ...tmpArr[i].material[index], ...e,
                            material_pk: e.pk
                          }

                          setParts([...tmpArr])
                          setSelectParts({...tmp})
                        }} select={parts[i].material[index]} width={365}/>
                        <p style={{marginLeft: 15}}>현재 재고량</p>
                        <MaterialBox type="number" value={parts[i].material[index].current}
                                     placeholder={'9,999,999,999'}/>
                        <p>사용할 수량</p>
                        <MaterialBox type="number" value={parts[i].material[index].usage}
                                     onChange={(e) => {
                                       let tmpArr = parts


                                       if (Number(selectParts.part[i][index].current) >= Number(e.target.value)) {
                                         tmpArr[i].material[index] = {
                                           ...tmpArr[i].material[index],
                                           usage: String(parseInt(e.target.value))
                                         }
                                       } else {
                                         tmpArr[i].material[index] = {
                                           ...tmpArr[i].material[index],
                                           usage: selectParts.part[i][index].current
                                         }
                                       }

                                       setParts([...tmpArr])
                                     }} placeholder={'9,999,999,999'}/>
                        <DeleteButton onClick={() => {
                          let tmpCompo = parts
                          let tmp = selectParts

                          tmpCompo[i].material.splice(index, 1)
                          tmp.part[i].splice(index, 1)

                          setSelectParts({...tmp})
                          setParts([...tmpCompo])
                        }}>
                          <p>부품 삭제</p>
                        </DeleteButton>
                      </div>
                    </div>
                  )
                }
                <div style={{display: 'flex', paddingTop: 16, verticalAlign: 'top'}}>
                  <p style={{
                    fontSize: 14,
                    marginTop: 5,
                    fontWeight: 700,
                    width: '13%',
                    textAlign: 'left',
                    display: 'inline-block'
                  }}>{``}</p>
                  <div style={{width: '87%', display: 'flex', alignItems: 'center'}}>
                    <AddButton onClick={() => {
                      let tmpArr = parts
                      let tmp = selectParts

                      tmp.part[i].push({pk: '', name: '', current: ''})

                      tmpArr[i] = {...tmpArr[i], material: [...tmpArr[i].material, initComponent]}

                      setSelectParts({...tmp})
                      setParts([...tmpArr])
                    }}>
                      <img src={IcPlusGray}
                           style={{width: 13, height: 13, marginTop: 3, marginBottom: 3}}/>
                      <p>부품 추가</p>
                    </AddButton>
                  </div>
                </div>
              </MoldPartDropdown>)
            : <MoldPartDropdown title={'파트'} part={true} onClick={() => {
              setSelectParts({...selectParts, part: [...selectParts.part, [{pk: '', name: '', current: ''}]]})
              setParts([...parts, initParts])
            }}>

            </MoldPartDropdown>
        }

        <MoldPartDropdown title={'부품'} part={false}>
          {
            components.map((v, i) =>
              <div style={{display: 'flex', paddingTop: 16, verticalAlign: 'top'}}>
                <p style={{
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: 700,
                  width: '13%',
                  textAlign: 'left',
                  display: 'inline-block'
                }}>{`• 부품명`}</p>
                <div style={{width: '87%', display: 'flex', alignItems: 'center'}}>
                  <PartsPickerModal text={'부품을 검색해 주세요.'} onClickEvent={(e) => {
                    let tmpArr = components
                    let tmp = selectParts
                    tmp.parts[i] = e
                    tmpArr[i] = {...tmpArr[i], ...e, material_pk: e.pk}

                    setComponents([...tmpArr])
                    setSelectParts({...tmp})
                  }} select={components[i]} width={365}/>
                  <p style={{marginLeft: 15}}>현재 재고량</p>
                  <MaterialBox type="text" value={components[i].current}
                               placeholder={'9,999,999,999'}/>
                  <p>사용할 수량</p>
                  <MaterialBox type="text" value={components[i].usage} onChange={(e) => {
                    let tmpArr = components

                    if (Number(components[i].current) >= Number(e.target.value)) {
                      tmpArr[i] = {
                        ...tmpArr[i],
                        usage: String(parseInt(e.target.value))
                      }
                    } else {
                      tmpArr[i] = {
                        ...tmpArr[i],
                        usage: components[i].current
                      }
                    }
                    setComponents([...tmpArr])
                  }} placeholder={'9,999,999,999'}/>
                  <DeleteButton onClick={() => {
                    let tmpCompo = components
                    if (tmpCompo.length === 1) {
                      setComponents([initComponent])
                    } else {
                      tmpCompo.splice(i, 1)
                      setComponents([...tmpCompo])
                    }
                  }}>
                    <p>부품 삭제</p>
                  </DeleteButton>
                </div>
              </div>
            )
          }
          <div style={{display: 'flex', paddingTop: 16, verticalAlign: 'top'}}>
            <p style={{
              fontSize: 14,
              marginTop: 5,
              fontWeight: 700,
              width: '13%',
              textAlign: 'left',
              display: 'inline-block'
            }}>{``}</p>
            <div style={{width: '87%', display: 'flex', alignItems: 'center'}}>
              <AddButton onClick={() => {
                let tmpArr = components
                let tmp = selectParts

                tmp.parts.push({pk: '', name: '', current: ''})

                tmpArr = [...tmpArr, initComponent]

                setSelectParts({...tmp})
                setComponents([...tmpArr])
              }}>
                <img src={IcPlusGray} style={{width: 13, height: 13, marginTop: 3, marginBottom: 3}}/>
                <p>부품 추가</p>
              </AddButton>
            </div>
          </div>
        </MoldPartDropdown>
        <MoldPartDropdown title={'도면'} part={false}>
          {
            drawing.map((v, i) => <div style={{display: 'flex', paddingTop: 16, verticalAlign: 'top'}}>
              <p style={{
                fontSize: 14,
                marginTop: 5,
                fontWeight: 700,
                width: '13%',
                textAlign: 'left',
                display: 'inline-block'
              }}>{`• 도면명`}</p>
              <div style={{width: '87%', display: 'flex', alignItems: 'center'}}>
                <UploadBox placeholder="도면을 업로드해주세요." style={{width: 700}} value={drawing[i]} disabled/>
                <UploadButton onClick={() => {
                }}>
                  <label htmlFor={`file${i}`} style={{
                    textAlign: 'center',
                    fontSize: 14,
                    width: '100%',
                    height: '100%',
                    paddingBottom: 2,
                    paddingTop: 4,
                    backgroundColor: POINT_COLOR,
                    paddingLeft: 12,
                    paddingRight: 12,
                    cursor: 'pointer'
                  }}>파일 선택</label>
                </UploadButton>
                <input type={'file'} name={`file${i}`} id={`file${i}`} style={{display: 'none'}}
                       onChange={(e) => {
                         e.persist()

                         addFile(e, i)
                       }}/>
                <DeleteButton onClick={() => {
                  let tmpCompo = drawing
                  if (tmpCompo.length === 1) {
                  } else {
                    tmpCompo.splice(i, 1)
                    setDrawing([...tmpCompo])
                  }
                }}>
                  <p>도면 삭제</p>
                </DeleteButton>
              </div>
            </div>)
          }
          <div style={{display: 'flex', paddingTop: 16, verticalAlign: 'top'}}>
            <p style={{
              fontSize: 14,
              marginTop: 5,
              fontWeight: 700,
              width: '13%',
              textAlign: 'left',
              display: 'inline-block'
            }}>{``}</p>
            <div style={{width: '87%', display: 'flex', alignItems: 'center'}}>
              <AddButton onClick={() => setDrawing([...drawing, ''])}>
                <img src={IcPlusGray} style={{width: 13, height: 13, marginTop: 3, marginBottom: 3}}/>
                <p>도면 추가</p>
              </AddButton>
            </div>
          </div>
        </MoldPartDropdown>
        <div style={{marginTop: 72}}>
          <ButtonWrap onClick={async () => {
            isUpdate
              ? await postContractModifyData()
              : await postContractRegisterData()
          }}>
            <div style={{width: 360, height: 46}}>
              <p style={{fontSize: 18, paddingTop: 8}}>{isUpdate ? '수정하기' : '등록하기'}</p>
            </div>
          </ButtonWrap>
        </div>
      </ContainerMain>
    </div>
  )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: auto;
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
            width: calc( 100% - 15px );
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

const AddButton = Styled.button`
    display:flex;
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 5px;
    padding-left: 45%;
    width: 100%;
    background-color: #f4f6fa;
    p{
        color: #b3b3b3;
    }
`

const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    margin-bottom: 50px;
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

const InputTextChanger = Styled.input`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`

const InputWrap = Styled.div`
    display:flex;
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 5px;
    width: 31%;
    background-color: #f4f6fa;
    p{
        color: #b3b3b3;
    }
`

const InputBox = Styled.input`
    border: solid 0.5px #f4f6fa;
    font-size: 14px;
    width: 100%;
    background-color: #f4f6fa;
`

const MaterialBox = Styled.input`
    text-align: right;
    display:flex;
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    width: 11%;
    background-color: #f4f6fa;
    margin: 0 16px 0 8px;
`

const UploadBox = Styled(Input)`
    input{
        padding-left: 8px;
        font-family: NotoSansCJKkr;
        height: 28px;
        border: 0.5px solid #b3b3b3;
        width: 100%;
        background-color: #f4f6fa;
        font-size: 15px;
        &::placeholder:{
            color: #b3b3b3;
        };
     }
`

const UploadButton = Styled.button`
    width: 11.5%;
    height: 32px;
    background-color: #19b9df;
    margin-right: 16px;
    p{
        font-family: NotoSansCJKkr-Bold;
        color: #000000;
        font-size: 15px;
        font-weight: 500;
    }
`

const DeleteButton = Styled.button`
    width: 11.5%;
    height: 32px;
    background-color: #b3b3b3;
    p{
        font-family: NotoSansCJKkr-Bold;
        color: #ffffff;
        font-size: 15px;
        font-weight: 500;
    }
`

export default MoldCreateRegisterContainer
