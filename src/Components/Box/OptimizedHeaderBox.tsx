import React from "react";
import BasicDropdown from "../Dropdown/BasicDropdown";
import IcSearchButton from "../../Assets/Images/ic_search.png";
import CalendarDropdown from "../Dropdown/CalendarDropdown";
import Styled from "styled-components";
import {Input} from "semantic-ui-react";
import {POINT_COLOR} from "../../Common/configset";

interface Props {
    title: string
    selectDate?: any
    calendarState?: boolean
    calendarOnClick?: any
    searchBarChange?: any
    searchBarValue?: any
    searchButtonOnClick?: any
    dropDownContents?: any
    dropDownOnClick?: any
    dropDownOption?: any
    titleOnClickEvent?: any
}

const OptimizedHeaderBox: React.FunctionComponent<Props> = ({title, selectDate, calendarOnClick, searchBarChange, searchBarValue, searchButtonOnClick, dropDownContents, dropDownOnClick, dropDownOption, titleOnClickEvent, calendarState}) => {
    return (
        <div>
            <Title>
                <div style={{display: 'flex'}}>
                    <p className="p-bold" style={{fontSize: 20}}>{title}</p>
                    {searchButtonOnClick ?
                        <div style={{width: '371px', display: 'flex', flexDirection: 'row', marginLeft: 24}}>
                            <SearchBox placeholder="검색어를 입력해주세요." style={{flex: 92}}
                                       onChange={(e) => searchBarChange(e.target.value)}
                                       value={searchBarValue}
                                       onKeyPress={(event) => event.key === 'Enter' && searchButtonOnClick()}
                            />
                            <SearchButton style={{flex: 8}} onClick={() => searchButtonOnClick()}>
                                <img src={IcSearchButton}/>
                            </SearchButton>
                        </div> :
                        null
                    }
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {dropDownOnClick ?
                        <div style={{alignItems: 'center'}}>
                            <BasicDropdown contents={dropDownContents} select={dropDownContents[dropDownOption]}
                                           onClickEvent={dropDownOnClick}/>
                        </div> :
                        null
                    }
                    {calendarOnClick ?
                        <div style={{marginRight: 15}}>
                            <CalendarDropdown type={'range'} selectRange={selectDate}
                                              onClickEvent={(start, end) => calendarOnClick(start, end)}
                                              unLimit={calendarState}/>
                        </div>
                        :
                        null
                    }
                    {
                        titleOnClickEvent && titleOnClickEvent.map((bv, bi) => {
                            return (
                                <div style={{marginRight: 15}}>
                                    <TitleButtonBox onClick={bv.Link}
                                                    style={{width: bv.Width}}>{bv.Name}</TitleButtonBox>
                                </div>
                            )
                        })
                    }
                </div>
            </Title>
        </div>
    )
}

const Title = Styled.div`
   text-align: left;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   margin-bottom: 15px;
   margin-top: 87px;
`

const TitleButtonBox = Styled.button`
    color: white;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 70px;
    height: 30px;
`

const SearchBox = Styled(Input)`
    input{
        padding-left: 16px;
        font-family: NotoSansCJKkr;
        height: 28px;
        border: 0.5px solid #b3b3b3;
        border-radius: 10px 0 0px 10px;
        width: 100%;
        background-color: #f4f6fa;
        font-size: 15px;
        &::placeholder:{
            color: #b3b3b3;
        };
     }
`

const SearchButton = Styled.button`
    width: 55px;
    height: 32px;
    border-radius: 5px 5px 5px 5px;
    background-color: ${POINT_COLOR};
    img{
        width: 20px;
        height: 20px;
        margin-top: 5px;
    }
`

export default OptimizedHeaderBox

