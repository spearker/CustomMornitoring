import { createGlobalStyle } from "styled-components";

//글로벌 스타일 문서 ( 기본 css reset 관련 정의 ) - TODO: 현재 적용 X
​
const globalStyles = createGlobalStyle`
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:boerder-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 14px;
        background-color:rgba(20,20,20,1);
    }
`;
​
​
export default globalStyles;