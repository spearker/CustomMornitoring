import React, {useContext, useEffect} from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import MapTest from '../Containers/PM_Monitoring/FactoryPressStatus';
import LoadtoneStatistics from "../Pages/PM_Statistics/LoadtoneStatistics";

//정민님 라우터
const JMRouters = () => {


    return (

        <Switch>
            <Route exact path="/pm/statistics/loadton" component={LoadtoneStatistics} />
        </Switch>

    );
}

export default JMRouters;
