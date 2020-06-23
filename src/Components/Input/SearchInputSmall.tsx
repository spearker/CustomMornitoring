import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import icSearch from '../../Assets/Images/ic_search.png'
import IcButton from '../Button/IcButton';
import IconSquareButton from '../Button/IconSquareButton';
import IconSquareButtonGray from '../Button/IconSquareButtonGray';
import SmallButtonLink from '../Button/SmallButtonLink';
import { useHistory } from 'react-router-dom';


interface IProps{
    description: string,
    value: string,
    onChangeEvent: any,
    onClickEvent: any,
    button?: any,
}
const SearchInputSmall = ({description, value, onChangeEvent, onClickEvent,  button}: IProps) => {
  useEffect(()=>{
   
  },[])

  const history = useHistory();

  return ( 
    <div style={{position: 'relative', float:'right'}}>
        <form style={{position: 'relative', display:'inline-block'}}>
            <InputBox type="text" value={value} onChange={onChangeEvent} placeholder={description}/>
            <div onClick={onClickEvent}  style={{justifyContent:'center' , position:'absolute', top:0, right:0, zIndex:2}}>
             <IconSquareButtonGray color="#F5F6FA" width="33px" imageSize="19px" image={icSearch} dim={false}/>  
            </div>
            
            
        </form>
        <div style={{ float:'right', display:'inline-block'}}>
        {
            button !== undefined &&
            <ButtonBox onClick={()=>history.push(button.url)}>{button.name}</ButtonBox>  
        }
        </div>
        </div> 
  );
}

const InputBox = Styled.input`
    border: solid 0.5px #aaaaaa;
    font-size: 15px;
    width: 280px;
    color: white;
    padding: 7px;
    margin-bottom:12px;
    padding-left: 10px;
    background-color: ${BG_COLOR_SUB}50;

`

const ButtonBox = Styled.div`
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 20px;
    margin-left: 10px;
    color: black;
    background-color: #b3b3b3;
`
export default SearchInputSmall;