import React, { useEffect, useCallback } from 'react';
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
  status: string | undefined,
  endDate: string | undefined,
  type?: 'remove' | 'add'
}




// 검색결과 리스트
const SearchedMachineList = ({ pk , status, endDate, option,contents, widths, isSelected, isIconDimmed, onClickEvent, type}: Props) => {

  useEffect(()=>{

  },[])

  const changeStatusToString = useCallback((status: string)=>{
    if(status === 'active'){
        return '진행'
    }else if(status === 'done'){
        return '완료'
    }else if(status === 'stop'){
        return '중지'
    }else if(status === 'share'){
        return '공유'
    }else if(status === 'ready'){
        return '대기'
    }else if(status === 'off'){
        return '꺼짐'
    } else if(status === 'error'){
        return '에러'
    }else if(status ==='reservation'){
        return '예약'
    }else{
        return '대기'
    }

},[])

const changeStatusToColor = useCallback((status: string | undefined)=>{

   if(status === undefined){
    return '#717c90'
   }
    if(status === 'active'){
        return '#25b4b4'
    }else if(status === 'done'){
        return '#2760ff'
    }else if(status === 'stop'){
        return '#fd6b00'
    }else if(status === 'error'){
        return '#ff461a'
    }else if(status === 'share'){
        return '#683be5'
    }else if(status === 'ready'){
        return '#717c90'
    }else if(status === 'reservation'){
        return '#f8a506'
    }else{
        return '#717c90'
    }

},[])


  return (
    <ListWrapDiv style={{width: type == undefined || type !== 'remove' ? 'auto' : '100%',  marginBottom: type == undefined || type !== 'remove' ? '0' : '11px'}}>
      <div style={{display:'flex', width:'100%'}}>
        <p style={{padding:'5px 10px 5px 10px', minWidth:48, textAlign:'center', color:'white',backgroundColor:changeStatusToColor(status)}}>{changeStatusToString(status !== undefined ? status : "normal")}</p>
        {
          contents.map((v, i)=>{
            return(
                <p style={{padding:'5px 10px 5px 6px', width: widths[i], color: isIconDimmed ? '#b3b3b3' : 'black'}} className="p-limit"> {i !== 0 ? <span>|&nbsp;&nbsp;</span> : <span >&nbsp;&nbsp;</span>}{v}</p>
            )
          })
        }
        <div style={{padding:'5px 10px 5px 10px', marginLeft:'auto', textAlign:'right'}}>
        <p >{endDate !== "" ? '작업완료 : ' +endDate : null}</p>
        </div>
      {
        type == undefined || type !== 'remove' ?
        <div onClick={onClickEvent} style={{marginLeft:'auto'}}>
            <IconSquareButton  color="#e7e9eb" width="30px" imageSize="22px"  image={isIconDimmed? icCheckDim : icCheck} dim={isSelected ? false : true}/>
        </div>
        :
        <div onClick={onClickEvent} style={{marginLeft:'auto', width:35}}>
            <IconSquareButton  color="#e7e9eb" width="30px" imageSize="22px" image={icDelete} dim={true}/>
        </div>
      }
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
  flex-wrap: wrap;
  align-content: space-between;
`



export default SearchedMachineList;
