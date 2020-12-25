import React, {useEffect, useState} from 'react'
import KPIBasicBox from '../../Components/Box/KPIBasicBox'
import KPICompareBox from '../../Components/Box/KPICompareBox'
import KPIMenuBox from '../../Components/Box/KPIMenuBox'
import KPIResultBox from '../../Components/Box/KPIResultBox'
import TopHeader from '../../Components/Text/TopHeader'
import {API_URLS, getKPIData} from '../../Api/mes/KPI'
import moment from 'moment'

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
  {name: '납기 준수율', api: 'delivery_compliance_improvement_rate', tip: '준수한 납기 건수가 올라갈수록 품질 및 기업 신뢰도가 올라감.'}, // api key이름
  {name: '수주출하 리드타임', api: 'order_shipment_leadTime_reduced_rate', tip: '수주에서 출하까지 걸린 시간의 합계.'},
  {
    name: '재고 정확도',
    api: 'stock_accuracy_improvement_rate',
    tip: '(재고 오류 수정한 갯수 / 전체 재고량 정확도)가 떨어질수록 재고관리가 제대로 되고있지 않거나 재고 로스 발생될 확률 높음.'
  }
]

const subTitleList = {
  delivery_compliance_improvement_rate: {
    total: '총 수주 건수',
    comply: '준수한 수주 건수'
  },
  order_shipment_leadTime_reduced_rate: {},
  stock_accuracy_improvement_rate: {
    error: '오류 정정 개수'
  }
}

const DuedateKPI = () => {
  const [selectMenu, setSelectMenu] = useState<Menu>(menuList[0])
  const [type, setType] = useState<'month' | 'week' | 'day'>('day')
  const [compareView, setCompareView] = useState<boolean>(false)
  const [data, setData] = useState<any>({number: 100, increase: true})
  const [compareArr, setCompareArr] = useState<number[]>([0, 0])
  const [result, setResult] = useState<number>()

  const changeDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD')
  }

  const getData = async (from: Date, to: Date, index: number) => {
    console.log(from, to)
    let tempUrl = ''
    if (selectMenu.api === 'manufacturing_leadTime_reduced_rate') {
      tempUrl = `${API_URLS['kpi'].delivery[selectMenu.api]}`
    } else {
      tempUrl = `${API_URLS['kpi'].delivery[selectMenu.api]}?from=${changeDate(from)}&to=${changeDate(to)}`
    }
    const resultData = await getKPIData(tempUrl)
    if (resultData) {
      const tmpList = compareArr
      tmpList[index] = typeof resultData.data === 'string' ? Number(resultData.data.split(':')[0]) * 3600 + Number(resultData.data.split(':')[1]) * 60 + Number(resultData.data.split(':')[2]) : resultData.data
      setCompareArr([...tmpList])
      console.log(tmpList)
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
      <TopHeader title={' 납기지수(D)'} top={5} bottom={19}/>
      <KPIMenuBox menuList={menuList} onChangeEvent={(select: Menu) => setSelectMenu(select)} value={selectMenu}>
        <KPICompareBox type={type} setType={(type) => setType(type)} getData={getData} value={selectMenu}
                       subTitleList={subTitleList[selectMenu.api]}/>
        {
          compareView
            ? <>
              <KPICompareBox type={type} getData={getData} subTitleList={subTitleList[selectMenu.api]} index={1}
                             value={selectMenu}/>
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

export default DuedateKPI
