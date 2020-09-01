import React from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {MES_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
<<<<<<< Updated upstream:src/Pages/Mold/Current.tsx
import CurrentContainer from "../../Containers/Mold/Current";


const MoldCurrent = () => {
=======
import React from "react";
import MoldRegisterContainer from "../../Containers/Mold/MoldRegister";

const MoldRegister = () => {
>>>>>>> Stashed changes:src/Pages/Mold/MoldRegister.tsx
    return (
        <DashboardWrapContainer index={'mold'}>
            <SubNavigation list={MES_MENU_LIST.mold}/>
            <InnerBodyContainer>
<<<<<<< Updated upstream:src/Pages/Mold/Current.tsx
                <CurrentContainer/>
=======
                <MoldRegisterContainer/>
>>>>>>> Stashed changes:src/Pages/Mold/MoldRegister.tsx
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

<<<<<<< Updated upstream:src/Pages/Mold/Current.tsx
export default MoldCurrent
=======
export default MoldRegister
>>>>>>> Stashed changes:src/Pages/Mold/MoldRegister.tsx
