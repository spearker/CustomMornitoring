import React, { useState } from "react";
import Styled from 'styled-components';

// KPI용 겉 메뉴박스

interface IProps{
    style?: any
    children?: any
}


const KPIBasicBox = ({ style, children }: IProps) => {
    
    return (
        <Box style={{...style}}>
            {children}
        </Box>
    )
}

const Box =Styled.div`
    display: flex;
    height: 224px;
    border-radius: 6px;
    background-color: #11131950;
    box-sizing: border-box;
    *{
        box-sizing: border-box;
    }
    button{
        min-width: 208px;
        padding: 4px 0;
        background-color: #19b9df;
        font-size: 15px;
        font-weight: bold;
        border-radius: 6px;
        color: #111319;
    }
`

export default KPIBasicBox
