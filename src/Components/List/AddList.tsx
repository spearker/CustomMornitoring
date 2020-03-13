import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import IcButton from '../Button/IcButton';
import icCheck from '../../Assets/Images/ic_check_on.png'
import icCheckDim from '../../Assets/Images/ic_check_dim.png'
import IconSquareButton from '../Button/IconSquareButton'

interface Props{
  title: string,
  name: string,
  pk: string,
  onClickEvent :()=>void;
  selected: boolean,
  dim: boolean,

}




// 추가 버튼이 있는 리스트 
const AddList = ({ title, name, pk, selected, dim, onClickEvent }: Props) => {
  
  useEffect(()=>{
   
  },[])

  return (
    <ListWrapDiv>
      {
        dim ?
        <>
        <div style={{width: '20%', color:'#b3b3b3'}}>
          <p className="p-limit">{title}</p>
        </div>
        <div style={{width: '80%', color:'#b3b3b3'}}>
          <p>|&nbsp;&nbsp;{name}</p>
        </div>
        </>
        :
        <>
        <div style={{width: '20%'}}>
          <p className="p-limit">{title}</p>
        </div>
        <div style={{width: '80%'}}>
          <p>|&nbsp;&nbsp;{name}</p>
        </div>
        </>
      }

      <div onClick={onClickEvent} style={{position:'absolute', top:0, right:-1, zIndex:3}}>
          <IconSquareButton  color="#e7e9eb" width="33px" imageSize="22px"  image={dim? icCheckDim : icCheck} dim={selected ? false : true}/>  
      </div> 
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
  padding: 6px;
`



export default AddList;