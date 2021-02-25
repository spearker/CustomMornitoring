import React, {useState} from 'react'
import styled from 'styled-components'
import {BG_COLOR_SUB, BG_COLOR_SUB3, POINT_COLOR} from '../../../Common/configset'
import {dummyData} from "../CustomMonitoring";

const dummy = [
  {key: 'spm', value: 'SPM'},
  {key: 'preset_counter', value: '프리셋 카운터'},
  {key: 'total_counter', value: '종합 카운터'},
  {key: 'runtime', value: '기계 가동시간'},
  {key: 'downtime', value: '기계 비가동시간'},
  {key: 'keyCam', value: '키캠상태'},
  {key: 'cavity', value: '캐비티'},
  {key: 'percent', value: '기계 가동률'},
]

interface IProps {
  datas: { key: string, value: string }[]
  setDatas: (datas: { key: string, value: string }[]) => void
  list: any[]
  setList: (value:any[]) => void
}

const SeleteMenuBox = ({datas, setDatas, list, setList}: IProps) => {
  const [keys, setKeys] = useState<String[]>([])

  React.useEffect(() => {
    console.log(keys)
    console.log(list)
  }, [keys])

  return (
    <SelectBox>
      <p style={{color:"white", fontSize:"1.2em", fontWeight:"bold", marginLeft:"10px", paddingBottom:"10px"}}>선택</p>
      <div style={{
        flexWrap: 'wrap',
        display: 'flex',
      }}>
        {
          dummy.map((v, i) => {
            return <ItemBox onClick={() => {
              let tmpArray = keys
              let tmpData = datas


              if (tmpArray.indexOf(v.key) === -1) {
                tmpData = [...tmpData, v]
                list.map((value, index)=>{
                  value[v.key] = dummyData[index][v.key];
                  console.log(dummyData[index][v.key])
                })
              } else {
                tmpData.splice(tmpArray.indexOf(v.key), 1)
                list.map((value)=>{
                  value[v.key] = null;
                })
              }

              if (tmpArray.indexOf(v.key) === -1) {
                tmpArray = [...tmpArray, v.key]
              } else {
                tmpArray.splice(tmpArray.indexOf(v.key), 1)
              }

              setDatas([...tmpData])
              setKeys([...tmpArray])
            }} style={{backgroundColor: keys.indexOf(v.key) !== -1 ? POINT_COLOR : undefined}}>
              <p style={{fontSize: v.value.length > 6 ? "20px" : "25px"}}>{v.value}</p>
            </ItemBox>
          })
        }
      </div>
    </SelectBox>
  )
}

const SelectBox = styled.div`
  width: 285px;
  height: 780px;
  background-color: ${BG_COLOR_SUB3};
  border-radius: 15px;
  padding: 10px 7.5px
`

const ItemBox = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 15px;
  background-color: ${BG_COLOR_SUB};
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #b3b3b3;
  }
  p {
    color: ghostwhite;
    font-size: 24px;
  }
`

export default SeleteMenuBox
