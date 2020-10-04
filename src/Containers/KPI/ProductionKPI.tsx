import React from "react";
import KPIBox from "../../Components/Box/KPIBox";
import Header from "../../Components/Text/Header";
import TripleKPIBox from "../../Components/Box/TripleKPIBox";

const ProductionKPIContainer = () => {
    return(
        <div>
            <Header title={'생산지수(P)'}/>
            <KPIBox title={'생산품목 증가율 [(당해년도 생산품목-전년도 생산품목)/(전년도 생산품목*100)]'} yearCompare={'2020년 (전년 대비 생산품목 증감율)'} yearPercent={9999} monthCompare={'전월 대비 증감률'} monthPercent={9999} quarterCompare={'전분기 대비 증감률'} quarterPercent={-100}/>
            <KPIBox title={'설비 가동 향상률 [설비 가동률=(가동시간/비가동시간)*100]'} yearCompare={'2020년 (전년 대비 설비 가동 향상률)'} yearPercent={120} monthCompare={'전월 대비 증감률'} monthPercent={15} quarterCompare={'전분기 대비 증감률'} quarterPercent={-20}/>
            <KPIBox title={'제조 리드타임 단축률 [제조 리드타임=출하일(완제품 창고 입고일)-공정 투입일]'} yearCompare={'2020년 (전년 대비 제조 리드타임 단축률)'} yearPercent={60} monthCompare={'전월 대비 증감률'} monthPercent={15} quarterCompare={'전분기 대비 증감률'} quarterPercent={-45}/>
            <TripleKPIBox title={'생산 목표 달성률 [(생산수량:납기내 생산된 수량/계획 생산 수량:배포된 생산계획 기준)*100]'} yearCompare={'모든 제품 토탈 월 기준 생산 목표 달성률'} yearPercent={30} dayCompare={"전일 대비 증감율"} dayPercent={44} monthCompare={"전월 대비 증감"} monthPercent={-12} quarterCompare={'전분기 대비 증감율'} quarterPercent={-13}/>
        </div>
    )
}

export default ProductionKPIContainer
