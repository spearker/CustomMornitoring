import React, {useCallback, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postProductionRegister} from "../../Api/mes/production";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import ProcessPickerModal from "../../Components/Modal/ProcessPickerModal";
import ChitPickerModal from "../../Components/Modal/ChitPickerModal";
import {useHistory} from "react-router-dom";

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

interface modalData { name?:string, pk?: string }

const WorkHistoryRegisterContainer = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [typeList, setTypelist] = useState<string[]>(typeDummy)
    const [selectType, setSelectType] = useState<string>()
    const [modalSelect, setModalSelect] = useState<{chit?:modalData, factory?:modalData , production?:modalData }>({
        chit: {},
        factory: {},
        production: {}
    })
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"))
    const [selectDateRange, setSelectDateRange] = useState<{start: string, end: string}>({
        start: moment().format("YYYY-MM-DD")+' 00:00',
        end: moment().format("YYYY-MM-DD")+' 00:00',
    })

    const [workHistoryData, setWorkHistoryData] = useState({
        chit_pk:'',
        worker_name: '',
        material_pk: '',
        process_pk: '',
        from: selectDateRange.start,
        to: selectDateRange.end,
        amount: ''
    })
    const history = useHistory();


    const postChitRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['production'].add}`
        const resultData = await postProductionRegister(tempUrl, workHistoryData);

        history.goBack()
    }, [workHistoryData])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>작업 이력 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 전표</td>
                            <td><ChitPickerModal select={modalSelect.chit} onClickEvent={(e) => {
                                setModalSelect({...modalSelect, chit: e})
                                setWorkHistoryData({...workHistoryData, chit_pk: e.pk})
                            }} text={'전표를 선택해 주세요'} buttonWid={30} /></td>
                        </tr>
                        <tr>
                            <td>• 작업자명</td>
                            <td><Input placeholder="작업자명을 입력해 주세요." onChange={(e) => setWorkHistoryData({...workHistoryData, worker_name: e.target.value})}/></td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td>
                                <ProductionPickerModal select={modalSelect.production} onClickEvent={(e) => {
                                    setModalSelect({...modalSelect, production: e})
                                    setWorkHistoryData({...workHistoryData, material_pk: e.pk})
                                }} text={'품목(품목명)을 선택해 주세요'} type={-1} buttonWid={30} />
                            </td>
                        </tr>
                        <tr>
                            <td>• 공정명</td>
                            <td>
                                <ProcessPickerModal select={modalSelect.factory} onClickEvent={(e) => {
                                    setModalSelect({...modalSelect, factory: e})
                                    setWorkHistoryData({...workHistoryData, process_pk: e.pk})
                                }} text={'공정명을 선택해 주세요'} buttonWid={30} />
                            </td>
                        </tr>
                        <tr>
                            <td>• 작업 시작일</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>
                                    <div style={{width: 821, display: 'table-cell'}}>
                                        <div style={{marginTop: 5}}>
                                            {
                                                selectDateRange.start === ''
                                                    ?<InputText>&nbsp; 작업 시작일을 선택해 주세요</InputText>
                                                    :<InputText style={{color: '#111319'}}>&nbsp; {selectDateRange.start}</InputText>
                                            }
                                        </div>
                                    </div>
                                    <ColorCalendarDropdown selectRange={selectDateRange} onClickEvent={(date) => {
                                        setSelectDateRange({...selectDateRange, start: date +' 00:00'})
                                        setWorkHistoryData({...workHistoryData, from: date+' 00:00'})
                                    }} text={'기간 선택'} type={'default'} customStyle={{ height: 32, marginLeft: 0}} zIndex={1}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 작업 종료일</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>
                                    <div style={{width: 821, display: 'table-cell'}}>
                                        <div style={{marginTop: 5}}>
                                            {
                                                selectDateRange.start === ''
                                                    ?<InputText>&nbsp; 작업 종료일 선택해 주세요</InputText>
                                                    :<InputText style={{color: '#111319'}}>&nbsp; {selectDateRange.end}</InputText>
                                            }
                                        </div>
                                    </div>
                                    <ColorCalendarDropdown selectRange={selectDateRange} onClickEvent={(date) => {
                                        setSelectDateRange({...selectDateRange, end: date+' 00:00'})
                                        setWorkHistoryData({...workHistoryData, to: date+' 00:00'})
                                    }} text={'기간 선택'} type={'default'} customStyle={{ height: 32, marginLeft: 0}} zIndex={1}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 총 수량</td>
                            <td><Input placeholder="총 생산 수량을 입력해 주세요." type={'number'} onChange={(e) => setWorkHistoryData({...workHistoryData, amount: e.target.value})}/></td>
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
                        <div>
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
            width: calc( 915px - 8px );
            height: 28px;
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

export default WorkHistoryRegisterContainer
