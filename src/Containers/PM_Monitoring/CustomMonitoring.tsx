import React, {useCallback, useEffect, useState} from 'react'
import CustomDashboardHeader from '../../Components/Custom/dashboard/CustomDashboardHeader'
import Styled from 'styled-components'
import {API_URLS, getLoadTonList} from '../../Api/pm/monitoring'
import Notiflix from 'notiflix'
import PressBox from './Components/PressBox'
import SeleteMenuBox from './Components/SelectMenuBox'

export const dummyData = [
    {pk:"1", name:"첫번째 기계", operation:-2, spm:1, preset_counter:100000, preset_limit_counter:20000000, total_counter:2,
     runtime:"1", downtime:"1", percent:1, mold_name:"1", keyCam:"1", load_factor:1, loadtion_value:1,
     capacity:1, cavity:1},
    {pk:"2", name:"두번째 기계", operation:0, spm:2, preset_counter:2315321, preset_limit_counter:20000000, total_counter:2,
     runtime:"1", downtime:"1", percent:1, mold_name:"1", keyCam:"1", load_factor:1, loadtion_value:1,
     capacity:1, cavity:1},
    {pk:"3", name:"세번째 기계", operation:11, spm:3, preset_counter:10000, preset_limit_counter:20000000, total_counter:2,
     runtime:"1", downtime:"1", percent:1, mold_name:"1", keyCam:"1", load_factor:1, loadtion_value:1,
     capacity:1, cavity:1},

]

const CustomMonitoring: React.FunctionComponent = () => {

  const [datas, setDatas] = useState<{ key: string, value: string }[]>([])
  const [list, setList] = useState<any[]>([])

    useEffect(()=>{
        dummyData.map((value)=>{
          list.push({pk:value.pk, name:value.name, operation:value.operation, preset_limit_counter:value.preset_limit_counter})
        })
        setList([...list])
    },[])

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
          <SeleteMenuBox datas={datas} setDatas={setDatas} list={list} setList={setList}></SeleteMenuBox>
        </div>
        <div style={{paddingLeft: 20, display:"flex", width:"1500px",flexWrap:"wrap"}}>
        {
          list.map((v) => {
            return <PressBox machineData={v}/>
          })
        }
        </div>
      </div>
    </Container>
  )
}

const Container = Styled.div`
  width: calc(100% - 80px);
  height: 100vh;
  
`


export default CustomMonitoring
