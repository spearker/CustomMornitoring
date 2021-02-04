import React, {useCallback, useEffect, useState} from 'react'
import CustomDashboardHeader from '../../../Components/Custom/dashboard/CustomDashboardHeader'
import Styled from 'styled-components'
import CustomDashboardTable from '../../../Components/Custom/dashboard/CustomDashboardTable'
import CustomDashboardTargetTable from '../../../Components/Custom/dashboard/CustomDashboardTargetTable'
import PressBox from '../../../Components/Custom/PM_Monitoring/PressBox'
import {API_URLS, getLoadTonList} from '../../../Api/pm/monitoring'
import Notiflix from 'notiflix'

const CustomPress: React.FunctionComponent = () => {
  const [list, setList] = useState<any[]>([])

  const getList = useCallback(async () => { // useCallback
    //TODO: 성공시


    const tempUrl = `${API_URLS['press'].status}`
    const res = await getLoadTonList(tempUrl)
    if (res) {
      setList(res.info_list)
      Notiflix.Loading.Remove()
      return true
    } else {
      setTimeout(() => {
        window.location.reload()
      }, 30000)
      Notiflix.Loading.Remove()
      return false
    }
  }, [list])

  useEffect(() => {
    Notiflix.Loading.Circle()
    getList()
    const interval = setInterval(async () => {
      const result = await getList()
      if (!result) {
        clearTimeout(interval)
      }
    }, 2500)
    return () => {
      clearTimeout(interval)
      //setTimer(null)
    }
  }, [])

  return (
    <Container>
      <CustomDashboardHeader title={'PRESS 현황 모니터링'}/>
      <div style={{
        padding: '0 48px 24px 48px',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
      }}>
        {list === undefined ?
          <p style={{color: 'white', fontSize: '30px', textAlign: 'center', width: '100%'}}>불러 올 수 있는 기계 정보가
            없습니다.</p>
          :
          list.map((machineData, index) => (
            <PressBox machineData={machineData}/>
          ))
        }
      </div>
    </Container>
  )
}


const Container = Styled.div`
  width: 100%;
  height: 100vh;
`


export default CustomPress
