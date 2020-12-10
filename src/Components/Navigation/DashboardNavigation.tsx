import React, {useEffect, useState, useRef} from 'react'
import Styled from 'styled-components'
import {BrowserRouter, Route, Switch, Link, useHistory} from 'react-router-dom'
import {
  BG_COLOR,
  BG_COLOR_SUB,
  SYSTEM_NAME,
  BG_COLOR_SUB2,
  COMPANY_LOGO,
  POINT_COLOR,
  MAX_WIDTH,
  SERVICE_TITLE,
  BG_COLOR_SUB3
} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo_temp_2.png'
import Icon from '../../Assets/Images/btn_menu_2.png'
import NAV_HOME from '../../Assets/Images/btn_nav_home.svg'
import NAV_MES from '../../Assets/Images/btn_nav_setting.svg'
import NAV_PRESS from '../../Assets/Images/btn_nav_press.svg'
import NAV_DASHBOARD from '../../Assets/Images/ic_dashboard.png'
import NavList from './NavList'
import {useUserDispatch, useUser} from '../../Context/UserContext'
import useOnclickOutside from 'react-cool-onclickoutside'
import NavGroupList from '../List/NavGroupList'
import {ROUTER_MENU_LIST, PM_MENU_LIST, MES_MENU_LIST} from '../../Common/routerset'
import {usePopup, usePopupDispatch} from '../../Context/PopupContext'

//대시보드 네비게이션
interface Props {
  select?: any,
  folding?: boolean,
}

const DashboardNavigation = ({select, folding}: Props) => {
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useUserDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<string>('')
  const [isSelected, setIsSelected] = useState<number>(999)
  const dispatchp = usePopupDispatch()
  const [currentYear] = React.useState(new Date().getFullYear())


  const me = useUser()
  const nav = usePopup()

  const history = useHistory()

  const ref = useOnclickOutside(() => {
    setIsOpen(false)
  })

  useEffect(() => {

  }, [])


  const PmNavGroup =

    Object.keys(PM_MENU_LIST).map((v, i) => {
      return (
        <NavGroupList
          key={`nav-${i}`}
          onClickEvent={() => {

            if (isSelected === i) {
              setIsSelected(999)
            } else {
              setIsSelected(i)

            }
          }}
          onClickMode={() => dispatchp({
            type: 'CHANGE_MODE',
            data: {
              mode: 'pm',

            }
          })}
          selected={isSelected === i || select == v ? true : false} contents={PM_MENU_LIST[v]}/>
      )
    })


  const MesNavGroup =

    Object.keys(MES_MENU_LIST).map((v, i) => {
      return (
        <NavGroupList
          key={`nav-${i}`}
          onClickEvent={() => {

            if (isSelected === i) {
              setIsSelected(999)
            } else {
              setIsSelected(i)

            }
          }}
          onClickMode={() => dispatchp({
            type: 'CHANGE_MODE',
            data: {
              mode: 'mes',

            }
          })}
          selected={isSelected === i || select == v ? true : false} contents={MES_MENU_LIST[v]}/>
      )
    })


  const MesNavGroup2 =

    ROUTER_MENU_LIST.map((v, i) => {
      return (
        <NavGroupList
          key={`nav-${i}`}
          onClickEvent={() => {

            if (isSelected === i) {
              setIsSelected(999)
            } else {
              setIsSelected(i)
            }
          }}
          onClickMode={() => dispatchp({
            type: 'CHANGE_MODE',
            data: {
              mode: 'mes'
            }
          })}
          selected={isSelected === i ? true : false} contents={v}/>
      )
    })


  return (
    <>

      <NavDivLeft>
        <div onClick={() => {
          dispatchp({
            type: 'CHANGE_MODE',
            data: {
              mode: 'home'
            }
          })
          history.push('/dashboard')
        }}>
          <img src={NAV_HOME}/>
          <p>Home</p>
        </div>
        {/*<div onClick={() => {*/}
        {/*  // dispatchp({*/}
        {/*  //   type: 'CHANGE_MODE',*/}
        {/*  //   data: {*/}
        {/*  //     mode: 'custom_dashboard'*/}
        {/*  //   }*/}
        {/*  // })*/}
        {/*  history.push('/custom/dashboard')*/}
        {/*}}>*/}
        {/*  <img src={NAV_DASHBOARD}/>*/}
        {/*  <p style={{fontSize: '5pt'}}>DASHBOARD</p>*/}
        {/*</div>*/}
        <div onClick={() => {
          if (nav.mode !== 'pm') {
            dispatchp({
              type: 'CHANGE_MODE',
              data: {
                mode: 'pm'
              }
            })
          } else {
            dispatchp({
              type: 'CHANGE_MODE',
              data: {
                mode: 'home'
              }
            })
          }
        }} style={nav.mode == 'pm' ? {backgroundColor: POINT_COLOR} : {}}>
          <img src={NAV_PRESS}/>
          <p>PMS</p>
        </div>
        <div onClick={() => {
          if (nav.mode !== 'mes') {
            dispatchp({
              type: 'CHANGE_MODE',
              data: {
                mode: 'mes'
              }
            })
          } else {
            dispatchp({
              type: 'CHANGE_MODE',
              data: {
                mode: 'home'
              }
            })
          }
        }} style={nav.mode == 'mes' ? {backgroundColor: POINT_COLOR} : {}}>
          <img src={NAV_MES}/>
          <p>MES</p>
        </div>
        {/*<div onClick={() => history.push('/admin/map/list')}>*/}
        {/*    <img src={NAV_MES}/>*/}
        {/*    <p>ADMIN</p>*/}
        {/*</div>*/}

        {/*<div onClick={() => history.push('/pm2/dashboard')} >*/}
        {/*  <img src={NAV_PRESS} />*/}
        {/*  <p>PM2</p>*/}
        {/*</div>*/}


      </NavDivLeft>
      {nav.mode !== 'home' &&
      <NavDiv>
        {
          nav.mode == 'home' &&
          <div style={{textAlign: 'center', width: '100%', marginBottom: 44, backgroundColor: 'red'}}>
              <a href="/dashboard"><img src={Logo} style={{width: 134, marginBottom: 8}}/></a><br/>
              <p className="p-bold" style={{
                minWidth: 100,
                display: 'inline-block',
                fontSize: 18,
                textAlign: 'center',
                color: `${POINT_COLOR}`
              }}>{me.company_name === undefined ? SERVICE_TITLE : me.company_name}</p>
          </div>
        }

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh'
          }}>
              <div>
                {nav.mode === 'pm' && PmNavGroup}
                {nav.mode === 'mes' && MesNavGroup}
              </div>


              <p style={{fontSize: 12, paddingLeft: 27, color: 'gray'}}>
                  Copyright {currentYear}. SIZL Corp <br/>
                  All Rights Reserved.
              </p>
          </div>

      </NavDiv>
      }


    </>

  )
}

const TwoDepthDiv = Styled.div`
  position: absolute;
  top: 0;
  left: 220px;
  padding-top: 66px;
  padding-left: 44px;
  min-height: 100vh;
  padding-bottom: 140px;
  max-width: 280px;
  width: 320px;
  background-color: #212228;
`
const NavDiv = Styled.div`
  background: linear-gradient(0.25turn,#1f2d48, #1d2a43);
  min-width: 200px;
  min-height: 100%;
  display: inline-block;
  color: white;
  padding-top: 40px;
  padding-bottom: 600px;
  left: 70px;
  position: absolute;
  padding-bottom: 40px;
  z-index: 4;
  box-sizing: border-box;
`

const NavDivLeft = Styled.div`
  height: 100%;
  text-align: center;
  font-size: 13px;
  div{
    font-weight: bold;
    cursor: pointer;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover{
      background-color: ${BG_COLOR_SUB3};
      opacity: 1;
    }
    &:first-child:{
      margin-top: 2px;
      padding-top: 16px;
    }
    opacity: 0.9;
    p{
      margin-top: -3px;
    }
  }
  img{
    width: 27px;
    

  }
  min-width: 70px;
  min-height: 100vh;
  display: inline-block;
  color: white;
  padding-bottom: 600px;
  position: relative;
  padding-bottom: 40px;
  z-index: 4;

`

const TabletIconDiv = Styled.div`
  height: 60px;
  width: 60px;
  position: absolute;
  top: 22px;
  left: 50px;

`
const NavDivFixedTop = Styled.div`
  background-color: ${BG_COLOR};
  height: 100%;
  min-height: 100vh;
  overflow: scroll;
  min-width: 180px;
  display: inline-block;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  padding-top: 40px;
  padding-bottom: 600px;
`

const ListDiv = Styled.div`
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid grey;
  text-align: left;
  font-size: 18px;
  color: white;
  cursor: pointer;
  margin-top: 6px;
  div{
    display: none;
    z-index: 4;
    &:hover{
      block !important;
    }
   
  }
  &:hover{
    div{
      display: block;
      &:hover{
        block !important;
      }
    }
    
  }
`

export default DashboardNavigation
