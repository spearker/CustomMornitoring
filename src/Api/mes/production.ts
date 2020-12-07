import client from '../configs/basic'


/**
 * getProjectList()
 * 생산 계획 관리 리스트/ 생산 계획 리스트 불러오기
 * @param {string} url 링크 주소기
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 정민
 */
export const getProjectList = async (url: string) => {
    const temp: IServerData = await client.get(url)

    return temp.results
}


/**
 * getHistorySearch()
 * 작업 이력 검색
 * @param {string} url 링크 주소기
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 정민
 */
export const getHistorySearch = async (url: string) => {
    const temp: IServerData = await client.get(url)

    return temp.results
}

/**
 * getProjectList()
 * 생산 계획 관리 리스트/ 생산 계획 리스트 불러오기
 * @param {string} url 링크 주소기
 * @param object
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 정민
 */

export const postProjectDelete = async (url: string, object: object) => {
    const temp: IServerData = await client.post(url, object)

    return temp.results
}


/**
 * postChitRegister()
 * 전표 생성하기
 * @param {string} url 링크 주소기
 * @body {object} 생성 시 필요한 정보 전달
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postChitRegister = async (url: string, bodyData: object) => {
    const temp: IServerData = await client.post(url, bodyData)

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
export const postProductionRegister = async (url: string, bodyData: object) => {
    const temp: IServerData = await client.post(url, bodyData)

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
export const getProductionSearch = async (url: string) => {
    const temp: IServerData = await client.get(url)

    return temp.results
}

export const API_URLS = {
    chit: {
        register: `/v1/chit/register`,
        list: `/v1/chit/list`,
        todayList: `/v1/chit/list/today`,
        load: `/v1/chit/load`,
        delete: `/v1/chit/delete`,
        procedure: `/v1/chit/load/procedure`
    },
    production: {
        // add: `/v1/project/history/register`,
        register: `/v1/project/register`,
        delete: `/v1/project/delete`,
        list: `/v1/project/list`,
        load: `/v1/project/load`,
        history: `/v1/project/history`,
        search: `/v1/project/search`,
        dropdown: `/v1/project/dropdown`,
        distribute: `/v1/project/distribute`,
        search2: `/v1/project/history/search`,
        chitSelect: `/v1/chit/select/machine`,
        add: `/v1/project/history/start`,
        historyLoad: `/v1/project/history/load`,
        finish: `/v1/project/history/finish`
    },
    defective: {
        list: '/v1/defective/list',
        load: '/v1/defective/load',
        delete: '/v1/defective/delete',
    },
    material: {
        search: `/v1/material/search`
    },
    history: {
        search: `/v1/project/history/search`
    }
}


