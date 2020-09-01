import React, { useEffect, useRef, useState, useContext , useCallback} from 'react';
import Styled, { withTheme } from 'styled-components'
import {BASE_URL, BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import Axios from 'axios';
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import { getToken } from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import {dataSet} from '../../Common/dataset'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import CardList from '../../Components/Card/CardList';
import SmallButton from '../../Components/Button/SmallButton';
import { getRequest } from '../../Common/requestFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import MachineList from './Machine';
import ItemList from '../../Components/List/ItemList';
import IC_UP from '../../Assets/Images/ic_reply_up.png'
import IC_DOWN from '../../Assets/Images/ic_reply_down.png'
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'
import icCircle from '../../Assets/Images/ic_circle.png'
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'
import tempIamge from '../../Assets/Images/temp_machine.png'
import BasicColorButtonLink from '../../Components/Button/BasicColorButtonLink';
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import { Link } from 'react-router-dom';
import ProcessCard from '../../Components/Card/ProcessCard';
// 공정 리스트
const ProcessList = () => {

  interface Line{
    pk: string,
    line_code: string,
    line_detail: string,
    item_list: IStatus[]
  }
  interface LineMachine{
    machine_code: string,
    machine_photo: string,
    machine_name: string,
    is_connected: boolean,
  }

  const [list, setList] = useState<IProcess[]>([]);
  const [option, setOption] = useState<number>(0);
  const [keyword, setKeyword]= useState<string>("");
  const [openTarget, setOpenTarget]= useState<string>("");
  const optionList = [
    "등록순", "이름순", "원자재순 ", "생산품 순", "기계 순"
  ]

  useEffect(()=>{
    getList()
   //setList(dataSet.processList)
  },[])

   /**
   * getList()
   * 목록 불러오기
   * @param {string} url
   * @returns X
   */
  const getList = useCallback(async ()=>{

    const results = await getRequest(`http://192.168.0.14:8299/api/v1/process/list?keyword=${keyword}&orderBy=${option}`, getToken(TOKEN_NAME))

    if(results === false){
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list, option])

  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async (filter:number)=>{
    setOption(filter)
    //alert(`선택 테스트 : 필터선택 - filter : ${filter}` )


    const results = await getRequest(`http://192.168.0.14:8299/api/v1/process/list?keyword=${keyword}&orderBy=${option}`, getToken(TOKEN_NAME))

    if(results === false){
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[option])
  const changeStatusToColor = useCallback((status: string)=>{
    if(status === 'active'){
        return '#25b4b4'
    }else if(status === 'done'){
        return '#2760ff'
    }else if(status === 'stop'){
        return '#fd6b00'
    }else if(status === 'error'){
        return '#ff461a'
    }else if(status === 'share'){
        return '#683be5'
    }else if(status === 'ready'){
        return '#717c90'
    }else if(status === 'reservation'){
        return '#f8a506'
    }else{
        return '#717c90'
    }

},[])

  const changeStatusToString = useCallback((status: string)=>{
    if(status === 'active'){
        return '진행'
    }else if(status === 'done'){
        return '완료'
    }else if(status === 'stop'){
        return '중지'
    }else if(status === 'share'){
        return '공유'
    }else if(status === 'ready'){
        return '대기'
    }else{
        return '대기'
    }

},[])

  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)
    window.location.href=`/update/line?pk=${id}`

  },[])

  return (
      <DashboardWrapContainer index={6}>
        <SubNavigation list={ROUTER_MENU_LIST[6]}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'공정 리스트'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <SmallButtonLink name="+ 등록하기" link="/process/register"/>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
            </div>
          </div>
          {
              list.length !== 0?
          <ProcessWrapBox>
            {
              list.map((v:IProcess, i:number)=>{
                return(
                    <ProcessCard contents={v} onClickEvent={setOpenTarget} openTarget={openTarget} />
                )
              })
            }

          </ProcessWrapBox>
          :
          null}

        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}

const ProcessWrapBox = Styled.div`
  background-color: #2b2c3b;
  display: flex;
  border-radius: 6px;
  flex-wrap: wrap;
  align-content: space-between;
  text-align: left;
  padding: 17px;
`


export default ProcessList;
