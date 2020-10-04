import React from "react";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import {Input} from "semantic-ui-react";
import BasicBarcodePickerModal from "../../Components/Modal/BasicBarcodePickerModal";
import Styled from "styled-components";
import {POINT_COLOR} from "../../Common/configset";

const QualityDetailListContainer = () => {
    return (
        <div>
            {/*<div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>*/}
            {/*    <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>*/}
            {/*        <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>제품 검사 내용 보기</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<ContainerMain>*/}
            {/*    <div>*/}
            {/*        <p className={'title'}>필수 항목</p>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <table style={{color: "black"}}>*/}
            {/*            <tr>*/}
            {/*                <td>• 납품 업체</td>*/}
            {/*                <td><ProductionPickerModal select={selectItem} onClickEvent={(e) => setSelectItem(e)} text={'품목(품목명)을 선택해주세요.'}/></td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>• 납기 날짜</td>*/}
            {/*                <td><Input disabled={true} placeholder="품목을 선택하면 자동 입력됩니다." value={selectItem?.type} /></td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>• 공정명</td>*/}
            {/*                <td><BasicBarcodePickerModal select={selectBasicBarcode} onClickEvent={(e) => setSelectBasicBarcode(e)} text={'기준 바코드를 선택해 주세요.'}/></td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>• 기계명</td>*/}
            {/*                <td></td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>• 품목(품목명)</td>*/}
            {/*                <td></td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*                <td>• 검사 요청 시간</td>*/}
            {/*                <td>*/}
            {/*                    <div style={{border: '1px solid #b3b3b3', marginRight: 1, width: "99%"}}>*/}
            {/*                        <textarea maxLength={160} onChange={(e)=>setReason(e.target.value)} value={reasen} style={{border:0, fontSize:14, padding:12, height:'70px', width: '96%' }} placeholder="내용을 입력해주세요 (80자 미만)"/>*/}
            {/*                    </div>*/}
            {/*                </td>*/}
            {/*            </tr>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*    <div style={{marginTop: 72}}>*/}
            {/*        <ButtonWrap onClick={async () => {*/}
            {/*            await postContractRegisterData()*/}
            {/*        }}>*/}
            {/*            <div style={{width: 360, height: 46}}>*/}
            {/*                <p style={{fontSize: 18, marginTop: 8}}>등록하기</p>*/}
            {/*            </div>*/}
            {/*        </ButtonWrap>*/}
            {/*    </div>*/}
            {/*</ContainerMain>*/}
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
            font-famaily: NotoSansCJKkr;
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

export default QualityDetailListContainer
