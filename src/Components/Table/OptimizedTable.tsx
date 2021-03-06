import React, {useState} from 'react'
import IcDropDownButton from '../../Assets/Images/ic_dropdown_white.png'
import IcFile from '../../Assets/Images/ic_file.png'
import Styled from 'styled-components'
import Pagination from '@material-ui/lab/Pagination'
import ReactTooltip from 'react-tooltip'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

interface Props {
  selectBoxChange?: any
  noTitle?: boolean
  file?: boolean
  widthList: string[] | number[]
  indexList: any
  valueList: any[]
  EventList?: any[]
  allCheckOnClickEvent?: any
  checkOnClickEvent?: any
  clickValue?: object
  mainOnClickEvent?: any
  onClickEvent?: any
  buttonState?: boolean
  currentPage?: number
  totalPage?: number
  pageOnClickEvent?: any
  noChildren?: boolean
  children?: any
  padding?: number
  orderByItem?: string[]
  orderByChange?: (e: ('ASC' | 'DESC')[]) => void
  orderByData?: ('ASC' | 'DESC')[]
}

const OptimizedTable: React.FunctionComponent<Props> = ({selectBoxChange, noTitle, file, widthList, indexList, valueList, EventList, allCheckOnClickEvent, checkOnClickEvent, buttonState, clickValue, mainOnClickEvent, noChildren, children, currentPage, totalPage, pageOnClickEvent, padding, orderByItem, orderByChange, orderByData}) => {

  const [checked, setChecked] = useState<any[]>([])

  React.useEffect(() => {
    if (checkOnClickEvent) {
      let tmpArr: boolean[] = []
      const arrData = valueList.map((v, i) => {
        tmpArr.push(false)
      })

      setChecked(tmpArr)
    } else {
      return
    }
  }, [valueList])


  return (
    <div>
      {noTitle ?
        <div></div>
        :
        <TitleBar>
          {
            allCheckOnClickEvent ?
              <div style={{paddingRight: 10, paddingLeft: 10, paddingTop: 5}}>
                <input type="checkbox" id={'all'}
                       checked={valueList.length > 0 && valueList.length === checked.filter(f => f === true).length}
                       onChange={(e) => {
                         if (valueList.length > 0 && valueList.length !== checked.filter(f => f === true).length) {
                           allCheckOnClickEvent(valueList)
                           let tmpArr: boolean[] = checked
                           tmpArr = tmpArr.map(() => true)
                           setChecked(tmpArr)
                           return true
                         } else {
                           let tmpArr: boolean[] = checked
                           tmpArr = tmpArr.map(() => false)
                           allCheckOnClickEvent([])
                           setChecked(tmpArr)
                           return false
                         }
                       }}/>
                <label htmlFor='all' style={{backgroundColor: 'white'}}/>
              </div>
              :
              (
                checkOnClickEvent ?
                  <div style={{paddingRight: 10, paddingLeft: 10}}>
                    <p></p>
                  </div>
                  :
                  null
              )
          }
          {
            Object.keys(indexList).map((v, i) => {
              return (
                typeof indexList[v] === 'object' ?
                  <LimitSelect
                    style={{
                      cursor: 'pointer',
                      backgroundColor: '#111319',
                      borderColor: '#111319',
                      color: 'white',
                      width: widthList[i],
                      fontSize: '18px',
                      fontWeight: 'bold',
                      fontFamily: 'NotoSansCJKkr',
                      margin: `0 ${padding ? padding : 16}px`,
                      background: `url(${IcDropDownButton}) no-repeat 95% 50%`
                    }}
                    onChange={(e) => selectBoxChange(e.target.value)}
                  >
                    {
                      Object.keys(indexList[v]).map(m => {
                        return (
                          <>
                            <option value={indexList[v][m]}
                                    style={{
                                      backgroundColor: '#111319',
                                      cursor: 'pointer'
                                    }}>{indexList[v][m]}</option>

                          </>
                        )
                      })
                    }
                  </LimitSelect>
                  : orderByItem && orderByItem.indexOf(v) !== -1 ?
                  <LimitButton
                    style={{
                      cursor: 'pointer',
                      backgroundColor: '#111319',
                      borderColor: '#111319',
                      color: 'white',
                      width: widthList[i],
                      fontSize: '18px',
                      fontWeight: 'bold',
                      fontFamily: 'NotoSansCJKkr',
                      display: 'flex',
                      flexDirection: 'row',
                      margin: `0 ${padding ? padding : 16}px`,
                      textAlign: 'left',
                      background: `url(${KeyboardArrowUpIcon}) no-repeat 95% 50%`
                    }}

                    onClick={() => {
                      if (orderByData) {
                        let tmp = orderByData
                        if (tmp[orderByItem.indexOf(v)] === 'ASC') {
                          tmp[orderByItem.indexOf(v)] = 'DESC'
                        } else if (tmp[orderByItem.indexOf(v)] === 'DESC') {
                          tmp[orderByItem.indexOf(v)] = 'ASC'
                        }
                        orderByChange && orderByChange(tmp)
                      }
                    }}
                  >
                    <div>
                      {indexList[v]}
                    </div>
                    {
                      orderByData && orderByData[i] === 'ASC'
                        ? <KeyboardArrowUpIcon/>
                        : <KeyboardArrowDownIcon/>
                    }
                  </LimitButton>
                  :
                  <LimitP key={v} style={{
                    width: widthList[i],
                    padding: padding ? `0 ${padding}px 0 ${padding}px` : '0 16px 0 16px'
                  }}>{indexList[v]}</LimitP>
              )
            })
          }
          {
            EventList && EventList.map((bv, bi) => {
              return (
                <div style={{width: bv.Width}}>
                </div>
              )
            })
          }
        </TitleBar>
      }
      {
        valueList !== undefined && valueList.length === 0
          ? (
            <ValueBar style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>저장된
              데이터가 없습니다.</p>
            </ValueBar>)
          : valueList?.map((v, i) => {
            /*
            v:  {
                pk: 'PK11212',
                machine_name: '프레스 01',
                machine_number: '000-000-00',
                manufacturer_code: '공정 01',
                machine_register_time: '2020.06.16 22:34:40',
                more_Action: false
            },
            */
            return (
              <ValueBar key={i}
                        style={{
                          backgroundColor: clickValue === v ? '#19b9df' : '#353b48',
                        }}>
                {
                  checkOnClickEvent ?
                    <div style={{paddingRight: 10, paddingLeft: 10, paddingTop: 5}}>
                      <input type="checkbox" id={`check-${i}-${v}`} checked={checked[i]}
                             onClick={(e) => {
                               let tmpArr: boolean[] = checked
                               tmpArr = tmpArr.map((vm, vi) => {
                                 if (vi === i) {
                                   if (vm) {
                                     checkOnClickEvent(v)
                                     return false
                                   } else {
                                     checkOnClickEvent(v)
                                     return true
                                   }
                                 } else {
                                   return vm
                                 }
                               })
                               // console.log('asldfjlkasdjflksajdflkjadsklf', tmpArr)
                               setChecked(tmpArr)
                               return false
                             }}/>
                      <label htmlFor={`check-${i}-${v}`} style={{backgroundColor: 'white'}}></label>
                    </div>
                    :
                    null
                }
                {
                  Object.keys(indexList).map((mv, mi) => {
                    //mv : [pk , machin_list, machine_name ... ]
                    return (
                      typeof v[mv] === 'object' ?
                        <LimitSelect style={{
                          width: widthList[mi],
                          backgroundColor: clickValue === v ? '#19b9df' : '#353b48',
                          borderColor: clickValue === v ? '#19b9df' : '#353b48'
                        }}>
                          <option value={''}>선택</option>
                          {
                            Object.keys(v[mv]).map(m => {
                              return (
                                <option value={v[mv][m]}>{v[mv][m]}</option>
                              )
                            })
                          }
                        </LimitSelect>
                        :
                        <LimitP key={`td-${i}-${mv}`} data-tip
                                data-for={`p${i}${mi}`}
                                style={{
                                  textAlign: mv.includes('goal') || mv.includes('cost') || mv.includes('stock') || mv.includes('amount') || mv.includes('shipped') || mv.includes('left') ? 'right' : 'left',
                                  cursor: mainOnClickEvent ? 'pointer' : 'default',
                                  width: widthList[mi],
                                  fontFamily: 'NotoSansCJKkr',
                                  fontSize: '18px',
                                  padding: padding ? `0 ${padding}px 0 ${padding}px` : '0 16px 0 16px'
                                }}
                                onClick={mainOnClickEvent && mainOnClickEvent ? () => mainOnClickEvent(v, i) : () => console.log()}
                        >
                          {file && 1 > mi &&
                          <img src={IcFile}
                               style={{
                                 width: 20,
                                 height: 15,
                                 marginRight: 10,
                                 alignSelf: 'center',
                                 cursor: 'pointer'
                               }}
                          />
                          }
                          {v[mv] === '' || v[mv] === null || v[mv] === undefined ?
                            ''
                            :
                            v[mv]
                          }
                          <ReactTooltip id={`p${i}${mi}`}>
                            <span>{v[mv]}</span>
                          </ReactTooltip>
                        </LimitP>

                    )
                  })
                }
                {
                  EventList && EventList.map((bv, bi) => {
                    return (
                      <div style={{width: bv.Width}}>
                        {buttonState ?
                          <ButtonBox onClick={() => bv.Link(v)} style={{
                            width: bv.Width,
                            color: v.status === '진행중' ? 'white' : 'white',
                            backgroundColor: v.status === '진행중' ? '#717c90' : '#19b9df'
                          }}
                          >{v.status === '진행중' ? '완료 하기' : '취소 하기'}</ButtonBox>
                          :
                          <ButtonBox disabled={(v.finished === '완료' && bv.Name !== '수정')}
                                     onClick={() => bv.Link(v)}
                                     style={{
                                       width: bv.buttonWidth,
                                       color: bv.Color,
                                       backgroundColor: (v.finished === '완료' && bv.Name !== '수정') ? '#19b9df' : '#717c90'
                                     }}>{bv.Name}</ButtonBox>
                        }
                      </div>
                    )
                  })
                }


              </ValueBar>

            )
          })
      }
      {currentPage && totalPage ?
        <PaginationBox>
          <Pagination count={totalPage ? totalPage : 0} page={currentPage} onChange={pageOnClickEvent}
                      boundaryCount={1} color={'primary'}/>
        </PaginationBox>
        :
        null
      }
      {noChildren !== undefined || false ?
        null :
        <div>
          {children === undefined || children === null ? <p></p> : children}
        </div>
      }
    </div>
  )
}

const TitleBar = Styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #111319;
    width: 100%;
    max-height: 50px;
    min-height: 50px;
    align-items: center;
    p {
     font-family: NotoSansCJKkr;
     font-size: 18px;
     font-weight: bold;
     font-stretch: normal;
     font-style: normal;
     text-align: left;
     color: #ffffff;
     padding: 0 16px 0 16px;
    }
`

const ValueBar = Styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #353b48;
    width: 100%;
    max-height: 50px;
    min-height: 50px;
    align-items: center;
    select {
     height: 50px;
     background-color: #353b48;
     border-color: #353b48;
     text-align: left;
     color: #ffffff;
     font-size: 14px;
    }
    p {
      text-align: left;
      color: #ffffff;
      font-size: 14px;
      padding: 0 16px 0 16px;
    }
`

const ButtonBox = Styled.button`
    color: black;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 112px;
    height: 30px;
`


const PaginationBox = Styled.div`
    padding-top: 10pt;
    display: flex;
    justify-content: center;
    .MuiButtonBase-root {
        color: white;
    }
    .MuiPaginationItem-root{
        color: white;
    }
`

const LimitSelect = Styled.select`
    text-overflow:ellipsis;
    white-space:nowrap;
    word-wrap:normal;
    overflow:hidden;
`

const LimitButton = Styled.button`
    text-overflow:ellipsis;
    white-space:nowrap;
    word-wrap:normal;
    overflow:hidden;
`

const LimitP = Styled.p`
    text-overflow:ellipsis;
    white-space:nowrap;
    word-wrap:normal;
    overflow:hidden;
`


export default OptimizedTable
