import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';

//레디오
interface IProps{
    title: string,
    contents: {title: string, value: number}[], 
    target: number,
    onChangeEvent: any
}

const RadioInput = ({title, target, contents,onChangeEvent}: IProps) => {
    useEffect(() => {

    }, [])
  return ( 
        
         <InputContainer title={title}>
            <div style={{display:'flex', alignItems:'center'}}>
                {
                    contents.map((v, i)=>{
                        return(
                        <div key={i}>
                            <input type="radio" id={`rd${i}`} name="type" checked={target === v.value ? true: false} onClick={(e)=>onChangeEvent(v.value)}/>
                            <label htmlFor={`rd${i}`}></label>
                            <span style={{paddingLeft:4, fontSize:14, marginRight:20}}>{v.title}</span> 
                        </div>
                        )
                    })
                }
            </div>
        </InputContainer> 
  );
}




export default RadioInput;