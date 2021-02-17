import React from 'react'
import IcDropDownButton from '../../../Assets/Images/ic_dropdown_white.png'
import Pagination from '@material-ui/lab/Pagination'
import Styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

interface Props {
  selectBoxChange?: any
  entiretyWidth: string | number
  widthList: string[] | number[]
  alignList: any[]
  indexList: any
  valueList: any[]
  clickValue?: object
  mainOnClickEvent?: any
  onClickEvent?: any
  currentPage?: number
  totalPage?: number
  pageOnClickEvent?: any
}


const CustomDashboardTable: React.FunctionComponent<Props> = ({
                                                                selectBoxChange,
                                                                entiretyWidth,
                                                                widthList,
                                                                alignList,
                                                                indexList,
                                                                valueList,
                                                                clickValue,
                                                                mainOnClickEvent,
                                                                currentPage,
                                                                totalPage,
                                                                pageOnClickEvent
                                                              }) => {
  return (
    <div>
      <TitleBar style={{
        width: entiretyWidth,
        fontSize: '20px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal'
      }}>
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
                    textAlign: alignList[i],
                    fontSize: '20px',
                    fontFamily: 'NotoSansCJKkr',
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
                </LimitSelect>
                :
                <LimitP key={v}
                        style={{
                          width: widthList[i],
                          textAlign: alignList[i],
                          fontSize: '20px',
                          fontFamily: 'NotoSansCJKkr',
                        }}>{indexList[v]}</LimitP>
            )
          })
        }
      </TitleBar>
      {
        valueList !== undefined && valueList.length === 0
          ? (
            <ValueBar style={{backgroundColor: '#353b48', width: entiretyWidth}}><p
              style={{width: '100%', textAlign: 'center'}}>데이터가
              없습니다. </p>
            </ValueBar>)
          : valueList?.map((v, i) => {
            return (
              <ValueBar key={i}
                        style={{
                          backgroundColor: clickValue === v ? '#19b9df' : '#353b48',
                          width: entiretyWidth
                        }}>
                {
                  Object.keys(indexList).map((mv, mi) => {
                    return (
                      typeof v[mv] === 'object' ?
                        <LimitSelect style={{
                          fontSize: '20px',
                          fontFamily: 'NotoSansCJKkr',
                          width: widthList[mi],
                          textAlign: alignList[mi],
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
                                  cursor: mainOnClickEvent ? 'pointer' : 'default',
                                  width: widthList[mi],
                                  textAlign: alignList[mi],
                                  fontFamily: 'NotoSansCJKkr',
                                  fontSize: '18px'
                                }}
                                onClick={mainOnClickEvent && mainOnClickEvent ? () => mainOnClickEvent(v, i) : () => {
                                }}
                        >
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
    </div>
  )
}


const TitleBar = Styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #111319;
    width: 100%;
    max-height: 48px;
    min-height: 48px;
    align-items: center;
    p {
      color: #ffffff;
      font-size: 14px;
      padding-left: 16px;
      padding-right: 16px;
    }
`

const ValueBar = Styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #353b48;
    width: 100%;
    max-height: 48px;
    min-height: 48px;
    align-items: center;
    select {
     height: 48px;
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
      padding-left: 16px;
      padding-right: 16px;
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

const LimitSelect = Styled.select`
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

export default CustomDashboardTable
