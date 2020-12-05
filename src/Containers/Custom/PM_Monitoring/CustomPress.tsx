import React, {useEffect, useState} from "react";
import CustomDashboardHeader from "../../../Components/Custom/dashboard/CustomDashboardHeader";
import Styled from "styled-components";
import CustomDashboardTable from "../../../Components/Custom/dashboard/CustomDashboardTable";
import CustomDashboardTargetTable from "../../../Components/Custom/dashboard/CustomDashboardTargetTable";
import PressBox from "../../../Components/Custom/PM_Monitoring/PressBox";

const dummy = [{
    pk: '12',
    name: '131af',
    material_name: 'wefqe',
    operation: 10,
    spm: 10,
    preset_counter: 10000000,
    total_counter: 10000000,
    runtime: '01:52:35',
    downtime: '03:42:35',
    percent: 90,
    material_spec_H: 41,
    material_spec_W: 44,
    material_spec_D: 46,
    mold_name: 'wef',
    keyCam: '촌동',
    production: 100000,
    load_factor: 20,
    cavity: 4
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
                <PressBox machineData={dummy[0]}/>
            </div>
        </Container>
    )
}


const Container = Styled.div`
  width: 100%;
  height: 100vh;
`


export default CustomPress
