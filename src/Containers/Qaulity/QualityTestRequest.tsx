import React, {useCallback, useState} from 'react'
import {Input} from 'semantic-ui-react'
import ProjectPlanPickerModal from '../../Components/Modal/ProjectPlanPickerModal'
import ColorCalendarDropdown from '../../Components/Dropdown/ColorCalendarDropdown'
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import ProcessPickerModal from '../../Components/Modal/ProcessPickerModal'
import MachinePickerModal from '../../Components/Modal/MachinePickerModal'
import ProductionPickerModal from '../../Components/Modal/ProductionPickerModal'
import moment from 'moment'
import {API_URLS, postQualityRegister} from '../../Api/mes/quality'
import {useHistory} from 'react-router-dom'

const nowTime = moment().format('YYYY-MM-DD hh:mm:ss')

const QualityTestRequest = () => {
    const history = useHistory()
    const [processData, setProcessData] = useState<{pk: string, name: string}>({pk: '', name: ''})
    const [machineData, setMachineData] = useState<{pk: string, name: string}>({pk: '', name: ''})
    const [productionData, setProductionData] = useState<{pk: string, name: string}>({pk: '', name: ''})
    const [totalCount, setTotalCount] = useState<number>(0)
    const [reason, setReason] = useState<string>()
    const [worker, setWorker] = useState<string>('')

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
            history.goBack()
        }
    }, [processData, machineData, productionData, totalCount, reason, worker])

    return(
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>제품 검사 요청</span>
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
                            <td><ProcessPickerModal select={processData} onClickEvent={(e) => setProcessData(e)} text={'공정명을 입력해주세요.'}/></td>
                        </tr>
                        <tr>
                            <td>• 기계명</td>
                            <td><MachinePickerModal select={machineData} onClickEvent={(e) => setMachineData(e)} text={'기계명을 입력해주세요.'}/></td>
                        </tr>
                        <tr>
                            <td>• 품목(품목명)</td>
                            <td><ProductionPickerModal select={productionData} onClickEvent={(e) => setProductionData(e)} text={'품목을 입력해주세요.'}/></td>
                        </tr>
                        <tr>
                            <td>• 총 완료 개수</td>
                            <td><Input placeholder="총 완료 개수를 입력해주세요" type={'number'} value={totalCount} onChange={(e) => setTotalCount(Number(e.target.value))}/></td>
                        </tr>
                        <tr>
                            <td>• 요청 내용</td>
                            <td>
                                <textarea maxLength={120} value={reason} onChange={(e)=>setReason(e.target.value)} style={{border:'1px solid #b3b3b3', fontSize:14, padding:12, height:'70px', width:'95%'}} placeholder="내용을 입력해주세요 (80자 미만)">
                                    {reason}
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>• 작업자</td>
                            <td><Input value={worker} onChange={(e) => setWorker(e.target.value)}/></td>
                        </tr>

                    </table>
                </div>
                <div style={{marginTop: 180, paddingBottom: 20}}>
                    <ButtonWrap onClick={postQualityRegisterData}>
                        <div style={{width: 360, height: 46}}>
                            <p style={{fontSize: 18, marginTop: 8}}>검수 요청</p>
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
        font-famaily: NotoSansCJKkr-Bold;
        color: #19b8df;
        text-align: left;
    }
    table{
        width: 100%;
        height: 100%;
        margin-top: 35px;
    }
    td{
        font-famaily: NotoSansCJKkr-Bold;
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

export default QualityTestRequest
