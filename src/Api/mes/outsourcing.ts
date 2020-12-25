import client from '../configs/basic';

/**
 * postOutsourcingDelete()
 * 공정 리스트 삭제
 * @param {string} url 링크 주소
 * @param object
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const postOutsourcingDelete = async (url: string, object: object) => {
    const temp: IServerData = await client.post(url, object);

    if (temp) {
        return temp.status;
    }
}

/**
 * getOutsourcingList()
 * 외주처 리스트 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const getOutsourcingList = async (url: string) => {
    const temp: IServerData = await client.get(url);

    if (temp) {
        return temp.results;
    }
}

/**
 * postOutsourcingList()
 * 외주처 리스트 상세 정보 불러오기
 * @param {string} url 링크 주소
 * @param object
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const postOutsourcingList = async (url: string, object: object) => {
    const temp: IServerData = await client.post(url, object);

    if (temp) {
        return temp.results;
    }
}


/**
 * getSegmentList()
 * 세분화 리스트 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const getSegmentList = async (url: string) => {
    const temp: IServerData = await client.get(url);

    if (temp) {
        return temp.results;
    }
}

/**
 * postSegmentDelete()
 * 세분화 리스트 정보 삭제
 * @param {string} url 링크 주소
 * @param object
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const postSegmentDelete = async (url: string, object: object) => {
    const temp: IServerData = await client.post(url, object);

    if (temp) {
        return temp.results;
    }
}


/**
 * postOutsourcingRegister()
 * 공정 등록하기
 * @param {string} url 링크 주소
 * @param {Object} bodyData 공정 등록 정보 객체
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postOutsourcingRegister = async (url: string, bodyData: object) => {
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

export const getSearchMachine = async (url: string) => {
    const temp: IServerData = await client.get(url);

    return temp
}

/**
 * getSearchOutsourcing()
 * 외주처 검색하기
 * @param {string} url 링크 주소
 * @param {Object} keyword 공정명
 * @returns {Object} 외주처 리스트
 * @author 정민
 */

export const getSearchOutsourcing = async (url: string) => {
    const temp: IServerData = await client.get(url);

    if (temp) {
        return temp.results
    }
}

export const API_URLS = {
    outsourcing: {
        register: `/v1/outsourcing/register`,
        update: `/v1/outsourcing/update`,
        load: `/v1/outsourcing/load`,
        list: `/v1/outsourcing/list`,
        delete: `/v1/outsourcing/delete`,
        search: `/v1/outsourcing/name/search`,
    },
    order: {
        register: `/v1/outsourcing/order/register`,
        list: `/v1/outsourcing/order/list`,
        load: `/v1/outsourcing/order/load`,
        update: `/v1/outsourcing/order/update`,
        delete: `/v1/outsourcing/order/delete`,
        complete: `/v1/outsourcing/order/complete`,
        cancel: `/v1/outsourcing/order/cancel`

    },
    contract: {
        register: `/v1/outsourcing/contract/register`,
        list: `/v1/outsourcing/contract/list`,
        update: `/v1/outsourcing/contract/update`,
        load: `/v1/outsourcing/contract/load`,
        delete: `/v1/outsourcing/contract/delete`,
        complete: `/v1/outsourcing/contract/complete`,
        cancel: `/v1/outsourcing/contract/cancel`,
    }
}
