import React, {useCallback, useEffect, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import {POINT_COLOR} from "../../Common/configset";
import IcButton from "../../Components/Button/IcButton";
import searchImage from "../../Assets/Images/ic_search.png";
import {API_URLS, postContractRegister} from "../../Api/mes/marketing";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";
import CustomerPickerModal from "../../Components/Modal/CustomerPickerModal";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import {useHistory} from 'react-router-dom'

const ContractRegisterContainer = () => {
    const history = useHistory()
    const [open, setOpen] = useState<boolean>(false)
    const [selectOpen, setSelectOpen] = useState<boolean>(false)
    const [selectDate, setSelectDate] = useState<string>(moment().format("YYYY-MM-DD"))
    const [customer, setCustomer] = useState<{ name?:string, pk?: string }>()
    const [selectMaterial, setSelectMaterial] = useState<{ name?:string, pk?: string }>()
    const [selectFactory, setSelectFactory] = useState<string>()
    const [modalSelect, setModalSelect] = useState<{factory?: string, production?: string}>({
        factory: undefined,
        production: undefined
    })
    const [selectDateRange, setSelectDateRange] = useState<{start: string, end: string}>({
        start: moment().format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD"),
    })

    const [contractData, setContractData] = useState<{customer_pk?: string, material_pk?: string, amount: Number, date: string}>({
        customer_pk: '',
        material_pk: '',
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
    })

    const postContractRegisterData = useCallback(async () => {

        if(contractData.customer_pk === '' || contractData.customer_pk === undefined  ){
            alert("거래처 명은 필수 항목입니다. 반드시 선택해주세요.")
            return;
        } else if (contractData.material_pk === '' || contractData.material_pk === undefined){
            alert("품목(품목명) 필수 항목입니다. 반드시 선택해주세요.")
            return;
        } else if (contractData.amount === 0){
            alert("수리 담당자는 필수 항목입니다. 반드시 입력해주세요.")
            return;
        } else if (contractData.date === ""){
            alert("완료 예정일은 필수 항목입니다. 반드시 입력해주세요.")
            return;
        }

        const tempUrl = `${API_URLS['contract'].register}`
        const resultData = await postContractRegister(tempUrl, contractData);

        history.goBack()
    }, [contractData,selectMaterial,customer])

    useEffect(()=>{
        setContractData({...contractData,customer_pk:customer?.pk,material_pk:selectMaterial?.pk})
    },[selectMaterial,customer])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>수주 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 거래처 명</td>
                            <td><CustomerPickerModal onClickEvent={(e)=> setCustomer(e)} select={customer} text={'거래처를 선택해주세요.'}/></td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td><ProductionPickerModal select={selectMaterial} onClickEvent={(e) => setSelectMaterial(e)} text={'품목(품목명)을 선택해주세요.'} type={1}/></td>
                        </tr>
                        <tr>
                            <td>• 수량</td>
                            <td><input placeholder="수량을 입력해 주세요." type="number" onChange={(e) => setContractData({...contractData, amount: Number(e.target.value)})}/></td>
                        </tr>
                        <tr>
                            <td>• 수주 날짜</td>
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
                        <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
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
    height: 493px;
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
            font-family: NotoSansCJKkr;
            height: 32px;
            border: 0.5px solid #b3b3b3;
            width: 100%;
            background-color: #f4f6fa;
            font-size: 15px;
            &::placeholder:{
                color: #b3b3b3;
            };
            box-sizing: border-box;
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

export default ContractRegisterContainer
