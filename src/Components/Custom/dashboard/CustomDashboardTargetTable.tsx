import React from "react";
import IcDropDownButton from "../../../Assets/Images/ic_dropdown_white.png";
import Pagination from "@material-ui/lab/Pagination";
import Styled from "styled-components";


interface Props {
    selectBoxChange?: any
    valueList: any[]
    clickValue?: object
    mainOnClickEvent?: any
    onClickEvent?: any
    currentPage?: number
    totalPage?: number
    pageOnClickEvent?: any
}


const CustomDashboardTargetTable: React.FunctionComponent<Props> = ({valueList, clickValue, currentPage, totalPage, pageOnClickEvent}) => {
    return (
        <div>
            <div>
                <TitleBar style={{
                    width: '400px',
                    fontSize: "20px",
                    fontWeight: 'bold',
                    fontStretch: 'normal',
                    fontStyle: 'normal'
                }}>
                    <LimitP key={'target'}
                            style={{
                                width: '400px',
                                textAlign: 'center'
                            }}>달성율</LimitP>
                </TitleBar>
                {
                    valueList !== undefined && valueList.length === 0
                        ? (
                            <ValueBar style={{backgroundColor: '#353b48', width: '400px'}}><p
                                style={{width: '100%', textAlign: 'center'}}>데이터가
                                없습니다. </p>
                            </ValueBar>)
                        : valueList?.map((v, i) => {
                            return (
                                <ValueBar key={i}
                                          style={{backgroundColor: '#353b48', width: '400px',}}>
                                    <div style={{
                                        height: '48px',
                                        borderRadius: '8px',
                                        backgroundImage: ' linear-gradient(to left, #19b9df, #0f75bf)',
                                        width: v + '%',
                                    }}/>
                                    <div style={{width: '400px', position: 'absolute'}}>
                                        <LimitP key={`td-${i}-${v}`} style={{
                                            objectFit: 'contain',
                                            textShadow: '0 2px 2px rgba(0, 0, 0, 0.5)',
                                            fontFamily: 'NotoSansCJKkr',
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            fontStretch: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 'normal',
                                            textAlign: 'center'
                                        }}>{v}%</LimitP>
                                    </div>
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
        </div>
    )
}


const TitleBar = Styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #111319;
    width: 100%;
    max-height: 48px;
    min-height: 48px;
    align-items: center;
    p {
      color: #ffffff;
      font-size: 14px;
      padding-left: 16px;
      padding-right: 16px;
    }
`

const ValueBar = Styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #353b48;
    width: 100%;
    max-height: 48px;
    min-height: 48px;
    align-items: center;
    select {
     height: 48px;
     background-color: #353b48;
     border-color: #353b48;
     text-align: left;
     color: #ffffff;
     font-size: 14px;
    }
    p {
      color: #ffffff;
      font-size: 14px;
      padding-left: 16px;
      padding-right: 16px;
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

const LimitP = Styled.p`
    text-overflow:ellipsis;
    white-space:nowrap;
    word-wrap:normal;
    overflow:hidden;
`

export default CustomDashboardTargetTable
