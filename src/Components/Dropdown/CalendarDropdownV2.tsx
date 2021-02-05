import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import IcDown from '../../Assets/Images/ic_reply_down.png'
import useOnclickOutside from 'react-cool-onclickoutside'
import moment from 'moment'
import Calendar from 'react-calendar'
import {POINT_COLOR} from '../../Common/configset'


//캘린더 드롭다운 컴포넌트

interface IProps {
  select?: string
  selectRange?: { start: string, end: string }
  type: 'range' | 'single'
  onClickEvent: (date: string, date2?: string) => void
  unLimit?: boolean
  toDayLimit?: boolean
  limitType?: 'electric'
  limitDate?: { min?: string, max?: string }
}

const CalendarDropdownV2 = ({select, selectRange, onClickEvent, type, unLimit, toDayLimit, limitType}: IProps) => {
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOpen, setIsOpen] = useState(false)
  const [dateRange, setDateRange] = useState({
    from: moment().format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD'),
  })

  const ref = useOnclickOutside(() => {
    setIsOpen(false)
  })

  const handleClickBtn = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setDateRange({
      from: selectRange ? selectRange.start : moment().format('YYYY-MM-DD'),
      to: selectRange ? selectRange.end : moment().format('YYYY-MM-DD'),
    })
  }, [isOpen])

  return (
    <DropBoxContainer ref={ref}>
      <BoxWrap onClick={() => setIsOpen(!isOpen)}>
        {
          limitType !== 'electric' ?
            type === 'single'
              ? <p className="p-bold" onClick={() => {
                setIsOpen(true)
              }} style={{display: 'inline-block', marginRight: 10}}>통계
                날짜 {select === '' ? moment().format('YYYY-MM-DD') : select}</p>
              : <p className="p-bold" onClick={() => {
                setIsOpen(true)
              }} style={{display: 'inline-block', marginRight: 10}}>
                기간 선택 {
                selectRange
                  ?
                  (selectRange.start === '' ? moment().format('YYYY-MM-DD') : selectRange.start)
                  + ' ~ ' +
                  (selectRange.end === '' ? moment().format('YYYY-MM-DD') : selectRange.end)
                  :
                  moment().format('YYYY-MM-DD') + ' ~ ' + moment().format('YYYY-MM-DD')
              }
              </p>
            : <p className="p-bold" onClick={() => {
              setIsOpen(true)
            }} style={{display: 'inline-block', marginRight: 10}}>
              기간 선택 {
              selectRange
                ?
                moment(selectRange.end).subtract(2, 'days').format('YYYY-MM-DD')
                + ' ~ ' +
                (selectRange.end === '' ? moment().format('YYYY-MM-DD') : selectRange.end)
                :
                moment().format('YYYY-MM-DD') + ' ~ ' + moment().format('YYYY-MM-DD')
            }
            </p>
        }
        <img src={IcDown} onClick={() => {
          setIsOpen(true)
        }} style={{width: 14, height: 14}}/>
      </BoxWrap>
      {
        isOpen &&
        <InnerBoxWrap>
            <BoxWrap style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <Calendar
                    selectRange={type === 'range'}
                    returnValue={type === 'range' ? 'range' : undefined}
                    onChange={(e) => {
                      if (type === 'range') {
                        setDateRange({
                          from: moment(e[0]).format('YYYY-MM-DD'),
                          to: moment(e[1]).format('YYYY-MM-DD')
                        })
                      } else {
                        setDateRange({
                          //@ts-ignore
                          from: moment(e).format('YYYY-MM-DD'),
                          //@ts-ignore
                          to: moment(e).format('YYYY-MM-DD')
                        })
                      }
                    }}
                    value={[moment(dateRange.from).toDate(), moment(dateRange.to).toDate()]}
                />
                <div
                    style={{
                      width: 100,
                      height: 32,
                      backgroundColor: POINT_COLOR,
                      cursor: 'pointer',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex'
                    }}
                    onClick={() => {
                      setIsOpen(false)
                      onClickEvent(dateRange.from, dateRange.to)
                    }}
                >
                    <p>확인</p>
                </div>
            </BoxWrap>
        </InnerBoxWrap>
      }
    </DropBoxContainer>
  )
}

const DropBoxContainer = Styled.div`
    margin-left:10px; min-width: 100px;
    position:relative;
    display: inline-block;
    z-index:1;
    float: right;
`

const BoxWrap = Styled.button`
    padding: 4px 15px 5px 15px;
    border-radius: 5px;
    color: black;
    min-width: 100px;
    background-color: #b3b3b3;
    border: none;
    font-weight: bold;
    text-algin: center;
    font-size: 13px;
    img {
    width: 14px;
    height: 14px;
    }
    .react-calendar{
        border: 0;
    }
`

const InnerBoxWrap = Styled.div`
    position: absolute;
    top: 0;
    right:0;
    text-align: left;
    margin-top: 32px;
`

export default CalendarDropdownV2
