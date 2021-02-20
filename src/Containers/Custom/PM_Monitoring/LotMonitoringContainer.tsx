import React, {useCallback, useEffect, useState} from "react";
import CustomDashboardHeader from "../../../Components/Custom/dashboard/CustomDashboardHeader";
import Styled from "styled-components";
import {API_URLS, getLoadTonList} from "../../../Api/pm/monitoring";
import Notiflix from 'notiflix'
import LotProcessCard from "../../../Components/Card/LotProcessCard";

interface Contents {
  material_info:{
    material_name: string,
    material_lot: string
  }[],
  processes: Processes[]
}

interface Processes {
  process_pk: string,
  process_name: string,
  production_status: string[], 
  machine_info: {
    segment_pk: string, 
    machine_name: string, 
    mold_name: string
    input: {
      name: string,
      count: string,
      type: string
    }[],
    output: {
      name: string,
      count: string,
      type: string 
    }[],
  }[]
}

const LotMonitoringContainer = () => {
    const [list, setList] = useState<Contents[]>([])

    const getList = useCallback(async () => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['lot'].monitoring}`
        const res = await getLoadTonList(tempUrl)
        if (res) {
            setList(res);
        }
        Notiflix.Loading.Remove()
    }, [list])

    useEffect(() => {
        Notiflix.Loading.Circle()
        getList();
        const interval = setInterval(() => {
            getList()
        }, 2500)
        return () => {
            clearTimeout(interval)
        }
    }, [])

    return (
        <Container>
            <CustomDashboardHeader title={'LOT 현황 모니터링'} sameDistance />
            <div style={{
                width: '100%',
                padding: '0 48px 24px 48px',
                boxSizing: 'border-box',
                display: 'grid',
                gridRowGap: 20,
                gridTemplateColumns: 'repeat(auto-fill, calc(50% - 10px))',
                justifyContent: 'space-between'
            }}>
                {list === undefined ?
                    <p style={{color: 'white', fontSize: '30px', textAlign: 'center', width: '100%'}}>불러 올 수 있는 정보가
                        없습니다.</p>
                    :
                    list.map((lotData, index) => (
                        <LotProcessCard key={`${lotData.material_info[0].material_lot}${index}`} contents={lotData} />
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


export default LotMonitoringContainer
