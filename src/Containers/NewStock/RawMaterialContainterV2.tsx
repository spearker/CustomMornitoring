import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import {API_URLS, getStockList} from '../../Api/mes/manageStock'
import {useHistory} from 'react-router-dom'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Notiflix from 'notiflix'
import OptimizedHeaderBox from '../../Components/Box/OptimizedHeaderBox'
import OptimizedTable from '../../Components/Table/OptimizedTable'
import BlackChildrenBox from '../../Components/Box/BlackChildrenBox'
import InAndOutHeader from '../../Components/Box/InAndOutHeader'
import InAndOutTable from '../../Components/Table/InAndOutTable'
import moment from 'moment'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const NewRawMaterialContainerV2 = () => {

  const [list, setList] = useState<any[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [titleEventList, setTitleEventList] = useState<any[]>([])
  const [eventList, setEventList] = useState<any[]>([])
  const [detailList, setDetailList] = useState<any[]>([])
  const [index, setIndex] = useState({texture: '품목(품목명)'})
  const [subIndex, setSubIndex] = useState({LOT: '출처',})
  const [filter, setFilter] = useState(-1)
  const [type, setType] = useState(0)
  const [selectTitle, setSelectTitle] = useState<number>(0)
  const [selectPk, setSelectPk] = useState<any>(null)
  const [selectMold, setSelectMold] = useState<any>(null)
  const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [alignList, setAlignList] = useState<string[]>([])
  const [widthList, setWidthList] = useState<string[]>([])

  const [selectValue, setSelectValue] = useState<any>(null)
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })
  const [detailPage, setDetailPage] = useState<PaginationInfo>({
    current: 1
  })
  const history = useHistory()

  const indexList = {
    rawMaterial: {
      texture: '재질',
      material_spec_W: '폭(mm)',
      material_spec_D: '두께(mm)',
      current_stock: '총 중량(t)',
      coils: '코일 개수(ea)',
    }
  }


  const detailTitle = {
    inputData: {
      LOT: '품번/Lot',
      warehousing_amount: '입고 중량(t)',
      stock: '재고 중량(t)',
      status: '상태',
      location_name: ['위치'],
      warehousing_date: '입고일',
      passed: ['검수 결과'],
    },
    outputData: {
      LOT: '품번/Lot',
      date: '폭(mm)',
      before_quantity: '두께(mm)',
      stock_quantity: '출고 중량(kg)',
      writer1: '재고 중량(kg)',
      writer3: ['위치'],
      writer4: '출고일',
      writer5: ['출고 종류'],
    },
  }

  const eventdummy = [
    {
      Name: '입고',
      Width: 100,
      buttonWidth: 68,
      Color: 'white',
      Link: (v) => history.push(`/stock/warehousing/register/v2/version/${v.pk}/1111`)
    },
    {
      Name: '출고',
      Width: 100,
      buttonWidth: 68,
      Color: 'white',
      Link: (v) => {
        if (Number(v.current_stock) <= 0) {
          alert('출고할 수 있는 재고가 없습니다.')
        } else {
          history.push(`/stock/release/register/v2/version/${v.pk}/1111`)
        }
      }
    },
  ]

  const titleeventdummy = [
    {
      Name: '모든 재질 위치별 보기',
      Width: 214,
      buttonWidth: 190,
      Link: () => history.push('/stock/rawmaterial/location/v2')
    }
  ]

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


  }, [list, selectPk])

  const getData = useCallback(async (pk, isSearch?: boolean) => {
    //TODO: 성공시
    if (pk === null) {
      return
    }
    const tempUrl = `${API_URLS['stock'].rawDetail}?pk=${pk}&page=${isSearch ? 1 : detailPage.current}&date=${selectDate}&limit=4`
    const res = await getStockList(tempUrl)


    const tempData = res.info_list.map((v, i) => {
      return {
        ...v,
        status: String(v.status) !== 'undefined' ? String(v.status) === 'true' ? '사용종' : '대기중' : '-',
        passed: String(v.passed) !== 'undefined' ? String(v.passed) === 'true' ? '합격' : '불합격' : '-',
      }
    })
    setDetailList([...tempData])

    setDetailPage({current: res.current_page, total: res.total_page})
  }, [detailList, detailPage, selectDate])

  const selectBox = useCallback((value) => {
    if (value === '원자재') {
      setFilter(0)
    } else if (value === '부자재') {
      setFilter(1)
    } else if (value === '자재 종류') {
      setFilter(-1)
    }

  }, [filter])

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
    if (selectTitle === 0) {
      setSubIndex(detailTitle['inputData'])
      setAlignList(['left', 'center', 'center', 'left', 'left', 'left', 'left', 'center'])
      setWidthList(['270px', '96px', '96px', '56px', '120px', '96px', '108px', '100px', '100px'])
    } else {
      setSubIndex(detailTitle['outputData'])
      setAlignList(['left', 'center', 'center', 'center', 'center', 'left', 'left', 'left',])
      setWidthList(['302px', '78px', '96px', '120px', '120px', '94px', '104px', '104px',])
    }
  }, [selectTitle])

  useEffect(() => {
    getList()
    setSelectPk(null)
  }, [page.current, filter])

  // useEffect(() => {
  //
  // }, [selectPk])

  useEffect(() => {
    getData(selectPk)
  }, [detailPage.current, selectDate])

  useEffect(() => {
    getList()
    setIndex(indexList['rawMaterial'])
    // setList(dummy)
    setEventList(eventdummy)
    setTitleEventList(titleeventdummy)
  }, [])

  return (
    <div>
      <OptimizedHeaderBox title={'원자재 관리'} titleOnClickEvent={titleEventList} searchBarChange={(e) => setKeyword(e)}
                          searchButtonOnClick={() => ''}/>
      <OptimizedTable widthList={['264px', '96px', '160px', '120px', '120px', '156px']} indexList={index}
                      currentPage={page.current}
                      totalPage={page.total}
                      EventList={eventList}
                      pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                      mainOnClickEvent={onClick}
                      clickValue={selectValue}
                      valueList={list}>
        {selectPk !== null ?
          <div>
            <InAndOutHeader selectDate={selectDate} setSelectDate={setSelectDate}
                            buttonList={['입고 현황', '출고 현황', '지난 내역']} selectIndex={selectTitle}
                            setSelectIndex={setSelectTitle}/>
            <InAndOutTable indexList={subIndex} valueList={detailList}
                           alignList={alignList}
                           widthList={widthList}
                           mainOnClickEvent={(v) => {
                             history.push(`/stock/warehousing/register/v2/version/${selectPk}/1111/${v.pk}`)
                           }}
                           currentPage={detailPage.current}
                           totalPage={detailPage.total}
                           pageOnClickEvent={(event, i) => setDetailPage({...detailPage, current: i})}>
            </InAndOutTable>
          </div>
          :
          <BlackChildrenBox/>
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

export default NewRawMaterialContainerV2
