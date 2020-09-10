import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, { withTheme, DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom';
//import Marker from './Marker';

interface Props{
    component: any,
    select?: string,
    onChangeEvent?: any,
}
const PressNameMarker = ({component, select, onChangeEvent}:Props ) => {
    const {pk, name, tons, left, bottom, operation } = component;

    const PressNameMarkerWrapper = Styled(Marker)`
        width: 70px;
        background-color: ${select !== undefined && String(select) == String(pk) ? '#19b9df;' : `${operation === 10 ? '#666d79;' : `${operation === 11 ? '#19b9df;' : '#ff0000;'}`}` }
        left: ${Number(left)}%;
        bottom: ${Number(bottom)}%;
        position: absolute;
        div{
            padding-top: 12px;
            padding-bottom: 12px;
        }
    `

    return(

        <PressNameMarkerWrapper>
            <div onClick={onChangeEvent!== undefined ? ()=>onChangeEvent(pk) : ()=>{}}>

                <p>{name}</p>
                <p>{tons} ton</p>
            </div>
        </PressNameMarkerWrapper>

    )
}
const Marker = Styled.div`
    border-radius: 6px;
    text-align: center;
    color: white;
    p{
        font-size: 12px;
        font-weight: bold;
        color: white;
        margin: 0;
    }
    position: absolute;
    cursor: pointer;
`
export default PressNameMarker;
