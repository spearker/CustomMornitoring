import React, {useEffect, useState} from 'react'
import KPIBasicBox from '../../Components/Box/KPIBasicBox'
import KPICompareBox from '../../Components/Box/KPICompareBox'
import KPIMenuBox from '../../Components/Box/KPIMenuBox'
import KPIResultBox from '../../Components/Box/KPIResultBox'
import TopHeader from '../../Components/Text/TopHeader'
import {API_URLS, getKPIData} from '../../Api/mes/KPI'
import moment from 'moment'
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
  {name: '불량률', api: 'defective_items_reduced_rate', tip: '불량률을 줄이면 품질 평가 증가.'}
]

const subTitleList = {
  defective_items_reduced_rate: {
    defects: '총 불량 개수',
    production: '총 생산량 개수',
    data: '불량률'
  }
}

const QualityKPI = () => {
  const [selectMenu, setSelectMenu] = useState<Menu>(menuList[0])
  const [type, setType] = useState<'month' | 'week' | 'day'>('day')
  const [compareView, setCompareView] = useState<boolean>(false)
  const [data, setData] = useState<any>({number: 100, increase: true})
  const [compareArr, setCompareArr] = useState<number[]>([0, 0])
  const [unit, setUnit] = useState<'percent' | 'ppm'>('percent')

  const changeDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD')
  }

  const getData = async (from: Date, to: Date, index: number, pk?: string) => {
    Notiflix.Loading.Circle()
    let tempUrl = ''
    if (selectMenu.api === 'defective_items_reduced_rate') {
      tempUrl = `${API_URLS['kpi'].quality[selectMenu.api]}?material=${pk}&from=${changeDate(from)}&to=${changeDate(to)}`
    } else {
      tempUrl = `${API_URLS['kpi'].quality[selectMenu.api]}?from=${changeDate(from)}&to=${changeDate(to)}`
    }
    const resultData = await getKPIData(tempUrl)
    Notiflix.Loading.Remove(300)
    if (resultData) {
      const tmpList = compareArr
      tmpList[index] = resultData.data
      setCompareArr(tmpList)
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
      <TopHeader title={'품질지수(Q)'} top={5} bottom={19}/>
      <KPIMenuBox menuList={menuList} onChangeEvent={(select: Menu) => setSelectMenu(select)} value={selectMenu}>
        <KPICompareBox type={type} setType={(type) => setType(type)} getData={getData} value={selectMenu}
                       subTitleList={subTitleList[selectMenu.api]} index={0} unit={unit} setUnit={(e) => setUnit(e)}/>
        {
          compareView
            ? <>
              <KPICompareBox type={type} getData={getData} value={selectMenu} index={1}
                             subTitleList={subTitleList[selectMenu.api]} unit={unit}/>
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

export default QualityKPI
