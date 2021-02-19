import React, { useState } from 'react'
import Styled from 'styled-components'
import next from '../../Assets/Images/ic_next_process.png'
import IC_Dropdown from "../../Assets/Images/ic_dropdown_gray.png"
import IC_Dropup from "../../Assets/Images/ic_dropup_gray.png"
import IC_Blue_Arrow1 from "../../Assets/Images/bl_00.png"
import ReactTooltip from 'react-tooltip'

interface Props {
  contents: {
    material_info:{
      material_name: string, 
      material_lot: string
    }[],
    processes: Processes[]
  }
}

interface Processes {
  process_pk: string,
  process_name: string, 
  production_status: string[],
  machine_info: MachineInfo[]
}

interface MachineInfo {
  segment_pk: string,
  machine_name: string,
  mold_name: string
  input: {
    name: string,
    count: string,
    type: string
  }[],
  output: {
    name: string,
    count: string,
    type: string
  }[]
}

const StateBox = ({status, size}:{status:boolean, size:'big'|'small'}) => {
  
  const color = () => {
    switch (status) {
      case true:
        return '#70ff17'
      default:
        return '#fff200'
    }
  }

  const text = () => {
    switch (status) {
      case true:
        return size === 'small' ? '생산중' : '진행중'
      default:
        return '대기'
    }
  }

  return(
    <>
      {
        size === 'big'
        ? <div style={{color: color(), fontSize: 18, padding: '2px 3px', marginRight: 5}}>
          {text()}
        </div>
        : <div style={{float: 'right', fontSize: 12, padding: '2px 3px'}} className={text() === '생산중' ? 'textLoading' : ''}>
          <Dot style={{backgroundColor: color()}} />
          {text()}
        </div>
      }
    </>
  )
}

const MaterialListBox = ({item, title}:{item:{name: string, count: string, type: string}[], title:string}) => {
  const [open, setOpen] = useState<boolean>(false);
 
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
              item.map((inputData, index) => (
                <p key={`${inputData.name}${index}`} style={{overflow: 'unset', whiteSpace: 'pre-wrap'}}>
                    {inputData.name} {inputData.count}{inputData.type === '0' ? 'kg' : '개'}{index !== item.length-1 && ','}
                </p>
              ))
            }
          </>
          : <p>{item[0].name} {item[0].count}{item[0].type === '0' ? 'kg' : '개'}{item.length > 1 && `외 ${item.length - 1}가지`}</p> 
        }
      </div>
    </MaterialBox>
  )
}

const onEventTitleList = (list:{ material_name: string, material_lot: string }[]) => {
  return list.map((material, index) => (
    `${material.material_name}(${material.material_lot})${index !== list.length-1 ? ', ' : ''}`
  ))
}

// LOT 카드
const LotProcessCard = ({contents}: Props) => {

  const {material_info, processes} = contents;

  const [open, setOpen] = useState<boolean>(true);

  return (
    <Box style={{height: open ? 'auto' : 50}}>
      <div>
        <div style={{display: 'flex'}}>
          <StateBox status={true} size={'big'} />
          <p>{onEventTitleList(material_info)}</p>
        </div>
        <img 
          alt="arrow" 
          src={open ? IC_Dropup : IC_Dropdown} 
          onClick={() => setOpen(!open)} />
      </div>
      <div>
        {
          processes.map((processData:Processes, index:number) => {
            const {process_pk, process_name, production_status, machine_info} = processData;
            const ing = production_status.length === 0 ? false : true;

            return (
              <>
                <ProcessBox 
                  key={`${process_name}${index}`} 
                  className={ing && machine_info.length === 1 ? 'animation' : ''} 
                  style={{
                    backgroundColor: ing ? '#fff' : 'rgb(53, 59, 72)', 
                    color: ing ? '#000' : '#fff', 
                    boxShadow: ing ? 'rgba(255, 255, 255, 0.57) 0px 3px 4px 0px' : 'rgba(255, 255, 255, 0.27) 0px 3px 4px 0px', 
                    border: `1px solid ${ing ? '#fff' : 'rgb(75, 75, 75)'}`,
                    width: machine_info.length === 1 ? 160 : 'auto',
                    maxWidth: 500
                  }}>
                  <StateBox status={ing} size={'small'} />
                  <p style={{borderBottom: `1px solid ${ing ? 'rgb(75, 75, 75)' : 'rgb(175,175,175)'}`, overflow: 'unset'}}>{process_name}</p>
                    {
                      machine_info.length === 1 ?
                      <>
                        {
                          machine_info.map((info:MachineInfo, info_index:number) => {
                            const {machine_name, mold_name, input, output} = info;

                            return(
                              <div key={`machine${process_pk}${info_index}`}>
                                <p data-for={`machine_${process_pk}`}
                                    data-tip={machine_name}
                                    data-iscapture="true">기계: {machine_name ? machine_name : ''}</p>
                                <p data-for={`machine_${process_pk}`}
                                    data-tip={mold_name}
                                    data-iscapture="true">금형: {mold_name ? mold_name : ''}</p>
                                <MaterialListBox item={input} title={'투입품목'} />
                                <MaterialListBox item={output} title={'생산품목'} />
                                <ReactTooltip
                                  id={`machine_${process_pk}`}
                                  multiline={true}
                                />
                                <ReactTooltip
                                  id={`mold_${process_pk}`}
                                  multiline={true}
                                />
                              </div>
                            )
                          })
                        }
                      </>
                      : <LineContainer>
                        {
                          machine_info.map((info:MachineInfo, info_index:number) => {
                            const {segment_pk, machine_name, mold_name, input, output} = info;

                            return(
                              <>
                             
                                <LineBox key={`machine${process_pk}${info_index}`}className={production_status.filter(f => f === segment_pk).length > 0 ? 'animation' : ''}  style={{backgroundColor: ing ? '#0f172250' : '#ffffff50'}}>
                                  <p style={{textAlign: 'left'}}><Dot style={{backgroundColor: production_status.filter(f => f === segment_pk).length > 0 ? '#5CD1E5' : '#fff200'}} />{production_status.filter(f => f === segment_pk).length > 0 ? '생산중' : '대기'}</p>
                                  <p data-for={`machine_${process_pk}`}
                                    data-tip={machine_name}
                                    data-iscapture="true">기계: {machine_name}</p>
                                  <p data-for={`machine_${process_pk}`}
                                    data-tip={mold_name}
                                    data-iscapture="true">금형: {mold_name}</p>
                                  <MaterialListBox item={input} title={'투입품목'} />
                                  <MaterialListBox item={output} title={'생산품목'} />
                                </LineBox>
                                
                                <ReactTooltip
                                  id={`machine_${process_pk}`}
                                  multiline={true}
                                />
                                <ReactTooltip
                                  id={`mold_${process_pk}`}
                                  multiline={true}
                                />
                                {machine_info.length > 1 && info_index !== machine_info.length-1 && <ArrowImg><img alt="arrow" src={next} /></ArrowImg>}
                              </>
                            )
                          })
                        }
                      </LineContainer>
                    }
                </ProcessBox>
                {processes.length > 1 
                && index !== processes.length-1 
                && <div 
                  className={ing ? "imgChange" : ''}
                  style={{                  
                    width: 56,
                    height: 27,
                    margin: '0 14px',
                    backgroundImage: `url(${IC_Blue_Arrow1})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }} />}
              </>
            )
          })
        }
      </div>
    </Box>
  )
}

const ArrowImg = Styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 10px;
  overflow: hidden;
  width: 10px;
`

const LineContainer = Styled.div`
  width: 100%;
  padding: 3px 5px;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`

const LineBox = Styled.div`
  background-color: #ffffff50;
  padding: 3px;
  border-radius: 5px;
  margin-top: 5px;
  width: 139px;
`

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
      }
    }
  }
`

const ProcessBox = Styled.div`
  padding: 5px;
  margin-top: 15px;
  background-color: rgb(53, 59, 72);
  box-shadow: rgba(255, 255, 255, 0.27) 0px 3px 4px 0px;
  border: 1px solid rgb(75, 75, 75);
  border-radius: 6px;
  &>p{
    padding: 3px 0;
  }
  p{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-wrap: normal;
    overflow: hidden;
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
