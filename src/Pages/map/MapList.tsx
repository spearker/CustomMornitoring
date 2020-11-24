import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {useHistory} from 'react-router-dom';

import {API_URLS as API_URLSADMIN, getAdminData, postMapDeleteData} from '../../Api/admin/company';
import OvertonTable from "../../Components/Table/OvertonTable";


const dummy = [
    {
        pk: '1ghjkio',
        factory_pk: '45fghjk7',
        factory_name: '공장 1',
        type: 0,
        company_name: '(주)시즐'
    },
    {
        pk: '134bnm,fg',
        factory_pk: '345678cvbnm6',
        factory_name: '공장 1',
        type: 2,
        company_name: '(주)시즐'
    },
]


interface Props {
    match: any
}

const MapList = () => {

    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [pk, setPk] = useState<any>('');
    const [companyPk, setCompanyPk] = useState<string>('');
    const [mapPk, setMapPk] = useState<any>('')
    const [index, setIndex] = useState({factory_pk: "3BF51I_factory0"});
    const [list, setList] = useState<any[]>([]);
    const [type, setType] = useState<null | number>(null);
    const history = useHistory();
    const [selectValue, setSelectValue] = useState<any>(null);

    useEffect(() => {
        // getList();
        setIndex(indexList["map"])
        getData();
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
    }, [pk])

    /**
     * getList()
     * 지도 목록 불러오기
     */

    const indexList = {
        map: {
            factory_pk: '고유키',
            factory_name: '공장명',
            type: '맵디자인 유형',
        }
    }

    const getData = useCallback(async () => {

        const resultList = await getAdminData(API_URLSADMIN[`company`].load);
        console.log(resultList.results[0])
        setPk(resultList.results[0].pk)

    }, [pk])

    const getMapData = useCallback(async () => {

        console.log(pk)
        const resultList = await getAdminData(API_URLSADMIN[`map`].list + '?pk=' + pk);
        console.log(resultList.results)
        setList(resultList.results)

    }, [pk])

    const getMapDelete = useCallback(async () => {
        console.log(mapPk)
        const resultList = await postMapDeleteData(API_URLSADMIN[`map`].delete + '?pk=' + mapPk);

    }, [mapPk])

    // const getList = useCallback(async ()=>{
    //
    //   const resultList = await getAdminData(API_URLS[`factory`].list + `?pk=${pk}`);
    //   // setList(resultList);
    //     console.log(resultList)
    //
    // },[list])
    // useEffect(() => {
    //     if(pk !== ''){
    //         getList()
    //     }
    // },[])

    const onGoUpdatePage = useCallback((data) => {
        const factoryId = data.factory_pk;
        const typeId = data.type;
        const companyId = data.pk;
        history.push(`/map/update/${companyId}/${factoryId}/${typeId}`)
    }, [pk])

    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white',
            Link: () => history.push(`/admin/map/${companyPk}/${index.factory_pk}/`)
        },
        {
            Name: '삭제',
            Width: 60,
            Color: 'white',
            Link: () => getMapDelete()
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push(`/admin/map/${pk}`)
        },
    ]

    React.useEffect(() => {
        getMapData()
        console.log(pk, list)
    }, [pk])

    const onClick = useCallback(map => {
        console.log(map);
        if (map.pressPk === pk) {
            setPk(null);
            setSelectValue(null);
            setMapPk(null)
        } else {
            setPk(map.pk);
            setMapPk(map.map_pk)
            setSelectValue(map)
            console.log(map.map_pk)
        }

    }, []);

    return (
        <MapListWrapper>
            <OvertonTable title={'공장 목록'} titleOnClickEvent={titleEventList} mainOnClickEvent={onClick}
                          indexList={index} clickValue={selectValue} valueList={list} EventList={eventList}
                          noChildren={true}/>
        </MapListWrapper>
    )
}

const MapListWrapper = Styled.div`

`
export default MapList;
