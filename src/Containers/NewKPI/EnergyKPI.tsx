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
  {name: '전기에너지 사용률', api: 'electric_saving_rate', tip: '사용된 전기의 총량 에너지 지수를 줄이면 운영 고정비가 감소됨.'} // api key이름
]

const subTitleList = {
  electric_saving_rate: {
    defects: '총 불량 개수',
    production: '총 생산량 개수',
    data: '불량률'
  }
}

const EnergyKPI = () => {
  const [selectMenu, setSelectMenu] = useState<Menu>(menuList[0])
  const [type, setType] = useState<'month' | 'week' | 'day'>('day')
  const [compareView, setCompareView] = useState<boolean>(false)
  const [data, setData] = useState<any>({number: 100, increase: true})
  const [compareArr, setCompareArr] = useState<number[]>([0, 0])

  const changeDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD')
  }

  const getData = async (from: Date, to: Date, index: number, pk?: string,) => {
    Notiflix.Loading.Circle()
    let tempUrl = `${API_URLS['kpi'].energy[selectMenu.api]}?machine=${pk}&from=${changeDate(from)}&to=${changeDate(to)}`
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
    setCompareArr([0, 0])
    setCompareView(false)
  }, [selectMenu])

  const onClose = () => {
    setCompareView(false)
    setData({})
  }

  return (
    <div style={{maxWidth: 1100}}>
      <TopHeader title={'에너지지수(E)'} top={5} bottom={19}/>
      <KPIMenuBox menuList={menuList} onChangeEvent={(select: Menu) => setSelectMenu(select)} value={selectMenu}>
        <KPICompareBox type={type} setType={(type) => setType(type)} getData={getData} value={selectMenu}
                       subTitleList={subTitleList[selectMenu.api]} index={0}/>
        {
          compareView
            ? <>
              <KPICompareBox type={type} getData={getData} value={selectMenu}
                             subTitleList={subTitleList[selectMenu.api]} index={1}/>
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

export default EnergyKPI
