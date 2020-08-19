import client from '../configs/common';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * postContractRegister()
 * 수주 등록하기
 * @param {string} url 링크 주소
 * @body {object} 생성 시 필요한 정보 전달
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postContractRegister = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

/**
 * postContractModify()
 * 수주 수정하기
 * @param {string} url 링크 주소
 * @body {object} 생성 시 필요한 정보 전달
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postContractModify = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

/**
 * postOrderRegister()
 * 출하 등록하기
 * @param {string} url 링크 주소
 * @body {object} 생성 시 필요한 정보 전달
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postOrderRegister = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

/**
 * postOrderRegister()
 * 출하 수정하기
 * @param {string} url 링크 주소
 * @body {object} 생성 시 필요한 정보 전달
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postOrderModify = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

export const API_URLS = {
    contract:{
        register: `/marketing/contract/register`,
        update: `/marketing/contract/update`
    },
    order:{
        register: `/marketing/order/register`,
        update: `/marketing/order/update`
    }

}


