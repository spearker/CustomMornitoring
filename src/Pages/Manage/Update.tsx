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


const CompanySetting = () => {

  const [target, setTarget] = useState<IMmember>();
  const [rank, setRank] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [joinDate, setJoinDate] = useState<string>("");
  const [joinType, setJoinType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [rankList, setRankList] = useState<string[]>([
    '사장', '이사', '부장', '팀장', '과장', '대리', '사원'
  ]);

  /**
   * onClickSave()
   * 프로필 수정 
   * @param {string} pk 유저 pk 
   * @param {string} rank 직급
   * @param {string} year 연차
   * @param {string} joinDate 입사일
   * @param {string} joinType 채용형태 
   * @param {string} status 재직상태
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
  /*
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
*/
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

  /**
   * getRankList()
   * 직급직책 자료 조회
   * @param {string} url 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getRankList = useCallback(()=> {
    const results = getRequest(BASE_URL + '/list/rank', getToken(TOKEN_NAME))

    if(results === false){
        //setList([""])
      //TODO: 에러 처리
    }else{
      if(results.status === 200){
          if(results.results.length > 0){
           //setList(results.results)
          }else{
            //setList([""])
          }
      }else if(results.status === 1001 || results.data.status === 1002){
        //TODO:  아이디 존재 확인
      }else{
        //TODO:  기타 오류
      }
    }
  },[rankList])

  useEffect(()=>{

    setTarget(dataSet.targetMember); //TODO: 테스트용. 지울것.
    setJoinDate(dataSet.targetMember.join_date)
    setJoinType(dataSet.targetMember.join_type)
    setRank(dataSet.targetMember.appointment)
    setStatus(dataSet.targetMember.status)
    setYear(dataSet.targetMember.year)

    //getTarget();

  },[])

  const onClickAccept = useCallback((id)=>{

    console.log('--select id : ' + id)

  },[])

  return (
      <DashboardWrapContainer>
          <SubNavigation list={ROUTER_MANAGE}/>
          <InnerBodyContainer>
            <div style={{position:'relative'}}>
                <Header title={'구성원 관리'}/>
                <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
                
                </div>
            </div>
            <WhiteBoxContainer>
              {
                target !== undefined  ?
                <div>
                    <NormalInput title={'성명'} description={""} value={target.name} onChangeEvent={null}/>
                    <NormalInput title={'이메일'} description={""} value={target.email} onChangeEvent={null}/>
                    <DropdownInput title={'직급'} contents={rankList} target={rank} onChangeEvent={setRank}/>
                    <NormalInput title={'연차'} description={""} value={String(year)} onChangeEvent={setYear}/>
                    <DateInput title={'입사일'} description={""} value={joinDate} onChangeEvent={setJoinDate}/>
                    <DropdownInput title={'채용형태'} contents={['공채','특채','경력직','계약직','파견직','기타']} target={joinType} onChangeEvent={setJoinType}/>
                    <DropdownInput title={'상태'} contents={['재직','휴직','퇴직','기타']} target={status} onChangeEvent={setStatus}/>
                    <ProfileInput photo={target.profile_img} title={'프로필 사진'} name={'profilePhoto'} thisId={'profilePhoto'} onChangeEvent={null} description={'기계 사진을 찍어 올려주세요 (없을시 기본 이미지)'} />
                </div>
                :null
              }
              <div style={{textAlign:'center', marginTop:31}}>
              <BasicGrayButtonLink name="취소하기" to="/manage/members" width={'360px'}/>&nbsp;&nbsp;&nbsp;
              <BasicColorButton name="수정하기" onClickEvent={onClickSave} width={'360px'}/>
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
export default CompanySetting;