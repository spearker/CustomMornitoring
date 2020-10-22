import React from "react";
import KPIBox from "../../Components/Box/KPIBox";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";

const QualityKPIContainer = () => {
    return (
        <div>
            <Header title={'품질지수(Q)'}/>
            <KPIBox title={'불량 감소율'} yearCompare={'2020년 (작년 대비 불량 감소율)'} yearPercent={1.5} monthCompare={'전월 대비 증감률'}
                    monthPercent={0.1} quarterCompare={'전분기 대비 증감률'} quarterPercent={0.3}/>
        </div>
    )
}

export default QualityKPIContainer
