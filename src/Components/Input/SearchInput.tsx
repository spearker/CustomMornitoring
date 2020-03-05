import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import icSearch from '../../Assets/Images/ic_search.png'
import IcButton from '../Button/IcButton';
import IconSquareButton from '../Button/IconSquareButton';


interface IProps{
    description: string,
    value: string,
    onChangeEvent: any,
    onClickEvent: () =>void,
}
const SearchInput = ({description, value, onChangeEvent, onClickEvent}: IProps) => {
  useEffect(()=>{
   
  },[])

  return ( 
        <div style={{position: 'relative'}}>
            <InputBox type="text" value={value} onChange={onChangeEvent} placeholder={description}/>
            <div onClick={onClickEvent}  style={{justifyContent:'center' , position:'absolute', top:0, right:0, zIndex:4}}>
             <IconSquareButton width="30px" imageSize="17px" image={icSearch} dim={false}/>  
            </div>
        </div> 
  );
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    width: calc(100% - 30px);
    padding: 6px;
    padding-left: 10px;
    background-color: #f4f6fa;

`


export default SearchInput;