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
  console.log({
    url,
    temp
  })
  if (temp.status === 400) {
    alert('요청이 잘못되었습니다.')
    return
  }
  return temp.results!
}

export const API_URLS = {
  member: {
    list: `/v1/member/list`,
  },
}
