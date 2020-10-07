import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProcessList from '../Pages/Process/ProcessList';
import StockList from '../Pages/Stock/StockList';
import QualityTestRequest from "../Pages/Quality/QualityTestRequest";
import QualityTestRequestInspector from "../Pages/Quality/QualityTestRequestInspector";
// import ProcessList from '../Pages/ProcessManagement/ProcessList';

const  YejiRouters = () => {


    return (

        <Switch>
            {/* <Route exact path="/marketing/shipment/list" component={ShipmentBusiness}/> */}
            <Route exact path="/process/process/list" component={ProcessList}/>
            <Route exact path="/stock/status/list" component={StockList}/>
            
            {/* 품질관리 */}
            <Route exact path="/quality/test/request/:pk" component={QualityTestRequest}/>
            <Route exact path="/quality/test/detail/:type/:pk" component={QualityTestRequestInspector}/>
        </Switch>
    );
}

export default YejiRouters;
