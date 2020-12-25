import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getMoldData,} from '../../Api/pm/preservation'
import Notiflix from 'notiflix'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const MoldMaintenanceContainer = () => {

  const [list, setList] = useState<any[]>([])
  const [detailList, setDetailList] = useState<any>({
    max_count: 0,
    current_count: 0,
    percent: 0,
    pk: ''
  })
  const [index, setIndex] = useState({mold_name: '금형 명'})
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })
  const [selectPk, setSelectPk] = useState<any>(null)
  const [selectMold, setSelectMold] = useState<any>(null)
  const [selectValue, setSelectValue] = useState<any>(null)

  const indexList = {
    mold: {
      mold_name: '금형 명',
      location_name: '금형 위치',
      manufacturer_code: '제조 번호',
    }
  }

  const getData = useCallback(async (pk) => {
    //TODO: 성공시
    const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
    const res = await getMoldData(tempUrl)

    setDetailList({
      max_count: res.max_count ? res.max_count : 0,
      current_count: res.current_count ? res.current_count : 0,
      percent: res.percent !== 'NaN' ? res.percent : 0,
      pk: res.pk ? res.pk : ''
    })

  }, [])

  const onClick = useCallback((mold) => {
    if (mold.pk === selectPk) {
      setSelectPk(null)
      setSelectMold(null)
      setSelectValue(null)
    } else {
      setSelectPk(mold.pk)
      setSelectMold(mold.mold_name)
      setSelectValue(mold)
      //TODO: api 요청
      getData(mold.pk)
    }
  }, [selectPk, getData])


  const getList = useCallback(async () => { // useCallback
    //TODO: 성공시
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['mold'].list}?page=${page.current}&limit=5`
    const res = await getMoldData(tempUrl)
    if (res) {
      setList(res.info_list)
      setPage({current: res.current_page, total: res.total_page})
      Notiflix.Loading.Remove()
    }
  }, [list, page])

  useEffect(() => {
    getList()
    setIndex(indexList['mold'])
  }, [])

  useEffect(() => {
    getList()
  }, [page.current])

  const AddComma = (num) => {
    let tmpNum = num.toString().split('.')
    let regexp = /\B(?=(\d{3})+(?!\d))/g
    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
  }

  return (
    <OvertonTable
      title={'금형 수명 주기'}
      indexList={index}
      valueList={list}
      clickValue={selectValue}
      currentPage={page.current}
      totalPage={page.total}
      pageOnClickEvent={(event, i) => {
        setSelectPk(null)
        setPage({...page, current: i})
      }}
      mainOnClickEvent={onClick}>
      {
        selectPk !== null ?
          <LineTable title={selectMold + ' 수명 주기'}>
            {
              <CountingContainer>
                <div>
                  <p>타수 카운팅</p>
                  <p
                    style={{width: '180%'}}>{AddComma(detailList.max_count - detailList.current_count)}회
                    남음</p>
                </div>
                <div>
                  <MoldMaxBar>
                    <div
                      style={{width: (100 < detailList.percent ? 100 : detailList.percent) + '%'}}>

                    </div>
                  </MoldMaxBar>
                  <CountingNum>
                    {[0, 1, 2, 3, 4, 5].map((v, i) => {

                      const value = v *= (detailList.max_count / 5)
                      return (
                        <span>{AddComma(value.toFixed(0))}</span>
                      )
                    })}
                  </CountingNum>
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <span>(회)</span>
                  </div>
                </div>
              </CountingContainer>
            }
          </LineTable>
          :
          null
      }
    </OvertonTable>
  )
}

const CountingContainer = Styled.div`
   display: flex;
   flex-direction: row;
   margin-right: 20px;
   p {
    font-size: 14px;
      &:first-child{
      font-family: NotoSansCJKkr-Bold;
      }
   }
`

const MoldMaxBar = Styled.div`
  margin-top: 1px;
  margin-left: 85px;
  width: 870px;
  height: 20px;
  border: 0;
  border-radius: 25px;
  background-color: #1b2333;
  div {
    height: 20px;
    border: 0;
    border-radius: 25px;
    background-color: #fd6b00;
  }
`

const CountingNum = Styled.p`
   margin-left: 85px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   span {
      font-size: 14px;
   }
`

export default MoldMaintenanceContainer
