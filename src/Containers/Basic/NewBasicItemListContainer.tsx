import React from "react";
import Header from "../../Components/Text/Header";
import SmallButtonLink from "../../Components/Button/SmallButtonLink";
import {LIST_INDEX} from "./BasicListContainer";
import ExcelFormBox from "../../Components/Box/ExcelFormBox";

const NewBasicItemListContainer: React.FunctionComponent = () => {
    return (
        <div>
            <div style={{position: 'relative'}}>
                <Header title={'표준 항목 관리'}/>
                <ExcelFormBox title={'품목 관리'} excelName={'품목 관리_20201120.xlxs'}/>
            </div>
        </div>
    )
}

export default NewBasicItemListContainer
