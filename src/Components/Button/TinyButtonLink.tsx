import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {Link} from 'react-router-dom';

//작은 버튼 + 그레이 컬러

interface IProps{
    name: string,
    url: string,

}
const TinyButtonLink = ({name, url}: IProps) => {
  useEffect(()=>{

  },[])

  return (
      <Link to={url}>
        <ButtonBox type="submit" >{name}</ButtonBox>
      </Link>



  );
}

const ButtonBox = Styled.button`
    padding: 2px 4px 2px 4px;
    color: black;
    display: inline-block;
    background-color: #ebebeb;
    border: 0;
    border: solid 0.5px #dfdfdf;
    font-size: 12px;
`


export default TinyButtonLink;
