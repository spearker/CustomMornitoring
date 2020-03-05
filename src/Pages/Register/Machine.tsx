import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import { getToken } from '../../Common/tokenFunctions';
import BasicModal from '../../Components/Modal/BasicModal';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { ROUTER_REGISTER } from '../../Common/routerset';


// 기계 등록 페이지
const RegisterMachine = () => {

  const [made, setMade] = useState<string>('');
  const [no, setNo] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [madeNo, setMadeNo] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');
  const [file, setFile] = useState<any>(null);

  useEffect(()=>{

  },[])

  const addFile = (event: any): void => {
    console.log(event.target.files[0]);

    if(event.target.files[0] === undefined){
      setFile(null)
      setPhotoName("")
      return;
    }
    console.log(event.target.files[0].type);
    if(event.target.files[0].type.includes('image')){ //이미지인지 판별
      setPhotoName(event.target.files[0].name)
      setFile(event.target.files[0])
    }else{
      setPhotoName('')
      setFile(null)
      alert('이미지 형식만 업로드 가능합니다.')
    }
    
  }

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();
    console.log('--onSubmitForm')
    Axios.get('http://61.101.55.223:8441/api/v1/server/status').then(info => console.log(info.data))
    Axios.get('http://61.101.55.223:8441/api/v1/user/load')
    .then(function (res: any) {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
     
    });
    return;
    if(made == '' || name=='' || no =='' || type == '' || madeNo =='' || info =='' ){
      alert('모든 필수 데이터를 입력하세요.');
      return;
    }
    let data = new FormData();
    
    data.append('machine_name', made);
    data.append('machine_label', type);
    data.append('machine_code', no);
    data.append('manufacturer', made);
    data.append('manufacturer_code', madeNo);
    data.append('manufacturer_detail', info);
   
    data.append('machine_photo', file);
    
    //const token = getToken('')

   

    Axios.post(BASE_URL + '/테스트 테스트', data
    , { headers: { Authorization:'', 'Access-Control-Allow-Origin': '*'}})
    .then(function (res: any) {
      console.log(res);
      if(res.status === 200){
        //성공
        alert('등록 되었습니다.')
        
        setMade('');
        setNo('');
        setPhotoName('');
        setInfo('');
        setName('');
        setMadeNo('');
        setType('');
        setFile(null);
      }else{
        //에러처리 
      
        
      }
    })
    .catch(function (error) {
      console.log(error);
     
    });

  },[made, no, name, type, info, photoName,file, madeNo])

  return (
      <DashboardWrapContainer>
        <SubNavigation list={ROUTER_REGISTER}/>
        <InnerBodyContainer>
            <Header title={'기계 정보등록'}/>
            <WhiteBoxContainer>
              <form onSubmit={onsubmitForm} >
                <NormalInput title={'기계 이름'} value={name} onChangeEvent={setName} description={'고객사가 보유한 기계의 이름을 입력하세요'} />
                <NormalInput title={'기계 종류'} value={type} onChangeEvent={setType} description={'고객사가 보유한 기계의 종류를 입력하세요'} />
                <NormalInput title={'기계 번호'} value={no} onChangeEvent={setNo} description={'고객사가 보유한 기계의 번호를 지정하세요'} />
                <NormalInput title={'제조사'} value={made} onChangeEvent={setMade} description={'기계의 제조사명을 입력하세요'} />
                <NormalInput title={'제조사 번호'} value={madeNo} onChangeEvent={setMadeNo} description={'기계의 제조사가 발급한 제조사 번호를 입력하세요 (기계에 부착되어있음)'} />
                <NormalInput title={'제조사 상세정보'} value={info} onChangeEvent={setInfo} description={'기계의 제조사와 관련된 상세 정보를 자유롭게 작성하세요'} />
                <NormalFileInput title={'기계 사진'} name={photoName} thisId={'machinePhoto'} onChangeEvent={addFile} description={'기계 사진을 찍어 올려주세요 (없을시 기본 이미지)'} />
                <RegisterButton name={'기계 정보 등록하기'} />
              
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