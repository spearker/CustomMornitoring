import React, {useContext, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
//import {UserDataProvider, UserDataContext} from '../Context/UserData';


// 경로 모음
// ./Pages/Welcome
import Welcome from '../Pages/Welcome/Index'
import Login from '../Pages/Welcome/Login'
import Email from '../Pages/Welcome/Email'
import Auth from '../Pages/Welcome/Auth'
import Signup from '../Pages/Welcome/Signup'
import Complete from '../Pages/Welcome/Complete'

// ./Pages/Dashboard
import Dashboard from '../Pages/Dashboard/Index';

import AcceptMember from '../Pages/Manage/Accept'

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

            {/* 멤버 조회 관련 */}
            <Route exact path="/manage/member" component={Dashboard} />
            <Route exact path="/manage/accept" component={AcceptMember} />

            {/* 대시보드, 데이터 조회 관련 */}
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/list/design" component={DesignList} />
            <Route exact path="/list/machine" component={MachineList} />
            <Route exact path="/list/sub" component={SubList} />
            <Route exact path="/list/line" component={LineList} />
            <Route exact path="/list/material" component={MaterialList} />
            
            {/* 데이터 등록 관련 */}
            <Route exact path="/register/material" component={RegisterMaterial} />
            <Route exact path="/register/design" component={RegisterDesign} />
            <Route exact path="/register/machine" component={RegisterMachine} />
            <Route exact path="/register/sub" component={RegisterSubMachine} />
            <Route exact path="/register/line" component={RegisterLine} />
            {/* 슈퍼 어드민*/}
            <Route exact path="/super/register" component={SuperRegister} />
            <Route exact path="/super/list" component={SuperList} />
        </Switch>
    </div>
  );
}

export default Routers;
