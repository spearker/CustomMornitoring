import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, { withTheme, DefaultTheme } from 'styled-components'
import { useHistory, Link } from 'react-router-dom';
import Axios from "axios";
import CommonTable from '../../Components/Table/CommonTable';
import { getCommonList, API_URLS } from '../../Api/map';
import { getAdminData, API_URLS as API_URLSADMIN } from '../../Api/admin/company';
import OvertonTable from "../../Components/Table/OvertonTable";


const dummy = [
  {
    pk: '1ghjkio',
    factory_pk : '45fghjk7',
    factory_name: '공장 1',
    type: 0,
    company_name: '(주)시즐'
  },
  {
    pk: '134bnm,fg',
    factory_pk : '345678cvbnm6',
    factory_name: '공장 1',
    type: 2,
    company_name: '(주)시즐'
  },
]


interface Props{
  match: any
}

const MapList = () => {

    const [pk, setPk] = useState<string>('')
    const [index, setIndex] = useState({ factory_pk: '고유키'});
    const [list, setList] = useState<any[]>([]);
    const [type, setType] = useState<null | number>(null);
    const history = useHistory();

    useEffect(()=>{
      // getList();
        getData();
    },[])

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

    const getData = useCallback(async ()=>{

        const resultList = await getAdminData(API_URLSADMIN[`company`].load);
        console.log(resultList)
        setPk(resultList.results[0].pk)
        setList(resultList.results[0].factory)


    },[pk])

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

    const onGoUpdatePage = useCallback((data)=>{
      const factoryId = data.factory_pk;
      const typeId = data.type;
      const companyId = data.pk;
      history.push(`/map/update/${companyId}/${factoryId}/${typeId}`)
    },[pk])

    React.useEffect(()=>{
        setIndex(indexList["map"])

        console.log(pk, list)
    },[pk, list])

    return(
        <MapListWrapper>
            <button onClick={()=>history.push(`/map/edit/${pk}`)}>신규 도면 등록하기</button>
            {/*<h2>공장 목록</h2>*/}
            {/*<CommonTable*/}
            {/*  contents={list}*/}
            {/*  indexList={{*/}
            {/*    factory_pk: '고유키',*/}
            {/*    factory_name: '공장명',*/}
            {/*    type: '맵디자인 유형',*/}
            {/*  }}*/}
            {/*  idKey={'factory_pk'}*/}
            {/*  onClickEvents={[*/}
            {/*    {*/}
            {/*      name: '수정 하기',*/}
            {/*      event: onGoUpdatePage,*/}
            {/*    },*/}
            {/*    {*/}
            {/*      name: '삭제',*/}
            {/*      event: ()=>{},*/}
            {/*    },*/}
            {/*  ]}*/}

            {/*  />*/}
            {/*<OvertonTable title={'공장 목록'} indexList={indexList} valueList={list}/>*/}
        </MapListWrapper>
    )
}

const MapListWrapper = Styled.div`

`
export default MapList;
