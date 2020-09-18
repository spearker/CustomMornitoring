import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {useHistory} from 'react-router-dom';
import CommonTable from '../../components/table/CommonTable';
import {API_URLS, getCommonList} from '../../api/map';


const dummy = [
  {
    pk: '1234567890qwertyuio',
    company_name: '시즐',
    factory:[
      {
        pk:'456789',
        name:'공장 2'
      },
      {
        pk:'4567824354659',
        name:'공장 2'
      }
    ]

  },
  {
    pk: '1234567890qwertyuio',
    company_name: '시즐',
    factory:[
      {
        pk:'456789',
        name:'공장 2'
      },
      {
        pk:'4567824354659',
        name:'공장 2'
      }
    ]

  },

]

const MapList = () => {

    const [list, setList] = useState<any[]>([]);
    const [type, setType] = useState<null | number>(null);
    const history = useHistory();

    /**
     * getList()
     * 회사 목록 불러오기
     */
    const getList = useCallback(async ()=>{

      const resultList = await getCommonList(API_URLS[`company`].list);
      setList(resultList);

    },[list])


    useEffect(()=>{
      getList()
    },[])


    return(
        <MapListWrapper>
            <h2>회사 목록</h2>
            <CommonTable
              contents={list}
              indexList={{
                pk: '고유키',
                name: '회사명',
              }}
              clickLink={`/company/maps`}
              />
        </MapListWrapper>
    )
}

const MapListWrapper = Styled.div`

`
export default MapList;
