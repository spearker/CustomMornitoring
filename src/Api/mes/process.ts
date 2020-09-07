import client from '../configs/basic';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * postProcessRegister()
 * 공정 등록하기
 * @param {string} url 링크 주소
 * @param {Object} bodyData 공정 등록 정보 객체
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postProcessRegister = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

/**
 * getSearchMachine()
 * 기계 검색하기
 * @param {string} url 링크 주소
 * @param {Object} keyword 기계명
 * @returns {Object} 기게정보 리스트
 * @author 준희
 */

export const getSearchMachine = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    return temp
}

export const API_URLS = {
    process:{
        register: `/v1/process/register`,
        update: `/v1/process/update`,
        load: `/v1/process/load`,
        list: `/v1/process/list`,
        delete: `/v1/process/delete`,
    },
    machine: {
        list: `/v1/machine/search`
    }

}


