import React from "react";
import Styled from "styled-components";
import PressStatusBox from "./PressStatusBox";

interface Props {
    machineData: {
        pk: string
        name: string
        material_name: string
        operation: number
        spm: number
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
    }
}


const PressBox: React.FunctionComponent<Props> = ({machineData}) => {
    return (
        <BoxContainer>
            <div style={{display: 'flex'}}>
                <MachineName>기계명 - {machineData.name}</MachineName>
                <MaterialName>생산품목 - {machineData.material_name}</MaterialName>
            </div>
            <div style={{display: 'flex'}}>
                <StatusBox>
                    <p>{machineData.operation}</p>
                </StatusBox>
                <div style={{width: '770px', height: '200px', display: 'flex', flexWrap: "wrap",}}>
                    <PressStatusBox title={'SPM'} value={machineData.spm} fontSize={'38px'}/>
                    <PressStatusBox title={'프리셋 카운터'}
                                    value={machineData.preset_counter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    fontSize={'22px'}/>
                    <PressStatusBox title={'종합 카운터'}
                                    value={machineData.total_counter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    fontSize={'22px'}/>
                    <PressStatusBox title={'가동시간'} value={machineData.runtime} fontSize={'22px'}/>
                    <PressStatusBox title={'비가동시간'} value={machineData.downtime} fontSize={'22px'}/>
                    <PressStatusBox title={'기계가동율'} value={`${machineData.percent}%`} fontSize={'38px'}/>
                    <PressStatusBox title={'제품 규격'} value={''} fontSize={'12px'}
                                    mold_spec={[machineData.material_spec_H, machineData.material_spec_W, machineData.material_spec_D]}/>
                    <PressStatusBox title={'금형명'} value={machineData.mold_name} fontSize={'14px'}/>
                    <PressStatusBox title={'키캠상태'} value={machineData.keyCam} fontSize={'38px'}/>
                    <PressStatusBox title={'생산수량'} value={machineData.production} fontSize={'22px'}/>
                    <PressStatusBox title={'부하율'} value={`${machineData.load_factor}%`} fontSize={'38px'}/>
                    <PressStatusBox title={'캐비티'} value={machineData.cavity} fontSize={'38px'}/>
                </div>
            </div>
        </BoxContainer>
    )
}

const BoxContainer = Styled.div`
  margin: 0 16px 16px 0;
  width: 904px;
  height: 256px;
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
   background-color: #70ff17;
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


export default PressBox
