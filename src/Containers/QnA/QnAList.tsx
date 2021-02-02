import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getQualityList} from '../../Api/mes/quality'
import {getCustomerData} from '../../Api/mes/customer'
import QualityTableDropdown from '../../Components/Dropdown/QualityTableDropdown'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import {useHistory} from 'react-router-dom'
import Notiflix from 'notiflix'
import OptimizedHeaderBox from '../../Components/Box/OptimizedHeaderBox'
import OptimizedTable from '../../Components/Table/OptimizedTable'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

const QnAListContainer = () => {

  const history = useHistory()

  const [list, setList] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState<any>('')
  const [detailList, setDetailList] = useState<any[]>([])
  const [index, setIndex] = useState({material_name: '품목(품목명)'})
  const [subIndex, setSubIndex] = useState({factory_name: '공정명'})
  const [checkIndex, setCheckIndex] = useState({checker: '검사자'})
  const [checkDetail, setCheckDetail] = useState<any[]>([])
  const [countIndex, setCountIndex] = useState({total_count: '총 완료 개수'})
  const [countDetail, setCountDetail] = useState<any[]>([])
  const [isFirst, setIsFirst] = useState<boolean>(false)
  const [workerIndex, setWorkerIndex] = useState({worker: '작업자'})
  const [workerDetail, setWorkerDetail] = useState<any[]>([])
  const [selectPk, setSelectPk] = useState<any>(null)
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })

  const indexList = {
    quality: {
      material_name: '등록일시',
      process_name: '분류',
      amount: '제목',
      eligible: '답변 상태',
      ineligible: '답변자',
      whether: '답변일시',
    }
  }

  const onClick = useCallback((obj) => {

  }, [])

  const searchChange = useCallback(async (search) => {
    setSearchValue(search)

  }, [searchValue])

  const AddComma = (num) => {
    let tmpNum = num.toString().split('.')
    let regexp = /\B(?=(\d{3})+(?!\d))/g
    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
  }

  const searchOnClick = useCallback(async (isPage?: boolean) => {
    setIsSearch(true)
    const tempUrl = `${API_URLS['status'].search}?keyWord=${searchValue}&page=${isPage ? page.current : 1}&limit=15`
    const res = await getCustomerData(tempUrl)
    if (res) {
      let viewList: any[] = []

      res.info_list.map(v => viewList.push(
        {
          request_pk: v.request_pk,
          material_name: v.material_name !== undefined ? v.material_name : '-',
          process_name: v.process_name !== undefined ? v.process_name : '-',
          amount: v.amount !== undefined ? AddComma(v.amount) : 0,
          eligible: v.eligible !== undefined ? AddComma(v.eligible) : 0,
          ineligible: v.ineligible !== undefined ? AddComma(v.ineligible) : 0,
          whether: v.whether !== undefined ? v.whether : '-',
          statement: v.statement !== undefined ? v.statement : '-'
        }
      ))

      setList(viewList.filter((f: any) => f.material_name !== undefined))
      setPage({current: res.current_page, total: res.total_page})
      Notiflix.Loading.Remove()
    }
  }, [searchValue, page])

  const getList = useCallback(async () => { // useCallback
    //TODO: 성공시
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['status'].list}?page=${page.current}&limit=15`
    const res = await getQualityList(tempUrl)
    if (res) {
      let viewList: any[] = []

      res.info_list.map(v => viewList.push(
        {
          request_pk: v.request_pk,
          material_name: v.material_name !== undefined ? v.material_name : '-',
          process_name: v.process_name !== undefined ? v.process_name : '-',
          amount: v.amount !== undefined ? AddComma(v.amount) : 0,
          eligible: v.eligible !== undefined ? AddComma(v.eligible) : 0,
          ineligible: v.ineligible !== undefined ? AddComma(v.ineligible) : 0,
          whether: v.whether !== undefined ? v.whether : '-',
          statement: v.statement !== undefined ? v.statement : '-'
        }
      ))
      setIsFirst(true)
      setList(viewList.filter((f: any) => f.material_name !== undefined))
      setPage({current: res.current_page, total: res.total_page})
      Notiflix.Loading.Remove()
    }
  }, [list, page])

  useEffect(() => {
    if (isSearch) {
      searchOnClick(true)
    } else {
      if (isFirst) {
        getList()
      }
    }
  }, [page.current])

  useEffect(() => {
    getList()
    setIndex(indexList['quality'])
    // setList(dummy)
  }, [])

  return (
    <div>
      <OptimizedHeaderBox
        title={'QnA'}
        searchBarChange={(e) => {
          if (!e.match(regExp)) setSearchValue(e)
        }}
        searchBarValue={searchValue}
        searchButtonOnClick={searchOnClick}
        titleOnClickEvent={[{Name: '문의사항 등록', Width: 170}]}
      />
      <OptimizedTable
        widthList={[100, 100, 100, 100, 100, 100, 100]}
        indexList={index}
        valueList={list}
        mainOnClickEvent={onClick}
        noChildren={true}
        currentPage={page.current}
        totalPage={page.total}
        pageOnClickEvent={(event, i) => setPage({...page, current: i})}
      >
        {
          selectPk !== null ?
            <LineTable title={'제품 품질 현황 자세히 보기 : 품목명 00 _ 공정명 00 '}>
              <QualityTableDropdown pk={'123'} clickValue={'123'} contentTitle={subIndex}
                                    contentList={detailList} widthList={['40%', '45%', '15%']}/>
              <QualityTableDropdown pk={'123'} clickValue={'123'} contentTitle={checkIndex}
                                    contentList={checkDetail} widthList={['10%', '75%', '15%']}>
                <div style={{marginTop: '70px', marginLeft: '10%', marginBottom: '50px'}}>
                  <QualityTableDropdown pk={'123'} contentTitle={countIndex} contentList={countDetail}
                                        widthList={['32%', '30%', '19%', '16%']}>

                  </QualityTableDropdown>
                </div>
              </QualityTableDropdown>
              <QualityTableDropdown pk={'123'} clickValue={'123'} contentTitle={workerIndex}
                                    contentList={workerDetail} widthList={['10%', '75%', '15%']}/>
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

export default QnAListContainer
