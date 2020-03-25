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
import { ROUTER_LIST } from '../../Common/routerset';
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
  const [openTarget, setOpenTarget]= useState<string>("");
  const optionList = [
    "등록순", "이름순", "원자재순 ", "생산품 순", "기계 순"
  ]
   /**
   * getList()
   * 목록 불러오기
   * @param {string} url 
   * @returns X
   */
  const getList = useCallback(async ()=>{
   
    const results = await getRequest(BASE_URL + '/api/v1/process/list/0',getToken(TOKEN_NAME))

    if(results === false){
      alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
        alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list])

  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async (filter:number)=>{
    setOption(filter)
    //alert(`선택 테스트 : 필터선택 - filter : ${filter}` )
    
    const results = await getRequest(BASE_URL + '/api/v1/process/list/'+filter,getToken(TOKEN_NAME))

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
  useEffect(()=>{
    //getList()
   setList(dataSet.processList)
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
      <DashboardWrapContainer>
        <SubNavigation list={ROUTER_LIST}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
            <Header title={'공정 리스트'}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
            </div>
          </div>
          <ProcessWrapBox>
            {
              list.map((v:IProcess, i:number)=>{
                return(
                    <ProcessCard contents={v} onClickEvent={setOpenTarget} openTarget={openTarget} />
                )
              })
            }
            
        
          </ProcessWrapBox>
        
        </InnerBodyContainer>
      </DashboardWrapContainer>
      
  );
}
const ButtonBox = Styled.button`
    padding-top: 6px;
    padding-bottom: 6px;
    color: black;
    width: 100%;
    border-radius: 5px;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 13px;
    font-weight: bold;
`
const ProcessWrapBox = Styled.div`
  background-color: #2b2c3b;
  display: flex;
  border-radius: 6px;
  flex-wrap: wrap;
  align-content: space-between;
  text-align: left;
  padding: 17px;
`

const ProcessHeader = Styled.div`
  background-color: #25b4b4;
  border-radius: 5px;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
`
const ImageBox = Styled.img`
  width: 90px;
  height: 120px;
  object-fit: cover;

`
const MachineHeader = Styled.div`
  background-color: #25b4b4;
  border-radius: 5px;
  display: flex;
  align-items: center; justify-content: center; 
  color: white;
  font-size: 13px;
  text-align: left;
  padding-top: 4px;
  padding-bottom: 4px;
`



const ProcessBody = Styled.div`
  margin: 10px;
  color: #252525;
`
const ProcessCardDiv = Styled.div`
   width: 240px;
   background-color: #e7e9eb;
   display: inline-block;
   border-radius: 5px;
   margin: 12px;
`
const Active = Styled.div`
   width: 100%;
   background-color: #25b4b4;
   display: inline-block;
   border-radius: 5px;
   border: 0px;
   padding: 6px 11px 6px 11px;
   margin-top: 4px;
   font-size: 14px;
   margin-bottom: 14px;
`
const Ready = Styled.div`
   width: 100%;
   background-color: #717c90;
   display: inline-block;
   border-radius: 5px;
   border: 0px;
   padding: 6px 11px 6px 11px;
   margin-top: 4px;
   font-size: 14px;
   margin-bottom: 14px;
`
const Error = Styled.div`
   width: 100%;
   background-color: #717c90;
   display: inline-block;
   border-radius: 5px;
   border: 0px;
   padding: 6px 11px 6px 11px;
   margin-top: 4px;
   font-size: 14px;
   margin-bottom: 14px;
`

const MachineDiv = Styled.div`
   width: 100%;
   display: flex;
   background-color: white;
   border-radius: 5px;
   border: 0px;
   padding: 0px;
   margin-top: 4px;
   font-size: 14px;
   align-items: center; justify-content: center; 
   margin-bottom: 14px;
`

const MachineDivBg = Styled.div`
  width: 100%;
  background-color: white;
  display: inline-block;
  border-radius: 5px;
  border: 0px;
  padding: 0px;
  margin-top: 4px;
  font-size: 14px;
  margin-bottom: 14px;
`

const ProcessInput = Styled.input`
   width: 100%;
   background-color: white;
   display: inline-block;
   border-radius: 5px;
   border: 0px;
   padding: 6px;
   margin-top: 4px;
   font-size: 14px;
   margin-bottom: 14px;
`
const FullPageDiv = Styled.div`

  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default ProcessList;