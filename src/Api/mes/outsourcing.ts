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
export const postOutsourcingDelete = async( url: string,object: object) =>{
    const temp: IServerData = await client.post(url,object);
    console.log(temp.status);
    return temp.status;
}

/**
 * getOutsourcingList()
 * 공정 리스트 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const getOutsourcingList = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results;
}


/**
 * getSegmentList()
 * 세분화 리스트 정보 불러오기
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const getSegmentList = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    console.log(temp.results);
    return temp.results;
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
export const postSegmentDelete = async( url: string, object: object) =>{
    const temp: IServerData = await client.post(url,object);
    console.log(temp.results);
    return temp.results;
}



/**
 * postOutsourcingRegister()
 * 공정 등록하기
 * @param {string} url 링크 주소
 * @param {Object} bodyData 공정 등록 정보 객체
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 준희
 */
export const postOutsourcingRegister = async( url: string, bodyData: object) =>{
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

export const getSearchMachine = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    return temp
}

/**
 * getSearchMachine()
 * 공정 검색하기
 * @param {string} url 링크 주소
 * @param {Object} keyword 공정명
 * @returns {Object} 기게정보 리스트
 * @author 준희
 */

export const getSearchOutsourcing = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    return temp
}

export const API_URLS = {
    outsourcing:{
        register: `/v1/Outsourcing/register`,
        update: `/v1/Outsourcing/update`,
        load: `/v1/Outsourcing/view`,
        list: `/v1/Outsourcing/name/list`,
        delete: `/v1/Outsourcing/delete`,
        search: `/v1/Outsourcing/name/select`,
    },
}
