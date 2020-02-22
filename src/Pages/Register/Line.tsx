import React, { useEffect, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import WelcomeNavigation from '../../Components/Navigation/WelcomNavigation'
import WelcomeFooter from '../../Components/Footer/WelcomeFooter'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, BI_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import ButtonBox from '../../Components/Button/BasicButton';
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import ThisHeader from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import { getToken } from '../../Common/getToken';
import { Button, Modal } from 'react-bootstrap';
import BasicModal from '../../Components/Modal/BasicModal';
import AddInput from '../../Components/Input/AddInput';
import SearchInput from '../../Components/Input/SearchInput';
import SmallButton from '../../Components/Button/SmallButton';
import AddList from '../../Components/List/AddList';
import TextList from '../../Components/List/TextList';



// 라인 정보 등록 페이지
const RegisterLine= () => {

  const [no, setNo] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [isPoupup, setIsPoupup] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [checkList, setCheckList] = useState([]);
  const [addList, setAddList] = useState([]);
  const [searchList, setSearchList] =useState([]);
  
  //검색
  const onClickSearch = useCallback((value)=>{
    console.log(value)
    setKeyword('')
  },[keyword])

  // 팝업 체크 박스
  const onClickCheck = useCallback((id)=>{
    console.log(checkList.length)
    console.log(id)
    if(checkList.indexOf(id) !== -1){
      let tempArray = checkList.filter((v)=>(v !== id));
      setCheckList(tempArray);
      console.log(tempArray);
    }else{
      if(checkList.length === 0){
        let tempArray = new Array();
        tempArray.push(id);
        setCheckList(tempArray);
        console.log(tempArray);
      }else{
        let tempArray = checkList.map((v)=>(v));
        tempArray.push(id);
        setCheckList(tempArray);
        console.log(tempArray);
      }

    }
    console.log();
  },[checkList])

  // 라인 리스트 추가/제거
  const onClickAdd = useCallback((e)=>{

  },[checkList, setAddList])

  useEffect(()=>{

  },[])

  const onsubmitForm = useCallback((e)=>{
    e.preventDefault();
    console.log('--onSubmitForm')
   
  },[ no, info])

  return (
      <DashboardWrapContainer>
        <FullPageDiv>
            <ThisHeader title={'라인 정보등록'}/>
            <WhiteBoxContainer>
              <form onSubmit={onsubmitForm} >
                <NormalInput title={'라인 번호'} value={no} onChangeEvent={setNo} description={'라인의 번호를 지정하세요'} />
                <NormalInput title={'라인 상세정보'} value={info} onChangeEvent={setInfo} description={'라인의 상세 정보를 자유롭게 작성하세요'} />
                <AddInput title={'기계 추가'} onChangeEvent={()=>{setIsPoupup(true); setCheckList(addList); setKeyword('')}}>
                {
                  addList.map((v, i)=>{ 
                    return ( 
                        <TextList key={i} title={v} name={searchList.filter((value)=>value.machine_code === v )[0].machine_name}/>                    
                    )
                  })
                }
                </AddInput>
                <RegisterButton name={'라인정보 등록하기'} />
                
              </form>
            </WhiteBoxContainer>
            <BasicModal isVisible={isPoupup} header={'기계 선택'} closeEvent={()=>{setIsPoupup(false); setCheckList([])}}>
              <SearchInput description={'기계를 검색해주세요'} value={keyword} onChangeEvent={setKeyword} onClickEvent={()=>onClickSearch(keyword)}/>
                <div style={{width: 360, marginTop:20}}>
                  {
                    !isSearched ?
                    searchList.map((v, i)=>{ 
                      return ( 
                          !v.is_registered ?
                          <AddList key={i} pk={v.machine_code} press={true} check={checkList.indexOf(v.machine_code) == -1? false : true } onClickEvent={()=>onClickCheck(v.machine_code)} title={v.machine_code} name={v.machine_name} />
                          :
                          <AddList key={i} pk={v.machine_code} press={false} check={false} onClickEvent={()=>onClickCheck(v.machine_code)} title={v.machine_code} name={v.machine_name} />
                      )
                    })
                    :
                    null
                  }
                </div>
                <SmallButton name={'추가하기'} onClickEvent={()=>{setIsPoupup(false); setAddList(checkList); setKeyword('')}}/>
            </BasicModal>
            
        </FullPageDiv>
      </DashboardWrapContainer>
      
  );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default RegisterLine;