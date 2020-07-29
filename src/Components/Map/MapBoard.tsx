import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, { withTheme, DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom';
import PressStatusMarker from './Marker/PressStatusMarker';
import { toUnicode } from 'punycode';
import PressNameMarker from './Marker/PressNameMarker';
import FactorySelector from './FactorySelector';

interface Props{
    url: string, //api 요청 url,
    type: string | number, //지도 타입
    select?: string, //select pk
    onChangeEvent?: any,//setSelect Event
    autoRendering?: boolean//실시간 데이터 갱신여부
}
interface Factory{
    pk: string | number,
    name: string,
}

const dummy_map_data = {
    map_img: null,
    component_size: 'NAME',
    map_width: 1100,
    components: [
       {
           pk: '1',
           name: '기계',
           opertaion: 0,
           ratio: 100,
           photo: null,
           tons: 5,
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
const dummy_factory = [
    {pk: '1', name: '공장 1'},
    {pk: '2', name: '공장 2'},
    {pk: '3', name: '공장 3'},
]

const initialData = {
    map_img: null,
    component_size: 'NAME',
    map_width: 1100,

}

const MapBoard = ({autoRendering, type, url, onChangeEvent, select}:Props) => {

    const [selectFactory, setSelectFactory] = useState<Factory>({pk: '', name: ''});

    const [facotories, setFactories]= useState<Factory[]>([]);
   
    const [components, setComponents]= useState<any[]>([]);

    const [mapData, setMapData] = useState<any>(initialData);

    const [intervalId, setIntervalId]= useState<any>(null);

    const getMapData = useCallback((factoryPk)=>{
        console.log(factoryPk);
        //한번 지도 데이터 초기화
        setComponents(dummy_map_data.components);
        setMapData(dummy_map_data);

    },[components, mapData,selectFactory ]);

    const getFactoryData = useCallback(()=>{

        setSelectFactory({pk: '2', name: '공장 2'});
        setFactories(dummy_factory);
        getMapData(selectFactory.pk);

    },[selectFactory, facotories]);

    useEffect(()=>{

        //리랜더링 x의 경우

        //공장 데이터 받아오기
        //첫번째 배열 공장 데이터 바인딩
        //props 로 받은 url 로 지도 데이터 받아오기
        if(selectFactory.pk == ''){
            getFactoryData()
        }

    },[]);

    useEffect(()=>{

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

    },[selectFactory]);



    return(
        <>
        <FactorySelector select={selectFactory} list={dummy_factory} onChangeEvent={setSelectFactory} />
        <MapBoardWrapper style={{width: Number(mapData.map_width) + 'pk', height: mapData.map_img == null ? '340px' : 'auto'}}  >
                <InnerWrapper>
               
                
                {
                    components.map((v,i)=>{
                        if(mapData.component_size == 'PRESS'){
                            return(
                                <PressStatusMarker key={i} component={v}/>
                                )
                        }if(mapData.component_size == 'BRAKE'){
                            return(
                                <PressStatusMarker key={i} component={v}/>
                                )
                        }else{
                            return(
        
                                <PressNameMarker key={i} component={v} select={select} onChangeEvent={onChangeEvent}/>
                            )
                        }
                })}
                {
                    mapData.map_img !== null &&
                    <img src={mapData.map_img} style={{width: Number(mapData.map_width)}} />
                }
            </InnerWrapper>
        </MapBoardWrapper>
        </>
        
    )
}

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

export default MapBoard;