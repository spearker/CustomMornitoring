import client from '../configs/basic';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * getPowerList()
 * 전력 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 * @version 0.1
 */
export const getAnalysisReadyTime = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getCapacityTimeData()
 * 생산량 분석 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 * @version 0.1
 */
export const getCapacityTimeData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getDefectiveList()
 * 불량 공정 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const getDefectiveData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getAbilityList()
 * 능력 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 * @version 0.1
 */
export const getAbilityList = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

export const API_URLS = {
    readyTime: {
        load:`/v1/analysis/press/downtime`
    },
    capacity: {
        load:`/v1/analysis/press/production`
    },

    pressList: {
        list: '/v1/analysis/press/list'
    },
    defective: {
        list: '/v1/analysis/press/defective/list',
        load: '/v1/analysis/press/defective/load'
    },
    ability: {
        load: `/v1/analysis/press/capacity`
    },
}


