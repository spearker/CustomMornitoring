import React from "react";
import KPIBox from "../../Components/Box/KPIBox";
import Header from "../../Components/Text/Header";
import TripleKPIBox from "../../Components/Box/TripleKPIBox";

const ProductionKPIContainer = () => {
    return(
        <div>
            <Header title={'생산지수(P)'}/>
            <KPIBox title={'생산품목 증가율'} yearCompare={'2020년 (작년 대비 생산품목 증감율)'} yearPercent={9999} monthCompare={'전월 대비 증감률'} monthPercent={9999} quarterCompare={'전분기 대비 증감률'} quarterPercent={-100}/>
            <KPIBox title={'설비 가동 향상률'} yearCompare={'2020년 (작년 대비 설비 가동 향상률)'} yearPercent={120} monthCompare={'전월 대비 증감률'} monthPercent={15} quarterCompare={'전분기 대비 증감률'} quarterPercent={-20}/>
            <KPIBox title={'제조 리드타임 단축률'} yearCompare={'2020년 (작년 대비 제조 리드타임 단축률)'} yearPercent={60} monthCompare={'전월 대비 증감률'} monthPercent={15} quarterCompare={'전분기 대비 증감률'} quarterPercent={-45}/>
            <KPIBox title={'생산 목표 달성률'} yearCompare={'금일 생산 목표 달성률'} yearPercent={30} monthCompare={"당월 생산 목표 달성률"} monthPercent={44} quarterCompare={"전월 대비 증감"} quarterPercent={-12} />
        </div>
    )
}

export default ProductionKPIContainer
