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
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import DropdownInput from '../../Components/Input/DropdownInput';
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions';
import {uploadTempFile} from '../../Common/fileFuctuons';
import {getMoldTypeList} from '../../Common/codeTransferFunctions';
import DateInput from '../../Components/Input/DateInput';
import moment from 'moment';
import ListHeader from '../../Components/Text/ListHeader';
import OldFileInput from '../../Components/Input/OldFileInput';
import BasicSearchContainer from '../../Containers/Basic/BasicSearchContainer';
import {JsonStringifyList} from '../../Functions/JsonStringifyList';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import {useHistory} from 'react-router-dom';
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import InputContainer from "../../Containers/InputContainer";

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
  const [inspect, setInspect] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [proper, setProper] = useState(0);
  const [files, setFiles] = useState<any[3]>([null, null]);
  const [paths, setPaths] = useState<any[3]>([null, null]);
  const [oldPaths, setOldPaths] = useState<any[3]>([null, null]);
  const [date, setDate]= useState<string>(moment().format('YYYY-MM-DD'));
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [mold_spec_w, setMold_spec_w] = useState<string>('');
  const [mold_spec_l, setMold_spec_l] = useState<string>('');
  const [mold_spec_t, setMold_spec_t] = useState<string>('');
  const [input_material, setInput_material] = useState<{ name: string, pk: string }>({ name: '', pk: ''});
  const [output_material, setOutput_material] = useState<{ name: string, pk: string }>({name: '', pk: ''});

  const indexList = getMoldTypeList('kor');

  useEffect(()=>{

    if(getParameter('pk') !== "" ){
      setPk(getParameter('pk'))
      ////alert(`수정 페이지 진입 - pk :` + param)
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

      //alert('이미지 형식만 업로드 가능합니다.')
    }

  }




  const getData = useCallback(async()=>{

    const res = await getRequest('http://192.168.0.47:8299/api/v1/mold/load?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200 || res.status === "200"){
         const data = res.results;

         setName(data.mold_name);
         setMade(data.manufacturer);
         setPhotoName(data.photo);
         setLimit(data.limit)
         setInspect(data.inspect)
         setCurrent(data.current)
         setDate(data.manufactured_at);
         setPk(data.pk);
          setFactory([{pk: data.location, name: data.location_name}])
         setMadeNo(data.manufacturer_code);
         setType(Number(data.mold_type));
         setInfoList(data.info_list);
         setMold_spec_w(data.mold_spec_W);
         setMold_spec_l(data.mold_spec_L);
         setMold_spec_t(data.mold_spec_T);
         setInput_material({...input_material, pk: data.input_material_pk, name: data.input_material_name});
         setOutput_material({...output_material, pk: data.output_material_pk, name: data.output_material_name});
         const tempList = paths.slice();
         tempList[0]= data.upper;
         tempList[1]= data.below;
         setOldPaths(tempList);


      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, made,limit, inspect, current, madeNo, date, mold_spec_l, mold_spec_w, mold_spec_t, type,photoName,input_material,output_material, name,oldPaths, infoList, paths, essential, optional, factory ])


  const onsubmitFormUpdate = useCallback(async()=>{

    if(name === "" ){
      alert("금형 이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(madeNo === ""){
      alert("제품 번호는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(limit.toString() === ""){
      alert("최대 타수는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(inspect.toString() === ""){
      alert("점검 타수는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(proper.toString() === ""){
      alert("적정 톤 수는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(factory[0] === ""){
      alert("공장/부속공장는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(mold_spec_l === "" ){
      alert("금형 치수 L 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(mold_spec_w === ""){
      alert("금형 치수 W 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }  else if(mold_spec_t === ""){
      alert("금형 치수 T 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }  else if(output_material.pk === ""){
      alert("투입 품목은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(input_material.pk=== ""){
      alert("생산 품목은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }

    console.log(factory)
    const data = {
      pk: getParameter('pk'),
      mold_name: name,
      mold_type: type,
      manufactured_at: date,
      limit: limit,
      inspect: inspect,
      proper_tons: proper,
      current: current,
      location: factory[0].pk,
      info_list: JsonStringifyList(essential, optional),
      output_material: output_material.pk,
      input_material: input_material.pk,
      manufacturer: made,
      manufacturer_code: madeNo,
      mold_spec_L: mold_spec_l,
      mold_spec_W: mold_spec_w,
      mold_spec_T: mold_spec_t,
      upper: paths[0],
      below: paths[1],

    };

    const res = await postRequest('http://192.168.0.47:8299/api/v1/mold/update', data, getToken(TOKEN_NAME))

    if(res === false){
      ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
    }else{
      if(res.status === 200){
        history.push('/basic/list/mold')
          //alert('성공적으로 수정 되었습니다')
      }else{
        ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  },[pk, made, madeNo, name,limit, inspect,input_material,output_material, mold_spec_w, mold_spec_l, mold_spec_t, type, date, madeNo, infoList, paths,essential, optional, factory ])

  /**
   * onsubmitForm()
   * 기계 정보 등록
   */
  const onsubmitForm = useCallback(async()=>{
    //console.log(infoList)
    ////alert(JSON.stringify(infoList))
    //console.log(JSON.stringify(infoList))
    if(name === "" ){
      alert("금형 이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(madeNo === ""){
      alert("제품 번호는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(limit.toString() === ""){
      alert("최대 타수는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(inspect.toString() === ""){
      alert("점검 타수는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(proper.toString() === ""){
      alert("적정 톤 수는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(factory[0] === ""){
      alert("공장/부속공장는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(mold_spec_l === "" ){
      alert("금형 치수 L 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(mold_spec_w === ""){
      alert("금형 치수 W 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }  else if(mold_spec_t === ""){
      alert("금형 치수 T 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }  else if(output_material.pk === ""){
      alert("투입 품목은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if(input_material.pk=== ""){
      alert("생산 품목은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
      document_pk: document.pk,
      mold_name: name,
      mold_type: type,
      manufactured_at: date,
      limit: limit,
      inspect: inspect,
      proper_tons: proper,
      current: current,
      location: factory[0].pk,
      info_list: JsonStringifyList(essential, optional),
      output_material: output_material.pk,
      input_material: input_material.pk,
      manufacturer: made,
      manufacturer_code: madeNo,
      mold_spec_L: mold_spec_l,
      mold_spec_W: mold_spec_w,
      mold_spec_T: mold_spec_t,
      upper: paths[0],
      below: paths[1],
    };


    const res = await postRequest('http://192.168.0.47:8299/api/v1/mold/register', data, getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         //alert('성공적으로 등록 되었습니다')
         history.push('/basic/list/mold')
      }else{
        //TODO:  기타 오류
      }
    }

  },[pk, made, madeNo, document, mold_spec_w, mold_spec_l, mold_spec_t, limit,date, name, type, madeNo, infoList, paths, essential, optional , factory])




  return (
    <DashboardWrapContainer index={'basic'}>

        <InnerBodyContainer>
            <Header title={isUpdate ? '금형 정보수정' : '금형 정보등록'} />
            <WhiteBoxContainer>
                {
                    // document.id !== '' || isUpdate == true?
                    <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} target={'iframe'}>
                    <iframe src="#" name="iframe" style={{width:1, height:1, border:0, visibility:"hidden"}}/>
                <ListHeader title="필수 항목"/>
                <NormalInput title={'금형 이름'} value={name} onChangeEvent={setName} description={'이름을 입력하세요'} />
                <DropdownInput title={'금형 종류'} target={indexList[type]} contents={indexList} onChangeEvent={(v)=>setType(v)} />
                <DateInput title={'제조 연월'} description={""} value={date} onChangeEvent={setDate}/>
                <NormalInput title={'제조(제품) 번호'} value={madeNo} onChangeEvent={setMadeNo} description={'제조사가 발급한 제조사 번호를 입력하세요'} />
                <NormalNumberInput title={'최대 타수'} description={""} value={limit} onChangeEvent={setLimit}/>
                <NormalNumberInput title={'점검 타수'} description={""} value={inspect} onChangeEvent={setInspect}/>
                        <NormalNumberInput title={'적정 톤 수'} description={""} value={proper} onChangeEvent={setProper}/>
                <BasicSearchContainer
                      title={'공장/부속공장'}
                      key={'pk'}
                      value={'name'}
                      option={1}
                      onChangeEvent={
                        (input)=>{
                          setFactory(input)
                        }
                      }
                      solo={true}
                      list={factory}
                      searchUrl={'http://192.168.0.47:8299/api/v1/factory/search?&'}
                />
                <NormalInput title={'금형 치수 L'} value={mold_spec_l} onChangeEvent={setMold_spec_l} description={'치수를 입력하세요.'} />
                <NormalInput title={'금형 치수 W'} value={mold_spec_w} onChangeEvent={setMold_spec_w} description={'치수를 입력하세요.'} />
                <NormalInput title={'금형 치수 T'} value={mold_spec_t} onChangeEvent={setMold_spec_t} description={'치수를 입력하세요.'} />
                  <InputContainer title={"투입 품목"}>
                    <ProductionPickerModal select={input_material} onClickEvent={setInput_material} text={'투입품목'} width={true} type={0} style={{width: 'calc(100% - 100px)'}} innerWidth={'100%'} />
                  </InputContainer>
                  <InputContainer title={"생산 품목"}>
                    <ProductionPickerModal select={output_material} onClickEvent={setOutput_material} text={'생산품목'} width={true} type={1} style={{width: 'calc(100% - 100px)'}} innerWidth={'100%'} />
                  </InputContainer>
                <br/>
                <ListHeader title="선택 항목"/>
                <NormalInput title={'제조사'} value={made} onChangeEvent={setMade} description={'제조사명을 입력하세요'} />
                <NormalNumberInput title={'현재 타수'} description={""} value={current} onChangeEvent={setCurrent}/>
                {/*<NormalInput title={'책임자(정)'} value={made} onChangeEvent={setMade} description={'제조사명을 입력하세요'} />*/}
                {/*<NormalInput title={'책임자(부)'} value={made} onChangeEvent={setMade} description={'제조사명을 입력하세요'} />*/}
                <NormalFileInput title={'상금형 사진'} name={ paths[0]} thisId={'machinePhoto0'} onChangeEvent={(e)=>addFiles(e,0)} description={isUpdate ? oldPaths[0] :'상금형 사진을 찍어 등록해주세요'} style={{width: 'calc(100% - 100px)'}} />
                <NormalFileInput title={'하금형 사진'} name={ paths[1]} thisId={'machinePhoto1'} onChangeEvent={(e)=>addFiles(e,1)} description={isUpdate ? oldPaths[1] :'하금형 사진을 찍어 등록해주세요'} style={{width: 'calc(100% - 100px)'}} />
                {
                    isUpdate ?
                    <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={['상금형', '하금형']} isImage={true} />
                    :
                    null
                }
                <br/>
                {/*<DocumentFormatInputList*/}

                {/*  pk={!isUpdate ? document.pk : undefined}*/}
                {/*  loadDataUrl={isUpdate? `http://192.168.0.47:8299/api/v1/mold/load?pk=${pk}` :''}*/}
                {/*  onChangeEssential={setEssential} onChangeOptional={setOptional}*/}
                {/*  />*/}

                <RegisterButton name={isUpdate ? '수정하기' : '등록하기'} />
                    </form>
                    // :
                    // <SelectDocumentForm category={2} onChangeEvent={setDocument}/>

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
  background-color: ${BG_COLOR_SUB2};
`


export default BasicMoldRegister;
