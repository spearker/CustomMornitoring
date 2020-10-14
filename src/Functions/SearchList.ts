import {getToken} from "../Common/tokenFunctions";
import {TOKEN_NAME} from "../Common/configset";
import {getRequest} from "../Common/requestFunctions";

export const SEARCH_TYPES = {
    'BASIC_FACTORY' : 'factory',



}
export const onClickSearch = async(keyword:string = '', type:string = '')=>{


    if(keyword  === '' || keyword.length < 2){
      alert('2글자 이상의 키워드를 입력해주세요')

      return;
    }

    const res = await getRequest(`http://203.234.183.22:8299/api/v1/common/search?keyword=${keyword}&type=${type}&orderBy=1`, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
      alert('[SERVER ERROR] 예기치 못한 에러가 발생하였습니다.')

    }else{
      if(res.status === 200){
        const list = res.results;
        return list

      }else{
        //TODO:  기타 오류
        alert('[STATUS ERROR] 예기치 못한 에러가 발생하였습니다.')

      }
    }
  };

