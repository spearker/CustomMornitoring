import React from 'react'
import Styled from 'styled-components'
import PressStatusBox from './PressStatusBox'
import {changeStatusToColor, changeStatusToString} from '../../../Common/statusFunctions'
import autoCustomType from '../../../AutoCustomSetting/autoCustomConfig'

interface Props {
  machineData: {
    pk: string
    name: string
    material_name: string
    operation: number
    spm: number
    ETC: string
    preset_limit_counter: number
    preset_counter: number
    total_counter: number
    runtime: string
    downtime: string
    percent: number
    material_spec_H: string | number
    material_spec_W: string | number
    material_spec_D: string | number
    mold_name: string
    keyCam: string
    production: number
    load_factor: number
    cavity: number
    error: string
    loadton_value: number
    capacity: number
  }
}


const PressBox: React.FunctionComponent<Props> = ({machineData}) => {
  const AddComma = (num) => {
    let tmpNum = num.toString().split('.')
    let regexp = /\B(?=(\d{3})+(?!\d))/g
    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
  }

  return (
    <BoxContainer>
      <div style={{display: 'flex'}}>
        <MachineName>기계명 - {machineData.name}</MachineName>
        <MaterialName>생산품목 - {machineData.material_name}</MaterialName>
      </div>
      <div style={{display: 'flex'}}>
        <StatusBox style={{backgroundColor: changeStatusToColor(machineData.operation)}}>
          <p style={{
            textAlign: 'center',
            color: (machineData.operation === -1 && autoCustomType() === 'jaeil_js_trans') ? 'white' : 'black'
          }}>{changeStatusToString(machineData.operation) === '계획정지' ?
            <p>계획<br/>정지</p> : changeStatusToString(machineData.operation)}</p>
        </StatusBox>
        <div style={{width: '770px', height: '200px', display: 'flex', flexWrap: 'wrap',}}>
          <PressStatusBox title={'SPM'} value={machineData.spm} fontSize={'38px'}/>
          <PressStatusBox title={'프리셋 카운터'} align={'center'}
                          value={autoCustomType() !== 'DS_trans' ? AddComma(machineData.preset_counter) + '\n/' + ` ${AddComma(machineData.preset_limit_counter)}` : AddComma(machineData.preset_counter)}
                          fontSize={'20px'}/>
          <PressStatusBox title={'종합 카운터'}
                          value={AddComma(machineData.total_counter)}
                          fontSize={'22px'}/>
          <PressStatusBox title={'가동시간'} value={machineData.runtime} fontSize={'22px'}/>
          <PressStatusBox title={'비가동시간'} value={machineData.downtime} fontSize={'22px'}/>
          <PressStatusBox title={'기계가동율'} value={`${machineData.percent}%`} fontSize={'30px'}/>
          {autoCustomType() !== 'DS_trans' ?
            <>
              <PressStatusBox title={'금형명'} value={machineData.mold_name} fontSize={'14px'}/>
              <PressStatusBox title={'생산 남은 시간'} value={machineData.ETC === '-1' ? '∞' : machineData.ETC}
                              fontSize={'22px'}/>
            </>
            :
            <>
              <PressStatusBox title={'제품 규격'} value={''} fontSize={'12px'}
                              mold_spec={[machineData.material_spec_H, machineData.material_spec_W, machineData.material_spec_D]}/>
              <PressStatusBox title={'금형명'} value={machineData.mold_name} fontSize={'14px'}/>
            </>
          }
          <PressStatusBox title={'키캠상태'} value={machineData.keyCam}
                          fontSize={machineData.keyCam === '안전 1행정' || machineData.keyCam === '슬라이드 조절' ? '15px' : '38px'}/>
          <PressStatusBox title={'생산수량'}
                          value={AddComma(machineData.production)}
                          fontSize={'22px'}/>
          <PressStatusBox title={'부하율'} value={`${machineData.loadton_value} / ${machineData.capacity}`}
                          fontSize={'30px'}
                          titleColor={'#000000'}
                          valueColor={machineData.load_factor === 0 ? '#fff' : (machineData.load_factor < 50 ? '#fff' : (machineData.load_factor < 80 ? 'green' : 'red'))}/>
          <PressStatusBox title={'캐비티'} value={machineData.cavity} fontSize={'38px'}/>
        </div>
      </div>
      <ErrorMessage>{machineData.error === null || machineData.error === '' ? '' : `에러 - ${machineData.error}`}</ErrorMessage>
    </BoxContainer>
  )
}

const BoxContainer = Styled.div`
  margin: 0 16px 16px 0;
  width: 904px;
  min-height: 266px;
  max-height: auto;
  border-radius: 6px;
  background-color: #11131950;
  padding: 8px;
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
