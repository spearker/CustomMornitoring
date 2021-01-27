import React, {useEffect, useState} from 'react'
import KPIBasicBox from '../../Components/Box/KPIBasicBox'
import KPICompareBox from '../../Components/Box/KPICompareBox'
import KPIMenuBox from '../../Components/Box/KPIMenuBox'
import KPIResultBox from '../../Components/Box/KPIResultBox'
import TopHeader from '../../Components/Text/TopHeader'
import moment from 'moment'
import {API_URLS, getKPIData} from '../../Api/mes/KPI'
import Notiflix from 'notiflix'

interface Menu {
  name: string,
  api: string,
  tip: string
}

const menuList: {
  name: string,
  api: string,
  tip: string
}[] = [
  // {
  //   name: '재공재고 수량',
  //   api: 'amount_of_on_process_material',
  //   tip: '재공재고 값이 낮으면 수요가 급증할 때 대응이 힘듦. 재공재고 값이 너무 높으면 품질에 문제가 있을 수 있음. \n연간 생산량에 대비해 적정 수준 유지를 권장.'
  // }, // api key이름
  // {name: '재고비용', api: 'stock_cost', tip: '재고비용을 줄이면 재고 저장에 드는 비용이 감소.'}
  {
    name: '폐기비용',
    api: 'disposal_costs_of_defective_material',
    tip: '불량이 발생한 제품의 소요되는 원자재의 가격'
  },
  {
    name: '제품 원가',
    api: 'production_cost_of_goods',
    tip: '제품을 1개 생산하는데 투입된 원자재의 가격(불량률이 높을수록 소모되는 원자재가 증가)'
  }
]

const subTitleList = {
  amount_of_on_process_material: {},
  stock_cost: {}
}

const CostKPI = () => {
  const [selectMenu, setSelectMenu] = useState<Menu>(menuList[0])
  const [type, setType] = useState<'month' | 'week' | 'day'>('day')
  const [compareView, setCompareView] = useState<boolean>(false)
  const [data, setData] = useState<any>({number: 100, increase: true})
  const [compareArr, setCompareArr] = useState<number[]>([0, 0])

  const changeDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD')
  }

  const getData = async (from: Date, to: Date, index: number, pk?: string, cost?: number) => {
    Notiflix.Loading.Circle()
    let tempUrl = ''
    if (selectMenu.api === 'disposal_costs_of_defective_material' || selectMenu.api === 'production_cost_of_goods') {
      tempUrl = `${API_URLS['kpi'].cost[selectMenu.api]}?material=${pk}&from=${changeDate(from)}&to=${changeDate(to)}${cost ? '&cost=' + cost : ''}`
    } else {
      tempUrl = `${API_URLS['kpi'].cost[selectMenu.api]}?from=${changeDate(from)}&to=${changeDate(to)}`
    }
    const resultData = await getKPIData(tempUrl)
    Notiflix.Loading.Remove(300)
    if (resultData) {
      const tmpList = compareArr
      tmpList[index] = typeof resultData.data === 'string' ? Number(resultData.data.split(':')[0]) * 3600 + Number(resultData.data.split(':')[1]) * 60 + Number(resultData.data.split(':')[2]) : resultData.data
      setCompareArr([...tmpList])
      return resultData
    }
    return 0
  }

  useEffect(() => {
    setCompareView(false)
  }, [selectMenu])

  const onClose = () => {
    setCompareView(false)
    setData({})
  }

  return (
    <div style={{maxWidth: 1100}}>
      <TopHeader title={'원가지수(C)'} top={5} bottom={19}/>
      <KPIMenuBox menuList={menuList} onChangeEvent={(select: Menu) => setSelectMenu(select)} value={selectMenu}>
        <KPICompareBox type={type} setType={(type) => setType(type)} getData={getData} value={selectMenu}
                       subTitleList={subTitleList[selectMenu.api]} index={0}/>
        {
          compareView
            ? <>
              <KPICompareBox type={type} getData={getData} value={selectMenu} index={1}
                             subTitleList={subTitleList[selectMenu.api]}/>
              <KPIResultBox onCloseEvent={() => onClose()} data={compareArr}/>
            </>
            : <KPIBasicBox style={{justifyContent: 'center', alignItems: 'center'}}>
              <button onClick={() => setCompareView(true)}>비교하기</button>
            </KPIBasicBox>
        }

      </KPIMenuBox>
    </div>
  )
}

export default CostKPI
