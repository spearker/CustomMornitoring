import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, { withTheme, DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom';
import PressStatusMarker from './Marker/PressStatusMarker';
import { toUnicode } from 'punycode';
import PressNameMarker from './Marker/PressNameMarker';
import IC_BEFORE from '../../Assets/Images/ic_before_page.png';
import IC_AFTER from '../../Assets/Images/ic_next_page.png';
interface Props{
    list: any[], 
    select: any,
    onChangeEvent: any,
}
const FactorySelector = ({list, select, onChangeEvent}: Props) => {

    const onClickStep = useCallback((direction)=>{
        
        const pkList = list.map(v => v.pk);
        const idx = pkList.indexOf(select.pk);
        
        if(idx == -1){
            return;
        }
        if(direction === 'BEFORE'){
            if(idx > 0){
                onChangeEvent(list[idx-1])
            }
        }else{
           
            if(idx < list.length - 1){
                onChangeEvent(list[idx+1])
            }
        }
    },[list, select])

    return(
        <Wrapper>
            <img src={IC_BEFORE} onClick={()=>{onClickStep('BEFORE')}}/>

            {select.name}

            <img src={IC_AFTER} onClick={()=>{onClickStep('AFTER')}}/>
        </Wrapper>
        
    )
}

const Wrapper = Styled.div`
    max-width: 1100px !important;
    background-color: #111319;
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding-top: 11px;
    padding-bottom: 11px;
    img{
        width: 20px;
        padding-top: 5px;
        padding-top: 5px;
        &:last-child{
            padding-right: 11px;
            float: right;
        }
        &:first-child{
            padding-left: 11px;
            float: left;
        }
    }
`


export default FactorySelector;