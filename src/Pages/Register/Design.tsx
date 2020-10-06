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
import CustomIndexInput from '../../Components/Input/CustomIndexInput';
import FullAddInput from '../../Components/Input/FullAddInput';
import ListHeader from '../../Components/Text/ListHeader';
import moment from 'moment';
import {getMoldTypeList} from '../../Common/codeTransferFunctions';
import DateInput from '../../Components/Input/DateInput';
import {uploadTempFile} from '../../Common/fileFuctuons';
import OldFileInput from '../../Components/Input/OldFileInput';
// 금형 등록 페이지
const RegisterDesign = () => {

  const [pk, setPk] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [made, setMade] = useState<string>('');
  const [no, setNo] = useState<string>('');
  const [spec, setSpec] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<number>(0);
  const [infoList, setInfoList] = useState<IInfo[]>([]);
  const [paths, setPaths] = useState<any[2]>([null, null]);
  const [oldPaths, setOldPaths] = useState<any[2]>([null, null]);
  const [date, setDate]= useState<string>(moment().format('YYYY-MM-DD'));

  const indexList = getMoldTypeList('kor');
  //const indexList =
  useEffect(()=>{
    if(getParameter('pk') !== "" ){
      setPk(getParameter('pk'))
      ////alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData()
    }

  },[])

  /**
   * getData()
   * 자재 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 자재 pk
   * @returns X
   */
  const getData = useCallback(async ()=>{

    const res = await getRequest('http://293.234.183.22:8299/api/v1/mold/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const data = res.results;
          setPk(data.pk)
          setMade(data.manufacturer);
          setNo(data.product_code);
          setName(data.mold_name);
          setDate(data.manufactured_at)
          setType(data.mold_label);
          setInfoList(data.info_list);
          setOldPaths([data.mold_upper, data.mold_below])
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, made, no, name, type, infoList, paths, oldPaths, date]);

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

      //alert('이미지 형식만 업로드 가능합니다.')
    }

  }



  /**
   * onsubmitForm()
   * 금형 정보 등록
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {string} no 제조번호
   * @param {string} made 제조사
   * @param {string} type 금형종류
   * @returns X
   */
  const onsubmitForm = useCallback(async(e)=>{
    e.preventDefault();
     //TODO: 지울것
    ////alert('테스트 : 전송 - ' + made + name + no + type  + spec );
   // return;

    if(name === "" ){
      //alert("금형이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
        manufacturer: made,
        product_code: no,
        mold_name: name,
        mold_label: type,
        product_spec:'',
        manufactured_at: date,
        info_list : infoList.length === 0 ? null : JSON.stringify(infoList),
        upper_photo: paths[0],
        below_photo: paths[1]
    }

    const res = await postRequest('http://293.234.183.22:8299/api/v1/mold/register' + pk, data, getToken(TOKEN_NAME))

    if(res === false){
      //alert('실패하였습니다. 잠시후 다시 시도해주세요.')
    }else{
      if(res.status === 200){
         //alert('성공적으로 등록 되었습니다')
         setPk('')
         setMade('');
         setNo('');
         setName('');
         setType(0);
         setInfoList([])
         setPaths([null, null])
      }else{
        //alert('실패하였습니다. 잠시후 다시 시도해주세요.')
      }
    }

  },[pk, made, no, name, type, spec, date, infoList, paths]);

  /**
   * onsubmitFormUpdate()
   * 금형 정보 수정
   * @param {string} pk 금형 pk
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {string} no 제조번호
   * @param {string} made 제조사
   * @param {string} spec 스펙
   * @param {string} type 금형종류
   * @returns X
   */
  const onsubmitFormUpdate = useCallback(async(e)=>{
    e.preventDefault();
     //TODO: 지울것
    ////alert('테스트 : 전송 - ' + pk + made + name + no + type  + spec );
    //return;
    if(name === ""){
      //alert("금형 이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
        pk: pk,
        manufacturer: made,
        product_code: no,
        manufactured_at: date,
        mold_name: name,
        product_spec:'',
        mold_label: type,
        info_list : infoList.length === 0 ? null : JSON.stringify(infoList),
        upper_photo: paths[0],
        below_photo: paths[1]
    }

    const res = await postRequest('http://293.234.183.22:8299/api/v1/mold/update', data, getToken(TOKEN_NAME))

    if(res === false){
      //alert('실패하였습니다. 잠시후 다시 시도해주세요.')
    }else{
      if(res.status === 200){
         //alert('성공적으로 수정 되었습니다')

      }else{
        //alert('실패하였습니다. 잠시후 다시 시도해주세요.')
      }
    }

  },[pk, made, no, name, type, spec,date,  infoList, paths]);


  return (
      <DashboardWrapContainer index={0}>
        <SubNavigation list={ROUTER_MENU_LIST[0]}/>
        <InnerBodyContainer>
        <Header title={isUpdate ? '금형 정보수정' : '금형 정보등록'}/>
            <WhiteBoxContainer>
            <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                <ListHeader title="필수 항목"/>
                <NormalInput title={'금형이름'} value={name} onChangeEvent={setName} description={'금형이름을 입력하세요'} />
                <DropdownInput title={'금형종류'} target={indexList[type]} contents={indexList} onChangeEvent={(v)=>setType(v)} />
                <DateInput title={'제조 연월'} description={""} value={date} onChangeEvent={setDate}/>
                <br/>
                <ListHeader title="선택 항목"/>
                <NormalInput title={'제조사'} value={made} onChangeEvent={setMade} description={'제조사를 입력하세요'} />
                <NormalInput title={'제조번호'} value={no} onChangeEvent={setNo} description={'제조사가 발급한 제조사 번호를 입력하세요'} />
                <NormalFileInput title={'금형 상 사진'} name={ paths[0]} thisId={'moldPhotoo0'} onChangeEvent={(e)=>addFiles(e,0)} description={isUpdate ? oldPaths[0] :'장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'} />
                <NormalFileInput title={'금형 하 사진'} name={ paths[1]} thisId={'moldPhoto1'} onChangeEvent={(e)=>addFiles(e,1)} description={isUpdate ? oldPaths[1] :'장치 측면에 붙어있는 명판(혹은 스티커)을 사진으로 찍어 등록해주세요'} />

                 {
                    isUpdate ?
                    <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={[]} isImage={true} />

                    :
                    null
                  }
                 {/* 자유항목 입력 창 */}
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


export default RegisterDesign;
