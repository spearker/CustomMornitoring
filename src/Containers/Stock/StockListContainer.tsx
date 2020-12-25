import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getStockList} from '../../Api/mes/manageStock'
import {useHistory} from 'react-router-dom'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Notiflix from 'notiflix'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const StockListContainer = () => {

  const [list, setList] = useState<any[]>([])
  const [titleEventList, setTitleEventList] = useState<any[]>([])
  const [detailList, setDetailList] = useState<any>({
    machine_pk: '',
    machine_name: '',
    recommend: 0
  })
  const [index, setIndex] = useState({material_name: '품목(품목명)'})
  const [selectPk, setSelectPk] = useState<any>(null)
  const [selectStock, setSelectStock] = useState<any>(null)
  const [selectValue, setSelectValue] = useState<any>(null)
  const [subIndex, setSubIndex] = useState({writer: '작성자'})
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })
  const history = useHistory()

  const indexList = {
    stock_list: {
      material_name: '품목(품목명)',
      material_type: '자재 종류',
      current_stock: '재고량',
      location_name: '보관장소',
      safe_stock: '안전재고',
    }
  }

  const detailTitle = {
    item_detailList: {
      writer: '작성자',
      sortation: '구분',
      stock_quantity: '수량',
      before_quantity: '변경전 재고량',
      date: '날짜'
    }
  }

  const detailValue = [
    {
      writer: '김담당',
      sortation: '정상 입고',
      stock_quantity: '9,999,999,9999',
      before_quantity: '9,999,999,9999',
      date: '2020.08.09'
    },
  ]


  const onClick = useCallback((stock) => {
    if (stock.pk === selectPk) {
      setSelectPk(null)
      setSelectStock(null)
      setSelectValue(null)
    } else {
      setSelectPk(stock.pk)
      setSelectStock(stock.item_name)
      setSelectValue(stock)
      //TODO: api 요청
      // getData(stock.pk)
    }

  }, [list, selectPk])

  // const getData = useCallback(async (pk) => {
  //     //TODO: 성공시
  //     const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
  //     const res = await getMoldData(tempUrl)
  //
  //     setDetailList(res)
  //
  // }, [detailList])

  const AddComma = (num) => {
    let tmpNum = num.toString().split('.')
    let regexp = /\B(?=(\d{3})+(?!\d))/g
    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
  }

  const getList = useCallback(async () => { // useCallback
    //TODO: 성공시
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['stock'].list}?type=-1&filter=-1&page=${page.current}&limit=15`
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
      Notiflix.Loading.Remove()
    }
  }, [list, page])

  useEffect(() => {
    getList()
    setIndex(indexList['stock_list'])
    // setList(dummy)
    setDetailList(detailValue)
    setSubIndex(detailTitle['item_detailList'])
  }, [])

  useEffect(() => {
    getList()
  }, [page.current])

  return (
    <div>
      <OvertonTable
        title={'재고 현황'}
        titleOnClickEvent={titleEventList}
        indexList={index}
        valueList={list}
        currentPage={page.current}
        totalPage={page.total}
        pageOnClickEvent={(event, i) => setPage({...page, current: i})}
        noChildren={true}>
        {
          selectPk !== null &&
          <LineTable title={selectStock + ' 입출고 현황'} contentTitle={subIndex} contentList={detailList}>
              <Line/>
          </LineTable>
        }
      </OvertonTable>
    </div>
  )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default StockListContainer
