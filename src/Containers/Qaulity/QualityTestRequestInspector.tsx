import React, {useCallback, useEffect, useState} from "react";
import {API_URLS, postQualityRequestDetail} from "../../Api/mes/quality";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import {Input} from "semantic-ui-react";
import Old_BasicBarcodePickerModal from "../../Components/Modal/Old_BasicBarcodePickerModal";
import Styled from "styled-components";
import {POINT_COLOR} from "../../Common/configset";
import useObjectInput from "../../hooks/UseInput";
import ProcessPickerModal from "../../Components/Modal/ProcessPickerModal";
import MachinePickerModal from "../../Components/Modal/MachinePickerModal";
import DropdownInput from "../../Components/Input/DropdownInput";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";
import {useHistory} from 'react-router-dom'

interface Props {
    match: any;
}

const initialInputValue = {
    process_name: '',
    machine_name: '',
    material_name: '',
    res: '',
    request_reason: '',
    total_count: 0,
    defective_count: '',
    none_defective_count: '',
    whether: '',
    inspector_name: '',
    test_reason: '',
};

const QualityTestRequestInspectorContainer = ({match}: Props) => {

    const history = useHistory()
    const [inputData, setInputData] = useObjectInput("CHANGE", initialInputValue);
    const [isDetail, setIsDetail] = useState('Inspection');

    useEffect(() => {
        /* if( match.params.pk ){
            alert(`수정 페이지 진입 - pk :` + match.params.pk + match.params.type)

        } */
        if (match.params.type) {
            if (match.params.type === 'inspection') {
                setIsDetail('Inspection');
                getDataInspection();
            } else if (match.params.type === 'worker') {
                setIsDetail('Worker');
                getDataWorker();
            } else if (match.params.type === 'modify') {
                setIsDetail('Modify');
                getDataModify();
            }
        }


    }, [match])

    // 제품 검사 요청 리스트 자세히보기
    const getDataInspection = useCallback(async () => {
        const tempUrl = `${API_URLS['response'].requestDetail}`
        const res = await postQualityRequestDetail(tempUrl, {
            request_pk: match.params.pk
        })

        if (res.status === 200) {
            setInputData('process_name', res.results.process_name)
            setInputData('machine_name', res.results.machine_name)
            setInputData('material_name', res.results.material_name)
            setInputData('request_time', res.results.request_time)
            setInputData('request_reason', res.results.description)
            setInputData('total_count', Number(res.results.amount))

            //부적격 개수 입력전 적격 개수
            setInputData('defective_count', Number(res.results.amount))
        }
    }, [inputData])

    // 제품 검사 완료 자세히보기
    const getDataModify = useCallback(async () => {
        const tempUrl = `${API_URLS['response'].detail}`
        const res = await postQualityRequestDetail(tempUrl, {
            response_pk: match.params.pk
        })

        if (res.status === 200) {
            setInputData('process_name', res.results.process_name)
            setInputData('machine_name', res.results.machine_name)
            setInputData('material_name', res.results.material_name)
            setInputData('request_time', res.results.request_time)
            setInputData('request_reason', res.results.request_description)
            setInputData('total_count', Number(res.results.amount))
            setInputData('defective_count', Number(res.results.eligible))
            setInputData('none_defective_count', Number(res.results.ineligible));
            setInputData('whether', res.results.whether);
            setInputData('inspector_name', res.results.writer)
            setInputData('test_reason', res.results.response_description)

        }
    }, [inputData])

    // 제품 검사 완료 (작업자) 자세히보기
    const getDataWorker = useCallback(async () => {
        const tempUrl = `${API_URLS['request'].completeDetail}`
        const res = await postQualityRequestDetail(tempUrl, {
            request_pk: match.params.pk
        })

        if (res.status === 200) {
            setInputData('process_name', res.results.process_name)
            setInputData('machine_name', res.results.machine_name)
            setInputData('material_name', res.results.material_name)
            setInputData('request_time', res.results.request_time)
            setInputData('request_reason', res.results.description)
            setInputData('total_count', Number(res.results.amount))
            setInputData('defective_count', Number(res.results.eligible))
            setInputData('none_defective_count', Number(res.results.ineligible));
            setInputData('whether', res.results.whether);
            setInputData('inspector_name', res.results.writer)
            setInputData('test_reason', res.results.response_description)

        }
    }, [inputData])

    const onClickRegister = useCallback(async () => {

        if (inputData.inspector_name === '') {
            alert("검사자 이름를 작성해주세요.")
            return
        } else if (inputData.whether === '') {
            alert('적격 여부를 선택해 주세요.')
            return
        } else if (inputData.test_reason === '') {
            alert('검사 내용을 작성해 주세요.')
            return
        } else if (inputData.total_count === '') {
            alert("총 완료개수가 없습니다.")
            return
        } else if (inputData.defective_count === '') {
            alert("적격 개수가 없습니다.")
            return
        } else if (inputData.none_defective_count === '') {
            alert("부적격 개수가 없습니다.")
            return
        }

        // if (inputData.defective_count === '' || inputData.none_defective_count === '' || inputData.test_reason === '' || inputData.inspector_name === '' || inputData.whether === '') {
        //     alert("공백을 채워주세요")
        //     return;
        // }

        const tempUrl = `${API_URLS['response'].register}`

        const res = await postQualityRequestDetail(tempUrl, {
            request_pk: match.params.pk,
            eligible: Number(inputData.defective_count),
            ineligible: Number(inputData.none_defective_count),
            response_description: inputData.test_reason,
            writer: inputData.inspector_name,
            whether: inputData.whether
        });

        if (res.status === 200) {
            alert("성공적으로 검수 완료하였습니다!")
            history.push('/quality/test/list')
        }

    }, [inputData])

    const onClickModify = useCallback(async () => {

        if (inputData.inspector_name === '' || inputData.total_count === '' || inputData.defective_count === '' || inputData.none_defective_count === '' || inputData.whether === '' || inputData.test_reason === '') {
            alert("공백을 채워주세요")
            return;
        }

        const tempUrl = `${API_URLS['response'].update}`

        const res = await postQualityRequestDetail(tempUrl, {
            request_pk: match.params.pk,
            writer: inputData.inspector_name,
            amount: inputData.total_count,
            eligible: inputData.defective_count,
            ineligible: inputData.none_defective_count,
            whether: inputData.whether,
            response_description: inputData.test_reason
        });

        if (res.status === 200) {
            alert("성공적으로 수정하였습니다!")
            history.push('/quality/test/complete')
        }

    }, [inputData])


    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{
                        fontSize: 20,
                        marginRight: 18,
                        marginLeft: 3,
                        fontWeight: "bold"
                    }}>{isDetail === "Inspection" ? "제품 검사 요청 정보" : (isDetail === 'Worker' ? '제품 검사 내용 보기' : '제품 검사 내용 보기')}</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
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
                            <td><input value={inputData.material_name} placeholder="품목명"
                                       onChange={(e) => setInputData('material_name', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 요청 시간</td>
                            <td><input value={inputData.request_time} placeholder="요청 시간"
                                       onChange={(e) => setInputData('request_time', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 검사 요청 내용</td>
                            <td>
                                <textarea maxLength={120} value={inputData.request_reason}
                                          onChange={(e) => setInputData('request_reason', e.target.value)} style={{
                                    border: '1px solid #b3b3b3',
                                    fontSize: 14,
                                    padding: 12,
                                    height: '70px',
                                    width: '95%',
                                    resize: 'none'
                                }} placeholder="내용을 입력해주세요 (80자 미만)" disabled>
                                    {inputData.request_reason}
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>• 총 완료 개수</td>
                            <td><Input placeholder="총 완료 개수를 입력해주세요" type={'number'} value={inputData.total_count}
                                       onChange={(e) => {
                                           setInputData('total_count', e.target.value);
                                           setInputData('none_defective_count', '');
                                           setInputData('defective_count', e.target.value);
                                       }} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 적격 개수</td>
                            <td><input value={inputData.defective_count} placeholder="적격 개수" type="number"
                                       onChange={(e) => setInputData('defective_count', e.target.value)} disabled/></td>
                        </tr>
                        <tr>
                            <td>• 부적격 개수</td>
                            <td><input value={inputData.none_defective_count} placeholder="부적격 개수" type="number"
                                       onChange={(e) => {
                                           if (Number(e.target.value) <= Number(inputData.total_count)) {
                                               setInputData('none_defective_count', e.target.value);
                                               setInputData('defective_count', inputData.total_count - Number(e.target.value));
                                           }
                                       }} disabled={isDetail === 'Worker'}/></td>
                        </tr>
                        <tr>
                            <td>• 적격 여부</td>
                            <td><RegisterDropdown type={'string'}
                                                  onClickEvent={(e: string) => isDetail === 'Worker' || setInputData('whether', e)}
                                                  select={inputData.whether}
                                                  contents={isDetail === 'Worker' ? [] : ['적격', '부적격']}
                                                  text={'적격 여부를 선택해 주세요.'}/></td>
                        </tr>
                        <tr>
                            <td>• 검사자</td>
                            <td><input value={inputData.inspector_name} placeholder="검사자"
                                       onChange={(e) => setInputData('inspector_name', e.target.value)}
                                       disabled={isDetail === 'Worker'}/></td>
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
                                        width: '96%',
                                        resize: 'none'
                                    }} placeholder="내용을 입력해주세요 (80자 미만)" disabled={isDetail === 'Worker'}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style={{marginTop: 42, paddingBottom: 42}}>
                    {isDetail === 'Inspection' ?
                        <>
                            <TestButton onClick={() => onClickRegister()}>
                                <div>
                                    <p style={{fontSize: 18}}>검수 완료</p>
                                </div>
                            </TestButton>

                            <ButtonWrap onClick={() => history.goBack()}>
                                <div>
                                    <p style={{fontSize: 18}}>취소하기</p>
                                </div>
                            </ButtonWrap>
                        </>
                        :
                        (isDetail === 'Worker' ?
                                <ButtonWrap onClick={() => history.goBack()}>
                                    <div>
                                        <p style={{fontSize: 18}}>리스트 보기</p>
                                    </div>
                                </ButtonWrap>
                                :
                                <>
                                    <TestButton onClick={() => onClickModify()}>
                                        <div>
                                            <p style={{fontSize: 18}}>수정하기</p>
                                        </div>
                                    </TestButton>

                                    <ButtonWrap onClick={() => history.goBack()}>
                                        <div>
                                            <p style={{fontSize: 18}}>리스트 보기</p>
                                        </div>
                                    </ButtonWrap>
                                </>
                        )
                    }
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


export default QualityTestRequestInspectorContainer
