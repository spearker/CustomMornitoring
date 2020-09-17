import React from "react";
import Styled from 'styled-components'

interface Props {
    title: string
    inputMaterial?: string
    productionMaterial?: string
    children?: any
}

const FactoryBox = ({title,inputMaterial,productionMaterial,children}:Props) => {
    return(
        <TopBlackBox>
            <p>{title}</p>
            <p>투입자재</p>
            <div>
                <span style={{color:  inputMaterial !== null &&  inputMaterial !== undefined ?  '#ffffff' : '#babcbf'}}>{inputMaterial !== null && inputMaterial !== undefined ? inputMaterial : '품목 선택'}</span>
            </div>
            <p>생산자재</p>
            <div>
                <span style={{color:  productionMaterial !== null &&  productionMaterial !== undefined ?  '#ffffff' : '#babcbf'}}>{productionMaterial !== null && productionMaterial !== undefined ? productionMaterial : '품목 선택'}</span>
            </div>
            <ProductionReg>
                <p style={{width: "100%"}}>{productionMaterial !== undefined && productionMaterial !== null ? '품목수정' : '품목등록'}</p>
            </ProductionReg>
        </TopBlackBox>
    )
}

const TopBlackBox = Styled.div`
    width: 140px;
    height: 230px;
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
            font-size: 20px;
            font-family: NotoSansCJKkr-Bold;
            padding: 7px 70px 14px 0;
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
     width: 140px;
     height: 30px; 
     border-radius: 6px;
     background-color: #19b9df;
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
