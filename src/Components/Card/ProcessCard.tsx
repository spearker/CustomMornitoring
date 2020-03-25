import React, { useEffect,useState,useCallback} from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import tempIamge from '../../Assets/Images/temp_machine.png'
import icCloudOn from '../../Assets/Images/ic_cloud.png'
import icCloudOff from '../../Assets/Images/ic_cloud_off.png'
import IC_UP from '../../Assets/Images/ic_reply_up.png'
import IC_DOWN from '../../Assets/Images/ic_reply_down.png'
import icCircle from '../../Assets/Images/ic_circle.png'
import icCircleRotate from '../../Assets/Images/ic_circle_rotate.png'
import { Link } from 'react-router-dom';

interface Props{
  contents: IProcess,
  openTarget: string,
  onClickModify?: any,
  onClickEvent: any,
}



// 공정 썸네일 카드

const ProcessCard = ({ contents, openTarget, onClickEvent, onClickModify}: Props) => {
  
  const [newStock, setNewStock] = useState<number | undefined | string>(Number(contents.output.stock))
  const [open, setOpen]= useState<string>("");
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
   
  },[])

  return (
    <ProcessCardDiv>
    <ProcessHeader>
      <p className="p-bold p-limit" >{contents.name}</p>
    </ProcessHeader>
    <ProcessBody>
      <p className="p-bold" style={{fontSize:12}}>· 원자재 정보</p>
      <div style={{display: 'flex'}}>
        <ProcessInput value={contents.material !== undefined ? contents.material.material_name : ''} readOnly/>
      </div>
      
      <span className="p-bold" style={{fontSize:12}}>· 기계 정보</span>
      <img src={openTarget == contents.pk ? IC_UP : IC_DOWN} style={{float:'right', width:11, cursor:'pointer', marginTop:10}} 
        onClick={()=>{
          if(openTarget == contents.pk){
            onClickEvent("")
          }else if(openTarget == ""){
            onClickEvent(contents.pk !== undefined ? contents.pk : '')
          }else{
            onClickEvent(contents.pk !== undefined ? contents.pk : '')
          }
        }} 
      />
      {
        openTarget == contents.pk ?
        <MachineDivBg>
          <MachineHeader>
            <p className="p-bold p-limit" style={{width:'30%', paddingLeft:4}}>{contents.machine.machine_code}</p>
            <p className="p-bold p-limit" style={{width:'55%'}}>| {contents.machine.machine_name}{contents.machine.machine_name}</p>
            <img className="rotating" src={contents.machine.status === 'active' ? icCircleRotate : icCircle} style={{marginLeft:'auto', marginRight:4,  width:14, height:14, float:'right'}} />
          </MachineHeader>
          <div style={{position:'relative', padding:12, textAlign:'center'}}>
           <img src={contents.machine.is_connect ? icCloudOn : icCloudOff} style={{width: 22, position:'absolute', top:12, left:12}}/>
           <ImageBox src={tempIamge} style={{marginTop:10}}/>
          </div>
          
        </MachineDivBg>
        :
        <MachineDiv>
          <div style={{backgroundColor:changeStatusToColor(contents.machine.status !== undefined ? contents.machine.status : 'gray'), borderRadius: 5, color:'white',textAlign:'center', padding:'4px 11px 4px 11px', width:'25%'}}>
            {contents.machine.status !== undefined ? changeStatusToString(contents.machine.status):'알수없음'}
          </div>
          <div style={{width:'60%', paddingLeft:6, color:'#252525'}} className="p-limit">
            {contents.machine.machine_name}{contents.machine.machine_name}
          </div>
          <div style={{width:'15%', marginLeft:'auto'}}>
            <img src={contents.machine.is_connect ? icCloudOn : icCloudOff} style={{ width:20, float:'right', marginRight:5}}/>
          </div>
        </MachineDiv>
      }

      <p className="p-bold" style={{fontSize:12}}>· 금형 정보</p>
      <div style={{display: 'flex'}}>
      <ProcessInput value={contents.mold_name} readOnly/>
      </div>

      <p className="p-bold" style={{fontSize:12}}>· 생산 자재 정보</p>
      <div style={{display: 'flex',}}>
      <ProcessInput value={contents.output.material_name} readOnly/>
      </div>
      <div style={{display: 'flex', alignItems:'center', marginBottom:18}}>
      <ProcessInput style={{paddingRight:8, marginTop:0, marginBottom:0, textAlign:'right'}}  value={newStock} onChange={(e)=>setNewStock(e.target.value)} />
      <span className="p-bold" style={{fontSize:13, marginLeft:8}}>개</span>
      </div>
      {
        onClickModify !== undefined ? 
        <ButtonBox onClick={()=>onClickModify(contents.pk !== undefined ? contents.pk : '', newStock)}>수량 수정하기</ButtonBox>
      :

      <Link to={`/update/process?pk=`+ contents.pk} >
        <ButtonBox>수정하기</ButtonBox>
      </Link>
      }
    </ProcessBody>

</ProcessCardDiv>
  );
}


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

export default ProcessCard;