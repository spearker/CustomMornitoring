import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import moment from 'moment'
import {POINT_COLOR} from '../../Common/configset'
import {API_URLS, postProductionRegister, getProjectList} from '../../Api/mes/production'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import ChitPickerModal from '../../Components/Modal/ChitPickerModal'
import {useHistory} from 'react-router-dom'
import MachinePickerModal from '../../Components/Modal/MachinePickerModal'
import MoldPickerModal from '../../Components/Modal/MoldPickerModal'
import RegisterDropdown from '../../Components/Dropdown/RegisterDropdown'
//@ts-ignore
import Notiflix from 'notiflix'
import MemeberPickerModal from '../../Components/Modal/MemberPickerModal'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import RadioInput from '../../Components/Input/RadioInput'
import MomentUtils from '@date-io/moment'
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

interface modalData {
  name?: string,
  pk?: string
}

const datetime_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/

const WorkHistoryRegisterContainer = ({match}: any) => {
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [processNameList, setProcessNameList] = useState<string[]>([])
  const [selectType, setSelectType] = useState<string>()
  const [modalSelect, setModalSelect] = useState<{ chit?: modalData, factory?: modalData, production?: modalData, machine?: modalData, mold?: modalData }>({
    chit: {},
    factory: {},
    production: {},
    machine: {},
    mold: {}
  })

  const [selectMember, setSelectMember] = useState<modalData>({})
  const [memberType, setMemberType] = useState(-1)
  const [workSelectTime, setWorkSelectTime] = useState<any>(new Date())
  const [workEndTime, setWorkEndTime] = useState<any>(new Date())

  const [processList, setProcessList] = useState<{
    pk: string,
    process_pk: string,
    process_name: string,
    machine_type: number,
    machine_pk: string,
    machine_name: string,
    mold_pk: string,
    mold_name: string,
    input_materials: IMaterialData[],
    output_materials: IMaterialData
  }[]>([])
  const [processName, setProcessName] = useState<string>('')
  const [selectProcess, setSelectProcess] = useState<number>(-1)
  const [selectDateRange, setSelectDateRange] = useState<{ start: string, end: string }>({
    start: moment().format('YYYY-MM-DD') + ' 00:00',
    end: moment().format('YYYY-MM-DD') + ' 00:00',
  })

  const [detailMaterialData, setDetailMaterialData] = useState<{
    machine_name?: string
    machine_pk?: string
    machine_type?: number
    mold_name?: string
    mold_pk?: string
    process_name?: string
    member_pk?: string
    input_materials?: IMaterialData[]
    output_materials?: IMaterialData
    amount?: string
  }>({})

  const [workHistoryData, setWorkHistoryData] = useState({
    pk: '',
    process_pk: '',
    material_pk: '',
    machine_pk: '',
    mold_pk: '',
    from: selectDateRange.start,
    to: selectDateRange.start,
    worker_name: '',
    amount: ''
  })
  const history = useHistory()

  const postChitRegisterData = async () => {
    const tempUrl = `${API_URLS['production'].add}`
    const resultData = await postProductionRegister(tempUrl, {
      ...detailMaterialData,
      pk: workHistoryData.pk,
      process_pk: workHistoryData.process_pk,
      worker_name: selectMember.pk
    })

    history.goBack()
  }

  const postChitFinishData = useCallback(async () => {
    const tempUrl = `${API_URLS['production'].finish}`
    const resultData = await postProductionRegister(tempUrl, {
      pk: match.params.pk,
      amount: Number(workHistoryData.amount)
    })

    history.goBack()
  }, [workHistoryData])

  const postChitUpdateData = async () => {
    console.log('worker : ', selectMember)
    const tempUrl = `${API_URLS['production'].update}`
    const resultData = await postProductionRegister(tempUrl, {
      history_pk: match.params.pk,
      worker_name: selectMember.pk,
      from: moment(workSelectTime).format('YYYY-MM-DD HH:mm'),
      to: moment(workEndTime).format('YYYY-MM-DD HH:mm'),
      amount: workHistoryData.amount
    })

    if (resultData && resultData.status === 200) {
      history.goBack()
    }
  }

  const getWorkHistory = async () => {
    const tempUrl = `${API_URLS['production'].historyLoad}?pk=${match.params.pk}`
    const resultData = await getProjectList(tempUrl)

    setModalSelect({
      ...modalSelect,
      chit: {
        name: resultData.chit_name,
        pk: resultData.chit_pk
      },
    })

    setDetailMaterialData({
      ...detailMaterialData,
      machine_name: resultData.machine_name,
      machine_pk: resultData.machine_pk,
      machine_type: resultData.machine_type,
      mold_pk: resultData.mold_pk ? resultData.mold_pk : undefined,
      mold_name: resultData.mold_name,
      process_name: resultData.process_name,
      input_materials: resultData.input_materials,
      output_materials: resultData.output_materials,
      amount: resultData.amount
    })

    setSelectMember({
      name: resultData.worker_name,
      pk: resultData.worker
    })

    setWorkHistoryData({
      ...workHistoryData,
      worker_name: resultData.worker_name,
      pk: resultData.chit_pk,
      amount: resultData.amount
    })

    setWorkSelectTime(moment(resultData.from).toDate())
    setWorkEndTime(moment(resultData.to).toDate())

    setProcessName(resultData.process_name)
  }

  const getChitSelect = async () => {
    if (modalSelect && modalSelect.chit && modalSelect.chit.pk) {
      const tempUrl = `${API_URLS['production'].chitSelect}?pk=${modalSelect.chit.pk}&page=1&limit=20`
      const resultData = await getProjectList(tempUrl)


      if (resultData) {
        setProcessList(resultData.info_list)
        let tmpList = resultData.info_list.map((v, i) => {
          return v.process_name
        })
        setProcessNameList([...tmpList])
      }
    }
  }

  React.useEffect(() => {
    if (match.params.pk) {
      if (match.params.type === 'register') {
        setIsFinish(true)
        getWorkHistory()
      } else if (match.params.type === 'update') {
        setIsUpdate(true)
        getWorkHistory()
      }
    }
  }, [])

  useEffect(() => {
    setSelectMember({})
  }, [memberType])

  React.useEffect(() => {
    getChitSelect()
  }, [modalSelect.chit])

  React.useEffect(() => {
    if (selectProcess >= 0) {
      setWorkHistoryData({
        ...workHistoryData,
        process_pk: processList[selectProcess].process_pk,
        machine_pk: processList[selectProcess].machine_pk,
        mold_pk: processList[selectProcess].mold_pk ? processList[selectProcess].mold_pk : ''
      })

      setModalSelect({
        ...modalSelect,
        mold: {
          name: processList[selectProcess].mold_name,
          pk: processList[selectProcess].mold_pk,
        }
      })

      setDetailMaterialData({
        ...detailMaterialData,
        machine_name: processList[selectProcess].machine_name,
        machine_pk: processList[selectProcess].machine_pk,
        machine_type: processList[selectProcess].machine_type,
        mold_pk: processList[selectProcess].mold_pk ? processList[selectProcess].mold_pk : undefined,
        mold_name: processList[selectProcess].mold_name === '-' ? undefined : processList[selectProcess].mold_name,
        input_materials: processList[selectProcess].input_materials,
        output_materials: processList[selectProcess].output_materials
      })
    }
  }, [selectProcess])

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{
            fontSize: 20,
            marginRight: 18,
            marginLeft: 3,
            fontWeight: 'bold'
          }}>{isFinish ? '작업 이력 완료' : isUpdate ? '작업 이력 수정' : '작업 이력 등록'}</span>
        </div>
      </div>
      <ContainerMain>
        <div>
          <p className={'title'}>필수 항목</p>
        </div>
        <div>
          <table style={{color: 'black'}}>
            <tr>
              <td>• 전표</td>
              <td>
                {
                  isFinish || isUpdate
                    ? <InputBox disabled={isFinish || isUpdate}
                                value={modalSelect && modalSelect.chit && modalSelect.chit.name}
                                placeholder={'총 작업량을 입력해 주세요'}></InputBox>
                    : <ChitPickerModal disabled={isFinish} select={modalSelect.chit}
                                       onClickEvent={(e) => {
                                         setModalSelect({...modalSelect, chit: e})
                                         setWorkHistoryData({...workHistoryData, pk: e.pk})
                                       }} text={'전표를 선택해 주세요'} buttonWid={30}/>
                }
              </td>
            </tr>
            <tr>
              <td>• 공정명</td>
              <td>
                {
                  isFinish || isUpdate
                    ? <InputBox disabled={isFinish || isUpdate}
                                value={detailMaterialData && detailMaterialData.process_name}
                                placeholder={'총 작업량을 입력해 주세요'}></InputBox>
                    : <RegisterDropdown
                      select={
                        isFinish
                          ? processName
                          : selectProcess >= 0 ? processList[selectProcess].process_name : undefined
                      }
                      onClickEvent={(e) => {
                        setSelectProcess(e)
                      }} contents={processNameList}
                      text={'공정명을 선택해 주세요'} type={'number'}/>
                }
              </td>
            </tr>
            <tr>
              <td>• 작업자명</td>
              <td>
                {
                  isFinish
                    ? <InputBox disabled={isFinish || isUpdate} value={selectMember && selectMember.name}
                                placeholder={'총 작업량을 입력해 주세요'}></InputBox>
                    : <MemeberPickerModal onClickEvent={(e) => setSelectMember(e)} 
                                          onChangeAuth={(e) => setMemberType(e)} auth={memberType}
                                          text={'작업자를 선택해 주세요'} select={selectMember}/>
                }
              </td>
            </tr>
            <tr>
              <td/>
              <td>
                <td>
                  <div style={{display: 'flex', width: 920, justifyContent: 'space-between'}}>
                    <div style={{width: 400, border: '0.5px solid #b3b3b3'}}>
                      {
                        (!isFinish && !isUpdate) &&
                        <ProductionPickerModal width={true} multiSelect innerWidth={400} isType
                                               onClickEvent={(material) => {
                                                 let tmpDetailMaterialData = detailMaterialData
                                                 tmpDetailMaterialData.input_materials = material
                                                 setDetailMaterialData({...tmpDetailMaterialData})
                                               }} text={'투입품목을 선택해주세요.'} select={undefined}/>
                      }
                      <div>
                        {
                          //@ts-ignore
                          detailMaterialData.input_materials && detailMaterialData.input_materials.length !== 0
                            ?
                            <div style={{width: 400, height: 'auto'}}>
                              <div style={{display: 'flex', marginTop: 5, padding: 5}}>
                                <div style={{flex: 1, textAlign: 'left'}}>품목명</div>
                                <div style={{flex: 1, textAlign: 'left'}}>품목타입</div>
                                <div style={{flex: 1, textAlign: 'left'}}>투입 개수(단위 중량)
                                </div>
                              </div>
                              {
                                //@ts-ignore
                                detailMaterialData && detailMaterialData.input_materials.map((value, index) => {
                                  return <div style={{
                                    display: 'flex',
                                    marginTop: 5,
                                    padding: 5
                                  }}>
                                    <div style={{
                                      flex: 1,
                                      textAlign: 'left'
                                    }}>{value.material_name}</div>
                                    <div style={{
                                      flex: 1,
                                      textAlign: 'left'
                                    }}>{transferCodeToName('material', value.material_type)}</div>
                                    <div style={{flex: 1, textAlign: 'left'}}>
                                      {
                                        isFinish || isUpdate ? value.count
                                          : <input style={{width: '95%'}}
                                                   type={'number'}
                                                   value={value.count}
                                                   onChange={(e) => {

                                                   }}/>
                                      }

                                    </div>
                                  </div>
                                })
                              }
                            </div>
                            : <div
                              style={{padding: '10px 0 10px 0', textAlign: 'center'}}>투입품목을
                              선택해주세요.</div>
                        }
                      </div>
                    </div>
                    <div style={{width: 400, border: '0.5px solid #b3b3b3'}}>
                      {
                        (!isFinish && !isUpdate) &&
                        <ProductionPickerModal width={true} innerWidth={400}
                                               onClickEvent={(material) => {
                                                 let tmpDetailMaterialData = detailMaterialData
                                                 tmpDetailMaterialData.output_materials = material
                                                 setDetailMaterialData({...tmpDetailMaterialData})
                                               }} type={1} text={'생산품목을 선택해주세요.'} isAllItem
                                               isType select={undefined}/>
                      }
                      <div>
                        {
                          detailMaterialData && detailMaterialData.output_materials
                            ? <div style={{width: '100%', height: 'auto'}}>
                              <div style={{display: 'flex', marginTop: 5, padding: 5}}>
                                <div style={{flex: 1, textAlign: 'left'}}>품목명</div>
                                <div style={{flex: 1, textAlign: 'left'}}>품목타입</div>
                                <div style={{flex: 1, textAlign: 'left'}}>생산 개수</div>
                              </div>
                              <div style={{display: 'flex', marginTop: 5, padding: 5}}>
                                <div style={{flex: 1, textAlign: 'left'}}>{
                                  //@ts-ignore
                                  detailMaterialData.output_materials.material_name
                                }</div>
                                <div style={{flex: 1, textAlign: 'left'}}>{
                                  //@ts-ignore
                                  transferCodeToName('material', detailMaterialData.output_materials.material_type)
                                }</div>
                                <div style={{flex: 1, textAlign: 'left'}}>
                                  {
                                    isFinish || isUpdate ? detailMaterialData.output_materials.count :
                                      <input style={{width: '95%'}} type={'number'}
                                             value={detailMaterialData.output_materials.count}
                                             onChange={(e) => {
                                               let tmpDetailMaterialData = detailMaterialData


                                             }}
                                      />
                                  }
                                </div>
                              </div>
                            </div>
                            : <div
                              style={{padding: '10px 0 10px 0', textAlign: 'center'}}>생산품목을
                              선택해주세요.</div>
                        }
                      </div>
                    </div>
                  </div>
                </td>
              </td>
            </tr>
            <tr>
              <td>• 기계명</td>
              <td>
                {
                  isFinish || isUpdate
                    ? <InputBox disabled={isFinish || isUpdate}
                                value={detailMaterialData && detailMaterialData.machine_name}
                                placeholder={'총 작업량을 입력해 주세요'}></InputBox>
                    : <MachinePickerModal select={
                      detailMaterialData && (detailMaterialData.machine_name && detailMaterialData.machine_pk) ? {
                        name: detailMaterialData.machine_name,
                        pk: detailMaterialData.machine_pk
                      } : undefined
                    } text={'기계명을 검색해 주세요'}
                                          onClickEvent={(e: { name?: string, type?: number, pk?: string }) => {
                                            if (e.pk && e.name) {
                                              let tmpDetailMaterialData = detailMaterialData
                                              tmpDetailMaterialData.machine_pk = e.pk
                                              tmpDetailMaterialData.machine_name = e.name
                                              tmpDetailMaterialData.machine_type = e.type
                                              setDetailMaterialData({...tmpDetailMaterialData})
                                            }
                                          }} buttonWid={30}/>}
              </td>
            </tr>
            {
              detailMaterialData.machine_type && detailMaterialData.machine_type === 1 && <tr>
                  <td>• 금형명</td>
                  <td>
                    {
                      isFinish || isUpdate
                        ? <InputBox disabled={isFinish || isUpdate}
                                    value={detailMaterialData && detailMaterialData.mold_name}
                                    placeholder={'총 작업량을 입력해 주세요'}></InputBox>
                        : <MoldPickerModal disabled={isFinish} select={modalSelect.mold}
                                           onClickEvent={(e) => {
                                             setModalSelect({...modalSelect, mold: e})
                                             setDetailMaterialData({
                                               ...detailMaterialData,
                                               mold_name: e.name,
                                               mold_pk: e.pk
                                             })
                                           }} text={'품목(품목명)을 선택해 주세요'} buttonWid={30}/>
                    }
                  </td>
              </tr>
            }
            {
              isUpdate && <tr>
                  <td>• 작업 시작 시간</td>
                  <td>
                      <div style={{height: 32, width: 919}}>
                          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={'ko'}>
                              <KeyboardDateTimePicker
                                  style={{width: '100%', height: 32}}
                                  value={workSelectTime}
                                  onChange={date => setWorkSelectTime(date)}
                                  format={'YYYY-MM-DD HH:mm'}
                              />
                          </MuiPickersUtilsProvider>
                      </div>
                  </td>
              </tr>
            }
            {
              isUpdate && <tr>
                  <td>• 작업 종료 시간</td>
                  <td>
                      <div style={{height: 32, width: 919}}>
                          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={'ko'}>
                              <KeyboardDateTimePicker
                                  style={{width: '100%', height: 32}}
                                  value={workEndTime}
                                  onChange={date => setWorkEndTime(date)}
                                  format={'YYYY-MM-DD HH:mm'}
                              />
                          </MuiPickersUtilsProvider>
                      </div>
                  </td>
              </tr>
            }
            {
              (isFinish || isUpdate) && <tr>
                  <td>• 총 작업량</td>
                  <td>
                      <div style={{height: 32}}>
                          <InputBox value={workHistoryData.amount} placeholder={'총 작업량을 입력해 주세요'}
                                    onChange={(e) => {
                                      if (!isNaN(Number(e.target.value))) {
                                        setWorkHistoryData({
                                          ...workHistoryData,
                                          amount: e.target.value
                                        })
                                      } else {
                                        alert('숫자만 입력 가능합니다.')
                                        setWorkHistoryData({
                                          ...workHistoryData,
                                          amount: ''
                                        })
                                      }
                                    }}/>
                      </div>
                  </td>
              </tr>
            }
          </table>
        </div>
        <div style={{marginTop: 130}}>
          <ButtonWrap onClick={async () => {
            if (isFinish) {
              if (workHistoryData.amount === '' && workHistoryData.amount === undefined) {
                alert('생산량을 입력해 주세요.')
              } else {
                await postChitFinishData()
              }
            } else if (isUpdate) {
              if (workHistoryData.amount === '' && workHistoryData.amount === undefined) {
                alert('생산량을 입력해 주세요.')
              } else if (
                !moment(workSelectTime).format('YYYY-MM-DD HH:mm').match(datetime_pattern) ||
                !moment(workEndTime).format('YYYY-MM-DD HH:mm').match(datetime_pattern)
              ) {
                alert('시간 형식이 잘못되었습니다.')
              } else {
                await postChitUpdateData()
              }
            } else {
              if (workHistoryData.pk === '' || workHistoryData.pk == undefined) {
                alert('전표를 선택해 주세요.')
              } else if (selectMember.pk === '' || selectMember.pk == undefined) {
                alert('작업자명을 작성해 주세요.')
              } else if (workHistoryData.process_pk === '' || workHistoryData.process_pk == undefined) {
                alert('공정명을 선택해 주세요.')
              } else {
                await postChitRegisterData()
              }
            }
          }}>
            <div>
              <p style={{fontSize: 18}}>{isFinish ? '완료하기' : isUpdate ? '수정하기' : '등록하기'}</p>
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
    padding: 35px 20px 20px 20px;
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
            width: calc( 915px - 8px );
            height: 28px;
            font-size: 15px;
            border: 0.5px solid #b3b3b3;
            background-color: #f4f6fa;
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

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`

const InputBox = Styled.input`
  border: solid 0.5px #d3d3d3;
  font-size: 14px;
  font-weight: bold;
  padding-left: 10px;
  width: calc(100% - 124px);
  background-color: #f4f6fa;
`

export default WorkHistoryRegisterContainer
