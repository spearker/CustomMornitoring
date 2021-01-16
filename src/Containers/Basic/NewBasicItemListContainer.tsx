import React from "react";
import Header from "../../Components/Text/Header";
import SmallButtonLink from "../../Components/Button/SmallButtonLink";
import {LIST_INDEX} from "../Old_Basic/BasicListContainer";
import ExcelFormBox from "../../Components/Box/ExcelFormBox";
import ExcelCustomBox from "../../Components/Box/ExcelCustomBox";
import autoCustomType from "../../AutoCustomSetting/autoCustomConfig";

const NewBasicItemListContainer: React.FunctionComponent = () => {
    return (
        <div>
            <div style={{position: 'relative'}}>

                <Header title={'표준 항목 관리'}/>
                {autoCustomType() === 'seain_material_trans' ?
                    <ExcelCustomBox title={['원자재, 완제품 관리', '금형 관리']}/>
                    :
                    <ExcelFormBox title={['원자재 관리', '반제품 관리', '부자재 관리', '완제품 관리', '금형 관리']}/>
                }
            </div>
        </div>
    )
}

export default NewBasicItemListContainer
