import React, {useCallback, useEffect, useState} from "react";
import CustomDashboardHeader from "../../../Components/Custom/dashboard/CustomDashboardHeader";
import Styled from "styled-components";
import CustomDashboardTable from "../../../Components/Custom/dashboard/CustomDashboardTable";
import CustomDashboardTargetTable from "../../../Components/Custom/dashboard/CustomDashboardTargetTable";
import PressBox from "../../../Components/Custom/PM_Monitoring/PressBox";
import {API_URLS, getLoadTonList} from "../../../Api/pm/monitoring";
import Notiflix from 'notiflix'
import LotProcessCard from "../../../Components/Card/LotProcessCard";

interface Contents {
  material_info:{
    material_name: string, //원자재명,
    material_lot: string //원자재lot,
  }[],
  processes: Processes[]

  // pk: string, // 세분화 공정 pk (String),
  // state: string,
  // name: string, // 세분화 공정명 (String),
  // // process_names: string, // 등록된 공정들의 명 (String)
  // process: Process[]
}

interface Processes {
  process_pk: string, //공정pk,
  process_name: string, //공정명,
  production_status: string[], // List<String> 공정pk,
  machine_info: {
    segment_pk: string, //라인기계공정pk,
    machine_name: string, //기계명,
    mold_name: string //금형명,  
    input: {
      name: string, //투입품목명,
      count: string // 투입중량
    }[],
    output: {
      name: string //생산품목명,
      count: string //생산 
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
