import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import { BG_COLOR_SUB2, BG_COLOR_SUB, BG_COLOR, POINT_COLOR } from '../../Common/configset';
import IMG_MAP from '../../Assets/Images/img_map_readytime.png'
import IMG_TIME from '../../Assets/Images/img_timeline.png'
import IMG_KEY from '../../Assets/Images/img_time_key_qdc.png'
import { changeStatusToString } from '../../Common/statusFunctions';
import moment from 'moment';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.widgets.js';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
import Chart from 'react-apexcharts'
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const dummy_machines = [
  {
    pk: '0001',
    name: '프레스 01',
    ton: 800,
    temperature: "27.5",
    ampare: "000.0",
    pressure: "20",
    status: 'active',
    code: '0000-0000-0000',
  
  },
  {
    pk: '0002',
    name: '프레스 02',
    ton: 800,
    temperature: "27.5",
    ampare: "000.0",
    pressure: "14",
    status: 'active',
    code: '0000-0000-0000',
  
  },
  {
    pk: '0003',
    name: '프레스 03',
    ton: 800,
    temperature: "27.5",
    ampare: "000.0",
    pressure: "15",
    status: 'active',
    code: '0000-0000-0000',
  
  },
  {
    pk: '0004',
    name: '프레스 04',
    ton: 800,
    temperature: "27.5",
    ampare: "000.0",
    pressure: "13",
    status: 'active',
    code: '0000-0000-0000',
  
  },
  {
    pk: '0005',
    name: '프레스 05',
    ton: 800,
    temperature: "27.5",
    ampare: "000.0",
    pressure: "33",
    status: 'active',
    code: '0000-0000-0000',
  
  },
  {
    pk: '0006',
    name: '프레스 06',
    ton: 800,
    temperature: "27.5",
    ampare: "000.0",
    pressure: "26",
    status: 'active',
    code: '0000-0000-0000',
  
  },
  {
    pk: '0007',
    name: '프레스 07',
    ton: 800,
    temperature: "27.5",
    ampare: "000.0",
    pressure: "32",
    status: 'active',
    code: '0000-0000-0000',
  
  },
  
 
]

const dummy_xy = [ 
  {x: 105 ,y: 66},
  {x: 185 ,y: 66},
  {x: 265 ,y: 66},
  {x: 340 ,y: 66},
  {x: 420 ,y: 66},
  {x: 500 ,y: 66},
  {x: 650 ,y: 200},

]

const ranges = [
  {
    value:70, //end value of range, type=number, required 
    color:"#13e1f9" //color of range, type=string, default='#000'
  },
  {
    value:110,
    color:"#ff090f"
  },
  {
    value:120,
    color:"#f5c125"
  }
]


   
   
const OilMaintenanceContainer = () => {

  const [selectedMachine, setSelectedMachine] = useState<any>('');
  const TODAY_START = new Date(moment().format('YYYY-MM-DD 00:00:00')).getTime();
  const TODAY_END = new Date(moment().format('YYYY-MM-DD 24:00:00')).getTime();

  const getWidthPercent = ( start, end ) =>{
    return Math.floor((new Date(moment().format(end)).getTime() - new Date(moment().format(start)).getTime()) / (TODAY_END - TODAY_START) * 100)
  }
  useEffect(()=>{
   
  },[])
  
  const dataSource = {
    chart: {
      caption: "",
      lowerlimit: "0",
      upperlimit: "100",
      showvalue: "1",
      numbersuffix: "",
      theme: "fusion",
      showtooltip: "0"
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "50",
          code: "#03CB17"
        },
        {
          minvalue: "50",
          maxvalue: "75",
          code: "#18B9DFs"
        },
        {
          minvalue: "75",
          maxvalue: "100",
          code: "#FF3319"
        }
      ]
    },
    dials: {
      dial: [
        {
          value: selectedMachine !== '' ? selectedMachine.pressure : "0"
        }
      ]
    }
  };

  const chartConfigs = {
    type: "angulargauge",
    width: 300,
    height:  150,
    dataFormat: "JSON",
             
    dataSource: dataSource
  };

  return (
    <div>
      <div style={{position:'relative', textAlign:'left', marginTop:48}}>
        
        <div style={{display:'inline-block', textAlign:'left'}}>           
          <span style={{fontSize:20, marginRight:18, marginLeft: 3}}>오일 펌프 보전 관리</span>
        </div>
      </div>
      <MapFlexBox>
          <MapBox>
              <img src={IMG_MAP} />
              {
                dummy_machines.map((m, i)=>{
                  if(selectedMachine.pk == m.pk){
                  
                  return(
                    <PressSimbolSelected
                      key={'sp-'+ i} 
                      onClick={()=>setSelectedMachine(m)}
                      style={{ left: dummy_xy[i].x, top: dummy_xy[i].y}}>
                      {m.name}<br />({m.ton}ton)
                    </PressSimbolSelected>
                  )
                  }else{
                    return(
                      <PressSimbol
                        key={'sp-'+ i} 
                        onClick={()=>setSelectedMachine(m)}
                        style={{ left: dummy_xy[i].x, top: dummy_xy[i].y}}>
                        {m.name}<br />({m.ton}ton)
                      </PressSimbol>
                    )
                  }

                })
              }
          </MapBox>
          <SideInfoBox>
              {
                selectedMachine == '' ?
                <HintText>기계를 선택해주세요<br/></HintText>
                :
                <>
                <p>{selectedMachine.name}</p>
           
                </>
              }
            
            {
                selectedMachine !== '' &&
                <>
                <div style={{display: 'flex', width: '100%', marginTop:18, marginBottom:23}}>
                  <div style={{flex:1, marginRight: 12}}>
                  <UnderBarText>현재온도</UnderBarText>
                  <BigDataText>
                    {selectedMachine.temperature}<span>℃</span>
                  </BigDataText>
                  </div>
                  <div style={{flex:1, marginLeft: 12}}>
                  <UnderBarText>전류량</UnderBarText>
                  <BigDataText>
                    {selectedMachine.ampare}<span>A</span>
                  </BigDataText>
                  </div>
               
                </div>
                <div >
                <UnderBarText>현재압력</UnderBarText>
                <BigDataText style={{textAlign:'right', float:'right'}}>
              
              {selectedMachine.pressure}<span>pa</span>
           </BigDataText> 
                <CharBox>
                  <ReactFC {...chartConfigs} />
                </CharBox>

                
              
               
                </div>
                </>
          }

          </SideInfoBox>
      </MapFlexBox>
      
        {
          selectedMachine == '' ?
          <NoTimeDataBox>
            기계를 선택해주세요.
          </NoTimeDataBox>
          :
          <TimeLineBox>
  
          </TimeLineBox>
        }
    </div>
  );
}

const CharBox = Styled.div`
  float: left;
  rect{
    fill: #17181c !important;
    text{
      fill: #dddddd !important;
    }
  }
  .raphael-group-65-pointGroup{
    path{
      fill: #cccccc !important;
    }

  }
  text{
    fill: #dddddd !important;
  }
  .raphael-group-peIslfpg{
    text{
      fill: #17181c !important;
    }
  }
`

const SummuryBox = Styled.div`
  
  div{
    margin-top: 10px;
    text-align: left;
    padding: 19px;
    color: #b3b3b3;
    background-color: #3c4353;
    border-radius: 6px;
    margin-bottom: 12px;
    font-size: 15px;
    p{
      font-size: 15px;
    }
  }
  margin-top: 24px;
`


const TimeBarWrapper = Styled.div`
  margin-top: 40px;
  background-color: #191d27;
  padding-top: 60px;
  padding-bottom: 60px;
  border-radius: 6px;
  font-size: 18px;
  text-align: center;
  img{
    width: 980px;

  }
 
`

const UnderBarText = Styled.p`
  font-size: 18px;
  border-bottom: 1px solid #aaaaaa90;
  padding-bottom: 3px;


`

const BigDataText = Styled.p`
  padding-top: 8px;
  font-size: 35px !important;
  text-align: right;
  flex: 1;
  span{
    font-size: 18px;
    padding-left: 6px;
  }

`

const ImgKey = Styled.img`
  width: 200px;
  margin-right: 60px;
  margin-top: 17px;
  float: right;


`
const TimeBar = Styled.div`
  text-align: left;
  width: 960px;
  height: 44px;
  background-color: #717c90;
  border-radius: 6px; 
  display: inline-block;


`

const PacketError = Styled.div`
  height: 100%;
  display: inline-block;
  position: relative;
  p{
    position: absolute;
    top: -30px;
    color: red;
    font-size: 15px;
    font-weight: bold;
    white-space: nowrap;
    left: -10px;
  }
`
const Packet = Styled.div`
  height: 100%;
  display: inline-block;
  div{
    visibility: hidden;
  }
  &:hover{
    position: relative;
    div{
      visibility: visible;
    }
  }
`

const PacketTag = Styled.div`
  color: #252525;


    padding: 9px 19px;
    background-color: white;
    border-radius: 10px;
    font-size: 15px;
    position: absolute;
    top: -70px;
    min-width: 100px;
    left: -10px;

`

const MapBox = Styled.div`
  background-color: #17181c;
  padding: 10px;
  position: relative;
  border-radius: 6px;
  width: 70%;
  margin-right: 20px;
  img{
    width: 100%;
  }

`

const HintText = Styled.p`
  color: #515664;
  
`

const TimeLineBox = Styled.div`
    background-color: #2b2c3b;
    padding: 14px 19px 27px 14px;
    min-height: 370px;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 6px;
    p{
      text-align: left;
    }
  
`

const NoTimeDataBox = Styled.div`
    margin-top: 20px;
    color: #515664;
    font-size: 18px;
    padding: 12px;
    background-color: #252525;
`
const SideInfoBox = Styled.div`
  background-color: #17181c;
  padding: 12px 19px;
  border-radius: 6px;
  width: 30%;
  color: white;
  text-align: left;
  p{
    font-size: 18px;
  }
`
const MapFlexBox = Styled.div`
  display: flex;
  margin-top: 21px;
`
const PressSimbol = Styled.div`
  background-color: #717c90;
  border-radius: 6px;
  width: 50px;
  position: absolute;
  font-size: 10px;
  min-height: 40px;
  font-weight: bold;
  padding: 4px;
  text-align: center;
  cursor: pointer;
`

const PressSimbolSelected = Styled.div`
  background-color: ${POINT_COLOR};
  border-radius: 6px;
  width: 50px;
  position: absolute;
  font-size: 10px;
  min-height: 40px;
  font-weight: bold;
  padding: 4px;
  text-align: center;
  cursor: pointer;

`
export default OilMaintenanceContainer;