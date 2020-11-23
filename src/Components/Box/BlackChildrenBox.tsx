import React from "react";
import Styled from "styled-components";

interface Props {
    children?: any
}

const BlackChildrenBox: React.FunctionComponent<Props> = ({children}) => {
    return (
        <div>
            <BlackBg>
                {children}
            </BlackBg>
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
