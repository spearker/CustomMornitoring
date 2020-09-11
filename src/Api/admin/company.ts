import client from '../configs/admin';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * getAdminData()
 * 어드민 API get으로 호출하는 함수
 * @param {string} url 링크 주소
 * @returns {object} data
 * @author 준희
 */
export const getAdminData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    //console.log(temp.results.items);
    return temp;
}

export const API_URLS = {
    company: {
        load:`/v2/super/map/company/load`,
    },
    machine: {
        load: `/v2/super/map/company/machine/load`
    },
    factory:{
        list: `/v2/super/map/factory/machine/list`
    }

}
