import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, { withTheme, DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom';
//import Marker from './Marker';

interface Props{
    component: any
}
const PressStatusMarker = ({component}:Props ) => {

    const {pk, name, operation, tons, ratio, photo, left, bottom} = component;
    
    const PressStatusWrapper = Styled(Marker)`
        width: 100px;
        left: ${Number(left)}%;
        bottom: ${Number(bottom)}%;
        
    `

    return(
        <PressStatusWrapper >
            <TitleDiv>
                <p>{name}</p>
                <p>{tons} tons</p>
            </TitleDiv>
            <InnerDiv>
                <img src={photo}/>
                <div>
                    <p>상태 {operation}</p>
                </div>
                <div>
                    <p>가동률 {ratio}</p>
                    
                </div>
            </InnerDiv>
        </PressStatusWrapper>
    )
}
const Marker = Styled.div`
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    color: white;
    p{
        font-size: 12px;
        font-weight: bold;
        color: white;
        margin: 0;
    }
    position: absolute;
`
const InnerDiv = Styled.div`
    background-color: #d1d1d1;
    padding-bottom: 4px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    p{
        color: #252525;
    }
    img{
        height: 80px;
        margin: 0;
        width: 100px;
        object-fit: cover;
    }
`

const TitleDiv = Styled.div`
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #28aeae;
    padding-top: 4px;
    
    padding-bottom: 4px;
`
export default PressStatusMarker;