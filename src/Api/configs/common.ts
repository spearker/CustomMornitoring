import axios from 'axios';
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";

/**
 *
 * axios 인스턴스 기본 설정
 * - 토큰이 필요없는 common 기능
 * - 서버 상태체크
 */
const client = axios.create();

client.defaults.baseURL = 'http://203.234.183.22:8299';

client.interceptors.response.use(function (response) {


    console.log(response.data.status)
    const returnError = getErrorCase(response.data.status)

    if (returnError) {
        //alert(returnError)
        return Promise.reject();
    } else {
        return response.data
    }

    return response.data

}, function (error) {
    console.error(error)
    alert('[SERVER ERROR] 서버 사용 불가');
    return Promise.reject(error);

});

const getErrorCase = (code) => {
    switch (code) {

        case 200:
            return false
        case '200':
            return false
        default:
            return '[RESPONSE ERROR] 요청을 처리 할 수 없습니다.'
    }
}
export default client;
