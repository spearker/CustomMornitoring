import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {changeStatusToColor} from '../../Common/statusFunctions';


interface IProps{
    contents: {title: string, value: number, action: string}[],
    onClickEvent: any,
}
const CMSMonitoringTabs = ({contents, onClickEvent}: IProps) => {

    useEffect(()=>{

    },[])

    return (
        <div style={{display:'inline-block', marginBottom:15, alignSelf:'left', marginTop: 75}}>
            {
                contents.map((v, i)=>{
                    return(
                        <ButtonBox
                            className="p-bold"
                            onClick={()=>onClickEvent(v.action)}
                            style={{backgroundColor: changeStatusToColor(v.value), width: 114}}>
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



export default CMSMonitoringTabs;
