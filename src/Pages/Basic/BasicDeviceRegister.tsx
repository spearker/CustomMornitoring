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
import {    ROUTER_MENU_LIST, MES_MENU_LIST } from '../../Common/routerset';
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
import DropdownCode from '../../Components/Input/DropdownCode';
import SelectDocumentForm from '../../Containers/Basic/SelectDocumentForm';
import DocumentFormatInputList from '../../Containers/Basic/DocumentFormatInputList';
import BasicSearchContainer from '../../Containers/Basic/BasicSearchContainer';
import { JsonStringifyList } from '../../Functions/JsonStringifyList';


const docDummy = [
  {pk: 'qfqwf', name:'도큐먼트 1'},
  {pk: 'ehki', name:'도큐먼트 2'},
  {pk: 'qfqw412f', name:'도큐먼트 3'},
  {pk: 'efgrhtjyu', name:'도큐먼트 4'},
  {pk: 'kmcd', name:'도큐먼트 5'},
]
// 주변 장치 페이지
const BasicDeviceRegister = () => {

  const [document, setDocument] = useState<any>({id:'', value:'(선택)'});
  const [documentList, setDocumentList] = useState<any[]>([]);
 
  const [essential,setEssential] = useState<any[]>([]);
  const [optional,setOptional] = useState<any[]>([]);

  const [pk, setPk] = useState<string>('');
  const [made, setMade] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [infoList, setInfoList] = useState<IInfo[]>([]);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<number>(1); //1: 프레스
  const [madeNo, setMadeNo] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');
  const [factory, setFactory] = useState<any[]>([]);

  const [files, setFiles] = useState<any[3]>([null, null, null]);
  const [paths, setPaths] = useState<any[3]>([null, null, null]);
  const [oldPaths, setOldPaths] = useState<any[3]>([null, null, null]);
  const [date, setDate]= useState<string>(moment().format('YYYY-MM-DD'));
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
 
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

 

  
  const getData = useCallback(async()=>{
    
    const res = await getRequest('http://211.208.115.66:8091/api/v1/device/load?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200 || res.status === "200"){
         const data = res.results;
         
         setName(data.device_name);
         setMade(data.manufacturer);
         setPhotoName(data.photo);
         setDate(data.manufactured_at);
         setPk(data.pk);
        setFactory([{pk: data.location_pk, value: data.location_name}])
         setMadeNo(data.manufacturer_code);
         setType(Number(data.device_label));
         setInfoList(data.info_list)
         const tempList = paths.slice();
         tempList[0]= data.photo;
         tempList[1]= data.qualification;
         tempList[2]=data.capacity;
         setOldPaths(tempList);
       
         
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, made,madeNo,date, type,photoName, name,oldPaths, infoList, paths, essential, optional, factory ])

  
  const onsubmitFormUpdate = useCallback(async(e)=>{
    e.preventDefault();
    if(name === "" ){
      alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
      pk: getParameter('pk'),
    
      device_name: name,
      device_label: type,
      manufacturer: made,
      manufacturer_code: madeNo,
      manufactured_at: date,
      location: factory[0].pk,
      info_list: JsonStringifyList(essential, optional),
      photo: paths[0],
      qualification: paths[1],
      capacity: paths[2]
    };

    const res = await postRequest('http://211.208.115.66:8091/api/v1/device/update/', data, getToken(TOKEN_NAME))

    if(res === false){
      alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
    }else{
      if(res.status === 200){
          alert('성공적으로 수정 되었습니다')
      }else{
        alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  },[pk, made, madeNo, name, type, date, madeNo, infoList, paths,essential, optional, factory ])

  /**
   * onsubmitForm()
   * 기계 정보 등록
   */
  const onsubmitForm = useCallback(async(e)=>{
    e.preventDefault();
    //console.log(infoList)
    //alert(JSON.stringify(infoList))
    //console.log(JSON.stringify(infoList))
    if(name === "" ){
      alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
      document_pk: document.pk,
      device_name: name,
      device_label: type,
      manufacturer: made,
      manufacturer_code: madeNo,
      manufactured_at: date,
      location: factory[0].pk,
      info_list: JsonStringifyList(essential, optional),
      photo: paths[0],
      qualification: paths[1],
      capacity: paths[2]
    };
    

    const res = await postRequest('http://211.208.115.66:PORT/api/v1/device/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')
         setName('');
         setMade('');
         setPhotoName('');
         setDate(moment().format('YYYY-MM-DD'))
         setPk('');
         setFactory([])
         setMadeNo('');
         setType(1);
         setInfoList([]);
         setPaths([null, null, null])
        
      }else{
        //TODO:  기타 오류
      }
    }

  },[pk, made, madeNo, document, date, name, type, madeNo, infoList, paths, essential, optional , factory])




  return (
    <DashboardWrapContainer index={'basic'}>
     <SubNavigation list={MES_MENU_LIST.basic}/>
        <InnerBodyContainer>
            <Header title={isUpdate ? '주변장치 정보수정' : '주변장치 정보등록'}/>
            <WhiteBoxContainer>
              {
                document.id !== '' || isUpdate == true?
                <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                <ListHeader title="필수 항목"/>
                <NormalInput title={'장치 이름'} value={name} onChangeEvent={setName} description={'장치 이름을 입력하세요'} />
                <DropdownInput title={'장치 종류'} target={indexList[type]} contents={indexList} onChangeEvent={(v)=>setType(v)} />
                <DateInput title={'제조 연월'} description={""} value={date} onChangeEvent={setDate}/>
                <NormalInput title={'제조(제품) 번호'} value={madeNo} onChangeEvent={setMadeNo} description={'제조사가 발급한 제조사 번호를 입력하세요 (장치에 부착되어있음)'} />
                
                <BasicSearchContainer 
                      title={'공장'} 
                      key={'pk'} 
                      value={'name'}
                      onChangeEvent={
                        (input)=>{
                          setFactory(input)
                        }
                      }
                      solo={true}
                      list={factory}
                      searchUrl={'http://211.208.115.66:PORT/api/v1/factory/search?option=0&'}
                />
                <br/>
                <ListHeader title="선택 항목"/>
                <NormalInput title={'제조사'} value={made} onChangeEvent={setMade} description={' 제조사명을 입력하세요'} />
               
                <NormalFileInput title={'장치 사진'} name={ paths[0]} thisId={'machinePhoto0'} onChangeEvent={(e)=>addFiles(e,0)} description={isUpdate ? oldPaths[0] :'장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'} />
                <NormalFileInput title={'스펙명판 사진'} name={ paths[1]} thisId={'machinePhoto1'} onChangeEvent={(e)=>addFiles(e,1)} description={isUpdate ? oldPaths[1] :'장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'} />
                <NormalFileInput title={'능력명판 사진'} name={ paths[2]} thisId={'machinePhoto2'} onChangeEvent={(e)=>addFiles(e,2)} description={isUpdate ? oldPaths[2] :'장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'} />
                {
                    isUpdate ?
                    <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={['장치사진', '스펙명판', '능력명판']} isImage={true} />
                 
                    :
                    null
                }
                <br/>
                <DocumentFormatInputList pk={document.pk} onChangeEssential={setEssential} onChangeOptional={setOptional}/>
                
                 
                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />   
              </form>
              :
              <SelectDocumentForm category={0} onChangeEvent={setDocument}/>

            }
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


export default BasicDeviceRegister;