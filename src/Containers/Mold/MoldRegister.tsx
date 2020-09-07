import React, {useCallback, useEffect, useState} from 'react'
import Styled from "styled-components";
import {Button, Header, Input, Select} from 'semantic-ui-react'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import ModalDropdown from "../../Components/Dropdown/ModalDropdown";
import {POINT_COLOR} from "../../Common/configset";
import IcButton from "../../Components/Button/IcButton";
import searchImage from "../../Assets/Images/ic_search.png";
import dropdownButton from "../../Assets/Images/ic_dropdownbutton.png";
import {API_URLS, postContractModify} from "../../Api/mes/business";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";

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

const MoldRegisterContainer = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [selectOpen, setSelectOpen] = useState<boolean>(false)
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"))
    const [factoryList, setFactoryList] = useState<string[]>(factoryDummy)
    const [selectFactory, setSelectFactory] = useState<string>()
    const [modalSelect, setModalSelect] = useState<{factory?: string, production?: string}>({
        factory: undefined,
        production: undefined
    })
    const [selectDateRange, setSelectDateRange] = useState<{start: string, end: string}>({
        start: moment().format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
    })

    const [contractData, setContractData] = useState<{pk: string, customer_pk: string, material_pk: string, amount: Number, date: string}>({
        pk: '',
        customer_pk: '',
        material_pk: '',
        amount: 2000,
        date: moment().format('YYYY-MM-DD'),
    })

    const postContractRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['contract'].update}`
        const resultData = await postContractModify(tempUrl, contractData);
    }, [contractData])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>금형 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 금형 명</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setSelectFactory(e)} select={selectFactory} contents={factoryList} text={'선택해 주세요'}/></td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3'}}>
                                    <div style={{width: 885}}>
                                        <div style={{marginTop: 5}}>
                                            {
                                                contractData.material_pk === ''
                                                    ?<InputText>&nbsp; 품목(품목명)을 선택해 주세요</InputText>
                                                    :<InputText style={{color: '#111319'}}></InputText>
                                            }
                                        </div>
                                    </div>
                                    <div style={{width: 32}} onClick={()=> {
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
                            <td>• 수리 담당자</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setSelectFactory(e)} select={selectFactory} contents={factoryList} text={'선택해 주세요'}/></td>
                        </tr>
                        <tr>
                            <td>• 완료 예정일</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>
                                    <div style={{width: 817, display: 'table-cell'}}>
                                        <div style={{marginTop: 5}}>
                                            {
                                                selectDate === ''
                                                    ?<InputText>&nbsp; 거래처를 선택해 주세요</InputText>
                                                    :<InputText style={{color: '#111319'}}>&nbsp; {selectDate}</InputText>
                                            }
                                        </div>
                                    </div>
                                    <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {
                                        setSelectDate(select)
                                        setContractData({...contractData, date: select})
                                    }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0}}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style={{marginTop: 72}}>
                    <ButtonWrap onClick={async () => {
                        await postContractRegisterData()
                    }}>
                        <div style={{width: 360, height: 46}}>
                            <p style={{fontSize: 18, marginTop: 8}}>등록하기</p>
                        </div>
                    </ButtonWrap>
                </div>
            </ContainerMain>
        </div>
    )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: 493px;
    border-radius: 6px;
    background-color: white;
    padding: 35px 20px 0 20px;
    .title {
        font-size: 18px;
        font-famaily: NotoSansCJKkr;
        font-weight: bold;
        color: #19b8df;
        text-align: left;
    }
    table{
        width: 100%;
        height: 100%;
        margin-top: 35px;
    }
    td{
        font-famaily: NotoSansCJKkr;
        font-weight: bold;
        font-size: 15px;
        input{
            padding-left: 8px;
            font-famaily: NotoSansCJKkr;
            height: 32px;
            border: 0.5px solid #b3b3b3;
            width: calc( 100% - 8px );
            background-color: #f4f6fa;
            font-size: 15px;
            &::placeholder:{
                color: #b3b3b3;
            };
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

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`

export default MoldRegisterContainer
