import axios from 'axios';
import {getToken} from '../../Common/tokenFunctions';
import {TOKEN_NAME} from '../../Common/configset';

/**
 *
 * axios 인스턴스 기본 설정
 * - 회사데이터 관리 (토큰 필요 없음)
 * - 지도데이터 관리 (토큰 필요 없음)
 */
const client = axios.create();

client.defaults.baseURL = 'http://112.168.150.239:8299/api';

client.defaults.headers.common['Authorization'] = getToken(TOKEN_NAME);

client.interceptors.response.use(function (response) {
    //console.log(response.data.status)
    const returnError = getErrorCase(response.data.status)

    if (returnError) {
        alert(returnError)
        return Promise.reject();
    } else {
        return response.data
    }

}, function (error) {
    console.error(error)
    //alert('SERVER ERROR] 요청을 처리 할 수 없습니다.');
    return Promise.reject(error);

});

const getErrorCase = (code: any) => {
    switch (code) {
        case 2000:
            // alert('[삭제 불가] 해당 데이터를 참조하는 데이터가 있습니다')
            return '[삭제 불가] 해당 데이터를 참조하는 데이터가 있습니다';
        case 3000:
            return '[삭제 불가] 기존 지도 데이터가 존재합니다. 기존 데이터를 수정해주세요.';
        case 1011:
            return '[삭제 불가] 해당 데이터를 참조하는 표준 문서가 존재합니다';
        case 200:
            return false
        case '200':
            return false
        default:
            return '[RESPONSE ERROR] 요청을 처리 할 수 없습니다.'
    }
}
export default client;
