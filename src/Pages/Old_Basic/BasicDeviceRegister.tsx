import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB2, POINT_COLOR, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import NormalInput from '../../Components/Input/NormalInput'
import RegisterButton from '../../Components/Button/RegisterButton'
import NormalFileInput from '../../Components/Input/NormalFileInput'
import {getToken} from '../../Common/tokenFunctions'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import DropdownInput from '../../Components/Input/DropdownInput'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import {uploadTempFile} from '../../Common/fileFuctuons'
import {getSubMachineTypeList, transferCodeToName, transferStringToCode} from '../../Common/codeTransferFunctions'
import DateInput from '../../Components/Input/DateInput'
import moment from 'moment'
import ListHeader from '../../Components/Text/ListHeader'
import OldFileInput from '../../Components/Input/OldFileInput'
import BasicSearchContainer from '../../Containers/Old_Basic/BasicSearchContainer'
import {JsonStringifyList} from '../../Functions/JsonStringifyList'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import {API_URLS, getBasicList, registerBasicItem} from "../../Api/mes/basic";

// 주변 장치 페이지
const BasicDeviceRegister = () => {

    const [document, setDocument] = useState<any>({id: '', value: '(선택)'})
    const [documentList, setDocumentList] = useState<any[]>([])

    const [essential, setEssential] = useState<any[]>([])
    const [optional, setOptional] = useState<any[]>([])

    const [pk, setPk] = useState<string>('')
    const [made, setMade] = useState<string>('')
    const [info, setInfo] = useState<string>('')
    const [infoList, setInfoList] = useState<IInfo[]>([])
    const [name, setName] = useState<string>('')
    const [type, setType] = useState<number>(0) //1: 프레스
    const [madeNo, setMadeNo] = useState<string>('')
    const [photoName, setPhotoName] = useState<string>('')
    const [factory, setFactory] = useState<any[]>([])

    const [files, setFiles] = useState<any[3]>([null, null, null])
    const [paths, setPaths] = useState<any[3]>([null, null, null])
    const [oldPaths, setOldPaths] = useState<any[3]>([null, null, null])
    const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    const indexList = getSubMachineTypeList('kor')
    const history = useHistory()

    useEffect(() => {

        if (getParameter('pk') !== '') {
            setPk(getParameter('pk'))
            ////alert(`수정 페이지 진입 - pk :` + param)
            setIsUpdate(true)
            getData()
        }

    }, [])


    /**
     * addFiles()
     * 사진 등록
     * @param {object(file)} event.target.files[0] 파일
     * @returns X
     */
    const addFiles = async (event: any, index: number): Promise<void> => {
        if (event.target.files[0] === undefined) {

            return
        }
        if (event.target.files[0].type.includes('image')) { //이미지인지 판별

            const tempFile = event.target.files[0]
            const res = await uploadTempFile(event.target.files[0])

            if (res !== false) {
                const tempPatchList = paths.slice()
                tempPatchList[index] = res
                setPaths(tempPatchList)
                return
            } else {
                return
            }

        } else {

            //alert('이미지 형식만 업로드 가능합니다.')
        }

    }


    const getData = useCallback(async () => {

        const tempUrl = `${API_URLS['device'].load}?pk=${getParameter('pk')}`
        const res = await getBasicList(tempUrl)

        if (res) {
            const data = res
            setName(data.device_name)
            setMade(data.manufacturer)
            setPhotoName(data.photo)
            setDate(data.manufactured_at)
            setPk(data.pk)
            setFactory([{pk: data.location_pk, name: data.location_name}])
            setMadeNo(data.manufacturer_code)
            setType(Number(data.device_type))
            setInfoList(data.info_list)
            const tempList = paths.slice()
            tempList[0] = data.photo
            tempList[1] = data.qualification
            tempList[2] = data.capacity
            setOldPaths(tempList)
        }
    }, [pk, made, madeNo, date, type, photoName, name, oldPaths, infoList, paths, essential, optional, factory])


    const onsubmitFormUpdate = useCallback(async () => {


        if (name.trim() === '') {
            alert('장치 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (type === 0) {
            alert('장치 종류는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (madeNo.trim() === '') {
            alert('제조(제품)번호 는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (factory === undefined || factory[0]?.pk === undefined || factory[0]?.pk === '') {
            alert('공장은 필수 항목입니다. 반드시 입력해주세요.')
            return
        }

        const data = {
            pk: getParameter('pk'),

            device_name: name,
            device_type: type,
            manufacturer: !made ? made : made.trim(),
            manufacturer_code: madeNo,
            manufactured_at: date,
            location: factory[0].pk,
            info_list: JsonStringifyList(essential, optional),
            photo: paths[0],
            qualification: paths[1],
            capacity: paths[2]
        }

        const tempUrl = `${API_URLS['device'].update}`
        const res = await registerBasicItem(tempUrl, data)


        if (res) {
            //alert('성공적으로 수정 되었습니다');
            history.push('/basic/list/device')
        }

    }, [pk, made, madeNo, name, type, date, madeNo, infoList, paths, essential, optional, factory])

    /**
     * onsubmitForm()
     * 기계 정보 등록
     */
    const onsubmitForm = useCallback(async () => {
        //console.log(infoList)
        ////alert(JSON.stringify(infoList))
        //console.log(JSON.stringify(infoList))
        if (name.trim() === '') {
            alert('장치 이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (type === 0) {
            alert('장치 종류는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (madeNo.trim() === '') {
            alert('제조(제품)번호 는 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (factory === undefined || factory[0]?.pk === undefined || factory[0]?.pk === '') {
            alert('공장은 필수 항목입니다. 반드시 입력해주세요.')
            return
        }
        const data = {
            document_pk: document.pk,
            device_name: name,
            device_type: type,
            manufacturer: !made ? made : made.trim(),
            manufacturer_code: madeNo,
            manufactured_at: date,
            location: factory[0].pk,
            info_list: JsonStringifyList(essential, optional),
            photo: paths[0],
            qualification: paths[1],
            capacity: paths[2]
        }


        const tempUrl = `${API_URLS['device'].create}`
        const res = await registerBasicItem(tempUrl, data)

        if (res) {
            //alert('성공적으로 등록 되었습니다')
            history.push('/basic/list/device')
        }

    }, [pk, made, madeNo, document, date, name, type, madeNo, infoList, paths, essential, optional, factory])


    return (
        <DashboardWrapContainer index={'basic'}>

            <InnerBodyContainer>
                <Header title={isUpdate ? '주변장치 정보수정' : '주변장치 정보등록'}/>
                <WhiteBoxContainer>
                    {
                        // document.id !== '' || isUpdate == true?
                        <div>
                            <ListHeader title="필수 항목"/>
                            <NormalInput title={'장치 이름'} value={name} onChangeEvent={setName}
                                         description={'장치 이름을 입력하세요'}/>
                            <DropdownInput title={'장치 종류'} target={transferCodeToName('device', type)}
                                           contents={indexList}
                                           onChangeEvent={(v) => setType(transferStringToCode('device', indexList[v]))}
                                           style={{width: 'calc(100% - 157px)'}}
                                           buttonStyle={{right: 0}} inputStyle={{boxSizing: 'border-box'}}
                                           selectStyle={{boxSizing: 'border-box'}}/>
                            <DateInput title={'제조 연월'} description={''} value={date} onChangeEvent={setDate}
                                       style={{width: 'calc(100% - 157px)'}} inputStyle={{boxSizing: 'border-box'}}/>
                            <NormalInput title={'제조(제품) 번호'} value={madeNo} onChangeEvent={setMadeNo}
                                         description={'제조사가 발급한 제조사 번호를 입력하세요 (장치에 부착되어있음)'}/>

                            <BasicSearchContainer
                                title={'공장/부속공장'}
                                key={'pk'}
                                value={'name'}
                                onChangeEvent={
                                    (input) => {
                                        setFactory(input)
                                    }
                                }
                                option={1}
                                solo={true}
                                list={factory}
                                searchUrl={`${SF_ENDPOINT}/api/v1/factory/search?limit=15&`}
                            />
                            <br/>
                            <ListHeader title="선택 항목"/>
                            <NormalInput title={'제조사'} value={made} onChangeEvent={setMade}
                                         description={' 제조사명을 입력하세요'}/>

                            <NormalFileInput title={'장치 사진'} name={paths[0]} thisId={'machinePhoto0'}
                                             onChangeEvent={(e) => addFiles(e, 0)}
                                             description={isUpdate ? oldPaths[0] : '장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}
                                             style={{width: 'calc(100% - 124px)'}}/>
                            <NormalFileInput title={'스펙명판 사진'} name={paths[1]} thisId={'machinePhoto1'}
                                             onChangeEvent={(e) => addFiles(e, 1)}
                                             description={isUpdate ? oldPaths[1] : '장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}
                                             style={{width: 'calc(100% - 124px)'}}/>
                            <NormalFileInput title={'능력명판 사진'} name={paths[2]} thisId={'machinePhoto2'}
                                             onChangeEvent={(e) => addFiles(e, 2)}
                                             description={isUpdate ? oldPaths[2] : '장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}
                                             style={{width: 'calc(100% - 124px)'}}/>
                            {
                                isUpdate ?
                                    <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths}
                                                  nameList={['장치사진', '스펙명판', '능력명판']}
                                                  isImage={true}/>

                                    :
                                    null
                            }
                            {/*<br/>*/}
                            {/*<DocumentFormatInputList*/}

                            {/*  pk={!isUpdate ? document.pk : undefined}*/}
                            {/*  loadDataUrl={isUpdate? `http://255.255.255.255:8299/api/v1/device/load?pk=${pk}` :''}*/}
                            {/*  onChangeEssential={setEssential} onChangeOptional={setOptional}*/}
                            {/*  />*/}

                            {isUpdate ?
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <ButtonWrap onClick={async () => {
                                        await onsubmitFormUpdate()
                                    }}>
                                        <div style={{}}>
                                            <p style={{fontSize: 18}}>수정하기</p>
                                        </div>
                                    </ButtonWrap>
                                </div>
                                :
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <ButtonWrap onClick={async () => {
                                        await onsubmitForm()
                                    }}>
                                        <div style={{}}>
                                            <p style={{fontSize: 18}}>등록하기</p>
                                        </div>
                                    </ButtonWrap>
                                </div>
                            }
                        </div>

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
    margin-top: 30px;
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    width: 360px;
    height: 46px;
    box-sizing: border-box;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
  `


export default BasicDeviceRegister
