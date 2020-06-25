import React, { useEffect , useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'

//점으로 된 페이지 네이션

interface IProps{
    stock: number, //총 갯수
    selected : number //현재 눌러진
    onClickEvent: (index: number)=>void
}
const NumberPagenation = ({stock, selected, onClickEvent}: IProps) => {

    const dotList: any[] = [];
    const DotOn = Styled.p`
    width:10;
    font-size: 17;
    display: inline-block;
    margin-right: 6px;
    margin-left: 6px;
    color: ${POINT_COLOR};
  `
    const DotOff = Styled.p`
    width:10;
    font-size: 17;
    display: inline-block;
    margin-right: 6px;
    margin-left: 6px;
    color: white;
  `
    for(let i = 1 ; i <= stock ; i ++){
        dotList.push(
            <a onClick={()=>{onClickEvent(i); }} key={i}>
                {selected === i ?
                    <DotOn>{i}</DotOn>
                    :
                    <DotOff>{i}</DotOff>
                }
            </a>
        )
    }

    useEffect(()=>{

    },[])



    return (

        <div style={{textAlign:'center'}}>
            <a onClick={()=>{onClickEvent(selected === 1 ? 1 : selected-1); }}>
                <DotOff>{"<"}</DotOff>
            </a>
            {dotList}
            <a onClick={()=>{onClickEvent(stock === selected ? stock : selected+1); }}>
                <DotOff>{">"}</DotOff>
            </a>
        </div>


    );
}





export default NumberPagenation;
