import React, { useEffect, useRef, useState, useContext, useCallback } from 'react';
import Styled, { withTheme } from 'styled-components'
import { BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME } from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import 'react-dropdown/style.css'
import { dataSet } from '../../Common/dataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import { getRequest, postRequest, getParameter } from '../../Common/requestFunctions';
import SuperNavigation from '../../Components/Navigation/SuperNavigation';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import BTN_UP from '../../Assets/Images/btn_up_rank.png';
import BTN_DOWN from '../../Assets/Images/btn_down_rank.png';
import BTN_DELETE from '../../Assets/Images/btn_delete_rank.png';
import {      ROUTER_MENU_LIST } from '../../Common/routerset';
import NormalInput from '../../Components/Input/NormalInput';
import BasicColorButton from '../../Components/Button/BasicColorButton';
import BasicGrayButtonLink from '../../Components/Button/BasicGrayButtonLink';
import ProfileInput from '../../Components/Input/ProfileInput';
import DropdownInput from '../../Components/Input/DropdownInput';
import DateInput from '../../Components/Input/DateInput';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import DropdownText from '../../Components/Input/DropdownText';
import InputContainer from '../../Containers/InputContainer';
import useOnclickOutside from 'react-cool-onclickoutside';
import IC_ARROW from '../../Assets/Images/ic_drop_down.png'
import IC_ARROW_UP from '../../Assets/Images/ic_drop_up.png'

const CompanySetting = () => {

  const [target, setTarget] = useState<IMmember>();
  const [rank, setRank] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [joinDate, setJoinDate] = useState<string>("");
  const [joinType, setJoinType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [rankList, setRankList] = useState<string[]>([]);
  const [list, setList] = useState<ITeam[]>([]);
  const [list2, setList2] = useState<ITeam[]>([]);
  const [targetTeam, setTargetTeam] = useState<ITeam | null>(null);
  const [targetTeam2, setTargetTeam2] = useState<ITeam | null>(null);
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  const handleClickBtn = () => {
    setIsOpen(!isOpen);
  };

  const tempList = [

    { pk: '21332121', name: '개발팀' },
    { pk: '213251', name: '생산팀' },
    { pk: '213215521', name: '운영팀' },
    { pk: '2134624221', name: '영업팀' },
  ]
  const tempList2 = [

    { pk: '2132351121', name: '1팀' },
    { pk: '213754731', name: '2팀' },

  ]
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
  const onClickSave = useCallback(async () => {
    //console.log('save pk : ' + getParameter('id'))
    let myTeam: string |  null = null
    if(targetTeam !== null &&targetTeam2 === null){
      myTeam = targetTeam.pk
    }else if(targetTeam !== null &&targetTeam2 !== null){
      myTeam = targetTeam2.pk
    }

    const data = {
      pk: getParameter('pk'),
      appointment: rank,
      year: year,
      join_date: joinDate,
      join_type: joinType,
      status: status,
      team_pk : myTeam
    }
    const results = await postRequest('http://203.234.183.22:8299/api/v1/member/update', data, getToken(TOKEN_NAME))

    if (results === false) {
      //setList([""])
      //TODO: 에러 처리
    } else {
      if (results.status === 200) {
        alert('성공적으로 저장되었습니다')
      } else {
        alert('업데이트 실패하였습니다. 모든 필수 항목을 입력해주세요.')
      }
    }

  }, [target, rank, joinDate, joinType, year, status, targetTeam, targetTeam2])

  /**
  * getTarget()
  * 멤버 데이터 조회
  * @param {string} url 요청 주소
  * @param {string} pk 멤버 pk
  * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
  */
  const getTarget = useCallback(async () => {


    const results = await getRequest('http://203.234.183.22:8299/api/v1/member/view?pk=' + getParameter("pk"), getToken(TOKEN_NAME))

    if (results === false) {
      //TODO: 에러 처리
    } else {
      if(results.status === undefined){
        return;
      }
      if (results.status === 200) {

        setTarget(results.results)
        setJoinDate(results.results.join_date)
        setJoinType(results.results.join_type)
        setRank(results.results.appointment)
        setStatus(results.results.status)
        setYear(results.results.year)
        setTargetTeam(results.results.mother_team)
        setTargetTeam2(results.results.team)
      } else {
        //alert('잘못된 접근입니다.')
        //window.location.href = '/manage/members'
      }
    }
  }, [target, joinType, joinDate, status, year, rank, targetTeam, targetTeam2])

  /**
   * getRankList()
   * 직급직책 자료 조회
   * @param {string} url 요청 주소
   * @returns X 리턴데이터, 요청실패(false) 이벤트 처리
   */
  const getRankList = useCallback(async () => {
    const results = await getRequest('http://192.168.0.14:8088/api/v1/admin/appointment/list', getToken(TOKEN_NAME))

    if (results === false) {
      //setList([""])
      //TODO: 에러 처리
    } else {
      if (results.status === 200) {
        if (results.results.length > 0) {
          setRankList(results.results)

        } else {
          //setList([""])
        }
      } else if (results.status === 1001 || results.data.status === 1002) {
        //TODO:  아이디 존재 확인
      } else {
        //TODO:  기타 오류
      }
    }
  }, [rankList])

  useEffect(() => {
    /*
    setTarget(dataSet.targetMember); //TODO: 테스트용. 지울것.
    setJoinDate(dataSet.targetMember.join_date)
    setJoinType(dataSet.targetMember.join_type)
    setRank(dataSet.targetMember.appointment)
    setStatus(dataSet.targetMember.status)
    setYear(dataSet.targetMember.year)
    */
   getTarget();
    getRankList();
    getList()
    //setList(tempList)
    //setList2(tempList2)
  }, [])


  /**
   * getData()
   * 초기 팀 목록 조회
   * @param {string} url
   * @returns X
   */
  const getList = useCallback(async () => {
    const results = await getRequest('http://203.234.183.22:8299/api/v1/member/teams/list?keyword=' , getToken(TOKEN_NAME))
    if (results === false) {
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    } else {
      if (results.status === 200) {
        setList(results.results)

      } else {
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  }, [list, list2])

  const onClickMotherTeam = useCallback((id) => {

    console.log('--select id : ' + id)

  }, [])

   /**
   * getDataSubTeams()
   * 목록 불러오기
   * @param {string} url
   * @returns X
   */
  const getDataSubTeams = useCallback(async () => {

    if(targetTeam == null){
      return;
    }
    const results = await getRequest('http://203.234.183.22:8299/api/v1/member/teams/list?pk=' + targetTeam.pk + '&keyword=' , getToken(TOKEN_NAME))
    if (results === false) {
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    } else {
      if (results.status === 200) {
        setList2(results.results)
        setList2(results.results)
      } else {
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  }, [list2, targetTeam, targetTeam2, list])

  return (
    <DashboardWrapContainer index={1}>
      <SubNavigation list={ROUTER_MENU_LIST[1]} />
      <InnerBodyContainer>
        <div style={{ position: 'relative' }}>
          <Header title={'구성원 관리'} />
          <div style={{ position: 'absolute', display: 'inline-block', top: 0, right: 0, zIndex: 4 }}>

          </div>
        </div>
        <WhiteBoxContainer>
          {
            target !== undefined ?
              <div>
                <NormalInput title={'성명'} description={""} value={target.name} onChangeEvent={null} />
                <NormalInput title={'이메일'} description={""} value={target.email} onChangeEvent={null} />
                <DropdownText title={'직급'} contents={rankList} target={rank} onChangeEvent={setRank} />
                <NormalNumberInput title={'연차'} description={""} value={year} onChangeEvent={setYear} />

                <InputContainer title={'소속 부서/팀'} >
                  <div ref={ref} style={{ width: 'calc(100% - 200px)', display:'flex', }}>
                    <div style={{position: 'relative', width:'30%' }}>
                    <InputBox onClick={()=>handleClickBtn}>{targetTeam == null ? '(상위 부서 선택)' : targetTeam.name}</InputBox>
                    <div onClick={() => setIsOpen(true)} style={{ position: 'absolute', top: 0, right: -17, zIndex: 3, backgroundColor: POINT_COLOR, width: 33, height: 33, textAlign: 'center', display: 'inline-block' }}>
                      <img src={IC_ARROW} style={{ width: 20, marginTop: 6 }} />
                    </div>
                    {
                      isOpen ?
                        <>
                          <div style={{ position: 'absolute', zIndex: 4, top: 0, left: 0, width: '100%' }}>
                            <InputBox onClick={()=>handleClickBtn}>{targetTeam == null  ? '(상위 부서 선택)' : targetTeam.name}</InputBox>
                            {list.map((v, i) => {
                              return (
                                <InputBoxList key={i} onClick={() => { setList2([]);setTargetTeam(v); setTargetTeam2(null) ;setIsOpen(false);getDataSubTeams();}}>{v.name}</InputBoxList>
                              )

                            })}
                          </div>
                          <div onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: 0, right: -17, zIndex: 4, backgroundColor: POINT_COLOR, width: 33, height: 33, textAlign: 'center', display: 'inline-block' }}>
                            <img src={IC_ARROW_UP} style={{ width: 20, marginTop: 6 }} />
                          </div>
                        </>
                        :
                        null
                    }
                    </div>

                    <div style={{position: 'relative', width:'30%' , marginLeft:22}}>
                    <InputBox onClick={()=>handleClickBtn}>{targetTeam2 == null ? '(하위 부서 선택)' : targetTeam2.name}</InputBox>
                    <div onClick={() => setIsOpen2(true)} style={{ position: 'absolute', top: 0, right: -17, zIndex: 3, backgroundColor: POINT_COLOR, width: 33, height: 33, textAlign: 'center', display: 'inline-block' }}>
                      <img src={IC_ARROW} style={{ width: 20, marginTop: 6 }} />
                    </div>
                    {
                      isOpen2 ?
                        <>
                          <div style={{ position: 'absolute', zIndex: 4, top: 0, left: 0, width: '100%' }}>
                            <InputBox onClick={()=>handleClickBtn}>{targetTeam2 == null  ? '(하위 부서 선택)' : targetTeam2.name}</InputBox>
                            {list2.map((v, i) => {
                              return (
                                <InputBoxList key={i} onClick={() => { setTargetTeam2(v); setIsOpen2(false) }}>{v.name}</InputBoxList>
                              )

                            })}

                          </div>
                          <div onClick={() => setIsOpen2(false)} style={{ position: 'absolute', top: 0, right: -17, zIndex: 4, backgroundColor: POINT_COLOR, width: 33, height: 33, textAlign: 'center', display: 'inline-block' }}>
                            <img src={IC_ARROW_UP} style={{ width: 20, marginTop: 6 }} />
                          </div>
                        </>
                        :
                        null
                    }
                    </div>

                  </div>
                </InputContainer>

                <DateInput title={'입사일'} description={""} value={joinDate} onChangeEvent={setJoinDate} />
                <DropdownText title={'채용형태'} contents={['공채', '특채', '경력직', '계약직', '파견직', '기타']} target={joinType} onChangeEvent={setJoinType} />
                <DropdownText title={'상태'} contents={['재직', '휴직', '퇴직', '기타']} target={status} onChangeEvent={setStatus} />
                <ProfileInput photo={target.profile_img} title={'프로필 사진'} name={'profilePhoto'} thisId={'profilePhoto'} onChangeEvent={null} />
              </div>
              : null
          }
          <div style={{ textAlign: 'center', marginTop: 31 }}>
            <BasicGrayButtonLink name="취소하기" to="/manage/members" width={'360px'} />&nbsp;&nbsp;&nbsp;
              <BasicColorButton name="수정하기" onClickEvent={onClickSave} width={'360px'} />
          </div>
        </WhiteBoxContainer>
      </InnerBodyContainer>
    </DashboardWrapContainer>

  );
}

const InputBox = Styled.div`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: 100%;
    background-color: #f4f6fa;
`
const InputBoxList = Styled.div`
    border: solid 0.5px ${BG_COLOR_SUB2};
    cursor: pointer;
    color: white;
    border-top: 0;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: 100%;
    background-color: ${BG_COLOR_SUB};
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
