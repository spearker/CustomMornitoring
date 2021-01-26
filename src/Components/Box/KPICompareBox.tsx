import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import DateTypeCalendar from '../Modal/DateTypeCalendar'
import moment from 'moment'
import ProductionPickerModal from '../Modal/ProductionPickerModal'
import {Textfit} from 'react-textfit'
import Notiflix from 'notiflix'
import MachinePickerModal from '../Modal/MachinePickerModal'
import ItemPickerModal from '../Modal/ItemPickerModal'
import NormalInput from '../Input/NormalInput'
import {POINT_COLOR} from '../../Common/configset'
import IcSearchButton from '../../Assets/Images/check.png'

const pickerModalHeader = {
  product: [
    {title: '품목명', key: 'material_name', width: 100},
    {title: '품목 종류', key: 'material_type', width: 100},
    {title: '공장', key: 'location', width: 100},
  ],
  chit: [
    {title: '등록자명', key: 'registerer_name', width: 100},
    {title: '납품 업체명', key: 'supplier_name', width: 100},
    {title: '생산 품목명', key: 'material_name', width: 100},
    {title: '전표 생성일', key: 'registered', width: 100},
  ],
  contract: [
    {title: '거래처명', key: 'customer_name', width: 100},
    {title: '품목명', key: 'material_name', width: 100},
    {title: '수량', key: 'amount', width: 100},
    {title: '미납수량', key: 'left', width: 100},
  ],
  machine: [
    {title: '기계명', key: 'machine_name', width: 100},
    {title: '기계종류', key: 'machine_type', width: 100},
    {title: '제조사명', key: 'manufacturer', width: 100},
  ],
  project: [
    {title: '생산계획명', key: 'project_name', width: 100},
    {title: '계획자명', key: 'manager_name', width: 100},
    {title: '생산 품목명', key: 'material_name', width: 100},
    {title: '납품업체명', key: 'supplier_name', width: 100},
  ]
}

const pickerModalProps = {
  product: {
    text: '품목을 선택해 주세요',
    name: '품목(품목명)',
  },
  chit: {
    text: '전표을 선택해 주세요',
    name: '전표',
  },
  contract: {
    text: '수주를 선택해 주세요',
    name: '수주',
  },
  machine: {
    text: '기계를 선택해 주세요',
    name: '기계',
  },
  project: {
    text: '생산계획을 선택해 주세요',
    name: '생산계힉',
  }
}

// KPI
interface IProps {
  // data: { number: number, increase: boolean }
  type: 'month' | 'week' | 'day'
  setType?: (type: 'month' | 'week' | 'day') => void
  getData?: (from: Date, to: Date, index: number, pk?: string, cost?: number) => Promise<any>
  index?: number
  value?: any
  subTitleList?: { total?: string, comply?: string, error?: string },
  unit?: 'percent' | 'ppm'
  setUnit?: (unit: 'percent' | 'ppm') => void
}

interface requestDataType {
  pickerModal: 'none' | 'chit' | 'contract' | 'product' | 'machine' | 'project'
  date: boolean
  subItems: 'none' | 'multi' | 'list'
}

const unitArray = {
  percent: ['target_attainment_rate', 'facility_operational_improvement_rate', 'defective_items_reduced_rate', 'delivery_compliance_improvement_rate', 'stock_accuracy_improvement_rate',],
  kw: ['electric_saving_rate'],
}

const KPICompareBox = ({type, setType, getData, index, value, unit, setUnit, subTitleList}: IProps) => {
  const [data, setData] = useState<any>({})
  const [isFirst, setIsFirst] = useState<boolean>(true)

  const [requestData, setRequsetData] = useState<requestDataType>({pickerModal: 'none', date: false, subItems: 'none'})
  const [optionItems, setOptionItems] = useState<{ option: string, optionList: { title: string, value: number }[] }>({
    option: '0',
    optionList: []
  })

  const [defectiveUnit, setDefectiveUnit] = useState<'ppm' | 'percent'>('percent')
  const [selectDate, setSelectDate] = useState<Date>(moment().subtract(1, 'days').toDate())
  const [selectDates, setSelectDates] = useState<{ from: Date, to: Date }>({
    from: moment().subtract(2, 'day').toDate(),
    to: moment().subtract(1, 'day').toDate(),
  })

  const [selectMaterial, setSelectMaterial] = useState<{ name: string, pk: string }>()
  const [cost, setCost] = useState<number>()

  useEffect(() => {
    setOptionItems({
      ...optionItems,
      option: (requestData.pickerModal === 'product' || requestData.pickerModal === 'contract') ? '1' : '0',
      optionList: requestData.pickerModal === 'chit' ? [
        {title: '등록자', value: 0},
        {title: '품목명', value: 1},
        {title: '납품업체명', value: 2},
      ] : []
    })
  }, [requestData.pickerModal])

  useEffect(() => {
    console.log(unit)
    setDefectiveUnit(unit ?? 'percent')
  }, [unit])

  useEffect(() => {
    if (isFirst) {
      setSelectMaterial(undefined)
      setIsFirst(false)
      return
    } else {
      if (!value || value.api !== 'manufacturing_leadTime_reduced_rate') {
        if (requestData.pickerModal !== 'none') {
          if (selectMaterial) {
            if (getData) {
              if ((value.api === 'disposal_costs_of_defective_material' || value.api === 'production_cost_of_goods') && cost) {
                if (type === 'day') {
                  getData(selectDate, selectDate, index ? index : 0, selectMaterial.pk, cost).then((ratio) => {
                    setData(ratio)
                    Notiflix.Loading.Remove(300)
                  })
                } else {
                  getData(selectDates.from, selectDates.to, index ? index : 0, selectMaterial.pk, cost).then((ratio) => {
                    setData(ratio)
                    Notiflix.Loading.Remove(300)
                  })
                }
              } else {
                if (type === 'day') {
                  getData(selectDate, selectDate, index ? index : 0, selectMaterial.pk).then((ratio) => {
                    setData(ratio)
                    Notiflix.Loading.Remove(300)
                  })
                } else {
                  getData(selectDates.from, selectDates.to, index ? index : 0, selectMaterial.pk).then((ratio) => {
                    setData(ratio)
                    Notiflix.Loading.Remove(300)
                  })
                }
              }
            }
          } else {
            setData({})
          }
        } else {
          if (getData) {
            if (type === 'day') {
              getData(selectDate, selectDate, index ? index : 0).then((ratio) => {
                setData(ratio)
                Notiflix.Loading.Remove(300)
              })
            } else {
              getData(selectDates.from, selectDates.to, index ? index : 0).then((ratio) => {
                setData(ratio)
                Notiflix.Loading.Remove(300)
              })
            }
          }
        }
      } else {
        setData({})
      }
    }
  }, [selectDate, selectDates, isFirst])

  useEffect(() => {
    setIsFirst(true)
    setSelectMaterial(undefined)
    if (value && value.api) {
      switch (value.api) {
        case 'target_attainment_rate': // 생산 목표 달성률 //날짜선택이 불가능하고 생산계획 선택이 가능한 것
          setRequsetData({...requestData, pickerModal: 'project', date: false})
          break
        case 'manufacturing_leadTime_reduced_rate': // 제로리드타임 // 날짜선택이 불가능하고 전표 선택이 가능한 것
          setRequsetData({...requestData, pickerModal: 'chit', date: false})
          break
        case 'average_production_per_hour': // 시간당 생산량 // 날짜선택과 품목 선택이 가능한 것
        case 'facility_operational_improvement_rate': // 설비 가동률
        case 'defective_items_reduced_rate': // 불량률
        case 'disposal_costs_of_defective_material': // 폐기 비용
        case 'production_cost_of_goods': // 제품 원가
          setRequsetData({...requestData, pickerModal: 'product', date: true})
          break
        case 'electric_saving_rate': // 전개에너지 사용률 // 날짜선택과 기계 선택이 가능한 것
          setRequsetData({...requestData, pickerModal: 'machine', date: true})
          break
        case 'order_shipment_leadTime_reduced_rate': // 수주출하 리드타임 // 날짜선택이 불가능하고 수주선택이 가능한 것
          setRequsetData({...requestData, pickerModal: 'contract', date: false})
          break
        default:
          setRequsetData({...requestData, pickerModal: 'none', date: true})
          break

      }
    }
  }, [value.api])

  const AddComma = (num) => {
    let tmpNum = num.toString().split('.')
    let regexp = /\B(?=(\d{3})+(?!\d))/g
    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
  }

  React.useEffect(() => {
    if (type === 'day') {
      setSelectDate(moment().subtract(1, 'days').toDate())
    } else if (type === 'week') {
      const nowDate = moment().subtract(7, 'days')
      setSelectDates({
        from: nowDate.startOf('isoWeek').toDate(),
        to: nowDate.endOf('isoWeek').toDate()
      })
    } else if (type === 'month') {
      const nowDate = moment().subtract(1, 'month')
      setSelectDates({
        from: nowDate.startOf('month').toDate(),
        to: nowDate.endOf('month').toDate()
      })
    }

  }, [type])

  React.useEffect(() => {
    if (selectMaterial && index !== undefined) {
      if (getData) {
        if (cost) {
          if (type === 'day') {
            getData(selectDate, selectDate, index, selectMaterial.pk, cost).then((ratio) => {
              setData(ratio)
              Notiflix.Loading.Remove(300)
            })
          } else {
            getData(selectDates.from, selectDates.to, index, selectMaterial.pk, cost).then((ratio) => {
              setData(ratio)
              Notiflix.Loading.Remove(300)
            })
          }
        } else {
          if (type === 'day') {
            getData(selectDate, selectDate, index, selectMaterial.pk).then((ratio) => {
              setData(ratio)
              Notiflix.Loading.Remove(300)
            })
          } else {
            getData(selectDates.from, selectDates.to, index, selectMaterial.pk).then((ratio) => {
              setData(ratio)
              Notiflix.Loading.Remove(300)
            })
          }
        }

      }
    }
  }, [selectMaterial])

  return (
    <Container>
      <div>
        <div style={{height: 100}}>
          {
            requestData.date && <React.Fragment>
                <FlexBox>
                    <DateTypeCalendar type={type} selectDate={selectDate} selectDates={selectDates}
                                      style={{zIndex: setType !== undefined ? 100 : 1}}
                                      onChangeSelectDate={(v, type) => {
                                        if (type === 'day') {
                                          setSelectDate(v)
                                        } else {
                                          setSelectDates(v)
                                        }
                                      }}/>
                  {
                    setType !== undefined &&
                    <div style={{marginTop: 8}}>
                        <input type="radio" id="day" name="type"
                               checked={type === 'day'}
                               onClick={() => {
                                 setType('day')
                               }}/>
                        <label htmlFor="day"><span style={{marginLeft: 25}}>일</span></label>

                        <input type="radio" id="week" name="type"
                               checked={type === 'week'}
                               onClick={() => {
                                 setType('week')
                               }}/>
                        <label htmlFor="week"><span style={{marginLeft: 25}}>주</span></label>

                        <input type="radio" id="month" name="type"
                               checked={type === 'month'}
                               onClick={() => {
                                 setType('month')
                               }}/>
                        <label htmlFor="month"><span style={{marginLeft: 25}}>월</span></label>
                    </div>
                  }
                </FlexBox>
            </React.Fragment>
          }
          {
            requestData.pickerModal !== 'none' && <React.Fragment>
                <div style={{width: 371, paddingLeft: 10, paddingTop: 20}}>
                  {
                    requestData.pickerModal &&
                    <ItemPickerModal
                        onClickEvent={(e) => setSelectMaterial(e)}
                        select={selectMaterial}
                        optionItems={optionItems}
                        setOption={(e) => setOptionItems({...optionItems, option: e.toString()})}
                        text={pickerModalProps[requestData.pickerModal].text}
                        type={requestData.pickerModal}
                        title={pickerModalProps[requestData.pickerModal].name}
                        mainKey={pickerModalHeader[requestData.pickerModal][0].key}
                        etc={`type=0&option=${optionItems.option}&finished=true`}
                        tableHeaderValue={pickerModalHeader[requestData.pickerModal]}
                    ></ItemPickerModal>
                  }
                </div>
            </React.Fragment>
          }
          {
            (value.api === 'disposal_costs_of_defective_material' || value.api === 'production_cost_of_goods') &&
            <React.Fragment>
                <div style={{width: 371, paddingLeft: 10, paddingTop: 20}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      {
                        <InputBox
                          key={value.api} type={'number'}
                          value={cost ?? undefined} onKeyDown={(e) => {
                          if (e.keyCode === 13) {
                            if (selectMaterial && index !== undefined) {
                              if (getData) {
                                if (cost) {
                                  if (type === 'day') {
                                    getData(selectDate, selectDate, index, selectMaterial.pk, cost).then((ratio) => {
                                      setData(ratio)
                                      Notiflix.Loading.Remove(300)
                                    })
                                  } else {
                                    getData(selectDates.from, selectDates.to, index, selectMaterial.pk, cost).then((ratio) => {
                                      setData(ratio)
                                      Notiflix.Loading.Remove(300)
                                    })
                                  }
                                } else {
                                  if (type === 'day') {
                                    getData(selectDate, selectDate, index, selectMaterial.pk).then((ratio) => {
                                      setData(ratio)
                                      Notiflix.Loading.Remove(300)
                                    })
                                  } else {
                                    getData(selectDates.from, selectDates.to, index, selectMaterial.pk).then((ratio) => {
                                      setData(ratio)
                                      Notiflix.Loading.Remove(300)
                                    })
                                  }
                                }
                              }
                            }
                          }
                        }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            console.log(e.target.value)
                            if (isNaN(Number(e.target.value))) return
                            setCost(Number(e.target.value) === 0 ? undefined : Number(e.target.value))
                          }} placeholder={'KG당 원가를 입력해주세요 (선택)'}/>
                      }
                        <div style={{
                          display: 'inline-block',
                          backgroundColor: POINT_COLOR,
                          width: 30,
                          height: 30
                        }} onClick={() => {
                          if (selectMaterial && index !== undefined) {
                            if (getData) {
                              if (cost) {
                                if (type === 'day') {
                                  getData(selectDate, selectDate, index, selectMaterial.pk, cost).then((ratio) => {
                                    setData(ratio)
                                    Notiflix.Loading.Remove(300)
                                  })
                                } else {
                                  getData(selectDates.from, selectDates.to, index, selectMaterial.pk, cost).then((ratio) => {
                                    setData(ratio)
                                    Notiflix.Loading.Remove(300)
                                  })
                                }
                              } else {
                                if (type === 'day') {
                                  getData(selectDate, selectDate, index, selectMaterial.pk).then((ratio) => {
                                    setData(ratio)
                                    Notiflix.Loading.Remove(300)
                                  })
                                } else {
                                  getData(selectDates.from, selectDates.to, index, selectMaterial.pk).then((ratio) => {
                                    setData(ratio)
                                    Notiflix.Loading.Remove(300)
                                  })
                                }
                              }
                            }
                          }
                        }}>
                            <img style={{width: 20, height: 20, marginTop: 5}} src={IcSearchButton}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
          }
        </div>

        <div style={{display: 'flex', justifyContent: 'row'}}>
          {
            Object.keys(data).map((v) => {
              if (value.api === 'electric_saving_rate' && v === 'total') {
                return
              } else if (v === 'data' || v === 'ppm') {
                return
              } else if (v === 'materials') {
                return (
                  <div style={{height: 100, width: 400, marginRight: 16}}>
                    <div style={{width: 400, height: 20}}>
                      <p
                        style={{
                          fontSize: 14,
                          textAlign: 'left',
                          paddingLeft: 10
                        }}>{subTitleList && subTitleList[v]}</p>
                    </div>
                    <div
                      style={{
                        width: 400,
                        height: 80,
                        overflow: 'scroll',
                        border: '0.5px solid #b3b3b3',
                        marginLeft: 10,
                        marginTop: 10,
                        padding: 5
                      }}>
                      {
                        data[v].map((v, i) => {
                          return (
                            <>
                              <p style={{
                                textAlign: 'left',
                                fontSize: 20,
                              }}>{v}</p>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              }
              return (
                <div style={{height: 65, width: 160, marginRight: 16}}>
                  <div style={{width: 112, height: 20}}>
                    <p style={{fontSize: 14}}>{subTitleList && subTitleList[v]}</p>
                  </div>
                  <div style={{width: 160, height: 41}}>
                    <p style={{
                      textAlign: 'right',
                      fontSize: 20
                    }}>
                      {
                        !data ? 0 : !isNaN(Number(data[v])) ? Math.round(Number(data[v]) * 10) / 10 : data[v]
                      }
                    </p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      {
        (value.api === 'disposal_costs_of_defective_material' || value.api === 'production_cost_of_goods')
          ? <div>
            <div
              style={{
                height: 180,
                overflow: 'scroll',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
              {data.data && data.data.map((v) => {
                return <p style={{
                  textAlign: 'right',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>{v.split(',')[0] + ','} <br/> {v.split(',')[1]}</p>
              })}
            </div>
          </div>
          : requestData.pickerModal === 'machine'
          ? <div>
            <div>
              <p style={{
                textAlign: 'left',
                fontSize: 20,
                fontWeight: 'bold',
              }}>모든 기계가 사용에너지 사용량</p>
              <p style={{
                textAlign: 'right',
                fontSize: 64,
                fontWeight: 'bold',
              }}>{
                data.total ? data.total : 0
              }
                <span style={{fontSize: 40, paddingLeft: '4pt'}}>
                  {
                    defectiveUnit === 'ppm' && 'ppm'
                  }
                  {
                    defectiveUnit === 'percent' && unitArray.percent.indexOf(value.api) !== -1 && '%'
                  }
                  {
                    defectiveUnit === 'percent' && unitArray.kw.indexOf(value.api) !== -1 && 'KW'
                  }
            </span>
              </p>
              <p style={{
                textAlign: 'left',
                fontSize: 20,
                fontWeight: 'bold',
              }}>선택한 기계가 사용한 전기에너지 사용량</p>
              <p style={{
                textAlign: 'right',
                fontSize: 64,
                fontWeight: 'bold',
              }}>{
                data.data ? data.data : 0
              }
                <span style={{fontSize: 40, paddingLeft: '4pt'}}>
                  {
                    unitArray.percent.indexOf(value.api) !== -1 && '%'
                  }
                  {
                    unitArray.kw.indexOf(value.api) !== -1 && 'KW'
                  }
                </span>
              </p>
            </div>
          </div>
          :
          <div>
            {
              value.api === 'average_production_per_hour' && selectMaterial &&
              <div style={{height: 30}}>
                  <p>{selectMaterial.name}</p>
                  <p>오차율(±0.00005) (공회전, 초품검사)</p>
              </div>
            }
            {
              setUnit &&
              <div style={{height: 30}}>
                {
                  <div style={{marginTop: 8}}>
                    <input type="radio" id="percent" name="unit"
                           checked={defectiveUnit === 'percent'}
                           onClick={() => {
                             setUnit('percent')
                             setDefectiveUnit('percent')
                           }}/>
                    <label htmlFor="percent"><span style={{marginLeft: 25}}>%</span></label>

                    <input type="radio" id="ppm" name="unit"
                           checked={defectiveUnit === 'ppm'}
                           onClick={() => {
                             setUnit('ppm')
                             setDefectiveUnit('ppm')
                           }} style={{marginLeft: 20}}/>
                    <label htmlFor="ppm"><span style={{marginLeft: 25}}>ppm</span></label>

                  </div>
                }
              </div>
            }
            <div>
              <Textfit mode={'single'} style={{
                textAlign: 'right',
                fontSize: 128,
                fontWeight: 'bold',
              }}>
                {
                  defectiveUnit === 'percent' ?
                    !data.data
                      ? 0
                      : (value.api === 'amount_of_on_process_material' || value.api === 'stock_cost')
                      ? !isNaN(Number(data.data)) && AddComma(Math.round(Number(data.data) * 10) / 10)
                      : (value.api === 'defective_items_reduced_rate' || value.api === 'target_attainment_rate')
                        ? !isNaN(Number(data.data)) ? Math.round(Number(data.data) * 100000) / 1000 : data.data
                        : (value.api === 'average_production_per_hour')
                          ? data.data
                          : !isNaN(Number(data.data)) ? Math.round(Number(data.data) * 10) / 10 : data.data
                    : ''
                }
                {
                  defectiveUnit === 'ppm' ? data.ppm ?? 0 : ''
                }
                <span style={{fontSize: 40, paddingLeft: '4pt'}}>
                  {
                    defectiveUnit === 'ppm' && 'ppm'
                  }
                  {
                    defectiveUnit !== 'ppm' && unitArray.percent.indexOf(value.api) !== -1 && '%'
                  }
                  {
                    defectiveUnit === 'ppm' && unitArray.kw.indexOf(value.api) !== -1 && 'KW'
                  }
            </span>
              </Textfit>
            </div>
          </div>
      }
    </Container>
  )
}

const Container = Styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 224px;
    padding: 16px;
    background-color: #111319;
    border-radius: 0px 0px 6px 6px;
    margin-bottom: 8px;
    box-sizing: border-box;
    *{box-sizing: border-box;}
    &>div{
        width: 50%;
        &:first-child{
            position: relative;
            &>div{
                &:nth-child(2){
                    position: absolute;
                    bottom: 29px;
                    left: 0;
                    font-size: 30px;
                    font-weight: bold;
                }
            }
        }
        &:nth-child(2){
            padding-right: 60px;
        }
    }
`

const FlexBox = Styled.div`
    display: flex;
    &>div{
        &:first-child{
            margin-right: 24px;
            cursor: pointer;
            border-radius: 6px;
            background-color: #b3b3b3;
            color: #111319;
            padding: 4px 12px;
            font-size: 15px;
            font-weight: bold;
        }
        &:nth-child(2){
            &>input{
                cursor: pointer;
            }
            &>label{
                cursor: pointer;
                margin-right: 32px;
                &>span{
                    margin: 0 0 0 8px;
                    opacity: 0.7;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }
    }
`

const InputBox = Styled.input`
                border: solid 0.5px #d3d3d3;
                font-size: 14px;
                padding: 6px;
                padding-left: 10px;
                width: calc(100% - 124px);
                background-color: #f4f6fa;
                width: 100%;
                `


export default KPICompareBox
