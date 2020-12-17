import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import dropdownButton from "../../Assets/Images/ic_dropdownbutton.png";
import Modal from "react-modal";
import ReactShadowScroll from 'react-shadow-scroll';
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from "semantic-ui-react";
import IcSearchButton from "../../Assets/Images/ic_search.png";
import {API_URLS, getSearchOutsourcing} from "../../Api/mes/outsourcing";
import Pagination from "@material-ui/lab/Pagination";
import Notiflix from 'notiflix'

//드롭다운 컴포넌트

interface IProps {
    select?: { name?: string, pk?: string },
    onClickEvent: any
    text: string
}

Notiflix.Loading.Init({svgColor: '#1cb9df'})

const OutsourcingPickerModal = ({select, onClickEvent, text}: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);
    const [machineName, setMachineName] = useState('')

    const [machineList, setMachineList] = useState<OutsourcingName>({
        current_page: 0,
        info_list: [{name: "", pk: ""}],
        total_number: 0,
        total_page: 0
    })
    const [searchName, setSearchName] = useState<string>('')
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    // const ref = useOnclickOutside(() => {
    //     setIsOpen(false);
    // });

    const getList = useCallback(async (isSearch?: boolean) => {
        Notiflix.Loading.Circle()
        const tempUrl = searchName === '' ? `${API_URLS['outsourcing'].search}?page=${isSearch ? 1 : page.current}&limit=10&keyword=` : `${API_URLS['outsourcing'].search}?page=${isSearch ? 1 : page.current}&limit=10&keyword=${searchName}`
        const resultData = await getSearchOutsourcing(tempUrl);
        if (resultData) {
            setPage({current: resultData.current_page, total: resultData.total_page})
            setMachineList(resultData)
        }
        Notiflix.Loading.Remove()
    }, [searchName])


    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        getList()
    }, [page.current])
    return (
        <div>
            <div style={{position: 'relative', display: 'inline-block', zIndex: 0, width: 917}}>
                <BoxWrap onClick={() => {
                    setIsOpen(true)
                }} style={{padding: 0, backgroundColor: '#f4f6fa'}}>
                    <div style={{display: 'inline-block', height: 32, width: 885}}>
                        {
                            select ? <p onClick={() => {
                                    setIsOpen(true)
                                }} style={{marginTop: 5}}>&nbsp; {select.name}</p>
                                : <p onClick={() => {
                                    setIsOpen(true)
                                }} style={{marginTop: 5, color: '#b3b3b3'}}>&nbsp; {text}</p>
                        }

                    </div>
                    <div style={{display: 'inline-block', backgroundColor: POINT_COLOR, width: 32, height: 32}}>
                        <img style={{width: 20, height: 20, marginTop: 5}} src={IcSearchButton} onClick={() => {
                            setIsOpen(true)
                        }}/>
                    </div>

                </BoxWrap>
            </div>
            <Modal
                isOpen={isOpen}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: 0
                    },
                    overlay: {
                        background: 'rgba(0,0,0,.6)',
                        zIndex: 5
                    }
                }}
            >
                <div style={{width: 900}}>
                    <div style={{width: 860, minHeight: 530, maxHeight: 'auto', padding: 20}}>
                        <p style={{fontSize: 18, fontFamily: 'NotoSansCJKkr', fontWeight: 'bold'}}>• 외주처 검색</p>
                        <div style={{width: 860, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
                            <SearchBox placeholder="외주처 명을 입력해 주세요."
                                       onKeyPress={(event) => event.key === 'Enter' && getList(true)}
                                       style={{flex: 96}} onChange={(e) => setSearchName(e.target.value)}/>
                            <SearchButton style={{flex: 4}} onClick={() => getList(true)}>
                                <img src={IcSearchButton}/>
                            </SearchButton>
                        </div>
                        <div style={{height: 310, width: 860, backgroundColor: '#f4f6fa',}}>
                            <ReactShadowScroll>
                                <MachineTable>
                                    <tr>
                                        <th style={{width: 250}}>외주처 명</th>
                                    </tr>
                                    {machineList !== undefined && machineList?.info_list.length === 0 ?
                                        <tr>
                                            <td colSpan={2} style={{textAlign: 'center'}}>데이터가 없습니다.</td>
                                        </tr>
                                        :
                                        machineList?.info_list.map((v, i) => {
                                            return (
                                                <tr style={{
                                                    height: 32,
                                                    backgroundColor: select ? v.pk === select.pk ? POINT_COLOR : '#ffffff' : '#ffffff',
                                                }} onClick={() => {
                                                    setMachineName(v.name)
                                                    return onClickEvent({name: v.name, pk: v.pk})
                                                }}>
                                                    <td><span>{v.name}</span></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </MachineTable>
                            </ReactShadowScroll>
                            <PaginationBox>
                                <Pagination count={page.total ? page.total : 0} page={page.current}
                                            onChange={(event, i) => setPage({...page, current: i})}
                                            boundaryCount={1} color={'primary'}/>
                            </PaginationBox>
                        </div>
                    </div>
                    <div style={{width: 900}}>
                        <CheckButton style={{left: 0, backgroundColor: '#e7e9eb'}} onClick={() => {
                            onClickEvent({name: undefined, pk: undefined})
                            setIsOpen(false)
                        }}>
                            <div>
                                <span style={{color: '#666d79'}}>취소</span>
                            </div>
                        </CheckButton>
                        <CheckButton style={{right: 0, backgroundColor: POINT_COLOR}} onClick={() => {
                            setIsOpen(false)
                        }}>
                            <div>
                                <span style={{color: 'black'}}>확인</span>
                            </div>
                        </CheckButton>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

const BoxWrap = Styled.button`
    border: 1px solid #b3b3b3;
    color: black;
    width: 100%;
    height: 32px;
    background-color: white;
    font-weight: bold;
    text-algin: center;
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
    text-algin: left;
    p{
        text-algin: left;
     }
    font-size: 13px;
    img {
    margin-right: 7px;
    width: 14px;
    height: 14px;
    }
`

const SearchBox = Styled(Input)`
    input{
        padding-left: 8px;
        font-family: NotoSansCJKkr;
        height: 28px;
        border: 0.5px solid #b3b3b3;
        width: calc( 100% - 8px );
        background-color: #f4f6fa;
        font-size: 15px;
        &::placeholder:{
            color: #b3b3b3;
        };
     }
`

const SearchButton = Styled.button`
    width: 32px;
    height: 32px;
    background-color: ${POINT_COLOR};
    img{
        width: 20px;
        height: 20px;
        margin-top: 5px;
    }
`

const CheckButton = Styled.button`
    position: absolute;
    bottom: 0px;
    height: 46px;
    width: 50%;
    div{
        width: 100%;
    }
    span{
        line-height: 46px;
        font-family: NotoSansCJKkr;
        font-weight: bold;
    }
`

const MachineTable = Styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
    tr{
        height: 32px;
        border: 1px solid #b3b3b3;
        padding: 0px;
        th{
            text-align: left;
        }
        td{
            border-spacing: 0px;
            height: 32px;
            padding: 0; 
        }
    }
    
`

const PaginationBox = Styled.div`
    padding-top: 5px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    .MuiButtonBase-root {
        color: black;
    }
    .MuiPaginationItem-root{
        color: black;
    }
`

export default OutsourcingPickerModal;
