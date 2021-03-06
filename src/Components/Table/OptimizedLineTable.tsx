import React from 'react'
import Styled from 'styled-components'
import Pagination from '@material-ui/lab/Pagination'

interface Props {
  title?: string,
  titleOnClickEvent?: any
  allCheckbox?: boolean
  contentTitle?: object
  checkBox?: boolean
  settingHeight?: string
  widthList: string[] | number[]
  contentList?: any[]
  objectLine?: boolean
  children?: any
  currentPage?: number
  totalPage?: number
  pageOnClickEvent?: any
}

const OptimizedLineTable: React.FunctionComponent<Props> = ({title, titleOnClickEvent, allCheckbox, contentTitle, checkBox, settingHeight, widthList, contentList, objectLine, currentPage, totalPage, pageOnClickEvent, children}: Props) => {
  return (
    <ClickBar>
      <ClickTitle>
        {title}
        {
          titleOnClickEvent && titleOnClickEvent.map((bv, bi) => {
            return (
              <div>
                <TitleButtonBox onClick={bv.Link} style={{width: bv.Width}}>{bv.Name}</TitleButtonBox>
              </div>
            )
          })
        }
      </ClickTitle>
      <ContentTitle>
        {
          allCheckbox !== undefined || false ?
            <div style={{paddingRight: 10, paddingLeft: 10, paddingTop: 5}}>
              <input type="checkbox" id='all' onClick={(e) => true}/>
              <label htmlFor='all' style={{backgroundColor: 'white'}}></label>
            </div>
            :
            (
              checkBox !== undefined || false ?
                <div style={{paddingRight: 10, paddingLeft: 10}}>
                  <p></p>
                </div>
                :
                null
            )
        }
        {contentTitle !== undefined ?
          Object.keys(contentTitle).map((v, i) => {
            return (
              <LimitP key={v} style={{
                width: widthList[i],
                paddingRight: v.includes('stock') || v.includes('amount') || v.includes('shipped') || v.includes('left') || v.includes('goal') || v.includes('eligible') || v.includes('ineligible') ? '30px' : '0',
              }}>{contentTitle[v]}</LimitP>
            )
          }) :
          null
        }
      </ContentTitle>
      <div>
        {children === undefined || children === null ? <></> : children}
      </div>
      <div style={{height: settingHeight, overflowY: 'scroll'}}>
        {contentList !== undefined && contentList.length === 0
          ? (<Content><p style={{width: '100%', textAlign: 'center'}}>조회 가능한 데이터가 없습니다.</p></Content>)
          : contentList && contentList.map((v, i) => {
          return (
            <>
              <Content key={i}>
                {
                  checkBox !== undefined || false ?
                    <div style={{paddingRight: 10, paddingLeft: 10, paddingTop: 5}}>
                      <input type="checkbox" id={`check-${i}-${v}`} onClick={(e) => true}/>
                      <label htmlFor={`check-${i}-${v}`} style={{backgroundColor: 'white'}}/>
                    </div>
                    :
                    null
                }
                {contentTitle !== undefined ?
                  Object.keys(contentTitle).map((mv, mi) => {
                    return (
                      v[mv] !== null && v[mv] !== undefined ?
                        <LimitP key={mv} style={{
                          width: widthList[mi],
                          paddingRight: mv.includes('stock') || mv.includes('amount') || mv.includes('shipped') || mv.includes('left') || mv.includes('goal') || mv.includes('eligible') || mv.includes('ineligible') ? '30px' : '0',
                          textAlign: mv.includes('stock') || mv.includes('amount') || mv.includes('shipped') || mv.includes('left') || mv.includes('goal') || mv.includes('eligible') || mv.includes('ineligible') ? 'right' : 'left'
                        }}>
                          {
                            typeof v[mv] === 'object' ?
                              Object.keys(v[mv]).map(m => {
                                return (
                                  <div>
                                    {v[mv][m]}
                                  </div>
                                )
                              })
                              :
                              v[mv]
                          }
                        </LimitP>
                        :
                        null
                    )
                  }) :
                  null
                }

              </Content>
              {objectLine !== undefined || false ?
                contentList.length !== i + 1 ?
                  <Line/>
                  :
                  null
                :
                null
              }
            </>
          )
        })
        }
      </div>

      {currentPage && totalPage ?
        <PaginationBox>
          <Pagination count={totalPage ? totalPage : 0} page={currentPage} onChange={pageOnClickEvent}
                      boundaryCount={1} color={'primary'}/>
        </PaginationBox>
        :
        null
      }
    </ClickBar>
  )
}

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

const ClickBar = Styled.div`
    color: #ffffff
    width: 100%;
    text-align: left;
    height: auto;
    border-radius: 6px;
`

const ClickTitle = Styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    font-size: 19px;
    font-family: NotoSansCJKkr-Bold;
`


const ContentTitle = Styled.div`
    font-family: NotoSansCJKkr-Bold;
    display: flex;
    flex-direction: row;  
    color: #ffffff
    font-size: 17px;
    width: 100%;
    align-items: center;
    text-align: left;
    margin-top: 10px;
`

const Content = Styled.div`
    font-family: NotoSansCJKkr-Bold;
    display: flex;
    flex-direction: row;  
    color: #ffffff;
    font-size: 17px;
    width: 100%;
    align-items: flex-start;
    text-align: left;
    margin-top: 10px;
    border-bottom: 1px solid #707070;
    padding: 5px 0 10px 0;
`

const Line = Styled.hr`
    margin: 10px 20px px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
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
    #text-overflow:ellipsis;
    white-space:break-spaces;
    word-wrap:normal;
    overflow:hidden;
`


export default OptimizedLineTable



