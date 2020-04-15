import React, {useContext, useEffect} from 'react';
import { Route, Switch, Router } from 'react-router-dom';
//import {UserDataProvider, UserDataContext} from '../Context/UserData';


// 경로 모음
// ./Pages/Welcome
import Welcome from '../Pages/Welcome/Welcome'
import Login from '../Pages/Welcome/Login'
import Email from '../Pages/Welcome/Email'
import Auth from '../Pages/Welcome/Auth'
import ForgotPw from '../Pages/Welcome/ForgotPw'
import ChangePw from '../Pages/Welcome/ChangePw'
import Signup from '../Pages/Welcome/Signup'
import Complete from '../Pages/Welcome/Complete'

// ./Pages/Dashboard
import Dashboard from '../Pages/Dashboard/Index';

// manage (인사관리)
import AcceptMember from '../Pages/Manage/Accept'
import CompanySetting from '../Pages/Manage/Setting'
import CompanyMembers from '../Pages/Manage/Members'
import UpdateMember from '../Pages/Manage/Update'

// my (마이페이지)
import MyPage from '../Pages/My/MyPage'

// 데이터 등록
import RegisterMachine from '../Pages/Register/Machine';
import RegisterSubMachine from '../Pages/Register/SubMachine';
import RegisterLine from '../Pages/Register/Line';
import RegisterMaterial from '../Pages/Register/Material';
import RegisterDesign from '../Pages/Register/Design'
import RegisterProcess from '../Pages/Register/Process'
import RegisterBarcode from '../Pages/Barcode/ProductRegister'
import RegisterClient from '../Pages/Client/Register'

// 데이터조회
import DesignList from '../Pages/List/Design';
import MachineList from '../Pages/List/Machine';
import SubList from '../Pages/List/SubMachine';
import LineList from '../Pages/List/Line';
import MaterialList from '../Pages/List/Material';
import MaterialStock from '../Pages/Stock/Material';
import ProductStock from '../Pages/Stock/Product';
import ProcessList from '../Pages/List/Process';
import ClientList from '../Pages/Client/List';
import BarcodeList from '../Pages/Barcode/List';
import BarcodeSetting from '../Pages/Barcode/Setting';

// 어드민, 데이터 등록 관련
import SuperRegister from '../Pages/Super/Register';
import SuperList from '../Pages/Super/List';
import RegisterTask from '../Pages/Task/TaskRegister';
import TaskList from '../Pages/Task/TaskList';
import PressMonitoring from '../Pages/Monitoring/Press';
import LoadMonitoring from '../Pages/Monitoring/Load';
import StatusList from '../Pages/List/Status';
import RegisterProduct from '../Pages/Register/Product';
import ProductList from '../Pages/List/Product';
import Charts from '../Pages/Service/Charts';
import ServiceDesk from '../Pages/Service/ServiceDesk';
import Reports from '../Pages/Service/Reports';
import OnlyChrome from '../Pages/Service/OnlyChrome';
import Ranks from '../Pages/Manage/Ranks'
import Teams from '../Pages/Manage/Teams'
import BuyList from '../Pages/Client/Buy';
import SellList from '../Pages/Client/Sell';
import ChangeStockIn from '../Pages/Stock/ChangeIn'
import ChangeStockOut from '../Pages/Stock/ChangeOut'
import RegisterInferior from  '../Pages/Quality/Register';
import OutsourcingList from '../Pages/Outsourcing/List';
import OutsourcingRegister from '../Pages/Outsourcing/Register';
import Order from '../Pages/Outsourcing/Order';
import Contract from '../Pages/Outsourcing/Contract';
import BarcodeProductList from '../Pages/Barcode/ProductList'
import ProductRegister from '../Pages/Barcode/ProductRegister';
import MaintenanceRegister from '../Pages/Maintenance/Register';
import MaintenanceSubMachine from '../Pages/Maintenance/SubmachineRegister';
import MaintenanceMold from '../Pages/Maintenance/MoldRegister';
import MaintenanceMoldList from '../Pages/Maintenance/MoldList';
import MaintenanceMachineList from '../Pages/Maintenance/MachineList';
import MaintenanceSubMachineList from '../Pages/Maintenance/SubmachineList';
import PressRecommend from '../Pages/Process/Press';
import StockList from '../Pages/Stock/List';
import ProductStockList from '../Pages/Stock/Product';
import StockInList from '../Pages/Stock/In';
import StockOutList from '../Pages/Stock/Out'
import DefectiveList from '../Pages/Quality/DefectiveList'
import DefectiveRegister from '../Pages/Quality/DefectiveRegister'
import MaintenanceHistory from '../Pages/Maintenance/History';
import BasicBarcodeList from '../Pages/List/Barcode';
import BasicBarcodeRegister from '../Pages/Register/Barcode';
import StockHistory from '../Pages/Stock/History';

const Routers = () => {

    //const { isLoggedIn } = useContext(UserDataContext);
  
    useEffect(()=>{
      const browse = navigator.userAgent.toLowerCase(); 
      console.log('broswercheck : ' + navigator.userAgent + ' ' + window.location.pathname)
   
        
      if( (browse.indexOf('trident') != -1) || (browse.indexOf("msie") != -1) || browse.indexOf("edge") > -1) {
          if(window.location.pathname !== '/oops')  {
            window.location.href='/oops'
          }
      }
      

    },[])

  return (
    <div>
        <Switch>
            <Route exact path="/oops" component={OnlyChrome} />
            {/* 웰컴 (Welcome) */}
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/email" component={Email} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/complete" component={Complete} />
            <Route exact path="/forgot" component={ForgotPw} />
            <Route exact path="/password" component={ChangePw} />

            {/* 대시보드 & 모니터링 */}
            <Route exact path="/task/register" component={RegisterTask}/>
            <Route exact path="/task/list" component={TaskList}/>
            <Route exact path="/monitoring/press" component={PressMonitoring}/>
            <Route exact path="/monitoring/load" component={LoadMonitoring}/>
            <Route exact path="/status" component={StatusList}/>

            {/* Manage (어드민) */}
            <Route exact path="/manage/accept" component={AcceptMember} />
            <Route exact path="/manage/setting" component={CompanySetting}/>
            <Route exact path="/manage/teams" component={Teams}/>
            <Route exact path="/manage/rank" component={Ranks}/>
            <Route exact path="/manage/members" component={CompanyMembers}/>
            <Route exact path="/manage/members/update" component={UpdateMember}/>

            {/* MyPage (마이페이지) */}
            <Route exact path="/mypage" component={MyPage}/>
            
            {/* 대시보드, 데이터 조회 관련 */}
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/list/design" component={DesignList} />
            <Route exact path="/list/machine" component={MachineList} />
            <Route exact path="/list/submachine" component={SubList} />
            <Route exact path="/list/line" component={LineList} />
            <Route exact path="/list/process" component={ProcessList} />
            <Route exact path="/list/material" component={MaterialList} />
            <Route exact path="/list/client" component={ClientList} />
            <Route exact path="/list/barcode" component={BasicBarcodeList} />
            
            <Route exact path="/list/product" component={ProductList} />
            <Route exact path="/connect/barcode" component={ProductRegister}/>
            <Route exact path="/connect/barcode/update" component={ProductRegister}/>
            <Route exact path="/stock/product" component={ProductStock} />
            <Route exact path="/stock/material" component={MaterialStock} />
            <Route exact path="/client/buy" component={BuyList} />
            <Route exact path="/client/sell" component={SellList} />
            <Route exact path="/client/list" component={ClientList}/> 
            {/* 데이터 수정 관련 - 등록 페이지와 동일한 컴포넌트 사용*/}
            <Route exact path="/update/design" component={RegisterDesign} />
            <Route exact path="/update/machine" component={RegisterMachine} />
            <Route exact path="/update/submachine" component={RegisterSubMachine} />
            <Route exact path="/update/line" component={RegisterLine} />
            <Route exact path="/update/material" component={RegisterMaterial} />
            <Route exact path="/update/product" component={RegisterProduct} />
            <Route exact path="/update/process" component={RegisterProcess}/>
            <Route exact path="/task/update" component={RegisterTask}/>
            <Route exact path="/update/client" component={RegisterClient}/>
            <Route exact path="/update/barcode" component={BasicBarcodeRegister}/>
            <Route exact path="/barcode/setting" component={BarcodeSetting}/>
            <Route exact path="/update/outsourcing" component={OutsourcingRegister}/>
            {/* 데이터 등록 관련 */}
            <Route exact path="/register/material" component={RegisterMaterial} />
            <Route exact path="/register/design" component={RegisterDesign} />
            <Route exact path="/register/product" component={RegisterProduct} />
            <Route exact path="/register/machine" component={RegisterMachine} />
            <Route exact path="/register/submachine" component={RegisterSubMachine} />
            <Route exact path="/register/line" component={RegisterLine} />
            <Route exact path="/register/process" component={RegisterProcess}/>
            <Route exact path="/register/client" component={RegisterClient}/>
            <Route exact path="/register/barcode" component={BasicBarcodeRegister}/>
            <Route exact path="/register/outsourcing" component={OutsourcingRegister}/>
            <Route exact path="/barcode/register" component={RegisterBarcode}/>
            <Route exact path="/stock/history" component={StockHistory}/>
            <Route exact path="/stock/change/in" component={ChangeStockIn}/>
            <Route exact path="/stock/change/out" component={ChangeStockOut}/>
            <Route exact path="/inferior/register" component={RegisterInferior}/>
            {/*기타 서비스 */}
            <Route exact path="/charts" component={Charts}/>
            <Route exact path="/reports" component={Reports}/>
            <Route exact path="/service" component={ServiceDesk}/>

            {/* 슈퍼 어드민*/}
            <Route exact path="/super/register" component={SuperRegister} />
            <Route exact path="/super/list" component={SuperList} />

            <Route exact path="/list/barcode/product" component={BarcodeProductList}/>
            <Route exact path="/maintenance/machine/list" component={MaintenanceMachineList} />
            <Route exact path="/maintenance/submachine/list" component={MaintenanceSubMachineList} />
            <Route exact path="/maintenance/design/list" component={MaintenanceMoldList} />
            <Route exact path="/maintenance/register" component={MaintenanceRegister} />
            <Route exact path="/maintenance/submachine/register" component={MaintenanceSubMachine} />
            <Route exact path="/maintenance/design/register" component={MaintenanceMold} />
            <Route exact path="/maintenance/update" component={MaintenanceRegister} />
            <Route exact path="/maintenance/submachine/update" component={MaintenanceSubMachine} />
            <Route exact path="/maintenance/design/update" component={MaintenanceMold} />
            <Route exact path="/maintenance/list" component={MaintenanceHistory} />

            <Route exact path="/outsourcing/list" component={OutsourcingList}/>
            <Route exact path="/subcontractor/order" component={Order}/>
            <Route exact path="/subcontractor/contract" component={Contract}/>
            <Route exact path="/maintenance/history" component={MaintenanceHistory} />
            <Route exact path="/process/register" component={RegisterProcess} />
            <Route exact path="/process/list" component={ProcessList} />
            <Route exact path="/recommend/press" component={PressRecommend} />
            <Route exact path="/stock/list" component={StockList} />
            <Route exact path="/stock/product" component={ProductStockList} />
            <Route exact path="/stock/in" component={StockInList} />
            <Route exact path="/stock/out" component={StockOutList} />
            <Route exact path="/defective/register" component={DefectiveRegister} />
            <Route exact path="/defective/list" component={DefectiveList} />
          
        </Switch>
    </div>
  );
}

export default Routers;
