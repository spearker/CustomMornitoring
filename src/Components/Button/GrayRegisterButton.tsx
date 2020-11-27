import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {POINT_COLOR, POINT_COLOR_3} from '../../Common/configset'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps {
    name: any,
    onPress?: () => void,

}

const GrayRegisterButton = ({name, onPress}: IProps) => {
    useEffect(() => {

    }, [])

    return (
        <div className="p-bold" style={{textAlign: 'center'}} onClick={onPress}>
            <ButtonBox type="submit">{name}</ButtonBox>
        </div>

    );
}

const ButtonBox = Styled.button`
    padding: 10px;
    width: 360px;
    color: #666d79;
    background-color: ${POINT_COLOR_3};
    border: 0;
    border-radius: 5px;
    margin-top: 30px;
    font-size: 18px;
    &:button {
      transition-duration: 0.4s;
    }
    &:hover {
      background-color: ${POINT_COLOR_3};
    }
    &:active {
      transform: scale(0.97);
    }
    
`


export default GrayRegisterButton;
