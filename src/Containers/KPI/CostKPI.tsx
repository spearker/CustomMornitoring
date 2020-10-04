import React from "react";
import Header from "../../Components/Text/Header";
import KPIBox from "../../Components/Box/KPIBox";

const CostKPIContainer = () => {
    return(
        <div>
            <Header title={'원가지수(C)'}/>
            <KPIBox title={'재공재고 수량 절감률 [재공재고 개수=월말에 보유중인 재공재고 개수 기준]'} yearCompare={'2020년 (전년 대비 재공재고 수량 절감률)'} yearPercent={990} monthCompare={'전월 대비 증감률'} monthPercent={450} quarterCompare={'전분기 대비 증감률'} quarterPercent={-15}/>
            <KPIBox title={'재고비용 절감률 [재고비용=월말에 가지고 있는 재고*원가]'} yearCompare={'2020년 (전년 대비 재고비용 절감률)'} yearPercent={150} monthCompare={'전월 대비 증감률'} monthPercent={15} quarterCompare={'전분기 대비 증감률'} quarterPercent={-15}/>
        </div>
    )
}

export default CostKPIContainer
