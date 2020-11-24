import React, {useCallback, useState} from 'react'
import Styled from 'styled-components'
import {POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import CalendarDropdown from '../Dropdown/CalendarDropdown'
import moment from 'moment'
import BasicDropdown from '../Dropdown/BasicDropdown'
import {getRequest} from '../../Common/requestFunctions'
import {getToken} from '../../Common/tokenFunctions'
import IcSearchButton from '../../Assets/Images/ic_search.png'
import IcDropDownButton from '../../Assets/Images/ic_dropdown_white.png'
import {Input} from 'semantic-ui-react'
import Pagination from '@material-ui/lab/Pagination'

interface Props {
    selectDate?: any
    calendarOnClick?: any
    indexList: any
    valueList: any[]
    clickValue?: object
    mainOnClickEvent?: any
    buttonState?: boolean
    currentPage?: number
    totalPage?: number
    pageOnClickEvent?: any
    calendarState?: boolean
}

const DateTable: React.FunctionComponent<Props> = ({selectDate, calendarOnClick, indexList, valueList, clickValue, mainOnClickEvent, calendarState, currentPage, totalPage, pageOnClickEvent}: Props) => {

    return (
        <div>
            <Title>
                <div/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {calendarOnClick ?
                        <div style={{}}>
                            <CalendarDropdown type={'single'} select={selectDate}
                                              onClickEvent={(select) => calendarOnClick(select)}
                                              unLimit={calendarState}/>
                        </div>
                        :
                        null
                    }
                </div>
            </Title>
            <TitleBar>
                {
                    Object.keys(indexList).map((v, i) => {
                        return (
                            <p key={v} className="p-limits">{indexList[v]}</p>
                        )
                    })
                }
            </TitleBar>
            {
                valueList !== undefined && valueList.length === 0
                    ? (
                        <ValueBar style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>데이터가
                            없습니다. </p>
                        </ValueBar>)
                    : valueList?.map((v, i) => {
                        /*
                        v:  {
                            pk: 'PK11212',
                            machine_name: '프레스 01',
                            machine_number: '000-000-00',
                            manufacturer_code: '공정 01',
                            machine_register_time: '2020.06.16 22:34:40',
                            more_Action: false
                        },
                        */
                        return (
                            <ValueBar key={i}
                                      style={{
                                          backgroundColor: clickValue === v ? '#19b9df' : '#353b48',
                                      }}>
                                {
                                    Object.keys(indexList).map((mv, mi) => {
                                        //mv : [pk , machin_list, machine_name ... ]
                                        return (
                                            typeof v[mv] === 'object' ?
                                                <select className="p-limits" style={{
                                                    backgroundColor: clickValue === v ? '#19b9df' : '#353b48',
                                                    borderColor: clickValue === v ? '#19b9df' : '#353b48'
                                                }}>
                                                    <option value={''}>선택</option>
                                                    {
                                                        Object.keys(v[mv]).map(m => {
                                                            return (
                                                                <option value={v[mv][m]}>{v[mv][m]}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                :
                                                <p key={`td-${i}-${mv}`}
                                                   className="p-limits"
                                                   onClick={mainOnClickEvent && mainOnClickEvent ? () => mainOnClickEvent(v, i) : () => console.log()}
                                                >
                                                    {v[mv] === '' || v[mv] === null || v[mv] === undefined ?
                                                        ''
                                                        :
                                                        v[mv]
                                                    }
                                                </p>

                                        )
                                    })
                                }
                            </ValueBar>

                        )
                    })
            }
            {currentPage && totalPage ?
                <PaginationBox>
                    <Pagination count={totalPage ? totalPage : 0} page={currentPage} onChange={pageOnClickEvent}
                                boundaryCount={1} color={'primary'}/>
                </PaginationBox>
                :
                null
            }
        </div>
    )
}

const Title = Styled.div`
   text-align: left;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   margin-bottom: 15px;
`

const TitleBar = Styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #111319;
    width: 100%;
    max-height: 40px;
    min-height: 40px;
    align-items: center;
    p {
    text-align: left;
    color: #ffffff;
    font-size: 14px;
      &:first-child{
        padding-left: 20px;
      }
    }
`

const BlackBg = Styled.div`
    padding: 20px 20px 30px 20px;
    border-radius: 6px;
    background-color: #111319;
    margin-top: 20px;
`

const ValueBar = Styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #353b48;
    width: 100%;
    max-height: 40px;
    min-height: 40px;
    align-items: center;
    select {
     height: 40px;
     background-color: #353b48;
     border-color: #353b48;
     text-align: left;
     color: #ffffff;
     font-size: 14px;
    }
    p {
    text-align: left;
    color: #ffffff;
    font-size: 14px;
      &:first-child{
        padding-left: 20px;
      }
    }
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

const ButtonBox = Styled.button`
    color: black;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 112px;
    height: 30px;
`

const SearchBox = Styled(Input)`
    input{
        padding-left: 8px;
        font-family: NotoSansCJKkr;
        height: 28px;
        border: 0.5px solid #b3b3b3;
        border-radius: 10px 0 0px 10px;
        width: 100%;
        margin-right: -10%;
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

const PaginationBox = Styled.div`
    padding-top: 10pt;
    display: flex;
    justify-content: center;
    .MuiButtonBase-root {
        color: white;
    }
    .MuiPaginationItem-root{
        color: white;
    }
`

export default DateTable
