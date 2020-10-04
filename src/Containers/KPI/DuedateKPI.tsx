import React from "react";
import KPIBox from "../../Components/Box/KPIBox";
import Header from "../../Components/Text/Header";

const DuedateKPIContainer = () => {
    return(
        <div>
            <Header title={'납기지수(D)'}/>
            <KPIBox title={'납기 준수율 향상도 [납기 준수율=(납기 준수 건수/총 납품 건수)*100]'} yearCompare={'2020년 (전년 대비 납기 준수율 향상도)'} yearPercent={150} monthCompare={'전월 대비 증감률'} monthPercent={120} quarterCompare={'전분기 대비 증감률'} quarterPercent={-10}/>
            <KPIBox title={'수주출하 리드타임 단축률 [수주출하=출하일-수주일]'} yearCompare={'2020년 (전년 대비 수주출하 리드타임 단축률)'} yearPercent={10} monthCompare={'전월 대비 증감률'} monthPercent={333} quarterCompare={'전분기 대비 증감률'} quarterPercent={-12}/>
            <KPIBox title={'재고 정확도 향상률 [재고 정확도=(오류수정 개수/전산상 재고 수량)*100]'} yearCompare={'2020년 (전년 대비 재고 정확도 향상률)'} yearPercent={450} monthCompare={'전월 대비 증감률'} monthPercent={90} quarterCompare={'전분기 대비 증감률'} quarterPercent={-30}/>
        </div>
    )
}

export default DuedateKPIContainer
