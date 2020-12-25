import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import InputContainer from '../../Containers/InputContainer'
import Calendar from 'react-calendar'
import moment from 'moment'
import useOnclickOutside from 'react-cool-onclickoutside'
import Notiflix from 'notiflix'

//import "react-datepicker/dist/react-datepicker.css";

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps {
  title: string,
  description: string,
  value: string,
  onChangeEvent: any,
  style?: any,
  inputStyle?: any
  width?: number
}

const regExp = /^(18|19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/

const DateInput = ({title, description, value, onChangeEvent, style, inputStyle, width}: IProps) => {
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOnclickOutside(() => {
    if (value.match(regExp)) {
      setIsOpen(false)
    } else {
      Notiflix.Report.Warning('올바르지 않은 형식입니다.', 'YYYY-MM-DD 형식에 맞추어 입력해주세요.', '확인')
    }
  })

  const handleClickBtn = () => {
    setIsOpen(true)
  }
  useEffect(() => {

  }, [])


  return (
    <InputContainer title={title} width={width ? width : 170}>
      <div ref={ref} style={{width: 'calc(100% - 180px)', ...style}}>
        <InputBox onClick={() => handleClickBtn()}
                  onChange={(e) => {
                    onChangeEvent(e.target.value)
                  }}
                  style={{...inputStyle}} value={value === undefined ? '(선택)' : value}></InputBox>
        {
          isOpen ?
            <div style={{marginTop: 11}}>

              <Calendar
                className={title}
                onChange={(date) => {
                  onChangeEvent(moment(String(date)).format('YYYY-MM-DD'))
                  handleClickBtn()
                }}
                value={value === '' ? moment().toDate() : value.match(regExp) ? moment(value).toDate() : moment().toDate()}
              />
            </div>
            :
            null
        }

      </div>

    </InputContainer>
  )
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    width: 100%;
    background-color: #f4f6fa;
`


export default DateInput
