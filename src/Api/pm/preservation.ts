import client from '../configs/basic';

/**
 * getMoldData()
 * 금형 보전 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */

export const getMoldData = async (url: string) => {
    const temp: IServerData = await client.get(url);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    return temp.results!;
}

/**
 * getMoldData()
 * 오버톤 보전 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */

export const getOvertoneData = async (url: string) => {
    const temp: IServerData = await client.get(url);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    return temp.results!;
}

/**
 * getClutchData()
 * 클러치 보존 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 준희
 */
export const getCluchData = async (url: string, bodyData: object) => {
    const temp: IServerData = await client.post(url, bodyData);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    return temp.results!;
}

/**
 * getOilData()
 * 오일 보존 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 */
export const getOilData = async (url: string) => {
    const temp: IServerData = await client.get(url);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    return temp.results!;
}


export const API_URLS = {
    mold: {
        list: `/v1/preservation/press/mold/list`,
        load: `/v1/preservation/press/mold/load`
    },
    clutch: {
        load: `/v1/preservation/press/slipAngle`
    },
    overtone: {
        list: `/v1/preservation/press/overTon/list`,
        load: `/v1/preservation/press/overTon/load`
    },
    oil: {
        list: `/v1/preservation/press/oil/list`,
        load: `/v1/preservation/press/oil/load`
    }
}


