import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import icSearch from '../../Assets/Images/ic_search.png'
import IcButton from '../Button/IcButton';


//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    description: string,
    value: string,
    onChangeEvent: any
    onClickEvent: ()=>void,
}
const SearchInput = ({description, value, onChangeEvent, onClickEvent}: IProps) => {
  useEffect(()=>{
   
  },[])

  return ( 
        <form style={{position: 'relative'}} onSubmit={onClickEvent}>
            <InputBox type="text" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>{onChangeEvent(e.target.value)}} placeholder={description}/>
            <div style={{position:'absolute', top:0, right:0, zIndex:4}}>
             <IcButton image={icSearch} onClickEvent={onClickEvent} dim={false}/>  
            </div>
        </form> 
  );
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 13px;
    width: calc(100% - 30px);
    padding: 6px;
    padding-left: 10px;
    background-color: white;

`


export default SearchInput;