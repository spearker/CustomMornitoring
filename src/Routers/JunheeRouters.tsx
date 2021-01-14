import React, {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import OilSupplyStatistics from '../Pages/PM_Statistics/OilSupplyStatistics'
import AbilityStatistics from '../Pages/PM_Statistics/AbilityStatistics'
import AbilityAnalysis from '../Pages/PM_Analysis/AbilityAnalysis'
import ChitRegister from '../Pages/Project/ChitRegister'
import ProductionRegister from '../Pages/Project/ProductionRegister'
import ContractRegister from '../Pages/Marketing/ContractRegister'
import ContractModify from '../Pages/Marketing/ContractModify'
import OrderModify from '../Pages/Marketing/OrderModify'
import OrderRegister from '../Pages/Marketing/OrderRegister'
import BarcodeRegister from '../Pages/Barcode/BarcodeRegister'
import BarcodeModify from '../Pages/Barcode/BarcodeModify'
import ManageStockRegister from '../Pages/ManageStock/ManageStockRegister'
import ProcessDetailRegister from '../Pages/Process/DetailRegister'
import MoldRegister from '../Pages/Mold/MoldRegister'
import MoldRepairRegister from '../Pages/Mold/MoldRepairRegister'
import OutsourcingRegister from '../Pages/Outsourcing/OutsourcingRegister'
import CustomerRegister from '../Pages/Customer/CustomerRegister'
import WorkHistoryRegister from '../Pages/Project/WorkHistoryRegister'
import MapEditer from '../Pages/Super/MapEditer'
import MapListPage from '../Pages/map/MapListPage'
import QualityTestRequest from '../Pages/Quality/QualityTestRequest'
import CreateMember from '../Pages/Old_Manage/CreatMember'
import MoldManageList from '../Pages/SQManage/Mold/MoldManageList'
import MoldManageInput from '../Pages/SQManage/Mold/MoldManageInputContainer'
import ProcessManageList from '../Pages/SQManage/Process/ProcessManageList'
import ProcessManageInput from '../Pages/SQManage/Process/ProcessManageInput'
import NewProcessRegister from '../Pages/Process/NewProcess'
import ProcessRegister from '../Pages/Process/Register'

import OutsourcingRegisterFree from '../Pages/Old_Outsourcing/Register'
import DateTypeCalendar from '../Components/Modal/DateTypeCalendar'
import NewBasicMaterialRegister_V2 from '../Containers/Basic/NewBasicMaterialContainer_v2'
import NewRawMaterial_V2 from '../Pages/NewStock/RawMaterial'
import NewRawMaterialLocation_V2 from '../Pages/NewStock/RawMaterialLocation'
import WarehousingRegister from '../Pages/Stock/WarehousingRegister'
import ReleaseRegister from '../Pages/Stock/ReleaseRegister'
import ReleaseRegister_V2 from '../Pages/NewStock/ReleaseRegisterV2'
import WarehousingRegister_V2 from '../Pages/NewStock/WarehousingRegisterV2'


const JunheeRouters = () => {

  useEffect(() => {
    console.log(1111)
  }, [localStorage.getItem('userPermission')])

  return (
    <div>
      {
        localStorage.getItem('userPermission') === 'true' &&
        <Switch>
          {/*신 공정관리*/}
            <Route exact path={'/basic/new/list/process/register'} component={NewProcessRegister}/>
          {/*인사관리*/}
          {/*<Route exact path="/manage/member/create" component={CreateMember}/>*/}
          {/* 외주관리 */}
            <Route exact path="/outsourcing/register" component={OutsourcingRegister}/>
            <Route exact path="/outsourcing/register/:pk" component={OutsourcingRegister}/>
          {/* 생산관리 */}
            <Route exact path="/project/chit/register" component={ChitRegister}/>
            <Route exact path="/project/chit/update/:pk" component={ChitRegister}/>
            <Route exact path="/project/production/register" component={ProductionRegister}/>
            <Route exact path="/project/history/register" component={WorkHistoryRegister}/>
            <Route exact path="/project/history/:type/:pk" component={WorkHistoryRegister}/>
          {/*영업관리*/}
            <Route exact path="/marketing/contract/register" component={ContractRegister}/>
            <Route exact path="/marketing/contract/modify/:pk" component={ContractModify}/>
            <Route exact path="/marketing/order/register" component={OrderRegister}/>
            <Route exact path="/marketing/order/modify/:pk" component={OrderModify}/>
          {/*바코드관리*/}
            <Route exact path="/barcode/register" component={BarcodeRegister}/>
            <Route exact path="/barcode/register/:barcode_pk" component={BarcodeRegister}/>
          {/*재고 관리*/}
            <Route exact path="/manageStock/register" component={ManageStockRegister}/>
          {/*공정 관리*/}
            <Route exact path="/process/detail/register" component={ProcessDetailRegister}/>
            <Route exact path="/process/detail/:pk" component={ProcessRegister}/>
          {/*거래처관리*/}
            <Route exact path="/customer/register" component={CustomerRegister}/>
            <Route exact path="/customer/register/:pk" component={CustomerRegister}/>
          {/* pm */}
            <Route exact path="/pm/statistics/oil" component={OilSupplyStatistics}/>
            <Route exact path="/pm/statistics/ability" component={AbilityStatistics}/>
            <Route exact path="/pm/analysis/ability" component={AbilityAnalysis}/>
          {/*어드민*/}
            <Route exact path="/admin/map/list" component={MapListPage}/>
          {/*<Route exact path="/company/maps/:id" component={MapList} />*/}
            <Route path="/admin/map/:company" component={MapEditer}/>
            <Route path="/map/update/:company/:factory/:type" component={MapEditer}/>
          {/*SQ 인증 관리*/}
            <Route path="/sq/manage/mold" component={MoldManageList}/>
            <Route path="/sq/manage/process" component={ProcessManageList}/>
            <Route path="/sq/manage/moldregister" component={MoldManageInput}/>
            <Route path="/sq/manage/processregister" component={ProcessManageInput}/>

          {/*신규 원자재 관리*/}
          {/*  <Route exact path="/basic/material/register/v2" component={NewBasicMaterialRegister_V2}/>*/}
          {/*  <Route exact path="/stock/rawmaterial/list/v2" component={NewRawMaterial_V2}/>*/}
          {/*  <Route exact path="/stock/rawmaterial/location/v2" component={NewRawMaterialLocation_V2}/>*/}
          {/*  <Route exact path="/stock/warehousing/register/v2/version/:pk/:name" component={WarehousingRegister_V2}/>*/}
          {/*  <Route exact path="/stock/release/register/v2/version/:pk/:name" component={ReleaseRegister_V2}/>*/}

            <Route path='/free' component={OutsourcingRegisterFree}/>
        </Switch>
      }
    </div>
  )
}

export default JunheeRouters
