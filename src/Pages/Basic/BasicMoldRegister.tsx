import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
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
import { uploadTempFile } from '../../Common/fileFuctuons';
import {getMachineTypeList, getMoldTypeList} from '../../Common/codeTransferFunctions';
import DateInput from '../../Components/Input/DateInput';
import moment from 'moment';
import ListHeader from '../../Components/Text/ListHeader';
import OldFileInput from '../../Components/Input/OldFileInput';
import DropdownCode from '../../Components/Input/DropdownCode';
import SelectDocumentForm from '../../Containers/Basic/SelectDocumentForm';
import DocumentFormatInputList from '../../Containers/Basic/DocumentFormatInputList';
import BasicSearchContainer from '../../Containers/Basic/BasicSearchContainer';
import { JsonStringifyList } from '../../Functions/JsonStringifyList';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import {useHistory} from 'react-router-dom';

// 금형 등록, 업데이트
const BasicMoldRegister = () => {

  const history = useHistory();
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

  const [limit, setLimit] = useState<number>(0);
  const [files, setFiles] = useState<any[3]>([null, null]);
  const [paths, setPaths] = useState<any[3]>([null, null]);
  const [oldPaths, setOldPaths] = useState<any[3]>([null, null]);
  const [date, setDate]= useState<string>(moment().format('YYYY-MM-DD'));
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [spec, setSpec] = useState<string>('');

  const indexList = getMoldTypeList('kor');

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

    const res = await getRequest('http://203.234.183.22:8299/api/v1/mold/load?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200 || res.status === "200"){
         const data = res.results;

         setName(data.mold_name);
         setMade(data.manufacturer);
         setPhotoName(data.photo);
         setLimit(data.limit)
         setDate(data.manufactured_at);
         setPk(data.pk);
          setFactory([{pk: data.location_pk, name: data.location_name}])
         setMadeNo(data.manufacturer_code);
         setType(Number(data.mold_type));
         setInfoList(data.info_list);
         setSpec(data.mold_spec)
         const tempList = paths.slice();
         tempList[0]= data.photo;
         tempList[1]= data.qualification;
         setOldPaths(tempList);


      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, made,limit,madeNo,date,spec, type,photoName, name,oldPaths, infoList, paths, essential, optional, factory ])


  const onsubmitFormUpdate = useCallback(async(e)=>{
    e.preventDefault();
    if(name === "" ){
      alert("이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
      pk: getParameter('pk'),
      mold_name: name,
      mold_type: type,
      manufactured_at: date,
      limit: limit,
      location: factory[0].pk,
      info_list: JsonStringifyList(essential, optional),
      manufacturer: made,
      manufacturer_code: madeNo,
      mold_spec: spec,
      upper: paths[0],
      below: paths[1],

    };

    const res = await postRequest('http://203.234.183.22:8299/api/v1/mold/update', data, getToken(TOKEN_NAME))

    if(res === false){
      alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
    }else{
      if(res.status === 200){
          alert('성공적으로 수정 되었습니다')
      }else{
        alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  },[pk, made, madeNo, name,limit, spec, type, date, madeNo, infoList, paths,essential, optional, factory ])

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
      mold_name: name,
      mold_type: type,
      manufactured_at: date,
      limit: limit,
      location: factory[0].pk,
      info_list: JsonStringifyList(essential, optional),
      manufacturer: made,
      manufacturer_code: madeNo,
      mold_spec: spec,
      upper: paths[0],
      below: paths[1],
    };


    const res = await postRequest('http://203.234.183.22:8299/api/v1/mold/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')
         history.push('/basic/list/mold')
      }else{
        //TODO:  기타 오류
      }
    }

  },[pk, made, madeNo, document, spec, limit,date, name, type, madeNo, infoList, paths, essential, optional , factory])




  return (
    <DashboardWrapContainer index={'basic'}>

        <InnerBodyContainer>
            <Header title={isUpdate ? '금형 정보수정' : '금형 정보등록'}/>
            <WhiteBoxContainer>
              {
                document.id !== '' || isUpdate == true?
                <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                <ListHeader title="필수 항목"/>
                <NormalInput title={'금형 이름'} value={name} onChangeEvent={setName} description={'이름을 입력하세요'} />
                <DropdownInput title={'금형 종류'} target={indexList[type]} contents={indexList} onChangeEvent={(v)=>setType(v)} />
                <DateInput title={'제조 연월'} description={""} value={date} onChangeEvent={setDate}/>
                <NormalNumberInput title={'최대 타수'} description={""} value={limit} onChangeEvent={setLimit}/>
                <BasicSearchContainer
                      title={'공장/부속공장'}
                      key={'pk'}
                      value={'name'}
                      onChangeEvent={
                        (input)=>{
                          setFactory(input)
                        }
                      }
                      solo={true}
                      list={factory}
                      searchUrl={'http://203.234.183.22:8299/api/v1/factory/search?option=1&'}
                />
                <br/>
                <ListHeader title="선택 항목"/>
                <NormalInput title={'제조사'} value={made} onChangeEvent={setMade} description={'제조사명을 입력하세요'} />
                <NormalInput title={'제조(제품) 번호'} value={madeNo} onChangeEvent={setMadeNo} description={'제조사가 발급한 제조사 번호를 입력하세요'} />
                <NormalInput title={'금형 스펙'} value={spec} onChangeEvent={setSpec} description={'스펙을 입력하세요. ex)W: String, L: String'} />
                <NormalFileInput title={'상금형 사진'} name={ paths[0]} thisId={'machinePhoto0'} onChangeEvent={(e)=>addFiles(e,0)} description={isUpdate ? oldPaths[0] :'상금형 사진을 찍어 등록해주세요'} />
                <NormalFileInput title={'하금형 사진'} name={ paths[1]} thisId={'machinePhoto1'} onChangeEvent={(e)=>addFiles(e,1)} description={isUpdate ? oldPaths[1] :'하금형 사진을 찍어 등록해주세요'} />
                {
                    isUpdate ?
                    <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={['상금형', '하금형']} isImage={true} />
                    :
                    null
                }
                <br/>
                <DocumentFormatInputList

                  pk={!isUpdate ? document.pk : undefined}
                  loadDataUrl={isUpdate? `http://203.234.183.22:8299/api/v1/mold/load?pk=${pk}` :''}
                  onChangeEssential={setEssential} onChangeOptional={setOptional}
                  />

                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />
              </form>
              :
              <SelectDocumentForm category={2} onChangeEvent={setDocument}/>

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


export default BasicMoldRegister;
