import React from "react";
import Styled from 'styled-components'
import CalendarDropdown from "../Dropdown/CalendarDropdown";
import InAndOutButton from "../Button/InAndOutButton";

const InAndOutHeader: React.FunctionComponent = () => {
    return (
        <Header>
            <div style={{margin: '0 16px 0 16px', display: 'flex'}}>
                <InAndOutButton title={'입고 현황'} select={true}/>
                <InAndOutButton title={'출고 현황'} select={false}/>
                {/*<CalendarDropdown type={'single'} select={selectDate}*/}
                {/*                  onClickEvent={async (i) => setSelectDate(i)}/>*/}
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
