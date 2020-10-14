import React, {useCallback, useEffect, useState} from "react";
import moment from "moment";
import {API_URLS, getMoldList, postMoldRegister} from "../../Api/mes/manageMold";
import MoldPickerModal from "../../Components/Modal/MoldPickerModal";
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import Styled from "styled-components";
import {POINT_COLOR} from "../../Common/configset";
import {useHistory} from 'react-router-dom';
import {Input} from "semantic-ui-react";

const MoldManageCreate = () => {
    const history = useHistory()
    const [reason, setReason] = useState<string>('')
    const [moldData, setMoldData] = useState<{name: string, pk: string}>()

    const [selectMold, setSelectMold] = useState<{max_stroke: string,manufacturing_date: string,site: string,input_item_name: string,production_name:string}>({
        max_stroke: "",
        manufacturing_date: "",
        site: "",
        input_item_name: "",
        production_name: ""
    })

    useEffect(()=>{
        moldData?.pk === undefined ?
            console.log('')
            :
            getMoldManageSelect()
    },[moldData?.pk])

    const getMoldManageSelect = useCallback(async () => {
        const tempUrl = `${API_URLS["manage"].selectInfo}?pk=${moldData?.pk}`
        const resultData = await getMoldList(tempUrl);

        if(resultData){
            setSelectMold({
                ...selectMold,
                max_stroke: resultData.max_stroke,
                manufacturing_date: resultData.manufacturing_date,
                site: resultData.site,
                input_item_name: resultData.input_item_name,
                production_name: resultData.production_name
            })
        }
    }, [selectMold,moldData])

    const postContractRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS["manage"].register}`
        const resultData = await postMoldRegister(tempUrl, {
            mold_pk: moldData?.pk,
            contents: reason
        });

        if(resultData.status === 200){
            alert('성공적으로 등록되었습니다.')
            history.push('/mold/manage/list')
        }
    }, [moldData, reason])

    useEffect(()=>{
        console.log(selectMold)
    },[selectMold])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>금형 관리 등록</span>
                </div>
            </div>
            <ContainerMain style={{paddingBottom: 20}}>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 금형명</td>
                            <td><MoldPickerModal text={'금형을 선택해 주세요'} onClickEvent={(e) => setMoldData(e)} select={moldData}/></td>
                        </tr>
                        <tr>
                            <td>• 최대타수</td>
                            <td><input  disabled placeholder="금형을 선택해 주세요." value={selectMold.max_stroke} /></td>
                        </tr>
                        <tr>
                            <td>• 제조일</td>
                            <td><input  disabled placeholder="금형을 선택해 주세요." value={selectMold.manufacturing_date} /></td>
                        </tr>
                        <tr>
                            <td>• 창고위치</td>
                            <td><input  disabled placeholder="금형을 선택해 주세요." value={selectMold.site} /></td>
                        </tr>
                        <tr>
                            <td>• 투입품목</td>
                            <td><input  disabled placeholder="금형을 선택해 주세요." value={selectMold.input_item_name} /></td>
                        </tr>
                        <tr>
                            <td>• 생산품목</td>
                            <td><input  disabled placeholder="금형을 선택해 주세요." value={selectMold.production_name} /></td>
                        </tr>
                        <tr>
                            <td>• 관리 내용</td>
                            <td>
                                <div style={{border: '1px solid #b3b3b3', marginRight: 1, width: "99%"}}>
                                    <textarea maxLength={160} onChange={(e)=>setReason(e.target.value)} style={{border:0, fontSize:14, padding:12, height:'70px', width: '96%' }} placeholder="내용을 입력해주세요 (80자 미만)">
                                        {reason}
                                    </textarea>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style={{marginTop: 72,}}>
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
    height: auto;
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

export default MoldManageCreate
