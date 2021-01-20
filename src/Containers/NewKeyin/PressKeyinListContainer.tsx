import React, {useCallback, useEffect, useState,} from 'react'
import OvertonTable from '../../Components/Table/OvertonTable'
import { API_URLS, getBasicList, registerBasicItem } from '../../Api/mes/basic'
import {useHistory} from 'react-router-dom'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import moment from 'moment'
import Notiflix from 'notiflix'
import OptimizedHeaderBox from '../../Components/Box/OptimizedHeaderBox'
import OptimizedTable from '../../Components/Table/OptimizedTable'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const PressKeyinListContainer = () => {
  const history = useHistory()
  
  const [list, setList] = useState<any[]>([])
  const [titleEventList, setTitleEventList] = useState<any[]>([])
  const [eventList, setEventList] = useState<any[]>([])
  const [index, setIndex] = useState<any>({spm: 'spm'})
  const [isFirst, setIsFirst] = useState<boolean>(false)
  const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })

  const indexList = {
    list: {
      worker: '작업자',
      process_name: '공정명',
      machine_name: '기계명',
      material_name: '품목명',
      work_time: '작업기간',
      registered: '등록일'
    }
  }

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

  const titleeventdummy = [
    {
      Name: '등록하기',
      Width: 90,
      Link: () => history.push('/pm/keyin/register')
    },
    {
      Name: '삭제',
      Link: () => postDelete()
    }
  ]

  const eventdummy = [
    {
      Name: '수정',
      Width: 80,
      buttonWidth: 60,
      Color: 'white',
      Link: (v) => history.push(`/pm/keyin/${v.pk}`)
    }
  ]

  const postDelete = useCallback(async () => {
    if (deletePk.pk.length <= 0) {
      alert('삭제하실 항목을 선택해 주세요.')
      return
    }
    Notiflix.Loading.Circle()
    
    const tempUrl = `${API_URLS['keyin'].delete}`
    const res = await registerBasicItem(tempUrl, deletePk)

    if(res) {
      arrayDelete()
      getList()
    }
    Notiflix.Loading.Remove()

  }, [deletePk])

  const getList = useCallback(async (isSearch?: boolean) => {
    //TODO: 성공시
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['keyin'].list}?limit=15&page=${isSearch ? 1 : page.current}`
    const res = await getBasicList(tempUrl)
    if (res) {
      setIsFirst(true)
      setPage({current: res.current_page, total: res.total_page})
      setList(res.info_list)
      Notiflix.Loading.Remove()
    }
  }, [list, page])


  useEffect(() => {
    getList()
    setTitleEventList(titleeventdummy)
    setIndex(indexList['list'])
    setEventList(eventdummy)
  }, [])

  useEffect(() => {
    if (isFirst) {
      getList()
    }
  }, [page.current])

  return (
    <>
      <div>
        <OvertonTable
          title={'프레스 key-in 리스트'}
          titleOnClickEvent={titleEventList}
          indexList={index}
          valueList={list}
          EventList={eventList}
          allCheckOnClickEvent={allCheckOnClick}
          checkOnClickEvent={checkOnClick}
          currentPage={page.current}
          totalPage={page.total}
          pageOnClickEvent={(event, i) => setPage({...page, current: i})}
          noChildren={true}
          widthList={[130, 150, 150, 150, 270, 200]}
          >
        </OvertonTable>
      </div> 
     
    </>
  )
}

export default PressKeyinListContainer
