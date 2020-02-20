export const getToken = () => {
    const token = localStorage.getItem('token');
    console.log(`getToken : ${token}`)
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9';
}