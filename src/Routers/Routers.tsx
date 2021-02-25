import React, {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
//import {UserDataProvider, UserDataContext} from '../Context/UserData';
// 경로 모음
// ./Pages/Welcome
// ./Pages/Dashboard
// manage (인사관리)
// my (마이페이지)
// 데이터 등록
// 데이터조회
// 어드민, 데이터 등록 관련
/*
import OutsourcingList from '../Pages/Outsourcing/List';
import OutsourcingRegister from '../Pages/Outsourcing/Register';
import Order from '../Pages/Outsourcing/Order';
import Contract from '../Pages/Outsourcing/Contract';
*/
//import MaintenanceRegister from '../Pages/Maintenance/Register';
import CustomMonitoring from '../Containers/PM_Monitoring/CustomMonitoring'


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
        <Route exact path="/" component={CustomMonitoring}/>
        {/*<Route exact path="/login" component={Login}/>*/}
        {/*<Route exact path="/email" component={Email}/>*/}
        {/*<Route exact path="/auth" component={Auth}/>*/}
        {/*<Route exact path="/signup" component={Signup}/>*/}
        {/*<Route exact path="/complete" component={Complete}/>*/}
        {/*<Route exact path="/forgot" component={ForgotPw}/>*/}
        {/*<Route exact path="/password" component={ChangePw}/>*/}
        {/*<Route exact path="/oops" component={OnlyChrome}/>*/}


        {/*/!* 1.0 홈 *!/*/}
        {/*<Route exact path="/dashboard" component={NewDashboard}/>*/}

        {/*/!* 2.0 기준정보관리 *!/*/}

        {/*<Route exact path="/basic/list/factory" component={BasicFactory}/>*/}
        {/*<Route exact path="/basic/list/subdivided" component={BasicSubdivided}/>*/}
        {/*<Route exact path="/basic/list/machine" component={BasicMachine}/>*/}
        {/*<Route exact path="/basic/list/device" component={BasicDevice}/>*/}
        {/*<Route exact path="/basic/list/material" component={BasicMaterial}/>*/}
        {/*<Route exact path="/basic/list/mold" component={BasicMold}/>*/}
        {/*<Route exact path="/basic/list/parts" component={BasicParts}/>*/}
        {/*<Route exact path="/basic/list/barcode" component={BasicBarcode}/>*/}

        {/*<Route exact path="/basic/standard/list/item" component={NewBasicItemList}/>*/}

        {/*<Route exact path="/basic/item/register" component={BasicStandardRegister}/>*/}

        {/*<Route exact path="/basic/document/register" component={BasicDocumentRegister}/>*/}

        {/*<Route exact path="/basic/machine/register" component={BasicMachineRegister}/>*/}
        {/*<Route exact path="/basic/factory/register" component={BasicFactoryRegister}/>*/}
        {/*<Route exact path="/basic/subdivided/register" component={BasicSubdividedRegister}/>*/}
        {/*<Route exact path="/basic/mold/register" component={BasicMoldRegister}/>*/}
        {/*<Route exact path="/basic/device/register" component={BasicDeviceRegister}/>*/}
        {/*<Route exact path="/basic/material/register" component={NewBasicMaterialRegister}/>*/}
        {/*<Route exact path="/basic/barcode/register" component={BasicBarcodeRegister}/>*/}

        {/*/!* 외주정보 관리 *!/*/}
        {/*<Route exact path="/manage/" component={BasicDeviceRegister}/>*/}
        {/*<Route exact path="/outsourcing/company/register" component={Old_OutsourcingCompanyRegister}/>*/}

        {/*<Route exact path="/list/design" component={DesignList}/>*/}
        {/*<Route exact path="/list/machine" component={MachineList}/>*/}
        {/*<Route exact path="/list/submachine" component={SubList}/>*/}
        {/*<Route exact path="/list/barcode" component={BasicBarcodeList}/>*/}
        {/*<Route exact path="/list/material" component={MaterialList}/>*/}

        {/*<Route exact path="/register/material" component={RegisterMaterial}/>*/}
        {/*<Route exact path="/register/design" component={RegisterDesign}/>*/}
        {/*<Route exact path="/register/machine" component={RegisterMachine}/>*/}
        {/*<Route exact path="/register/submachine" component={RegisterSubMachine}/>*/}
        {/*<Route exact path="/register/barcode" component={BasicBarcodeRegister}/>*/}
        {/*<Route exact path="/update/barcode" component={BasicBarcodeRegister}/>*/}

        {/*<Route exact path="/update/design" component={RegisterDesign}/>*/}
        {/*<Route exact path="/update/machine" component={RegisterMachine}/>*/}
        {/*<Route exact path="/update/submachine" component={RegisterSubMachine}/>*/}
        {/*<Route exact path="/update/line" component={RegisterLine}/>*/}
        {/*<Route exact path="/update/material" component={RegisterMaterial}/>*/}
        {/*<Route exact path="/update/product" component={RegisterProduct}/>*/}


        {/*/!* 3.0 인사관리 *!/*/}
        {/*<Route exact path="/manage/accept" component={AcceptMember}/>*/}
        {/*<Route exact path="/manage/setting" component={CompanySetting}/>*/}
        {/*<Route exact path="/manage/teams" component={Teams}/>*/}
        {/*<Route exact path="/manage/rank" component={Ranks}/>*/}
        {/*<Route exact path="/manage/members" component={CompanyMembers}/>*/}
        {/*<Route exact path="/manage/members/update" component={UpdateMember}/>*/}

        {/*/!* 4.0 거래처관리 *!/*/}
        {/*<Route exact path="/client/buy" component={BuyList}/>*/}
        {/*<Route exact path="/client/sell" component={SellList}/>*/}
        {/*<Route exact path="/client/list" component={ClientList}/>*/}
        {/*<Route exact path="/update/client" component={RegisterClient}/>*/}
        {/*<Route exact path="/register/client" component={RegisterClient}/>*/}
        {/*<Route exact path="/list/client" component={ClientList}/>*/}

        {/*/!* 5.0 외주관리*/}
        {/*        <Route exact path="/update/outsourcing" component={OutsourcingRegister}/>*/}
        {/*        <Route exact path="/register/outsourcing" component={OutsourcingRegister}/>*/}
        {/*        <Route exact path="/outsourcing/list" component={OutsourcingList}/>*/}
        {/*        <Route exact path="/outsourcing/order" component={Order}/>*/}
        {/*        <Route exact path="/outsourcing/contract" component={Contract}/>*/}
        {/*        *!/*/}

        {/*/!* 6.0 바코드 관리 *!/*/}
        {/*/!*<Route exact path="/list/barcode/product" component={BarcodeProductList}/>*!/*/}
        {/*/!*<Route exact path="/connect/barcode" component={ProductRegister}/>*!/*/}
        {/*/!*<Route exact path="/connect/barcode/update" component={ProductRegister}/>*!/*/}
        {/*/!*<Route exact path="/barcode/register" component={RegisterBarcode}/>*!/*/}


        {/*/!* 7.0 보전 관리 *!/*/}
        {/*<Route exact path="/pm/maintenance/press" component={MachineMaintenance}/>*/}
        {/*<Route exact path="/maintenance/submachine" component={SubmachineMaintenance}/>*/}
        {/*<Route exact path="/pm/maintenance/mold" component={MoldMaintenance}/>*/}

        {/*<Route exact path="/maintenance/list" component={MaintenanceList}/>*/}
        {/*<Route exact path="/maintenance/history" component={MaintenanceHistory}/>*/}
        {/*<Route exact path="/maintenance/search" component={SearchMaintenance}/>*/}
        {/*<Route exact path="/maintenance/errorcode" component={ErrorCodeMaintenance}/>*/}
        {/*<Route exact path="/maintenance/motor" component={MotorRotationMaintenance}/>*/}
        {/*<Route exact path="/pm/maintenance/clutch" component={ClutchMaintenance}/>*/}
        {/*<Route exact path="/pm/maintenance/overton" component={OvertonMaintenance}/>*/}


        {/*/!* 8.0 공정 관리 *!/*/}
        {/*<Route exact path="/process/register" component={ProcessRegister}/>*/}
        {/*<Route exact path="/process/register/:version" component={ProcessRegister}/>*/}
        {/*<Route exact path="/process/list" component={ProcessList}/>*/}
        {/*<Route exact path="/recommend/press" component={PressRecommend}/>*/}
        {/*<Route exact path="/register/process" component={RegisterProcess}/>*/}
        {/*<Route exact path="/list/process" component={ProcessList}/>*/}
        {/*<Route exact path="/update/process" component={RegisterProcess}/>*/}


        {/*/!* 9.0 작업지시서 관리 *!/*/}
        {/*<Route exact path="/task/register" component={RegisterTask}/>*/}
        {/*<Route exact path="/task/list" component={TaskList}/>*/}
        {/*<Route exact path="/task/update" component={RegisterTask}/>*/}


        {/*/!* 10.0 재고관리 *!/*/}
        {/*<Route exact path="/stock/list" component={StockList}/>*/}
        {/*<Route exact path="/stock/product" component={ProductStockList}/>*/}
        {/*<Route exact path="/stock/in" component={StockInList}/>*/}
        {/*<Route exact path="/stock/out" component={StockOutList}/>*/}
        {/*<Route exact path="/stock/product" component={ProductStock}/>*/}
        {/*<Route exact path="/stock/material" component={MaterialStock}/>*/}
        {/*<Route exact path="/stock/history" component={StockHistory}/>*/}
        {/*<Route exact path="/stock/change/in" component={ChangeStockIn}/>*/}
        {/*<Route exact path="/stock/change/out" component={ChangeStockOut}/>*/}
        {/*<Route exact path="/stock/view" component={StockView}/>*/}

        {/*/!* 11.0 품질관리 *!/*/}
        {/*<Route exact path="/defective/register" component={DefectiveRegister}/>*/}
        {/*<Route exact path="/defective/list" component={Old_DefectiveList}/>*/}
        {/*<Route exact path="/inferior/register" component={RegisterInferior}/>*/}


        {/*/!* 12.0 키인 *!/*/}
        {/*<Route exact path="/keyin/input/press" component={InputKeyinPress}/>*/}
        {/*<Route exact path="/keyin/input/press" component={InputKeyinPress}/>*/}
        {/*<Route exact path="/keyin/input/material" component={InputKeyinMaterial}/>*/}
        {/*<Route exact path="/keyin/input/welding" component={InputKeyinWelding}/>*/}
        {/*<Route exact path="/keyin/input/sunban" component={InputKeyinSunban}/>*/}
        {/*<Route exact path="/keyin/input/tab" component={InputKeyinTab}/>*/}
        {/*<Route exact path="/keyin/input/mold" component={InputKeyinMold}/>*/}
        {/*<Route exact path="/keyin/input/milling" component={InputKeyinMilling}/>*/}

        {/*<Route exact path="/keyin/list/press" component={ListKeyinPress}/>*/}
        {/*<Route exact path="/keyin/list/press" component={ListKeyinPress}/>*/}
        {/*<Route exact path="/keyin/list/material" component={ListKeyinMaterial}/>*/}
        {/*<Route exact path="/keyin/list/welding" component={ListKeyinWelding}/>*/}
        {/*<Route exact path="/keyin/list/sunban" component={ListKeyinSunban}/>*/}
        {/*<Route exact path="/keyin/list/tab" component={ListKeyinTab}/>*/}
        {/*<Route exact path="/keyin/list/mold" component={ListKeyinMold}/>*/}
        {/*<Route exact path="/keyin/list/milling" component={ListKeyinMilling}/>*/}

        {/*<Route exact path="/keyin/set/press" component={SetKeyinPress}/>*/}
        {/*<Route exact path="/keyin/set/press" component={SetKeyinPress}/>*/}
        {/*<Route exact path="/keyin/set/material" component={SetKeyinMaterial}/>*/}
        {/*<Route exact path="/keyin/set/welding" component={SetKeyinWelding}/>*/}
        {/*<Route exact path="/keyin/set/sunban" component={SetKeyinSunban}/>*/}
        {/*<Route exact path="/keyin/set/tab" component={SetKeyinTab}/>*/}
        {/*<Route exact path="/keyin/set/mold" component={SetKeyinMold}/>*/}
        {/*<Route exact path="/keyin/set/milling" component={SetKeyinMilling}/>*/}

        {/*/!* 13.0 모니터링 *!/*/}
        {/*<Route exact path="/monitoring/full" component={FullMonitoring}/>*/}
        {/*<Route exact path="/pm/monitoring/loadton" component={LoadtonMonitoring}/>*/}
        {/*<Route exact path="/pm/monitoring/cms" component={CmsMonitoring}/>*/}
        {/*<Route exact path="/monitoring/statistics" component={CmsStatistics}/>*/}
        {/*<Route exact path="/pm/monitoring/press" component={PressMonitoring}/>*/}

        {/*<Route exact path="/monitoring/vibration" component={VibrationMonitoring}/>*/}

        {/*/!* 14.0 KPI 생산지수 *!/*/}
        {/*/!*<Route exact path="/kpi/product" component={Old_ProductKpi} />*!/*/}
        {/*/!*<Route exact path="/kpi/quality" component={Old_QualityKpi} />*!/*/}
        {/*/!*<Route exact path="/kpi/price" component={Old_PriceKpi} />*!/*/}
        {/*/!*<Route exact path="/kpi/duedate" component={Old_DuedateKpi} />*!/*/}

        {/*/!* 15.0 프레스 분석 및 통계 *!/*/}
        {/*<Route exact path="/pm/statistics/press" component={PressStatistics}/>*/}
        {/*<Route exact path="/pm/analysis/readytime" component={ReadyTimeStatics}/>*/}
        {/*<Route exact path="/pm/statistics/readytime" component={ReadyTimeStatistics}/>*/}
        {/*<Route exact path="/pm/statistics/power" component={PowerStatistics}/>*/}
        {/*<Route exact path="/pm/analysis/capacity" component={CapacityStatistics}/>*/}
        {/*<Route exact path="/statistics/qdctime" component={QdcTimeStatistics}/>*/}
        {/*<Route exact path="/statistics/loss" component={FactoryLossSatistics}/>*/}
        {/*<Route exact path="/statistics/optimalspm" component={OptimalSPMStatistics}/>*/}
        {/*<Route exact path="/statistics/leadtime" component={LeadTimeAnalysis}/>*/}
        {/*<Route exact path="/statistics/environmental" component={FactoryEnvironmentalAnalysis}/>*/}
        {/*<Route exact path="/pm/statistics/error" component={ErrorStatistics}/>*/}

        {/*/!* 16.0 서비스 *!/*/}
        {/*<Route exact path="/service" component={ServiceDesk}/>*/}

        {/*/!* 17.0 마이페이지 *!/*/}
        {/*<Route exact path="/mypage" component={MyPage}/>*/}

        {/*/!*슈퍼 어드민*!/*/}
        {/*<Route exact path="/super/register" component={SuperRegister}/>*/}
        {/*<Route exact path="/super/list" component={SuperList}/>*/}


        {/*/!* 안쓰는것 *!/*/}
        {/*<Route exact path="/register/product" component={RegisterProduct}/>*/}
        {/*<Route exact path="/register/line" component={RegisterLine}/>*/}
        {/*<Route exact path="/status" component={StatusList}/>*/}
        {/*<Route exact path="/list/line" component={LineList}/>*/}
        {/*<Route exact path="/charts" component={Charts}/>*/}
        {/*<Route exact path="/reports" component={Reports}/>*/}
        {/*<Route exact path="/list/product" component={ProductList}/>*/}
        {/*<Route exact path="/barcode/setting" component={BarcodeSetting}/>*/}

        {/*/!* 준비중 / 404 / 기타오류 *!/*/}
        {/*<Route exact path="/comingsoon" component={Comingsoon}/>*/}

        {/*<Route exact path="/custom/dashboard" component={CustomDashboardIndex}/>*/}
        {/*<Route exact path="/custom/dashboard/loadton/:press" component={CustomLoadtonChartContainer}/>*/}
        {/*<Route exact path="/custom/dashboard/errorLog" component={CustomErrorLogDashBoard}/>*/}
        {/*<Route exact path="/custom/dashboard/rotate" component={CustomRotateDashboard}/>*/}
        {/*<Route exact path="/custom/dashboard/production" component={CustomProductionDashBoard}/>*/}


        {/*<Route exact path="/pm/v2/dashboard/press/select/info" component={PMV2DashboardPressContainer}/>*/}
        {/*<Route exact path="/pm/v2/dashboard/press/:id" component={PMV2DashboardPressContainer}/>*/}
        {/*<Route exact path="/pm/v2/cps/map" component={PMV2ForDesignerContainer}/>*/}

      </Switch>
    </div>
  )
}

export default Routers
