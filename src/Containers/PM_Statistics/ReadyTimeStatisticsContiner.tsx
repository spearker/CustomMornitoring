import React, {useCallback, useEffect, useState} from 'react'
import moment from 'moment'
import Styled from 'styled-components'
import CalendarDropdown from '../../Components/Dropdown/CalendarDropdown'
import {API_URLS, getReadyTimeData} from '../../Api/pm/statistics'
import {API_URLS as URLS_MAP} from '../../Api/pm/map'
import MapBoard from '../../Components/Map/MapBoard'
import NoDataCard from '../../Components/Card/NoDataCard'

const UP_COLOR = '#19b9df'
const DOWN_COLOR = '#ff341a'

const dummyData: IPressReadyTimeStatisticsData = {
  press_pk: 'dummyPK1',
  press_name: '프레스 01',
  press_ton: 1000,
  runtime: {
    operating_ratio: 48.0,
    diff: 2.0,
    kinds: 'up'
  },
  downtime: {
    time: '08:52:30',
    diff: 2.0,
    kinds: 'down'
  },
  error_time: '00:23:15',
  qdc_time: '00:53:28'
}
const initData: IPressReadyTimeStatisticsData = {
  press_pk: '',
  press_name: '',
  press_ton: 0,
  runtime: {
    operating_ratio: 0,
    diff: 0,
    kinds: ''
  },
  downtime: {
    time: '',
    diff: 0,
    kinds: ''
  },
  error_time: '',
  qdc_time: ''
}

const ReadyTimeStatisticsContainer = () => {
  const [selectDate, setSelectDate] = useState(moment().subtract(1, 'days').format('YYYY-MM-DD'))

  const [data, setData] = useState<IPressReadyTimeStatisticsData>()

  const [selectComponent, setSelectComponent] = useState<string>('')

  const [pk, setPk] = useState('v1_SEAIN_machine_1_null_1')

  const getData = useCallback(async () => {
    const tempUrl = `${API_URLS['readyTime'].load}?pk=${selectComponent}&date=${selectDate}`
    const resultData = await getReadyTimeData(tempUrl)
    setData(resultData)
  }, [data, pk, selectComponent, selectDate])

  useEffect(() => {
    if (selectComponent !== '') {
      getData()
    }
  }, [selectComponent, selectDate])

  return (
    <div>
      <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
        <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
          <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>프레스 비가동 시간</span>
        </div>
      </div>
      <MapBoard
        type={1}//0: 모니터링 1:통계/분석
        url={URLS_MAP.press.statics}
        select={selectComponent} //pk
        onChangeEvent={setSelectComponent}
      />
      {
        selectComponent ?
          data ?
            <BlackContainer>
              <div style={{height: 75}}>
                <div className={'itemDiv'} style={{float: 'left', display: 'inline-block'}}>
                  <p style={{
                    textAlign: 'left',
                    fontSize: 20,
                    fontWeight: 'bold',
                    width: '100%'
                  }}>{data.press_name + '(' + data.press_ton + 'ton)'}</p>
                </div>
                <div style={{marginRight: 30, paddingTop: 25}}>
                  <CalendarDropdown type={'single'} select={selectDate}
                                    onClickEvent={(i) => setSelectDate(i)}></CalendarDropdown>
                </div>
              </div>
              <ItemBox style={{height: 80}}>
                <div className={'division'}>
                  <div className={'quarter'}>
                    <p style={{fontSize: 20, textAlign: 'left', marginLeft: 15}}>일일 총 가동률</p>
                  </div>
                  <div className={'quarter'}>
                    {/*{*/}
                    {/*    data.runtime.operating_ratio !== "NaN"*/}
                    {/*        ? <p style={{fontSize: 70, fontWeight: "bold"}}>{data.runtime.operating_ratio.toFixed(1)}<span style={{fontSize: 40}}> %</span></p>*/}
                    {/*        : <p style={{fontSize: 70, fontWeight: "bold"}}>{data.runtime.operating_ratio}<span style={{fontSize: 40}}> %</span></p>*/}
                    {/*}*/}
                    <p style={{fontSize: 70, fontWeight: 'bold'}}>{
                      data.runtime.operating_ratio !== 'NaN'
                        ? data.runtime.operating_ratio.toFixed(1)
                        : '0'
                    }<span
                      style={{fontSize: 40}}> %</span></p>
                  </div>
                </div>
                <div className={'division'}>
                  <div className={'quarter'} style={{width: '35%'}}>
                    <p style={{fontSize: 20, textAlign: 'left', marginLeft: 15}}>전일 대비 증감률</p>
                  </div>
                  <div className={'quarter'} style={{display: 'flex', alignItems: 'flex-end', width: '64.9%'}}>
                    <div style={{width: '100%'}}>
                      <RightText
                        style={{fontSize: 70, color: data.runtime.kinds === 'up' ? UP_COLOR : DOWN_COLOR}}>
                        {
                          data.runtime.diff !== 'NaN'
                            ? data.runtime.diff.toFixed(1)
                            : '0'
                        }<span style={{fontSize: 40}}> %</span>
                      </RightText>
                    </div>
                  </div>
                </div>
              </ItemBox>
              <ItemBox style={{height: 210, marginTop: 30}}>
                <div className={'division'}>
                  <table>
                    <tr>
                      <td>
                        <LeftText style={{marginBottom: 20}}>비가동시간</LeftText>
                      </td>
                      <td>
                        <RightText style={{fontSize: 60}}>{data.downtime.time}</RightText>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <LeftText style={{marginLeft: 25}}>- 에러시간</LeftText>
                      </td>
                      <td>
                        <RightText>{data.error_time}</RightText>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <LeftText style={{marginLeft: 25}}>- 금형교체시간</LeftText>
                      </td>
                      <td>
                        <RightText>{data.qdc_time}</RightText>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className={'division'}>
                  <div className={'quarter'} style={{width: '35%'}}>
                    <LeftText>전일 대비 증감률</LeftText>
                  </div>
                  <div className={'quarter'} style={{display: 'flex', alignItems: 'flex-end', width: '64.9%'}}>
                    <div style={{width: '100%'}}>
                      <RightText
                        style={{fontSize: 70, color: data.downtime.kinds === 'up' ? UP_COLOR : DOWN_COLOR}}>
                        {
                          data.downtime.diff !== 'NaN'
                            ? data.downtime.diff.toFixed(1)
                            : '0'
                        }<span style={{fontSize: 40}}> %</span>
                      </RightText>
                    </div>
                  </div>
                </div>
              </ItemBox>
            </BlackContainer> : <NoDataCard contents={'데이터를 불러오지 못했습니다.'} height={480}/>
          : <NoDataCard contents={'기계를 선택해 주세요'} height={480}/>
      }

    </div>
  )
}

const BlackContainer = Styled.div`
    width: 1100px;
    height: 480px;
    background-color: #17181c;
    border-radius: 6px;
    margin-top: 20px;
    .itemDiv{
        height: 40px;
        width: 50%;
        p{
            font-size: 20px;
            font-weight: bold;
            padding-Top: 20px;
            text-Align: left;
            margin-left: 20px;
        }
    }
`

const ItemBox = Styled.div`
    width: 1060px;
    background-color: #0e0f14;
    margin-left: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    .division{
        width: 49.9%;
        height: 100%;
        float: left;
        display: inline-block;
    };
    .division:first-child{
        border-right: 0.5px solid #e0e0e0;
    }
    .quarter{
        width: 49.9%;
        height: 100%;
        display: inline-block;
        float: left;
    }
    table{
        width: 100%;
        p{
            font-weight: bold;
        }
    }
`

const LeftText = Styled.p`
    font-size: 20px;
    text-align: left;
    margin-left: 15px;
    font-weight: bold;
`

const RightText = Styled.p`
    font-size: 30px;
    text-align: right;
    margin-right: 30px;
    font-weight: bold;
`


export default ReadyTimeStatisticsContainer
