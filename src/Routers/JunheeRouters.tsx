import React, {useContext, useEffect} from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import OilSupplyStatistics from "../Pages/PM_Statistics/OilSupplyStatistics";
import AbilityStatistics from "../Pages/PM_Statistics/AbilityStatistics";


const JunheeRouters = () => {


    return (
        <div>
            <Switch>
                <Route exact path="/pm/statistics/oil" component={OilSupplyStatistics} />
                <Route exact path="/pm/statistics/ability" component={AbilityStatistics} />
                <Route exact path="/pm/analysis/ability" component={AbilityStatistics} />
            </Switch>
        </div>
    );
}

export default JunheeRouters;
