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
            <div>
                <p>{name}</p>
                <p>{tons} tons</p>
            </div>
            <img src={photo}/>
            <div>
                <div>
                    <p>상태</p>
                    <p>{operation}</p>
                </div>
                <div>
                    <p>가동률</p>
                    <p>{ratio}</p>
                </div>
            </div>
        </PressStatusWrapper>
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
`
const PressStatusWrapper = Styled(Marker)`
    width: 100px;
    div{
        &:first-child{
            background-color: #28aeae;
            padding-top: 4px;
            padding-bottom: 4px;
        }
        &:last-child{
            background-color: #d1d1d1;
            padding-top: 4px;
            padding-bottom: 4px;
            div{
                p{
                    &:last-child{
                        float: right;
                    }
                }
            }
        }
    }
    img{
        height: 80px;
        width: 100px;
    }
`
export default PressStatusMarker;