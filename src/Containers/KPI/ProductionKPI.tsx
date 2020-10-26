import React from "react";
import KPIBox from "../../Components/Box/KPIBox";
import Header from "../../Components/Text/Header";
import TripleKPIBox from "../../Components/Box/TripleKPIBox";

const ProductionKPIContainer = () => {
    return (
        <div>
            <Header title={'생산지수(P)'}/>
            <KPIBox title={'생산품목 증가율'} yearCompare={'2020년 (작년 대비 생산품목 증감율)'} yearPercent={20}
                    monthCompare={'전월 대비 증감률'} monthPercent={3} quarterCompare={'전분기 대비 증감률'} quarterPercent={6}/>
            <KPIBox title={'설비 가동 향상률'} yearCompare={'2020년 (작년 대비 설비 가동 향상률)'} yearPercent={10}
                    monthCompare={'전월 대비 증감률'} monthPercent={1} quarterCompare={'전분기 대비 증감률'} quarterPercent={2}/>
            <KPIBox title={'제조 리드타임 단축률'} yearCompare={'2020년 (작년 대비 제조 리드타임 단축률)'} yearPercent={1}
                    monthCompare={'전월 대비 증감률'} monthPercent={0} quarterCompare={'전분기 대비 증감률'} quarterPercent={0}/>
            <KPIBox title={'생산 목표 달성률'} yearCompare={'금일 생산 목표 달성률'} yearPercent={95} monthCompare={"당월 생산 목표 달성률"}
                    monthPercent={94} quarterCompare={"전월 대비 증감"} quarterPercent={96}/>
        </div>
    )
}

export default ProductionKPIContainer
