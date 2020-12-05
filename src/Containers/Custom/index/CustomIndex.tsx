import React, {useCallback, useEffect, useState} from 'react'
import DashboardWrapContainer from '../../../Containers/DashboardWrapContainer'
import 'moment/locale/ko'
import InnerBodyContainer from '../../../Containers/InnerBodyContainer'
import CustomDashboardHeader from "../../../Components/Custom/dashboard/CustomDashboardHeader";
import CustomDashboardTable from "../../../Components/Custom/dashboard/CustomDashboardTable";
import CustomDashboardTargetTable from "../../../Components/Custom/dashboard/CustomDashboardTargetTable";
import OptimizedHeaderBox from "../../../Components/Box/OptimizedHeaderBox";


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

// 대시보드 메인 페이지
const NewDashboard = () => {
    const [index, setIndex] = useState({model: '모델'})
    const [list, setList] = useState<any[]>([])

    const indexList = {
        production: {
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
        <DashboardWrapContainer>
            <InnerBodyContainer>
                <div style={{display: 'flex'}}>
                    <OptimizedHeaderBox title={'PRESS 생산 현황 모니터링'}/>
                    <CustomDashboardTable indexList={index} valueList={list} entiretyWidth={'1108px'}
                                          alignList={['left', 'left', 'right', 'right']}
                                          widthList={['152px', '378px', '178px', '178px']}/>
                    <CustomDashboardTargetTable valueList={['100', '90', '80', '50', '90']}/>
                </div>
            </InnerBodyContainer>
        </DashboardWrapContainer>

    )
}

export default NewDashboard
