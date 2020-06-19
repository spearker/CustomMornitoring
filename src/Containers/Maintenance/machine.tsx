import React, {useEffect, useState, useContext, useCallback, ReactElement, SetStateAction} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";

import Calendar from 'react-calendar';
import './calendar.css';
import { Modals } from './Modal';
import ModalA from "./Modal/ModalA";
import ModalB from "./Modal/ModalB";
import ModalC from "./Modal/ModalC";
import ModalD from "./Modal/ModalD";
import {Button} from "antd";
import { Link } from 'react-router-dom';
//기계 보전 관리

//어려움 캘린더 등이 눌리거나 팝업 기능이 있어서 1명이 온전히 작업 필요
//캘린더 api 는 react-calendar
//사용법 : https://www.npmjs.com/package/react-calendar

interface MachineProps {
  color: string,
  name: string,
  capacity: number,
  index: number,
  handleClick: Function,
  picked: boolean,
}

interface StatusProps {
  color: string,
  status: string,
}

interface ThermometerProps {
  left: {
    title: string,
    content: string,
  },
  thermometer: {
    limit: string,
    percentage: number,
    color: string,
  },
  colorVersion: boolean,
  modals: Modals,
  setModals: React.Dispatch<SetStateAction<Modals>>,
}

interface NonThermometerProps {
    title: string,
    msg: string,
    colorVersion: boolean,
    modals: Modals,
    setModals: React.Dispatch<SetStateAction<Modals>>,
}

interface ModalProps {
    modals: Modals,
    setModals: React.Dispatch<SetStateAction<Modals>>,
}

interface Selected {
  pressed: number,
  date?: Date | undefined,
}

const Machine: React.FunctionComponent<MachineProps> = ({ color, name, capacity, index, handleClick, picked }) => {
  return (
    <div style={{ flexDirection: 'column', display: 'flex', width: 69, height: 242, backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }}>
      <div style={{ width: 69, height: 59, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: color, flexDirection: 'column',
        borderStyle: 'solid', borderColor: picked ? '#fff' : color, borderWidth: picked ? 3 : 0,
      }}
        onClick={() => handleClick(index)}
      >
        <p style={{ fontSize: 12, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>
          {name}
        </p>
        <p style={{ fontSize: 12, textAlign: 'center', color: '#fff', fontWeight: 400 }}>
          {`(${capacity}ton)`}
        </p>
      </div>
      {/*<div style={{ width: 0, height: 129.1, opacity: 0.71, border: 'solid 3px #3c4353', backgroundColor: 'rgba(0, 0, 0, 0)' }} />*/}
      {/*<div style={{ display: 'flex', flexDirection: 'row', width: 140, height: 59, justifyContent: 'center', alignItems: 'center' }}>*/}
      {/*  <div style={{ width: 18, height: 0, opacity: 0.71, border: 'solid 3px #3c4353', backgroundColor: 'rgba(0, 0, 0, 0)' }} />*/}
      {/*  <div style={{ width: 69, height: 59, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1, backgroundColor: '#717c90', flexDirection: 'column' }} />*/}
      {/*  <div style={{ width: 18, height: 0, opacity: 0.71, border: 'solid 3px #3c4353', backgroundColor: 'rgba(0, 0, 0, 0)' }} />*/}
      {/*</div>*/}
    </div>
  );
}

const MachineStatus: React.FunctionComponent<StatusProps> = ({ color, status}) => {
  return (
    <div style={{ width: 54, height: 20, borderRadius: 6, backgroundColor: color, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p style={{ color: '#fff', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>
        {status}
      </p>
    </div>
  );
}

const ThermometerComponent: React.FunctionComponent<ThermometerProps> = ({ left, thermometer, colorVersion, modals, setModals }) => {
  return (
      <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexDirection: 'column', height: 76, paddingLeft: 20, width: 113 }}>
          <p style={{ color: '#fff', fontSize: 15, fontWeight: 'bold', textAlign: 'left' }}>
            {left.title}
          </p>
          <p style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'left' }}>
            {left.content}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 22 }}>
          {/* thermometer region */}
           <div style={{ width: 720, height: 14, borderRadius: 7, backgroundColor: '#fff', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <div
                style={{ backgroundColor: thermometer.color, borderRadius: 7, height: '100%', width: thermometer.percentage }}
              />
           </div>
           <div style={{ width: 720, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 4 }}>
             <p style={{ fontSize: 15, color: '#fff', textAlign: 'left', fontWeight: 'bold' }}>
               0
             </p>
             <p style={{ fontSize: 15, color: '#fff', textAlign: 'right', fontWeight: 'bold' }}>
               {thermometer.limit}
             </p>
           </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'column', height: 76, paddingRight: 20}}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30, width: 130, backgroundColor: colorVersion ? '#717c90' : '#17181c', borderRadius: 6 }}>
            <button style={{ textAlign: 'center', fontSize: 15, color: '#fff', fontWeight: 'bold' }} onClick={() => setModals({...modals, isOpenA: true})}>
              일정 추가
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30, width: 130, backgroundColor: colorVersion ? '#717c90' : '#17181c', borderRadius: 6 }}>
            <button style={{ textAlign: 'center', fontSize: 15, color: '#fff', fontWeight: 'bold' }} onClick={() => setModals({...modals, isOpenC: true})}>
              점검 이력 작성
            </button>
          </div>
        </div>
      </React.Fragment>
  );
}

const NonThermometerComponent: React.FunctionComponent<NonThermometerProps> = ({ title, msg, colorVersion, modals, setModals }) => {
    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexDirection: 'column', height: 76, paddingLeft: 20, width: 113 }}>
                <p style={{ color: '#fff', fontSize: 15, fontWeight: 'bold', textAlign: 'left' }}>
                    {title}
                </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: 720, height: 20 }}>
                <p style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                    {msg}
                </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'column', height: 76, paddingRight: 20}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30, width: 130, backgroundColor: colorVersion ? '#717c90' : '#17181c', borderRadius: 6 }}>
                    <button style={{ textAlign: 'center', fontSize: 15, color: '#fff', fontWeight: 'bold' }} onClick={() => setModals({...modals, isOpenA: true})}>
                        일정 추가
                    </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30, width: 130, backgroundColor: colorVersion ? '#717c90' : '#17181c', borderRadius: 6 }}>
                    <button style={{ textAlign: 'center', fontSize: 15, color: '#fff', fontWeight: 'bold' }} onClick={() => setModals({...modals, isOpenC: true})}>
                        점검 이력 작성
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

const Alarm: React.FunctionComponent<ModalProps> = ({ modals, setModals }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 50, backgroundColor: '#2b2c3b', marginTop: 4, borderRadius: 6 }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 20 }}>
            <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', width: 153, textAlign: 'left' }}>
                프레스 01
            </p>
            <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', width: 160, textAlign: 'left' }}>
                온도
            </p>
            <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', width: 72, textAlign: 'left' }}>
                2020.06.05
            </p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 98, height: 30,
                    borderRadius: 6, backgroundColor: '#717c90', marginLeft: 23 }}>
                <button style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    onClick={() => setModals({...modals, isOpenA: true})}>
                    일정 추가
                </button>
            </div>
        </div>
    </div>
  );
}

const Schedule: React.FunctionComponent<ModalProps> = ({ modals, setModals }) => {
  return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 50, backgroundColor: '#2b2c3b', marginTop: 4, borderRadius: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 20 }}>
              <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', width: 153, textAlign: 'left' }}>
                  프레스 01
              </p>
              <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', width: 109, textAlign: 'left' }}>
                  온도
              </p>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 98, height: 30,
                  borderRadius: 6, backgroundColor: '#717c90' }}>
                  <button style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    onClick={() => setModals({...modals, isOpenD: true})}>
                      일정 변경
                  </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 130, height: 30,
                  borderRadius: 6, backgroundColor: '#717c90', marginLeft: 16 }}>
                  <button style={{ fontSize: 15, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    onClick={() => setModals({...modals, isOpenC: true})}>
                      점검 이력 작성
                  </button>
              </div>
          </div>
      </div>
  );
}

const names = ['프레스 01', '프레스 02', '프레스 03', '프레스 04', '프레스 05', '프레스 06', '프레스 07'];
const MachineMaintenanceContainer = () => {
  const [state, setState] = React.useState<Selected>({
    pressed: -1,
  })
  const [modals, setModals] = React.useState<Modals>({
      isOpenA: false,
      isOpenB: false,
      isOpenC: false,
      isOpenD: false,
  })

  const handleClick = (pressedIdx: number) => {
    if (pressedIdx > -1)
      setState({ pressed: pressedIdx, date: undefined });
  };

  let { pressed, date } = state;
  let { isOpenA, isOpenB, isOpenC, isOpenD } = modals;
  return (
      <React.Fragment>
        <ModalA isOpen={isOpenA} modals={modals} setOpen={setModals} />
        <ModalB isOpen={isOpenB} modals={modals} setOpen={setModals} />
        <ModalC isOpen={isOpenC} modals={modals} setOpen={setModals} />
        <ModalD isOpen={isOpenD} modals={modals} setOpen={setModals} />
        <div>
          <DashboardWrapContainer index={5}>
            <SubNavigation list={ROUTER_MENU_LIST[5]}/>
            <InnerBodyContainer>
              <div style={{position:'relative'}}>
                <Header title={'기계 보전 관리'} />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div style={{ width: 752, height: 340, borderRadius: 6, backgroundColor: '#17181c', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div style={{ width: 730, height: 310, borderRadius: 6, border: 'solid 5px #3c4353', backgroundColor: '#191d27', display: 'flex',
                      justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                      {/* 공정 정보 */}
                      <p style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: 0.26, color: '#fff', padding: 20 }}>
                        1공장
                      </p>
                      <div style={{ display: 'flex', width: 630, height: 310, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'column' }}>
                        <div style={{ width: 630, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 31, }}>
                          <Machine color={'#ff341a'} name={'프레스 01'} capacity={1000} index={0} handleClick={handleClick} picked={pressed === 0} />
                          <Machine color={'#fd6b00'} name={'프레스 02'} capacity={800} index={1} handleClick={handleClick} picked={pressed === 1} />
                          <Machine color={'#28aeae'} name={'프레스 03'} capacity={500} index={2} handleClick={handleClick} picked={pressed === 2} />
                          <Machine color={'#28aeae'} name={'프레스 04'} capacity={300} index={3} handleClick={handleClick} picked={pressed === 3} />
                          <Machine color={'#fd6b00'} name={'프레스 05'} capacity={900} index={4} handleClick={handleClick} picked={pressed === 4} />
                          <Machine color={'#ff341a'} name={'프레스 06'} capacity={1200} index={5} handleClick={handleClick} picked={pressed === 5} />
                          <Machine color={'#28aeae'} name={'프레스 07'} capacity={700} index={6} handleClick={handleClick} picked={pressed === 6} />
                        </div>
                        <div style={{ width: 203, height: 20, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
                          <MachineStatus color={'#28aeae'} status={'양호'} />
                          <MachineStatus color={'#fd6b00'} status={'경고'} />
                          <MachineStatus color={'#ff341a'} status={'초과'} />
                        </div>
                      </div>
                    </div>
                    <div style={{ position: 'absolute', width: 112, height: 11, borderRadius: 6, backgroundColor: '#5f606e', top: 366, left: 171 }} />
                  </div>
                  <div style={{ width: 328, height: 340, borderRadius: 6, backgroundColor: '#17181c', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* react-calendar will be added. */}
                    <Calendar className={'whiteTheme'} value={date} onClickDay={(date: Date) => {
                      setState({ pressed: -1, date })
                    }}/>
                  </div>
                </div>
                { (pressed === -1 && date === undefined) &&
                  <div style={{ width: 1100, height: 50, borderRadius: 6, backgroundColor: '#17181c', marginTop: 20, display: 'flex',
                    justifyContent: 'center', alignItems: 'center'}}>
                    {/* 기게별 보전관리 */}
                    <p style={{ fontSize: 18, color: '#515664', fontWeight: 'bold', paddingLeft: 20, textAlign: 'center' }}>
                      기계 또는 날짜를 선택해 주세요
                    </p>
                  </div>
                }
                { pressed !== -1 && date === undefined &&
                    <React.Fragment>
                      <div style={{ width: 1100, height: 50, borderRadius: 6, backgroundColor: '#17181c', marginTop: 20, display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center'}}>
                        {/* 기게별 보전관리 */}
                        <p style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', paddingLeft: 20 }}>
                          기계별 보전관리
                        </p>
                        <div style={{ width: 88, height: 30, borderRadius: 6, backgroundColor: '#717c90', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                          <p style={{ textAlign: 'center', fontSize: 15, color: '#fff', fontWeight: 'bold', }}>
                              <Link to={'/maintenance/history'}>
                                  <Button>이력 보기</Button>
                              </Link>
                          </p>
                        </div>
                      </div>
                      <div style={{ width: 1100, height: 50, borderRadius: 6, backgroundColor: '#17181c', marginTop: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        {/* 프레스 01 */}
                        <p style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', paddingLeft: 20 }}>
                          {names[pressed]}
                        </p>
                      </div>
                      <div style={{ width: 1100, height: 106, backgroundColor: '#2b2c3b', marginTop: 10, display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-between', alignItems: 'center' }}>
                        <ThermometerComponent left={{ title: '온도', content: '적정'}} thermometer={{ limit: '100ºC', percentage: 500, color: '#fd6b00' }} colorVersion={true}
                            modals={modals} setModals={setModals} />
                      </div>
                      <div style={{ width: 1100, height: 106, backgroundColor: '#ff341a', marginTop: 4, display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* 오일 */}
                        <ThermometerComponent left={{ title: '오일', content: '5,000회 지남'}} thermometer={{ limit: '50,000회', percentage: 720, color: '#17181c' }} colorVersion={false}
                            modals={modals} setModals={setModals} />
                      </div>
                      <div style={{ width: 1100, height: 106, backgroundColor: '#ff341a', marginTop: 4, display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* 에러 횟수 */}
                        <NonThermometerComponent title={'에러 횟수'} msg={'00 : 에러내용.....'} colorVersion={false} modals={modals} setModals={setModals} />
                      </div>
                      <div style={{ width: 1100, height: 106, backgroundColor: '#ff341a', marginTop: 4, display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* 클러치&브레이크 */}
                        <NonThermometerComponent title={'클러치&브레이크'} msg={'교체 요망'} colorVersion={false} modals={modals} setModals={setModals} />
                      </div>
                    </React.Fragment>
                }
                { date !== undefined &&
                  <React.Fragment>
                    <div style={{ width: 1100, height: 50, borderRadius: 6, backgroundColor: '#17181c', marginTop: 20, display: 'flex',
                      justifyContent: 'space-between', alignItems: 'center'}}>
                      {/* 기게별 보전관리 */}
                      <p style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', paddingLeft: 20, textAlign: 'center' }}>
                        {date && `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}
                      </p>
                      <div style={{ width: 98, height: 30, backgroundColor: '#717c90', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6,
                            marginRight: 20 }}>
                        <button style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }} onClick={() => setModals({...modals, isOpenA: true})}>
                          일정 추가
                        </button>
                      </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                        {/* 보전 관리 알림 */}
                        <div style={{ width: 546, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ width: 546, height: 80, display: 'flex', flexDirection: 'column', paddingTop: 10, backgroundColor: '#17181c', borderRadius: 6 }}>
                            <p style={{ fontSize: 18, textAlign: 'left', color: '#fff', fontWeight: 'bold', paddingLeft: 20, }}>
                              보전관리 알림
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 11,
                                  width: 386, paddingLeft: 20 }}>
                              <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>
                                기계명
                              </p>
                              <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>
                                보전관리 내용
                              </p>
                              <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>
                                예상 점검일
                              </p>
                            </div>
                          </div>
                          <Alarm modals={modals} setModals={setModals} />
                          <Alarm modals={modals} setModals={setModals} />
                          <Alarm modals={modals} setModals={setModals} />
                        </div>
                        {/* 보전 관리 일정 */}
                        <div style={{ width: 546, display: 'flex', flexDirection: 'column', marginLeft: 9 }}>
                          <div style={{ width: 546, height: 80, display: 'flex', flexDirection: 'column', paddingTop: 10, backgroundColor: '#17181c', borderRadius: 6 }}>
                            <p style={{ fontSize: 18, textAlign: 'left', color: '#fff', fontWeight: 'bold', paddingLeft: 20,  }}>
                              보전관리 일정
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 11,
                              width: 244, paddingLeft: 20,  }}>
                              <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>
                                기계명
                              </p>
                              <p style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>
                                보전관리 내용
                              </p>
                            </div>
                          </div>
                          <Schedule modals={modals} setModals={setModals} />
                          <Schedule modals={modals} setModals={setModals} />
                          <Schedule modals={modals} setModals={setModals} />
                          <Schedule modals={modals} setModals={setModals} />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                }
              </div>
            </InnerBodyContainer>
          </DashboardWrapContainer>
        </div>
      </React.Fragment>
  );
}



export default MachineMaintenanceContainer;
