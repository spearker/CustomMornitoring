import client from '../configs/common';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * postChitRegister()
 * 전표 생성하기
 * @param {string} url 링크 주소기
 * @body {object} 생성 시 필요한 정보 전달
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postChitRegister = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

/**
 * postProductionRegister()
 * 생산 계획 등록하기
 * @param {string} url 링크 주소기
 * @body {object} 생성 시 필요한 정보 전달
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postProductionRegister = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

/**
 * getProductionSearch()
 * 품목 검색
 * @param {string} url 링크 주소기
 * @body {object} 생성 시 필요한 정보 전달
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const getProductionSearch = async( url: string ) =>{
    const temp: IServerData = await client.get(url);
    return temp
}

export const API_URLS = {
    chit: {
        register:`/v1/chit/register`,
        list: `/v1/chit/list`,
        load: `/v1/chit/load`,
        delete: `/v1/chit/delete`,
        procedure: `/v1/chit/load/procedure`
    },
    production: {
        add: `/project/add`
    },
    material: {
        search: `/v1/material/search`
    }
}


