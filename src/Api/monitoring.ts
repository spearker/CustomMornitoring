import client from './configs/monitoring';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * getMonitoringData();
 * 프레스 현황 불러오기 
 * @param {string} url 링크 주소
 * @returns {Object} 데이터
 * @author 수민
 */
export const getMonitoringData = async( url: string) =>{    
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}


export const API_URLS = {
    press: {
        status:`/v1/monitoring/press/map`,
        statics: `/v1/map/load`,
    },
  
}


