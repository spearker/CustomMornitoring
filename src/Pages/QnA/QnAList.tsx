import React from 'react'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import NewBarcodeListContainer from '../../Containers/Barcode/NewBarcode'
import QnAListContainer from '../../Containers/QnA/QnAList'

const QnAList = () => {
  return (
    <DashboardWrapContainer index={'barcode'}>

      <InnerBodyContainer>
        <QnAListContainer/>
      </InnerBodyContainer>
    </DashboardWrapContainer>
  )
}

export default QnAList
