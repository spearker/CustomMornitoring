import React, {useContext, useEffect} from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import MapTest from '../Containers/PM_Monitoring/FactoryPressStatus';
import LoadtoneStatistics from "../Pages/PM_Statistics/LoadtoneStatistics";
import MoldStatistics from "../Pages/PM_Statistics/MoldStatistics";
import DefectiveStatistics from "../Pages/PM_Statistics/DefectiveStatistics";
import ProductToneStatistics from "../Pages/PM_Statistics/ProductToneSatistics";
import DefectiveAnalysis from "../Pages/PM_Analysis/DefectiveAnalysis";
import ScheduleProduction from "../Pages/Project/Schedule";
import WorkProduction from "../Pages/Project/Worker";
import VoucherProduction from "../Pages/Project/Voucher";
import OrderBusiness from "../Pages/Marketing/Order";
import ShipmentBusiness from "../Pages/Marketing/Shipment";
//정민님 라우터
const JMRouters = () => {


    return (

        <Switch>
            <Route exact path="/pm/analysis/defective" component={DefectiveAnalysis} />

            <Route exact path="/pm/statistics/loadton" component={LoadtoneStatistics} />
            <Route exact path="/pm/statistics/mold" component={MoldStatistics} />
            <Route exact path="/pm/statistics/defective" component={DefectiveStatistics} />
            <Route exact path="/pm/statistics/product" component={ProductToneStatistics} />

            <Route exact path="/project/schedule/list" component={ScheduleProduction} />
            <Route exact path="/project/work/history" component={WorkProduction} />
            <Route exact path="/project/voucher/list" component={VoucherProduction}/>

            <Route exact path="/marketing/order/list" component={OrderBusiness}/>
            <Route exact path="/marketing/shipment/list" component={ShipmentBusiness}/>
        </Switch>
    );
}

export default JMRouters;
