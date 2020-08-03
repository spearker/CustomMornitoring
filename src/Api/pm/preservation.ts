import client from '../configs/basic';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * getMoldData()
 * 금형 보전 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */

export const getMoldData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getMoldData()
 * 오버톤 보전 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */

export const getOvertoneData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getClutchData()
 * 클러치 보존 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 */
export const getCluchData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}


export const API_URLS = {
    mold: {
        list: `/v1/preservation/press/mold/list`,
        load: `/v1/preservation/press/mold/load`
    },
    clutch: {
        load:`/v1/preservation/press/slipAngle`
    },
    overtone: {
        list: `/v1/preservation/press/overTon/list`,
        load: `/v1/preservation/press/overTon/load`
    }
}


