import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoadtoneStatistics from "../Pages/PM_Statistics/LoadtoneStatistics";
import MoldStatistics from "../Pages/PM_Statistics/MoldStatistics";
import DefectiveStatistics from "../Pages/PM_Statistics/DefectiveStatistics";
import ProductToneStatistics from "../Pages/PM_Statistics/ProductToneSatistics";
import DefectiveAnalysis from "../Pages/PM_Analysis/DefectiveAnalysis";
import WorkProduction from "../Pages/Project/Worker";
import VoucherProduction from "../Pages/Project/Voucher";
import OrderBusiness from "../Pages/Marketing/Order";
import ShipmentBusiness from "../Pages/Marketing/Shipment";
import SegmentList from "../Pages/Process/SegmentList";
import BarCodeList from "../Pages/Barcode/Barcode"
import QualityList from "../Pages/Quality/QualityList";
import StockWip from "../Pages/Stock/Wip";
import StockOutSource from "../Pages/Stock/OutSource";
import StockRawMaterial from "../Pages/Stock/RawMaterial";
import StockFinishMaterial from "../Pages/Stock/FinishMaterial";
import MoldRepair from "../Pages/Mold/Repair";
import MoldCurrent from "../Pages/Mold/Current";
import ScheduleManageProduction from "../Pages/Project/ScheduleManage";
import ScheduleProduction from "../Pages/Project/Schedule";
import OutsourcingCurrent from "../Pages/Outsourcing/Current"
import OutsourcingOrder from "../Pages/Outsourcing/Order"
import OutsourcingContract from "../Pages/Outsourcing/Contract"
import CurrentCustomer from "../Pages/Customer/Customer";
import OilMaintenance from "../Pages/PM_Maintenance/OilMaintenance";
import DefectiveProject from "../Pages/Project/Defective";
import DefectiveRegister from "../Pages/Project/DefectiveRegister";
import OutsourcingRegister from "../Pages/Outsourcing/OutsourcingRegister";
import OrderRegister from "../Pages/Outsourcing/OrderRegister";
import ContractRegister from "../Pages/Outsourcing/ContractRegister";
import MoldCreate from "../Pages/Mold/MoldCreate";
import MoldCreateRegister from "../Pages/Mold/MoldCreateRegister";
import BasicPartsRegister from "../Pages/Basic/BasicPartsRegister";
import StockParts from "../Pages/Stock/Parts";
import WarehousingRegister from "../Pages/Stock/WarehousingRegister";
import ReleaseRegister from "../Pages/Stock/ReleaseRegister";
import CostKPI from "../Pages/Kpi/CostKPI";
import DuedateKPI from "../Pages/Kpi/DuedateKPI";
import EnergyKPI from "../Pages/Kpi/EnergyKPI";
import QualityKPI from "../Pages/Kpi/QualityKPI";
import ProductionKPI from "../Pages/Kpi/ProductionKPI";
import MoldMangeCreate from "../Pages/Mold/MoldManageCreate";
import QualityTestRequest from "../Pages/Quality/QualityTestRequest";
import QualityTestList from "../Pages/Quality/QualityTestList";
import QualityTestComplete from "../Pages/Quality/QualityTestComplete";
import QualityTestListWorker from "../Pages/Quality/QualityTestListWorker";
import QualityTestCompleteWorker from "../Pages/Quality/QualityTestCompleteWorker";
import QualityDetailList from "../Pages/Quality/QualityDetailList";
import QualityTestRequestInspector from "../Pages/Quality/QualityTestRequestInspector";
import LoadtonDashBoard from "../Pages/jeil1981/LoadtonDashBoard";
import MainDashboard from "../Pages/jeil1981/MainDashBoard";
import CapitalDashBoard from "../Pages/jeil1981/CapitalDashBoard";
import MoldManageList from "../Pages/Mold/MoldManageList";
import NewBasicList from "../Pages/Basic/NewBasicListContainer";
import TodayVoucherProduction from "../Pages/Project/TodayVoucher";
import MoldCreateCompleteList from "../Pages/Mold/MoldCreateCompleteList";
import NewStockList from "../Pages/Stock/NewStockList";
import NewRawMaterial from "../Pages/Stock/NewRawMaterial";
import NewWip from "../Pages/Stock/NewWip";
import NewFinishedMaterial from "../Pages/Stock/NewFinishedMaterial";
import NewOutsource from "../Pages/Stock/NewOutsource";
import NewBasicMaterialRegister from "../Containers/Basic/NewBasicMaterialContainer";
import NewBasicItemList from "../Pages/Basic/NewBasicItemList";
import MoldRepairCompleteList from "../Pages/Mold/MoldRepairCompleteList";
import CreateMember from "../Pages/Manage/CreateMember";
import MemberList from "../Pages/Manage/MemberList";

//정민님 라우터
const JMRouters = () => {


    return (

        <Switch>
            {/*품목 기본정보*/}
            <Route exact path="/jeil/main" component={MainDashboard}/>
            <Route exact path="/jeil/loadton" component={LoadtonDashBoard}/>
            <Route exact path="/jeil/capacity" component={CapitalDashBoard}/>


            <Route exact path="/basic/parts/register" component={BasicPartsRegister}/>

            <Route exact path="/pm/analysis/defective" component={DefectiveAnalysis}/>

            <Route exact path="/pm/maintenance/oil" component={OilMaintenance}/>

            <Route exact path="/pm/statistics/loadton" component={LoadtoneStatistics}/>
            <Route exact path="/pm/statistics/mold" component={MoldStatistics}/>
            <Route exact path="/pm/statistics/defective" component={DefectiveStatistics}/>
            <Route exact path="/pm/statistics/product" component={ProductToneStatistics}/>
            {/*인사 관리*/}
            <Route exact path="/manage/member/register" component={CreateMember}/>
            <Route exact path="/manage/member/list" component={MemberList}/>

            <Route exact path="/project/schedule/list" component={ScheduleProduction}/>
            <Route exact path="/project/schedulemanage/list" component={ScheduleManageProduction}/>
            <Route exact path="/project/work/history" component={WorkProduction}/>
            <Route exact path="/project/work/history/:pk" component={WorkProduction}/>
            <Route exact path="/project/voucher/today/list" component={TodayVoucherProduction}/>
            <Route exact path="/project/voucher/list" component={VoucherProduction}/>
            <Route exact path="/project/voucher/list/:pk" component={VoucherProduction}/>
            <Route exact path="/project/defective/list" component={DefectiveProject}/>
            <Route exact path="/project/defective/register" component={DefectiveRegister}/>
            <Route exact path="/project/defective/register/:pk" component={DefectiveRegister}/>

            <Route exact path="/customer/current/list" component={CurrentCustomer}/>

            <Route exact path="/outsourcing/current/list" component={OutsourcingCurrent}/>
            <Route exact path="/outsourcing/order/list" component={OutsourcingOrder}/>
            <Route exact path="/outsourcing/order/register" component={OrderRegister}/>
            <Route exact path="/outsourcing/order/register/:pk" component={OrderRegister}/>
            <Route exact path="/outsourcing/contract/list" component={OutsourcingContract}/>
            <Route exact path="/outsourcing/contract/register" component={ContractRegister}/>
            <Route exact path="/outsourcing/contract/register/:pk" component={ContractRegister}/>

            <Route exact path="/marketing/order/list" component={OrderBusiness}/>
            <Route exact path="/marketing/shipment/list" component={ShipmentBusiness}/>

            <Route exact path="/process/segment/list" component={SegmentList}/>

            <Route exact path="/barcode/current/list" component={BarCodeList}/>

            <Route exact path="/quality/test/request" component={QualityTestRequest}/>
            <Route exact path="/quality/test/list" component={QualityTestList}/>
            <Route exact path="/quality/test/detail" component={QualityTestRequestInspector}/>
            <Route exact path="/quality/test/list/worker" component={QualityTestListWorker}/>
            <Route exact path="/quality/test/complete" component={QualityTestComplete}/>
            <Route exact path="/quality/test/complete/worker" component={QualityTestCompleteWorker}/>
            <Route exact path="/quality/current/list" component={QualityList}/>
            <Route exact path="/quality/current/detail" component={QualityDetailList}/>

            {/*신규 재고 관리*/}
            <Route exact path="/new/stock/status/list" component={NewStockList}/>
            <Route exact path="/new/stock/rawmaterial/list" component={NewRawMaterial}/>
            <Route exact path="/new/stock/wip/list" component={NewWip}/>
            <Route exact path="/new/stock/finishmaterial/list" component={NewFinishedMaterial}/>
            <Route exact path="/new/stock/outsource/list" component={NewOutsource}/>

            {/*현재 재고 관리*/}
            <Route exact path="/stock/wip/list" component={StockWip}/>
            <Route exact path="/stock/outsource/list" component={StockOutSource}/>
            <Route exact path="/stock/rawmaterial/list" component={StockRawMaterial}/>
            <Route exact path="/stock/finishmaterial/list" component={StockFinishMaterial}/>
            <Route exact path="/stock/parts/list" component={StockParts}/>
            <Route exact path="/stock/warehousing/register/:pk/:name" component={WarehousingRegister}/>
            <Route exact path="/stock/release/register/:pk/:name" component={ReleaseRegister}/>
            <Route exact path="/stock/warehousing/register/:pk/:name/:parts" component={WarehousingRegister}/>
            <Route exact path="/stock/release/register/:pk/:name/:parts" component={ReleaseRegister}/>

            <Route exact path="/mold/manage/register" component={MoldMangeCreate}/>
            <Route exact path="/mold/manage/list" component={MoldManageList}/>
            <Route exact path="/mold/create/register" component={MoldCreateRegister}/>
            <Route exact path="/mold/create/register/:pk" component={MoldCreateRegister}/>
            <Route exact path="/mold/create/list" component={MoldCreate}/>
            <Route exact path="/mold/create/complete/list" component={MoldCreateCompleteList}/>
            <Route exact path="/mold/repair/list" component={MoldRepair}/>
            <Route exact path="/mold/repair/complete/list" component={MoldRepairCompleteList}/>

            <Route exact path="/kpi/production" component={ProductionKPI}/>
            <Route exact path="/kpi/quality" component={QualityKPI}/>
            <Route exact path="/kpi/cost" component={CostKPI}/>
            <Route exact path="/kpi/duedate" component={DuedateKPI}/>
            <Route exact path="/kpi/energy" component={EnergyKPI}/>
        </Switch>
    );
}

export default JMRouters;
