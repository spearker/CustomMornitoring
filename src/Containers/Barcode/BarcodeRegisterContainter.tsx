import React, {useCallback, useEffect, useRef, useState} from 'react'
import Styled from "styled-components";
import {Input} from 'semantic-ui-react'
import {POINT_COLOR} from "../../Common/configset";
import {API_URLS, postContractModify} from "../../Api/mes/business";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import BasicBarcodePickerModal from "../../Components/Modal/BasicBarcodePickerModal";
import ListHeader from "../../Components/Text/ListHeader";
import CustomPickerModal from "../../Components/Modal/CustomPickerModal";
import NormalInput from "../../Components/Input/NormalInput";
import useObjectInput from "../../Functions/UseInput";
import Header from "../../Components/Text/Header";
import * as _ from 'lodash';
import WhiteBoxContainer from "../WhiteBoxContainer";
import InnerBodyContainer from "../InnerBodyContainer";
import InputContainer from "../InputContainer";
import DropdownInput from "../../Components/Input/DropdownInput";
import {getBarcodeTypeList} from "../../Common/codeTransferFunctions";
import FullAddInput from "../../Components/Input/FullAddInput";
import BarcodeRulesInput from "../../Components/Input/BarcodeRulesInput";


const indexList = ['기계 기본정보', '주변장치 기본정보','금형 기본정보','품목 기본정보','전표 리스트']
const indexType = ['machine','device','mold','material','voucher']
const indexBarcodeType = getBarcodeTypeList('kor');

const initialData = {
    barcode_name: '',
    item_type: {main_type: '', detail_type: ''},
    item_pk: '',
    rules: [''],
    barcode_type: 0,
    barcode_number: 0,
    barcode_img_name: '',
    description: ''
}

const BarcodeRegisterContainer = () => {
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [reason, setReason] = useState<string>('')
    const textBoxRef = useRef(null);
    const [selectItem, setSelectItem] = useState<{name: string, pk: string, type: string}>()
    const [selectBasicBarcode, setSelectBasicBarcode] = useState<{name: string, pk: string}>()

    const [inputData, setInputData] = useObjectInput('CHANGE', initialData);

    const [processData, setProcessData] = useState<IProcessRegister>({
        type: 0,
        name: '',
        processes: [{machine_pk: ''}],
        description: ''
    })

    const [selectMachine, setSelectMachine] = useState<{ name?: string, pk?: string }>()

    const postContractRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['contract'].update}`
        const resultData = await postContractModify(tempUrl, processData);
    }, [processData])

    useEffect(()=> {
        console.log(inputData.rules.toString())
    },[inputData.rules])

    return (
        <div>
            <Header title={isUpdate ? '바코드 수정' : '바코드 등록'}/>
            <WhiteBoxContainer>
                <div>
                    <NormalInput title={'바코드 명'} value={inputData.barcode_name} onChangeEvent={(e) => setInputData('barcode_name',e)} description={'바코드 이름을 입력해주세요.'} />
                    <DropdownInput title={'바코드 종류'} target={indexBarcodeType[inputData.barcode_type]} contents={indexBarcodeType} onChangeEvent={(input)=>setInputData(`barcode_type`, input)}/>
                    <DropdownInput title={'항목'} target={indexList[inputData.type]} contents={indexList} onChangeEvent={(input)=>setInputData(`type`, input)}/>
                    <CustomPickerModal onClickEvent={(e)=> console.log(e)} text={'세부 항목을 검색해주세요.'} type={indexType[processData.type]}/>
                    {
                        inputData.rules.length > 0 && inputData.rules[0] !== null &&
                        <BarcodeText><br/><span>현재 규칙</span><br/>{inputData.rules.map(v=>{if(v !== null)return v + `-`}).join().replace(/,/g,'')}</BarcodeText>
                    }
                    <FullAddInput title={'바코드 규칙'} onChangeEvent={()=>{
                        let temp = _.cloneDeep(inputData.rules);
                        temp.push('');
                        setInputData(`rules`, temp)
                    }}>

                        {
                            inputData.rules.map((v, i)=>{
                                return(
                                    <BarcodeRulesInput title={`· 바코드 규칙 ${i+1}`} value={v}
                                                       onRemoveEvent={()=>{
                                                           let temp = _.cloneDeep(inputData.rules);
                                                           temp.splice(i, 1)
                                                           setInputData(`rules`, temp)
                                                       }}
                                                       onChangeEvent={(input)=>{
                                                           let temp = _.cloneDeep(inputData.rules);
                                                           temp.splice(i, 1, input);
                                                           setInputData(`rules`, temp)
                                                       }}
                                    />
                                )
                            })
                        }
                    </FullAddInput>
                    <InputContainer title={'바코드 번호'}>
                        <BodyDiv>
                            <InputWrapBox>
                                <input type="text" disabled value={inputData.barcode_number === 0 ? '' : inputData.barcode_number} placeholder={'바코드 번호 생성 버튼을 눌러주세요.'} style={{textAlign:'left',border: 'solid 0.5px #d3d3d3', flex: 85,borderRight:0, width:'calc(100% - 90px)', padding:6, backgroundColor:'#f4f6fa', paddingLeft:8, fontSize:14}}/>
                                <SearchButton style={{flex: 15}}>
                                    <p>바코드 번호 생성</p>
                                </SearchButton>
                            </InputWrapBox>
                        </BodyDiv>
                    </InputContainer>
                    <InputContainer title={'바코드 이미지'}>
                        <BodyDiv>
                            <InputWrapBox>
                                <input type="text" disabled value={inputData.barcode_img_name} placeholder={'바코드 번호 생성 버튼을 눌러주세요.'} style={{textAlign:'left',border: 'solid 0.5px #d3d3d3', flex: 85,borderRight:0, width:'calc(100% - 90px)', padding:6, backgroundColor:'#f4f6fa', paddingLeft:8, fontSize:14}}/>
                                <SearchButton style={{flex: 15}}>
                                    <p>바코드 이미지 생성</p>
                                </SearchButton>
                            </InputWrapBox>
                        </BodyDiv>
                    </InputContainer>
                    <div style={{marginTop: 12, marginLeft:180, width: 310, height: 173, lineHeight: 10, border: '1px solid #707070'}}>
                        <p style={{fontFamily: 'NotoSansCJKkr', color: '#b3b3b3', textAlign: "center" }}>바코드 이미지가 없습니다.</p>
                    </div>
                    <ListHeader title="선택 항목"/>
                    <InputContainer title={"불량 사유"} width={180}>
                        <textarea maxLength={120} ref={textBoxRef} onChange={(e)=>setReason(e.target.value)} style={{border:0, fontSize:14, padding:12, height:'70px', width:'calc(100% - 124px)'}} placeholder="내용을 입력해주세요 (80자 미만)">
                            {reason}
                        </textarea>
                    </InputContainer>
                </div>
                <div style={{marginTop: 72,marginLeft: 330}}>
                    <ButtonWrap onClick={async () => {
                        await postContractRegisterData()
                    }}>
                        <div style={{width: 360, height: 46}}>
                            <p style={{fontSize: 18, marginTop: 8}}>등록하기</p>
                        </div>
                    </ButtonWrap>
                </div>
            </WhiteBoxContainer>
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

const ProcessAddButton = Styled.button`

`

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`

const BodyDiv =  Styled.div`
    font-size: 14px;
    width: calc(100% - 190px);
    padding: 0px;
`
const InputWrapBox = Styled.div`
    font-size: 14px;
    width: 100%;
    display: flex;
    background-color: #f4f6fa;
`

const BarcodeText = Styled.p`
  text-align: center;
  color: #555555;
  font-size: 16px;
  span{
    font-weight: bold;
    font-size: 13px;
    padding-top: 14px;
    color: #252525;
  }

`


export default BarcodeRegisterContainer
