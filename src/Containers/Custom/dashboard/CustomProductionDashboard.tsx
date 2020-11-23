import React, {useEffect, useState} from "react";
import CustomDashboardHeader from "../../../Components/Custom/dashboard/CustomDashboardHeader";
import Styled from "styled-components";
import CustomDashboardTable from "../../../Components/Custom/dashboard/CustomDashboardTable";
import CustomDashboardTargetTable from "../../../Components/Custom/dashboard/CustomDashboardTargetTable";

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


const CustomProductionDashBoard: React.FunctionComponent = () => {
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
            <CustomDashboardHeader title={'PRESS 생산 현황 모니터링'}/>
            <div style={{display: 'flex'}}>
                <div style={{margin: '0 16px 0 48px'}}>
                    <CustomDashboardTable indexList={index} valueList={list} entiretyWidth={'1408px'}
                                          alignList={['left', 'left', 'left', 'right', 'right']}
                                          widthList={['378px', '152px', '378px', '178px', '178px']}/>
                </div>
                <CustomDashboardTargetTable valueList={['100', '90', '80', '50', '90']}/>
            </div>
        </Container>
    )
}


const Container = Styled.div`
  width: 100%;
  height: 100vh;
`


export default CustomProductionDashBoard
