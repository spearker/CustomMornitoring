import React from "react";
import Styled from 'styled-components'
import CalendarDropdown from "../Dropdown/CalendarDropdown";
import InAndOutButton from "../Button/InAndOutButton";

interface Props {
    buttonList?: string[]
    selectIndex: number
    setSelectIndex: any
    selectDate?: string
    setSelectDate?: any
}

const InAndOutHeader: React.FunctionComponent<Props> = ({buttonList, selectIndex, setSelectIndex, selectDate, setSelectDate}) => {
    return (
        <Header>
            <div style={{margin: '0 16px 0 16px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex'}}>
                    {buttonList &&
                    buttonList.map((buttonValue, index) => {
                        return (
                            <InAndOutButton title={buttonValue} select={selectIndex === index} key={`bv-${index}`}
                                            index={index} onClickIndex={setSelectIndex}/>
                        )
                    })
                    }
                </div>
                <div style={{alignSelf: 'center'}}>
                    {selectDate &&
                    <CalendarDropdown type={'single'} select={selectDate}
                                      onClickEvent={(i) => setSelectDate(i)}/>
                    }
                </div>
            </div>
        </Header>
    )
}

const Header = Styled.div`
  margin-top: 16px;
  width: 1100px;
  height: 50px;
  border-radius: 6px 6px 0 0;
  background-color: #353b48;
`

export default InAndOutHeader
