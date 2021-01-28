import React from 'react'
import Styled from 'styled-components'

interface Props {
  styles?: Record<string, string | number | undefined>
}

const Container = Styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const FrequentlyFlexMiddle: React.FunctionComponent<Props> = ({ styles }) => {
  return (
    <Container style={styles}>

    </Container>
  )
}

export default FrequentlyFlexMiddle
