import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import PressStatusMarker from './Marker/PressStatusMarker'
import PressNameMarker from './Marker/PressNameMarker'
import FactorySelector from './FactorySelector'
import {API_URLS, getMonitoringMapData} from '../../Api/pm/map'
import PressCMSMarker from './Marker/PressCMSMarker'
import NoDataCard from '../Card/NoDataCard'

interface Props {
    url: string, //api 요청 url,
    mapType?: 'basic' | 'cms' //지도 타입
    type: string | number, //지도 타입
    select?: string, //select pk
    onChangeEvent?: any,//setSelect Event
    autoRendering?: boolean//실시간 데이터 갱신여부
    item?: any
    onChangeComponent?: any
    state?: 0 | 10 | 11
}


const dummy_map_data = {
    map_img: null,
    component_size: 'NAME',
    map_width: 1100,
    components: [
        {
            pk: '1',
            machine_name: '기계',
            machine_photo: null,
            tons: 5,
            duty_cycle: 20,
            current: 30,
            left: 40,
            bottom: 40,
        },
        {
            pk: '2',
            name: '기계2',
            opertaion: 0,
            ratio: 100,
            photo: null,
            tons: 100,
            left: 10,
            bottom: 40,
        },
        {
            pk: '3',
            name: '기계3',
            opertaion: 0,
            ratio: 100,
            photo: null,
            tons: 100,
            left: 60,
            bottom: 40,
        }
    ]
}


const MapBoard = ({autoRendering, type, mapType = 'basic', url, onChangeEvent, select, item, onChangeComponent}: Props) => {

    const [selectFactory, setSelectFactory] = useState<Factory>({pk: '', name: ''})

    const [facotories, setFactories] = useState<Factory[]>([])

    const [components, setComponents] = useState<any[]>([])

    const [mapData, setMapData] = useState<any>(dummy_map_data)

    const [intervalId, setIntervalId] = useState<any>(null)

    /*
    * getMapData()
    * 지도 데이터 가져오기
    */
    const getMapData = useCallback(async (facPk) => {
        console.log('getMapData()')
        //지도 데이터 초기화
        //setComponents(dummy_map_data.components);
        //setMapData(dummy_map_data);

        const resultObj = await getMonitoringMapData(url + `?factory=${facPk}` + `&type=${type}`)

        if (resultObj) {
            //console.log('지도 들어가기')
            setMapData(resultObj)

            setComponents(resultObj.components)
        } else {
            ////alert('[데이터 없음] 공장 도면이 등록되어야 사용 할 수 있는 기능힙니다. 공장 도면을 등록해주세요!')
        }

        console.log(resultObj)

    }, [components, mapData, selectFactory, type])

    /*
   * getFactoryData()
   * 공장 데이터 가져오기
   */
    const getFactoryData = useCallback(async () => {

        //onsole.log('factory get==' + dummy_factory2.length)
        //한번 지도 데이터 초기화
        //setComponents(dummy_map_data.components);
        //setMapData(dummy_map_data);
        //setSelectFactory({pk: '2', name: '공장 2'});
        //setFactories(dummy_factory)
        const results = await getMonitoringMapData(API_URLS.factory.list)

        console.log('results =>', results)
        setFactories(results)

        if (results.length <= 0) {
            // //alert('조회 가능한 공장 데이터가 없습니다.')
            return
        } else {
            setSelectFactory({pk: results[0].pk, name: results[0].name})
        }

    }, [selectFactory, facotories])

    useEffect(() => {
        if (mapType === 'cms' && selectFactory.pk !== '') {
            const interval = setInterval(() => {
                getMapData(selectFactory.pk)
                console.log('반복중....', selectFactory.pk)
            }, 3000)
            return () => {
                console.log('-- monitoring end -- ')
                clearTimeout(interval)
                //setTimer(null)
            }
        }
    }, [selectFactory])


    useEffect(() => {

        //리랜더링 x의 경우

        //공장 데이터 받아오기
        //첫번째 배열 공장 데이터 바인딩
        //props 로 받은 url 로 지도 데이터 받아오기
        if (selectFactory.pk == '') {
            getFactoryData()
        }

    }, [])

    useEffect(() => {

        if (selectFactory.pk !== '') {
            getMapData(selectFactory.pk)

        }

    }, [selectFactory.pk])

    useEffect(() => {
        /*
        //기존 스케쥴러가 있는 경우 종료
        if(intervalId !== null){
            console.log('-- monitoring end -- ' )
            clearTimeout(intervalId);
        }

        //리랜더링 o의 경우
        if(selectFactory.pk !== '' &&  autoRendering !== undefined && autoRendering == true){
            const interval = setInterval(() => { getMapData(selectFactory.pk); }, 2000);
            setIntervalId(interval)
        }

        return () => {
            console.log('-- monitoring end -- ' )
            clearTimeout(intervalId);
        };
    */
        console.log(item)
    }, [item])


    return (
        <>
            <FactorySelector select={selectFactory} list={facotories} onChangeEvent={setSelectFactory}/>
            <MapBoardWrapper
                style={{width: Number(mapData.map_width) + 'pk', height: mapData.map_img == null ? '340px' : 'auto'}}>
                <InnerWrapper>
                    {
                        components.length === 0 &&
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{flex: 1}}><p style={{textAlign: 'center'}}>데이터가 없습니다.</p></div>
                        </div>
                    }
                    {
                        components.map((v, i) => {
                            if (item) {
                                if (v.machine_name === item.machine_name) {
                                    onChangeComponent(v)
                                }
                            }

                            if (mapData.component_size == 'PRESS') {
                                return (
                                    <PressStatusMarker key={i} component={v}/>
                                )
                            } else if (mapData.component_size == 'BRAKE') {
                                return (
                                    <PressStatusMarker key={i} component={v}/>
                                )
                            } else if (mapType === 'cms') {
                                return (
                                    <PressCMSMarker key={i} component={v} select={select} onChangeEvent={onChangeEvent}
                                                    item={item}
                                                    onChangeComponent={onChangeComponent}/>
                                )
                            } else {
                                return (

                                    <PressNameMarker key={i} component={v} select={select}
                                                     onChangeEvent={onChangeEvent}/>
                                )
                            }
                        })}
                    {
                        mapData.map_img !== null &&
                        <img src={mapData.map_img} style={{width: Number(mapData.map_width)}}/>
                    }
                </InnerWrapper>
            </MapBoardWrapper>
            {
                mapType === 'cms' ? item
                    ? <DetailBox>
                        <p>{item.machine_name}</p>
                        <table style={{width: '100%', fontSize: 30}}>
                            <tr style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 40
                            }}>
                                {/*<td>사용률</td>*/}
                                {/*<td>{item.duty_cycle.toFixed(2)}<span>&nbsp;%</span></td>*/}
                                <td><p style={{width: '100%', marginTop: 35}}>전류량</p></td>
                                <td>{item.current.toFixed(2)}<span>&nbsp;A</span></td>
                                {/*</tr>*/}
                                {/*<tr>*/}
                                <td><p style={{width: '100%', marginTop: 35}}>전력</p></td>
                                <td>{item.electric_power.toFixed(2)}<span>&nbsp;KW</span></td>
                                {/*<td>누적 사용량</td>*/}
                                {/*<td>{item.accumulated.toFixed(2)}<span>&nbsp;KW</span></td>*/}
                            </tr>
                        </table>
                    </DetailBox>
                    : <NoDataCard contents={'기계를 선택해 주세요'} height={300}/>
                    : null
            }
        </>

    )
}

const DetailBox = Styled.div`
    width: 1080px;
    /* height: 300px; */
    background-color: #17181c;
    border-radius: 6px;
    margin-top: 20px;
    padding: 20px 10px 40px 10px;
    box-sizing: border-box;
    *{
      box-sizing: border-box;
    }

    &>p{
      font-size: 20px;
      text-align: left;
      padding-bottom: 10px;
      padding-left: 25px;
      border-bottom: 1px solid #ffffff60;
    }
    &>table{
      max-width: 80%;
      margin: 0 auto;
      border-collapse: collapse;

      /* background-color: red; */
      tr{
        *{
          margin-right: 47px;
        }
        td{
          text-align: right;
          &:not(:nth-child(2n)){
            vertical-align: bottom;
            font-size: 25px;
            padding-bottom: 31px;
            width: 15%;
          }
          &:nth-child(2n){
            position: relative;
            font-size: 55px;
            width: 35%;
            span{
              font-size: 25px;
            }

          }

        }

      }
    }

`

const MapBoardWrapper = Styled.div`
    max-width: 1100px !important;
    margin-top: 12px;
    width: 100%;
    position: relative;
    border-radius: 6px;
    background-color: black;
`

const InnerWrapper = Styled.div`
    position: relative;
    width: 100%;
    height: inherit;
    p{
        text-align: center;
        text-overflow:ellipsis;
        white-space:nowrap;
        word-wrap:normal;
        width:100%;
        overflow:hidden;
    }

`

export default MapBoard
