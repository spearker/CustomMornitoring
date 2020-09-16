import React, { useEffect , useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'

//점으로 된 페이지 네이션

interface IProps{
    stock: number, //총 갯수
    selected : number //현재 눌러진
    onClickEvent: (index: number)=>void
}
const DotPagenation = ({stock, selected, onClickEvent}: IProps) => {

  const dotList: any[] = [];
  const DotOn = Styled.div`
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 4px;
    margin-right: 6px;
    margin-left: 6px;
    background-color: ${POINT_COLOR};
  `
  const DotOff = Styled.div`
    width: 8px;
    height: 8px;
    display: inline-block;
    margin-right: 6px;
    margin-left: 6px;
    border-radius: 4px;
    background-color: #3d414e;
  `
  for(let i = 1 ; i <= stock ; i ++){
    dotList.push(
    <a onClick={()=>{onClickEvent(i); }} key={i}>
      {selected === i ?
      <DotOn/>
      :
      <DotOff/>
      }
    </a>
    )
  }

  useEffect(()=>{

  },[])



  return (

       <div style={{textAlign:'center'}}>
         {dotList}
       </div>


  );
}





export default DotPagenation;
