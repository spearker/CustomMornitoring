import React from 'react'
import Styled from 'styled-components'
import {changeStatusToColor, changeStatusToString} from '../../../Common/statusFunctions'
import autoCustomType from '../../../AutoCustomSetting/autoCustomConfig'
import PressStatusBox from '../../../Components/Custom/PM_Monitoring/PressStatusBox'

interface Props {
  machineData: {
    pk: string
    name: string
    operation: number
    spm: number
    preset_limit_counter: number
    preset_counter: number
    total_counter: number
    runtime: string
    downtime: string
    percent: number
    mold_name: string
    keyCam: string
    load_factor: number
    cavity: number
    error: string
    loadton_value: number
    capacity: number
  }
}


const PressBox: React.FunctionComponent<Props> = ({machineData}) => {
  const AddComma = (num) => {
    let tmpNum = String(num).split('.')
    let regexp = /\B(?=(\d{3})+(?!\d))/g
    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
  }

  return (
    <BoxContainer>
      <div style={{display: 'flex'}}>
        <MachineName>기계명 - {machineData.name}</MachineName>
        {/*<MaterialName>생산품목 - {machineData.material_name}</MaterialName>*/}
      </div>
      <div style={{display: 'flex'}}>
        <StatusBox style={{backgroundColor: changeStatusToColor(machineData.operation)}}>
          <p style={{
            textAlign: 'center',
            color: (machineData.operation === -1 && autoCustomType() === 'jaeil_js_trans') ? 'white' : 'black'
          }}>{changeStatusToString(machineData.operation) === '계획정지' ?
            <p>계획<br/>정지</p> : changeStatusToString(machineData.operation)}</p>
        </StatusBox>
        <div style={{width: '640px', height: '200px', display: 'flex', flexWrap: 'wrap',}}>
          {machineData.spm && <PressStatusBox title={'SPM'} value={machineData.spm} fontSize={'38px'}/>}
          {machineData.preset_counter && <PressStatusBox title={'프리셋 카운터'} align={'center'}
                                                        value={AddComma(machineData.preset_counter) + '\n/' + ` ${AddComma(machineData.preset_limit_counter)}`}
                                                        fontSize={'20px'}/>}

          {machineData.total_counter && <PressStatusBox title={'종합 카운터'}
                                                       value={AddComma(machineData.total_counter)}
                                                       fontSize={'22px'}/>}
          {machineData.runtime && <PressStatusBox title={'기계 가동시간'} value={machineData.runtime} fontSize={'22px'}/>}
          {machineData.downtime && <PressStatusBox title={'기계 비가동시간'} value={machineData.downtime} fontSize={'22px'}/>}
      {/*    /!*<PressStatusBox title={'금형명'} value={machineData.mold_name} fontSize={'14px'}/>*!/*/}
      {/*    /!*<PressStatusBox title={'생산 남은 시간'} value={machineData.ETC === '-1' ? '∞' : machineData.ETC}*!/*/}
      {/*    /!*                fontSize={'22px'}/>*!/*/}
          {machineData.keyCam && <PressStatusBox title={'키캠상태'} value={machineData.keyCam}
                                                 fontSize={machineData.keyCam === '안전 1행정' || machineData.keyCam === '슬라이드 조절' ? '15px' : '38px'}/>}
      {/*    /!*<PressStatusBox title={'생산수량'}*!/*/}
      {/*    /!*                value={AddComma(machineData.production)}*!/*/}
      {/*    /!*                fontSize={'22px'}/>*!/*/}
      {/*    /!*<PressStatusBox title={'부하율'} value={`${machineData.load_factor}%`}*!/*/}
      {/*    /!*                subValue={`${machineData.loadton_value}/${machineData.capacity}`}*!/*/}
      {/*    /!*                fontSize={'23px'}*!/*/}
      {/*    /!*                align={'center'}*!/*/}
      {/*    /!*                titleColor={'#000000'}*!/*/}
      {/*    /!*                valueColor={machineData.load_factor === 0 ? '#fff' : (machineData.load_factor < 50 ? '#fff' : (machineData.load_factor < 80 ? 'green' : 'red'))}/>*!/*/}
          {machineData.cavity && <PressStatusBox title={'캐비티'} value={machineData.cavity ?? '-'} fontSize={'38px'}/>}
          {machineData.percent && <PressStatusBox title={'기계 가동률'} value={`${machineData.percent}%`} fontSize={'30px'}/>}
        </div>
      </div>
      {/*<ErrorMessage>{!machineData.error || machineData.error === '' ? '' : `에러 - ${machineData.error}`}</ErrorMessage>*/}
    </BoxContainer>
  )
}

const BoxContainer = Styled.div`
  margin: 0 16px 16px 16px;
  width: 630px;
  min-height: 266px;
  max-height: auto;
  border-radius: 6px;
  background-color: #11131950;
  padding: 8px 30px;
   font-weight: bold;
`

const MachineName = Styled.p`
  font-family: NotoSansCJKkr;
  font-size: 20px;
  text-align: left;
  color: #ffffff;
  width: 382px;
`

const MaterialName = Styled.p`
   font-family: NotoSansCJKkr;
  font-size: 20px;
  text-align: left;
  color: #ffffff;
  width: 410px;
`


const StatusBox = Styled.div`
 width: 120px;
  height: 200px;
  border-radius: 6px;
   margin-top: 10px;
   margin-right: 8px;
    justify-content: center;
    display: flex;
    align-items: center;
   align-self:center;
   p{
      font-family: NotoSansCJKkr;
      font-size: 38px;
      font-weight: bold; 
   }
`

const ErrorMessage = Styled.p`
  padding-top: 8px;
  font-family: NotoSansCJKkr;
  font-size: 20px;
  text-align: left;
  color: red;
  width: 904px;
`


export default PressBox
