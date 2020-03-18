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
export const postRequest = async (url: string, data: object, token: string): Promise<any> => {

    const returnValue = await Axios.post(url,
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
    return returnValue
}

/**
 * getRequest()
 * : axios get 요청 + 토큰 포함
 * @param {string} url 요청 주소
 * @param {string} token 토큰값
 * @returns 리턴데이터, 요청실패(false)
 */
export const getRequest = async (url: string, token: string): Promise<any> => {
    
    const returnValue = await Axios.get(url, { 'headers': { 'Authorization': token } }) 
    .then(function (res: IServerResponse) {
      return res.data
    })
    .catch(function (error) {
      console.log(error);
      return false
    });

    return returnValue
}

/**
 * postRequestWithNoToken()
 * : axios post 요청 + 토큰 제외
 * @param {string} url 요청 주소
 * @param {object} data json 혹은 form 데이터 
 * @returns 리턴데이터, 요청실패(false)
 */
export const postRequestWithNoToken = async (url: string, data: object): Promise<any> => {
    console.log('try--request');
    
    const returnValue = await Axios.post(url, data) 
    .then(function (res) {
      
      console.log(res);
      console.log('accept--res : ' + res);
      return res.data
    })
    .catch(function (error) {
      console.log(error);
      return false
    });   

    return returnValue
    
}

/**
 * getRequestWithNoToken()
 * axios get 요청 + 토큰 제외
 * @param {string} url 요청 주소
 * @returns 리턴데이터, 요청실패(false)
 */
export const getRequestWithNoToken = async (url: string) => {
    console.log('try--request');
    const returnValue = await Axios.get(url) 
    .then(function (res: IServerResponse) {
      console.log('accept--res : ' + res);
      return res.data
    })
    .catch(function (error) {
      console.log(error);
      return false
    });   
  
    return returnValue
}

/**
 * getParameter()
 * ?key= 뒤의 파라매터 값을 가져오는 함수 
 * @param {string} key 키값
 * @returns 파라매터 키에 매칭되는 value값
 */
export const getParameter = (key) =>{
  key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + key + "=([^&#]*)"),
      results = regex.exec(window.location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

