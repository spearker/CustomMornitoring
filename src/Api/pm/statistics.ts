import client from '../configs/basic';

/**
 * getPowerList()
 * 전력 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 * @version 0.1
 */
export const getPowerList = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getAbilityList()
 * 능력 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 * @version 0.1
 */
export const getAbilityList = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getOilSupplyData()
 * 오일공급 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 * @version 0.1
 */
export const getOilSupplyData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getReadyTimeData()
 * 비가동시간 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 * @version 0.1
 */
export const getReadyTimeData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getLoadTonData()
 * 로드톤 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 * @version 0.1
 */
export const getLoadTonData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getErrorData()
 * 에러 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */

export const getErrorData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getDefectiveData()
 * 불량률 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */

export const getDefectiveData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getProductData()
 * 제품별톤 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */

export const getProductData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results!;
}

/**
 * getMoldData()
 * 금형 타발 수 통계 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */

export const getMoldData = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    return temp.results!;
}

export const API_URLS = {
    power: {
        list:`/v1/statistics/press/electric`
    },
    error: {
        list: `/v1/statistics/press/error/list`,
        load: `/v1/statistics/press/error/detail`
    },
    ability: {
        load: `/v1/statistics/press/capacity`
    },
    oilSupply: {
        load: `/v1/statistics/press/oil`
    },
    readyTime: {
        load: `/v1/statistics/press/downtime`
    },
    defective: {
        list: '/v1/statistics/press/defective/list',
        load: '/v1/statistics/press/defective/load'
    },
    product: {
        list: '/v1/statistics/press/ton/product/list',
        load: '/v1/statistics/press/ton/product/detail'
    },
    mold: {
        list: '/v1/statistics/press/mold/punching',
        load: '/v1/statistics/press/mold/punchingDetail'
    },
    loadTon: {
        load: `/v1/statistics/press/loadtonAvg`
    }
}


