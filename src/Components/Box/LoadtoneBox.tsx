import React from "react";
import Styled from 'styled-components'

interface Props {
    title: string
    children?: any
}

const LoadtoneBox = ({title,children}:Props) => {
    return(
       <TopBlackBox>
           <TopBox>
                <p style={{marginTop: 3}}>{title}</p>
           </TopBox>
           <div>
               {children == undefined  || children === null ? <></> : children }
           </div>
       </TopBlackBox>
    )
}

const TopBlackBox = Styled.div`
    border-width: 0;
    border-radius: 6px;
    width: 350px;
    height: 182px;
    background-color: #353b48;
    font-family: NotoSansCJKkr-Bold;
`

const TopBox = Styled.div`
    height: 40px;
    width: 100%;
    border-width: 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #000000;
    font-size: 20px;
    font-weight: bold;
    padding-top: 10px;
`

export default LoadtoneBox
