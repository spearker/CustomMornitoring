import React, {useCallback, useEffect} from "react";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import {Input} from "semantic-ui-react";
import Old_BasicBarcodePickerModal from "../../Components/Modal/Old_BasicBarcodePickerModal";
import Styled from "styled-components";
import {POINT_COLOR} from "../../Common/configset";
import useObjectInput from "../../hooks/UseInput";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";
import {useHistory} from "react-router-dom";
import {API_URLS, postQualityRequestDetail} from "../../Api/mes/quality";

const initialInputValue = {
    customer_name: '',
    due_date: '',
    process_name: '',
    machine_name: '',
    material_name: '',
    request_time: '',
    request_reason: '',
    inspector_name: '',
    request_complete_time: '',
    test_reason: '',
    total_count: '',
    defective_count: '',
    none_defective_count: '',
    whether: '',
};

const QualityDetailListContainer = ({match}) => {
    const history = useHistory();
    const [inputData, setInputData] = useObjectInput("CHANGE", initialInputValue);

    useEffect(() => {
        console.log(match.params.pk)
        if (match.params.pk) {
            // alert(`수정 페이지 진입 - pk :` + match.params.pk)
            getData()
        }

    }, [])

    const getData = useCallback(async () => {
        const tempUrl = `${API_URLS['status'].detail}`
        const res = await postQualityRequestDetail(tempUrl, {
            request_pk: match.params.pk
        })

        if (res.status === 200) {

            // setInputData('customer_name',res.results.)
            // setInputData('due_date',res.results.)
            setInputData('process_name', res.results.process_name)
            setInputData('machine_name', res.results.machine_name)
            setInputData('material_name', res.results.material_name)
            setInputData('request_time', res.results.request_time)
            setInputData('request_reason', res.results.request_description)
            setInputData('inspector_name', res.results.worker)
            setInputData('request_complete_time', res.results.response_time)
            setInputData('test_reason', res.results.response_description)
            setInputData('total_count', res.results.amount)
            setInputData('defective_count', res.results.eligible)
            setInputData('none_defective_count', res.results.ineligible)
            setInputData('whether', res.results.whether)

        }

    }, [])


    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>제품 검사 내용 보기</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        {/* <tr>
                            <td>• 납품 업체</td>
                            <td><input value={inputData.customer_name} placeholder="납품 업체명"  onChange={(e) => setInputData('customer_name',e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>• 납기 날짜</td>
                            <td><input value={inputData.due_date} placeholder="납기 날짜"  onChange={(e) => setInputData('due_date',e.target.value)}/></td>
                        </tr> */}
                        <tr>
                            <td>• 공정명</td>
                            <td><input value={inputData.process_name} placeholder="공정명"
                                       onChange={(e) => setInputData('process_name', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 기계명</td>
                            <td><input value={inputData.machine_name} placeholder="기계명"
                                       onChange={(e) => setInputData('machine_name', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td><input value={inputData.material_name} placeholder="품목(품목명)"
                                       onChange={(e) => setInputData('material_name', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 검사 요청 시간</td>
                            <td><input value={inputData.request_time} placeholder="검사 요청 시간"
                                       onChange={(e) => setInputData('request_time', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 검사 요청 내용</td>
                            <td>
                                <div style={{border: '1px solid #b3b3b3', marginRight: 1, width: "99%"}}>
                                    <textarea maxLength={160}
                                              onChange={(e) => setInputData('request_reason', e.target.value)}
                                              value={inputData.request_reason} style={{
                                        border: 0,
                                        fontSize: 14,
                                        padding: 12,
                                        height: '70px',
                                        width: '96%'
                                    }} placeholder="내용을 입력해주세요 (80자 미만)" disabled/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>• 검사자</td>
                            <td><input value={inputData.inspector_name} placeholder="검사자"
                                       onChange={(e) => setInputData('inspector_name', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 검사 완료 시간</td>
                            <td><input value={inputData.request_complete_time} placeholder="검사 완료 시간"
                                       onChange={(e) => setInputData('request_complete_time', e.target.value)}
                                       disabled/></td>
                        </tr>
                        <tr>
                            <td>• 검사 내용</td>
                            <td>
                                <div style={{border: '1px solid #b3b3b3', marginRight: 1, width: "99%"}}>
                                    <textarea maxLength={160}
                                              onChange={(e) => setInputData('test_reason', e.target.value)}
                                              value={inputData.test_reason} style={{
                                        border: 0,
                                        fontSize: 14,
                                        padding: 12,
                                        height: '70px',
                                        width: '96%'
                                    }} placeholder="내용을 입력해주세요 (80자 미만)" disabled/>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>• 총 완료 개수</td>
                            <td><input value={inputData.total_count} placeholder="총 완료 개수"
                                       onChange={(e) => setInputData('total_count', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 적격 개수</td>
                            <td><input value={inputData.defective_count} placeholder="적격 개수"
                                       onChange={(e) => setInputData('defective_count', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 부적격 개수</td>
                            <td><input value={inputData.none_defective_count} placeholder="부적격 개수"
                                       onChange={(e) => setInputData('none_defective_count', e.target.value)} disabled/>
                            </td>
                        </tr>
                        <tr>
                            <td>• 적격 여부</td>
                            <td><RegisterDropdown type={'string'}
                                                  onClickEvent={(e: string) => false && setInputData('whether', e)}
                                                  select={inputData.whether} contents={['적격', '부적격']}
                                                  text={'적격 여부를 선택해 주세요.'}/></td>
                        </tr>
                    </table>
                </div>
                <div style={{marginTop: 42, paddingBottom: 42}}>
                    <>
                        {/* <TestButton onClick={async () => {
                            await console.log(123)
                        }}>
                            <div>
                                <p style={{fontSize: 18}}>수정하기</p>
                            </div>
                        </TestButton> */}

                        <ButtonWrap onClick={() => history.goBack()}>
                            <div>
                                <p style={{fontSize: 18}}>리스트 보기</p>
                            </div>
                        </ButtonWrap>
                    </>
                </div>
            </ContainerMain>
        </div>
    )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: auto ;
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
    width: 224px;
    height: 46px;
    border-radius: 6px;
    border-radius: 6px;
    border: none;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #0d0d0d;
`


const TestButton = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: #e7e9eb;
    width: 224px;
    height: 46px;
    border-radius: 6px;
    border-radius: 6px;
    border: none;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #666d79;
    margin-right: 20px;
`

export default QualityDetailListContainer
