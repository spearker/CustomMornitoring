import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, { withTheme, DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom';

//지도상 노출되는 컴포넌트 마커

interface Props{
    width?: string | number,
    size?: string,
    left: number,
    bottom: number,
    pk: string,
    status?: any,
    children?: any,
    onClickEvent?: any,
}

const ComponentMarker = ({status, width, size, left, bottom, pk, children, onClickEvent}: Props) => {

    const Wrapper = Styled.div`
        display: inline-block;
        left: ${left}%;
        bottom: ${bottom}%;
        position: absolute;
        z-index: 3;
        width: ${width ?? size};
    `
    const CustomMarker = Styled(Marker as any)`
        width: ${width}px;
        height: ${width}px;
    `
    const defaultContentsDOM =
        <>
        <p>{status !== undefined ? status.name : ''}</p>
        <p>{pk}</p>
        <p>( {left} , {bottom} )</p>
        </>


    return(
        <Wrapper onClick={onClickEvent !== undefined ? ()=>onClickEvent(pk) : ()=>{}}>
            {
                children ?
                children
                :
                <>
                {
                    size === 'PRESS' &&
                    <PhotoMarker>
                        {defaultContentsDOM}
                    </PhotoMarker>
                }
                {
                    size === 'BREAKER' &&
                    <>
                    <PhotoMarker>
                        {defaultContentsDOM}
                    </PhotoMarker>
                    <Breaker>
                        <p>브레이커</p>
                    </Breaker>
                    </>
                }
                {
                    size === 'NAME' &&
                    <NameMakrer>
                        {defaultContentsDOM}
                    </NameMakrer>
                }
                </>

            }


        </Wrapper>
    )
}

const InnderWrapper = Styled.div`
    background-color: darkblue;
    min-height: 40px;
    border-radius: 3px;
    text-align: center;
    p{
        font-size: 11px;
        font-weight: bold;
        color: white;
    }
`


const Marker = Styled.div`
    background-color: #666d79;
    border-radius: 4px;
    text-align: center;
    p{
        &:first-child{
            padding-top: 8px;
        }
        font-size: 12px;
        font-weight: bold;
        color: white;
        margin: 0;
    }
`

const Breaker = Styled(Marker as any)`
    width: 100px;
    height: 75px;
    background-color: #4d5264;
    margin-top: 48px;
`

const PhotoMarker = Styled(Marker as any)`
    width: 100px; 
    height: 170px; 
`


const NameMakrer = Styled(Marker as any)`
    width: 70px;
    height: 70px;
`

export default ComponentMarker;
