import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB2, POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import {getToken} from '../../Common/tokenFunctions'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import ListHeader from '../../Components/Text/ListHeader'
import * as _ from 'lodash'
import BasicSearchContainer from '../../Containers/Old_Basic/BasicSearchContainer'
import {JsonStringifyList} from '../../Functions/JsonStringifyList'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT} from "../../Api/SF_endpoint";
import {API_URLS, getBasicList, registerBasicItem} from "../../Api/mes/basic";

// 공장 세분화 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const BasicSubdividedRegister = () => {
    const history = useHistory()

    const [document, setDocument] = useState<any>({id: '', value: '(선택)'})

    const [essential, setEssential] = useState<any[]>([])
    const [optional, setOptional] = useState<any[]>([])

    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [pk, setPk] = useState<string>('')

    const [inputData, setInputData] = useState<any>({
        name: '',
        factory: [],
        description: '',
        address: '',
    })

    useEffect(() => {

        if (getParameter('pk') !== '') {
            setPk(getParameter('pk'))
            setIsUpdate(true)
            getData()
        }

    }, [])

    const getData = useCallback(async () => {
        const tempUrl = `${API_URLS['subdivided'].load}?pk=${getParameter('pk')}`
        const res = await getBasicList(tempUrl)

        if (res) {
            const data = res
            const form = {
                pk: data.pk,
                factory: [{pk: data.factory, name: data.factory_name}],
                name: data.subdivided_name,
                description: data.description,

            }

            setInputData(form)
        }
    }, [pk, optional, essential, inputData])


    const onsubmitFormUpdate = useCallback(async () => {

        if (inputData.factory === undefined || inputData.factory[0]?.pk === undefined || inputData.factory[0]?.pk === '') {
            alert('공장은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (inputData.name.trim() === '') {
            alert('세분화 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const data = {
            pk: getParameter('pk'),
            factory: inputData.factory[0].pk,
            name: inputData.name,
            description: inputData.description,
            info_list: JsonStringifyList(essential, optional)
        }
        const tempUrl = `${API_URLS['subdivided'].update}`
        const res = await registerBasicItem(tempUrl, data)

        if (res) {
            history.push('/basic/list/subdivided')
        }


    }, [pk, optional, essential, inputData])

    const onsubmitForm = useCallback(async () => {

        if (inputData.factory === undefined || inputData.factory[0]?.pk === undefined || inputData.factory[0]?.pk === '') {
            alert('공장은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (inputData.name.trim() === '') {
            alert('세분화 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const data = {
            document_pk: document.pk,
            factory: inputData.factory[0].pk,
            name: inputData.name,
            description: inputData.description,
            info_list: JsonStringifyList(essential, optional)
        }

        const tempUrl = `${API_URLS['subdivided'].create}`
        const res = await registerBasicItem(tempUrl, data)


        if (res) {
            //alert('성공적으로 등록 되었습니다')
            history.push('/basic/list/subdivided')
        }

    }, [pk, optional, essential, inputData, document])


    return (
        <DashboardWrapContainer index={'basic'}>

            <InnerBodyContainer>
                <Header title={isUpdate ? '공장 세분화 정보수정' : '공장 세분화 정보등록'}/>
                <WhiteBoxContainer>
                    {
                        // document.id !== '' || isUpdate == true?
                        <div>
                            <ListHeader title="필수 항목"/>
                            <BasicSearchContainer
                                title={'공장'}
                                key={'pk'}
                                value={'name'}
                                option={0}
                                onChangeEvent={
                                    (input) => {
                                        let temp = _.cloneDeep(inputData)
                                        temp.factory = input
                                        setInputData(temp)
                                    }
                                }
                                solo={true}
                                list={inputData.factory}
                                searchUrl={`${SF_ENDPOINT}/api/v1/factory/search?`}
                            />
                            <NormalInput title={'세분화 이름'} value={inputData.name} description={''}
                                         onChangeEvent={(input) => {
                                             let temp = _.cloneDeep(inputData)
                                             temp.name = input
                                             setInputData(temp)
                                         }}/>

                            <br/>
                            <ListHeader title="선택 항목"/>
                            <NormalInput title={'설명'} value={inputData.description} description={''}
                                         onChangeEvent={(input) => {
                                             let temp = _.cloneDeep(inputData)
                                             temp.description = input
                                             setInputData(temp)
                                         }}/>
                            <br/>

                            {isUpdate ?
                                <div style={{marginTop: 40, marginLeft: 340}}>
                                    <ButtonWrap onClick={async () => {
                                        await onsubmitFormUpdate()
                                    }}>
                                        <div style={{width: 360, height: 40}}>
                                            <p style={{fontSize: 18, marginTop: 15}}>수정하기</p>
                                        </div>
                                    </ButtonWrap>
                                </div>
                                :
                                <div style={{marginTop: 40, marginLeft: 340}}>
                                    <ButtonWrap onClick={async () => {
                                        await onsubmitForm()
                                    }}>
                                        <div style={{width: 360, height: 40}}>
                                            <p style={{fontSize: 18, marginTop: 15}}>등록하기</p>
                                        </div>
                                    </ButtonWrap>
                                </div>
                            }
                        </div>
                        // :
                        //
                        // <SelectDocumentForm category={8} onChangeEvent={setDocument}/>
                    }
                </WhiteBoxContainer>

            </InnerBodyContainer>

        </DashboardWrapContainer>

    )
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
`
export default BasicSubdividedRegister
