import client from '../configs/basic';

/**
 * postBarcode()
 * 바코드 포스트 메소드 관리
 * @param {string} url 링크 주소
 * @param object
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const postBarcode = async (url: string, object: object) => {
    const temp: IServerData = await client.post(url, object);
    console.log(temp.status);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    return temp.status;
}

/**
 * getBarcode()
 * 바코드 겟 메소드 관리
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const getBarcode = async (url: string) => {
    const temp: IServerData = await client.get(url);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    console.log(temp.results);
    return temp.results;
}

/**
 * getDeleteBarcode()
 * 바코드 겟 메소드 관리
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const getDeleteBarcode = async (url: string, object: object) => {
    const temp: IServerData = await client.get(url, object);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    console.log(temp.results);
    return temp.results;
}


export const API_URLS = {
    barcode: {
        register: `/v1/barcode/register`,
        update: `/v1/barcode/update`,
        list: `/v1/barcode/list`,
        delete: `/v1/barcode/delete`,
        imgDownload: `/v1/imgDownload`,
        previewImg: `/v1/previewImg`,
        detailInfo: `/v1/barcode/detailInfo`,
        getBarcodeInfo: `/v1/barcode/getBarcodeInfo`,
        upload: `/v1/file/barcode/upload`,
    },
}
