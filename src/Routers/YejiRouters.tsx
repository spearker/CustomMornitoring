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
import ProcessList from '../Pages/Process/ProcessList';
import StockList from '../Pages/Stock/StockList';
// import ProcessList from '../Pages/ProcessManagement/ProcessList';

const  YejiRouters = () => {


    return (

        <Switch>
            {/* <Route exact path="/marketing/shipment/list" component={ShipmentBusiness}/> */}
            <Route exact path="/process/process/list" component={ProcessList}/>
            <Route exact path="/stock/status/list" component={StockList}/>
        </Switch>
    );
}

export default YejiRouters;
