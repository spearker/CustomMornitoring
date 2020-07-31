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
                <p>{title}</p>
           </TopBox>
           <div>
               {children == undefined  || children === null ? <></> : children }
           </div>
       </TopBlackBox>
    )
}

const TopBlackBox = Styled.div`
    margin-left: 20px;
    border-width: 0;
    border-radius: 6px;
    width: 330px;
    height: 182px;
    background-color: #353b48;
    font-family: NotoSansCJKkr-Bold;
`

const TopBox = Styled.div`
    height: 40px;
    border-width: 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #000000;
    font-size: 20px;
    padding-top: 10px;
`

export default LoadtoneBox