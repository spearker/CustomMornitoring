import React, {useCallback, useEffect, useState} from 'react'
import CustomDashboardHeader from '../../Components/Custom/dashboard/CustomDashboardHeader'
import Styled from 'styled-components'
import {API_URLS, getLoadTonList} from '../../Api/pm/monitoring'
import Notiflix from 'notiflix'
import PressBox from './Components/PressBox'
import SeleteMenuBox from './Components/SelectMenuBox'

const CustomMonitoring: React.FunctionComponent = () => {
  const [datas, setDatas] = useState<{ key: string, value: string }[]>([])
  const [list, setList] = useState<any[]>([])

  const getList = useCallback(async () => { // useCallback
    //TODO: 성공시

    const tempUrl = `${API_URLS['press'].custom}`
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
    // Notiflix.Loading.Circle()
    // getList()
    // const interval = setInterval(async () => {
    //   const result = await getList()
    //   if (!result) {
    //     clearTimeout(interval)
    //   }
    // }, 2500)
    // return () => {
    //   clearTimeout(interval)
    //   //setTimer(null)
    // }
  }, [])

  return (
    <Container>
      <CustomDashboardHeader title={'PRESS 모니터링'}/>
      <div style={{
        padding: '0 48px 24px 48px',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
      }}>
        <div>
          <SeleteMenuBox datas={datas} setDatas={setDatas}></SeleteMenuBox>
        </div>
        {/*<div style={{paddingLeft: 20}}>*/}
        {
          list.map((v) => {
            return <PressBox machineData={v}/>
          })
        }


        {/*</div>*/}
      </div>
    </Container>
  )
}


const Container = Styled.div`
  width: calc(100% - 80px);
  height: 100vh;
`


export default CustomMonitoring
