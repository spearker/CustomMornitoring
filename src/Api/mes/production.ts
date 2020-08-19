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

export const API_URLS = {
    chit: {
        register:`/chit/register`,
        list: `/chit/list`,
        load: `/chit/load`,
        delete: `/chit/delete`,
        procedure: `/chit/load/procedure`
    },
    production: {
        add: `/project/add`
    }
}


