import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import IcButton from '../Button/IcButton';
import icCheck from '../../Assets/Images/ic_check_on.png'
import icCheckDim from '../../Assets/Images/ic_check_dim.png'
import IconSquareButton from '../Button/IconSquareButton'
import icDelete from '../../Assets/Images/ic_minus.png'

interface Props{
  pk: string,
  contents: string[],
  widths: string[],
  option?: string,
  onClickEvent :()=>void;
  isSelected: boolean,
  isIconDimmed: boolean,
  type?: 'remove' | 'add'
}




// 검색결과 리스트
const SearchedList = ({ pk , option,contents, widths, isSelected, isIconDimmed, onClickEvent, type}: Props) => {
  
  useEffect(()=>{
   
  },[])

  

  return (
    <ListWrapDiv style={{width: type == undefined || type !== 'remove' ? 'auto' : '100%',  marginBottom: type == undefined || type !== 'remove' ? '0' : '11px'}}>
      <div style={{display:'flex'}}>

      </div>
      {
        contents.map((v, i)=>{
          return(
            <div style={{ width: widths[i], color: isIconDimmed ? '#b3b3b3' : 'black'}}>
             
              <p className="p-limit" style={{paddingLeft:8}}>{v}</p>
            </div>
          )
        })
      } 
      <div onClick={onClickEvent} style={{position:'absolute', top:5, right:38, textAlign:'right'}}>
        {option}
      </div>
      {
        type == undefined || type !== 'remove' ?
        <div onClick={onClickEvent} style={{position:'absolute', top:0, right:-1, zIndex:3}}>
            <IconSquareButton  color="#e7e9eb" width="33px" imageSize="22px"  image={isIconDimmed? icCheckDim : icCheck} dim={isSelected ? false : true}/>  
        </div> 
        :
        <div onClick={onClickEvent} style={{position:'absolute', top:0, right:-1}}>
            <IconSquareButton  color="#e7e9eb" width="33px" imageSize="22px" image={icDelete} dim={true}/>  
        </div> 
      }
      
    </ListWrapDiv>  
  );
}




const ListWrapDiv = Styled.div`
  color: black;
  border: solid 0.5px #d3d3d3;
  background-color: #f4f6fa;
  position: relative;
  font-size: 14px;
  display: flex;
  padding-top: 6px;
  padding-bottom: 6px;
`



export default SearchedList;
