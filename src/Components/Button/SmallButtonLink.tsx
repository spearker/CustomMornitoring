import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import { Link } from 'react-router-dom';


interface IProps{
    name: any,
    link: string,

}
const SmallButtonLink = ({name, link}: IProps) => {
  const ButtonBox = Styled.button`
    padding: 4px 13px 4px 13px;
    color: black;
    border-radius: 5px;
    background-color: ${POINT_COLOR};
    border: 0;
    margin-left: 10px;
    font-size: 13px;
    font-weight: bold;
`
  useEffect(()=>{

  },[])

  return (
    <div style={{textAlign:'center', display:'inline-block'}}>
      <Link to={link}>
        <ButtonBox>{name}</ButtonBox>
      </Link>
    </div>

  );
}




export default SmallButtonLink;
