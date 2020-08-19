import React, {useCallback, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react'
import searchImage from "../../Assets/Images/ic_search.png"
import IcButton from "../../Components/Button/IcButton";
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postProductionRegister} from "../../Api/mes/production";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";

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
    const [open, setOpen] = useState<boolean>(false)
    const [typeList, setTypelist] = useState<string[]>(typeDummy)
    const [selectType, setSelectType] = useState<string>()
    const [modalSelect, setModalSelect] = useState<{factory?: string, production?: string}>({
        factory: undefined,
        production: undefined
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
        procedure: '',
        amount: 0,
        supplier: '',
        deadline: ''
    })

    const postChitRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['production'].add}`
        const resultData = await postProductionRegister(tempUrl, chitData);
    }, [chitData])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>
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
                            <td><RegisterDropdown onClickEvent={(e: string) => setSelectType(e)} select={selectType} contents={typeList} text={'타입을 선택해 주세요'}/></td>
                        </tr>
                        <tr>
                            <td>• 계획자</td>
                            <td><Input placeholder="입력해 주세요." onChangeText={(e:string) => setChitData({...chitData, manager: e})}/></td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3'}}>
                                    <div style={{width: 889}}>
                                        <div style={{marginTop: 5}}>
                                            {
                                                chitData.material === ''
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
                                    <ColorCalendarDropdown selectRange={selectDateRange} onClickEvent={(start, end) => {
                                        setSelectDateRange({start, end: !end ? selectDateRange.end : end})
                                        setChitData({...chitData, from: start, to: !end ? selectDateRange.end : end})
                                    }} text={'기간 선택'} type={'range'} customStyle={{ height: 32, marginLeft: 0}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 공정 경로</td>
                            <td><Input placeholder="입력해 주세요." onChangeText={(e:string) => setChitData({...chitData, manager: e})}/></td>
                        </tr>
                        <tr>
                            <td>• 총 수량</td>
                            <td><Input placeholder="생산 목표 수량은 입력해 주세요" type={'number'} onChangeText={(e:Number) => setChitData({...chitData, amount: e})}/></td>
                        </tr>
                        <tr>
                            <td>• 납품 업체</td>
                            <td><Input placeholder="납품 업체를 입력해 주세요" onChangeText={(e:Number) => setChitData({...chitData, amount: e})}/></td>
                        </tr>
                        <tr>
                            <td>• 납기 일</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#f4f6fa', border: '0.5px solid #b3b3b3', height: 32}}>
                                    <div style={{width: 821, display: 'table-cell'}}>
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
                                        setChitData({...chitData, deadline: select})
                                    }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0}}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style={{marginTop: 130}}>
                    <ButtonWrap onClick={async () => {
                        await postChitRegisterData()
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
    height: 827px;
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