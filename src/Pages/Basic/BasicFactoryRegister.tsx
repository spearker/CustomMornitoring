import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import {getToken} from '../../Common/tokenFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions';
import ListHeader from '../../Components/Text/ListHeader';
import useObjectInput from '../../Functions/UseInput';
import NormalAddressInput from '../../Components/Input/NormalAddressInput';
import {JsonStringifyList} from '../../Functions/JsonStringifyList';
import {useHistory} from 'react-router-dom';

// 공장 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const BasicFactoryRegister = () => {
    const history = useHistory();
    const [document, setDocument] = useState<any>({id: '', value: '(선택)'});

    const [essential, setEssential] = useState<any[]>([]);
    const [optional, setOptional] = useState<any[]>([]);

    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [pk, setPk] = useState<string>('');

    const [inputData, setInputData] = useObjectInput('CHANGE', {
        name: '',
        description: '',
        location: {
            postcode: '',
            roadAddress: '',
            detail: '',
        },

    });
    useEffect(() => {

        if (getParameter('pk') !== "") {
            setPk(getParameter('pk'))
            setIsUpdate(true)
            getData()
        }

    }, [])

    const getData = useCallback(async () => {

        const res = await getRequest(`http://203.234.183.22:8299/api/v1/factory/load?pk=` + getParameter('pk'), getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리

        } else {
            if (res.status === 200 || res.status === "200") {
                const data = res.results;
                setInputData('name', data.name)
                setInputData('location', data.location)
                setInputData('description', data.description)
            } else {
                //TODO:  기타 오류
            }
        }
    }, [pk, optional, essential, inputData])


    const onsubmitFormUpdate = useCallback(async () => {

        if (inputData.name === "") {
            alert("공장명은 필수 항목입니다. 반드시 입력해주세요.")
            return;
        } else if (inputData.name === "" || inputData.location.detail === "" || inputData.location.postcode === "" || inputData.location.roadAddress === "") {
            alert("공장은 필수 항목입니다. 반드시 입력해주세요.")
            return;
        }

        const data = {
            pk: getParameter('pk'),
            address: inputData.location,
            name: inputData.name,
            description: inputData.description,
            info_list: JsonStringifyList(essential, optional)
        };
        const res = await postRequest('http://203.234.183.22:8299/api/v1/factory/update', data, getToken(TOKEN_NAME))

        if (res === false) {
            ////alert('////alert('[SERVER ERROR] 요청을 처리 할 수 없습니다.')')

        } else {
            if (res.status === 200) {
                //alert('성공적으로 수정 되었습니다');
                history.goBack()
            } else {
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    }, [pk, optional, essential, inputData])

    const onsubmitForm = useCallback(async () => {

        if (inputData.name === "") {
            alert("공장명은 필수 항목입니다. 반드시 입력해주세요.")
            return;
        } else if (inputData.name === "" || inputData.location.detail === "" || inputData.location.postcode === "" || inputData.location.roadAddress === "") {
            alert("공장은 필수 항목입니다. 반드시 입력해주세요.")
            return;
        }

        const data = {
            document_pk: document.pk,
            name: inputData.name,
            address: inputData.location,
            description: inputData.description,
            info_list: JsonStringifyList(essential, optional)
        };

        const res = await postRequest('http://203.234.183.22:8299/api/v1/factory/register', data, getToken(TOKEN_NAME))


        if (res === false) {
            ////alert('////alert('[SERVER ERROR] 요청을 처리 할 수 없습니다.')')

        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다');
                history.push('/basic/list/factory')
            } else {
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    }, [pk, optional, essential, inputData, document])


    return (
        <DashboardWrapContainer index={'basic'}>

            <InnerBodyContainer>
                <Header title={isUpdate ? '공장 정보수정' : '공장 정보등록'}/>
                <WhiteBoxContainer>
                    <ListHeader title="필수 항목"/>
                    <NormalInput title={'공장명'} value={inputData.name}
                                 onChangeEvent={(input) => setInputData(`name`, input)}
                                 description={'공장 이름을 입력해주세요.'}/>
                    <NormalAddressInput title={'공장 주소'} value={inputData.location}
                                        onChangeEvent={(input) => setInputData(`location`, input)}/>
                    <br/>
                    <ListHeader title="선택 항목"/>
                    <NormalInput title={'설명'} value={inputData.description}
                                 onChangeEvent={(input) => setInputData(`description`, input)}
                                 description={'(비고)'}/>
                    {/*<br/>*/}
                    {/*<DocumentFormatInputList*/}
                    {/*    pk={!isUpdate ? document.pk : undefined}*/}
                    {/*    loadDataUrl={isUpdate? `http://203.234.183.22:8299/api/v1/factory/load?pk=${pk}` :''}*/}
                    {/*    onChangeEssential={setEssential} onChangeOptional={setOptional}*/}
                    {/*/>*/}
                    <div style={{marginTop: 32, marginLeft: "31%"}}>
                        {isUpdate ?
                            <ButtonWrap onClick={async () => {
                                await onsubmitFormUpdate()
                            }}>
                                <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
                                    <p style={{fontSize: 18}}>수정하기</p>
                                </div>
                            </ButtonWrap>
                            :
                            <ButtonWrap onClick={async () => {
                                await onsubmitForm()
                            }}>
                                <div style={{width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px'}}>
                                    <p style={{fontSize: 18}}>등록하기</p>
                                </div>
                            </ButtonWrap>
                        }
                    </div>
                </WhiteBoxContainer>

            </InnerBodyContainer>

        </DashboardWrapContainer>

    );
}


const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;s
`

const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2};
`


export default BasicFactoryRegister;
