import React, {useEffect} from 'react'
import Styled from 'styled-components'
import IcCheck from '../../Assets/Images/ic_alert_check.png'
import IcX from '../../Assets/Images/ic_alert_x.png'
import useOnclickOutside from 'react-cool-onclickoutside'
import {usePopup, usePopupDispatch} from '../../Context/PopupContext'
import BasicColorButton from '../Button/BasicColorButton'

//alert 팝업창

const AlertPopup = () => {
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const popUp = usePopup()
  const dispatch = usePopupDispatch()


  const ref = useOnclickOutside(() => {
    dispatch({type: 'CLOSE_POPUP'})
  })

  const handleClickBtn = () => {
    dispatch({type: 'CLOSE_POPUP'})
  }

  const onClickClose = () => {
    dispatch({type: 'CLOSE_POPUP'})
  }
  useEffect(() => {

  }, [])

  return (
    popUp.is_popup ?
      <>
        <WrapHoverBox onClick={onClickClose}/>
        <InnerBox>
          <div ref={ref} style={{
            position: 'relative',
            backgroundColor: '#F5F6FA',
            textAlign: 'center',
            width: 320,
            maxWidth: 320,
            padding: '0px 20px 20px 20px'
          }}>
            {
              popUp.type === 'normal' ? <img src={IcCheck} style={{width: 110, marginTop: 40}}/> : null
            }
            {
              popUp.type === 'error' ? <img src={IcX} style={{width: 110, marginTop: 40}}/> : null
            }
            <p style={{marginTop: 35, fontSize: 20, marginBottom: 40}}>{popUp.contents}</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <BasicColorButton width={'45%'} name={'취소'} onClickEvent={onClickClose}/>
              <div style={{width: 12}}></div>
              <BasicColorButton width={'45%'} name={'확인'} onClickEvent={
                popUp.okFunc ? popUp.okFunc : onClickClose
              }/>
            </div>
          </div>
        </InnerBox>
      </>
      :
      null
  )
}

const WrapHoverBox = Styled.div`
    background-color: #00000090;
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 5;
`
const InnerBox = Styled.div`
    position: fixed;
    left: 50%;
    margin-left: -180px; 
    top: 50%;
    z-index: 5;
    margin-top: -200px; 
    overflow: auto;
    p{
        font-size: 14px;
    }
`
export default AlertPopup
