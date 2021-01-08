import React, {useCallback, useEffect, useState,} from 'react'
import OvertonTable from '../../Components/Table/OvertonTable'
import {API_URLS, getProjectList, postProjectDelete,} from '../../Api/mes/production'
import {useHistory} from 'react-router-dom'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import moment from 'moment'
import Notiflix from 'notiflix'

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi
Notiflix.Loading.Init({svgColor: '#1cb9df',})

interface Props {
  match: any;
  // chilren: string;
}

const WorkerContainer = ({match}: Props) => {
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })
  const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
  const [list, setList] = useState<any[]>([])
  const [index, setIndex] = useState({worker_name: '작업자'})
  const [titleEventList, setTitleEventList] = useState<any[]>([])
  const [selectDate, setSelectDate] = useState({
    start: moment().format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD')
  })
  const [eventList, setEventList] = useState<any[]>([])
  const [option, setOption] = useState<number>(0)
  const [searchValue, setSearchValue] = useState<any>('')
  const [selectPk, setSelectPk] = useState<any>(null)
  const [selectMold, setSelectMold] = useState<any>(null)
  const [selectValue, setSelectValue] = useState<any>(null)
  const [isFirst, setIsFirst] = useState<boolean>(false)
  const history = useHistory()

  const indexList = {
    worker: {
      worker_name: '작업자',
      material_name: '품목명',
      process_name: '공정명',
      worked: '총 작업시간',
      amount: '작업량',
      state: '상태'
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
      Link: () => history.push('/project/history/register')
    },
    {
      Name: '삭제',
      Link: () => Notiflix.Confirm.Show('경고', '데이터를 삭제하면 기존 데이터는 롤백됩니다. 그래도 삭제하시겠습니까?', '확인', '취소', () => postDelete(), () => {
      })
    }
  ]

  const postDelete = useCallback(async () => {
    if (deletePk.pk.length <= 0) {
      alert('삭제하실 항목을 선택해 주세요.')
      return
    }
    const tempUrl = `${API_URLS['history'].delete}`
    const res = await postProjectDelete(tempUrl, deletePk)

    arrayDelete()
    getList()

  }, [deletePk])

  const AddComma = (num) => {
    let tmpNum = num.toString().split('.')
    let regexp = /\B(?=(\d{3})+(?!\d))/g
    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
  }

  const onClick = (mold) => {
    console.log(mold.state)
    if (mold.state !== '작업중') {
      history.push(`/project/history/update/${mold.pk}`)
    } else {
      Notiflix.Report.Warning('수정 할 수 없음', '작업이 완료된 작업이력만 수정할 수 있습니다.', '확인')
    }
  }

  const calendarOnClick = useCallback(async (start, end, isSearch?: boolean) => {
    setSelectDate({start: start, end: end ? end : ''})
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['production'].history}?pk=${match.params.pk !== undefined ? match.params.pk : ''}&from=${start}&to=${end}&limit=15&page=${isSearch ? 1 : page.current}&keyword=${searchValue}`
    const res = await getProjectList(tempUrl)
    if (res) {
      const getWorker = res.info_list.map((v, i) => {

        const amount = AddComma(v.amount)

        return {...v, amount: amount}
      })
      setPage({current: res.current_page, total: res.total_page})
      setList(getWorker)
      Notiflix.Loading.Remove()
    }
  }, [selectDate, match.params.pk, searchValue, page, option])

  const searchOnClick = useCallback(async () => {
    getList(true)

  }, [searchValue, option, page])

  const getList = useCallback(async (isSearch?: boolean) => { // useCallback
    //TODO: 성공시
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['production'].history}?pk=${match.params.pk !== undefined ? match.params.pk : ''}&from=${selectDate.start}&to=${selectDate.end}&limit=15&page=${isSearch ? 1 : page.current}&keyword=${searchValue}`
    const res = await getProjectList(tempUrl)
    if (res) {
      const getWorker = res.info_list.map((v, i) => {

        const amount = AddComma(v.amount)


        return {...v, amount: amount}
      })
      setIsFirst(true)
      setPage({current: res.current_page, total: res.total_page})
      setList(getWorker)
      Notiflix.Loading.Remove()
    }
  }, [list, selectDate, page, match.params.pk, option, searchValue])

  const eventdummy = [
    {
      buttonWidth: 80,
      Color: 'white',
      Link: (v) => v.state === '완료됨' ? null : history.push(`/project/history/register/${v.pk}`),
      Text: (v) => v.state === '완료됨' ? v.scheduled.split('~')[1] : undefined

    },
  ]

  // const onClick = useCallback((process) => {
  //     history.push(`/process/detail/${process.pk}`)
  // }, [list, selectPk])

  useEffect(() => {
    getList()
    setTitleEventList(titleeventdummy)
    setIndex(indexList['worker'])
    setEventList(eventdummy)
    // setList(dummy)

  }, [])

  useEffect(() => {
    if (isFirst) {
      getList()
    }
  }, [page.current, match.params.pk])

  return (
    <div>
      <OvertonTable
        title={'작업 이력'}
        selectDate={selectDate}
        searchValue={searchValue}
        searchButtonOnClick={searchOnClick}
        searchBarChange={(e) => {
          if (!e.match(regExp)) setSearchValue(e)
        }}
        calendarOnClick={calendarOnClick}
        titleOnClickEvent={titleEventList}
        indexList={index}
        valueList={list}
        allCheckOnClickEvent={allCheckOnClick}
        checkOnClickEvent={checkOnClick}
        eventTitle={'작업 완료 시간'}
        buttonDisappear={true}
        noChildren={true}
        EventList={eventList}
        currentPage={page.current}
        totalPage={page.total}
        pageOnClickEvent={(event, i) => setPage({...page, current: i})}
        mainOnClickEvent={onClick}>
      </OvertonTable>
    </div>
  )
}


export default WorkerContainer
