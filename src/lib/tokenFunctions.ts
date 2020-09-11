/**
 * getToken()
 * : 토큰을 가져오는 함수
 * @param {string} name 스토리지 네임
 * @returns 토큰값 
 */
export const getToken = (name: string) => {
    const token = localStorage.getItem(name);
    return token!;
}

/**
 * setToken()
 * : 토큰을 저장하는 함수
 * @param {string} name 스토리지 네임
 * @param {string} token 토큰값
 * @returns X
 */
export const setToken = (name: string, token: any) => {
    localStorage.setItem(name, token);
}

/**
 * removeToken()
 * : 토큰을 삭제하는 함수
 * @returns X
 */
export const removeToken = (name: string) => {
    localStorage.removeItem(name);
}

export const loadXHR = (url:string) => {

    return new Promise(function(resolve, reject) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onerror = function() {reject("Network error.")};
            xhr.onload = function() {
                if (xhr.status === 200) {resolve(xhr.response)}
                else {reject("Loading error:" + xhr.statusText)}
            };
            xhr.send();
        }
        catch(err) {reject(err.message)}
    });
}