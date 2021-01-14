import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getStockList} from '../../Api/mes/manageStock'
import {useHistory} from 'react-router-dom'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Notiflix from 'notiflix'
import OptimizedHeaderBox from '../../Components/Box/OptimizedHeaderBox'
import OptimizedTable from '../../Components/Table/OptimizedTable'
import BlackChildrenBox from '../../Components/Box/BlackChildrenBox'
import InAndOutHeader from '../../Components/Box/InAndOutHeader'
import InAndOutTable from '../../Components/Table/InAndOutTable'
import moment from 'moment'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const NewRawMaterialLocationContainerV2 = () => {

  const [list, setList] = useState<any[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [titleEventList, setTitleEventList] = useState<any[]>([])
  const [eventList, setEventList] = useState<any[]>([])
  const [index, setIndex] = useState({material_name: ['품목(품목명)']})
  const [filter, setFilter] = useState(-1)
  const [type, setType] = useState(0)

  const [selectValue, setSelectValue] = useState<any>(null)
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })
  const history = useHistory()

  const indexList = {
    rawMaterial: {
      material_name: ['위치'],
      material_number: ['재질'],
      current_stock: '품번/Lot',
      safe_stock: '폭(mm)',
      location_name: '두께(mm)',
      write1: '입고중량(kg)',
      write2: '코일중량(kg)',
      write3: '상태',
      write4: ['검수 결과'],
    }
  }

  const eventdummy = [
    {
      Name: '보기',
      Width: 80,
      buttonWidth: 68,
      Color: 'white',
      title: '품질 성적표',
    },
    {
      Name: '인쇄',
      Width: 80,
      buttonWidth: 68,
      Color: 'white'
    },
  ]

  const titleeventdummy = [
    {
      Name: '원자재 관리',
      Width: 152,
      buttonWidth: 152,
      Link: () => history.push('/stock/rawmaterial/list/v2')
    }
  ]

  const AddComma = (num) => {
    let tmpNum = num.toString().split('.')
    let regexp = /\B(?=(\d{3})+(?!\d))/g
    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
  }

  const getList = useCallback(async () => { // useCallback
    //TODO: 성공시
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['stock'].list}?type=${type}&filter=${filter}&page=${page.current}&limit=5`
    const res = await getStockList(tempUrl)

    if (res) {
      const getStock = res.info_list.map((v, i) => {
        const material_type = transferCodeToName('material', v.material_type)
        const current_stock = AddComma(v.current_stock)
        const safe_stock = AddComma(v.safe_stock)

        return {...v, material_type: material_type, current_stock: current_stock, safe_stock: safe_stock}
      })

      setList(getStock)

      setPage({current: res.current_page, total: res.total_page})
    }
    Notiflix.Loading.Remove()
  }, [list, type, filter, page])


  useEffect(() => {
    getList()
  }, [page.current, filter])

  useEffect(() => {
    getList()
    setIndex(indexList['rawMaterial'])
    setEventList(eventdummy)
    setTitleEventList(titleeventdummy)
  }, [])

  return (
    <div>
      <OptimizedHeaderBox title={'모든 재질 위치별 보기'} titleOnClickEvent={titleEventList}
                          searchBarChange={(e) => setKeyword(e)}
                          searchButtonOnClick={() => ''}/>
      <OptimizedTable widthList={['70px', '112px', '104px', '72px', '80px', '104px', '104px', '56px', '96px']}
                      indexList={index}
                      currentPage={page.current} noChildren
                      totalPage={page.total}
                      EventList={eventList}
                      pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                      clickValue={selectValue}
                      valueList={list}
                      padding={8}
      />
    </div>
  )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default NewRawMaterialLocationContainerV2
