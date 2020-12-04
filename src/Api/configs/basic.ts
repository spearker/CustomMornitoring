import axios from 'axios'
import {getToken} from '../../Common/tokenFunctions'
import {TOKEN_NAME} from '../../Common/configset'
import {SF_ENDPOINT} from '../SF_endpoint'
import Notiflix from 'notiflix'

/**
 *
 * axios 인스턴스 기본 설정
 * - 기준 정보 등록
 *
 */
const client = axios.create()

client.defaults.baseURL = SF_ENDPOINT + '/api'

client.defaults.headers.common['Authorization'] = getToken(TOKEN_NAME)

client.interceptors.response.use((response) => {
  const returnError = getErrorCase(response.data.status, response.data.message)

  if (returnError) {
    return Promise.reject(returnError)
  } else {
    return response.data
  }

}, (error) => {
  console.log(error)
  // alert('[ERROR] 요청을 처리 할 수 없습니다.')
  return Promise.reject(error)
})

const getErrorCase = (code, message) => {
  switch (code) {
    case 200:
      return false
    case '200':
      return false
    default:
      Notiflix.Loading.Remove(300)
      return Notiflix.Report.Failure('요청 실패', message, '닫기')
  }
}
export default client
