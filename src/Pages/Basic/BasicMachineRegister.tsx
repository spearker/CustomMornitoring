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
import {getMachineTypeList} from '../../Common/codeTransferFunctions'
import DateInput from '../../Components/Input/DateInput'
import moment from 'moment'
import ListHeader from '../../Components/Text/ListHeader'
import OldFileInput from '../../Components/Input/OldFileInput'
import BasicSearchContainer from '../../Containers/Old_Basic/BasicSearchContainer'
import {JsonStringifyList} from '../../Functions/JsonStringifyList'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import {useHistory} from 'react-router-dom'
import {SF_ENDPOINT} from '../../Api/SF_endpoint'
import {API_URLS, getBasicList, registerBasicItem} from "../../Api/mes/basic";

const docDummy = [
    {pk: 'qfqwf', name: '도큐먼트 1'},
    {pk: 'ehki', name: '도큐먼트 2'},
    {pk: 'qfqw412f', name: '도큐먼트 3'},
    {pk: 'efgrhtjyu', name: '도큐먼트 4'},
    {pk: 'kmcd', name: '도큐먼트 5'},
]
// 기계 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const BasicMachineRegister = () => {
    const history = useHistory()

    const [document, setDocument] = useState<any>({pk: '', value: '(선택)'})


    const [essential, setEssential] = useState<any[]>([])
    const [optional, setOptional] = useState<any[]>([])

    const [pk, setPk] = useState<string>('')
    const [made, setMade] = useState<string>('')
    const [info, setInfo] = useState<string>('')
    const [infoList, setInfoList] = useState<IInfo[]>([])
    const [name, setName] = useState<string>('')
    const [type, setType] = useState<number>(1) //1: 프레스
    const [madeNo, setMadeNo] = useState<string>('')
    const [photoName, setPhotoName] = useState<string>('')
    const [factory, setFactory] = useState<any[]>([])
    const [volt, setVolt] = useState<number>(0)
    const [tons, setTons] = useState<number>(0)
    const [files, setFiles] = useState<any[3]>([null, null, null])
    const [paths, setPaths] = useState<any[3]>([null, null, null])
    const [oldPaths, setOldPaths] = useState<any[3]>([null, null, null])
    const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [isUpdate, setIsUpdate] = useState<boolean>(false)

    const indexList = getMachineTypeList('kor')

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


        const tempUrl = `${API_URLS['machine'].load}?pk=${getParameter('pk')}`
        const res = await getBasicList(tempUrl)

        if (res) {
            setName(res.machine_name)
            setMade(res.manufacturer)
            setPhotoName(res.photo)
            setDate(res.manufactured_at)
            setPk(res.pk)
            setFactory([{pk: res.location_pk, name: res.location_name}])
            setMadeNo(res.manufacturer_code)
            setType(Number(res.machine_type))
            setInfoList(res.info_list)
            setVolt(res.volt ?? 0)
            setTons(res.tons ?? 0)
            const tempList = oldPaths.slice()
            tempList[0] = res.photo
            tempList[1] = res.qualification
            tempList[2] = res.capacity
            setOldPaths(tempList)
        }
    }, [pk, made, madeNo, date, volt, tons, type, photoName, name, oldPaths, infoList, paths, essential, optional, factory])


    const onsubmitFormUpdate = useCallback(async () => {

        if (name.trim() === '') {
            alert('이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (type === 0) {
            alert('기계 종류는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (madeNo.trim() === '') {
            alert('제조 번호는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (volt.toString() === '' || volt < 0) {
            alert('전압은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (factory[0]?.pk === '' || factory[0]?.pk === undefined) {
            alert('공장은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (tons < 0) {
            alert('정상 톤 값이 음수 입니다.')
            return
        }

        const data = {
            pk: getParameter('pk'),
            machine_name: name,
            machine_type: type,
            manufacturer: !made ? made : made.trim(),
            manufacturer_code: madeNo,
            manufactured_at: date,

            location: factory[0].pk,
            info_list: JsonStringifyList(essential, optional),
            photo: paths[0],
            qualification: paths[1],
            capacity: paths[2],
            tons: tons,
            volt: volt,

        }

        const tempUrl = `${API_URLS['machine'].update}`
        const res = await registerBasicItem(tempUrl, data)

        if (res) {
            //alert('성공적으로 수정 되었습니다')
            history.push(`/basic/list/machine`)
        }

    }, [pk, made, madeNo, name, volt, tons, type, date, madeNo, infoList, paths, essential, optional, factory])

    /**
     * onsubmitForm()
     * 기계 정보 등록
     */
    const onsubmitForm = useCallback(async () => {

        //console.log(infoList)
        ////alert(JSON.stringify(infoList))
        //console.log(JSON.stringify(infoList))
        if (name.trim() === '') {
            alert('이름은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (type === 0) {
            alert('기계 종류는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (madeNo.trim() === '') {
            alert('제조 번호는 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (volt.toString() === '' || volt < 0) {
            alert('전압은 필수 항목입니다. 반드시 입력해주세요.')
            return
        } else if (factory[0]?.pk === '' || factory[0]?.pk === undefined) {
            alert('공장은 필수 항목입니다. 반드시 선택해주세요.')
            return
        } else if (tons < 0) {
            alert('정상 톤 값이 음수 입니다.')
            return
        }

        const data = {
            // document_pk: document.pk,
            machine_name: name,
            machine_type: type,
            manufacturer: !made ? null : made.trim(),
            manufacturer_code: madeNo,
            manufactured_at: date,
            location: factory[0].pk,
            info_list: JsonStringifyList(essential, optional),
            photo: paths[0],
            qualification: paths[1],
            capacity: paths[2],
            tons: tons,
            volt: volt,
        }

        const tempUrl = `${API_URLS['machine'].create}`
        const res = await registerBasicItem(tempUrl, data)


        if (res) {
            //alert('성공적으로 등록 되었습니다')
            history.push(`/basic/list/machine`)
        }

    }, [pk, made, madeNo, volt, tons, document, date, name, type, madeNo, infoList, paths, essential, optional, factory])


    return (
        <DashboardWrapContainer index={'basic'}>

            <InnerBodyContainer>
                <Header title={isUpdate ? '기계 정보수정' : '기계 정보등록'}/>
                <WhiteBoxContainer>
                    {
                        // document.pk !== '' || isUpdate == true?
                        <div>
                            <ListHeader title="필수 항목"/>
                            <NormalInput title={'기계 이름'} value={name} onChangeEvent={setName}
                                         description={'고객사가 보유한 기계의 이름을 입력하세요'}/>
                            <DropdownInput title={'기계 종류'} target={indexList[type]} contents={indexList}
                                           onChangeEvent={(v) => setType(v)} style={{width: 'calc(100% - 157px)'}}
                                           buttonStyle={{right: 0}} inputStyle={{boxSizing: 'border-box'}}
                                           selectStyle={{boxSizing: 'border-box'}}/>

                            <DateInput title={'제조 연월'} description={''} value={date} onChangeEvent={setDate}
                                       style={{width: 'calc(100% - 157px)'}} inputStyle={{boxSizing: 'border-box'}}/>
                            <NormalInput title={'제조(제품) 번호'} value={madeNo} onChangeEvent={setMadeNo}
                                         description={'기계의 제조사가 발급한 제조사 번호를 입력하세요 (기계에 부착되어있음)'}/>

                            <NormalNumberInput title={'전압'} value={volt} onChangeEvent={setVolt}
                                               description={'전압값을 입력해주세요'}/>

                            <BasicSearchContainer
                                title={'공장'}
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
                                searchUrl={`${SF_ENDPOINT}/api/v1/factory/search?`}
                            />
                            <br/>
                            <ListHeader title="선택 항목"/>
                            <NormalInput title={'제조사'} value={made} onChangeEvent={setMade}
                                         description={'기계의 제조사명을 입력하세요'}/>
                            {
                                type == 1 &&
                                <>
                                    {/*<NormalNumberInput title={'밀림 각도'} value={slip_angle} onChangeEvent={setSlip_angle} description={''} />*/}
                                    <NormalNumberInput title={'정상 톤 값'} value={tons} onChangeEvent={setTons}
                                                       description={'기계의 톤 값을 입력해주세요.'}/>
                                </>
                            }
                            <NormalFileInput title={'기계 사진'} name={paths[0]} thisId={'machinePhoto0'}
                                             onChangeEvent={(e) => addFiles(e, 0)}
                                             description={isUpdate ? oldPaths[0] : '기계를 사진으로 찍어 등록해주세요'}
                                             style={{width: 'calc(100% - 124px)'}}/>
                            <NormalFileInput title={'스펙명판 사진'} name={paths[1]} thisId={'machinePhoto1'}
                                             onChangeEvent={(e) => addFiles(e, 1)}
                                             description={isUpdate ? oldPaths[1] : '기계 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}
                                             style={{width: 'calc(100% - 124px)'}}/>
                            <NormalFileInput title={'능력명판 사진'} name={paths[2]} thisId={'machinePhoto2'}
                                             onChangeEvent={(e) => addFiles(e, 2)}
                                             description={isUpdate ? oldPaths[2] : '기계 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}
                                             style={{width: 'calc(100% - 124px)'}}/>
                            {
                                isUpdate ?
                                    <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths}
                                                  nameList={['기계사진', '스펙명판', '능력명판']}
                                                  isImage={true}/>
                                    : null
                            }
                            <br/>
                            {/*<DocumentFormatInputList*/}
                            {/*  pk={!isUpdate ? document.pk : undefined}*/}
                            {/*  loadDataUrl={isUpdate? `http://255.255.255.255:8299/api/v1/machine/load?pk=${pk}` :''}*/}
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
                        // :
                        // <SelectDocumentForm category={0} onChangeEvent={setDocument}/>

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
  background-color: ${BG_COLOR_SUB2};
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

export default BasicMachineRegister
