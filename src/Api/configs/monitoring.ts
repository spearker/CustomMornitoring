import axios from 'axios'
import {getToken} from '../../Common/tokenFunctions'
import {TOKEN_NAME} from '../../Common/configset'
import {SF_ENDPOINT} from '../SF_endpoint'
import Notiflix from 'notiflix'

/**
 *
 * axios 인스턴스 기본 설정
 * - 프레스 모니터링
 *
 */
const client = axios.create()

client.defaults.baseURL = SF_ENDPOINT

client.defaults.headers.common['Authorization'] = getToken(TOKEN_NAME)

client.interceptors.response.use(function (response) {
  const returnError = getErrorCase(response.data.status, response.data.message)

  if (returnError) {
    return Promise.reject(returnError)
  } else {
    return response.data
  }
}, function (error) {
  Notiflix.Loading.Remove(300)
  if (error && error.response && error.response.status) {
    if (error.response.status === 401) {
      Notiflix.Report.Failure('요청 실패', '유효한 로그인이 아닙니다 다시 로그인해 주세요.', '닫기', () => window.location.href = '/login')
    } else if (error.response.status === 400) {
      return Notiflix.Report.Failure('요청 실패', '값을 안넣으신게 있는지 확인 해주세요.', '닫기')
    } else if (error.response.status === 500) {
      return Notiflix.Report.Failure('요청 실패', '서버에러입니다. 관리자에게 연락바랍니다.', '닫기')
    }
  } else {
    return Notiflix.Report.Failure('요청 실패', '알수 없는 에러입니다.', '닫기')
  }

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
