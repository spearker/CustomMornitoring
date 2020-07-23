import React, { useEffect,useState,useCallback} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import tempIamge from '../../Assets/Images/temp_machine.png'
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'
import IC_UP from '../../Assets/Images/ic_reply_up.png'
import IC_DOWN from '../../Assets/Images/ic_reply_down.png'
import icCircle from '../../Assets/Images/ic_circle.png'
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'
import { Link } from 'react-router-dom';

interface Props{
    contents: string,
}



// 선택값이 없을 때 화면

const NoDataCard = ({ contents }: Props) => {

    return (
        <NoTimeDataBox>
            {contents}
        </NoTimeDataBox>
    );
}

const NoTimeDataBox = Styled.div`
    margin-top: 20px;
    color: #666d79;
    font-size: 18px;
    padding: 222px 452px 222px 452px;
    background-color: #111319;
`

export default NoDataCard;
