import React, {useCallback, useEffect, useState} from 'react'
import {Input} from 'semantic-ui-react'
import ProjectPlanPickerModal from '../../Components/Modal/ProjectPlanPickerModal'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import ProcessPickerModal from '../../Components/Modal/ProcessPickerModal'
import MachinePickerModal from '../../Components/Modal/MachinePickerModal'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import moment from 'moment'
import {API_URLS, postQualityRegister, postQualityRequestDetail} from '../../Api/mes/quality'
import {useHistory} from 'react-router-dom'
import {getProjectList} from '../../Api/mes/production'
import MemeberPickerModal from '../../Components/Modal/MemberPickerModal'
import HistoryPickerModal from '../../Components/Modal/HistoryPickerModal'

const nowTime = moment().format('YYYY-MM-DD hh:mm:ss')

interface Props {
    match: any;
    // chilren: string;
}

const QualityTestRequest = ({match}: Props) => {
    const history = useHistory()
    const [historyData, setHistoryData] = useState<{ pk: string, name: string }>({pk: '', name: ''})
    const [processData, setProcessData] = useState<{ pk: string, name: string }>({pk: '', name: ''})
    const [machineData, setMachineData] = useState<{ pk: string | null, name: string | null }>({pk: '', name: ''})
    const [productionData, setProductionData] = useState<{ pk: string, name: string }>({pk: '', name: ''})
    const [total_count, setTotal_count] = useState<string>('')
    const [reason, setReason] = useState<string>('')
    const [worker, setWorker] = useState<{ pk: string, name: string }>({pk: '', name: ''})
    const [statement, setStatement] = useState<string>('')
    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    useEffect(() => {
        if (match.params.pk) {
            // alert(`수정 페이지 진입 - pk :` + match.params.pk)
            setIsUpdate(true)
            getData()
        }

    }, [])

    const getData = useCallback(async () => {
        const tempUrl = match.params.type !== 'status' ? `${API_URLS['request'].detail}` : `${API_URLS['status'].detail}`
        const res = await postQualityRequestDetail(tempUrl, {
            request_pk: match.params.pk
        })

        if (res.status === 200) {
            setProcessData({pk: res.results.process_pk, name: res.results.process_name})
            setMachineData({pk: res.results.machine_pk, name: res.results.machine_name})
            setProductionData({pk: res.results.material_pk, name: res.results.material_name})
            setTotal_count(res.results.amount)
            if (match.params.type !== 'status') {
                setReason(res.results.description)
            } else {
                setReason(res.results.request_description)
            }
            setWorker({pk: res.results.worker_pk, name: res.results.worker})
            setStatement(res.results.statement)
        }

    }, [processData, machineData, productionData, total_count, reason, worker])


    const postQualityRegisterData = useCallback(async () => {

        if (processData.pk === '' || processData.pk === undefined) {
            alert('작업이력은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (machineData.pk === '' || machineData.pk === undefined) {
            alert('기계명은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (productionData.pk === '' || productionData.pk === undefined) {
            alert('품목(품목명)은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (total_count === '') {
            alert('총 완료 개수는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (reason === '') {
            alert('요청 내용은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (worker.pk === '') {
            alert('작업자는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const tempUrl = `${API_URLS['request'].register}`
        const resultData = await postQualityRegister(tempUrl, {
            process_pk: processData.pk,
            machine_pk: machineData.pk,
            material_pk: productionData.pk,
            amount: Number(total_count),
            description: reason,
            worker: worker.pk
        })

        if (resultData.status === 200) {
            history.push('/quality/test/list/worker')
        }
    }, [processData, machineData, productionData, total_count, reason, worker])

    const onClickModify = useCallback(async () => {
        if (processData.pk === '' || processData.pk === undefined) {
            alert('작업이력은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (machineData.pk === '' || machineData.pk === undefined) {
            alert('기계명은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (productionData.pk === '' || productionData.pk === undefined) {
            alert('품목(품목명)은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (total_count === '') {
            alert('총 완료 개수는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (reason === '') {
            alert('요청 내용은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (worker.pk === '') {
            alert('작업자는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }


        const tempUrl = `${API_URLS['request'].update}`
        const res = await postQualityRegister(tempUrl, {
            request_pk: match.params.pk,
            statement: statement,
            amount: Number(total_count),
            description: reason,
            worker: worker.pk
        })
        if (res.status === 200) {
            history.push('/quality/test/list/worker')
        } else if (res.status === 1001) {
            alert('이미 검사를 완료한 제품 검사요청입니다.')
            history.push('/quality/test/complete/worker')
        }

    }, [match.params.pk, statement, total_count, reason, worker])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold'}}>제품 검사 요청 정보</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: 'black'}}>
                        <tr>
                            <td>• 작업이력</td>
                            <td>
                                {
                                    isUpdate ?
                                        <input value={processData.name}
                                               style={{textAlign: 'left', fontSize: '15px', fontWeight: 'bold'}}
                                               disabled/>
                                        :
                                        <HistoryPickerModal select={historyData} onClickEvent={(e) => {
                                            setHistoryData({name: e.process_name, pk: e.pk})
                                            setProcessData({name: e.process_name, pk: e.process_pk})
                                            setMachineData({name: e.machine_name, pk: e.machine_pk})
                                            setProductionData({name: e.material_name, pk: e.material_pk})
                                            setWorker({name: e.worker_name, pk: e.worker})
                                            setTotal_count(e.amount)
                                        }}
                                                            isAllItem
                                                            text={'작업이력을 입력해주세요.'} buttonWid={30}/>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>• 기계명</td>
                            <td>
                                {/*{*/}
                                {/*    isUpdate ?*/}
                                <input value={machineData.name === null ? '' : machineData.name}
                                       placeholder={'작업 이력을 선택하시면 값이 자동으로 입력됩니다.'}
                                       style={{textAlign: 'left', fontSize: '15px', fontWeight: 'bold'}}
                                       disabled/>
                                {/*        :*/}
                                {/*        <MachinePickerModal select={machineData} onClickEvent={(e) => setMachineData(e)}*/}
                                {/*                            disabled*/}
                                {/*                            text={'기계명을 입력해주세요.'} buttonWid={30}/>*/}
                                {/*}*/}
                            </td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td>
                                {/*{*/}
                                {/*    isUpdate ?*/}
                                <input value={productionData.name}
                                       placeholder={'작업 이력을 선택하시면 값이 자동으로 입력됩니다.'}
                                       style={{textAlign: 'left', fontSize: '15px', fontWeight: 'bold'}}
                                       disabled/>
                                {/*        : <ProductionPickerModal select={productionData}*/}
                                {/*                                 disabled*/}
                                {/*                                 type={-1}*/}
                                {/*                                 onClickEvent={(e) => null}*/}
                                {/*                                 text={'품목을 입력해주세요.'} buttonWid={30}/>*/}
                                {/*}*/}
                            </td>
                        </tr>
                        <tr>
                            <td>• 총 완료 개수</td>
                            <td><Input placeholder={'작업 이력을 선택하시면 값이 자동으로 입력됩니다.'} type={'number'} value={total_count}
                                       onChange={(e) => setTotal_count(e.target.value)}
                                       disabled/></td>
                        </tr>
                        <tr>
                            <td>• 요청 내용</td>
                            <td>
                                <textarea maxLength={120} value={reason} onChange={(e) => setReason(e.target.value)}
                                          style={{
                                              border: '1px solid #b3b3b3',
                                              fontSize: 14,
                                              padding: 12,
                                              height: '70px',
                                              width: '97%',
                                              resize: 'none'
                                          }} placeholder="내용을 입력해주세요 (80자 미만)"
                                          disabled={match.params.type !== 'status' ? false : true}

                                >
                                    {reason}
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>• 작업자</td>
                            <td>
                                <input value={worker.name}
                                       placeholder={'작업 이력을 선택하시면 값이 자동으로 입력됩니다.'}
                                       style={{textAlign: 'left', fontSize: '15px', fontWeight: 'bold'}}
                                       disabled/>
                                {/*<MemeberPickerModal onClickEvent={(e) => setWorker(e)}*/}
                                {/*                    disabled*/}
                                {/*                    text={'작업자를 선택해 주세요'} select={worker}/>*/}
                            </td>
                        </tr>

                    </table>
                </div>
                {
                    isUpdate ?
                        match.params.type !== 'status' ?
                            <div style={{marginTop: 42, paddingBottom: 42}}>
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
                            </div>
                            :
                            <div style={{marginTop: 42, paddingBottom: 42}}>
                                <ButtonWrap onClick={() => history.goBack()}>
                                    <div>
                                        <p style={{fontSize: 18}}>리스트 보기</p>
                                    </div>
                                </ButtonWrap>
                            </div>
                        :
                        <div style={{marginTop: 10, paddingBottom: 20,}}>
                            <ButtonWrap onClick={postQualityRegisterData}>
                                {
                                    <div style={{width: 360, height: 46}}>
                                        <p style={{fontSize: 18, marginTop: 8, paddingRight: 150,}}>검사 요청</p>
                                    </div>
                                }
                            </ButtonWrap>
                        </div>
                }

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
            width: 100%;
            background-color: #f4f6fa;
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

export default QualityTestRequest
