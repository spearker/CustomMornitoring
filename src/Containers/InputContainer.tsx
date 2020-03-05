import * as React from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../Common/configset'

//인풋 창 index container

const InputContainer = ({title, children}: any) => {
  return (
      <div style={{ borderBottom: 'solid 0.5px #d3d3d3' , display:'flex', paddingTop:17, paddingBottom:17, verticalAlign: 'top'}}>
          <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: 180, display:'inline-block',}}>{title === "" ? " " : `· ${title}`}</p>
          {children}
      </div> 
 
  );
}


export default InputContainer;