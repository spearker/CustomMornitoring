import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, { withTheme, DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom';


const Marker = () => {

    
    return(
        <MarkerWrapper>
        </MarkerWrapper>
    )
}

const MarkerWrapper = Styled.div`
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
export default Marker;