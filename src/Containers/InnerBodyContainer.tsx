import * as React from 'react';
import Styled, {withTheme} from 'styled-components'
import {
    BASE_URL,
    BG_COLOR,
    BG_COLOR_SUB,
    SYSTEM_NAME,
    BG_COLOR_SUB2,
    COMPANY_LOGO,
    POINT_COLOR,
    MAX_WIDTH,
    TOKEN_NAME
} from '../Common/configset'
import {ReactElement} from "react";

//가로 1100px 로 감싸는 wrap 박스

interface Props {
    styles?: Record<string, string>
    children: any
    innerStyle?: Record<string, string>
}

const InnerBodyContainer: React.FunctionComponent<Props> = ({children, styles, innerStyle}: any) => {
    return (
        <div
            style={{width: 1100, height: '100vh', marginLeft: 10, marginRight: 10, display: 'inline-block', ...styles}}>
            <FullPageDiv style={innerStyle}>
                {children}
            </FullPageDiv>

        </div>
    );
}

const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default InnerBodyContainer;
