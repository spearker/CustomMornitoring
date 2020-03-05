import React, {useContext, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
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

import RegisterMachine from '../Pages/Register/Machine';
import RegisterSubMachine from '../Pages/Register/SubMachine';
import RegisterLine from '../Pages/Register/Line';
import RegisterMaterial from '../Pages/Register/Material';
import RegisterDesign from '../Pages/Register/Design'

import DesignList from '../Pages/List/Design';
import MachineList from '../Pages/List/Machine';
import SubList from '../Pages/List/SubMachine';
import LineList from '../Pages/List/Line';
import MaterialList from '../Pages/List/Material';

// 어드민, 데이터 등록 관련
import SuperRegister from '../Pages/Super/Register';
import SuperList from '../Pages/Super/List';
import RegisterTask from '../Pages/Register/Task';
import TaskList from '../Pages/List/Task';
import PressMonitoring from '../Pages/Monitoring/Press';
import LoadMonitoring from '../Pages/Monitoring/Load';
import StatusList from '../Pages/List/Status';
import RegisterProduct from '../Pages/Register/Product';
import ProductList from '../Pages/List/Product';
import Charts from '../Pages/Service/Charts';
import ServiceDesk from '../Pages/Service/ServiceDesk';
import Reports from '../Pages/Service/Reports';

const Routers = () => {
    //const { isLoggedIn } = useContext(UserDataContext);
  
  return (
    <div>
        <Switch>
            {/* 웰컴 (Welcome) */}
            <Route exact path="/" component={Welcome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/email" component={Email} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/complete" component={Complete} />
            <Route exact path="/forgot" component={ForgotPw} />
            <Route exact path="/change" component={ChangePw} />

            {/* 대시보드 & 모니터링 */}
            <Route exact path="/task/register" component={RegisterTask}/>
            <Route exact path="/task/list" component={TaskList}/>
            <Route exact path="/monitoring/press" component={PressMonitoring}/>
            <Route exact path="/monitoring/load" component={LoadMonitoring}/>
            <Route exact path="/status" component={StatusList}/>

            {/* Manage (어드민) */}
            <Route exact path="/manage/accept" component={AcceptMember} />
            <Route exact path="/manage/setting" component={CompanySetting}/>
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
            <Route exact path="/list/material" component={MaterialList} />
            <Route exact path="/list/product" component={ProductList} />

            {/* 데이터 수정 관련 - 등록 페이지와 동일한 컴포넌트 사용*/}
            <Route exact path="/update/design" component={RegisterDesign} />
            <Route exact path="/update/machine" component={RegisterMachine} />
            <Route exact path="/update/submachine" component={RegisterSubMachine} />
            <Route exact path="/update/line" component={RegisterLine} />
            <Route exact path="/update/material" component={RegisterMaterial} />
            <Route exact path="/update/product" component={RegisterProduct} />
            
            {/* 데이터 등록 관련 */}
            <Route exact path="/register/material" component={RegisterMaterial} />
            <Route exact path="/register/design" component={RegisterDesign} />
            <Route exact path="/register/product" component={RegisterProduct} />
            <Route exact path="/register/machine" component={RegisterMachine} />
            <Route exact path="/register/submachine" component={RegisterSubMachine} />
            <Route exact path="/register/line" component={RegisterLine} />

            {/*기타 서비스 */}
            <Route exact path="/charts" component={Charts}/>
            <Route exact path="/reports" component={Reports}/>
            <Route exact path="/service" component={ServiceDesk}/>

            {/* 슈퍼 어드민*/}
            <Route exact path="/super/register" component={SuperRegister} />
            <Route exact path="/super/list" component={SuperList} />


        </Switch>
    </div>
  );
}

export default Routers;
