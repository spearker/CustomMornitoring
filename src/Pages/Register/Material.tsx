import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB2, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import RegisterButton from '../../Components/Button/RegisterButton'
import {getToken} from '../../Common/tokenFunctions'
import SubNavigation from '../../Components/Navigation/SubNavigation'
import {ROUTER_MENU_LIST} from '../../Common/routerset'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import DropdownInput from '../../Components/Input/DropdownInput'
import CustomIndexInput from '../../Components/Input/CustomIndexInput'
import FullAddInput from '../../Components/Input/FullAddInput'
import {getMaterialTypeList} from '../../Common/codeTransferFunctions'
import ListHeader from '../../Components/Text/ListHeader'

interface IInfo {
    title: string,
    value: string,
}

// 자재등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const RegisterMaterial = () => {

    const [pk, setPk] = useState<string>('')
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [made, setMade] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [spec, setSpec] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [info, setInfo] = useState<IInfo[]>([])
    const [amount, setAmount] = useState<number>(0)
    const [type, setType] = useState<number>(0)
    const indexList = getMaterialTypeList('kor')

    //검색관련
    const [isPoupup, setIsPoupup] = useState<boolean>(false)
    const [isSearched, setIsSearched] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>('')
    const [checkList, setCheckList] = useState<IMold[]>([])
    const [list, setList] = useState<IMold[]>([])
    const [searchList, setSearchList] = useState<IMold[]>([])


    useEffect(() => {
        //setIsSearched(true)
        //setSearchList(dataSet.moldList);
        if (getParameter('pk') !== '') {
            setPk(getParameter('pk'))
            ////alert(`수정 페이지 진입 - pk :` + param)
            setIsUpdate(true)
            getData()
        }

    }, [])

    /**
     * getData()
     * 자재 정보 수정을 위한 조회
     * @param {string} url 요청 주소
     * @param {string} pk 자재 pk
     * @returns X
     */
    const getData = useCallback(async () => {

        const res = await getRequest('http://255.255.255.255:8299/api/v1/material/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                const data = res.results

                setType(data.material_type)
                setName(data.material_name)
                setMade(data.distributor)
                setCode(data.material_code)
                setSpec(data.material_spec)
                setPk(data.pk)
                setInfo(data.info_list)

            } else if (res.status === 1001 || res.data.status === 1002) {
                //TODO:  아이디 존재 확인
            } else {
                //TODO:  기타 오류
            }
        }
    }, [pk, made, code, info, spec, name, list])

    /**
     * onsubmitForm()
     * 자재 정보 등록
     * @param {string} url 요청 주소
     * @param {string} name 이름
     * @param {array} info 항목 리스트
     * @param {string} made 유통사
     * @param {string} spec 종류
     * @param {string} code 코드
     * @returns X
     */
    const onsubmitForm = useCallback(async (e) => {
        e.preventDefault()
        //TODO: 지울것
        ////alert(info)
        if (name == '') {
            //alert('자재 이름은 필수 항목입니다. ')
            return
        }


        let moldPk = new Array()
        if (list.length > 0) {
            moldPk.push(list[0].pk)
        }
        let infoString
        if (info.length > 0) {
            infoString = JSON.stringify(info)
        }
        ////alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
        //return;
        const data = {
            material_name: name,
            material_code: code,
            material_spec: spec,
            material_type: type,
            stock: amount,

            distributor: made,
            info_list: infoString
        }

        const res = await postRequest('http://255.255.255.255:8299/api/v1/material/register', data, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                setName('')
                setCode('')
                setSpec('')

                setType(0)
                setMade('')
                setInfo([])

            } else {
                //alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
                //TODO:  기타 오류
            }
        }

    }, [made, code, amount, name, spec, info, pk])


    /**
     * onsubmitFormUpdate()
     * 자재 정보 수정
     * @param {string} url 요청 주소
     * @param {string} pk pk
     * @param {string} name 이름
     * @param {array} info 항목 리스트
     * @param {string} made 유통사
     * @param {string} spec 종류
     * @param {string} code 코드
     * @returns X
     */
    const onsubmitFormUpdate = useCallback(async (e) => {
        e.preventDefault()
        //TODO: 지울것
        ////alert('테스트 : 전송 - ' + pk +  code + name + info + made + spec + info );
        //return;


        let infoString
        if (info.length > 0) {
            infoString = JSON.stringify(info)
        }
        let moldPk = new Array()
        if (list.length > 0) {
            moldPk.push(list[0].pk)
        }
        const data = {
            pk: pk,
            material_name: name,
            material_code: code,
            material_spec: spec,

            material_type: type,
            distributor: made,
            info_list: infoString,
        }

        const res = await postRequest('http://255.255.255.255:8299/api/v1/material/update', data, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                //alert('성공적으로 수정 되었습니다')
            } else {
                //TODO:  기타 오류
            }
        }

    }, [made, code, name, spec, info, pk, amount, list])


    return (
        <DashboardWrapContainer index={0}>
            <SubNavigation list={ROUTER_MENU_LIST[0]}/>
            <InnerBodyContainer>
                <Header title={isUpdate ? '자재 정보수정' : '자재 정보 등록 (원자재 / 반제품 / 완제품)'}/>
                <WhiteBoxContainer>
                    <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm}>
                        <ListHeader title="필수 항목"/>
                        <NormalInput title={'자재 이름'} value={name} onChangeEvent={setName} description={'이름을 입력하세요'}/>
                        <DropdownInput title={'자재 종류'} target={indexList[type]} contents={indexList}
                                       onChangeEvent={(v) => setType(v)}/>
                        <br/>
                        <ListHeader title="선택 항목"/>
                        <NormalInput title={'자재 코드'} value={code} onChangeEvent={setCode}
                                     description={'제조번호 혹은 공유 코드를 입력하세요'}/>
                        <NormalInput title={'스펙'} value={spec} onChangeEvent={setSpec}
                                     description={'자재의 상세 스펙(설명)을 입력하세요'}/>
                        <NormalInput title={'유통사'} value={made} onChangeEvent={setMade} description={'유통사를 입력하세요'}/>


                        <FullAddInput title={'자유 항목'} onChangeEvent={() => {
                            const tempInfo = info.slice()
                            tempInfo.push({title: `자유 항목 ${info.length + 1}`, value: ''})
                            setInfo(tempInfo)
                        }}>
                            {
                                info.map((v: IInfo, i) => {
                                    return (
                                        <CustomIndexInput index={i} value={v}
                                                          onRemoveEvent={() => {
                                                              const tempInfo = info.slice()
                                                              tempInfo.splice(i, 1)
                                                              setInfo(tempInfo)
                                                          }}
                                                          onChangeEvent={(obj: IInfo) => {
                                                              const tempInfo = info.slice()
                                                              tempInfo.splice(i, 1, obj)
                                                              setInfo(tempInfo)
                                                          }}
                                        />
                                    )
                                })
                            }
                        </FullAddInput>

                        <RegisterButton name={isUpdate ? '수정하기' : '등록하기'}/>
                    </form>
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


export default RegisterMaterial
