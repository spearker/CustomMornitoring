import React from 'react'
import FrequentlyLabel from '../Frequently/FrequentlyLabel'
import Styled from 'styled-components'

interface Props {
  type: 'text' | 'guage'
  title: string
  value: string
  symbol?: string
  valueFontSize?: number | string
}

const Container = Styled.div(() => ({
  width: 296,
  height: 185,
  backgroundColor: 'rgba(17, 19, 25,.5)',
  borderRadius: 6,
  padding: '13px 16px',
  margin: '0 auto',
  marginBottom: 8
}))

const ValueContent = Styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}))


const PMV2DragAndDropItem: React.FunctionComponent<Props> = ({ type, title, value, symbol, valueFontSize }) => {
  const TextTypeView = React.useMemo(() => {
    return (
      <div>
        <div>
          <FrequentlyLabel text={value} size={valueFontSize ? valueFontSize : 60} textAlign={'center'} weight={'bold'}
                           fontFamily={'NotoSansCJKkr'}/>
        </div>
        <div>
          <FrequentlyLabel text={symbol} size={20} textAlign={'center'} fontFamily={'NotoSansCJKkr'} weight={200}/>
        </div>
      </div>
    )
  }, [ type ])

  const GuageTypeView = React.useMemo(() => {
    return (
      <div>

      </div>
    )
  }, [ type ])


  return (
    <Container>
      <div>
        <FrequentlyLabel text={title} size={20} fontFamily={'NotoSansCJKkr'}/>
      </div>
      <ValueContent>
        {
          type === 'text' ? TextTypeView : GuageTypeView
        }
      </ValueContent>
    </Container>
  )
}

export default PMV2DragAndDropItem
