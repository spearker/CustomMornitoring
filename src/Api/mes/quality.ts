import client from '../configs/basic';

/**
 * postQualityRegister()
 * 품질 등록하기
 * @param {string} url 링크 주소
 * @param {Object} bodyData 공정 등록 정보 객체
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 정민
 */

export const postQualityRegister = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

/**
 * getQualityList()
 * 푸질 리스트 불러오기
 * @param {string} url 링크 주소
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 정민
 */

export const getQualityList = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    return temp.results
}

export const API_URLS = {
    request:{
        register: `/v1/quality/request/register`,
        list: `/v1/quality/request/list`,
        search: `/v1/quality/request/search`,
        update: `/v1/quality/request/update`
    },
    response:{
        requestList: `/v1/quality/response/request/list`,
        update: `/v1/quality/response/update`,
        list: `/v1/quality/response/list`,
        search: `/v1/quality/response/search`
    }
}
