import React from 'react';
import Styled from 'styled-components'


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
