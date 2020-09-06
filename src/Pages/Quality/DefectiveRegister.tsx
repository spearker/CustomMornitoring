import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import { getToken } from '../../Common/tokenFunctions';
import BasicModal from '../../Containers/SearchModalContainer';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {    ROUTER_MENU_LIST } from '../../Common/routerset';
import DropdownInput from '../../Components/Input/DropdownInput';
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';
import IcButton from '../../Components/Button/IcButton';
import InputContainer from '../../Containers/InputContainer';
import FullAddInput from '../../Components/Input/FullAddInput';
import CustomIndexInput from '../../Components/Input/CustomIndexInput';
import { uploadTempFile } from '../../Common/fileFuctuons';
import {getMachineTypeList} from '../../Common/codeTransferFunctions';

// 불량자재 등록
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const DefectiveRegister = () => {

  const [pk, setPk] = useState<string>('');
  const [made, setMade] = useState<string>('');
  const [no, setNo] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [infoList, setInfoList] = useState<IInfo[]>([]);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<number>(1); //1: 프레스
  const [madeNo, setMadeNo] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');
  const [oldPhoto, setOldPhoto] = useState<string>('');
  const [file, setFile] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [path, setPath] = useState<string | null>(null);

  const indexList = getMachineTypeList('kor');

  useEffect(()=>{
    if(getParameter('pk') !== "" ){
      setPk(getParameter('pk'))
      //alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData()
    }

  },[])

  /**
   * addFile()
   * 사진 등록
   * @param {object(file)} event.target.files[0] 파일
   * @returns X
   */
  const addFile = async (event: any): Promise<void> => {
    console.log(event.target.files[0]);

    if(event.target.files[0] === undefined){
      setFile(null)
      setPath(null)
      setPhotoName("")
      return;
    }
    console.log(event.target.files[0].type);
    if(event.target.files[0].type.includes('image')){ //이미지인지 판별
      setFile(event.target.files[0])
      setPhotoName(event.target.files[0].name)
      console.log(file)
      const temp = await uploadTempFile(event.target.files[0]);
      if(temp ===false){
        console.log(temp)

        setFile(null)
        setPhotoName('')
        return
      }else{
        setPath(temp)
        return
      }

    }else{
      setPhotoName('')
      setFile(null)
      setPath(null)
      alert('이미지 형식만 업로드 가능합니다.')
    }

  }

  /**
   * getData()
   * 기계 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @returns X
   */
  const getData = useCallback(async()=>{

    const res = await getRequest('http://192.168.0.14:8088/api/v1/machine/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const data = res.results;
         setName(data.machine_name);
         setMade(data.manufacturer);
         setNo(data.machine_code);
         setPhotoName(data.machine_photo);
         setInfo(data.manufacturer_detail);
         setPk(data.pk);
         setMadeNo(data.manufacturer_code);
         setType(data.machine_label);
         setInfoList(data.info_list)
         setFile(null);
         setPath(null);

      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, made, no, info, type,photoName, name, file, infoList,path ])

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
  const onsubmitFormUpdate = useCallback(async(e)=>{
    e.preventDefault();
    if(name === "" ){
      alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
      pk: getParameter('pk'),
      machine_name: name,
      machine_label: type,
      machine_code: no,
      manufacturer: made,
      manufacturer_code: madeNo,
      manufacturer_detail: info,
      info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,
      machine_photo: path
    };

    const res = await postRequest('http://192.168.0.14:8088/api/v1/machine/update/', data, getToken(TOKEN_NAME))

    if(res === false){
      alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
    }else{
      if(res.status === 200){
          alert('성공적으로 수정 되었습니다')
      }else{
        alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  },[pk, made, no, name, type, info, file, photoName, madeNo, infoList, path])

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
  const onsubmitForm = useCallback(async(e)=>{
    e.preventDefault();
    console.log(infoList)
    //alert(JSON.stringify(infoList))
    console.log(JSON.stringify(infoList))
    if(name === "" ){
      alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
      machine_name: name,
      machine_label: type,
      machine_code: no,
      manufacturer: made,
      manufacturer_code: madeNo,
      manufacturer_detail: info,
      info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,
      machine_photo: path
    };


    const res = await postRequest('http://192.168.0.14:8088/api/v1/machine/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')
         setName('');
         setMade('');
         setNo('');
         setPhotoName('');
         setInfo('');
         setPk('');
         setMadeNo('');
         setType(1);
         setInfoList([]);
         setFile(null);
         setPath(null);
      }else{
        //TODO:  기타 오류
      }
    }

  },[made, no, name, type, info, photoName,file, madeNo, infoList, path])

  return (
      <DashboardWrapContainer index={9}>
        <SubNavigation list={ROUTER_MENU_LIST[9]}/>
        <InnerBodyContainer>
            <Header title={isUpdate ? '불량 자재 수정' : '불량 자재 등록'}/>
            <WhiteBoxContainer>
              <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >

                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />
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


export default DefectiveRegister;


