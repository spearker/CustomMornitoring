import axios from 'axios';

const TOKEN_NAME = 'sizl_auth'
import Notiflix from 'notiflix'
import {SF_ENDPOINT_FILE} from "../SF_endpoint";

/**
 *
 * axios 인스턴스 기본 설정
 * - 파일데이터
 */
const client = axios.create();

client.defaults.baseURL = SF_ENDPOINT_FILE;

//client.defaults.headers.common['Authorization'] = getToken(TOKEN_NAME);
client.interceptors.response.use(function (response) {
    const returnError = getErrorCase(response.data.status, response.data.message)

    if (returnError) {
        return Promise.reject(returnError)
    } else {
        return response.data
    }
}, function (error) {
    Notiflix.Loading.Remove(300)
    if (error.response.status) {
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

export default client;
