import React, {useCallback, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postChitRegister} from "../../Api/mes/production";
import ProjectPlanPickerModal from "../../Components/Modal/ProjectPlanPickerModal";
import {useHistory} from "react-router-dom";

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
    const [modalSelect, setModalSelect] = useState<{production: {pk: string, manager: string, material_name: string, supplier_name: string}}>({
        production: {manager: '', material_name: '', supplier_name: '', pk: ''}
    })
    const history = useHistory();
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
        const tempUrl = `${API_URLS['chit'].register}`
        const resultData = await postChitRegister(tempUrl, {
            project_pk: modalSelect.production.pk,
            registerer: chitData.registerer,
            deadline: selectDate,
            goal: chitData.goal
        });

        history.goBack()
    }, [chitData])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
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
                            <td><Input placeholder="등록자를 입력해 주세요." onChange={(e) => setChitData({...chitData, registerer: e.target.value})}/></td>
                        </tr>
                        <tr>
                            <td>• 생산계획</td>
                            <td><ProjectPlanPickerModal select={modalSelect.production} text={'생산계획을 검색해주세요.'} onClickEvent={(e) => setModalSelect({
                                ...modalSelect,
                                production: e
                            })} inputWidth={'calc(99% - 4px)'} buttonWid={30} /></td>
                        </tr>
                        <tr>
                            <td>• 납기일</td>
                            <td>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', width: 'calc(99% - 4px)', margin: '0 auto'}}>
                                    <InputBox style={{ flex: 95}}>
                                        <Input style={{width: "100%"}} disabled placeholder="YYYY-MM-DD" value={selectDate}/>
                                    </InputBox>
                                    <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {
                                        setSelectDate(select)
                                        setChitData({...chitData, deadline: select})
                                    }} text={'날짜 선택'} type={'single'} customStyle={{ marginLeft: 0}}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td><Input disabled placeholder="Read only" value={modalSelect.production.material_name}/></td>
                        </tr>
                        <tr>
                            <td>• 납품 업체</td>
                            <td><Input disabled placeholder="Read only" value={modalSelect.production.supplier_name}/></td>
                        </tr>
                        <tr>
                            <td>• 생산 할 수량</td>
                            <td><Input placeholder="생산 목표 수량은 입력해 주세요" type={'number'} onChange={(e) => setChitData({...chitData, goal: Number(e.target.value)})}/></td>
                        </tr>
                    </table>
                </div>
                <div style={{marginTop: 180}}>
                    <ButtonWrap onClick={async () => {
                        await postChitRegisterData()
                    }}>
                        <div style={{}}>
                            <p style={{fontSize: 18}}>전표 등록하기</p>
                        </div>
                    </ButtonWrap>
                </div>
            </ContainerMain>
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
        font-family: NotoSansCJKkr-Bold;
        color: #19b8df;
        text-align: left;
    }
    table{
        width: 100%;
        height: 100%;
        margin-top: 35px;
    }
    td{
        font-family: NotoSansCJKkr-Bold;
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
    width: 360px;
    height: 46px;
    box-sizing: border-box;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
  `
const InputBox = Styled.div`
&>div{
    &:first-child{
        &>input{
            width: 100%;
        }
    }
}
`

export default ChitRegisterContainer
