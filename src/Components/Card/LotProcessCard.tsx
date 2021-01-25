import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB} from '../../Common/configset'
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'
import IC_UP from '../../Assets/Images/ic_monitoring_close.png'
import IC_DOWN from '../../Assets/Images/ic_monitoring_open.png'
import {changeStatusToColor, changeStatusToString} from '../../Common/statusFunctions'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import next from '../../Assets/Images/ic_next_process.png'
import IC_Dropdown from "../../Assets/Images/ic_dropdown_gray.png"
import IC_Dropup from "../../Assets/Images/ic_dropup_gray.png"

// 임시로 작성
interface Props {
  contents: {
    pk: string, // 세분화 공정 pk (String),
    state: string,
    name: string, // 세분화 공정명 (String),
    process: Process[]
  }
}

interface Process {
  ing: boolean,
  state: string,
  process_name: string, // 공정명 (String),
  machine_name: string, // 기계명 (String),
  mold_name: string, // 금형명 (String),
  input_material: Material[], // 금형 투입 품목명 (String),
  output_material: Material[] // 금형 생산 품목명 (String)
}

interface Material {
  material_pk: string, // 품목 pk (string),
  material_name: string, // 품목명 (string),
  material_type: string, // 품목타입 (number),
  count: string,// BOM (number)
}

const StateBox = ({text, size}:{text:string, size:'big'|'small'}) => {
  
  const color = () => {
    switch (text) {
      case '완료':
        return '#5CD1E5'
      case '중지':
        return '#ff461a'
      case '생산중':
      case '진행중':
        return '#70ff17'
      case '대기':
        return '#b3b3b3'
      default:
        return '#000'
    }
  }

  return(
    <>
      {
        size === 'big'
        ? <div style={{color: color(), fontSize: 18, padding: '2px 3px', marginRight: 5}}>
          {text}
        </div>
        : <div style={{float: 'right', fontSize: 12, padding: '2px 3px'}}>
          <Dot style={{backgroundColor: color()}} />
          {text}
        </div>
      }
    </>
  )
}

const MaterialListBox = ({process, title}:{process:Process, title:string}) => {
  const {ing, process_name, machine_name, mold_name, input_material, output_material} = process;
  const [open, setOpen] = useState<boolean>(false);

  const data = title === '투입자재' ? input_material : output_material;
    
  return(
    <MaterialBox>
      <div>
        <p>{title}</p>
        <button onClick={()=>setOpen(!open)}>{open ? '접기' : '펼치기'}</button>
      </div>
      <div>
        {
          open 
          ? <>
            {
              data.map((inputData, index) => (
                <p key={`${inputData.material_name}${index}`}>
                    {inputData.material_name} {inputData.count}{inputData.material_type === '0' ? 'kg' : '개'}{index !== data.length-1 && ','}
                </p>
              ))
            }
          </>
          : <p>{data[0].material_name} {data[0].count}{data[0].material_type === '0' ? 'kg' : '개'}{data.length > 1 && `외 ${data.length - 1}가지`}</p> 
        }
      </div>
    </MaterialBox>
  )
}

// LOT 카드
const LotProcessCard = ({contents}: Props) => {

  const {pk, state, name, process} = contents;

  const [open, setOpen] = useState<boolean>(true);


  return (
    <Box style={{height: open ? 'auto' : 50}}>
      <div>
        <div style={{display: 'flex'}}>
          <StateBox text={state} size={'big'} />
          <p>{name}</p>
        </div>
        <img 
          alt="arrow" 
          src={open ? IC_Dropup : IC_Dropdown} 
          onClick={() => setOpen(!open)} />
      </div>
      <div>
        {
          process.map((processData, index) => {
            const {ing, state, process_name, machine_name, mold_name, input_material, output_material} = processData;

            return (
              <>
                <ProcessBox key={`${process_name}${index}`} style={{backgroundColor: ing ? '#fff' : 'rgb(53, 59, 72)', color: ing ? '#000' : '#fff', boxShadow: ing ? 'rgba(255, 255, 255, 0.57) 0px 3px 4px 0px' : 'rgba(255, 255, 255, 0.27) 0px 3px 4px 0px', border: `1px solid ${ing ? '#fff' : 'rgb(75, 75, 75)'}`}}>
                  <StateBox text={state} size={'small'} />
                  <p style={{borderBottom: `1px solid ${ing ? 'rgb(75, 75, 75)' : 'rgb(175,175,175)'}`}}>{process_name}</p>
                  <div>
                    <p>기계: {machine_name ? machine_name : ''}</p>
                    <p>금형: {mold_name ? mold_name : ''}</p>
                    <MaterialListBox process={processData} title={'투입자재'} />
                    <MaterialListBox process={processData} title={'생산자재'} />
                  </div>
                  <MaterialBox>
                    <div>
                      <p>생산현황</p>
                    </div>
                    <div>
                      <span>생산량: </span>
                      <br/>
                      <span>불량: </span>
                    </div>
                  </MaterialBox>
                </ProcessBox>
                {process.length > 1 && index !== process.length-1 && <img alt="next" src={next} />}
              </>
            )
          })
        }
      </div>
    </Box>
  )
}

const Box = Styled.div`
  width: 100%;
  padding: 8px;
  overflow: hidden;
  border-radius: 6px;
  color: white;
  background-color: rgba(17, 19, 25, 0.314);
  box-sizing: border-box;
  *{
    box-sizing: border-box;
    word-break: keep-all;
  }
  &>div{
    width: 100%;
    padding: 0px 5px 8px 5px;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    font-size: 14px;
    &>img{
      width: 47px;
      height: 17px;
      margin: 0 14px;
    }
    &:first-child{
      padding: 5px 5px 8px 5px;
      font-size: 20px;
      border-bottom: 2px solid #ffffff20;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &>img{
        cursor: pointer;
        width: 30px;
        margin: 0;
        /* transition: transform 0.5s ease-in-out; */
      }
    }
  }
`

const ProcessBox = Styled.div`
  width: 160px;
  padding: 5px;
  margin-top: 15px;
  background-color: rgb(53, 59, 72);
  box-shadow: rgba(255, 255, 255, 0.27) 0px 3px 4px 0px;
  border: 1px solid rgb(75, 75, 75);
  border-radius: 6px;
  &>p{
    padding: 3px 0;
  }
`

const MaterialBox = Styled.div`
  &>div{
    &:first-child{
      padding: 2px 3px;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: bold;
      button{
        font-size: 10px;
        background-color: #00000025;
        border-radius: 5px;
        padding: 1px 3px;
      }
    }
    &:nth-child(2){
      background-color: rgba(73,79,92,0.7);
      color: #fff;
      padding: 2px;
      font-size: 11px;
    }
  }
`

const Dot = Styled.div`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-right: 2px;
`

export default LotProcessCard
