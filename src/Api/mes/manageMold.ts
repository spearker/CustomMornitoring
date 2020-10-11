import client from '../configs/basic';

/**
 * postMoldRegister()
 * 금형 등록하기
 * @param {string} url 링크 주소
 * @param {Object} bodyData 공정 등록 정보 객체
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 정민
 */

export const postMoldRegister = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp
}

/**
 * postMoldState()
 * 금형 상태
 * @param {string} url 링크 주소
 * @param {Object} bodyData 공정 등록 정보 객체
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 정민
 */

export const postMoldState = async( url: string, bodyData: object) =>{
    const temp: IServerData = await client.post(url, bodyData);
    return temp.results
}

/**
 * getMoldList()
 * 금형 리스트 불러오기
 * @param {string} url 링크 주소
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 정민
 */

export const getMoldList = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    return temp.results
}

export const API_URLS = {
    repair:{
        register: `/v1/manageMold/repair/register`,
        update: `/v1/mananageMold/repair/update`,
        delete: `/v1/mananageMold/repair/delete`,
        list: `/v1/manageMold/repair/list`,
        detail: `/v1/manageMold/repair/detail`,
        complete: `/v1/manageMold/repair/complete`,
        cancel: `/v1/manageMold/repair/cancel`
    },
    manage:{
        register: `/v1/manageMold/manage/register`,
        update: `/v1/mananageMold/manage/update`,
        delete: `/v1/mananageMold/manage/delete`,
        list: `/v1/manageMold/manage/list`,
        detail: `/v1/manageMold/manage/detail`,
        complete: `/v1/manageMold/manage/complete`,
        cancel: `/v1/manageMold/manage/cancle`
    },
    making:{
        register: `/v1/manageMold/making/register`,
        update: `/v1/mananageMold/making/update`,
        delete: `/v1/mananageMold/making/delete`,
        list: `/v1/manageMold/making/list`,
        detail: `/v1/manageMold/making/detail`,
        complete: `/v1/manageMold/making/complete`,
        cancel: `/v1/manageMold/making/cancel`
    }
}


