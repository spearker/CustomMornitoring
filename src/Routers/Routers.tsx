import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
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

// manage (인사관리)
import AcceptMember from '../Pages/Old_Manage/Accept'
import CompanySetting from '../Pages/Old_Manage/Setting'
import CompanyMembers from '../Pages/Old_Manage/Members'
import UpdateMember from '../Pages/Old_Manage/Update'

// my (마이페이지)
import MyPage from '../Pages/My/MyPage'

// 데이터 등록
import RegisterMachine from '../Pages/Register/Machine'
import RegisterSubMachine from '../Pages/Register/SubMachine'
import RegisterLine from '../Pages/Register/Line'
import RegisterMaterial from '../Pages/Register/Material'
import RegisterDesign from '../Pages/Register/Design'
import RegisterProcess from '../Pages/Register/Process'
import RegisterClient from '../Pages/Client/Register'

// 데이터조회
import DesignList from '../Pages/Old_List/Design'
import MachineList from '../Pages/Old_List/Machine'
import SubList from '../Pages/Old_List/SubMachine'
import LineList from '../Pages/Old_List/Line'
import MaterialList from '../Pages/Old_List/Material'
import MaterialStock from '../Pages/Stock/Old_Material'
import ProductStock from '../Pages/Stock/Old_Product'
import ProductStockList from '../Pages/Stock/Old_Product'
import ProcessList from '../Pages/Old_List/Process'
import ClientList from '../Pages/Client/List'
import BarcodeSetting from '../Pages/Barcode/Old_Setting'

// 어드민, 데이터 등록 관련
import SuperRegister from '../Pages/Super/Register'
import SuperList from '../Pages/Super/List'
import RegisterTask from '../Pages/Task/TaskRegister'
import TaskList from '../Pages/Task/TaskList'
import PressMonitoring from '../Pages/PM_Monitoring/Press'

import StatusList from '../Pages/Old_List/Status'
import RegisterProduct from '../Pages/Register/Product'
import ProductList from '../Pages/Old_List/Product'
import Charts from '../Pages/Service/Charts'
import ServiceDesk from '../Pages/Service/ServiceDesk'
import Reports from '../Pages/Service/Reports'
import OnlyChrome from '../Pages/Service/OnlyChrome'
import Ranks from '../Pages/Old_Manage/Ranks'
import Teams from '../Pages/Old_Manage/Teams'
import BuyList from '../Pages/Client/Buy'
import SellList from '../Pages/Client/Sell'
import ChangeStockIn from '../Pages/Stock/Old_ChangeIn'
import ChangeStockOut from '../Pages/Stock/Old_ChangeOut'
import RegisterInferior from '../Pages/Quality/Register'
/*
import OutsourcingList from '../Pages/Outsourcing/List';
import OutsourcingRegister from '../Pages/Outsourcing/Register';
import Order from '../Pages/Outsourcing/Order';
import Contract from '../Pages/Outsourcing/Contract';
*/
//import MaintenanceRegister from '../Pages/Maintenance/Register';
import StockView from '../Pages/Stock/Old_View'

import PressRecommend from '../Pages/Process/Press'
import StockList from '../Pages/Stock/Old_List'
import StockInList from '../Pages/Stock/Old_In'
import StockOutList from '../Pages/Stock/Old_Out'
import Old_DefectiveList from '../Pages/Quality/Old_DefectiveList'
import DefectiveRegister from '../Pages/Quality/DefectiveRegister'
import MaintenanceHistory from '../Pages/Maintenance/MaintenanceHistory'

import BasicBarcodeList from '../Pages/Old_List/Barcode'
import BasicBarcodeRegister from '../Pages/Old_Basic/BasicBarcodeRegister'
import StockHistory from '../Pages/Stock/Old_History'
import PressStatistics from '../Pages/PM_Statistics/PressStatistics'
import CmsMonitoring from '../Pages/PM_Monitoring/CMS'
import FullMonitoring from '../Pages/PM_Monitoring/Full'
import CmsStatistics from '../Pages/PM_Monitoring/Statistics'
import LoadtonMonitoring from '../Pages/PM_Monitoring/LoadTon'
import VibrationMonitoring from '../Pages/Monitoring/Vibration'

import InputKeyinPress from '../Pages/KeyinInput/press'
import InputKeyinMold from '../Pages/KeyinInput/mold'
import InputKeyinMilling from '../Pages/KeyinInput/milling'
import InputKeyinTab from '../Pages/KeyinInput/tab'
import InputKeyinSunban from '../Pages/KeyinInput/sunban'
import InputKeyinWelding from '../Pages/KeyinInput/welding'
import InputKeyinMaterial from '../Pages/KeyinInput/material'
import ListKeyinPress from '../Pages/KeyinList/press'
import ListKeyinMaterial from '../Pages/KeyinList/material'
import ListKeyinWelding from '../Pages/KeyinList/welding'
import ListKeyinMold from '../Pages/KeyinList/mold'
import ListKeyinMilling from '../Pages/KeyinList/milling'
import ListKeyinSunban from '../Pages/KeyinList/sunban'
import ListKeyinTab from '../Pages/KeyinList/tab'
import SetKeyinPress from '../Pages/KeyinSet/press'
import SetKeyinMaterial from '../Pages/KeyinSet/material'
import SetKeyinWelding from '../Pages/KeyinSet/welding'
import SetKeyinSunban from '../Pages/KeyinSet/sunban'
import SetKeyinMilling from '../Pages/KeyinSet/milling'
import SetKeyinMold from '../Pages/KeyinSet/mold'
import SetKeyinTab from '../Pages/KeyinSet/tab'
import MotorRotationMaintenance from '../Pages/Maintenance/motorRotation'
import ErrorCodeMaintenance from '../Pages/Maintenance/errorcode'
import SearchMaintenance from '../Pages/Maintenance/search'
import MaintenanceList from '../Pages/Maintenance/list'
import LeadTimeAnalysis from '../Pages/Statistics/LeadTimeAnalysis'
import MachineMaintenance from '../Pages/PM_Maintenance/MachineMaintenance'
import SubmachineMaintenance from '../Pages/Maintenance/submachine'
import MoldMaintenance from '../Pages/PM_Maintenance/mold'
import ReadyTimeStatistics from '../Pages/PM_Analysis/ReadyTimeStatistics'
import QdcTimeStatistics from '../Pages/Statistics/QdcTimeStatistics'
import OptimalSPMStatistics from '../Pages/Statistics/OptimalSPMStatistics'
import FactoryLossSatistics from '../Pages/Statistics/FactoryLossStiatistics'
import FactoryEnvironmentalAnalysis from '../Pages/Statistics/FactoryEnvironmentalAnalysis'
import Comingsoon from '../Pages/Common/ComingSoon'
import BasicDocumentRegister from '../Pages/Old_Basic/BasicDocumentRegister'
import BasicStandardRegister from '../Pages/Old_Basic/BasicStandardRegister'
import BasicMachineRegister from '../Pages/Basic/BasicMachineRegister'
import BasicFactoryRegister from '../Pages/Basic/BasicFactoryRegister'
import BasicSubdividedRegister from '../Pages/Old_Basic/BasicSubdividedRegister'
import BasicMoldRegister from '../Pages/Basic/BasicMoldRegister'
import BasicDeviceRegister from '../Pages/Old_Basic/BasicDeviceRegister'
import Old_OutsourcingCompanyRegister from '../Pages/Outsourcing/Old_OutsourcingCompanyRegister'
import ReadyTimeStatics from '../Pages/PM_Statistics/ReadyTimeStatics'

import OvertonMaintenance from '../Pages/Maintenance/Overton'
import ClutchMaintenance from '../Pages/Maintenance/Clutch'
import CapacityStatistics from '../Pages/PM_Statistics/CapacityStatistics'
import PowerStatistics from '../Pages/PM_Statistics/PowerStatistics'
import ErrorStatistics from '../Pages/PM_Statistics/ErrorStatistics'
import ProcessRegister from '../Pages/Process/Register'
import CustomLoadtonChartContainer from '../Containers/Custom/dashboard/CustomLoadtonChartContainer'
import CustomDashboardIndex from '../Containers/Custom/dashboard/CustomDashboardIndex'
import CustomErrorLogDashBoard from '../Containers/Custom/dashboard/CustomErrorLogDashBoard'

import CustomRotateDashboard from '../Containers/Custom/dashboard/CustomRotateDashboard'
import CustomProductionDashBoard from '../Containers/Custom/dashboard/CustomProductionDashboard'
import NewBasicItemList from '../Pages/Basic/NewBasicItemList'
import NewBasicMaterialRegister from '../Containers/Basic/NewBasicMaterialContainer'
import NewDashboard from '../Containers/Custom/index/CustomIndex'
import BasicFactory from '../Pages/Basic/BasicFactory'
import BasicSubdivided from '../Pages/Basic/BasicSubdivided'
import BasicMachine from '../Pages/Basic/BasicMachine'
import BasicDevice from '../Pages/Basic/BasicDevice'
import BasicMaterial from '../Pages/Basic/BasicMaterial'
import BasicMold from '../Pages/Basic/BasicMold'
import BasicParts from '../Pages/Basic/BasicParts'
import BasicBarcode from '../Pages/Basic/BasicBarcode'
import PMV2DashboardPressContainer from '../Containers/PM/V2/dashboard/PMV2DashboardPressContainer'


const Routers = () => {

  //const { isLoggedIn } = useContext(UserDataContext);

  useEffect(() => {
    const browse = navigator.userAgent.toLowerCase()


    if ((browse.indexOf('trident') != -1) || (browse.indexOf('msie') != -1) || browse.indexOf('edge') > -1) {
      if (window.location.pathname !== '/oops') {
        window.location.href = '/oops'
      }
    }


  }, [])

  return (
    <div>
      <Switch>


        {/* 0.0 인트로 */}
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/email" component={Email}/>
        <Route exact path="/auth" component={Auth}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/complete" component={Complete}/>
        <Route exact path="/forgot" component={ForgotPw}/>
        <Route exact path="/password" component={ChangePw}/>
        <Route exact path="/oops" component={OnlyChrome}/>


        {/* 1.0 홈 */}
        <Route exact path="/dashboard" component={NewDashboard}/>

        {/* 2.0 기준정보관리 */}

        <Route exact path="/basic/list/factory" component={BasicFactory}/>
        <Route exact path="/basic/list/subdivided" component={BasicSubdivided}/>
        <Route exact path="/basic/list/machine" component={BasicMachine}/>
        <Route exact path="/basic/list/device" component={BasicDevice}/>
        <Route exact path="/basic/list/material" component={BasicMaterial}/>
        <Route exact path="/basic/list/mold" component={BasicMold}/>
        <Route exact path="/basic/list/parts" component={BasicParts}/>
        <Route exact path="/basic/list/barcode" component={BasicBarcode}/>

        <Route exact path="/basic/standard/list/item" component={NewBasicItemList}/>

        <Route exact path="/basic/item/register" component={BasicStandardRegister}/>

        <Route exact path="/basic/document/register" component={BasicDocumentRegister}/>

        <Route exact path="/basic/machine/register" component={BasicMachineRegister}/>
        <Route exact path="/basic/factory/register" component={BasicFactoryRegister}/>
        <Route exact path="/basic/subdivided/register" component={BasicSubdividedRegister}/>
        <Route exact path="/basic/mold/register" component={BasicMoldRegister}/>
        <Route exact path="/basic/device/register" component={BasicDeviceRegister}/>
        <Route exact path="/basic/material/register" component={NewBasicMaterialRegister}/>
        <Route exact path="/basic/barcode/register" component={BasicBarcodeRegister}/>

        {/* 외주정보 관리 */}
        <Route exact path="/manage/" component={BasicDeviceRegister}/>
        <Route exact path="/outsourcing/company/register" component={Old_OutsourcingCompanyRegister}/>

        <Route exact path="/list/design" component={DesignList}/>
        <Route exact path="/list/machine" component={MachineList}/>
        <Route exact path="/list/submachine" component={SubList}/>
        <Route exact path="/list/barcode" component={BasicBarcodeList}/>
        <Route exact path="/list/material" component={MaterialList}/>

        <Route exact path="/register/material" component={RegisterMaterial}/>
        <Route exact path="/register/design" component={RegisterDesign}/>
        <Route exact path="/register/machine" component={RegisterMachine}/>
        <Route exact path="/register/submachine" component={RegisterSubMachine}/>
        <Route exact path="/register/barcode" component={BasicBarcodeRegister}/>
        <Route exact path="/update/barcode" component={BasicBarcodeRegister}/>

        <Route exact path="/update/design" component={RegisterDesign}/>
        <Route exact path="/update/machine" component={RegisterMachine}/>
        <Route exact path="/update/submachine" component={RegisterSubMachine}/>
        <Route exact path="/update/line" component={RegisterLine}/>
        <Route exact path="/update/material" component={RegisterMaterial}/>
        <Route exact path="/update/product" component={RegisterProduct}/>


        {/* 3.0 인사관리 */}
        <Route exact path="/manage/accept" component={AcceptMember}/>
        <Route exact path="/manage/setting" component={CompanySetting}/>
        <Route exact path="/manage/teams" component={Teams}/>
        <Route exact path="/manage/rank" component={Ranks}/>
        <Route exact path="/manage/members" component={CompanyMembers}/>
        <Route exact path="/manage/members/update" component={UpdateMember}/>

        {/* 4.0 거래처관리 */}
        <Route exact path="/client/buy" component={BuyList}/>
        <Route exact path="/client/sell" component={SellList}/>
        <Route exact path="/client/list" component={ClientList}/>
        <Route exact path="/update/client" component={RegisterClient}/>
        <Route exact path="/register/client" component={RegisterClient}/>
        <Route exact path="/list/client" component={ClientList}/>

        {/* 5.0 외주관리
                <Route exact path="/update/outsourcing" component={OutsourcingRegister}/>
                <Route exact path="/register/outsourcing" component={OutsourcingRegister}/>
                <Route exact path="/outsourcing/list" component={OutsourcingList}/>
                <Route exact path="/outsourcing/order" component={Order}/>
                <Route exact path="/outsourcing/contract" component={Contract}/>
                */}

        {/* 6.0 바코드 관리 */}
        {/*<Route exact path="/list/barcode/product" component={BarcodeProductList}/>*/}
        {/*<Route exact path="/connect/barcode" component={ProductRegister}/>*/}
        {/*<Route exact path="/connect/barcode/update" component={ProductRegister}/>*/}
        {/*<Route exact path="/barcode/register" component={RegisterBarcode}/>*/}


        {/* 7.0 보전 관리 */}
        <Route exact path="/pm/maintenance/press" component={MachineMaintenance}/>
        <Route exact path="/maintenance/submachine" component={SubmachineMaintenance}/>
        <Route exact path="/pm/maintenance/mold" component={MoldMaintenance}/>

        <Route exact path="/maintenance/list" component={MaintenanceList}/>
        <Route exact path="/maintenance/history" component={MaintenanceHistory}/>
        <Route exact path="/maintenance/search" component={SearchMaintenance}/>
        <Route exact path="/maintenance/errorcode" component={ErrorCodeMaintenance}/>
        <Route exact path="/maintenance/motor" component={MotorRotationMaintenance}/>
        <Route exact path="/pm/maintenance/clutch" component={ClutchMaintenance}/>
        <Route exact path="/pm/maintenance/overton" component={OvertonMaintenance}/>


        {/* 8.0 공정 관리 */}
        <Route exact path="/process/register" component={ProcessRegister}/>
        <Route exact path="/process/register/:version" component={ProcessRegister}/>
        <Route exact path="/process/list" component={ProcessList}/>
        <Route exact path="/recommend/press" component={PressRecommend}/>
        <Route exact path="/register/process" component={RegisterProcess}/>
        <Route exact path="/list/process" component={ProcessList}/>
        <Route exact path="/update/process" component={RegisterProcess}/>


        {/* 9.0 작업지시서 관리 */}
        <Route exact path="/task/register" component={RegisterTask}/>
        <Route exact path="/task/list" component={TaskList}/>
        <Route exact path="/task/update" component={RegisterTask}/>


        {/* 10.0 재고관리 */}
        <Route exact path="/stock/list" component={StockList}/>
        <Route exact path="/stock/product" component={ProductStockList}/>
        <Route exact path="/stock/in" component={StockInList}/>
        <Route exact path="/stock/out" component={StockOutList}/>
        <Route exact path="/stock/product" component={ProductStock}/>
        <Route exact path="/stock/material" component={MaterialStock}/>
        <Route exact path="/stock/history" component={StockHistory}/>
        <Route exact path="/stock/change/in" component={ChangeStockIn}/>
        <Route exact path="/stock/change/out" component={ChangeStockOut}/>
        <Route exact path="/stock/view" component={StockView}/>

        {/* 11.0 품질관리 */}
        <Route exact path="/defective/register" component={DefectiveRegister}/>
        <Route exact path="/defective/list" component={Old_DefectiveList}/>
        <Route exact path="/inferior/register" component={RegisterInferior}/>


        {/* 12.0 키인 */}
        <Route exact path="/keyin/input/press" component={InputKeyinPress}/>
        <Route exact path="/keyin/input/press" component={InputKeyinPress}/>
        <Route exact path="/keyin/input/material" component={InputKeyinMaterial}/>
        <Route exact path="/keyin/input/welding" component={InputKeyinWelding}/>
        <Route exact path="/keyin/input/sunban" component={InputKeyinSunban}/>
        <Route exact path="/keyin/input/tab" component={InputKeyinTab}/>
        <Route exact path="/keyin/input/mold" component={InputKeyinMold}/>
        <Route exact path="/keyin/input/milling" component={InputKeyinMilling}/>

        <Route exact path="/keyin/list/press" component={ListKeyinPress}/>
        <Route exact path="/keyin/list/press" component={ListKeyinPress}/>
        <Route exact path="/keyin/list/material" component={ListKeyinMaterial}/>
        <Route exact path="/keyin/list/welding" component={ListKeyinWelding}/>
        <Route exact path="/keyin/list/sunban" component={ListKeyinSunban}/>
        <Route exact path="/keyin/list/tab" component={ListKeyinTab}/>
        <Route exact path="/keyin/list/mold" component={ListKeyinMold}/>
        <Route exact path="/keyin/list/milling" component={ListKeyinMilling}/>

        <Route exact path="/keyin/set/press" component={SetKeyinPress}/>
        <Route exact path="/keyin/set/press" component={SetKeyinPress}/>
        <Route exact path="/keyin/set/material" component={SetKeyinMaterial}/>
        <Route exact path="/keyin/set/welding" component={SetKeyinWelding}/>
        <Route exact path="/keyin/set/sunban" component={SetKeyinSunban}/>
        <Route exact path="/keyin/set/tab" component={SetKeyinTab}/>
        <Route exact path="/keyin/set/mold" component={SetKeyinMold}/>
        <Route exact path="/keyin/set/milling" component={SetKeyinMilling}/>

        {/* 13.0 모니터링 */}
        <Route exact path="/monitoring/full" component={FullMonitoring}/>
        <Route exact path="/pm/monitoring/loadton" component={LoadtonMonitoring}/>
        <Route exact path="/pm/monitoring/cms" component={CmsMonitoring}/>
        <Route exact path="/monitoring/statistics" component={CmsStatistics}/>
        <Route exact path="/pm/monitoring/press" component={PressMonitoring}/>

        <Route exact path="/monitoring/vibration" component={VibrationMonitoring}/>

        {/* 14.0 KPI 생산지수 */}
        {/*<Route exact path="/kpi/product" component={Old_ProductKpi} />*/}
        {/*<Route exact path="/kpi/quality" component={Old_QualityKpi} />*/}
        {/*<Route exact path="/kpi/price" component={Old_PriceKpi} />*/}
        {/*<Route exact path="/kpi/duedate" component={Old_DuedateKpi} />*/}

        {/* 15.0 프레스 분석 및 통계 */}
        <Route exact path="/pm/statistics/press" component={PressStatistics}/>
        <Route exact path="/pm/analysis/readytime" component={ReadyTimeStatics}/>
        <Route exact path="/pm/statistics/readytime" component={ReadyTimeStatistics}/>
        <Route exact path="/pm/statistics/power" component={PowerStatistics}/>
        <Route exact path="/pm/analysis/capacity" component={CapacityStatistics}/>
        <Route exact path="/statistics/qdctime" component={QdcTimeStatistics}/>
        <Route exact path="/statistics/loss" component={FactoryLossSatistics}/>
        <Route exact path="/statistics/optimalspm" component={OptimalSPMStatistics}/>
        <Route exact path="/statistics/leadtime" component={LeadTimeAnalysis}/>
        <Route exact path="/statistics/environmental" component={FactoryEnvironmentalAnalysis}/>
        <Route exact path="/pm/statistics/error" component={ErrorStatistics}/>

        {/* 16.0 서비스 */}
        <Route exact path="/service" component={ServiceDesk}/>

        {/* 17.0 마이페이지 */}
        <Route exact path="/mypage" component={MyPage}/>

        {/*슈퍼 어드민*/}
        <Route exact path="/super/register" component={SuperRegister}/>
        <Route exact path="/super/list" component={SuperList}/>


        {/* 안쓰는것 */}
        <Route exact path="/register/product" component={RegisterProduct}/>
        <Route exact path="/register/line" component={RegisterLine}/>
        <Route exact path="/status" component={StatusList}/>
        <Route exact path="/list/line" component={LineList}/>
        <Route exact path="/charts" component={Charts}/>
        <Route exact path="/reports" component={Reports}/>
        <Route exact path="/list/product" component={ProductList}/>
        <Route exact path="/barcode/setting" component={BarcodeSetting}/>

        {/* 준비중 / 404 / 기타오류 */}
        <Route exact path="/comingsoon" component={Comingsoon}/>

        <Route exact path="/custom/dashboard" component={CustomDashboardIndex}/>
        <Route exact path="/custom/dashboard/loadton/:press" component={CustomLoadtonChartContainer}/>
        <Route exact path="/custom/dashboard/errorLog" component={CustomErrorLogDashBoard}/>
        <Route exact path="/custom/dashboard/rotate" component={CustomRotateDashboard}/>
        <Route exact path="/custom/dashboard/production" component={CustomProductionDashBoard}/>

        <Route exact path="/pm/v2/dashboard/press/:id" component={PMV2DashboardPressContainer}/>
      </Switch>
    </div>
  )
}

export default Routers
