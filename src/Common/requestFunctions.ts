import Axios from "axios";
import { BASE_URL } from "./configset";
import { getToken } from "./tokenFunctions";



/**
 * postRequest()
 * : axios post 요청 + 토큰 포함
 * @param {string} url 요청 주소
 * @param {object} data json 혹은 form 데이터 
 * @param {string} token 토큰값
 * @returns 리턴데이터, 요청실패(false)
 */
export const postRequest = (url: string, data: object, token: string): any => {

    Axios.post(url,
         data,
         { 'headers': { 'Authorization': token } }
    ) 
    .then(function (res: IServerResponse) {
      return res.data
    })
    .catch(function (error) {
      console.log(error);
      return false
    });
    return false
}

/**
 * getRequest()
 * : axios get 요청 + 토큰 포함
 * @param {string} url 요청 주소
 * @param {string} token 토큰값
 * @returns 리턴데이터, 요청실패(false)
 */
export const getRequest = (url: string, token: string): any => {
    
    Axios.get(url, { 'headers': { 'Authorization': token } }) 
    .then(function (res: IServerResponse) {
      return res.data
    })
    .catch(function (error) {
      console.log(error);
      return false
    });

    return false
}

/**
 * postRequestWithNoToken()
 * : axios post 요청 + 토큰 제외
 * @param {string} url 요청 주소
 * @param {object} data json 혹은 form 데이터 
 * @returns 리턴데이터, 요청실패(false)
 */
export const postRequestWithNoToken = (url: string, data: object): any => {
    
    Axios.get(url, data) 
    .then(function (res: IServerResponse) {
      return res.data
    })
    .catch(function (error) {
      console.log(error);
      return false
    });   
    return false
}

/**
 * getRequestWithNoToken()
 * axios get 요청 + 토큰 제외
 * @param {string} url 요청 주소
 * @returns 리턴데이터, 요청실패(false)
 */
export const getRequestWithNoToken = (url: string): any => {

    Axios.get(url) 
    .then(function (res: IServerResponse) {
      return res.data
    })
    .catch(function (error) {
      console.log(error);
      return false
    });   
  
    return false
}