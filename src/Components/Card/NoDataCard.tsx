import React from 'react';
import Styled from 'styled-components'

interface Props{
    contents: string,
    height: number,
    color?: string
    children?: any
}



// 선택값이 없을 때 화면

const NoDataCard = ({ contents, height, color, children }: Props) => {

    return (
        <NoTimeDataBox style={{height: height, display: "flex", alignItems: "center", backgroundColor: color ? color : '#111319'}}>
            <div style={{width: '100%'}}>
                {contents}
            </div>
        </NoTimeDataBox>
    );
}

const NoTimeDataBox = Styled.div`
    margin-top: 20px;
    color: #666d79;
    font-size: 18px;
    width: 100%;
`

export default NoDataCard;
