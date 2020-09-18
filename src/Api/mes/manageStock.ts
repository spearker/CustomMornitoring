import client from '../configs/basic';

/**
 * getItemSearch()
 * 품목 입력
 * @param {string} url 링크 주소
 * @param {string} item_name 품목명
 * @returns {Array} 품목 리스트
* @author 준희
*/
export const getItemSearch = async( url: string) =>{
    const temp: IServerData = await client.get(url);
    return temp
}

export const API_URLS = {
    searchItem:{
        list: `/manageStock/searchItem`,
    },
}


