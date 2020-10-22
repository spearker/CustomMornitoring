import React from "react";
import Header from "../../Components/Text/Header";
import KPIBox from "../../Components/Box/KPIBox";

const CostKPIContainer = () => {
    return (
        <div>
            <Header title={'원가지수(C)'}/>
            <KPIBox title={'재공재고 수량 절감률'} yearCompare={'2020년 (작년 대비 재공재고 수량 절감률)'} yearPercent={10}
                    monthCompare={'전월 대비 증감률'} monthPercent={1} quarterCompare={'전분기 대비 증감률'} quarterPercent={3}/>
            <KPIBox title={'재고비용 절감률'} yearCompare={'2020년 (작년 대비 재고비용 절감률)'} yearPercent={10}
                    monthCompare={'전월 대비 증감률'} monthPercent={1} quarterCompare={'전분기 대비 증감률'} quarterPercent={3}/>
        </div>
    )
}

export default CostKPIContainer
