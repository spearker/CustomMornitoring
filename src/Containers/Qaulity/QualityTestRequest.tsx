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

const nowTime = moment().format('YYYY-MM-DD hh:mm:ss')

interface Props {
    match: any;
    // chilren: string;
}

const QualityTestRequest = ({ match }: Props) => {
    const history = useHistory()
    const [processData, setProcessData] = useState<{pk: string, name: string}>({pk: '', name: ''})
    const [machineData, setMachineData] = useState<{pk: string, name: string}>({pk: '', name: ''})
    const [productionData, setProductionData] = useState<{pk: string, name: string}>({pk: '', name: ''})
    const [totalCount, setTotalCount] = useState<number>()
    const [reason, setReason] = useState<string>()
    const [worker, setWorker] = useState<string>('')
    const [statement, setStatement] = useState<string>('')
    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    useEffect(()=>{
        console.log(match.params.pk)
        if( match.params.pk ){
            // alert(`수정 페이지 진입 - pk :` + match.params.pk)
            setIsUpdate(true)
            getData()
        }

    },[])

    const getData = useCallback(async()=>{
        const tempUrl = match.params.type !== 'status' ? `${API_URLS['request'].detail}` : `${API_URLS['status'].detail}`
        const res = await postQualityRequestDetail(tempUrl, {
            requestPk: match.params.pk
        })
    
        if(res.status === 200){
            setProcessData({pk: res.results.processPk, name: res.results.processName})
            setMachineData({pk: res.results.machinePk, name: res.results.machineName})
            setProductionData({pk: res.results.materialPk, name: res.results.materialName})
            setTotalCount(res.results.amount)
            if(match.params.type !== 'status') {
                setReason(res.results.description)
            } else {
                setReason(res.results.requestDescription)
            }
            setWorker(res.results.worker)
            setStatement(res.results.statement)
        }
        
    },[processData, machineData, productionData, totalCount, reason, worker])


    const postQualityRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['request'].register}`
        const resultData = await postQualityRegister(tempUrl, {
            processPk: processData.pk,
            machinePk: machineData.pk,
            materialPk: productionData.pk,
            amount: totalCount,
            description: reason,
            worker: worker
        });

        if(resultData.status === 200){
            alert("성공적으로 등록되었습니다!")
            history.push('/quality/test/list/worker')
        }
    }, [processData, machineData, productionData, totalCount, reason, worker])

    const onClickModify = useCallback( async ()=>{
        const tempUrl = `${API_URLS['request'].update}`
        const res = await postQualityRegister(tempUrl, {
            requestPk: match.params.pk,
            statement: statement,
            amount: totalCount,
            description: reason,
            worker: worker
        });
        if(res.status === 200){
            alert("성공적으로 수정하였습니다!")
            history.push('/quality/test/list/worker')
        }

    }, [match.params.pk, statement, totalCount, reason, worker])

    return(
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 87}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>제품 검사 요청 정보</span>
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
                            <td>
                                {
                                    isUpdate ?
                                        <input value={processData.name} style={{textAlign: 'left', fontSize: '15px', fontWeight: 'bold'}} disabled />
                                    : <ProcessPickerModal select={processData} onClickEvent={(e) => setProcessData(e)} text={'공정명을 입력해주세요.'}/>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>• 기계명</td>
                            <td>
                                {
                                    isUpdate ?
                                        <input value={machineData.name} style={{textAlign: 'left', fontSize: '15px', fontWeight: 'bold'}} disabled />
                                    : <MachinePickerModal select={machineData} onClickEvent={(e) => setMachineData(e)} text={'기계명을 입력해주세요.'}/>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td>
                            {
                                    isUpdate ?
                                        <input value={productionData.name} style={{textAlign: 'left', fontSize: '15px', fontWeight: 'bold'}} disabled />
                                    : <ProductionPickerModal select={productionData} onClickEvent={(e) => setProductionData(e)} text={'품목을 입력해주세요.'}/>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>• 총 완료 개수</td>
                            <td><Input placeholder="총 완료 개수를 입력해주세요" type={'number'} value={totalCount} onChange={(e) => setTotalCount(Number(e.target.value))} disabled={match.params.type !== 'status' ? false : true}/></td>
                        </tr>
                        <tr>
                            <td>• 요청 내용</td>
                            <td>
                                <textarea maxLength={120} value={reason} onChange={(e)=>setReason(e.target.value)} style={{border:'1px solid #b3b3b3', fontSize:14, padding:12, height:'70px', width:'96%'}} placeholder="내용을 입력해주세요 (80자 미만)" disabled={match.params.type !== 'status' ? false : true}>
                                    {reason}
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>• 작업자</td>
                            <td><Input value={worker} onChange={(e) => setWorker(e.target.value)}  disabled={match.params.type !== 'status' ? false : true}/></td>
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
                      <div style={{marginTop: 10, paddingBottom: 20, }}>
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
