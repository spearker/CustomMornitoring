import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import InputContainer from '../../Containers/InputContainer';
import DaumPostcode from 'react-daum-postcode';
import SmallButton from '../Button/SmallButton';


interface IProps {
    title: string,
    description?: string,
    value: any,
    onChangeEvent?: any,
    onChangeEvent2?: any
    disable?: boolean
}

const NormalAddressInput = ({title, description, value, onChangeEvent, onChangeEvent2, disable}: IProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {

    }, [])

    const handleComplete = useCallback((data) => {

        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setIsOpen(false)
        const temp = {...value};
        temp.roadAddress = fullAddress;
        temp.postcode = data.zonecode;
        onChangeEvent(temp)

    }, [isOpen])

    return (
        <>
            <InputContainer title={title} onClick={() => setIsOpen(true)}>

                <SmallButton name={'검색'} color={'#dddddd'} onClickEvent={() => setIsOpen(true)}/>

                <InputBox style={{width: '40%', marginLeft: 10}} type="text"
                          value={value !== null ? value.roadAddress : ''}
                          placeholder={'검색 버튼을 눌러 주소를 입력해주세요'}/>
                <InputBox style={{width: '30%', marginLeft: 10}} type="text" value={value !== null ? value.detail : ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                              const temp = {...value};
                              temp.detail = e.target.value;
                              onChangeEvent(temp)
                          }} placeholder={'나머지 주소는 직접 입력해주세요'}/>

            </InputContainer>

            {
                isOpen &&
                <DaumPostcode
                    onComplete={handleComplete}
                />
            }

        </>
    );
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: calc(100% - 200px);
    background-color: #f4f6fa;
`


export default NormalAddressInput;
