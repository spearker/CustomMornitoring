import React from 'react'
import Styled from 'styled-components'
import background from '../../../../Assets/Images/designerBackground.png'
import FrequentlyLabel from '../../../../Components/PM/Frequently/FrequentlyLabel'

import desp1000 from '../../../../Assets/Images/desp1000_active.png'
import desp800 from '../../../../Assets/Images/desp800_active.png'
import desp600 from '../../../../Assets/Images/desp600_active.png'
import desp400 from '../../../../Assets/Images/desp400_active.png'
import despJail400 from '../../../../Assets/Images/despJail400.png'
import { useHistory } from 'react-router-dom'


const Container = Styled.div(() => ({
  width: 1385,
  height: 792,
  background: `url(${background})  no-repeat`,
  backgroundSize: 'cover',
  margin: '0 auto'
}))

const Grid = Styled.div<any>(({ top, left, background }) => ({
  width: 97,
  height: 116,
  cursor: 'pointer',
  position: 'relative',
  top,
  left,
  '&:hover': {
    background: `url(${background})  no-repeat`,
    backgroundSize: 'cover'
  }
}))

const PMV2ForDesignerContainer: React.FunctionComponent = () => {
  const history = useHistory()

  const goToPressDashboard = React.useCallback((type: string, name: string) => {
    history.push(`/pm/v2/dashboard/press/${type}?name=${name}`)
  }, [])

  return (
    <div>
      <div style={{ margin: '29px 0px' }}>
        <FrequentlyLabel text={'Smart Factory CPS System'} size={26} weight={'bold'} textAlign={'center'}/>
      </div>
      <Container>
        <div style={{ display: 'flex' }}>
          <Grid background={desp1000} top={63} left={235} onClick={() => goToPressDashboard('0', 'desp1000')}/>
          <Grid background={desp800} top={63} left={401} onClick={() => goToPressDashboard('1', 'desp800')}/>
          <Grid background={desp600} top={63} left={558} onClick={() => goToPressDashboard('2', 'desp600')}/>
          <Grid background={desp400} top={63} left={717} onClick={() => goToPressDashboard('3', 'desp400')}/>
        </div>
        <Grid background={despJail400} top={353} left={1131} onClick={() => goToPressDashboard('4', 'despJail400')}/>
      </Container>
    </div>
  )
}

export default PMV2ForDesignerContainer
