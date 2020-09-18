import React from 'react';
import {Route, Switch} from 'react-router-dom';
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
