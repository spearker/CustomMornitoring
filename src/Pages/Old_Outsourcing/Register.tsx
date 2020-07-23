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
import DateInput from '../../Components/Input/DateInput';
import moment from 'moment';
import ListHeader from '../../Components/Text/ListHeader';
import OldFileInput from '../../Components/Input/OldFileInput';
import RadioInput from '../../Components/Input/RadioInput';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import DaumPostcode from 'react-daum-postcode';
import SmallButtonG from '../../Components/Button/SmallButtonG';



// 외주사 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const OutsourcingRegister = () => {

  const [pk, setPk] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [no, setNo] = useState<number>();
  const [type, setType] = useState<number>(0); //0: 법인, 1:개인
  const [phone, setPhone]= useState<string>('');
  const [address, setAddress]= useState<string>('');
  const [subAddress, setSubAddress]= useState<string>('');
  const [fax, setFax]= useState<string>('');
  const [phoneM, setPhoneM]= useState<string>('');
  const [emailM, setEmailM]= useState<string>('');
  const [email, setEmail]= useState<string>('');
  const [manager, setManager]= useState<string>('');
  const [ceo, setCeo]= useState<string>('');
  const [infoList, setInfoList] = useState<IInfo[]>([]);
  const [isOpen, setIsOpen]= useState<boolean>(false);
  const [paths, setPaths] = useState<any[1]>([null]);
  const [oldPaths, setOldPaths] = useState<any[1]>([null]);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
 

  
  useEffect(()=>{
    if(getParameter('pk') !== "" ){
      setPk(getParameter('pk'))
      //alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData()
    }

  },[])



  /**
   * addFiles()
   * 사진 등록
   * @param {object(file)} event.target.files[0] 파일
   * @returns X 
   */
  const addFiles = async (event: any, index: number): Promise<void> => {
    console.log(event.target.files[0]);
    console.log(index)
    if(event.target.files[0] === undefined){

      return;
    }
    console.log(event.target.files[0].type);
    if(event.target.files[0].type.includes('image')){ //이미지인지 판별

      const tempFile  = event.target.files[0];
      console.log(tempFile)
      const res = await uploadTempFile(event.target.files[0]);
      
      if(res !== false){
        console.log(res) 
        const tempPatchList= paths.slice()
        tempPatchList[index] = res;
        console.log(tempPatchList) 
        setPaths(tempPatchList)
        return
      }else{
        return
      }
      
    }else{
      
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
    
    const res = await getRequest('http://211.208.115.66:8099/api/v1/customer/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const data = res.results;
         setName(data.name);
         setPk(data.pk);
         setNo(Number(data.number));
         setType(Number(data.type));
         setPk(data.pk);
         setCeo(data.ceo);
         setOldPaths([data.photo])
         setPhone(data.telephone);
         setEmailM(data.manager_email);
         setPhoneM(data.manager_phone)
         setManager(data.manager)
         setEmail(data.ceo_email)
         
         //setInfoList(data.info_list)
         setAddress(data.address);
         setFax(data.fax);
         
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM,  address, fax])

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
      name: name,
      number: no,
      type: type,
      pathceo: ceo,
      photo: paths[0],
      telephone: phone,
      ceo_email: email,
      manager: manager,
      manager_phone: phoneM,
      manager_email: emailM,
      address: address,
      fax: fax,
      info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

    };

    const res = await postRequest('http://211.208.115.66:8099/api/v1/customer/update/', data, getToken(TOKEN_NAME))

    if(res === false){
      alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
    }else{
      if(res.status === 200){
          alert('성공적으로 수정 되었습니다')
          setIsUpdate(false)
      }else{
        alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  },[pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM,  address, fax, manager])

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
      
      name: name,
      number: no,
      type: type,
      pathceo: ceo,
      photo: paths[0],
      telephone: phone,
      ceo_email: email,
      manager: manager,
      manager_phone: phoneM,
      manager_email: emailM,
      address: address,
      fax: fax,
      info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

    };
    

    const res = await postRequest('http://211.208.115.66:8099/api/v1/outsourcing/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')
         const data = res.results;
         setName('');
         setPk('');
         setNo(undefined);
         setType(0);
        
         setCeo('');
         setPaths([null])
         setOldPaths([null])
         setPhone('');
         setEmailM('');
         setPhoneM('')
         setEmail('')

         setInfoList([])
         setAddress('');
         setFax('');

      }else{
        //TODO:  기타 오류
      }
    }

  },[pk, name, no, type, ceo, paths, oldPaths, phone, emailM, email, phone, phoneM,  address, fax, manager])

  const handleComplete = useCallback((data) => {
    console.log(data)
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
    setAddress(fullAddress + ' ')
   
  },[address, isOpen])



  return (
      <DashboardWrapContainer index={3}>
        <SubNavigation list={ROUTER_MENU_LIST[3]}/>
        <InnerBodyContainer>
            <Header title={isUpdate ? '외주사 정보수정' : '외주사 정보등록'}/>
            <WhiteBoxContainer>
              <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                <ListHeader title="필수 항목"/>
                <NormalInput title={'사업장 이름'} value={name} onChangeEvent={setName} description={'사업장 이름을 입력하세요'} />
                <NormalInput title={'대표자 이름'} value={ceo} onChangeEvent={setCeo} description={'사업장 대표자 이름을 입력하세요'} />
                <RadioInput title={'사업자 구분'} target={type} onChangeEvent={setType} contents={[{value:0, title:'법인'}, {value:1, title:'개인'}]}/>
                <NormalNumberInput title={'사업자 번호'} value={no} onChangeEvent={setNo} description={'사업자 번호를 입력하세요 (-제외)'} />
                
                
                <br/>
                <ListHeader title="선택 항목"/>
                <NormalFileInput title={'사업자 등록증 사진'} name={ paths[0]} thisId={'photo'} onChangeEvent={(e)=>addFiles(e,0)} description={isUpdate ? oldPaths[0] :'사업자 등록증 사진 혹은 스캔본을 등록하세요'} />
                {
                    isUpdate ?
                    <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={['']} isImage={true} />
                    :
                    null
                  }
             
                
                <div onClick={()=>setIsOpen(true)}>
                <NormalInput title={'사업장 주소'} value={address} onChangeEvent={setAddress} description={'사업자 등록증에 기재되어있는 주소를 입력하세요'} />
                </div>
                {
                  isOpen &&
                  <DaumPostcode
                  onComplete={handleComplete}
                
                 />
                }
                <NormalInput title={'사업장 대표 연락처'} value={phone} onChangeEvent={setPhone} description={'사업자 등록증에 기재되어있는 연락처를 입력하세요'} />
                <NormalInput title={'사업장 이메일'} value={email} onChangeEvent={setEmail} description={'사업장 이메일을 입력하세요'} />
                <NormalInput title={'사업장 대표 FAX'} value={fax} onChangeEvent={setFax} description={'사업장 팩스번호를 입력하세요'} />
                <NormalInput title={'담당자 이름'} value={manager} onChangeEvent={setManager} description={'사업장 담당자(관리자) 이름을 입력하세요'} />
                <NormalInput title={'담당자 연락처'} value={phoneM} onChangeEvent={setPhoneM} description={'사업장 담당자(관리자) 연락처를 입력하세요'} />
                <NormalInput title={'담당자 이메일'} value={emailM} onChangeEvent={setEmailM} description={'사업장 담당자(관리자) 이메일을 입력하세요'} />
                  {/* 자유항목 입력 창 
                 <FullAddInput title={'자유 항목'} onChangeEvent={()=>{
                  const tempInfo = infoList.slice();
                  tempInfo.push({title:`자유 항목 ${infoList.length + 1}`, value:""});
                  setInfoList(tempInfo)
                }}>
                  {
                    infoList.map((v: IInfo, i)=>{
                      return(
                          <CustomIndexInput index={i} value={v} 
                          onRemoveEvent={()=>{
                            const tempInfo = infoList.slice();
                            tempInfo.splice(i, 1)
                            setInfoList(tempInfo)
                          }} 
                          onChangeEvent={(obj: IInfo)=>{
                            const tempInfo = infoList.slice();
                            tempInfo.splice(i, 1, obj)
                            setInfoList(tempInfo)
                          }} 
                          />
                      )
                    })
                  }
                  </FullAddInput>
                  */}
                
                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />   
              </form>
            </WhiteBoxContainer>
            
        </InnerBodyContainer>
      
      </DashboardWrapContainer>
      
  );
}



export default OutsourcingRegister;

