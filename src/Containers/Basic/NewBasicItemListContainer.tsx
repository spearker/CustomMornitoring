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
                <ExcelFormBox title={['원자재 관리', '반제품 관리', '부자재 관리', '완제품 관리', '금형 관리']}/>
            </div>
        </div>
    )
}

export default NewBasicItemListContainer
