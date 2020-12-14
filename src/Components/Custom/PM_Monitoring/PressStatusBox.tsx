import React from "react";
import Styled from "styled-components";

interface Props {
    title: string
    titleColor?: string
    fontSize: string | number
    value: string | number
    valueColor?: string
    mold_spec?: any[]
}

const PressStatusBox: React.FunctionComponent<Props> = ({title, titleColor, fontSize, value, valueColor, mold_spec}) => {
    return (
        <BoxContainer style={{backgroundColor: valueColor ? valueColor : '#353b48'}}>
            <Title style={{color: titleColor ? titleColor : '#ffffff'}}>{title}</Title>
            {mold_spec ?
                <Value style={{
                    fontSize: fontSize,
                    whiteSpace: 'pre-line',
                    color: titleColor ? titleColor : '#ffffff'
                }}>{`폭: ${mold_spec ? mold_spec[0] : ''}
                    피치: ${mold_spec ? mold_spec[1] : ''}
                    T: ${mold_spec ? mold_spec[2] : ''}`}</Value>
                :
                <Value style={{
                    fontSize: fontSize,
                    color: titleColor ? titleColor : '#ffffff',
                }}>{value}</Value>
            }
        </BoxContainer>
    )
}

const BoxContainer = Styled.div`
  padding: 9px 8px 0px 8px;
  margin: 10px 8px 0 0;
  width: 104px;
  height: 87px;
  border-radius: 6px;
  background-color: #353b48;
`

const Title = Styled.p`
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
`

const Value = Styled.p`
  height: 71%;
  display: flex;
  justify-content: center;
  align-items:center;
`

export default PressStatusBox
