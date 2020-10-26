import React, { useCallback, useEffect, useState } from 'react';
import Styled from 'styled-components'
import { BG_COLOR_SUB, BG_COLOR_SUB2, TOKEN_NAME } from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import 'react-dropdown/style.css'
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getRequest, postRequest } from '../../Common/requestFunctions';
import Chart from 'react-apexcharts'
import moment from 'moment';

const Old_DuedateKpi = () => {


  const [ list, setList ] = useState<IBarcode[]>([]);
  const [ option, setOption ] = useState(0);
  const [ keyword, setKeyword ] = useState<string>('');
  const dateArray = [ '', '', '', '', '', '', '', '', '', '', '', '' ];
  const monthArray = dateArray.map((v, i) => {
    return (
        moment().subtract(i, 'month').format('MM')
    )
  }).reverse();

  const timeArray = [ '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24' ]

  const dayArray = dateArray.map((v, i) => {
    return (
        moment().subtract(i, 'days').format('MM.DD')
    )
  }).reverse();

  const yearArray = dateArray.map((v, i) => {
    return (
        moment().subtract(i, 'year').format('YY')
    )
  }).reverse();
  const optionList = [
    "등록순", "이름순",
  ]
  const index = {
    name: '바코드 규칙명',
    type: '종류',
    code: '코드',

  }

  const chartOption = {
    options: {
      chart: {
        id: '생산품목_증감'
      },
      xaxis: {
        categories: yearArray
      },
      colors: [ '#F44336', '#E91E63', '#9C27B0' ],
    },

    series: [ {
      name: '생산품목',
      data: [ 30, 40, 45, 50, 49, 60, 70, 91 ]
    }, {
      name: '생산품목',
      data: [ 30, 40, 45, 50, 49, 60, 70, 91 ]
    } ]
  }

  const chartOption2 = {
    series: [ {
      name: "STOCK ABC",
      data: [ 30, 40, 45, 50, 49, 60, 70, 91 ]
    } ],
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
      labels: [ 30, 40, 45, 50, 49, 60, 70, 91 ],
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
  const getSearchList = useCallback(async (e) => {
    e.preventDefault();

    const results = await getRequest('http://255.255.255.255:8299/api/v1/barcode/list?orderBy=' + option + '&keyword=' + keyword, getToken(TOKEN_NAME))

    if (results === false) {
      ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    } else {
      if (results.status === 200) {
        setList(results.results)
        setKeyword('')
      } else {
        ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  }, [ list, option, keyword ])


  /**
   * getList()
   * 목록 불러오기
   * @param {string} url
   * @returns X
   */
  const getList = useCallback(async () => {


    const results = await getRequest('http://255.255.255.255:8299/api/v1/barcode/list?orderBy=' + option + '&keyword=' + keyword, getToken(TOKEN_NAME))

    if (results === false) {
      ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    } else {
      if (results.status === 200) {
        setList(results.results)
      } else {
        ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  }, [ list, keyword, option ])


  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async (filter: number) => {
    setOption(filter)
    ////alert(`선택 테스트 : 필터선택 - filter : ${filter}` )

    const results = await getRequest('http://255.255.255.255:8299/api/v1/barcode/list?orderBy=' + option + '&keyword=' + keyword, getToken(TOKEN_NAME))


    if (results === false) {
      ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    } else {
      if (results.status === 200) {
        setList(results.results)
      } else {
        ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  }, [ option ])

  useEffect(() => {
    getList()

  }, [])


  const onClickDelete = useCallback(async (id) => {

    const results = await postRequest('http://255.255.255.255:8299/api/v1/barcode/delete', { pk: id }, getToken(TOKEN_NAME))
    const tg = id
    //console.log('--select id : ' + id)
    if (results === false) {
      //alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
    } else {
      if (results.status === 200 || results.status === "200") {
        //alert('해당 데이터가 성공적으로 삭제되었습니다.')
        setList(list.filter(v => v.pk !== tg))
      } else {
        //alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
      }
    }


  }, [ list ])


  const onClickModify = useCallback((id) => {

    console.log('--select id : ' + id)
    window.location.href = `/update/material?pk=${id}`

  }, [])

  return (
      <DashboardWrapContainer index={12}>
        <SubNavigation list={ROUTER_MENU_LIST[12]}/>
        <InnerBodyContainer>
          <div style={{ position: 'relative' }}>
            <Header title={`KPI 납기지수`}/>

          </div>
          <div style={{ display: 'flex', width: '100%' }}>
            <ChartBox id="chart">
              <ChartHeadText>수주출하 리드타임</ChartHeadText>
              <Chart options={chartOption.options} series={chartOption.series} type="bar" height={240}/>
            </ChartBox>


          </div>
          <div style={{ display: 'flex', width: '100%', marginTop: 21 }}>
            <ChartBox id="chart">
              <ChartHeadText>납기단축률 증감</ChartHeadText>
              <Chart options={chartOption.options} series={chartOption.series} type="bar" height={240}/>
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

export default Old_DuedateKpi;
