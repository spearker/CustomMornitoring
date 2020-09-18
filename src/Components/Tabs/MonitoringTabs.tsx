import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {changeStatusToColor} from '../../Common/statusFunctions';


interface IProps{
    contents: {title: string, value: number}[],
    onClickEvent: any,
}
const MonitoringTabs = ({contents, onClickEvent}: IProps) => {

  useEffect(()=>{

  },[])

  return (
    <div style={{display:'inline-block'}}>
        {
          contents.map((v, i)=>{
            return(
              <ButtonBox
              className="p-bold"
              onClick={()=>onClickEvent(v.value)}
              style={{backgroundColor: changeStatusToColor(v.value)}}>
                {v.title}
              </ButtonBox>
          )})

        }
    </div>

  );
}


const ButtonBox = Styled.button`
    padding: 2px 11px 3px 11px;
    color: white;
    display: inline-block;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 15px;
`



export default MonitoringTabs;
