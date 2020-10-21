import * as React from 'react';
import Styled, { withTheme } from 'styled-components'
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
import { ReactElement } from "react";

//가로 1100px 로 감싸는 wrap 박스

interface Props {
  styles?: Record<string, string>
  children: any
}

const InnerBodyContainer: React.FunctionComponent<Props> = ({ children, styles }: any) => {
  return (
      <div style={{ width: 1100, marginLeft: 10, marginRight: 10, display: 'inline-block', ...styles }}>
        <FullPageDiv>
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
