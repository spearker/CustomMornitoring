import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {Input} from 'semantic-ui-react'
import {POINT_COLOR} from '../../Common/configset'
import RegisterDropdown from '../../Components/Dropdown/RegisterDropdown'
import MachinePickerModal from '../../Components/Modal/MachinePickerModal'
import {API_URLS, getSearchDetail, postProcessRegister} from '../../Api/mes/process'
import MoldPickerModal from '../../Components/Modal/MoldPickerModal'
import {useHistory} from 'react-router-dom'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import IC_MINUS from '../../Assets/Images/ic_minus.png'
import styled from 'styled-components'
import Notiflix from 'notiflix'
import {transferCodeToName, transferStringToCode} from '../../Common/codeTransferFunctions'
import RadioInput from '../../Components/Input/RadioInput'

const typeDummy = [
  '단발',
  '단발(블랭킹)',
  '단발(피어싱)',
  '단발(포밍)',
  '단발(프로)',
  '단발(벤딩)',
  '단발(드로잉)',
  '라인',
  '용접',
  '',
  '조립',
  '검수',
]

const item = [
  {
    title: '업체명',
    width: 1000,
  }
]

const ProcessRegisterContainer = ({match}: any) => {
  const history = useHistory()
  const [typeList] = useState<string[]>(typeDummy)
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [unit, setUnit] = useState<number>(1)

  const [processData, setProcessData] = useState<IProcessRegister>({
    type: 0,
    name: '',
    processes: [{machine_pk: '', mold_pk: null}],
    description: ''
  })

  const [initalIndexCnt, setInitalIndexCnt] = useState<number>(1)
  const [detailMaterialData, setDetailMaterialData] = useState<IProcessDetailData[]>([])
  const [isUpdata] = useState<boolean>(match.params.pk ? true : false)
  const [index, setIndex] = useState<number>(0)
  const [isVersion] = useState<boolean>(match.params.version === 'v2' ? true : false)

  const validationCheck = () => {
    console.log(detailMaterialData)
    const {name} = processData

    if (name === '') {
      return Notiflix.Notify.Failure('공정명을 입력해주세요.')
    }

    if (detailMaterialData && detailMaterialData.length !== 0) {
      if (detailMaterialData[0] && detailMaterialData[0].input_materials && detailMaterialData[0].input_materials.length !== 0) {
        let count = 0
        detailMaterialData[0].input_materials.map((v, i) => {
          if (!v.count || v.count <= 0) {
            count++
          }
        })

        if (count > 0) {
          return Notiflix.Notify.Failure('투입 품목의 투입량을 입력해주세요.')
        }
      } else {
        return Notiflix.Notify.Failure('투입 품목을 1가지 이상 선택해주세요.')
      }

      if (detailMaterialData[0] && detailMaterialData[0].output_materials) {
        if (!detailMaterialData[0].output_materials.count || detailMaterialData[0].output_materials.count <= 0) {
          return Notiflix.Notify.Failure('생산 품목의 생산량을 입력해주세요.')
        }
      } else {
        return Notiflix.Notify.Failure('생산 품목을 선택해주세요.')
      }
    }
    return true
  }

  const postContractUpDate = async () => {
    if (validationCheck()) {
      let tmp = detailMaterialData.map(material => {
        let tmp2

        if (material.input_materials) {
          tmp2 = material.input_materials.map(input => {
            if (input.material_type === 0) {
              return {...input, count: input.count / unit}
            } else {
              return input
            }
          })
        }

        return {...material, input_materials: tmp2}

      })

      const tempUrl = `${API_URLS['process'].update}`
      const resultData = await postProcessRegister(tempUrl, {
        pk: match.params.pk,
        type: processData.type,
        name: processData.name,
        processes: tmp,
        description: processData.description
      })
      if (resultData.status === 200) {
        history.goBack()
      }
    }
  }

  const postContractRegisterData = async () => {

    if (validationCheck()) {
      let tmp = detailMaterialData.map(material => {
        let tmp2

        if (material.input_materials) {
          tmp2 = material.input_materials.map(input => {
            if (input.material_type === 0) {
              return {...input, count: input.count / unit}
            } else {
              return input
            }
          })
        }

        return {...material, input_materials: tmp2}

      })

      const tempUrl = `${API_URLS['process'].register}`
      const resultData = await postProcessRegister(tempUrl, {
        type: processData.type,
        name: processData.name,
        processes: tmp,
        description: processData.description
      })
      if (resultData.status === 200) {
        history.goBack()
      }
    }
  }

  const getData = async () => {
    const tempUrl = `${API_URLS['process'].load}?pk=${match.params.pk}`
    const resultData = await getSearchDetail(tempUrl)
    if (resultData) {
      setProcessData({
        ...processData,
        type: resultData.type,
        name: resultData.name,
        description: resultData.description
      })
      if (resultData.type >= 1 && resultData.type < 6) {
        setIndex(resultData.type + 6)
      } else if (resultData.type >= 6) {
        setIndex(resultData.type - 5)
      }
      setDetailMaterialData(resultData.processes)
      setIsFirst(false)
    }
  }

  const changeType = async (e: number) => {
    if (e === 1) {
      setInitalIndexCnt(2)
      setDetailMaterialData([{}, {}])
    } else {
      setInitalIndexCnt(1)
      setDetailMaterialData([{}])
    }

    if (isUpdata && isFirst) {
      getData()
    }
  }

  const addMachine = () => {
    let tmpDetailMaterialData = detailMaterialData
    if (tmpDetailMaterialData[tmpDetailMaterialData.length - 1].output_materials) {
      //@ts-ignore
      tmpDetailMaterialData.push({input_materials: [tmpDetailMaterialData[tmpDetailMaterialData.length - 1].output_materials]})
    } else {
      tmpDetailMaterialData.push({})
    }

    setDetailMaterialData([...tmpDetailMaterialData])
  }

  useEffect(() => {
    changeType(processData.type)
  }, [processData.type])

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{
            fontSize: 20,
            marginRight: 18,
            marginLeft: 3,
            fontWeight: 'bold'
          }}>{isUpdata ? '공정 수정' : '공정 등록'}</span>
        </div>
      </div>
      <ContainerMain>
        <div>
          <p className={'title'}>필수 항목</p>
        </div>
        <div>
          <table style={{color: 'black'}}>
            <tr>
              <td>• 타입</td>
              <td>
                <RegisterDropdown
                  type={'string'} absoluteHeight={150}
                  onClickEvent={async (e) => {
                    if (transferStringToCode('process', e) >= 1 && transferStringToCode('process', e) < 6) {
                      setIndex(transferStringToCode('process', e) + 6)
                    } else if (transferStringToCode('process', e) >= 6) {
                      setIndex(transferStringToCode('process', e) - 5)
                    }

                    setProcessData({
                      ...processData,
                      type: transferStringToCode('process', e)
                    })
                  }}
                  select={typeList[index]}
                  contents={typeList} text={'타입을 선택해 주세요'}
                  buttonWid={30}
                  style={{width: '100%'}}
                  inputStyle={{width: 889}}
                />
              </td>
            </tr>
            <tr>
              <td>• 공정명</td>
              <td><Input placeholder="공정명을 입력해 주세요." value={processData.name}
                         onChange={(e) => setProcessData({...processData, name: e.target.value})}/></td>
            </tr>
            {
              detailMaterialData && detailMaterialData.length !== 0
              && detailMaterialData.map((v, i) => {
                return (
                  <tbody>
                  <tr>
                    <td>• {i + 1}번 기계</td>
                    <td style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingTop: 15
                    }}>
                      <MachinePickerModal select={
                        detailMaterialData[i] && (detailMaterialData[i].machine_name && detailMaterialData[i].machine) ? {
                          name: detailMaterialData[i].machine_name,
                          pk: detailMaterialData[i].machine
                        } : undefined
                      } text={'기계명을 검색해 주세요'} width={initalIndexCnt > i ? 921 : 889}
                                          onClickEvent={(e: { name?: string, type?: number, pk?: string }) => {
                                            if (e.pk && e.name) {
                                              if (detailMaterialData.map(v => {
                                                if (v.machine === e.pk) {
                                                  return false
                                                } else {
                                                  return true
                                                }
                                              }).indexOf(false) !== -1) {
                                                Notiflix.Report.Warning('선택할 수 없음!', '중복된 기계를 사용할 수 없습니다.',)
                                              } else {
                                                let tmpDetailMaterialData = detailMaterialData
                                                tmpDetailMaterialData[i].machine = e.pk
                                                tmpDetailMaterialData[i].machine_name = e.name
                                                tmpDetailMaterialData[i].machine_type = e.type
                                                setDetailMaterialData([...tmpDetailMaterialData])
                                              }
                                            }
                                          }} buttonWid={30}/>
                      {
                        i >= initalIndexCnt &&
                        <img src={IC_MINUS}
                             style={{width: 32, height: 32, marginLeft: 8, cursor: 'pointer'}}
                             onClick={() => {
                               let tmpDetailData = detailMaterialData
                               tmpDetailData.splice(i, 1)
                               setDetailMaterialData([...tmpDetailData])
                             }}/>
                      }
                    </td>
                  </tr>
                  {
                    detailMaterialData[i] && Number(detailMaterialData[i].machine_type) === 1
                    && <tr>
                        <td>• 사용 금형</td>
                        <td><MoldPickerModal select={
                          detailMaterialData[i] && (detailMaterialData[i].mold_name && detailMaterialData[i].mold) ? {
                            name: detailMaterialData[i].mold_name,
                            pk: detailMaterialData[i].mold
                          } : undefined
                        } text={'금형명을 검색해 주세요'}
                                             onClickEvent={(e: { name?: string, pk?: string }) => {
                                               if (e.pk && e.name) {
                                                 let tmpDetailMaterialData = detailMaterialData
                                                 tmpDetailMaterialData[i].mold = e.pk
                                                 tmpDetailMaterialData[i].mold_name = e.name
                                                 setDetailMaterialData([...tmpDetailMaterialData])
                                               }
                                               // let tmpList = processData.processes
                                               // if (tmpList && e.pk) {
                                               //   tmpList[i] = {...tmpList[i], mold_pk: e.pk,}
                                               // }
                                               //
                                               // let tmpMold = selectMold
                                               // tmpMold[i] = e
                                               //
                                               // setSelectMold(tmpMold)
                                               // return setProcessData({...processData, processes: tmpList})
                                             }} buttonWid={30}/></td>
                    </tr>
                  }
                  <tr>
                    <td/>
                    <td>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: 447, border: '0.5px solid #b3b3b3'}}>
                          <ProductionPickerModal width={true} multiSelect innerWidth={447}
                                                 isType type={-1}
                                                 onClickEvent={(material) => {
                                                   let tmpDetailMaterialData = detailMaterialData
                                                   tmpDetailMaterialData[i].input_materials = material
                                                   setDetailMaterialData([...tmpDetailMaterialData])
                                                 }} text={'투입품목을 선택해주세요.'}
                            //@ts-ignore
                                                 selectRange={detailMaterialData[i].input_materials ? detailMaterialData[i].input_materials : []}/>
                          <div>
                            {
                              //@ts-ignore
                              detailMaterialData[i].input_materials && detailMaterialData[i].input_materials.length !== 0
                                ?
                                <div style={{width: '100%', height: 'auto'}}>
                                  <div style={{
                                    display: 'flex',
                                    marginTop: 5,
                                    padding: 5
                                  }}>
                                    <div style={{flex: 1, textAlign: 'left'}}>품목명
                                    </div>
                                    <div style={{flex: 1, textAlign: 'left'}}>품목타입
                                    </div>
                                    <div style={{flex: 1, textAlign: 'left'}}>투입
                                      개수 (단위 중량)
                                    </div>
                                  </div>
                                  {
                                    //@ts-ignore
                                    detailMaterialData[i] && detailMaterialData[i].input_materials.map((value, index) => {
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
                                            }}>{value.material_name}</p>
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
                                            }}>{transferCodeToName('material', value.material_type)}</p>
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
                                                   detailMaterialData[i].input_materials[index].count ? detailMaterialData[i].input_materials[index].count + '' : 0
                                                 }
                                                 onChange={(e) => {
                                                   const tmpDetailMaterials = detailMaterialData

                                                   //@ts-ignore
                                                   tmpDetailMaterials[i].input_materials[index] = {
                                                     //@ts-ignore
                                                     ...tmpDetailMaterials[i].input_materials[index],
                                                     count: Number(e.target.value)
                                                   }

                                                   setDetailMaterialData([...tmpDetailMaterials])

                                                 }}/>
                                        </div>
                                      </div>
                                    })
                                  }
                                </div>
                                : <div style={{padding: '10px 0 10px 0'}}>투입품목을
                                  선택해주세요.</div>
                            }
                          </div>
                        </div>
                        <div style={{width: 447, border: '0.5px solid #b3b3b3'}}>
                          <ProductionPickerModal
                            width={true} innerWidth={447}
                            onClickEvent={(material) => {
                              let tmpDetailMaterialData = detailMaterialData
                              tmpDetailMaterialData[i].output_materials = material
                              if (i !== tmpDetailMaterialData.length - 1) {
                                tmpDetailMaterialData[i + 1] = {
                                  ...tmpDetailMaterialData[i + 1],
                                  input_materials: [{...material}]
                                }
                              }
                              setDetailMaterialData([...tmpDetailMaterialData])
                            }}
                            type={1} text={'생산품목을 선택해주세요.'} isAllItem
                            //@ts-ignore
                            selectRange={[detailMaterialData[i].output_materials ? detailMaterialData[i].output_materials : []]}
                            isType/>
                          <div>
                            {
                              detailMaterialData[i] && detailMaterialData[i].output_materials
                                ? <div style={{width: '100%', height: 'auto'}}>
                                  <div
                                    style={{display: 'flex', marginTop: 5, padding: 5}}>
                                    <div style={{flex: 1, textAlign: 'left'}}>품목명</div>
                                    <div style={{flex: 1, textAlign: 'left'}}>품목타입</div>
                                    <div style={{flex: 1, textAlign: 'left'}}>생산 개수
                                    </div>
                                  </div>
                                  <div
                                    style={{display: 'flex', marginTop: 5, padding: 5}}>
                                    <div style={{
                                      flex: 1, textAlign: 'left',
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: 'center'
                                    }}>
                                      <p
                                        style={{
                                          textAlign: 'left',
                                        }}>{
                                        //@ts-ignore
                                        detailMaterialData[i].output_materials.material_name
                                      }</p></div>
                                    <div style={{
                                      flex: 1, textAlign: 'left',
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: 'center'
                                    }}>
                                      <p
                                        style={{
                                          textAlign: 'left',
                                        }}>{
                                        //@ts-ignore
                                        transferCodeToName('material', detailMaterialData[i].output_materials.material_type)
                                      }</p>
                                    </div>
                                    <div style={{
                                      flex: 1,
                                      textAlign: 'left',
                                      width: 112,
                                      height: 36
                                    }}>
                                      <input type={'number'} value={
                                        //@ts-ignore
                                        detailMaterialData[i].output_materials.count ? detailMaterialData[i].output_materials.count + '' : 0
                                      }
                                             style={{
                                               width: '112px',
                                               height: '24px',
                                               padding: 0,
                                               margin: '5px 0'
                                             }}
                                             onChange={(e) => {
                                               const tmpDetailMaterials = detailMaterialData

                                               //@ts-ignore
                                               tmpDetailMaterials[i].output_materials = {
                                                 //@ts-ignore
                                                 ...tmpDetailMaterials[i].output_materials,
                                                 count: Number(e.target.value)
                                               }

                                               if (i !== detailMaterialData.length - 1) {
                                                 if (tmpDetailMaterials[i + 1].input_materials) {
                                                   // @ts-ignore
                                                   tmpDetailMaterials[i + 1].input_materials = tmpDetailMaterials[i + 1].input_materials.map((value, index) => {
                                                     //@ts-ignore
                                                     if (value.material_name === tmpDetailMaterials[i].output_materials.material_name) {
                                                       return {...value, count: Number(e.target.value)}
                                                     } else {
                                                       return value
                                                     }
                                                   })
                                                 }
                                               }

                                               setDetailMaterialData([...tmpDetailMaterials])
                                             }}/>
                                    </div>
                                  </div>
                                </div>
                                : <div style={{padding: '10px 0 10px 0'}}>생산품목을
                                  선택해주세요.</div>
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  </tbody>

                )
              })
            }
            <tr>
              <td colSpan={2}>
                <RadioInput title={'원자재 중량 단위'} id={'unit'} contents={[{title: 'kg', value: 1}, {title: 'g', value: 1000}]}
                            target={unit} onChangeEvent={(e) => {
                  if (e !== unit) {
                    setUnit(e)
                  } else {
                    return
                  }
                  let tmp = detailMaterialData.map(material => {
                    let tmp2
                    if (material.input_materials) {
                      if (e === 1) {
                        tmp2 = material.input_materials.map(input => {
                          if (input.material_type === 0) {
                            return {...input, count: input.count / 1000}
                          } else {
                            return input
                          }
                        })
                      } else if (e === 1000) {
                        tmp2 = material.input_materials.map(input => {
                          if (input.material_type === 0) {
                            return {...input, count: input.count * 1000}
                          } else {
                            return input
                          }
                        })
                      }
                    }

                    return {...material, input_materials: tmp2}

                  })
                  setDetailMaterialData([...tmp])

                }} line={false} width={120}/>
              </td>
            </tr>
            {
              !(index >= 0 && index < 7) &&
              <tr>
                  <td>{processData.processes && processData.processes.length !== 0 ? '' : '• 공정'}</td>
                  <td>
                      <ProcessAddButton onClick={() => addMachine()}>
                          <div
                              style={{
                                width: 919,
                                height: 34,
                                backgroundColor: '#f4f6fa',
                                border: '1px solid #b3b3b3'
                              }}>
                              <div style={{marginTop: 5}}>
                                  <p style={{color: '#b3b3b3',}}>+ 공정 추가</p>
                              </div>
                          </div>
                      </ProcessAddButton>
                  </td>
              </tr>
            }
          </table>
          <div style={{marginTop: 20}}>
            <p className={'title'}>선택 항목</p>
          </div>
          <table style={{color: 'black'}}>
            <tr>
              <td>• 설명</td>
              <td><Input style={{width: 917,}} placeholder="설명을 입력해 주세요." value={processData.description}
                         onChange={(e) => setProcessData({...processData, description: e.target.value})}/>
              </td>
            </tr>
          </table>
        </div>
        <div style={{marginTop: 72}}>
          <ButtonWrap onClick={async () => {
            isUpdata ? await postContractUpDate() : await postContractRegisterData()
          }}>
            <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
              <p style={{fontSize: 18}}>{isUpdata ? '수정하기' : '등록하기'}</p>
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
                        margin-bottom: 20px;
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

const tableInnerDiv = styled.div`
  flex: 1; 
  height: 36px;
`

export default ProcessRegisterContainer
