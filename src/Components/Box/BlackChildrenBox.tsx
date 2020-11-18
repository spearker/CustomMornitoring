import React from "react";
import Styled from "styled-components";

const BlackChildrenBox: React.FunctionComponent = () => {
    return (
        <div>
            <BlackBg/>
        </div>
    )
}

const BlackBg = Styled.div`
    padding: 20px 20px 30px 20px;
    border-radius: 6px;
    background-color: #111319;
    margin-top: 20px;
`

export default BlackChildrenBox
