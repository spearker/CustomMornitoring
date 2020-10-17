import React, {useCallback, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react';
import moment from "moment";
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postContractModify} from "../../Api/mes/business";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";

const safetyStockDummy = [
    '1공장',
    '2공장',
    '1창고',
    '2창고',
]

const productionTypeDummy = [
    '원자재',
    '반제품',
    '완재품',
]

const stockTypeDummy = [
    '일반',
    '제공재고',
    '외주 재고',
]

const listDummy = [
    { project_pk: 'dummy01', factory: '더미 업체 1', production: '더미 품목 1', planDate: {start: '2020-08-15', end: '2020-08-17'}},
    { project_pk: 'dummy02', factory: '더미 업체 1', production: '더미 품목 1', planDate: {start: '2020-08-15', end: '2020-08-17'}},
]

const ManageStockRegisterContainer = () => {
    const [safetyStockList, setSafetyStockList] = useState<string[]>(safetyStockDummy)
    const [productionTypeList, setProductionTypeList] = useState<string[]>(productionTypeDummy)
    const [stockTypeList, setStockTypeList] = useState<string[]>(stockTypeDummy)
    const [productionType, setProductionType] = useState<string>()
    const [selectItem, setSelectItem] = useState<{name: string, pk: string, type: string}>()
    const [safetyStock, setSafetyStock] = useState<string>()
    const [stockType, setStockType] = useState<string>()

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
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>재고 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td><ProductionPickerModal select={selectItem} onClickEvent={(e) => setSelectItem(e)} text={'품목(품목명)을 선택해주세요.'}/></td>
                        </tr>
                        <tr>
                            <td>• 자재 종류</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setProductionType(e)} select={productionType} contents={productionTypeList} text={'자재 종류를 선택해 주세요'}/></td>
                        </tr>
                        <tr>
                            <td>• 재고 분류</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setStockType(e)} select={stockType} contents={stockTypeList} text={'재고 분류를 선택해 주세요'}/></td>
                        </tr>
                        <tr>
                            <td>• 재고량</td>
                            <td><Input type={'number'} placeholder="재고량을 입력해 주세요." onChangeText={(e:number) => setContractData({...contractData, amount: e})}/></td>
                        </tr>
                        <tr>
                            <td>• 보관장소</td>
                            <td><RegisterDropdown type={'string'} onClickEvent={(e: string) => setSafetyStock(e)} select={safetyStock} contents={safetyStockList} text={'보관 장소를 선택해 주세요'}/></td>
                        </tr>
                        <tr>
                            <td>• 안전재고</td>
                            <td><Input type={'number'} placeholder="안전재고량을 입력해주세요."  onChangeText={(e:number) => setContractData({...contractData, amount: e})}/></td>
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
    height: 635px;
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

export default ManageStockRegisterContainer
