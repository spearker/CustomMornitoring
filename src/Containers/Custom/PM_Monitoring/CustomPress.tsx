import React, {useEffect, useState} from "react";
import CustomDashboardHeader from "../../../Components/Custom/dashboard/CustomDashboardHeader";
import Styled from "styled-components";
import CustomDashboardTable from "../../../Components/Custom/dashboard/CustomDashboardTable";
import CustomDashboardTargetTable from "../../../Components/Custom/dashboard/CustomDashboardTargetTable";
import PressBox from "../../../Components/Custom/PM_Monitoring/PressBox";

const dummy = [{
    machine_name: '기계명',
    model: '모델',
    production_name: '품명',
    goal: '목표수량',
    current_amount: '작업수량'
}, {
    machine_name: '기계명',
    model: '모델',
    production_name: '품명',
    goal: '목표수량',
    current_amount: '작업수량'
}, {
    machine_name: '기계명',
    model: '모델',
    production_name: '품명',
    goal: '목표수량',
    current_amount: '작업수량'
}, {
    machine_name: '기계명',
    model: '모델',
    production_name: '품명',
    goal: '목표수량',
    current_amount: '작업수량'
}, {
    machine_name: '기계명',
    model: '모델',
    production_name: '품명',
    goal: '목표수량',
    current_amount: '작업수량'
},]


const CustomPress: React.FunctionComponent = () => {
    const [index, setIndex] = useState({machine_name: '기계명'})
    const [list, setList] = useState<any[]>([])

    const indexList = {
        production: {
            machine_name: '기계명',
            model: '모델',
            production_name: '품명',
            goal: '목표수량',
            current_amount: '작업수량'
        }
    }

    useEffect(() => {
        setIndex(indexList["production"])
        setList(dummy)
    }, [])

    return (
        <Container>
            <CustomDashboardHeader title={'PRESS 현황 모니터링'}/>
            <div style={{
                padding: '0 48px 24px 48px',
                display: 'flex',
                flexWrap: "wrap",
                width: '100%'
            }}>
                <PressBox machine={'프레스 1호기'} material={'ASSIDJX0000SAD012301230QW0'}>

                </PressBox>
            </div>
        </Container>
    )
}


const Container = Styled.div`
  width: 100%;
  height: 100vh;
`


export default CustomPress
