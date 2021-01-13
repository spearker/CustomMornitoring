import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, BG_COLOR_SUB2, POINT_COLOR} from '../../Common/configset'
import InputContainer from '../../Containers/InputContainer'
import useOnclickOutside from 'react-cool-onclickoutside'
import IC_ARROW from '../../Assets/Images/ic_drop_down.png'
import IC_ARROW_UP from '../../Assets/Images/ic_drop_up.png'

//드롭다운 입력창
interface IProps {
  title: string,
  contents: string[],
  target: string,
  onChangeEvent: any,
  style?: any,
  inputStyle?: any,
  selectStyle?: any,
  buttonStyle?: any
  line?: boolean
  isPadding?: boolean
}

const DropdownInput = ({title, contents, target, onChangeEvent, style, inputStyle, selectStyle, buttonStyle, line, isPadding}: IProps) => {
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOnclickOutside(() => {
    setIsOpen(false)
  })

  const handleClickBtn = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {

  }, [])

  return (
    <InputContainer title={title} line={!line} isPadding={isPadding}>
      <div ref={ref} style={{width: 'calc(100% - 187px)', position: 'relative', marginLeft: -10, ...style}}>
        <InputBox onClick={handleClickBtn}
                  style={{...inputStyle}}>{target === '' || target === undefined ? '(선택)' : target}</InputBox>
        <div onClick={() => setIsOpen(true)} style={{
          position: 'absolute',
          top: 0,
          right: -17,
          zIndex: 0,
          backgroundColor: POINT_COLOR,
          width: 33,
          height: 33,
          textAlign: 'center',
          display: 'inline-block', ...buttonStyle
        }}>
          <img src={IC_ARROW} style={{width: 20, marginTop: 6}}/>
        </div>
        {
          isOpen ?
            <>
              <div style={{position: 'absolute', zIndex: 4, top: 0, left: 0, width: '100%'}}>
                <InputBox onClick={handleClickBtn}
                          style={{...inputStyle}}>{target === '' || target === undefined ? '(선택)' : target}</InputBox>
                {contents.map((v, i) => {
                  return (
                    <InputBoxList key={i} onClick={() => {
                      onChangeEvent(i)
                      setIsOpen(false)
                    }} style={{...selectStyle}}>{v}</InputBoxList>
                  )

                })}
              </div>
              <div onClick={() => setIsOpen(false)} style={{
                position: 'absolute',
                top: 0,
                right: -17,
                zIndex: 4,
                backgroundColor: POINT_COLOR,
                width: 33,
                height: 33,
                textAlign: 'center',
                display: 'inline-block', ...buttonStyle
              }}>
                <img src={IC_ARROW_UP} style={{width: 20, marginTop: 6}}/>
              </div>
            </>
            :
            null
        }
      </div>
    </InputContainer>
  )
}

const ButtonBox = Styled.div`
    display: inline-block;
    position: relative;
    top: 0;
    right: 0;
    padding: 6px;
    z-index: 3;
    width: 20px;
    text-align: center;
    color: black;
    background-color: ${POINT_COLOR};
    border: solid 0.5px #d3d3d3;
`

const InputBox = Styled.div`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: 100%;
    background-color: #f4f6fa;
`
const InputBoxList = Styled.div`
    border: solid 0.5px ${BG_COLOR_SUB2};
    cursor: pointer;
    color: white;
    border-top: 0;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: 100%;
    background-color: ${BG_COLOR_SUB};
`


export default DropdownInput
