import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string | number | undefined
  size: string | number
  color?: string
  weight?: 'bold' | 200
  textAlign?: 'left' | 'center' | 'right'
  lineHeight?: string | number
  fontFamily?: string
  containerStyles?: Record<string, string | number>
}

interface LabelProps {
  size: string | number
  color?: string
  weight?: 'bold' | 200
  textAlign?: 'left' | 'center' | 'right'
  lineHeight?: string | number
  numberOfLine?: number
  fontFamily?: string
}

const Label = styled.label(({ size, color, weight, lineHeight, fontFamily }: LabelProps) => ({
  fontSize: size,
  color: color ? color : '#FFFFFF',
  fontWeight: weight,
  lineHeight,
  fontFamily: fontFamily ? fontFamily : 'NanumGothic-Regular'
}))


const FrequentlyLabel: React.FunctionComponent<Props> = ({ text, size, weight, color, textAlign, lineHeight, fontFamily, containerStyles }) => {
  const label = React.useMemo(() => {
    if (typeof text === 'number') {
      return text.toString()
    } else if (text) {
      return text
    } else {
      return ''
    }
  }, [ text ])

  return (
    <div style={{ ...containerStyles, textAlign: textAlign ? textAlign : 'left' }}>
      <Label size={size} weight={weight} color={color} lineHeight={lineHeight}
             fontFamily={fontFamily}
      >
        {label}
      </Label>
    </div>
  )
}


export default FrequentlyLabel
