import React, {useState} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import HeaderLive from '../../Components/Text/HeaderLive';
import MonitoringToggle from '../../Components/Toggle/MonitoringToggle';
import TEMP_IMG_1 from '../../Assets/Images/monitoring_loadton.png'
// 로드톤 모니터링
const Old_LoadtonMonitoring = () => {

    const [statusFilter,setStatusFilter ]  = useState<string>('')
    const [arrayType, setArrayType] = useState<number>(0); //['공장 모니터링' , '기계별 모니터링']

  return (
      <DashboardWrapContainer index={'monitoring'}>

        <InnerBodyContainer>
          <div style={{position:'relative'}}>
              <HeaderLive title={ ' 로드톤 모니터링'} isTurn={true}/>

          </div>
          <div style={{textAlign:'left', marginBottom: 20}}>
          <MonitoringToggle contents={['공장 로드모니터 현황', '장비별 로드모니터 현황']} select={arrayType} onClickEvent={setArrayType}/>
          </div>

       {
           arrayType === 0 ?
               <div style={{position:'relative'}}>
                   <img src={TEMP_IMG_1} style={{marginTop:15,width:1100,height:780}}/>

                   <p style={{position:"absolute",left:238,top:73,fontSize:12}}>프레스01</p>
                   <p style={{position:"absolute",left:242,top:89,fontSize:10}}>1000ton</p>
                   <p style={{position:"absolute",left:271,top:177,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:271,top:197,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:263,top:217,fontSize:12, color:'#000'}}>3,800A</p>

                   <p style={{position:"absolute",left:358,top:73,fontSize:12}}>프레스02</p>
                   <p style={{position:"absolute",left:366,top:89,fontSize:10}}>800ton</p>
                   <p style={{position:"absolute",left:390,top:177,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:390,top:197,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:392,top:217,fontSize:12, color:'#000'}}>800A</p>

                   <p style={{position:"absolute",left:478,top:73,fontSize:12}}>프레스03</p>
                   <p style={{position:"absolute",left:487,top:89,fontSize:10}}>800ton</p>
                   <p style={{position:"absolute",left:512,top:177,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:512,top:197,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:505,top:217,fontSize:12, color:'#000'}}>1,800A</p>

                   <p style={{position:"absolute",left:598,top:73,fontSize:12}}>프레스04</p>
                   <p style={{position:"absolute",left:607,top:89,fontSize:10}}>800ton</p>
                   <p style={{position:"absolute",left:630,top:177,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:630,top:197,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:632,top:217,fontSize:12, color:'#000'}}>700A</p>

                   <p style={{position:"absolute",left:718,top:73,fontSize:12}}>프레스05</p>
                   <p style={{position:"absolute",left:724,top:89,fontSize:10}}>1000ton</p>
                   <p style={{position:"absolute",left:750,top:177,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:750,top:197,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:742,top:217,fontSize:12, color:'#000'}}>2,100A</p>

                   <p style={{position:"absolute",left:838,top:73,fontSize:12}}>프레스06</p>
                   <p style={{position:"absolute",left:842,top:89,fontSize:10}}>1000ton</p>
                   <p style={{position:"absolute",left:870,top:177,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:870,top:197,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:862,top:217,fontSize:12, color:'#000'}}>2,100A</p>

                   <p style={{position:"absolute",left:958,top:73,fontSize:12}}>프레스07</p>
                   <p style={{position:"absolute",left:962,top:89,fontSize:10}}>1000ton</p>
                   <p style={{position:"absolute",left:990,top:177,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:990,top:197,fontSize:12, color:'#000'}}>100%</p>
                   <p style={{position:"absolute",left:983,top:217,fontSize:12, color:'#000'}}>2,100A</p>

               </div>
           :

                <div style={{
                    position: 'relative',
                    marginTop: 13,
                    width: 'calc(100% - 20px)',
                    height: 750,
                    backgroundColor: '#242933',
                    borderRadius: 8,

                    padding:10,

                }}>
                    <div style={{margin: 10}}>
                        <p style={{textAlign: "left", marginTop:10, fontSize: 20}}>1공장</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}>
                    {
                        dataSet.LoadTonData &&
                            dataSet.LoadTonData.map((item, index) => {
                                // return(<LoadTonCard title={item.title} color={index} propData={{today: item.today, yesterday: item.yesterday}} limit={item.limit}/>)
                            })
                    }
                    </div>
                </div>
}
            </InnerBodyContainer>

      </DashboardWrapContainer>

  );
}

const WrapBox = Styled.div`
    text-align: left;
    margin-top: 24px;
    position: relative;
    display: block;
    margin-bottom: 2px;
`

export default Old_LoadtonMonitoring;
