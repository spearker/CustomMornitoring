import client from '../configs/basic';

/**
 * postMarketing()
 * 영업관리 포스트 메소드 관리
 * @param {string} url 링크 주소
 * @param object
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const postMarketing = async (url: string, object: object) => {
    const temp: IServerData = await client.post(url, object);
    console.log(temp.status);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    return temp.status;
}

/**
 * getMarketing()
 * 영업 관리 겟 메소드 관리
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const getMarketing = async (url: string) => {
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    return temp.results;
}


/**
 * postContractRegister()
 * 수주 등록하기
 * @param {string} url 링크 주소
 * @body {object} 생성 시 필요한 정보 전달
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postContractRegister = async (url: string, bodyData: object) => {
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
export const postContractModify = async (url: string, bodyData: object) => {
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
export const postOrderRegister = async (url: string, bodyData: object) => {
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
export const postOrderModify = async (url: string, bodyData: object) => {
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

export const API_URLS = {
    contract: {
        register: `/v1/marketing/contract/register`,
        update: `/v1/marketing/contract/update`,
        load: `/v1/marketing/contract/load`,
        list: `/v1/marketing/contract/list`,
        delete: `/v1/marketing/contract/delete`,
    },
    shipment: {
        register: `/v1/marketing/shipment/register`,
        update: `/v1/marketing/shipment/update`,
        load: `/v1/marketing/shipment/load`,
        list: `/v1/marketing/shipment/list`,
        delete: `/v1/marketing/shipment/delete`,
    },
}
