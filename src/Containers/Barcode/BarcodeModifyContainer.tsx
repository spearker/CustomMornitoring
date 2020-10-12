import React, {useCallback, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react'
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postContractModify} from "../../Api/mes/business";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import BasicBarcodePickerModal from "../../Components/Modal/BasicBarcodePickerModal";

const typeDummy = [
    '단발',
    '라인',
    '',
    '',
    '조립',
    '검수',
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

const BarcodeModifyContainer = () => {
    const [typeList, setTypeList] = useState<string[]>(typeDummy)
    const [selectItem, setSelectItem] = useState<{name: string, pk: string, type: string}>()
    const [selectBasicBarcode, setSelectBasicBarcode] = useState<{name: string, pk: string}>()

    const [processData, setProcessData] = useState<IProcessRegister>({
        type: 0,
        name: '',
        processes: [{machine_pk: ''}],
        description: ''
    })

    const postContractRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['contract'].update}`
        const resultData = await postContractModify(tempUrl, processData);
    }, [processData])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>바코드 수정</span>
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
                            <td>• 제품 분류</td>
                            <td><Input disabled={true} placeholder="품목을 선택하면 자동 입력됩니다." value={selectItem?.type} /></td>
                        </tr>
                        <tr>
                            <td>• 기준 바코드</td>
                            <td><BasicBarcodePickerModal select={selectBasicBarcode} onClickEvent={(e) => setSelectBasicBarcode(e)} text={'기준 바코드를 선택해 주세요.'}/></td>
                        </tr>
                        <tr>
                            <td>• 바코드 번호</td>
                            <td>
                                <div style={{width: 919, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
                                    <Input disabled placeholder={'바코드 번호 생성 버튼을 눌러주세요.'} style={{flex: 85, height: 28}}/>
                                    <SearchButton style={{flex: 15}}>
                                        <p>바코드 번호 생성</p>
                                    </SearchButton>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 바코드 이미지</td>
                            <td>
                                <div style={{width: 919, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
                                    <Input disabled placeholder={'바코드 번호 생성 버튼을 눌러주세요.'} style={{flex: 83, height: 28}}/>
                                    <SearchButton style={{flex: 17}}>
                                        <p>바코드 이미지 생성</p>
                                    </SearchButton>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div style={{width: 310, height: 173, lineHeight: 10, border: '1px solid #707070'}}>
                                    <p style={{fontFamily: 'NotoSansCJKkr', color: '#b3b3b3' }}>바코드 이미지가 없습니다.</p>
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
        &:first-child{
            width: 133px;
            text-align: left;
        }
    }
    tr{
        height: 65px;
    }
`

const SearchButton = Styled.button`
    width: 32px;
    height: 32px;
    background-color: ${POINT_COLOR};
    border: 1px solid #b3b3b3;
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

export default BarcodeModifyContainer
