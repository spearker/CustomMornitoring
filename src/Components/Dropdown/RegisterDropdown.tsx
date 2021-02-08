import React, {useEffect, useRef, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import useOnclickOutside from 'react-cool-onclickoutside'
import dropdownButton from '../../Assets/Images/ic_dropdownbutton.png'

//드롭다운 컴포넌트

interface IProps {
  select?: string,
  onClickEvent: any
  contents: any,
  text: string
  type: 'string' | 'number'
  buttonWid?: string | number
  disabled?: boolean
  style?: any
  absoluteHeight?: number
  inputStyle?: any
}

const RegisterDropdown = ({select, contents, onClickEvent, text, type, buttonWid, disabled, style, inputStyle, absoluteHeight}: IProps) => {
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOpen, setIsOpen] = useState(false)
  const [selectValue, setSelectValue] = useState<string>('')

  const ref = useOnclickOutside(() => {
    setIsOpen(false)
  })

  const handleClickBtn = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    if (select) {
      setSelectValue(select)
    }
  }, [select])

  return (
    <div style={{position: 'relative', display: 'inline-block', width: 917, ...style}} ref={ref}>
      <BoxWrap disabled={disabled} onClick={() => {
        setIsOpen(true)
      }} style={{padding: 0, backgroundColor: '#f4f6fa'}}>
        <div style={{display: 'inline-block', height: 32, width: 885, ...inputStyle}}>
          {
            selectValue !== '' ? <p onClick={() => {
                setIsOpen(true)
              }} style={{marginTop: 5}}>&nbsp; {selectValue}</p>
              : <p onClick={() => {
                setIsOpen(true)
              }} style={{marginTop: 5, color: '#b3b3b3'}}>&nbsp; {text}</p>
          }

        </div>
        <div style={{
          display: 'inline-block',
          backgroundColor: POINT_COLOR,
          width: buttonWid ? buttonWid : 32,
          height: buttonWid ? buttonWid : 32
        }}>
          <img src={dropdownButton} onClick={() => {
            // setIsOpen(true)
          }}/>
        </div>

      </BoxWrap>
      {
        isOpen ?
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            textAlign: 'left',
            width: 917,
            zIndex: 3
          }}>
            <BoxWrap onClick={() => {
              setIsOpen(true)
            }} style={{padding: 0, backgroundColor: '#f4f6fa'}}>
              <div style={{display: 'inline-block', height: 32, width: 885}}>
                {
                  select ? <p onClick={() => {
                      setIsOpen(true)
                    }} style={{marginTop: 5}}>&nbsp; {select}</p>
                    : <p onClick={() => {
                      setIsOpen(true)
                    }} style={{marginTop: 5, color: '#b3b3b3'}}>&nbsp; {text}</p>
                }
              </div>
              <div style={{
                display: 'inline-block',
                backgroundColor: POINT_COLOR,
                width: buttonWid ? buttonWid : 32,
                height: buttonWid ? buttonWid : 32
              }}>
                <img src={dropdownButton} onClick={() => {
                  setIsOpen(true)
                }}/>
              </div>
            </BoxWrap>
            <div style={{overflow: 'scroll', height: absoluteHeight ?? 'auto'}}>
              {
                contents.map((v, i) => {
                  if (v !== '') {
                    return (
                      <BoxWrap style={{borderRadius: 0, borderTop: '1px solid #ffffff50'}}>
                        <div style={{display: 'inline-block', width: 885, paddingLeft: 5}}>
                          <p style={{margin: 0}} key={i} onClick={() => {
                            if (type === 'number') {
                              onClickEvent(i)
                            } else {
                              onClickEvent(v)
                            }
                            setIsOpen(false)
                          }}>{v}</p>
                        </div>
                      </BoxWrap>
                    )
                  } else {
                    return
                  }

                })
              }
            </div>
          </div>
          :
          null
      }
    </div>
  )
}

const BoxWrap = Styled.button`
    border: 1px solid #b3b3b3;
    color: black;
    width: 100%;
    height: 32px;
    background-color: white;
    font-weight: bold;
    text-align: center;
    font-size: 13px;
    display: flex;
    p{
        text-align: left;
        font-size: 15px;
        font-weight: bold;
    }
`

const InnerBoxWrap = Styled.button`
    padding: 5px 15px 4px 15px;
    border-radius: 0px;
    color: white;
    min-width: 100px;
    background-color: ${BG_COLOR_SUB};
    border: none;
    font-weight: bold;
    text-align: left;
    p{
        text-align: left;
     }
    font-size: 13px;
    img {
    margin-right: 7px;
    width: 14px;
    height: 14px;
    }
`

export default RegisterDropdown
