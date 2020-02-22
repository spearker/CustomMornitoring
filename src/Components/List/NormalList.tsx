import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';


interface Props{
  contents: string[]
}


// 텍스트로 이루어진 기본적인 리스트 

const NormalList = ({ contents }: Props) => {
  
  const RawInnerDiv = Styled.div`
    display: inline-block;
    text-align: left;
    width: calc(100% / ${contents.length});
    p{
      margin-left: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      width: 98%;
      overflow:hidden;
    }
`


  useEffect(()=>{
   
  },[])

  return (
    <ListWrapDiv>
        {
          contents.map((value: string)=> (
            <RawInnerDiv>
              <p className="p-bold" >{value}</p>
            </RawInnerDiv>
          ))
        }
    </ListWrapDiv>  
  );
}


const ListWrapDiv = Styled.div`
  width: 100%;
  font-size: 16px;
  padding-top: 17px;
  padding-bottom:17px;
  color: #555555;
  display: flex;
  text-align: center;
  background-color: #efefef;
  margin-bottom: 15px;
`



export default NormalList;