import React, {useEffect} from 'react';
import Styled from 'styled-components'
import icSearch from '../../Assets/Images/ic_search.png'
import IconSquareButton from '../Button/IconSquareButton';


interface IProps{
    description: string,
    value: string,
    onChangeEvent: any,
    onClickEvent: any,
}
const SearchInput = ({description, value, onChangeEvent, onClickEvent}: IProps) => {
  useEffect(()=>{

  },[])

  return (
        <form style={{position: 'relative'}}>
            <InputBox type="text" value={value} onChange={(e)=>onChangeEvent(e)} placeholder={description}/>
            <div onClick={onClickEvent}  style={{justifyContent:'center' , position:'absolute', top:0, right:0, zIndex:4}}>
             <IconSquareButton color="#e7e9eb" width="30px" imageSize="17px" image={icSearch} dim={false}/>
            </div>
        </form>
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
