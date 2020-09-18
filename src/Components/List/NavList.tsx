import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import {useHistory} from 'react-router-dom';


//대시보드 네비게이션 리스트
interface Props{
  name: string,
  url: string,
  onClickEvent?: any
}


 const NavList= ({name, url, onClickEvent}: Props) => {

  const history = useHistory();
  useEffect(()=>{

  },[])

  return (

      <ListDiv>
            <a onClick={onClickEvent == undefined ? ()=>history.push(url) : ()=>onClickEvent}>{name}</a>
      </ListDiv>

  );
}


const ListInnderDiv = Styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  padding-left: 9px;
  font-size: 17px;
  color: white;
  cursor: pointer;
`


const ListDiv = Styled.div`
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid grey;
  text-align: left;
  font-size: 18px;
  color: white;
  cursor: pointer;
  margin-top: 6px;
`

const ListDivSelected = Styled.div`
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid ${POINT_COLOR};
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  color: ${POINT_COLOR};
  cursor: pointer;
`


export default NavList;
