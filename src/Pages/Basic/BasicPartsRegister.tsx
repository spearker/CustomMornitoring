import React, {useCallback, useEffect, useState} from 'react'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import ListHeader from '../../Components/Text/ListHeader'
import NormalInput from '../../Components/Input/NormalInput'
import DropdownInput from '../../Components/Input/DropdownInput'
import BasicSearchContainer from '../../Containers/Basic/BasicSearchContainer'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {useHistory} from 'react-router-dom'
import useObjectInput from '../../Functions/UseInput'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {getToken} from '../../Common/tokenFunctions'
import {POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import SmallButton from '../../Components/Button/SmallButton'
import Styled from 'styled-components'
import {SF_ENDPOINT} from "../../Api/SF_endpoint";


const BasicPartsRegister = () => {

    const history = useHistory()
    const [document, setDocument] = useState<any>({id: '', value: '(선택)'})

    const [essential, setEssential] = useState<any[]>([])
    const [optional, setOptional] = useState<any[]>([])
    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    const [partsList, setPartsList] = useState<any[]>([])
    const [partsPkList, setPartsPkList] = useState<any[]>([])
    const [pk, setPk] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [partsName, setPartsName] = useState<string>('')
    const [type, setType] = useState<number>(0)
    const [location, setLocation] = useState<any[]>([])
    const [cost, setCost] = useState<number>()


    const [inputData, setInputData] = useObjectInput('CHANGE', {
        pk: '',
        material_name: '',
        material_type: '',
        location: [],
        using_mold: [],
        cost: 0,
        safe_stock: 0,
        material_spec: '',
    })

    useEffect(() => {

        if (getParameter('pk') !== '') {
            setPk(getParameter('pk'))
            setIsUpdate(true)
            getData()
        }

    }, [])

    const partsListLoad = useCallback(async () => {

        const res = await getRequest(`${SF_ENDPOINT}/api/v1/parts/type/list`, getToken(TOKEN_NAME))

        if (res === false) {
            // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')

                const list = res.results.info_list.map((v) => {
                    return v.name
                })
                list.push('부품 등록하기')
                const pk = res.results.info_list.map((v => {
                    return v.pk
                }))

                setPartsPkList(pk)
                setPartsList(list)


            } else {
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    }, [partsList, partsPkList])

    const getData = useCallback(async () => {

        const res = await getRequest(`${SF_ENDPOINT}/api/v1/parts/load?pk=` + getParameter('pk'), getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200 || res.status === '200') {
                const data = res.results

                setPk(data.pk)
                setLocation([{pk: data.location_pk, name: data.location_name}])
                setCost(data.parts_cost)
                setName(data.parts_name)
                console.log(data.parts_type_name)
                setPartsName(data.parts_type_name)
                console.log(partsPkList)
                console.log(partsList.indexOf(data.parts_type_name))
            } else {
                //TODO:  기타 오류
            }
        }
    }, [pk, partsList, essential, inputData, partsPkList, type, partsName])


    const onsubmitFormUpdate = useCallback(async () => {
        console.log(type)

        if (name.trim() === '') {
            alert('부품 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (partsPkList[type].trim() === '' || partsPkList[type] === undefined) {
            alert('부품 종류는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (location === undefined || location[0]?.pk === undefined || location[0]?.pk === '') {
            alert('공장 정보는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (cost === null || cost === undefined || String(cost).trim() === '' || cost === 0) {
            alert('원가는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const data = {
            pk: getParameter('pk'),
            parts_name: name,
            parts_type: partsPkList[type],
            location: location[0].pk,
            parts_cost: cost
        }

        const res = await postRequest(`${SF_ENDPOINT}/api/v1/parts/update`, data, getToken(TOKEN_NAME))

        if (res === false) {
            // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                history.push('/basic/list/parts')
            } else {
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    }, [pk, location, name, type, cost, partsPkList])

    const onsubmitForm = useCallback(async () => {
        if (name.trim() === '') {
            alert('부품 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (partsPkList[type].trim() === '' || partsPkList[type] === undefined) {
            alert('부품 종류는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (location === undefined || location[0]?.pk === undefined || location[0]?.pk === '') {
            alert('공장 정보는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (cost === null || cost === undefined || String(cost).trim() === '') {
            alert('원가는 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const data = {
            parts_name: name,
            parts_type: partsPkList[type],
            location: location[0].pk,
            parts_cost: cost
        }

        const res = await postRequest(`${SF_ENDPOINT}/api/v1/parts/register`, data, getToken(TOKEN_NAME))

        if (res === false) {
            // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                history.push('/basic/list/parts')
            } else {
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    }, [name, type, location, cost])


    const partsRegister = useCallback(async () => {
        if (partsName === '' || partsName === null || partsName === undefined || partsName.trim() === '') {
            alert('파츠 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const data = {
            name: partsName
        }

        const res = await postRequest(`${SF_ENDPOINT}/api/v1/parts/type/register`, data, getToken(TOKEN_NAME))

        if (res === false) {
            // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                partsListLoad()
            } else {
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    }, [partsList, partsPkList, partsName])

    const partsDelete = useCallback(async () => {

        const data = {
            pk: partsPkList[type]
        }

        const res = await postRequest(`${SF_ENDPOINT}/api/v1/parts/type/delete`, data, getToken(TOKEN_NAME))

        if (res === false) {
            // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                partsListLoad()
                setType(0)
            } else {
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    }, [partsList, partsPkList, type])

    const partsUpdate = useCallback(async () => {

        if (partsName === '' || partsName === null || partsName === undefined || partsName.trim() === '') {
            alert('파츠 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (partsPkList[type].trim() === '' || partsPkList[type] === undefined) {
            alert('부품 종류는 필수 항목입니다. 반드시 선택해주세요.')
            return
        }

        const data = {
            pk: partsPkList[type],
            name: partsName
        }
        const res = await postRequest(`${SF_ENDPOINT}/api/v1/parts/type/update`, data, getToken(TOKEN_NAME))

        if (res === false) {
            // //alert('[SERVER ERROR] 요청을 처리 할 수 없습니다')
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                partsListLoad()
            } else {
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }
    }, [partsList, partsPkList, type, partsName])

    useEffect(() => {
        partsListLoad()
    }, [])

    useEffect(() => {
        if (partsList[type] === '부품 등록하기') {
            setPartsName('')
        } else {
            setPartsName(partsList[type])
        }
    }, [type])

    useEffect(() => {
        if (partsList[type] !== '부품 등록하기' || partsList[type] === undefined) {
            // setType(partsList.indexOf(partsName))
        } else {
            return
        }
    }, [partsList, partsName])

    useEffect(() => {
        console.log(type)
    }, [type])

    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <Header title={isUpdate ? '부품 정보수정' : '부품 정보등록'}/>
                <WhiteBoxContainer>
                    {
                        <>
                            <ListHeader title="필수 항목"/>
                            <NormalInput title={'부품 이름'} value={name} onChangeEvent={(input) => setName(input)}
                                         description={'이름을 입력해주세요.'}/>
                            <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <div style={{width: '60%', marginRight: 20}}>
                                    <DropdownInput title={'부품 종류'} target={partsList[type]} contents={partsList}
                                                   onChangeEvent={(input) => setType(input)}/>
                                </div>
                                {console.log(partsList[type])}
                                <NormalInput title={'부품 이름'}
                                             width={partsList[type] === '부품 등록하기' || partsList[type] === undefined ? 140 : 80}
                                             value={partsName} onChangeEvent={(input) => {
                                    console.log(input)
                                    setPartsName(input)
                                }} description={'부품명을 입력하세요'}/>
                                <div
                                    style={{marginLeft: partsList[type] === '부품 등록하기' || partsList[type] === undefined ? 30 : 10}}>
                                    {partsList[type] === undefined || partsList[type] === '부품 등록하기' ?
                                        <SmallButton name={'등록'} color={'#dddddd'} onClickEvent={() => partsRegister()}
                                                     ButtonStyle={{width: 60, padding: '7px 0'}}/>
                                        :
                                        <div style={{display: 'flex'}}>
                                            <div style={{marginRight: 15}}>
                                                <SmallButton name={'수정'} color={'#dddddd'}
                                                             onClickEvent={() => partsUpdate()}/>
                                            </div>
                                            <SmallButton name={'삭제'} color={'#dddddd'}
                                                         onClickEvent={() => partsDelete()}/>
                                        </div>
                                    }
                                </div>
                            </div>
                            <BasicSearchContainer
                                title={'공장 정보'}
                                key={'pk'}
                                value={'name'}
                                onChangeEvent={(input) => setLocation(input)}
                                option={0}
                                solo={true}
                                list={location}
                                searchUrl={`${SF_ENDPOINT}/api/v1/factory/search?`}
                            />

                            <NormalNumberInput title={'원가'} value={cost} onChangeEvent={(input) => setCost(input)}
                                               description={'원가를 입력해주세요.'}/>

                            {/*<br/>*/}
                            {/*<ListHeader title="선택 항목"/>*/}
                            {/*<NormalInput title={'품목 스펙'}  value={inputData.material_spec} onChangeEvent={(input)=>setInputData(`material_spec`, input)} description={'이름을 입력해주세요.'}/>*/}

                            {/*<br/>*/}
                            {/*<DocumentFormatInputList*/}
                            {/*  pk={!isUpdate ? document.pk : undefined}*/}
                            {/*  loadDataUrl={isUpdate? `${client}/v1/material/load?pk=${pk}` :''}*/}
                            {/*  onChangeEssential={setEssential} onChangeOptional={setOptional}*/}
                            {/*  />*/}

                            {/*<BasicSearchContainer*/}
                            {/*    title={'사용 금형'}*/}
                            {/*    key={'pk'}*/}
                            {/*    value={'mold_name'}*/}
                            {/*    onChangeEvent={(input)=>setInputData(`using_mold`, input)}*/}
                            {/*    solo={true}*/}
                            {/*    list={inputData.using_mold}*/}
                            {/*    searchUrl={`${client}/v1/mold/search?`}*/}
                            {/*/>*/}

                            <div style={{marginTop: 72, marginLeft: 340}}>
                                {isUpdate ?
                                    <ButtonWrap onClick={async () => {
                                        await onsubmitFormUpdate()
                                    }}>
                                        <div style={{
                                            width: 360,
                                            height: 46,
                                            boxSizing: 'border-box',
                                            paddingTop: '9px'
                                        }}>
                                            <p style={{fontSize: 18}}>수정하기</p>
                                        </div>
                                    </ButtonWrap>
                                    :
                                    <ButtonWrap onClick={async () => {
                                        await onsubmitForm()
                                    }}>
                                        <div style={{
                                            width: 360,
                                            height: 46,
                                            boxSizing: 'border-box',
                                            paddingTop: '9px'
                                        }}>
                                            <p style={{fontSize: 18}}>등록하기</p>
                                        </div>
                                    </ButtonWrap>
                                }
                            </div>
                        </>
                        // :
                        //
                        // <SelectDocumentForm category={3} onChangeEvent={setDocument}/>
                    }
                </WhiteBoxContainer>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
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

export default BasicPartsRegister
