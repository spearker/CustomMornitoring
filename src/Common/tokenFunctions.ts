/**
 * getToken()
 * : 토큰을 가져오는 함수
 * @param {string} name 스토리지 네임
 * @returns 토큰값 
 */
export const getToken = (name: string) => {
    const token = localStorage.getItem('token');
    return token!;
}

/**
 * setToken()
 * : 토큰을 저장하는 함수
 * @param {string} name 스토리지 네임
 * @param {string} token 토큰값
 * @returns X
 */
export const setToken = (name: string, token: string) => {
    localStorage.setItem('token', token);
}