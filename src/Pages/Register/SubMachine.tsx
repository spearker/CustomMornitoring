import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import {getToken} from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions';
import DropdownInput from '../../Components/Input/DropdownInput';
import FullAddInput from '../../Components/Input/FullAddInput';
import CustomIndexInput from '../../Components/Input/CustomIndexInput';
import {getSubMachineTypeList} from '../../Common/codeTransferFunctions';
import {uploadTempFile} from '../../Common/fileFuctuons';
import ListHeader from '../../Components/Text/ListHeader';
import DateInput from '../../Components/Input/DateInput';
import moment from 'moment';
import OldFileInput from '../../Components/Input/OldFileInput';


// 주변장치 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const RegisterSubMachine = () => {

    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [pk, setPk] = useState<string>('');
    const [made, setMade] = useState<string>('');

    const [infoList, setInfoList] = useState<IInfo[]>([]);
    const [info, setInfo] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<number>(1); //1: 미스피드
    const [madeNo, setMadeNo] = useState<string>('');
    const [paths, setPaths] = useState<any[3]>([null, null, null]);
    const [oldPaths, setOldPaths] = useState<any[3]>([null, null, null]);
    const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const indexList = getSubMachineTypeList('kor');

    useEffect(() => {
        if (getParameter('pk') !== "") {
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
        console.log(event.target.files[0]);
        console.log(index)
        if (event.target.files[0] === undefined) {

            return;
        }
        console.log(event.target.files[0].type);
        if (event.target.files[0].type.includes('image')) { //이미지인지 판별

            const tempFile = event.target.files[0];
            console.log(tempFile)
            const res = await uploadTempFile(event.target.files[0]);

            if (res !== false) {
                console.log(res)
                const tempPatchList = paths.slice()
                tempPatchList[index] = res;
                console.log(tempPatchList)
                setPaths(tempPatchList)
                return
            } else {
                return
            }

        } else {

            //alert('이미지 형식만 업로드 가능합니다.')
        }

    }


    /**
     * getData()
     * 주변장치 정보 수정을 위한 조회
     * @param {string} url 요청 주소
     * @param {string} pk 장치 pk
     * @returns X
     */
    const getData = useCallback(async () => {

        const res = await getRequest('http://61.101.55.224:18299/api/v1/peripheral/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                const data = res.results;
                setName(data.device_name);
                setMade(data.manufacturer);
                setDate(data.manufactured_at);
                setPk(data.pk);
                setMadeNo(data.manufacturer_code);
                setType(Number(data.device_label - 50));
                setInfoList(data.info_list);
                const tempList = paths.slice();
                tempList[0] = data.device_photo;
                tempList[1] = data.qualification_nameplate;
                tempList[2] = data.capacity_nameplate;
                setOldPaths(tempList);
            } else {
                //TODO:  기타 오류
            }
        }
    }, [pk, made, madeNo, date, type, name, paths, oldPaths, infoList])

    /**
     * onsubmitFormUpdate()
     * 주변장치 정보 수정 요청
     * @param {string} url 요청 주소
     * @param {string} pk 장치 pk
     * @param {string} name 이름
     * @param {string} no 넘버
     * @param {object(file)} file 사진 파일
     * @param {string} info 상세정보
     * @param {string} made 제조정보
     * @param {string} type 종류
     * @param {string} madeNo 제조사넘버
     * @returns X
     */
    const onsubmitFormUpdate = useCallback(async (e) => {
        e.preventDefault();
        if (name === "") {
            //alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
            return;
        }
        const data = {
            pk: getParameter('pk'),
            device_name: name,
            device_label: type + 50,
            manufacturer: made,
            manufacturer_code: madeNo,
            manufactured_at: date,
            info_list: infoList.length > 0 ? JSON.stringify(infoList) : null,
            device_photo: paths[0],
            qualification_nameplate: paths[1],
            capacity_nameplate: paths[2]
        };


        const res = await postRequest('http://61.101.55.224:18299/api/v1/peripheral/update', data, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200 || res.status === '200') {
                //alert('성공적으로 수정 되었습니다')
            } else if (res.status === 1001) {
                //TODO:
            } else {
                //TODO:  기타 오류
            }
        }

    }, [pk, made, name, type, made, date, madeNo, infoList, paths])

    /**
     * onsubmitForm()
     * 장치 정보 등록
     * @param {string} url 요청 주소
     * @param {string} name 이름
     * @param {string} no 넘버
     * @param {string} info 상세정보
     * @param {string} made 제조정보
     * @param {string} type 종류
     * @param {string} madeNo 제조사넘버
     * @returns X
     */
    const onsubmitForm = useCallback(async (e) => {
        e.preventDefault();
        //TODO: 지울것
        ////alert('테스트 : 전송 - ' + no + name + info + made + type + madeNo);
        //return;
        if (name === "") {
            //alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
            return;
        }
        const data = {
            device_name: name,
            device_label: type + 50,
            manufacturer: made,
            manufacturer_code: madeNo,

            manufactured_at: date,
            info_list: infoList.length > 0 ? JSON.stringify(infoList) : null,
            device_photo: paths[0],
            qualification_nameplate: paths[1],
            capacity_nameplate: paths[2]
        };

        const res = await postRequest('http://61.101.55.224:18299/api/v1/peripheral/register' + pk, data, getToken(TOKEN_NAME))

        if (res === false) {
            ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                setName('');
                setMade('');
                setDate(moment().format('YYYY-MM-DD'));
                setPk('');
                setMadeNo('');
                setType(1);
                setInfoList([]);
                setPaths([null, null, null])

            } else {
                ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
            }
        }

    }, [made, infoList, name, type, date, madeNo, paths, madeNo])

    return (
        <DashboardWrapContainer index={0}>
            <SubNavigation list={ROUTER_MENU_LIST[0]}/>
            <InnerBodyContainer>
                <Header title={isUpdate ? '주변장치 정보수정' : '주변장치 정보등록'}/>
                <WhiteBoxContainer>
                    <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm}>
                        <ListHeader title="필수 항목"/>
                        <NormalInput title={'주변장치 이름'} value={name} onChangeEvent={setName}
                                     description={'고객사가 보유한 장치의 이름을 입력하세요'}/>
                        <DropdownInput title={'주변장치 종류'} target={indexList[type]} contents={indexList}
                                       onChangeEvent={(v) => setType(v)}/>
                        <DateInput title={'제조 연월'} description={""} value={date} onChangeEvent={setDate}/>
                        <NormalInput title={'제조(제품) 번호'} value={madeNo} onChangeEvent={setMadeNo}
                                     description={'기계의 제조사가 발급한 제조사 번호를 입력하세요 (기계에 부착되어있음)'}/>
                        <br/>
                        <ListHeader title="선택 항목"/>
                        <NormalInput title={'제조사 '} value={made} onChangeEvent={setMade}
                                     description={'장치의 제조사명을 입력하세요'}/>

                        <NormalFileInput title={'장치 사진'} name={paths[0]} thisId={'machinePhoto0'}
                                         onChangeEvent={(e) => addFiles(e, 0)}
                                         description={isUpdate ? oldPaths[0] : '장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}/>
                        <NormalFileInput title={'스펙명판 사진'} name={paths[1]} thisId={'machinePhoto1'}
                                         onChangeEvent={(e) => addFiles(e, 1)}
                                         description={isUpdate ? oldPaths[1] : '장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}/>
                        <NormalFileInput title={'능력명판 사진'} name={paths[2]} thisId={'machinePhoto2'}
                                         onChangeEvent={(e) => addFiles(e, 2)}
                                         description={isUpdate ? oldPaths[2] : '장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}/>
                        {
                            isUpdate ?
                                <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={['장치사진', '스펙명판', '능력명판']}
                                              isImage={true}/>

                                :
                                null
                        }

                        {/* 자유항목 입력 창 */}
                        <FullAddInput title={'자유 항목'} onChangeEvent={() => {
                            const tempInfo = infoList.slice();
                            tempInfo.push({title: `자유 항목 ${infoList.length + 1}`, value: ""});
                            setInfoList(tempInfo)
                        }}>
                            {
                                infoList.map((v: IInfo, i) => {
                                    return (
                                        <CustomIndexInput index={i} value={v}
                                                          onRemoveEvent={() => {
                                                              const tempInfo = infoList.slice();
                                                              tempInfo.splice(i, 1)
                                                              setInfoList(tempInfo)
                                                          }}
                                                          onChangeEvent={(obj: IInfo) => {
                                                              const tempInfo = infoList.slice();
                                                              tempInfo.splice(i, 1, obj)
                                                              setInfoList(tempInfo)
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

    );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default RegisterSubMachine;
