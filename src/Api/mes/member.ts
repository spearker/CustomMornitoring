import client from '../configs/basic'

/**
 * getBasicList()
 * 기준 정보 목록 불러오기
 * @param {string} url 링크 주소
 * @returns {Array} list
 * @author 수민
 */
export const getMemberList = async (url: string) => {
    const temp: IServerData = await client.get(url)

    if (temp) {
        return temp.results!
    }
}

/**
 * postCreateMember()
 * 멤버 생성
 * @param {string} url 링크 주소
 * @param object
 * @returns {Array} list
 * @author 정민
 */

export const postCreateMember = async (url: string, object: object) => {
    const temp: IServerData = await client.post(url, object)

    return temp!
}

export const API_URLS = {
    member: {
        list: `/v1/member/list`,
        create: `/v1/member/create`,
        update: `/v1/member/update`,
        load: `/v1/member/load`
    },
}
