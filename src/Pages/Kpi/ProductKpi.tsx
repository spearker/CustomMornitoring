import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, POINT_COLOR_2,SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest, postRequest } from '../../Common/requestFunctions';
import SearchInputSmall from '../../Components/Input/SearchInputSmall';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import InfoTable from '../../Components/Table/InfoTable';
import { machineCodeToName } from '../../Common/codeTransferFunctions';
import Chart from 'react-apexcharts'
import moment from 'moment';

const ProductKpi = () => {


  const [list, setList] = useState<IBarcode[]>([]);
  const [option, setOption] = useState(0);
  const [keyword, setKeyword] = useState<string>('');
  const dateArray = ['','','','','','','','','','','',''];

  const tempArray = new Array(12);
  
  const monthArray = dateArray.map((v, i)=>{
    return(
      moment().subtract(i, 'month').format('MM')
    )
  }).reverse();

  const timeArray = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']

  const dayArray =  dateArray.map((v, i)=>{

    return(
      moment().subtract(i, 'days').format('MM.DD')
    )
  }).reverse();



  const yearArray = dateArray.map((v, i)=>{
    return(
      moment().subtract(i, 'year').format('YY')
    )
  }).reverse();
  const optionList = [
    "등록순", "이름순",
  ]
  const index = {
    name:'바코드 규칙명',
    type:'종류', 
    code:'코드',

  }

  const chartOption = {
    options: {
      chart: {
        id: '생산품목_증감'
      },
      xaxis: {
        categories: monthArray
      },
      colors:[POINT_COLOR, '#E91E63'],
    },
    
    series: [{
      name: '완제품',
      data: [11, 23, 21, 23, 35, 34, 45, 52, 54, 57, 60, 61]
    },{
      name: '반제품',
      data: [11, 24, 45, 50, 49, 54, 61, 60, 70, 65, 89, 91]
    }]
  }
  
  const chartOption2 = {
    series: [{
      name: "STOCK ABC",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }],
    options: {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Fundamental Analysis of Stocks',
        align: 'left'
      },
      subtitle: {
        text: 'Price Movements',
        align: 'left'
      },
      labels: [30, 40, 45, 50, 49, 60, 70, 91],
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    },
  }

  
  const option_benefit = {
    options: {
      chart: {
        id: '영업이익률'
      },
      xaxis: {
        categories: monthArray
      },
      colors:['#F44336'],
    },
    
    series: [{
      name: '',
      data: [10, 12, 15, 20, 28, 10, 33, 13, 11, 27, 22, 33]
    }]
  }
  
  const option_running = {
    options: {
      chart: {
        id: '설비가동률'
      },
      xaxis: {
        categories: dayArray
      },
      colors:['#E91E63'],
    },
    
    series: [{
      name: '',
      data: [62.9, 66.3, 67.3, 65.3, 69.2, 70.1, 70.3, 70.6, 72.2, 73.3, 74.3, 74.9]
    }
    ]
  }

  const option_leadtime = {
    options: {
      chart: {
        id: '제조리드타임'
      },
      xaxis: {
        categories: monthArray
      },
      colors:['#E91E63'],
    },
    
    series: [{
      name: '',
      data: [2.0, 2.0, 2.3, 2.2, 1.8, 1.9, 1.6, 1.4, 1.4, 1.2, 1.2, 1.1]
    }
    ]
  }
  const option_benefit2 = {
    series: [{
      name: "영업이익률",
      data: monthArray
    }],
    options: {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        text: 'Fundamental Analysis of Stocks',
        align: 'left'
      },
      subtitle: {
        text: 'Price Movements',
        align: 'left'
      },
      labels: [30, 40, 45, 50, 49, 60, 70, 91],
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    },
  }

  
   /**
   * getSearchList()
   * 목록 검색
   * @param {string} url 
   * @returns X
   */
  const getSearchList = useCallback(async (e)=>{
    e.preventDefault();
  
    const results = await getRequest('http://61.101.55.224:9912/api/v1/barcode/list?orderBy=' + option + '&keyword=' + keyword,getToken(TOKEN_NAME))

    if(results === false){
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
        setKeyword('')
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list, option, keyword])



  /**
   * getList()
   * 목록 불러오기
   * @param {string} url 
   * @returns X
   */
  const getList = useCallback(async ()=>{
   
 
    const results = await getRequest('http://61.101.55.224:9912/api/v1/barcode/list?orderBy=' + option + '&keyword=' + keyword,getToken(TOKEN_NAME))

    if(results === false){
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list, keyword, option])


  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async (filter:number)=>{
    setOption(filter)
    //alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
  
    const results = await getRequest('http://61.101.55.224:9912/api/v1/barcode/list?orderBy=' + option + '&keyword=' + keyword,getToken(TOKEN_NAME))

   

    if(results === false){
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[option])

  useEffect(()=>{
    getList()
   
  },[])

  

  const onClickDelete = useCallback(async (id)=>{

    const results = await postRequest('http://61.101.55.224:9912/api/v1/barcode/delete', {pk:id}, getToken(TOKEN_NAME))
    const tg = id
    //console.log('--select id : ' + id)
    if(results === false){
      alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
    }else{
      if(results.status === 200 || results.status === "200"){
        alert('해당 데이터가 성공적으로 삭제되었습니다.')
        setList(list.filter(v => v.pk !== tg))
      }else{
        alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
      }
    }
    
    
  
  },[list])


  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)
    window.location.href=`/update/material?pk=${id}`
  
  },[]);

  const option_timeperproduce = {
    series: [
      {
        name: "Today",
        data: ['0','0','0','0','0','0','0','0','10','18','20','49','32','11','20','30','20','9','0','0','0','0','0','0','0']
      },
      {
        name: "Yesterday",
        data: ['0','0','0','0','0','0','0','0','8','11','19','34','27','8','27','30','15','11','10','0','0','0','0','0','0']
      }
    ],
    options: {
      chart: {
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: [POINT_COLOR, POINT_COLOR_2+'97'],
      dataLabels: {
        enabled: true,
      },
      grid: {
        borderColor: '#e7e7e760',
        row: {
          colors: [BG_COLOR_SUB2, 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: timeArray,
        title: {
          text: 'time'
        }
      },
      yaxis: {
        title: {
          text: 'percent'
        },
        min: 0,
        max: 100
      },
      
    },
  
  }


  const option_price = {
          
    series: [{
      name: '',
      data: [62.9, 66.3, 67.3, 65.3, 69.2, 70.1, 70.3, 70.6, 72.2, 73.3, 74.3, 74.9]
    }],
    options: {
      chart: {
        type: 'area',
       
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      labels:[62.9, 66.3, 67.3, 65.3, 69.2, 70.1, 70.3, 70.6, 72.2, 73.3, 74.3, 74.9],

    
      xaxis: {
        categories: monthArray,
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    },
  
  
  };

  return (
      <DashboardWrapContainer index={12}>
        <SubNavigation list={ROUTER_MENU_LIST[12]}/>
        <InnerBodyContainer>
        <div style={{position:'relative'}}>
            <Header title={`KPI 생산지수`}/>
      
          </div>
          <div style={{display:'flex', width: '100%'}}>
          <ChartBox id="chart" >
            <ChartHeadText>생산품 증감</ChartHeadText>
            <Chart options={chartOption.options} series={chartOption.series} type="bar" height={240} />
          </ChartBox>
          <ChartBox id="chart" >
            <ChartHeadText>매출액 증감</ChartHeadText>
            <Chart options={option_price.options} series={option_price.series} type="area" height={240} />
          </ChartBox>
      
    
          </div>
         
          <div style={{display:'flex', width: '100%', marginTop:22}}>
          <ChartBox id="chart" >
            <ChartHeadText>시간당 생산량</ChartHeadText>
            <Chart options={option_timeperproduce.options} series={option_timeperproduce.series} type="line" height={320} />
          </ChartBox>
         
    
          </div>
          <div style={{display:'flex', width: '100%', marginTop:22}}>
          <ChartBox id="chart" >
            <ChartHeadText>영업이익률</ChartHeadText>
            <Chart options={option_benefit.options} series={option_benefit.series} type="bar" height={240} />
          </ChartBox>
          <ChartBox id="chart" >
            <ChartHeadText>제조리드타임 증감</ChartHeadText>
            <Chart options={option_leadtime.options} series={option_leadtime.series} type="bar" height={240} />
          </ChartBox>
          <ChartBox id="chart" >
            <ChartHeadText>설비가동률 증감</ChartHeadText>
            <Chart options={option_running.options} series={option_running.series} type="bar" height={240} />
          </ChartBox>
    
          </div>
        
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`

const ChartBox = Styled.div`

  flex: 1;
  background-color: ${BG_COLOR_SUB};
  text-align: left;
  margin-right: 16px;
  padding: 22px 24px 11px 11px;
  color: black !important;
  border-radius: 5px;
  -webkit-box-shadow: 1px 19px 55px -21px rgba(0,0,0,0.28); 
  -moz-box-shadow: 1px 19px 55px -21px rgba(0,0,0,0.28);
  box-shadow: 1px 19px 55px -21px rgba(0,0,0,0.28);
  

`

const ChartHeadText = Styled.p`
  margin-left: 18px;
  font-size: 18px;
  color: white;
`

export default ProductKpi;