import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ProcessList from '../Pages/Process/ProcessList'
import StockList from '../Pages/Stock/StockList'
import QualityTestRequest from '../Pages/Quality/QualityTestRequest'
import QualityTestRequestInspector from '../Pages/Quality/QualityTestRequestInspector'
import QualityDetailList from '../Pages/Quality/QualityDetailList'
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
// import ProcessList from '../Pages/ProcessManagement/ProcessList';

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
