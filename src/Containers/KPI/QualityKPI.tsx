import React from "react";
import KPIBox from "../../Components/Box/KPIBox";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";

const QualityKPIContainer = () => {
    return(
        <div>
            <Header title={'품질지수(Q)'}/>
            <KPIBox title={'불량 감소율 [불량률=(불량수량/생산수량)*100]'} yearCompare={'2020년 (전년 대비 불량 감소율)'} yearPercent={45} monthCompare={'전월 대비 증감률'} monthPercent={55} quarterCompare={'전분기 대비 증감률'} quarterPercent={-17}/>
        </div>
    )
}

export default QualityKPIContainer
