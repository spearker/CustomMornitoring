import React from 'react';
import {Route, Switch} from 'react-router-dom';
import OilSupplyStatistics from "../Pages/PM_Statistics/OilSupplyStatistics";
import AbilityStatistics from "../Pages/PM_Statistics/AbilityStatistics";
import AbilityAnalysis from "../Pages/PM_Analysis/AbilityAnalysis";
import ChitRegister from "../Pages/Project/ChitRegister";
import ProductionRegister from "../Pages/Project/ProductionRegister";
import ContractRegister from "../Pages/Marketing/ContractRegister";
import ContractModify from "../Pages/Marketing/ContractModify";
import OrderModify from "../Pages/Marketing/OrderModify";
import OrderRegister from "../Pages/Marketing/OrderRegister";
import BarcodeRegister from "../Pages/Barcode/BarcodeRegister";
import BarcodeModify from "../Pages/Barcode/BarcodeModify";
import ManageStockRegister from "../Pages/ManageStock/ManageStockRegister";
import ProcessDetailRegister from "../Pages/Process/DetailRegister";
import MoldRegister from "../Pages/Mold/MoldRegister";
import MoldRepairRegister from "../Pages/Mold/MoldRepairRegister";
import OutsourcingRegister from "../Pages/Outsourcing/OutsourcingRegister"
import CustomerRegister from "../Pages/Customer/CustomerRegister";
import WorkHistoryRegister from "../Pages/Project/WorkHistoryRegister";
import MapEditer from "../Pages/Super/MapEditer";
import MapListPage from "../Pages/map/MapListPage";
import QualityTestRequest from '../Pages/Quality/QualityTestRequest'


const JunheeRouters = () => {

    return (
        <div>
            <Switch>
                {/* 외주관리 */}
                <Route exact path="/outsourcing/register" component={OutsourcingRegister} />
                <Route exact path="/outsourcing/register/:pk" component={OutsourcingRegister} />
                {/* 생산관리 */}
                <Route exact path="/project/chit/register" component={ChitRegister} />
                <Route exact path="/project/production/register" component={ProductionRegister} />
                <Route exact path="/project/history/register" component={WorkHistoryRegister} />
                {/*영업관리*/}
                <Route exact path="/marketing/contract/register" component={ContractRegister} />
                <Route exact path="/marketing/contract/modify/:pk" component={ContractModify} />
                <Route exact path="/marketing/order/register" component={OrderRegister} />
                <Route exact path="/marketing/order/modify/:pk" component={OrderModify} />
                {/*바코드관리*/}
                <Route exact path="/barcode/register" component={BarcodeRegister} />
                <Route exact path="/barcode/register/:barcode_pk" component={BarcodeRegister} />
                {/*재고 관리*/}
                <Route exact path="/manageStock/register" component={ManageStockRegister} />
                {/*공정 관리*/}
                <Route exact path="/process/detail/register" component={ProcessDetailRegister} />
                {/*/!*금형 관리*!/*/}
                <Route exact path="/mold/register" component={MoldRegister} />
                <Route exact path="/mold/repair/register" component={MoldRepairRegister} />
                {/*거래처관리*/}
                <Route exact path="/customer/register" component={CustomerRegister} />
                <Route exact path="/customer/register/:pk" component={CustomerRegister} />
                {/*품질관리*/}
                <Route exact path="/quality/quality/list" component={QualityTestRequest} />
                {/* pm */}
                <Route exact path="/pm/statistics/oil" component={OilSupplyStatistics} />
                <Route exact path="/pm/statistics/ability" component={AbilityStatistics} />
                <Route exact path="/pm/analysis/ability" component={AbilityAnalysis} />
                {/*어드민*/}
                <Route exact path="/admin/map/list" component={MapListPage} />
                {/*<Route exact path="/company/maps/:id" component={MapList} />*/}
                <Route path="/admin/map/:company" component={MapEditer} />
                <Route path="/map/update/:company/:factory/:type" component={MapEditer} />
            </Switch>
        </div>
    );
}

export default JunheeRouters;
