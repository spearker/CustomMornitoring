import React from "react";
import Styled from 'styled-components'

interface Props {
    settingTone: number
    normalTone: number
    maxTone: number
    minTone: number
    children?: any
}

const SettingToneBox = ({settingTone,normalTone,maxTone,minTone,children}:Props) => {
    return(
        <TopBlackBox>
            <div>
                <p>설정톤</p>
                <p>{settingTone} ton</p>
            </div>
            <div>
                <p>평균톤</p>
                <p>{normalTone} ton</p>
            </div>
            <div>
                <p>최대톤</p>
                <p>{maxTone} ton</p>
            </div>
            <div>
                <p>최소톤</p>
                <p>{minTone} ton</p>
            </div>
        </TopBlackBox>
    )
}

const TopBlackBox = Styled.div`
    border-width: 0;
    border-radius: 10px;
    width: 170px;
    height: 142px;
    background-color: #666666;
    font-family: NotoSansCJKkr-Bold;
    padding: 10px;
    div {
        padding: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`

export default SettingToneBox
