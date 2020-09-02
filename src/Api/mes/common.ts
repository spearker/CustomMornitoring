import client from '../configs/common';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * getServerStatus()
 * 서버 상태 불러오기
 * @param {string} url 링크 주소
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 수민
 */
export const getServerStatus = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    return true
}


export const API_URLS = {
    status: {
        check:`/server/state`,
    },

  }


