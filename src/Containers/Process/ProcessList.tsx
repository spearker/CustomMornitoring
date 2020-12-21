import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getProcessList, postProcessDelete} from '../../Api/mes/process'
import {useHistory} from 'react-router-dom'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import {postCustomerDelete} from '../../Api/mes/customer'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import {keys} from '@material-ui/core/styles/createBreakpoints'
import Notiflix from 'notiflix'
import OptimizedTable from '../../Components/Table/OptimizedTable'
import OptimizedHeaderBox from '../../Components/Box/OptimizedHeaderBox'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

const ProcessListContainer = () => {
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })

  const [list, setList] = useState<any[]>([])
  const [BOMlist, setBOMList] = useState<any[]>([])
  const [titleEventList, setTitleEventList] = useState<any[]>([])
  const [eventList, setEventList] = useState<any[]>([])
  const [detailList, setDetailList] = useState<any>([])
  const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
  const [index, setIndex] = useState({type: '타입'})
  const [searchValue, setSearchValue] = useState<string>()
  const [selectPk, setSelectPk] = useState<any>(null)
  const [selectProcess, setSelectProcess] = useState<any>(null)
  const [selectValue, setSelectValue] = useState<any>(null)
  const [subIndex, setSubIndex] = useState({machine_name: '테스트 프레스',})
  const [widthList] = useState<number[]>([82, 320, 320])
  const history = useHistory()

  const indexList = {
    info_list: {
      type: '타입',
      name: '공정명',
      status: '생산 현황'
    }
  }

  const titleeventdummy = [
    {
      Name: '등록하기',
      Width: 90,
      Link: () => history.push('/process/register')
    },
    {
      Name: '삭제',
      Link: () => postDelete()
    }
  ]

  const detailTitle = {
    processes: {
      type: '공정명',
      machine_name: '기계',
      mold_name: '사용 금형'
    }
  }

  const onClick = useCallback((process) => {
    history.push(`/process/detail/${process.pk}`)
  }, [list, selectPk])

  const arrayDelete = () => {
    while (true) {
      deletePk.pk.pop()
      if (deletePk.pk.length === 0) {
        break
      }
    }
  }

  const allCheckOnClick = useCallback((list) => {
    let tmpPk: string[] = []

    {
      list.length === 0 ?
        arrayDelete()
        :
        list.map((v, i) => {
          arrayDelete()

          if (deletePk.pk.indexOf(v.pk) === -1) {
            tmpPk.push(v.pk)
          }

          tmpPk.map((vi, index) => {
            if (deletePk.pk.indexOf(v.pk) === -1) {
              deletePk.pk.push(vi)
            }
          })

          if (tmpPk.length < deletePk.pk.length) {
            deletePk.pk.shift()
          }

        })
    }
  }, [deletePk])

  const checkOnClick = useCallback((Data) => {
    let IndexPk = deletePk.pk.indexOf(Data.pk)
    {
      deletePk.pk.indexOf(Data.pk) !== -1 ?
        deletePk.pk.splice(IndexPk, 1)
        :
        deletePk.pk.push(Data.pk)
    }
  }, [deletePk])

  const postDelete = useCallback(async () => {
    if (deletePk.pk.length <= 0) {
      alert('삭제하실 항목을 선택해 주세요.')
      return
    }
    const tempUrl = `${API_URLS['process'].delete}`
    const res = await postProcessDelete(tempUrl, deletePk)

    arrayDelete()
    getList()
  }, [deletePk])

  const getData = useCallback(async (pk) => {
    //TODO: 성공시
    const tempUrl = `${API_URLS['process'].load}?pk=${pk}`
    const res = await getProcessList(tempUrl)

    const getprocesses = res.processes.map((v, i) => {
      const processType = transferCodeToName('process', res.type)
      return {...v, type: processType + ' ' + (i + 1) + '차'}
    })

    setDetailList(getprocesses)

  }, [detailList])

  const getList = async (isSearch?: boolean) => { // useCallback
    //TODO: 성공시
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['process'].list + '?page='}${isSearch ? 1 : page.current}&limit=15&keyword=${searchValue ? searchValue : ''}`
    const res = await getProcessList(tempUrl)
    if (res) {
      const getprocesses = res.info_list.map((v, i) => {
        const processType = transferCodeToName('process', v.type)
        return {...v, type: processType}
      })

      setPage({current: res.current_page, total: res.total_page})
      setList(getprocesses)
    }
    Notiflix.Loading.Remove()
  }

  useEffect(() => {
    // getList()
    setIndex(indexList['info_list'])
    setTitleEventList(titleeventdummy)
    // setList(dummy)
    // setDetailList(detailValue)
    setSubIndex(detailTitle['processes'])
  }, [])

  useEffect(() => {
    getList()
  }, [page.current])

  return (
    <div>
      <OptimizedHeaderBox
        title={'공정 리스트'}
        titleOnClickEvent={titleEventList}
        searchBarValue={searchValue}
        searchBarChange={(e) => {
          if (!e.match(regExp)) setSearchValue(e)
        }}
        searchButtonOnClick={() => {
          getList(true)
        }}
      />
      <OptimizedTable
        allCheckOnClickEvent={allCheckOnClick}
        checkOnClickEvent={checkOnClick}
        indexList={index}
        valueList={list}
        EventList={eventList}
        clickValue={selectValue}
        currentPage={page.current}
        totalPage={page.total}
        widthList={widthList}
        pageOnClickEvent={(event, i) => setPage({...page, current: i})}
        mainOnClickEvent={onClick}>
        {
          selectPk !== null ?
            <LineTable title={selectProcess + ' 상세 보기'} contentTitle={subIndex} contentList={detailList}>
              <Line/>
            </LineTable>
            :
            null
        }
      </OptimizedTable>
    </div>
  )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default ProcessListContainer
