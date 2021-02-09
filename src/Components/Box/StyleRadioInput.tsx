import React, {useEffect} from 'react'
import Styled from 'styled-components'
import InputContainer from '../../Containers/InputContainer'
import RadioInput from '../Input/RadioInput'
import Check from '../../Assets/Images/ic_checkbox_y.png'
import RadioCheck from '../../Assets/Images/btn_radio_check.png'
import Radio from '../../Assets/Images/btn_radio.png'

//레디오
interface IProps {
  title: string,
  contents: { title: string, value: string | number }[],
  target: number,
  onChangeEvent: any,
  opacity?: boolean
  width?: number
  line?: boolean
  isPadding?: number
  index?: number
  center?: any
  noStringPadding?: boolean
}

const StyleRadioInput = ({title, target, contents, onChangeEvent, opacity, width, line, isPadding, index, center, noStringPadding}: IProps) => {

  return (
    <>  
        <RadioBox>
            <RadioInput title={title} target={target}
                        id={title}
                        onChangeEvent={onChangeEvent} opacity={opacity} width={width} 
                        line={line} isPadding={isPadding} index={index} center={center} 
                        noStringPadding={noStringPadding} contents={contents} />
        </RadioBox>
    </>
  )
}


const RadioBox = Styled.div`
  display: flex;
  align-items: center;
  *{
    align-items: center;
  }
  input::-ms-input-placeholder { color: #b3b3b3; }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 0/* 1.5px solid #00000040 */;
    border-radius: 4px;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    background: url(${Check}) left/18px no-repeat; 
    border: 0/* 1.5px solid orange */;
  }
  input[type="checkbox"] {
    display: none;
  }
  form label{
    font-size: 10px;
    font-weight: 700;
  }

  input[type="radio"]:not(old) {
      margin:0; padding:0; opacity:0; 
      background: url(${Radio}) left/24px no-repeat; 
      width:18px;
      height: 18px;
      
  } 
  input[type="radio"]:not(old) + label {
      width:18px;
      height: 18px;
      display: inline-block; 
      text-align: left;
      resize: cover; 
      background: url(${Radio}) left/24px no-repeat; 
      background-size: 18px 18px;
      line-height: 130%; vertical-align: top;
  }
  input[type="radio"]:not(old):checked + label {
    background: url(${RadioCheck}) left/24px no-repeat;
    background-size: 18px 18px; 
  }
`


export default StyleRadioInput
