import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import { getToken } from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_REGISTER, ROUTER_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getParameter, postRequest, getRequest } from '../../Common/requestFunctions';
import InputContainer from '../../Containers/InputContainer';
import DropdownInput from '../../Components/Input/DropdownInput';
import CustomIndexInput from '../../Components/Input/CustomIndexInput';
import SmallButton from '../../Components/Button/SmallButton';
import AddInput from '../../Components/Input/AddInput';
import FullAddInput from '../../Components/Input/FullAddInput';

// 금형 등록 페이지
const RegisterDesign = () => {

  const [pk, setPk] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [made, setMade] = useState<string>('');
  const [no, setNo] = useState<string>('');
  const [spec, setSpec] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [moldNo, setMoldNo] = useState<string>('');
  const [infoList, setInfoList] = useState<IInfo[]>([]);
  useEffect(()=>{
    if(getParameter('pk') !== "" ){
      setPk(getParameter('pk'))
      //alert(`수정 페이지 진입 - pk :` + param)
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
    
    const res = await getRequest(BASE_URL + '/api/v1/mold/view/' + getParameter('pk'), getToken(TOKEN_NAME))

    if(res === false){
      //TODO: 에러 처리
    }else{
      if(res.status === 200){
         const data = res.results;
          setPk(data.pk)
          setMade(data.manufacturer);
          setNo(data.product_code);
          setMoldNo(data.mold_code);
          setName(data.mold_name);
          setSpec(data.product_spec);
          setType(data.mold_label);
          //setInfoList(data.item_list);
      }else{
        //TODO:  기타 오류
      }
    }
  },[pk, made, no, name, type, moldNo, spec]);

  /**
   * onsubmitForm()
   * 금형 정보 등록
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {string} moldNo 금형코드번호 
   * @param {string} no 제조번호
   * @param {string} made 제조사
   * @param {string} spec 스펙
   * @param {string} type 금형종류
   * @returns X 
   */
  const onsubmitForm = useCallback(async(e)=>{
    e.preventDefault();
     //TODO: 지울것
    //alert('테스트 : 전송 - ' + made + name + no + type + moldNo + spec );
   // return;

    if(name === "" || made === ""){
      alert("금형이름과 제조사는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
        manufacturer: made,
        product_code: no,
        product_spec: spec,
        mold_name: name,
        mold_label: type,
        mold_code : moldNo,
        //item_list : infoList
    }

    const res = await postRequest(BASE_URL + '/api/v1/mold/register' + pk, data, getToken(TOKEN_NAME))

    if(res === false){
      alert('실패하였습니다. 잠시후 다시 시도해주세요.')
    }else{
      if(res.status === 200){
         alert('성공적으로 등록 되었습니다')
         setPk('')
         setMade('');
         setNo('');
         setMoldNo('');
         setName('');
         setSpec('');
         setType('');
         setInfoList([])
      }else{
        alert('실패하였습니다. 잠시후 다시 시도해주세요.')
      }
    }

  },[pk, made, no, name, type, moldNo, spec]);

  /**
   * onsubmitFormUpdate()
   * 금형 정보 수정
   * @param {string} pk 금형 pk
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {string} moldNo 금형코드번호 
   * @param {string} no 제조번호
   * @param {string} made 제조사
   * @param {string} spec 스펙
   * @param {string} type 금형종류
   * @returns X 
   */
  const onsubmitFormUpdate = useCallback(async(e)=>{
    e.preventDefault();
     //TODO: 지울것
    //alert('테스트 : 전송 - ' + pk + made + name + no + type + moldNo + spec );
    //return;
    if(name === ""){
      alert("금형 이름은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }
    const data = {
        pk: pk,
        manufacturer: made,
        product_code: no,
        product_spec: spec,
        mold_name: name,
        mold_label: type,
        mold_code : moldNo
    }

    const res = await postRequest(BASE_URL + '/api/v1/mold/update/', data, getToken(TOKEN_NAME))

    if(res === false){
      alert('실패하였습니다. 잠시후 다시 시도해주세요.')
    }else{
      if(res.status === 200){
         alert('성공적으로 수정 되었습니다')
         
      }else{
        alert('실패하였습니다. 잠시후 다시 시도해주세요.')
      }
    }

  },[pk, made, no, name, type, moldNo, spec]);


  return (
      <DashboardWrapContainer>
        <SubNavigation list={isUpdate ? ROUTER_LIST :ROUTER_REGISTER}/>
        <InnerBodyContainer>
        <Header title={isUpdate ? '금형 정보수정' : '금형 정보등록'}/>
            <WhiteBoxContainer>
            <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm} >
                <NormalInput title={'제조사'} value={made} onChangeEvent={setMade} description={'제조사를 입력하세요'} />
                <NormalInput title={'제조번호'} value={no} onChangeEvent={setNo} description={'제조번호를 입력하세요'} />
                <NormalInput title={'제조스펙'} value={spec} onChangeEvent={setSpec} description={'제조스펙을 입력하세요'} />
                <NormalInput title={'금형이름'} value={name} onChangeEvent={setName} description={'금형이름을 입력하세요'} />
                <NormalInput title={'금형종류'} value={type} onChangeEvent={setType} description={'금형종류를 입력하세요'} />
                <NormalInput title={'금형번호'} value={moldNo} onChangeEvent={setMoldNo} description={'금형번호를 입력하세요'} />
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