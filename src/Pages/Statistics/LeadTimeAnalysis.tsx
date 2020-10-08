import React, {useState} from 'react';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import Styled from 'styled-components'

const LeadTimeAnalysis = () => {
    const [data, setData] = useState<LeadTimeAnalysis[]>([
        {
            name: '제품명 1',
            factoryInfo: '공정 정보',
            material: '자재 1',
            goal: '9,999,999,999ea',
            date: {
                start: '20.06.08',
                finish: '20.08.08'
            },
            timeLine: ['00업체 품번 00-000-000자재 00톤 입고', '00자재 01공정 이동', '01공정 반자재 품번 00-000, 02 공정 이동', '제품 전체 생산 완료'],
            time: ['06:00', '06:40', '15:00', '23:49']
        },{
            name: '제품명 1',
            factoryInfo: '공정 정보',
            material: '자재 1',
            goal: '9,999,999,999ea',
            date: {
                start: '20.06.08',
                finish: '20.08.08'
            },
            timeLine: ['00업체 품번 00-000-000자재 00톤 입고', '00자재 01공정 이동', '01공정 반자재 품번 00-000, 02 공정 이동', '제품 전체 생산 완료'],
            time: ['06:00', '06:40', '15:00', '23:49']
        },{
            name: '제품명 1',
            factoryInfo: '공정 정보',
            material: '자재 1',
            goal: '9,999,999,999ea',
            date: {
                start: '20.06.08',
                finish: '20.08.08'
            },
            timeLine: ['00업체 품번 00-000-000자재 00톤 입고', '00자재 01공정 이동', '01공정 반자재 품번 00-000, 02 공정 이동', '제품 전체 생산 완료'],
            time: ['06:00', '06:40', '15:00', '23:49']
        },{
            name: '제품명 1',
            factoryInfo: '공정 정보',
            material: '자재 1',
            goal: '9,999,999,999ea',
            date: {
                start: '20.06.08',
                finish: '20.08.08'
            },
            timeLine: ['00업체 품번 00-000-000자재 00톤 입고', '00자재 01공정 이동', '01공정 반자재 품번 00-000, 02 공정 이동', '제품 전체 생산 완료'],
            time: ['06:00', '06:40', '15:00', '23:49']
        },{
            name: '제품명 1',
            factoryInfo: '공정 정보',
            material: '자재 1',
            goal: '9,999,999,999ea',
            date: {
                start: '20.06.08',
                finish: '20.08.08'
            },
            timeLine: ['00업체 품번 00-000-000자재 00톤 입고', '00자재 01공정 이동', '01공정 반자재 품번 00-000, 02 공정 이동', '제품 전체 생산 완료'],
            time: ['06:00', '06:40', '15:00', '23:49']
        }
    ])

    const [ selectState, setSelectState ] = useState<number>(-1)
    const [ tlSelectState, setTlSelectState ] = useState<number>(-1)

    return (
        <DashboardWrapContainer index={15}>
            <SubNavigation list={ROUTER_MENU_LIST[15]}/>
            <InnerBodyContainer>
                <div>
                    <div style={{position:'relative', textAlign:'left', marginTop:48}}>

                        <div style={{display:'inline-block', textAlign:'left'}}>
                            <span style={{fontSize:20, marginRight:18, marginLeft: 3, fontFamily: 'NotoSansCJKkr-Bold', fontWeight: 'bold'}}>제조 리드타임 분석</span>
                        </div>
                    </div>
                    <div style={{marginTop: 23}}>
                        <div style={{borderRadius: 6, backgroundColor: '#111319', width: "100%", height: 40, flexDirection: 'row', display:"flex", paddingTop: 10, paddingLeft: 20, paddingRight: 10}}>
                            <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"left"}}>제품명</p>
                            </div>
                            <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"left"}}>공정 정보</p>
                            </div>
                            <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"left"}}>자재 명칭</p>
                            </div>
                            <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"left"}}>목표 생산량</p>
                            </div>
                            <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"left"}}>생산 기간</p>
                            </div>
                        </div>
                        <div style={{marginTop: 1}}>
                            {
                                data && data.map((item, index) => {
                                    return (
                                        <div
                                            style={{marginTop: 12, borderRadius: 6,
                                                backgroundColor: selectState === index ? '#19b9df' : '#353b48',
                                                width: "100%", height: 40, flexDirection: 'row', display:"flex",
                                                paddingTop: 10, paddingLeft: 20, paddingRight: 10}}
                                            onClick={() => {
                                                if(selectState === index){
                                                    setSelectState(-1)
                                                }else{
                                                    setSelectState(index)
                                                }

                                            }}
                                        >
                                        <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                            <p style={{fontSize: 18, textAlign:"left", fontWeight: selectState === index ? 'bold' : 'normal'}}>{item.name}</p>
                                        </div>
                                        <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                            <p style={{fontSize: 18, textAlign:"left", fontWeight: selectState === index ? 'bold' : 'normal'}}>{item.factoryInfo}</p>
                                        </div>
                                        <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                            <p style={{fontSize: 18, textAlign:"left", fontWeight: selectState === index ? 'bold' : 'normal'}}>{item.material}</p>
                                        </div>
                                        <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                            <p style={{fontSize: 18, textAlign:"left", fontWeight: selectState === index ? 'bold' : 'normal'}}>{item.goal}</p>
                                        </div>
                                        <div style={{width: '20%', alignItems: 'center', verticalAlign:'middle'}}>
                                            <p style={{fontSize: 18, textAlign:"left", fontWeight: selectState === index ? 'bold' : 'normal'}}>
                                                {item.date.start + "-" + item.date.finish}
                                            </p>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>

                            {
                                selectState === -1

                                    ? <div style={{
                                        borderRadius: 6, backgroundColor: '#111319', width: "103%", height: 40, flexDirection: 'row', display:"flex", paddingTop: 10,
                                        marginTop: 15
                                    }}>
                                        <div style={{width: '100%', alignItems: 'center', verticalAlign:'middle'}}>
                                            <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"center", color: "#666d79"}}>제품을 선택해 주세요.</p>
                                        </div>
                                    </div>
                                    : <div style={{
                                        width: "100%", height: 410, backgroundColor: '#353b48', marginTop: 15, borderRadius: 6, padding: 10,
                                        display: "flex", flexDirection: 'row'
                                    }}>
                                        <div style={{flexDirection: 'row', display: "flex", width: 275, height: "100%"}}>
                                            <table style={{width: "100%", height: "95%"}}>
                                                <tr style={{height: "40%", verticalAlign:"text-top"}}>
                                                    <td><ItemHeader>제조 리드타임</ItemHeader></td>
                                                    <td><ItemContent>13:30:29</ItemContent></td>
                                                </tr>
                                                <tr>
                                                    <td><ItemHeader>목표 생산량</ItemHeader></td>
                                                    <td><ItemContent>6,000</ItemContent></td>
                                                </tr>
                                                <tr>
                                                    <td><ItemHeader>생산량</ItemHeader></td>
                                                    <td><ItemContent>5,500</ItemContent></td>
                                                </tr>
                                                <tr>
                                                    <td><ItemHeader>불량 발생수</ItemHeader></td>
                                                    <td><ItemContent>500</ItemContent></td>
                                                </tr>
                                                <tr>
                                                    <td><ItemHeader>에러횟수</ItemHeader></td>
                                                    <td><ItemContent>18회</ItemContent></td>
                                                </tr>
                                                <tr>
                                                    <td><ItemHeader>가동시간</ItemHeader></td>
                                                    <td><ItemContent>29h</ItemContent></td>
                                                </tr>
                                                <tr>
                                                    <td><ItemHeader>비가동시간</ItemHeader></td>
                                                    <td><ItemContent>16h</ItemContent></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div style={{width: 825, height: "100%", backgroundColor: "#111319", borderRadius: 6, display: "flex", flexDirection: 'row'}}>
                                            <div style={{marginTop: 32, marginLeft: 56}}>
                                            {
                                                selectState !== -1 &&
                                                data[selectState].timeLine.map((item, index) => {
                                                    return (<div>
                                                        <div style={{height: 78, display: "flex", flexDirection: 'row'}}>
                                                            <div style={{width: 100}}>
                                                                <p style={{color: '#b3b3b3', fontSize: 15, marginRight: 12.5}}>{index === 0 ? "2020.06.02" : ""}</p>
                                                            </div>
                                                            <div style={{
                                                                height: "100%", borderLeft: "solid", borderLeftWidth: index === data[selectState].timeLine.length-1 ? 0 : 1, borderLeftColor: '#707070',
                                                                display: "flex", flexDirection: 'row'
                                                            }}>
                                                                <div style={{width: 6, height: 6, borderRadius: 3, backgroundColor: 'white', position: "relative", top: 0, left: -3}}/>
                                                                <div style={{
                                                                    height: 30, backgroundColor: tlSelectState === index ? '#19b9df' : '#353b48', padding: 5, borderRadius: 6, marginLeft: 7.6,
                                                                    paddingLeft: 20, paddingRight: 20
                                                                }} onClick={() => setTlSelectState(index)}>
                                                                    <p>{item}</p>
                                                                </div>
                                                                <div style={{padding: 5, marginLeft: 16}}>{data[selectState].time[index]}</div>
                                                            </div>
                                                        </div>
                                                    </div>)
                                                })
                                            }
                                            </div>
                                            <div>
                                                {
                                                    (tlSelectState === 1 || tlSelectState === 2) &&
                                                    <div style={{
                                                        width: 185, height: 135, borderRadius: 6, backgroundColor: '#353b48',
                                                        marginTop: (tlSelectState*60)+5, marginLeft: 25, padding: 15
                                                    }}>
                                                        <p style={{fontSize: 15, fontWeight: "bold", textAlign: "left"}}>{"0" + tlSelectState} 공정 이동</p>
                                                        <p style={{fontSize: 15, textAlign: "left", marginTop: 10}}>목표 생산량 : 9,999,999ea</p>
                                                        <p style={{fontSize: 15, textAlign: "left", marginTop: 10}}>생산량 : 9,999,999ea</p>
                                                        <p style={{fontSize: 15, textAlign: "left", marginTop: 10}}>불량 발생 수 : 9,999,999ea</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                            }


                    </div>
                </div>
            </InnerBodyContainer>
        </DashboardWrapContainer>

    );
}

const ItemHeader = Styled.p`
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    margin-left: 20px;
`

const ItemContent = Styled.p`
    font-size: 18px;
    text-align: left;`


export default LeadTimeAnalysis;
