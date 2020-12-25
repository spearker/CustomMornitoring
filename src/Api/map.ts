import client from '../Api/configs/admin';

/**
 * getCommonList()
 * 회사목록/지도목록/기계목록/공장목록 가져오기
 * @param {string} url 링크 주소
 * @returns {Array} list
 * @author 수민
 */
export const getCommonList = async (url: string) => {
    const temp: IServerData = await client.get(url);

    return temp.results!;
}

/**
 * saveCommonData()
 * 지도 데이터 저장
 * @param {string} url 링크 주소
 * @param {Object} data 저장 데이터
 * @returns {Boolean} true/false 여부
 * @author 수민
 */
export const saveCommonData = async (url: string, data: any) => {
    const temp: IServerData = await client.post(url, data);

    if (temp) {
        return true
    } else {
        return false
    }
}

/**
 * getCommonData()
 * 지도 데이터 불러오기
 * @param {string} url 링크 주소
 * @returns {Object} 데이터 객체
 * @author 수민
 */
export const getCommonData = async (url: string) => {
    const temp: IServerData = await client.get(url);

    return temp.results!;
}


export const API_URLS = {
    company: {
        list: `/v2/super/map/company/load`,
    },
    map: {
        delete: `/v1/device/delete`,
        create: `/v2/super/map/create`,
        update: `/v2/super/map/update`,
        list: `/v2/super/map/list`,
        load: `/v2/super/map/load`,
    },
    factory: {
        list: `/v2/super/map/factory/list`,
    },
    machine: {
        list: `/v2/super/map/company/machine/load`,
    }

}


