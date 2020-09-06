import React, {useContext, useEffect} from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import MapTest from '../Containers/PM_Monitoring/FactoryPressStatus';
import LoadtoneStatistics from "../Pages/PM_Statistics/LoadtoneStatistics";
import MoldStatistics from "../Pages/PM_Statistics/MoldStatistics";
import DefectiveStatistics from "../Pages/PM_Statistics/DefectiveStatistics";
import ProductToneStatistics from "../Pages/PM_Statistics/ProductToneSatistics";
import DefectiveAnalysis from "../Pages/PM_Analysis/DefectiveAnalysis";
import WorkProduction from "../Pages/Project/Worker";
import VoucherProduction from "../Pages/Project/Voucher";
import OrderBusiness from "../Pages/Marketing/Order";
import ShipmentBusiness from "../Pages/Marketing/Shipment";
import SegmentList from "../Pages/Process/SegmentList";
import BarCodeList from "../Pages/Barcode/Barcode"
import QualityList from "../Pages/Quality/QualityList";
import StockWip from "../Pages/Stock/Wip";
import StockOutSource from "../Pages/Stock/OutSource";
import StockRawMaterial from "../Pages/Stock/RawMaterial";
import StockFinishMaterial from "../Pages/Stock/FinishMaterial";
import MoldRepair from "../Pages/Mold/Repair";
import MoldCurrent from "../Pages/Mold/Current";
import ScheduleManageProduction from "../Pages/Project/ScheduleManage";
import ScheduleProduction from "../Pages/Project/Schedule";
import OutsourcingCurrent from "../Pages/Outsourcing/Current"
import OutsourcingOrder from "../Pages/Outsourcing/Order"
import OutsourcingContract from "../Pages/Outsourcing/Contract"

//정민님 라우터
const JMRouters = () => {


    return (

        <Switch>
            <Route exact path="/pm/analysis/defective" component={DefectiveAnalysis} />

            <Route exact path="/pm/statistics/loadton" component={LoadtoneStatistics} />
            <Route exact path="/pm/statistics/mold" component={MoldStatistics} />
            <Route exact path="/pm/statistics/defective" component={DefectiveStatistics} />
            <Route exact path="/pm/statistics/product" component={ProductToneStatistics} />

            <Route exact path="/project/schedule/list" component={ScheduleProduction}/>
            <Route exact path="/project/schedulemanage/list" component={ScheduleManageProduction} />
            <Route exact path="/project/work/history" component={WorkProduction} />
            <Route exact path="/project/voucher/list" component={VoucherProduction}/>

            <Route export path="/outsourcing/current/list" component={OutsourcingCurrent} />
            <Route exact path="/outsourcing/order/list" component={OutsourcingOrder} />
            <Route exact path="/outsourcing/contract/list" component={OutsourcingContract} />

            <Route exact path="/marketing/order/list" component={OrderBusiness}/>
            <Route exact path="/marketing/shipment/list" component={ShipmentBusiness}/>

            <Route exact path="/process/segment/list" component={SegmentList} />

            <Route exact path="/barcode/current/list" component={BarCodeList}/>

            <Route exact path="/quality/current/list" component={QualityList}/>

            <Route exact path="/stock/wip/list" component={StockWip}/>
            <Route exact path="/stock/outsource/list" component={StockOutSource}/>
            <Route exact path="/stock/rawmaterial/list" component={StockRawMaterial}/>
            <Route exact path="/stock/finishmaterial/list" component={StockFinishMaterial}/>

            <Route exact path="/mold/current/list" component={MoldCurrent}/>
            <Route exact path="/mold/repair/list" component={MoldRepair}/>
        </Switch>
    );
}

export default JMRouters;
