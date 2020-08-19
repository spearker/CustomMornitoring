import React, {useContext, useEffect} from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import OilSupplyStatistics from "../Pages/PM_Statistics/OilSupplyStatistics";
import AbilityStatistics from "../Pages/PM_Statistics/AbilityStatistics";
import AbilityAnalysis from "../Pages/PM_Analysis/AbilityAnalysis";
import ChitRegister from "../Pages/Production/ChitRegister";
import ProductionRegister from "../Pages/Production/ProductionRegister";
import ContractRegister from "../Pages/Marketing/ContractRegister";
import ContractModify from "../Pages/Marketing/ContractModify";
import OrderModify from "../Pages/Marketing/OrderModify";
import OrderRegister from "../Pages/Marketing/OrderRegister";


const JunheeRouters = () => {

    return (
        <div>
            <Switch>
                {/* 생산관리 */}
                <Route exact path="/production/chit/register" component={ChitRegister} />
                <Route exact path="/production/production/register" component={ProductionRegister} />
                {/*영업관리*/}
                <Route exact path="/marketing/contract/register" component={ContractRegister} />
                <Route exact path="/marketing/contract/modify" component={ContractModify} />
                <Route exact path="/marketing/order/register" component={OrderRegister} />
                <Route exact path="/marketing/order/modify" component={OrderModify} />
                {/* pm */}
                <Route exact path="/pm/statistics/oil" component={OilSupplyStatistics} />
                <Route exact path="/pm/statistics/ability" component={AbilityStatistics} />
                <Route exact path="/pm/analysis/ability" component={AbilityAnalysis} />

            </Switch>
        </div>
    );
}

export default JunheeRouters;
