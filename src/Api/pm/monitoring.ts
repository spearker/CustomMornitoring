import client from '../configs/basic';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * getClutchData()
 * 로드톤 모니터링 불러오기
 * @param {string} url 링크 주소
 * @returns {list} data object[]
 * @author 준희
 * @version 0.1
 */
export const getLoadTonList = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}


export const API_URLS = {
    loadTon: {
        list:`/v1/monitoring/loadton/details`
    },

  }


