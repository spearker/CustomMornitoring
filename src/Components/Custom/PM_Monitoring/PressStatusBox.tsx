import React from 'react'
import Styled from 'styled-components'
import autoCustomType from '../../../AutoCustomSetting/autoCustomConfig'

interface Props {
    title: string
    titleColor?: string
    fontSize: string | number
    subValue?: string
    value: string | number
    align?: any
    valueColor?: string
    mold_spec?: any[]
    width?: string | number
    height?: string | number
    titleFontSize?: boolean
}

const PressStatusBox: React.FunctionComponent<Props> = ({
                                                            title,
                                                            titleColor,
                                                            subValue,
                                                            fontSize,
                                                            value,
                                                            align,
                                                            valueColor,
                                                            mold_spec,
                                                            width,
                                                            height,
                                                            titleFontSize
                                                        }) => {
    return (
        <BoxContainer style={{
            backgroundColor: valueColor ? valueColor : '#353b48',
            width: width ? width : '104px',
            height: height ? height : '87px'
        }}>
            <Title
                style={{color: titleColor ? titleColor : '#ffffff', fontSize: titleFontSize ? 45 : 14}}>{title}</Title>
            {mold_spec ?
                autoCustomType() === 'jaewoo_material_trans'
                    ?
                    <Value style={{
                        fontSize: fontSize,
                        whiteSpace: 'pre-line',
                        color: titleColor ? titleColor : '#ffffff'
                    }}>{`폭: ${mold_spec ? mold_spec[0] : ''}
                    피치: ${mold_spec ? mold_spec[1] : ''}
                    T: ${mold_spec ? mold_spec[2] : ''}`}</Value>
                    :
                    autoCustomType() === 'seain_material_trans'
                        ?
                        <Value style={{
                            fontSize: fontSize,
                            whiteSpace: 'pre-line',
                            color: titleColor ? titleColor : '#ffffff'
                        }}>{`외경: ${mold_spec ? mold_spec[0] : ''}
                            내경: ${mold_spec ? mold_spec[1] : ''}
                            T: ${mold_spec ? mold_spec[2] : ''}`}</Value>
                        :
                        <Value style={{
                            fontSize: fontSize,
                            whiteSpace: 'pre-line',
                            color: titleColor ? titleColor : '#ffffff'
                        }}>{`가로: ${mold_spec ? mold_spec[0] : ''}
                            세로: ${mold_spec ? mold_spec[1] : ''}
                            높이: ${mold_spec ? mold_spec[2] : ''}`}</Value>
                :
                <Value style={{
                    textAlign: align ? align : 'left',
                    fontSize: fontSize,
                    color: titleColor ? titleColor : '#ffffff',
                }}>{subValue ? `${value}
        ${subValue}` : `${value}`}</Value>
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
