import client from '../configs/map';

/**
 * getMonitoringMapData();
 * 프레스 현황 불러오기
 * @param {string} url 링크 주소
 * @returns {Object} 데이터
 * @author 수민
 */
export const getMonitoringMapData = async (url: string) => {
    const temp: IServerData = await client.get(url);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    console.log(temp.results);
    return temp.results!;
}

/**
 * getMapListData();
 * 공장 리스트 가져오기
 * @param {string} url 링크 주소
 * @returns {Array} 데이터
 * @author 수민
 */
export const getMapListData = async (url: string) => {
    const temp: IServerData = await client.get(url);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    console.log(temp.results);
    return temp.results!;
}


export const API_URLS = {
    press: {
        monitoring: `/v1/monitoring/press/map`,
        statics: `/v1/map/load`,
    },
    factory: {
        list: `/v1/factory/keys`,
    }

}


