import React, {useState} from 'react'
import styled from 'styled-components'
import {BG_COLOR_SUB, BG_COLOR_SUB3, POINT_COLOR} from '../../../Common/configset'

const dummy = [
  {key: 'max1', value: '최대타수1'},
  {key: 'max2', value: '최대타수2'},
  {key: 'max3', value: '최대타수3'},
  {key: 'max4', value: '최대타수4'},
  {key: 'max5', value: '최대타수5'}
]

interface IProps {
  datas: { key: string, value: string }[]
  setDatas: (datas: { key: string, value: string }[]) => void
}

const SeleteMenuBox = ({datas, setDatas}: IProps) => {
  const [keys, setKeys] = useState<String[]>([])

  React.useEffect(() => {
    console.log(keys)
  }, [keys])

  return (
    <SelectBox>
      <p>선택</p>
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
              } else {
                tmpData.splice(tmpArray.indexOf(v.key), 1)
              }

              if (tmpArray.indexOf(v.key) === -1) {
                tmpArray = [...tmpArray, v.key]
              } else {
                tmpArray.splice(tmpArray.indexOf(v.key), 1)
              }

              setDatas([...tmpData])
              setKeys([...tmpArray])
            }} style={{backgroundColor: keys.indexOf(v.key) !== -1 ? POINT_COLOR : undefined}}>
              <p>{v.value}</p>
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
