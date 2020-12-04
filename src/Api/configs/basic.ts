import axios from 'axios'
import {getToken} from '../../Common/tokenFunctions'
import {TOKEN_NAME} from '../../Common/configset'
import {SF_ENDPOINT, SF_ENDPOINT_WEB} from '../SF_endpoint'
import Notiflix from 'notiflix'
import {useHistory} from "react-router-dom";

/**
 *
 * axios 인스턴스 기본 설정
 * - 기준 정보 등록
 *
 */
const client = axios.create()

client.defaults.baseURL = SF_ENDPOINT + '/api'

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

    if (error.response.status === 401) {
        Notiflix.Report.Failure('요청 실패', '유효한 로그인이 아닙니다 다시 로그인해 주세요.', '닫기', () => window.location.href = "/login")
    } else if (error.response.status === 400) {
        return Notiflix.Report.Failure('요청 실패', '값을 안넣으신게 있는지 확인 해주세요.', '닫기')
    } else if (error.response.status === 500) {
        return Notiflix.Report.Failure('요청 실패', '서버에러입니다. 관리자에게 연락바랍니다.', '닫기')
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
        case 2000:
        case 3000:
        case 1011:
            Notiflix.Loading.Remove(300)
            return Notiflix.Report.Failure('요청 실패', message, '닫기')
        default:
            return '[RESPONSE ERROR] 요청을 처리 할 수 없습니다.'
    }
}
export default client
