import React, { useCallback, useEffect, useState } from 'react';
import Styled from 'styled-components'
import { BG_COLOR_SUB2, TOKEN_NAME } from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import { getToken } from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import DropdownInput from '../../Components/Input/DropdownInput';
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';
import FullAddInput from '../../Components/Input/FullAddInput';
import CustomIndexInput from '../../Components/Input/CustomIndexInput';
import { uploadTempFile } from '../../Common/fileFuctuons';
import { getMachineTypeList } from '../../Common/codeTransferFunctions';
import DateInput from '../../Components/Input/DateInput';
import moment from 'moment';
import ListHeader from '../../Components/Text/ListHeader';
import OldFileInput from '../../Components/Input/OldFileInput';

// 기계 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const RegisterMachine = () => {

  const [ pk, setPk ] = useState<string>('');
  const [ made, setMade ] = useState<string>('');
  const [ info, setInfo ] = useState<string>('');
  const [ infoList, setInfoList ] = useState<IInfo[]>([]);
  const [ name, setName ] = useState<string>('');
  const [ type, setType ] = useState<number>(1); //1: 프레스
  const [ madeNo, setMadeNo ] = useState<string>('');
  const [ photoName, setPhotoName ] = useState<string>('');

  const [ files, setFiles ] = useState<any[3]>([ null, null, null ]);
  const [ paths, setPaths ] = useState<any[3]>([ null, null, null ]);
  const [ oldPaths, setOldPaths ] = useState<any[3]>([ null, null, null ]);
  const [ date, setDate ] = useState<string>(moment().format('YYYY-MM-DD'));
  const [ isUpdate, setIsUpdate ] = useState<boolean>(false);

  const indexList = getMachineTypeList('kor');

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
   * 기계 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @returns X
   */
  const getData = useCallback(async () => {

    const res = await getRequest('http://203.234.183.22:8299/api/v1/machine/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200 || res.status === "200") {
        const data = res.results;
        setName(data.machine_name);
        setMade(data.manufacturer);
        setPhotoName(data.machine_photo);
        setDate(data.manufactured_at);
        setPk(data.pk);
        setMadeNo(data.manufacturer_code);
        setType(Number(data.machine_label));
        setInfoList(data.info_list)
        const tempList = paths.slice();
        tempList[0] = data.machine_photo;
        tempList[1] = data.qualification_nameplate;
        tempList[2] = data.capacity_nameplate;
        setOldPaths(tempList);


      } else {
        //TODO:  기타 오류
      }
    }
  }, [ pk, made, madeNo, date, type, photoName, name, oldPaths, infoList, paths ])

  /**
   * onsubmitFormUpdate()
   * 기계 정보 수정 요청
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
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
      machine_name: name,
      machine_label: type,
      manufacturer: made,
      manufacturer_code: madeNo,
      manufactured_at: date,
      info_list: infoList.length > 0 ? JSON.stringify(infoList) : null,
      machine_photo: paths[0],
      qualification_nameplate: paths[1],
      capacity_nameplate: paths[2]
    };

    const res = await postRequest('http://203.234.183.22:8299/api/v1/machine/update/', data, getToken(TOKEN_NAME))

    if (res === false) {
      ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
    } else {
      if (res.status === 200) {
        //alert('성공적으로 수정 되었습니다')
      } else {
        ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  }, [ pk, made, madeNo, name, type, date, madeNo, infoList, paths, ])

  /**
   * onsubmitForm()
   * 기계 정보 등록
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
    //console.log(infoList)
    ////alert(JSON.stringify(infoList))
    //console.log(JSON.stringify(infoList))
    if (name === "") {
      //alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
      machine_name: name,
      machine_label: type,
      manufacturer: made,
      manufacturer_code: madeNo,
      manufactured_at: date,
      info_list: infoList.length > 0 ? JSON.stringify(infoList) : null,
      machine_photo: paths[0],
      qualification_nameplate: paths[1],
      capacity_nameplate: paths[2]
    };


    const res = await postRequest('http://203.234.183.22:8299/api/v1/machine/register', data, getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200) {
        //alert('성공적으로 등록 되었습니다')
        setName('');
        setMade('');
        setPhotoName('');
        setDate(moment().format('YYYY-MM-DD'))
        setPk('');
        setMadeNo('');
        setType(1);
        setInfoList([]);
        setPaths([ null, null, null ])

      } else {
        //TODO:  기타 오류
      }
    }

  }, [ pk, made, madeNo, date, name, type, madeNo, infoList, paths, ])


  return (
      <DashboardWrapContainer index={0}>
        <SubNavigation list={ROUTER_MENU_LIST[0]}/>
        <InnerBodyContainer>
          <Header title={isUpdate ? '기계 정보수정' : '기계 정보등록'}/>
          <WhiteBoxContainer>
            <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm}>
              <ListHeader title="필수 항목"/>
              <NormalInput title={'기계 이름'} value={name} onChangeEvent={setName} description={'고객사가 보유한 기계의 이름을 입력하세요'}/>
              <DropdownInput title={'기계 종류'} target={indexList[type]} contents={indexList}
                             onChangeEvent={(v) => setType(v)}/>
              <DateInput title={'제조 연월'} description={""} value={date} onChangeEvent={setDate}/>
              <NormalInput title={'제조(제품) 번호'} value={madeNo} onChangeEvent={setMadeNo}
                           description={'기계의 제조사가 발급한 제조사 번호를 입력하세요 (기계에 부착되어있음)'}/>
              <br/>
              <ListHeader title="선택 항목"/>
              <NormalInput title={'제조사'} value={made} onChangeEvent={setMade} description={'기계의 제조사명을 입력하세요'}/>

              <NormalFileInput title={'기계 사진'} name={paths[0]} thisId={'machinePhoto0'}
                               onChangeEvent={(e) => addFiles(e, 0)}
                               description={isUpdate ? oldPaths[0] : '기계 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}/>
              <NormalFileInput title={'스펙명판 사진'} name={paths[1]} thisId={'machinePhoto1'}
                               onChangeEvent={(e) => addFiles(e, 1)}
                               description={isUpdate ? oldPaths[1] : '기계 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}/>
              <NormalFileInput title={'능력명판 사진'} name={paths[2]} thisId={'machinePhoto2'}
                               onChangeEvent={(e) => addFiles(e, 2)}
                               description={isUpdate ? oldPaths[2] : '기계 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'}/>
              {
                isUpdate ?
                    <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={[ '기계사진', '스펙명판', '능력명판' ]}
                                  isImage={true}/>

                    :
                    null
              }

              {/* 자유항목 입력 창 */}
              <FullAddInput title={'자유 항목'} onChangeEvent={() => {
                const tempInfo = infoList.slice();
                tempInfo.push({ title: `자유 항목 ${infoList.length + 1}`, value: "" });
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


export default RegisterMachine;
