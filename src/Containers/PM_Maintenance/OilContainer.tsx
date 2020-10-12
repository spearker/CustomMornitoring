import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import moment from 'moment';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.widgets.js';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
import ReactApexChart from 'react-apexcharts'
import {API_URLS as URLS_PRE, getOilData} from "../../Api/pm/preservation";
import {API_URLS as URLS_MAP} from "../../Api/pm/map";
import MapBoard from "../../Components/Map/MapBoard";
import CalendarDropdown from "../../Components/Dropdown/CalendarDropdown";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const chartOption = {
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: true,
        zoom: false,
        zoomin: true,
        zoomout: true,
      }
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.35,
      opacityTo: 0,
    }
  },
  xaxis: {
    tickAmount: 24
  },
  grid:{
    borderColor: "#42444b",
    xaxis:{
      lines: {
        show: true
      }
    },
    yaxis:{
      lines: {
        show: true
      }
    }
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 20,
    labels:{
      show: true,
      formatter: (value) => {
        if(value === 100) {
          return "(%)"
        }else{
          if(value % 20 === 0){
            return Math.floor(value)
          }else{
            return
          }
        }
      }
    },
  },
  legend: {
    show: false
  },
  tooltip: {
    enable:false
  }
}

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

  const dummyData: { pressure_average:number, ampere: number, temperature: string, machine_name:string, pk: string, x_time: string[], y_pressure: number[] }= {
    pressure_average: 0,
    ampere: 0,
    temperature: "",
    machine_name: "",
    pk:"dummyPK1",
    x_time: [],
    y_pressure: [],
  }

  const [data, setData] = React.useState(dummyData)
  const [pressData,setPressData] = React.useState<{
    machine_name: string,
  pk: string,
  tons: number}>({
    machine_name: "제스텍 프레스 컨트롤러",
    pk: "v1_SIZL_machine_1_null_1",
    tons: 200
  })
  const TODAY_START = new Date(moment().format('YYYY-MM-DD 00:00:00')).getTime();
  const TODAY_END = new Date(moment().format('YYYY-MM-DD 24:00:00')).getTime();

  const [selectComponent, setSelectComponent] = useState<string>('');
  const [selectDate, setSelectDate] = useState<string>(moment().subtract(1, 'days').format('YYYY-MM-DD'))

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
          value: pressData.pk !== '' ? data.pressure_average : "0"
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

  const getWidthPercent = ( start, end ) =>{
    return Math.floor((new Date(moment().format(end)).getTime() - new Date(moment().format(start)).getTime()) / (TODAY_END - TODAY_START) * 100)
  }

  const getList = useCallback(async ()=>{
    const tempUrl = `${URLS_PRE['oil'].list}`
    const resultData= await getOilData(tempUrl);

    setPressData(resultData)

    getData()
  },[pressData, selectComponent])

  const getData = useCallback(async ()=>{
    const tempUrl = `${URLS_PRE['oil'].load}?pk=${selectComponent}&date=${selectDate}`
    const resultData = await getOilData(tempUrl);
    console.log("resultData", resultData)
    // if(index === '1'){
    //     setData(dummyData1)
    // }else if(index === '2'){
    //     setData(dummyData2)
    // }else if(index === '3'){
    //     setData(dummyData3)
    // }
    setData(resultData)

  },[ selectDate, selectComponent])

  useEffect(()=>{
    getList()
  },[selectComponent, selectDate])

  return (
    <div>
      <div style={{position:'relative', textAlign:'left'}}>
        <div style={{display:'inline-block', textAlign:'left',marginBottom: "15px" ,marginTop: "87px"}}>
          <p className="p-bold" style={{fontSize: 20 }}>오일 교환 및 보충</p>
        </div>
      </div>
        <MapBoard
            type={1}//0: 모니터링 1:통계/분석
            url={URLS_MAP.press.statics}
            select={selectComponent} //pk
            onChangeEvent={setSelectComponent}
        />

        {
          selectComponent == '' ?
          <NoTimeDataBox>
            기계를 선택해주세요.
          </NoTimeDataBox>
          :
              <BlackBg>
                  <div style={{display:"flex",flexDirection:"row"}}>
                <div>
                  <LineContainer>
                      <div style={{width: '100%',height: '20%',display: "flex", justifyContent: "center"}}>
                          <p style={{fontSize: 30,alignSelf: "center"}}>{data.machine_name}</p>
                      </div>
                      <div style={{display: 'flex', width: '100%', marginBottom:23}}>
                        <div style={{flex:1,marginLeft:12, marginRight: 12}}>
                          <UnderBarText>현재온도</UnderBarText>
                          <BigDataText>
                            {Number(data.temperature).toFixed(1)}<span>℃</span>
                          </BigDataText>
                        </div>
                        <div style={{flex:1, marginLeft: 12,marginRight:12}}>
                          <UnderBarText>전류량</UnderBarText>
                          <BigDataText>
                            {data.ampere}<span>A</span>
                          </BigDataText>
                        </div>

                      </div>
                      <div>
                        <UnderBarText>현재압력</UnderBarText>
                        <BigDataText style={{textAlign:'right', float:'right'}}>
                          {data.pressure_average}<span>pa</span>
                        </BigDataText>
                        <CharBox>
                          <ReactFC {...chartConfigs} />
                        </CharBox>
                      </div>
                  </LineContainer>
                </div>
                <GraphContainer>
                  {
                    <div>
                      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginLeft: 30,marginRight:30, paddingTop: 25 }}>
                        <div style={{alignSelf:"center"}}>
                          <p>일별 오일 펌프 기준 압력</p>
                        </div>
                        <CalendarDropdown type={'single'} select={selectDate} onClickEvent={(i) => setSelectDate(i)}></CalendarDropdown>
                      </div>
                      <ReactApexChart options={{...chartOption, labels: [' ', ...data.x_time,'(일/day)']}} type={'area'} height={444} width={630} series={[{name: "data", data:data.y_pressure}]}/>
                    </div>
                  }
                </GraphContainer>
              </div>
              </BlackBg>
        }
    </div>

  );
}

const BlackBg = Styled.div`
    padding: 20px 20px 30px 20px;
    border-radius: 6px;
    background-color: #111319;
    margin-top: 20px;
`



const LineContainer = Styled.div`
  width: 391px;
  height: 522px;
  border-radius: 6px;
  background-color: #202020;

`


const GraphContainer = Styled.div`
  margin-left: 20px;
  width: 650px;
  height: 522px;
  border-radius: 6px;
  background-color: #202020;
  p {
    font-size: 20px;
    font-family: NotoSansCJKkr-Bold;
    &:first-child{
            font-size: 15px;
            }
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
//
// const CharBox = Styled.div`
//   float: left;
//   rect{
//     fill: #17181c !important;
//     text{
//       fill: #dddddd !important;
//     }
//   }
//   .raphael-group-65-pointGroup{
//     path{
//       fill: #cccccc !important;
//     }
//
//   }
//   text{
//     fill: #dddddd !important;
//   }
//   .raphael-group-peIslfpg{
//     text{
//       fill: #17181c !important;
//     }
//   }
// `
//
// const SummuryBox = Styled.div`
//
//   div{
//     margin-top: 10px;
//     text-align: left;
//     padding: 19px;
//     color: #b3b3b3;
//     background-color: #3c4353;
//     border-radius: 6px;
//     margin-bottom: 12px;
//     font-size: 15px;
//     p{
//       font-size: 15px;
//     }
//   }
//   margin-top: 24px;
// `
//
//
// const TimeBarWrapper = Styled.div`
//   margin-top: 40px;
//   background-color: #191d27;
//   padding-top: 60px;
//   padding-bottom: 60px;
//   border-radius: 6px;
//   font-size: 18px;
//   text-align: center;
//   img{
//     width: 980px;
//
//   }
//
// `
//
// const UnderBarText = Styled.p`
//   font-size: 18px;
//   border-bottom: 1px solid #aaaaaa90;
//   padding-bottom: 3px;
//
//
// `
//
// const BigDataText = Styled.p`
//   padding-top: 8px;
//   font-size: 35px !important;
//   text-align: right;
//   flex: 1;
//   span{
//     font-size: 18px;
//     padding-left: 6px;
//   }
//
// `
//
// const ImgKey = Styled.img`
//   width: 200px;
//   margin-right: 60px;
//   margin-top: 17px;
//   float: right;
//
//
// `
// const TimeBar = Styled.div`
//   text-align: left;
//   width: 960px;
//   height: 44px;
//   background-color: #717c90;
//   border-radius: 6px;
//   display: inline-block;
//
//
// `
//
// const PacketError = Styled.div`
//   height: 100%;
//   display: inline-block;
//   position: relative;
//   p{
//     position: absolute;
//     top: -30px;
//     color: red;
//     font-size: 15px;
//     font-weight: bold;
//     white-space: nowrap;
//     left: -10px;
//   }
// `
// const Packet = Styled.div`
//   height: 100%;
//   display: inline-block;
//   div{
//     visibility: hidden;
//   }
//   &:hover{
//     position: relative;
//     div{
//       visibility: visible;
//     }
//   }
// `
//
// const PacketTag = Styled.div`
//   color: #252525;
//
//
//     padding: 9px 19px;
//     background-color: white;
//     border-radius: 10px;
//     font-size: 15px;
//     position: absolute;
//     top: -70px;
//     min-width: 100px;
//     left: -10px;
//
// `
//
// const MapBox = Styled.div`
//   background-color: #17181c;
//   padding: 10px;
//   position: relative;
//   border-radius: 6px;
//   width: 70%;
//   margin-right: 20px;
//   img{
//     width: 100%;
//   }
//
// `
//
// const HintText = Styled.p`
//   color: #515664;
//
// `
//
// const TimeLineBox = Styled.div`
//     background-color: #2b2c3b;
//     padding: 14px 19px 27px 14px;
//     min-height: 370px;
//     margin-top: 20px;
//     font-size: 18px;
//     border-radius: 6px;
//     p{
//       text-align: left;
//     }
//
// `
//
const NoTimeDataBox = Styled.div`
    margin-top: 20px;
    color: #515664;
    font-size: 18px;
    padding: 12px;
    background-color: #252525;
`
// const SideInfoBox = Styled.div`
//   background-color: #17181c;
//   padding: 12px 19px;
//   border-radius: 6px;
//   width: 30%;
//   color: white;
//   text-align: left;
//   p{
//     font-size: 18px;
//   }
// `
// const MapFlexBox = Styled.div`
//   display: flex;
//   margin-top: 21px;
// `
// const PressSimbol = Styled.div`
//   background-color: #717c90;
//   border-radius: 6px;
//   width: 50px;
//   position: absolute;
//   font-size: 10px;
//   min-height: 40px;
//   font-weight: bold;
//   padding: 4px;
//   text-align: center;
//   cursor: pointer;
// `
//
// const PressSimbolSelected = Styled.div`
//   background-color: ${POINT_COLOR};
//   border-radius: 6px;
//   width: 50px;
//   position: absolute;
//   font-size: 10px;
//   min-height: 40px;
//   font-weight: bold;
//   padding: 4px;
//   text-align: center;
//   cursor: pointer;
//
// `
export default OilMaintenanceContainer;
