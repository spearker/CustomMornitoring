import React, {useCallback, useEffect, useState} from 'react'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import NewBasicListContainer from '../../Containers/Basic/NewBasicListContainer'
import {useHistory} from 'react-router-dom'

// 리스트 페이지
const NewBasicList = ({match}: any) => {
  const history = useHistory()
  const [type, setType] = useState<string | undefined>(undefined)
  const [isMove, setIsMove] = useState<boolean>(false)
  const {id} = match.params

  const onClickRegister = () => {
    setIsMove(true)
  }

  useEffect(() => {
    setIsMove(false)
  }, [])

  useEffect(() => {
    if (isMove)
      history.push(`/basic/${id}/register`)
  }, [isMove])

  return (
    <DashboardWrapContainer index={'basic'}>
      <InnerBodyContainer>
        <NewBasicListContainer type={id} onClickRegister={onClickRegister}/>
      </InnerBodyContainer>
    </DashboardWrapContainer>

  )
}


export default NewBasicList

