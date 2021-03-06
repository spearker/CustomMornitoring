import React, {useEffect} from 'react';
import Styled from 'styled-components'
import InputContainer from '../../Containers/InputContainer';


interface IProps {
    title: string,
    description?: string,
    value: string,
    type?: string,
    width?: number | string
    onChangeEvent?: any
}

const NormalInput = ({title, description, value, type, onChangeEvent, width}: IProps) => {
    useEffect(() => {

    }, [])

    return (
        <InputContainer title={title} width={width}>
            {onChangeEvent !== null && onChangeEvent !== undefined ?
                <InputBox
                    type={type ? type : 'text'} value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        onChangeEvent(e.target.value)
                    }} placeholder={description ?? ''}/>
                :
                <InputBox type="text" value={value} placeholder={description ?? ''} disabled/>
            }
        </InputContainer>
    );
}

const InputBox = Styled.input`
                border: solid 0.5px #d3d3d3;
                font-size: 14px;
                padding: 6px;
                padding-left: 10px;
                width: calc(100% - 124px);
                background-color: #f4f6fa;
                `


export default NormalInput;
