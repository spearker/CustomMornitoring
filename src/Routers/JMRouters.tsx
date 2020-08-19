import React, {useContext, useEffect} from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import MapTest from '../Containers/PM_Monitoring/FactoryPressStatus';
import LoadtoneStatistics from "../Pages/PM_Statistics/LoadtoneStatistics";
import MoldStatistics from "../Pages/PM_Statistics/MoldStatistics";
import DefectiveStatistics from "../Pages/PM_Statistics/DefectiveStatistics";
import ProductToneStatistics from "../Pages/PM_Statistics/ProductToneSatistics";
import DefectiveAnalysis from "../Pages/PM_Analysis/DefectiveAnalysis";
import ScheduleProduction from "../Pages/Production/Schedule";
import WorkProduction from "../Pages/Production/Worker";
import VoucherProduction from "../Pages/Production/Voucher";
import OrderBusiness from "../Pages/Business/Order";
import ShipmentBusiness from "../Pages/Business/Shipment";
//정민님 라우터
const JMRouters = () => {


    return (

        <Switch>
            <Route exact path="/pm/analysis/defective" component={DefectiveAnalysis} />

            <Route exact path="/pm/statistics/loadton" component={LoadtoneStatistics} />
            <Route exact path="/pm/statistics/mold" component={MoldStatistics} />
            <Route exact path="/pm/statistics/defective" component={DefectiveStatistics} />
            <Route exact path="/pm/statistics/product" component={ProductToneStatistics} />

            <Route exact path="/production/schedule/list" component={ScheduleProduction} />
            <Route exact path="/production/work/history" component={WorkProduction} />
            <Route exact path="/production/voucher/list" component={VoucherProduction}/>

            <Route exact path="/business/order/list" component={OrderBusiness}/>
            <Route exact path="/business/shipment/list" component={ShipmentBusiness}/>
        </Switch>
    );
}

export default JMRouters;
