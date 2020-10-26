import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import React from "react";
import BarcodeRegisterContainer from "../../Containers/Barcode/BarcodeRegisterContainter";

const BarcodeRegister = ({ match }: any) => {
  return (
      <DashboardWrapContainer index={'barcode'}>
        <InnerBodyContainer>
          <BarcodeRegisterContainer match={match}/>
        </InnerBodyContainer>
      </DashboardWrapContainer>
  )
}

export default BarcodeRegister
