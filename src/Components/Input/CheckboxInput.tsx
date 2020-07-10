import React, { useEffect } from 'react';
import Styled from 'styled-components'
import { BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH } from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';


interface IProps {
    title: string,
    list: any[],
    onChangeEvent: any,
    checkKey: string,
    nameKey: string,
}
const CheckboxInput = ({ title, list, checkKey, nameKey, onChangeEvent }: IProps) => {
    useEffect(() => {

    }, [])
 
    return (
        <InputContainer title={title}>
            <div>
             {
                 list.map((v, i)=>{
                     return(
                        <CheckList>
                            <input type="checkbox" id={`cb-${i}`} checked={v[checkKey]} onClick={()=>onChangeEvent(i, v[checkKey])}/>
                            <label htmlFor={`cb-${i}`}></label>
                            <span>{v[nameKey]}</span>
                            
                        </CheckList> 
                     )
                 })
             }
            </div>
        </InputContainer>
    );
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: calc(100% - 200px);
    background-color: #f4f6fa;
`
const CheckList = Styled.div`
    display: flex;
    padding: 6px 10px 6px 10px;
    span{
        padding-left: 13px;
    }

`


export default CheckboxInput;