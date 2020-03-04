import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import { getRequest, postRequest, getParameter } from '../../Common/requestFunctions';
import SuperNavigation from '../../Components/Navigation/SuperNavigation';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import BTN_UP from '../../Assets/Images/btn_up_rank.png';
import BTN_DOWN from '../../Assets/Images/btn_down_rank.png';
import BTN_DELETE from '../../Assets/Images/btn_delete_rank.png';
import { ROUTER_MANAGE } from '../../Common/routerset';
import NormalInput from '../../Components/Input/NormalInput';
import BasicColorButton from '../../Components/Button/BasicColorButton';
import BasicGrayButtonLink from '../../Components/Button/BasicGrayButtonLink';
import ProfileInput from '../../Components/Input/ProfileInput';
import DropdownInput from '../../Components/Input/DropdownInput';
import DateInput from '../../Components/Input/DateInput';
import ReadOnlyInput from '../../Components/Input/ReadOnlyInput';


const MyPage = () => {

  const [target, setTarget] = useState<IMmember>();
  const [name, setName] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [joinDate, setJoinDate] = useState<string>("");
  const [joinType, setJoinType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [photo, setPhoto] = useState<any | null>();
  const [rankList, setRankList] = useState<string[]>([
    '사장', '이사', '부장', '팀장', '과장', '대리', '사원'
  ]);

  /**
   * onClickSave()
   * 프로필 수정 
   * @param {string} pk 유저 pk 
   * @param {string} profile_img 이미지 데이터
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const onClickSave = useCallback(()=> {
      console.log('save pk : ' + getParameter('pk'))
      const data = {
        pk: getParameter('pk'),
        appointment : rank,
        year : year,
        join_date : joinDate,
        join_type : joinType,
        status : status,
      }
      const results = postRequest(BASE_URL + '/api/v1/member/udpate', data, getToken(TOKEN_NAME))

      if(results === false){
          //setList([""])
        //TODO: 에러 처리
      }else{
        if(results.status === 200){
          alert('저장되었습니다')
        }else if(results.status === 1001 || results.data.status === 1002){
          //TODO:  아이디 존재 확인
        }else{
          //TODO:  기타 오류
        }
      }

  },[target, rank, joinDate, joinType, year, status])
   /**
   * getTarget()
   * 멤버 데이터 조회
   * @param {string} url 요청 주소
   * @param {string} pk 멤버 pk
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getTarget = useCallback(()=> {
    const results = getRequest(BASE_URL + '/api/v1/member/view/' + getParameter("pk") , getToken(TOKEN_NAME))

    if(results === false){
      //TODO: 에러 처리
    }else{
      if(results.status === 200){

          setTarget(results.results)
          setName(results.results.name)
          setJoinDate(results.results.join_date)
          setJoinType(results.results.join_type)
          setRank(results.results.appointment)
          setStatus(results.results.status)
          setYear(results.results.year)
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[target, joinType, joinDate, status, year, rank])


  useEffect(()=>{
    setName(dataSet.targetMember.name)
    setTarget(dataSet.targetMember); //TODO: 테스트용. 지울것.
    setJoinDate(dataSet.targetMember.join_date)
    setJoinType(dataSet.targetMember.join_type)
    setRank(dataSet.targetMember.appointment)
    setStatus(dataSet.targetMember.status)
    setYear(dataSet.targetMember.year)
    setPhoto(dataSet.targetMember.profile_img)
    //getTarget();

  },[])


  /**
   * addFile()
   * 멤버 데이터 조회
   * @param {string} e.target.file 파일
   * @returns X 
   */
  const addFile = useCallback((event: any): void => {
    console.log(event.target.files[0]);

    if(event.target.files[0] === undefined){
      setFile(null)

      return;
    }
    console.log(event.target.files[0].type);
    if(event.target.files[0].type.includes('image')){ //이미지인지 판별

      setFile(event.target.files[0])
      const previewFile = URL.createObjectURL(event.target.files[0])
      console.log(previewFile);
      setPreview(previewFile)


    }else{

      setFile(null)
      alert('이미지 형식만 업로드 가능합니다.')
    }
    
  },[file, photo])

  const setPreview = useCallback((blobUrl)=>{
    console.log('setPreview' + typeof blobUrl);
    setPhoto(blobUrl);
    console.log(photo);
  },[photo])



  return (
      <DashboardWrapContainer>
          <InnerBodyContainer>
            <div style={{position:'relative'}}>
                <Header title={'마이페이지'}/>
                <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
                
                </div>
            </div>
            <WhiteBoxContainer>
             
                <div>
                    <ReadOnlyInput title={'성명'} value={name}/>
                    <ReadOnlyInput title={'직급'} value={rank} />
                    <ReadOnlyInput title={'연차'}  value={String(year)}/>
                    <ReadOnlyInput title={'입사일'} value={joinDate} />
                    <ProfileInput photo={photo} title={'프로필 사진'} name={'profilePhoto'} thisId={'profilePhoto'} onChangeEvent={addFile} />
                </div>
          
              <div style={{textAlign:'center', marginTop:31}}>
              <BasicColorButton name="마이페이지 저장하기" onClickEvent={onClickSave} width={'360px'}/>
              </div>
            </WhiteBoxContainer>
          </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}

const InputBox = Styled.input`
    width: 276px;
    height: 40px;
    border: solid 1px #b3b3b3;
    padding-left: 11px;
    font-size: 14px;
    font-weight: bold;
    background-color: transparent;
`

const ButtonBox = Styled.button`
    padding: 4px 24px 4px 24px;
    color: white;
    border-radius: 5px;
    background-color: ${BG_COLOR_SUB};
    border: 0;
    font-size: 14px;
    margin-left: 9px;
`
export default MyPage;