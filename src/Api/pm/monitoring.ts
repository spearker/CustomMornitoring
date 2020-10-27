import client from '../configs/monitoring'

/**
 * getClutchData()
 * 로드톤 모니터링 불러오기
 * @param {string} url 링크 주소
 * @returns {list} data object[]
 * @author 준희
 * @version 0.1
 */
export const getLoadTonList = async (url: string) => {
    const temp: IServerData = await client.get(url)
    console.log(temp.results)
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    return temp.results!
}

export const postLoadTonList = async (url: string, bodyData: object) => {
    const temp: IServerData = await client.post(url, bodyData)
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    console.log(temp.results)
    return temp.results!
}


export const API_URLS = {
    loadTon: {
        list: `/v1/monitoring/loadton/detail`,
        predata: `/v1/monitoring/loadton/predetail`
    },
    press: {
        monitoring: `/v1/monitoring/press/details`
    },
    power: {
        monitoring: `v1/monitoring/cms/map`
    }

}


