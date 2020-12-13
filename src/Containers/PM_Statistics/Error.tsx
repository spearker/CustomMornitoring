import React, {useCallback, useEffect, useState} from 'react'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getErrorData} from '../../Api/pm/statistics'
import Styled from 'styled-components'
import Notiflix from 'notiflix'
import OptimizedLineTable from '../../Components/Table/OptimizedLineTable'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const ErrorContainer = () => {

  const [list, setList] = useState<any[]>([])
  const [detailList, setDetailList] = useState<any[]>([])
  const [option, setOption] = useState(0)
  const [keyword, setKeyword] = useState<string>('')
  const [index, setIndex] = useState({pressName: '기계명'})
  const [selectIndex, setSelectIndex] = React.useState<number | null>(null)
  const [subIndex, setSubIndex] = useState({keycamType: '키캠 상태'})
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })
  const [detailPage, setDetailPage] = useState<PaginationInfo>({
    current: 1,
  })

  const [selectPk, setSelectPk] = useState<any>(null)
  const [selectMachine, setSelectMachine] = useState<any>(null)
  const [selectValue, setSelectValue] = useState<any>(null)


  const indexList = {
    error: {
      pressName: '기계명',
      pressNumber: '기계 번호',
      statement: '상태(에러명)',
      pressRegisterDate: '에러 발생일'
    }
  }

  const detailTitle = {
    error: {
      keycamType: '키캠 상태',
      loadton: '로드톤',
      slideHeight: '슬라이드 높이',
      pressErrorCode: '에러코드',
      errorTime: '시간',
      errorDate: '날짜'
    },
  }

  const onClick = (machine, i) => {
    if (selectIndex === i) {
      setSelectIndex(null)
      setSelectPk(null)
      setSelectMachine(null)
      setSelectValue(null)
      setDetailPage({...detailPage, current: 1})
    } else {
      setSelectIndex(i)
      setSelectPk(machine.pressPk)
      setSelectMachine(machine.pressName)
      setSelectValue(machine)
      //TODO: api 요청
      if (machine.pressPk === null) {
        return
      }
      getData(machine.pressPk)
      setDetailPage({...detailPage, current: 1})
    }


  }

  const getData = useCallback(async (pk) => {
    //TODO: 성공시
    if (pk !== undefined && pk !== null) {
      Notiflix.Loading.Circle()
      const tempUrl = `${API_URLS['error'].load}?pk=${pk}&page=${detailPage.current}&limit=7`
      const res = await getErrorData(tempUrl)
      if (res) {
        setDetailList(res.errorList)

        setDetailPage({current: res.current_page, total: res.total_page})
        Notiflix.Loading.Remove()
      }
    }
  }, [detailList, detailPage])


  const getList = useCallback(async () => { // useCallback
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['error'].list}?page=${page.current}&limit=5`
    const res = await getErrorData(tempUrl)
    if (res) {
      setList(res.info_list)
      setPage({current: res.current_page, total: res.total_page})
      Notiflix.Loading.Remove()
    }
  }, [list, page])

  useEffect(() => {
    setIndex(indexList['error'])
    setSubIndex(detailTitle['error'])
    getList()
  }, [])

  useEffect(() => {
    getList()
  }, [page.current])

  useEffect(() => {
    getData(selectPk)
  }, [detailPage.current])


  return (
    <OvertonTable
      title={'프레스 에러 로그'}
      indexList={index}
      valueList={list}
      currentPage={page.current}
      totalPage={page.total}
      pageOnClickEvent={(event, i: number) => {
        setSelectPk(null)
        setDetailPage({...detailPage, current: 1})
        setPage({...page, current: i})
      }}
      clickValue={selectValue}
      mainOnClickEvent={onClick}>
      {
        selectPk !== null ?
          <OptimizedLineTable title={selectMachine + ' 상세 에러 로그'}
                              contentTitle={subIndex}
                              contentList={detailList}
                              currentPage={detailPage.current}
                              totalPage={detailPage.total}
                              pageOnClickEvent={(event, i: number) => setDetailPage({
                                ...detailPage,
                                current: i
                              })}
                              widthList={[170, 100, 130, 350, 150, 150]}>
            <Line/>
          </OptimizedLineTable>
          :
          null
      }
    </OvertonTable>
  )
}

const Line = Styled.hr`
    margin: 10px 20px 0px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default ErrorContainer
