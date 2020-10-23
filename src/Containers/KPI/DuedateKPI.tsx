import React from "react";
import KPIBox from "../../Components/Box/KPIBox";
import Header from "../../Components/Text/Header";

const DuedateKPIContainer = () => {
    return (
        <div>
            <Header title={'납기지수(D)'}/>
            <KPIBox title={'납기 준수율 향상도'} yearCompare={'2020년 (작년 대비 납기 준수율 향상도)'} yearPercent={100}
                    monthCompare={'전월 대비 증감률'} monthPercent={99} quarterCompare={'전분기 대비 증감률'} quarterPercent={100}/>
            <KPIBox title={'수주출하 리드타임 단축률'} yearCompare={'2020년 (작년 대비 수주출하 리드타임 단축률)'} yearPercent={99}
                    monthCompare={'전월 대비 증감률'} monthPercent={100} quarterCompare={'전분기 대비 증감률'} quarterPercent={99}/>
            <KPIBox title={'재고 정확도 향상률'} yearCompare={'2020년 (작년 대비 재고 정확도 향상률)'} yearPercent={100}
                    monthCompare={'전월 대비 증감률'} monthPercent={99} quarterCompare={'전분기 대비 증감률'} quarterPercent={99}/>
        </div>
    )
}

export default DuedateKPIContainer
