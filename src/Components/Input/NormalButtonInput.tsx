import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import InputContainer from '../../Containers/InputContainer';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps {
    title: string,
    description: string,
    value: string,
    disabled?: boolean
    onChangeEvent: any,
    onClickEvent: any,
    children?: any,
    style?: any
}

const NormalButtonInput = ({title, description, disabled, value, onChangeEvent, onClickEvent, children, style}: IProps) => {
    useEffect(() => {

    }, [])

    return (
        <>
            <InputContainer title={title}>
                <BodyDiv style={style}>
                    <InputWrapBox>
                        <input placeholder={description} type="text" value={value} disabled={disabled}
                               onChange={(e) => onChangeEvent(e.target.value)}
                               style={{
                                   textAlign: 'left',
                                   border: 'solid 0.5px #d3d3d3',
                                   width: disabled ? '100%' : 'calc(100% - 90px)',
                                   padding: 6,
                                   backgroundColor: '#f4f6fa',
                                   paddingLeft: 8,
                                   fontSize: 14
                               }}/>
                        {!disabled &&
                        < label onClick={onClickEvent} style={{
                            border: 'solid 0.5px #d3d3d3',
                            textAlign: 'center',
                            fontSize: 14,
                            width: 84,
                            paddingBottom: 2,
                            paddingTop: 4,
                            backgroundColor: POINT_COLOR,
                            paddingLeft: 12,
                            paddingRight: 12,
                            cursor: 'pointer'
                        }}>중복 확인</label>
                        }
                    </InputWrapBox>
                    {
                        children !== undefined ?
                            <div style={{marginTop: 18, width: 'calc(100% - 15px)'}}>
                                {children}
                            </div>
                            : null
                    }
                </BodyDiv>
            </InputContainer>
        </>
    );
}
const BodyDiv = Styled.div`
    font-size: 14px;
     width: calc(100% - 118px);
    padding: 0px;
`
const InputWrapBox = Styled.div`
    font-size: 14px;
    width: 100%;
    display: flex;
    background-color: #f4f6fa;
`


export default NormalButtonInput;
