export const getToken = () => {
    const token = localStorage.getItem('token');
    console.log(`getToken : ${token}`)
    return token!;
}

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
    console.log(`getToken : ${token}`)
}