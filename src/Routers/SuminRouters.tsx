import React, {useContext, useEffect} from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import MapTest from '../Containers/PM_Monitoring/FactoryPressStatus';

const SuminRouters = () => {


    return (

        <Switch>
            <Route exact path="/map" component={MapTest} />
        </Switch>

    );
}

export default SuminRouters;
