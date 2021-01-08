import React, {useEffect} from 'react'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import 'react-dropdown/style.css'
import styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'


const NotFound = () => {


  useEffect(() => {
    //getList()

  }, [])


  return (
    <DashboardWrapContainer index={999}>
      <Wrapper>

        <p className="p-eng">404 NotFound!</p>
        <p>접속할 수 없는 주소입니다.</p>

      </Wrapper>
    </DashboardWrapContainer>

  )
}

const Wrapper = styled.div`
  color: #ffffff97;
  padding-top: 128px;
  
  p{
    font-size: 16px;
    margin-right: 32px;
    &:first-child{
      font-size: 32px;
      color: ${POINT_COLOR};
      margin-bottom: 7px;
    }
    
  }
  img{
    width: 20px;
  }
`

export default NotFound
