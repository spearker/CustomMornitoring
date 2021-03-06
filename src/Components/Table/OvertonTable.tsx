import React, {useState} from 'react'
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import BasicDropdown from '../Dropdown/BasicDropdown'
import IcSearchButton from '../../Assets/Images/ic_search.png'
import IcDropDownButton from '../../Assets/Images/ic_dropdown_white.png'
import {Input} from 'semantic-ui-react'
import Pagination from '@material-ui/lab/Pagination'
import ReactTooltip from 'react-tooltip'
import CalendarDropdown from '../Dropdown/CalendarDropdown'

interface Props {
  title: string
  selectDate?: any
  calendarOnClick?: any
  searchBarChange?: any
  searchButtonOnClick?: any
  searchValue?: any
  dropDownContents?: any
  dropDownOnClick?: any
  dropDownOption?: any
  selectBoxChange?: any
  titleOnClickEvent?: any
  indexList: any
  valueList: any[]
  alignList?: any[]
  widthList?: string[] | number[]
  EventList?: any[]
  allCheckOnClickEvent?: any
  calendarToday?: boolean
  checkOnClickEvent?: any
  clickValue?: object
  mainOnClickEvent?: any
  onClickEvent?: any
  buttonState?: boolean
  buttonDisappear?: boolean
  currentPage?: number
  totalPage?: number
  pageOnClickEvent?: any
  noChildren?: boolean
  children?: any
  calendarState?: boolean
  startDate?: string
  endDate?: string
  eventTitle?: string
}


const OvertonTable: React.FunctionComponent<Props> = ({
                                                        title,
                                                        selectDate,
                                                        calendarOnClick,
                                                        searchBarChange,
                                                        searchButtonOnClick,
                                                        searchValue,
                                                        dropDownContents,
                                                        dropDownOnClick,
                                                        dropDownOption,
                                                        selectBoxChange,
                                                        titleOnClickEvent,
                                                        widthList,
                                                        indexList,
                                                        alignList,
                                                        valueList,
                                                        EventList,
                                                        allCheckOnClickEvent,
                                                        checkOnClickEvent,
                                                        buttonState,
                                                        buttonDisappear,
                                                        clickValue,
                                                        mainOnClickEvent,
                                                        noChildren,
                                                        calendarState,
                                                        calendarToday,
                                                        children,
                                                        currentPage,
                                                        totalPage,
                                                        pageOnClickEvent,
                                                        eventTitle
                                                      }: Props) => {

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
      <Title>
        <p className="p-bold" style={{fontSize: 20}}>{title}</p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {dropDownOnClick ?
            <div style={{alignItems: 'center'}}>
              <BasicDropdown contents={dropDownContents} select={dropDownContents[dropDownOption]}
                             onClickEvent={dropDownOnClick}/>
            </div> :
            null
          }
          {searchButtonOnClick ?
            <div style={{width: '300px', display: 'flex', flexDirection: 'row', marginRight: 15}}>
              <SearchBox placeholder="검색어를 입력해주세요." style={{flex: 90}}
                         value={searchValue}
                         onKeyPress={(event) => event.key === 'Enter' && searchButtonOnClick()}
                         onChange={(e) => searchBarChange(e.target.value)}/>
              <SearchButton style={{flex: 10}} onClick={() => searchButtonOnClick()}>
                <img src={IcSearchButton}/>
              </SearchButton>
            </div> :
            null
          }
          {calendarOnClick ?
            <div style={{marginRight: 15}}>
              <CalendarDropdown type={'range'} selectRange={selectDate}
                                onClickEvent={(start, end) => calendarOnClick(start, end)}
                                unLimit={calendarState} toDayLimit={calendarToday}/>
            </div>
            :
            null
          }
          {
            titleOnClickEvent && titleOnClickEvent.map((bv, bi) => {
              return (
                <div style={{marginRight: 15}}>
                  <TitleButtonBox onClick={bv.Link}
                                  style={{width: bv.Width}}>{bv.Name}</TitleButtonBox>
                </div>
              )
            })
          }
        </div>
      </Title>
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
                         // setAllChecked(true)
                         // console.log('asldfjlkasdjflksajdflkjadsklf', tmpArr)
                         return true
                       } else {
                         let tmpArr: boolean[] = checked
                         tmpArr = tmpArr.map(() => false)
                         allCheckOnClickEvent([])
                         setChecked(tmpArr)
                         // setAllChecked(false)
                         // console.log('asldfjlkasdjflksajdflkjadsklf', tmpArr)
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
                <div style={{
                  width: widthList !== undefined ? widthList[i] : '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start'
                }}>
                  <select className="p-limits"
                          style={{
                            width: widthList !== undefined ? widthList[i] : '70%',
                            cursor: 'pointer',
                            backgroundColor: '#111319',
                            borderColor: '#111319',
                            color: 'white',
                            textAlign: alignList !== undefined ? alignList[i] : 'left',
                            fontSize: '14px',
                            marginRight: 30,
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
                  </select>
                </div>
                :
                <p key={v} className="p-limits"
                   style={{
                     width: widthList !== undefined
                       ? widthList[i]
                       : (v.includes('goal') || v.includes('cost') || v.includes('stock') || v.includes('amount') || v.includes('shipped') || v.includes('left'))
                         ? '65%' : '100%',
                     textAlign: alignList !== undefined ? alignList[i] : 'left',
                     paddingRight: v.includes('goal') || v.includes('cost') || v.includes('stock') || v.includes('amount') || v.includes('shipped') || v.includes('left') ? '20px' : '0'
                   }}>{indexList[v]}</p>
            )
          })
        }
        {
          EventList && EventList.map((bv, bi) => {
            return (
              <p className="p-limits"
                 style={{textAlign: 'center', width: bv.Width ?? '100%'}}>{eventTitle ? eventTitle : ''}</p>
            )
          })
        }
      </TitleBar>
      {
        valueList !== undefined && valueList.length === 0
          ? (
            <ValueBar style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>데이터가
              없습니다. </p>
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
                          cursor: children === undefined || noChildren ? title.indexOf('제품 검사') !== -1 || title.indexOf('금형 제작') !== -1 ? 'pointer' : 'default' : 'pointer'
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
                        <select className="p-limits" style={{
                          width: widthList !== undefined ? widthList[mi] : '100%',
                          textAlign: alignList !== undefined ? alignList[mi] : 'left',
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
                        </select>
                        :
                        <p key={`td-${i}-${mv}`} data-tip
                           data-for={`p${i}${mi}`}
                           className="p-limits"
                           style={{
                             textAlign: alignList !== undefined && alignList[mi] ? alignList[mi] : mv.includes('goal') || mv.includes('cost') || mv.includes('stock') || mv.includes('amount') || mv.includes('shipped') || mv.includes('left') ? 'right' : 'left',
                             cursor: mainOnClickEvent ? 'pointer' : 'default',
                             width: widthList !== undefined ? widthList[mi] : (mv.includes('goal') || mv.includes('cost') || mv.includes('stock') || mv.includes('amount') || mv.includes('shipped') || mv.includes('left'))
                               ? '65%' : '100%',
                             // width:'100%',
                             fontFamily: 'NotoSansCJKkr',
                             fontSize: '14px',
                             paddingRight: mv.includes('goal') || mv.includes('cost') || mv.includes('stock') || mv.includes('amount') || mv.includes('shipped') || mv.includes('left') ? '20px' : '0'
                           }}
                           onClick={mainOnClickEvent && mainOnClickEvent ? () => mainOnClickEvent(v, i) : () => console.log()}
                        >

                          {v[mv] === '' || v[mv] === null || v[mv] === undefined ?
                            ''
                            :
                            v[mv]
                          }
                          <ReactTooltip id={`p${i}${mi}`}>
                            <span>{mv === 'current_stock' ? v['real_current_stock'] ?? v[mv] : mv === 'safe_stock' ? v['safe_stock'] ?? v[mv] : v[mv]}</span>
                          </ReactTooltip>
                        </p>

                    )
                  })
                }
                {
                  EventList && EventList.map((bv, bi) => {
                    return (
                      <div className="p-limits" style={{width: bv.Width ? bv.Width : '100%'}}>
                        {
                          bv.Text && bv.Text(v) ? <p key={`td-${i}-e`}
                                                     className="p-limits"
                                                     style={{
                                                       width: '100%',
                                                       textAlign: 'center',
                                                       padding: 0
                                                     }}
                                                     onClick={mainOnClickEvent && mainOnClickEvent ? () => mainOnClickEvent(v, i) : () => console.log()}
                          > {bv.Text(v)} </p> : buttonDisappear ?
                            <ButtonBox onClick={() => bv.Link(v)} style={{
                              cursor: v.state === '작업중' ? 'pointer' : 'default',
                              width: bv.buttonWidth,
                              color: v.state === '작업중' ? 'white' : 'white',
                              backgroundColor: v.state === '작업중' ? '#717c90' : '#353b48'
                            }}
                            >{v.state === '작업중' ? '완료 하기' : ''}</ButtonBox>
                            :
                            buttonState ?
                              <ButtonBox onClick={() => bv.Link(v)} style={{
                                width: bv.buttonWidth,
                                color: bv.buttonState === true ? v.status === '진행중' ? 'white' : 'white' : bv.Color,
                                backgroundColor: bv.buttonState === true ? v.status === '진행중' ? '#717c90' : '#19b9df' : '#717c90'
                              }}
                              >{bv.buttonState === true ? v.status === '진행중' ? '완료 하기' : '취소 하기' : bv.Name}</ButtonBox>
                              :
                              <ButtonBox disabled={(v.finished === '완료')}
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
        <BlackBg /*style={{backgroundColor:  !== undefind ?  '#ff341a' : '#353b48'}}*/>
          {children === undefined || children === null ? <p></p> : children}
        </BlackBg>
      }
    </div>
  )
}

const Title = Styled.div`
                    text-align: left;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    margin-top: 87px;
                    `

const TitleBar = Styled.div`
                    display: flex;
                    flex-direction: row;
                    border-radius: 8px;
                    background-color: #111319;
                    width: 100%;
                    max-height: 40px;
                    min-height: 40px;
                    align-items: center;
                    p {
                    text-align: left;
                    color: #ffffff;
                    font-size: 14px;
                    &:first-child{
                    padding-left: 20px;
                }
                }
                    `

const BlackBg = Styled.div`
                    padding: 20px 20px 30px 20px;
                    border-radius: 6px;
                    background-color: #111319;
                    margin-top: 20px;
                    `

const ValueBar = Styled.div`
                    margin-top: 12px;
                    display: flex;
                    flex-direction: row;
                    border-radius: 8px;
                    background-color: #353b48;
                    width: 100%;
                    max-height: 40px;
                    min-height: 40px;
                    align-items: center;
                    select {
                    height: 40px;
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
                    &:first-child{
                    padding-left: 20px;
                }
                }
                    `

const TitleButtonBox = Styled.button`
                    color: white;
                    border-radius: 5px;
                    background-color: #717c90;
                    border: 0;
                    font-size: 14px;
                    font-weight: bold;
                    width: 70px;
                    height: 30px;
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

const SearchBox = Styled(Input)`
                    input{
                    padding-left: 8px;
                    font-family: NotoSansCJKkr;
                    height: 28px;
                    border: 0.5px solid #b3b3b3;
                    border-radius: 10px 0 0px 10px;
                    width: 100%;
                    margin-right: -10%;
                    background-color: #f4f6fa;
                    font-size: 15px;
                    &::placeholder:{
                    color: #b3b3b3;
                };
                }
                    `

const SearchButton = Styled.button`
                    width: 55px;
                    height: 32px;
                    border-radius: 5px 5px 5px 5px;
                    background-color: ${POINT_COLOR};
                    img{
                    width: 20px;
                    height: 20px;
                    margin-top: 5px;
                }
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

export default OvertonTable
