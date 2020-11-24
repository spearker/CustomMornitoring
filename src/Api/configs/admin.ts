import axios from 'axios'
import {getToken} from '../../Common/tokenFunctions'
import {TOKEN_NAME} from '../../Common/configset'
import {SF_ENDPOINT_ADMIN} from '../SF_endpoint'

/**
 *
 * axios 인스턴스 기본 설정
 * - 기준 정보 등록
 *
 */
const client = axios.create()

client.defaults.baseURL = SF_ENDPOINT_ADMIN

client.defaults.headers.common['Authorization'] = getToken(TOKEN_NAME)

client.interceptors.response.use(function (response) {
    console.log(response.data)
    const returnError = getErrorCase(response.data.status)

    if (returnError) {
        return Promise.reject(returnError)
    } else {
        return response.data
    }

}, function (error) {
    console.error(error)
    //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다.');
    return Promise.reject(error)

})

const getErrorCase = (code) => {
    console.log(code)
    switch (code) {
        case 2000:
            // alert('[삭제 불가] 해당 데이터를 참조하는 데이터가 있습니다')
            return '[삭제 불가] 해당 데이터를 참조하는 데이터가 있습니다'
        case 3000:
            return '[조회 불가] 해당 ID를 지닌 데이터가 없습니다'
        case 1011:
            return '[삭제 불가] 해당 데이터를 참조하는 표준 문서가 존재합니다'
        case 200:
            return false
        case '200':
            return false
        default:
            return '[RESPONSE ERROR] 요청을 처리 할 수 없습니다.'
    }
}
export default client
