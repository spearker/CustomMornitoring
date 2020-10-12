import React from "react";
import Header from "../../Components/Text/Header";
import TripleKPIBox from "../../Components/Box/TripleKPIBox";

const EnergyKPIContainer = () => {
    return(
        <div>
            <Header title={'에너지지수(E)'}/>
            <TripleKPIBox title={'전기에너지 절감률'} yearCompare={'2020년 (작년 대비 전기에너지 절감률)'} yearPercent={120} dayCompare={"전일 대비 증감율"} dayPercent={20} monthCompare={"전월 대비 증감"} monthPercent={-10} quarterCompare={'전분기 대비 증감율'} quarterPercent={-30}/>
        </div>
    )
}

export default EnergyKPIContainer
