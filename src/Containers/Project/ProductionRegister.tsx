import React, {useCallback, useEffect, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postProductionRegister} from "../../Api/mes/production";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import CustomerPickerModal from "../../Components/Modal/CustomerPickerModal";
import ProcessPickerModal from "../../Components/Modal/ProcessPickerModal";
import {useHistory} from 'react-router-dom';

const typeDummy = [
    '수주 처리',
    '안전 재고 확보',
    '주문 예측',
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

const ProductionRegisterContainer = () => {
    const history = useHistory()
    const [open, setOpen] = useState<boolean>(false)
    const [typeList, setTypelist] = useState<string[]>(typeDummy)
    const [selectType, setSelectType] = useState<string>()
    const [modalSelect, setModalSelect] = useState<{factory?: { name?: string, pk?: string }, production?: { name?: string, pk?: string },
        segment?: { name?: string, pk?: string }
    }>({
        factory: {},
        production: {},
        segment: {}
    })
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"))
    const [selectDateRange, setSelectDateRange] = useState<{start: string, end: string}>({
        start: moment().format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
    })

    const [chitData, setChitData] = useState<IProductionAdd>({
        type: 0,
        manager: '',
        material: '',
        from: '',
        to: '',
        amount: 0,
        supplier: '',
        segment: ''
    })

    const postChitRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['production'].register}`
        let type
        if(selectType === '수주 처리') {
            type = 0
        }else if(selectType === '안전 재고 확보') {
            type = 1
        }else if(selectType === '주문 예측') {
            type = 1
        }

        const resultData = await postProductionRegister(tempUrl, {
            type: type,
            manager: chitData.manager,
            material: modalSelect.production?.pk,
            from: selectDateRange.start,
            to: selectDateRange.end,
            amount:chitData.amount,
            supplier: modalSelect.factory?.pk,
            segment: modalSelect.segment?.pk
        });

        console.log(resultData)
        if(resultData.status === 200) {
            history.goBack()
        }
    }, [chitData, modalSelect])

    useEffect(() => {
        console.log(modalSelect)
    }, [modalSelect])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>생산 계획 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 타입</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setSelectType(e)} select={selectType} contents={typeList} text={'타입을 선택해 주세요'} buttonWid={30} /></td>
                        </tr>
                        <tr>
                            <td>• 계획자</td>
                            <td><Input placeholder="입력해 주세요." onChange={(e) => setChitData({...chitData, manager: e.target.value})}/></td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td><ProductionPickerModal select={modalSelect.production}
                                                       onClickEvent={(e) => {
                                setModalSelect({...modalSelect, production: e })
                            }} text={"품목명을 검색해주세요."} type={1} buttonWid={30} /></td>
                        </tr>
                        <tr>
                            <td>• 생산 계획 일정</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>
                                    <div style={{width: 821, display: 'table-cell'}}>
                                        <div style={{marginTop: 5}}>
                                            {
                                                selectDateRange.start === ''
                                                    ?<InputText>&nbsp; 거래처를 선택해 주세요</InputText>
                                                    :<InputText style={{color: '#111319'}}>&nbsp; {selectDateRange.start} ~ {selectDateRange.end}</InputText>
                                            }
                                        </div>
                                    </div>
                                    <ColorCalendarDropdown selectRange={selectDateRange} zIndex={3} onClickEvent={(start, end) => {
                                        setSelectDateRange({start, end: !end ? selectDateRange.end : end})
                                        setChitData({...chitData, from: start, to: !end ? selectDateRange.end : end})
                                    }} text={'기간 선택'} type={'range'} customStyle={{ height: 32, marginLeft: 0}}/>
                                </div>
                            </td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <td>• 공정 경로</td>*/}
                        {/*    <td><Input placeholder="입력해 주세요." onChangeText={(e:string) => setChitData({...chitData, manager: e})}/></td>*/}
                        {/*</tr>*/}
                        <tr>
                            <td>• 총 수량</td>
                            <td><Input placeholder="생산 목표 수량은 입력해 주세요" type={'number'} onChange={(e) => setChitData({...chitData, amount: Number(e.target.value)})}/></td>
                        </tr>
                        <tr>
                            <td>• 납품 업체</td>
                            <td>
                                <CustomerPickerModal select={modalSelect.factory}
                                                       onClickEvent={(e) => {
                                                           setModalSelect({...modalSelect, factory: e })
                                                       }} text={"거래처를 검색해주세요."} buttonWid={30} />
                            </td>
                        </tr>
                        <tr>
                            <td>• 공정명</td>
                            <td>
                                <ProcessPickerModal select={modalSelect.segment}
                                    onClickEvent={(e) => {
                                        console.log(e)
                                        setModalSelect({...modalSelect, segment: e })
                                    }}
                                                    seg
                                    text={"공정명을 검색해 주세요"} buttonWid={30} />
                            </td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <td>• 납기 일</td>*/}
                        {/*    <td>*/}
                        {/*        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>*/}
                        {/*            <div style={{width: 821, display: 'table-cell'}}>*/}
                        {/*                <div style={{marginTop: 5}}>*/}
                        {/*                    {*/}
                        {/*                        selectDate === ''*/}
                        {/*                            ?<InputText>&nbsp; 거래처를 선택해 주세요</InputText>*/}
                        {/*                            :<InputText style={{color: '#111319'}}>&nbsp; {selectDate}</InputText>*/}
                        {/*                    }*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {*/}
                        {/*                setSelectDate(select)*/}
                        {/*                setChitData({...chitData, deadline: select})*/}
                        {/*            }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0}}/>*/}
                        {/*        </div>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                    </table>
                </div>
                <div style={{marginTop: 130}}>
                    <ButtonWrap onClick={async () => {
                        await postChitRegisterData()
                    }}>
                        <div style={{}}>
                            <p style={{fontSize: 18}}>등록하기</p>
                        </div>
                    </ButtonWrap>
                </div>
            </ContainerMain>
        </div>
    )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: 827px;
    border-radius: 6px;
    background-color: white;
    padding: 35px 20px 0 20px;
    .title {
        font-size: 18px;
        font-family: NotoSansCJKkr;
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
        font-family: NotoSansCJKkr;
        font-weight: bold;
        font-size: 15px;
        input{
            padding-left: 8px;
            width: calc( 917px - 8px );
            height: 32px;
            font-size: 15px;
            border: 0.5px solid #b3b3b3;
            background-color: #f4f6fa;
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
    width: 360px;
    height: 46px;
    box-sizing: border-box;
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

export default ProductionRegisterContainer
