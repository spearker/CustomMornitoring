import React, {useCallback, useEffect, useState} from 'react'
import Styled from "styled-components";
import {Button, Header, Input, Select} from 'semantic-ui-react'
import ColorButton from "../../Components/Button/ColorButton";
import searchImage from "../../Assets/Images/ic_search.png"
import xIcon from "../../Assets/Images/ic_task_close.png"
import Modal from 'react-modal'
import IcButton from "../../Components/Button/IcButton";
import StatusDropdown from "../../Components/Dropdown/StatusDropdown";
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import ModalDropdown from "../../Components/Dropdown/ModalDropdown";
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postChitRegister} from "../../Api/mes/production";
import ReactShadowScroll from 'react-shadow-scroll';

const factoryDummy = [
    '더미 업체 1',
    '더미 업체 2',
    '더미 업체 3',
]

const productionDummy = [
    '더미 품목 1',
    '더미 품목 2',
    '더미 품목 3',
]

const listDummy = [
    { project_pk: 'dummy01', factory: '더미 업체 1', production: '더미 품목 1', planDate: {start: '2020-08-15', end: '2020-08-17'}},
    { project_pk: 'dummy02', factory: '더미 업체 1', production: '더미 품목 1', planDate: {start: '2020-08-15', end: '2020-08-17'}},
]

const ChitRegisterContainer = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"))
    const [modalSelect, setModalSelect] = useState<{factory?: string, production?: string}>({
        factory: undefined,
        production: undefined
    })
    const [selectDateRange, setSelectDateRange] = useState<{start: string, end: string}>({
        start: moment().format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
    })

    const [chitData, setChitData] = useState<{project_pk: string, registerer: string, deadline: string, goal: Number}>({
        project_pk: '',
        registerer: 'Unknown',
        deadline: moment().format('YYYY-MM-DD'),
        goal: 2000
    })

    const postChitRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['chit'].load}`
        const resultData = await postChitRegister(tempUrl, chitData);
    }, [chitData])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>전표 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 등록자</td>
                            <td><Input placeholder="입력해 주세요." onChangeText={(e:string) => setChitData({...chitData, registerer: e})}/></td>
                        </tr>
                        <tr>
                            <td>• 생산계획</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row'}}>
                                    <div style={{ flex: 95}}>
                                        <Input style={{width: "100%"}} placeholder="생산 계획을 선택해 주세요." />
                                    </div>
                                    <div style={{flex: 5}} onClick={()=> {
                                        setOpen(true)
                                    }}>
                                        <IcButton customStyle={{width: 32, height: 32}} image={searchImage} dim={true} onClickEvent={() => {
                                            setOpen(true)
                                        }}/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 납기일</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row'}}>
                                    <div style={{ flex: 95}}>
                                        <Input style={{width: "100%"}} disabled placeholder="YYYY-MM-DD" value={selectDate}/>
                                    </div>
                                    <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {
                                        setSelectDate(select)
                                        setChitData({...chitData, deadline: select})
                                    }} text={'날짜 선택'} type={'single'}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td><Input disabled placeholder="Read only" /></td>
                        </tr>
                        <tr>
                            <td>• 납품 업체</td>
                            <td><Input disabled placeholder="Read only" /></td>
                        </tr>
                        <tr>
                            <td>• 남은 수량</td>
                            <td><Input disabled placeholder="Read only" /></td>
                        </tr>
                        <tr>
                            <td>• 생산 할 수량</td>
                            <td><Input placeholder="생산 목표 수량은 입력해 주세요" type={'number'} onChangeText={(e:Number) => setChitData({...chitData, goal: e})}/></td>
                        </tr>
                    </table>
                </div>
                <div style={{marginTop: 180}}>
                    <ButtonWrap onClick={async () => {
                        await postChitRegisterData()
                    }}>
                        <div style={{width: 360, height: 46}}>
                            <p style={{fontSize: 18, marginTop: 8}}>전표 등록하기</p>
                        </div>
                    </ButtonWrap>
                </div>
            </ContainerMain>
            <Modal
                isOpen={open}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={{
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        transform             : 'translate(-50%, -50%)'
                    },
                    overlay:{
                        background: 'rgba(0,0,0,.6)'
                    }
                }}
                contentLabel="Example Modal"
            >
                <div style={{width: 410, height: 463, justifyContent: 'space-between'}}>
                    <div style={{ flexDirection: 'row', display: 'flex', width: "100%"}}>
                        <div style={{flex: 1, width: "85%"}}>
                            <span style={{fontSize: 22, fontWeight: 'bold'}}>생산 계획</span>
                        </div>
                        <img src={xIcon} style={{ width: 18, height: 18, marginTop: 10}} onClick={() => {
                            setOpen(false)
                        }}/>
                    </div>
                    <div>
                        <p style={{fontFamily: 'NotoSansCJKkr', fontWeight: 'bold'}}>• 생산 계획 일정</p>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 18, marginRight: 10}}>
                            <ColorCalendarDropdown selectRange={selectDateRange} onClickEvent={(start, end) => setSelectDateRange({
                                ...selectDateRange,
                                start,
                                end: end? end : selectDateRange.end
                            })} text={'날짜 선택'} type={'range'} zIndex={100}/>
                        </div>
                        <div>
                            <ModalDropdown select={modalSelect.factory} onClickEvent={(v) => setModalSelect({...modalSelect, factory: v})} contents={factoryDummy} text={'납품 업체 선택'}/>
                            <ModalDropdown select={modalSelect.production} onClickEvent={(v) => setModalSelect({...modalSelect, production: v})} contents={productionDummy} text={'품목 선택'}/>
                        </div>
                        <div style={{width: "100%", height: 130, marginLeft: 10, marginTop: 10}} >
                            <ReactShadowScroll style={{height: 100}}>
                            {
                                listDummy.map((v, i) => {
                                    return(
                                        <div style={{border: '0.5px solid #b3b3b3', width: 390, display: 'flex'}}>
                                            <div style={{width: "93%", display: 'inline-block' }}>
                                                <span style={{textAlign: 'left', fontSize: 15, margin: 0}}>&nbsp; {v.factory}</span>
                                            </div>
                                            <div style={{width: "7%", display: 'inline-block', height: 28, backgroundColor: POINT_COLOR}}>
                                                {/*아이콘 넣어야 함*/}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </ReactShadowScroll>
                        </div>
                        <div>
                            <table style={{width: "100%"}}>
                                <tr style={{borderBottom: 30, borderBottomColor: '#707070', borderBottomWidth: 2}}>
                                    <th style={{color: '#19b9df'}}>납품업체</th>
                                    <th>품목</th>
                                    <th>계획 일정</th>
                                </tr>
                                {
                                    listDummy.map((v,i) => {
                                        return(<tr>
                                            <td>
                                                <span>{v.factory}</span>
                                            </td>
                                            <td>
                                                <span>{v.production}</span>
                                            </td>
                                            <td>
                                                <span>{v.planDate.start}~{v.planDate.end}</span>
                                            </td>
                                        </tr>)
                                    })
                                }
                            </table>
                        </div>
                        <div>
                            <CheckButton style={{left: 0, backgroundColor: '#e7e9eb'}} onClick={() => {setOpen(false)}}>
                                <div>
                                    <span style={{color: '#666d79'}}>취소</span>
                                </div>
                            </CheckButton>
                            <CheckButton style={{right:0, backgroundColor: POINT_COLOR}} onClick={() => {setOpen(false)}}>
                                <div>
                                    <span style={{color: 'black'}}>확인</span>
                                </div>
                            </CheckButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: 798px;
    border-radius: 6px;
    background-color: white;
    padding: 35px 20px 0 20px;
    .title {
        font-size: 18px;
        font-famaily: NotoSansCJKkr-Bold;
        color: #19b8df;
        text-align: left;
    }
    table{
        width: 100%;
        height: 100%;
        margin-top: 35px;
    }
    td{
        font-famaily: NotoSansCJKkr-Bold;
        font-size: 15px;
        input{
            height: 28px;
            border: 0.5px solid #b3b3b3;
            width: 98%;
            background-color: #f4f6fa;
        }
        &:first-child{
            width: 133px;
            text-align: left;
        }
    }
    tr{
        height: 65px;
    }
`

const CheckButton = Styled.button`
    position: absolute;
    bottom: 0px;
    height: 46px;
    width: 225px;
    div{
        width: 100%;
    }
    span{
        line-height: 46px;
        font-family: NotoSansCJKkr;
        font-weight: bold;
    }
`

const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
  `

export default ChitRegisterContainer
