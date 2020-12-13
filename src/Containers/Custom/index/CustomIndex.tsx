import React, {useCallback, useEffect, useState} from 'react'
import DashboardWrapContainer from '../../../Containers/DashboardWrapContainer'
import 'moment/locale/ko'
import InnerBodyContainer from '../../../Containers/InnerBodyContainer'
import CustomDashboardHeader from '../../../Components/Custom/dashboard/CustomDashboardHeader'
import CustomDashboardTable from '../../../Components/Custom/dashboard/CustomDashboardTable'
import CustomDashboardTargetTable from '../../../Components/Custom/dashboard/CustomDashboardTargetTable'
import OptimizedHeaderBox from '../../../Components/Box/OptimizedHeaderBox'
import {API_URLS, getLoadTonList} from '../../../Api/pm/monitoring'
import {transferCodeToName} from '../../../Common/codeTransferFunctions'
import Notiflix from 'notiflix'
import InAndOutHeader from '../../../Components/Box/InAndOutHeader'
import InAndOutTable from '../../../Components/Table/InAndOutTable'
import BlackChildrenBox from '../../../Components/Box/BlackChildrenBox'
import OptimizedTable from '../../../Components/Table/OptimizedTable'
import OptimizedLineTable from '../../../Components/Table/OptimizedLineTable'
import Styled from 'styled-components'

Notiflix.Loading.Init({svgColor: '#1cb9df',})


// 대시보드 메인 페이지
const NewDashboard = () => {
  const [index, setIndex] = useState({model: '모델'})
  const [list, setList] = useState<any[]>([])
  const [subIndex, setSubIndex] = useState({machine_name: '사용 기계명'})
  const [detailList, setDetailList] = useState<any[]>([])
  const [page, setPage] = useState<{ current: number, total?: number }>({current: 1})
  const [detailPage, setDetailPage] = useState<PaginationInfo>({
    current: 1
  })
  const [achievement, setAchievement] = useState<any[]>([])
  const [selectPk, setSelectPk] = useState<any>(null)
  const [selectValue, setSelectValue] = useState<any>(null)
  const [selectVoucher, setSelectVoucher] = useState<any>(null)

  const indexList = {
    production: {
      model: '모델',
      material_name: '품명',
      goal: '목표수량',
      produced: '작업수량'
    }
  }

  const detailTitle = {
    production: {
      machine_name: '사용 기계명',
      worker_name: '작업자명',
      material_name: '생산 품목명',
      worked: '총 작업시간',
      amount: '작업량'
    },
  }

  const onClick = useCallback((stock) => {
    if (stock.pk === selectPk) {
      setSelectPk(null)
      setSelectVoucher(null)
      setSelectValue(null)
    } else {
      setSelectPk(stock.pk)
      setSelectVoucher(stock.material_name)
      setSelectValue(stock)
      //TODO: api 요청
      getData(stock.pk)
    }

  }, [list, selectPk])

  const getData = useCallback(async (pk) => {
    //TODO: 성공시
    if (pk === null) {
      return
    }
    const tempUrl = `${API_URLS['project'].dropdown}?pk=${pk}&page=${detailPage.current}&limit=6`
    const res = await getLoadTonList(tempUrl)
    if (res) {
      setDetailList(res.info_list)

      setDetailPage({current: res.current_page, total: res.total_page})
    }
  }, [detailList, detailPage])

  const getList = useCallback(async () => { // useCallback
    //TODO: 성공시
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['project'].list}?page=${page.current}&limit=5`
    const res = await getLoadTonList(tempUrl)
    if (res) {
      const achieve = res.info_list.map((project) => {

        return project.achievement
      })
      setAchievement(achieve)

      setList(res.info_list)

      setPage({current: res.current_page, total: res.total_page})
      setSelectPk(null)
      Notiflix.Loading.Remove()
    }
  }, [list, page])

  useEffect(() => {
    setIndex(indexList['production'])
    setSubIndex(detailTitle['production'])
    const interval = setInterval(() => {
      getList()
    }, 60000)
    return () => {
      clearTimeout(interval)
      //setTimer(null)
    }
  }, [])

  useEffect(() => {
    getList()
  }, [page.current])

  useEffect(() => {
    getData(selectPk)
  }, [detailPage.current])

  return (
    <DashboardWrapContainer>
      <InnerBodyContainer>
        <OptimizedHeaderBox title={'PRESS 생산 현황 모니터링'}/>
        <div style={{display: 'flex'}}>
          <div style={{margin: '0 16px 0 0'}}>
            <CustomDashboardTable indexList={index} valueList={list} entiretyWidth={'800px'}
                                  alignList={['left', 'left', 'right', 'right']}
                                  widthList={['152px', '378px', '178px', '178px']}
                                  mainOnClickEvent={onClick}
                                  clickValue={selectValue}
                                  currentPage={page.current}
                                  totalPage={page.total}
                                  pageOnClickEvent={(event, i) => setPage({...page, current: i})}
            />
            {selectPk !== null ?
              <BlackChildrenBox>
                <OptimizedLineTable title={selectVoucher + ' 전표'}
                                    contentTitle={subIndex}
                                    contentList={detailList}
                                    currentPage={detailPage.current}
                                    totalPage={detailPage.total}
                                    pageOnClickEvent={(event, i: number) => setDetailPage({
                                      ...detailPage,
                                      current: i
                                    })}
                                    widthList={[150, 150, 250, 100, 100]}>
                  <Line/>
                </OptimizedLineTable>
              </BlackChildrenBox>
              :
              <BlackChildrenBox/>
            }
          </div>
          <CustomDashboardTargetTable valueList={achievement}/>
        </div>
      </InnerBodyContainer>
    </DashboardWrapContainer>

  )
}

const Line = Styled.hr`
    margin: 10px 20px 0px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default NewDashboard
