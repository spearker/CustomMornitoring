import React, {useContext, useEffect} from 'react';
import { Route, Switch, Router } from 'react-router-dom';
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


const JunheeRouters = () => {

    return (
        <div>
            <Switch>
                {/* 외주관리 */}
                <Route exact path="/outsourcing/register" component={OutsourcingRegister} />
                {/* 생산관리 */}
                <Route exact path="/project/chit/register" component={ChitRegister} />
                <Route exact path="/project/production/register" component={ProductionRegister} />
                {/*영업관리*/}
                <Route exact path="/marketing/contract/register" component={ContractRegister} />
                <Route exact path="/marketing/contract/modify" component={ContractModify} />
                <Route exact path="/marketing/order/register" component={OrderRegister} />
                <Route exact path="/marketing/order/modify" component={OrderModify} />
                {/*바코드관리*/}
                <Route exact path="/barcode/register" component={BarcodeRegister} />
                <Route exact path="/barcode/modify" component={BarcodeModify} />
                {/*재고 관리*/}
                <Route exact path="/manageStock/register" component={ManageStockRegister} />
                {/*공정 관리*/}
                <Route exact path="/process/detail/register" component={ProcessDetailRegister} />
                {/*/!*금형 관리*!/*/}
                {/*<Route exact path="/mold/register" component={MoldRegister} />*/}
                {/*<Route exact path="/mold/repair/register" component={MoldRepairRegister} />*/}
                {/* pm */}
                <Route exact path="/pm/statistics/oil" component={OilSupplyStatistics} />
                <Route exact path="/pm/statistics/ability" component={AbilityStatistics} />
                <Route exact path="/pm/analysis/ability" component={AbilityAnalysis} />
            </Switch>
        </div>
    );
}

export default JunheeRouters;
