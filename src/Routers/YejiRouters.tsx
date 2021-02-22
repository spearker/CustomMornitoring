import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ProcessList from '../Pages/Process/ProcessList'
import StockList from '../Pages/Stock/StockList'
import NewProductionKPI from '../Pages/NewKPI/NewProductionKPI'
import NewQualityKPI from '../Pages/NewKPI/NewQualityKPI'
import NewCostKPI from '../Pages/NewKPI/NewCostKPI'
import NewDuedateKPI from '../Pages/NewKPI/NewDuedateKPI'
import NewEnergyKPI from '../Pages/NewKPI/NewEnergyKPI'
import NewPowerStatistics from '../Pages/PM_Statistics/NewPowerStatistics'
import PressKeyinList from '../Pages/NewKeyin/PressKeyinList'
import PressKeyinRegister from '../Pages/NewKeyin/PressKeyinRegister'
import LotMonitoringContainer from '../Containers/Custom/PM_Monitoring/LotMonitoringContainer'
import NewBasicBarcode from '../Pages/Basic/NewBasicBarcode'
import NewBasicBarcodeRegister from '../Pages/Old_Basic/NewBasicBarcodeRegister'
import NewBarCodeList from '../Pages/Barcode/NewBarCodeList'
import NewBarcodeRegister from '../Pages/Barcode/NewBarcodeRegister'
// import ProcessList from '../Pages/ProcessManagement/ProcessList';
import NewContractRegister from '../Pages/Outsourcing/NewContractRegister'
import NewOrderRegister from '../Pages/Outsourcing/NewOrderRegister'
import NewOutsourcingOrder from '../Pages/Outsourcing/NewOrder'

const YejiRouters = () => {


  return (

    <Switch>
      {/* <Route exact path="/marketing/shipment/list" component={ShipmentBusiness}/> */}
      <Route exact path="/process/process/list" component={ProcessList}/>
      <Route exact path="/stock/status/list" component={StockList}/>

      {/* 프레스 모니터링 */}
      <Route exact path="/pm/monitoring/lot" component={LotMonitoringContainer}/>

      {/* 프레스 데이터 통계 */}
      <Route exact path="/new/pm/statistics/power" component={NewPowerStatistics}/>

      {/* key-in */}
      <Route exact path="/pm/keyin/list" component={PressKeyinList}/>
      <Route exact path="/pm/keyin/register" component={PressKeyinRegister}/>
      <Route exact path="/pm/keyin/:pk" component={PressKeyinRegister}/>

      {/* 기준정보관리 */}
      <Route exact path="/new/basic/list/barcode" component={NewBasicBarcode}/>
      <Route exact path="/new/basic/barcode/register" component={NewBasicBarcodeRegister}/>

      {/* 외주처 관리 */}
      <Route exact path="/new/outsourcing/contract/register" component={NewContractRegister}/>{/* 수주 */}
      <Route exact path="/new/outsourcing/contract/register/:pk" component={NewContractRegister}/>
      <Route exact path="/new/outsourcing/order/register" component={NewOrderRegister}/>{/* 발주 */}
      <Route exact path="/new/outsourcing/order/register/:pk" component={NewOrderRegister}/>
      <Route exact path="/new/outsourcing/order/list" component={NewOutsourcingOrder}/>

      {/* 바코드 관리 */}
      <Route exact path="/new/barcode/current/list" component={NewBarCodeList}/>
      <Route exact path="/new/barcode/register" component={NewBarcodeRegister}/>
      <Route exact path="/new/barcode/register/:barcode_pk" component={NewBarcodeRegister}/>

      {/* KPI */}
      <Route exact path="/new/kpi/production" component={NewProductionKPI}/>
      <Route exact path="/new/kpi/quality" component={NewQualityKPI}/>
      <Route exact path="/new/kpi/cost" component={NewCostKPI}/>
      <Route exact path="/new/kpi/duedate" component={NewDuedateKPI}/>
      <Route exact path="/new/kpi/energy" component={NewEnergyKPI}/>

    </Switch>
  )
}

export default YejiRouters
