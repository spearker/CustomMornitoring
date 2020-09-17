import client from '../configs/basic';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * getCumstomerData()
 * 거래처 리스트 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 */

export const getCustomerData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results;
}

/**
 * postCustomerDelete()
 * 거래처 리스트 삭제
 * @param {string} url 링크 주소
 * @param object
 * @returns {object} data object
 * @author 정민
 */

export const postCustomerDelete = async( url: string, object: object ) =>{
    const temp: IServerData = await client.post(url,object);
    console.log(temp.results);
    return temp.results;
}


export const API_URLS = {
    customer: {
        list: `/v1/customer/list`,
        load: `/v1/customer/load`,
        search: `/v1/customer/search`,
        delete: `/v1/customer/delete`,
        update: `/v1/customer/update`,

    },

}


