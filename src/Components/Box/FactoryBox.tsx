import React from 'react'
import Styled from 'styled-components'
import next from '../../Assets/Images/ic_next_process.png'

interface Props {
  title: string
  inputMaterial?: any[]
  productionMaterial?: string
  children?: any
}

const FactoryBox = ({title, inputMaterial, productionMaterial, children}: Props) => {

  const changeCount = (item: any[] | any | undefined, type: 'in' | 'out') => {
    if (item) {
      if (item.length > 1) {
        return `${item[0].material_name} ${item[0].count}${item[0].material_type === 0 ? 'kg' : '개'} 외 ${item.length - 1}개`
      } else if (item.length > 0) {
        return `${item[0].material_name} ${item[0].count}${item[0].material_type === 0 ? 'kg' : '개'}`
      } else {
        return `${item.material_name} ${item.count}${item.material_type === 0 ? 'kg' : '개'}`
      }
    }

    return type === 'in' ? '투입자재 없음' : '생산품목 없음'
  }

  return (
    <TopBlackBox>
      <p>{title}</p>
      <p>투입자재</p>
      <div style={{width: '97%', height: 'auto'}}>
            <span
              style={{color: inputMaterial !== null && inputMaterial !== undefined ? '#ffffff' : '#babcbf'}}>{changeCount(inputMaterial, 'in')}
            </span>
      </div>
      <p>생산자재</p>
      <div style={{width: '97%', height: 'auto'}}>
            <span
              style={{color: productionMaterial !== null && productionMaterial !== undefined ? '#ffffff' : '#babcbf'}}>{changeCount(productionMaterial, 'out')}
            </span>
      </div>
      {/*<ProductionReg*/}
      {/*    style={{backgroundColor: productionMaterial !== null && productionMaterial !== undefined ? '#bbbbbb' : '#19b9df'}}>*/}
      {/*    <p>{productionMaterial !== undefined && productionMaterial !== null ? '품목수정' : '품목등록'}</p>*/}
      {/*</ProductionReg>*/}
    </TopBlackBox>
  )
}

const TopBlackBox = Styled.div`
    width: 140px;
    min-height: 230px;
    margin-top: 30px;
    border-radius: 6px;
    padding: 0 9px 0 9px;
    box-shadow: 0 3px 6px 0 rgba(255, 255, 255, 0.27);
    border: solid 1px #4b4b4b;
    background-color: #111319;
    p{
        padding: 0 0 6px 0;
        font-family: NotoSansCJKkr;
        font-size: 11px;
        &:first-child{
            font-size: 16px;
            font-family: NotoSansCJKkr-Bold;
            padding: 7px 0 14px 0;
        }
    }
    div{
        margin: 0 0 13px 0;
        width: 140px;
        height: 28px;
        border-radius: 6px;
        background-color: #26272e;
        padding-left: 6px;
        span{
            font-family: NotoSansCJKkr;
            font-size: 14px;
            font-weight: normal;
        }
    }
`

const ProductionReg = Styled.button`
     margin-top: 12px;
     margin-bottom: 12px;
     width: 140px;
     height: 30px;
     border-radius: 6px;
     p{
          &:first-child{
            color: #000000;
            font-family: NotoSansCJKkr;
            font-size: 15px;
            font-weight: bold;
            text-align:center;
           }
     }
`

export default FactoryBox
