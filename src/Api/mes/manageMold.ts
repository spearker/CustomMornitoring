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

export const API_URLS = {
    mold:{
        register: `/manageMold/registerMold`,
    },
}


