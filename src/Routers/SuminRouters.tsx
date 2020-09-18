import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MapTest from '../Containers/PM_Monitoring/FactoryPressStatus';
// import Dashboard from '../Pages/PM/Dashboard';

const SuminRouters = () => {


    return (

        <Switch>
            <Route exact path="/map" component={MapTest} />
            {/*<Route exact path="/pm2/dashboard" component={Dashboard} />*/}
        </Switch>

    );
}

export default SuminRouters;
