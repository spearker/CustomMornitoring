import React, {useState} from "react";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import {ROUTER_MENU_LIST} from "../../Common/routerset";
import DashboardWrapContainer from "../../Containers/DashboardWrapContainer";
import InnerBodyContainer from "../../Containers/InnerBodyContainer";
import SearchInput from "../../Components/Input/SearchInput";
import NumberPagenation from "../../Components/Pagenation/NumberPagenation";

const OptimalSPMStatistics = () => {
    const data = [{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    },{
        productName: '제품명 1',
        machineName: '기계명 1',
        moldInfo: '금형 정보',
        optimalSPM: '100'
    }]
    const [selectState, setSelectState] = useState<number>(-1)
    const [page, setPage] = useState<number>(1)
    return (
        <DashboardWrapContainer index={15}>
            <SubNavigation list={ROUTER_MENU_LIST[15]}/>
            <InnerBodyContainer>
                <div style={{position:'relative', textAlign:'left', marginTop:48, width: "100%"}}>
                    <div style={{display:'flex', textAlign:'left', flexDirection: 'row', justifyContent: 'space-between', width: "100%", marginBottom: 20}}>
                        <div>
                            <span style={{fontSize:20, marginRight:18, marginLeft: 3, fontWeight: 'bold'}}>최적 SPM 분석</span>
                        </div>
                        <div style={{width: 336, height: 30}}>
                            <SearchInput onClickEvent={() => {}} description={'검색어를 입력해주세요'} onChangeEvent={() => {}} value={''} />
                        </div>
                    </div>
                    <div style={{borderRadius: 6, backgroundColor: '#111319', width: "100%", height: 40, flexDirection: 'row', display:"flex", paddingTop: 10, paddingLeft: 20, paddingRight: 10}}>
                        <div style={{width: '25%', alignItems: 'center', verticalAlign:'middle'}}>
                            <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"left"}}>제품명</p>
                        </div>
                        <div style={{width: '25%', alignItems: 'center', verticalAlign:'middle'}}>
                            <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"left"}}>기계명</p>
                        </div>
                        <div style={{width: '25%', alignItems: 'center', verticalAlign:'middle'}}>
                            <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"left"}}>금형 정보</p>
                        </div>
                        <div style={{width: '25%', alignItems: 'center', verticalAlign:'middle'}}>
                            <p style={{fontSize: 18, fontWeight: 'bold', textAlign:"left"}}>최적 SPM</p>
                        </div>
                    </div>
                    <div style={{marginTop: 1, marginBottom: 10, height: 608}}>
                        {
                            data && data.map((item, index) => {
                                if(index <= (10*page)-1 && index >= (10*page)-10) {
                                    return (
                                        <div
                                            style={{
                                                marginTop: 12, borderRadius: 6,
                                                backgroundColor: selectState === index ? '#19b9df' : '#353b48',
                                                width: "100%", height: 40, flexDirection: 'row', display: "flex",
                                                paddingTop: 10, paddingLeft: 20, paddingRight: 10
                                            }}
                                            onClick={() => {
                                                if (selectState === index) {
                                                    setSelectState(-1)
                                                } else {
                                                    setSelectState(index)
                                                }

                                            }}
                                        >
                                            <div style={{width: '25%', alignItems: 'center', verticalAlign: 'middle'}}>
                                                <p style={{
                                                    fontSize: 18,
                                                    textAlign: "left",
                                                    fontWeight: selectState === index ? 'bold' : 'normal'
                                                }}>{item.productName}</p>
                                            </div>
                                            <div style={{width: '25%', alignItems: 'center', verticalAlign: 'middle'}}>
                                                <p style={{
                                                    fontSize: 18,
                                                    textAlign: "left",
                                                    fontWeight: selectState === index ? 'bold' : 'normal'
                                                }}>{item.machineName}</p>
                                            </div>
                                            <div style={{width: '25%', alignItems: 'center', verticalAlign: 'middle'}}>
                                                <p style={{
                                                    fontSize: 18,
                                                    textAlign: "left",
                                                    fontWeight: selectState === index ? 'bold' : 'normal'
                                                }}>{item.moldInfo}</p>
                                            </div>
                                            <div style={{width: '25%', alignItems: 'center', verticalAlign: 'middle'}}>
                                                <p style={{
                                                    fontSize: 18,
                                                    textAlign: "left",
                                                    fontWeight: selectState === index ? 'bold' : 'normal'
                                                }}>{item.optimalSPM}</p>
                                            </div>
                                        </div>)
                                }else{
                                    return
                                }
                            })
                        }
                        <NumberPagenation onClickEvent={(e) => setPage(e)} selected={page} stock={data.length%10 === 0 ? Math.floor(data.length/10) : Math.floor(data.length/6)+1} ></NumberPagenation>
                    </div>
                </div>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

export default OptimalSPMStatistics
