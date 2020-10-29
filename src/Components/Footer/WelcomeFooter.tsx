import React, { useEffect } from 'react'
import Styled from 'styled-components'
import {
  BG_COLOR,
  BG_COLOR_SUB,
  SYSTEM_NAME,
  BG_COLOR_SUB2,
  COMPANY_LOGO,
  POINT_COLOR,
  MAX_WIDTH
} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

const Footer = () => {
  const [ currentYear ] = React.useState(new Date().getFullYear())

  useEffect(() => {

  }, [])

  return (

      <FullWidthDiv>
        <InnerDiv>
          <img src={Logo} style={{ width: 74 }}/>
          <div style={{ marginTop: 48 }}>
            <p style={{ display: 'inline-block' }}>
              +82 032 209 8080 <br/>
              sizl@sizl.co.kr <br/>
              www.sizl.co.kr
            </p>
            <p style={{ float: 'right', display: 'inline-block' }}>
              <br/><br/>
              Copyright {currentYear}. SIZL Corp. All Right Reserved
            </p>
          </div>
        </InnerDiv>
      </FullWidthDiv>

  )
}

const FullWidthDiv = Styled.div`
  width: 100%;
  text-align: center;
  background-color: ${BG_COLOR}
`

const InnerDiv = Styled.div`
  display: inline-block;
  text-align: left;
  font-size: 12px;
  color: white;
  line-height: 1.67;
  padding-top: 35px;
  padding-bottom: 35px;
  width: ${MAX_WIDTH};
`


export default Footer
