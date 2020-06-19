import React, { useEffect, useState, useContext , useCallback, ReactElement} from 'react';
import Styled from 'styled-components'
import { BG_COLOR_SUB2, BG_COLOR_SUB, BG_COLOR, POINT_COLOR } from '../../Common/configset';
import IMG_MAP from '../../Assets/Images/img_map_readytime.png'
import IMG_TIME from '../../Assets/Images/img_timeline.png'
import IMG_KEY from '../../Assets/Images/img_time_key_error.png'
import { changeStatusToString } from '../../Common/statusFunctions';
import moment from 'moment';

const dummy_machines = [
  {
    pk: '0001',
    name: '프레스 01',
    ton: 800,
    status: 'active',
    motor: 'ok',
    code: '0000-0000-0000',
    error: '20.06.10 00 : 오일 순화 에러 ',
    ready_time: '01:23:00'
  },
  {
    pk: '0002',
    name: '프레스 02',
    ton: 800,
    status: 'active',
    motor: 'ok',
    code: '0000-0000-0000',
    error: '',
    ready_time: '01:23:00'
  },{
    pk: '0003',
    name: '프레스 03',
    ton: 800,
    status: 'active',
    motor: 'ok',
    code: '0000-0000-0000',
    error: '20.06.17 00 : 오일 순화 에러 ',
    ready_time: '01:23:00'
  },
  {
    pk: '0004',
    name: '프레스 04',
    ton: 800,
    status: 'active',
    motor: 'ok',
    code: '0000-0000-0000',
    ready_time: '01:23:00',
    error: '',
  },
  {
    pk: '0005',
    name: '프레스 05',
    ton: 800,
    status: 'active',
    motor: 'ok',
    code: '0000-0000-0000',
    ready_time: '01:23:00',
    error: '',
  },
  {
    pk: '0006',
    name: '프레스 06',
    ton: 800,
    status: 'active',
    motor: 'ok',
    code: '0000-0000-0000',
    ready_time: '01:23:00',
    error: '',
  },
  {
    pk: '0007',
    name: '프레스 07',
    ton: 800,
    status: 'active',
    motor: 'ok',
    code: '0000-0000-0000',
    ready_time: '01:23:00',
    error: '',
  },
]

const dummy_history = [
  {
    start: '2020-03-03 00:00:01',
    end: '2020-03-03 06:20:00',
    type: 'ready'
  },
  {
    start: '2020-03-03 06:20:00',
    end: '2020-03-03 08:40:00',
    type: 'active',
  },
  {
    start: '2020-03-03 08:40:00',
    end: '2020-03-03 09:10:00',
    type: 'ready',
  },
  {
    start: '2020-03-03 09:10:00',
    end: '2020-03-03 12:55:00',
    type: 'active',
  },
  {
    time: '2020-03-03 12:56:08',
    type: 'error',
    error: '에러 : FFFF'
  },
  {
    start: '2020-03-03 12:56:00',
    end: '2020-03-03 13:45:00',
    type: 'ready',
  },
  {
    start: '2020-03-03 13:45:00',
    end: '2020-03-03 14:35:00',
    type: 'qdc',
  },
  {
    start: '2020-03-03 14:45:00',
    end: '2020-03-03 17:25:00',
    type: 'active',
  },
  {
    start: '2020-03-03 17:25:00',
    end: '2020-03-03 23:57:00',
    type: 'ready',
  }
]

const dummy_xy = [ 
  {x: 105 ,y: 66},
  {x: 185 ,y: 66},
  {x: 265 ,y: 66},
  {x: 340 ,y: 66},
  {x: 420 ,y: 66},
  {x: 500 ,y: 66},
  {x: 650 ,y: 200},

]
const ReadyTimeContainer = () => {

  const [selectedMachine, setSelectedMachine] = useState<any>('');
  const TODAY_START = new Date(moment().format('YYYY-MM-DD 00:00:00')).getTime();
  const TODAY_END = new Date(moment().format('YYYY-MM-DD 24:00:00')).getTime();

  const getWidthPercent = ( start, end ) =>{
    return Math.floor((new Date(moment().format(end)).getTime() - new Date(moment().format(start)).getTime()) / (TODAY_END - TODAY_START) * 100)
  }
  useEffect(()=>{
   
  },[])

  return (
    <div>
      <div style={{position:'relative', textAlign:'left', marginTop:48}}>
        
        <div style={{display:'inline-block', textAlign:'left'}}>           
          <span style={{fontSize:20, marginRight:18, marginLeft: 3}}>비가동 시간 분석</span>
        </div>
      </div>
      <MapFlexBox>
          <MapBox>
              <img src={IMG_MAP} />
              {
                dummy_machines.map((m, i)=>{
                  if(selectedMachine.pk == m.pk){
                  
                  return(
                    <PressSimbolSelected
                      key={'sp-'+ i} 
                      onClick={()=>setSelectedMachine(m)}
                      style={{ left: dummy_xy[i].x, top: dummy_xy[i].y}}>
                      {m.name}<br />({m.ton}ton)
                    </PressSimbolSelected>
                  )
                  }else{
                    return(
                      <PressSimbol
                        key={'sp-'+ i} 
                        onClick={()=>setSelectedMachine(m)}
                        style={{ left: dummy_xy[i].x, top: dummy_xy[i].y}}>
                        {m.name}<br />({m.ton}ton)
                      </PressSimbol>
                    )
                  }

                })
              }
          </MapBox>
          <SideInfoBox>
              {
                selectedMachine == '' ?
                <HintText>기계를 선택해주세요<br/>제조번호 정보 없음.<br/></HintText>
                :
                <>
                <p>{selectedMachine.name}</p>
                <p>제조 번호 : {selectedMachine.code}</p>
                </>
              }
              <SummuryBox>
                <p>에러기록</p>
                {
                  selectedMachine == '' ?
                  <div><HintText>에러 정보 없음.</HintText></div>
                  :
                  <div>{selectedMachine.error !== '' ? <p style={{color:'red'}}>{ selectedMachine.error}</p> : <HintText>에러 정보 없음.</HintText>}</div>
                }
                <p>모터상태</p>
                {
                  selectedMachine == '' ?
                  <div><HintText>정상/비정상</HintText></div>
                  :
                  <div>{ changeStatusToString( selectedMachine.motor) }</div>
               }
              </SummuryBox>

          </SideInfoBox>
      </MapFlexBox>
        {
          selectedMachine == '' ?
          <NoTimeDataBox>
            기계를 선택해주세요.
          </NoTimeDataBox>
          :
          <TimeLineBox>
              <p style={{float: 'right'}}>{moment().format('YYYY. MM. DD')}</p>
              <p>{selectedMachine.name}</p>
              <p>제조 번호 : {selectedMachine.code}</p>
              
              <TimeBarWrapper>
                <TimeBar>
                  {
                    dummy_history.map((m, i)=>{
                      if(m.type === 'ready'){
                        return(
                          <>
                         
                          <Packet style={{width: getWidthPercent(dummy_history[i].start, dummy_history[i].end) +'%'}}>
                            <PacketTag> {'시작 : ' + moment(dummy_history[i].start).format('HH:mm')} <br/>{'종료 : ' + moment(dummy_history[i].end).format('HH:mm')} </PacketTag>
                          </Packet>
                          </>
                        )
                      }else if(m.type === 'active'){
                        return(
                          <Packet style={{backgroundColor:'#28aeae', width: getWidthPercent(dummy_history[i].start, dummy_history[i].end) +'%'}}>
                             <PacketTag> {'시작 : ' + moment(dummy_history[i].start).format('HH:mm')} <br/>{'종료 : ' + moment(dummy_history[i].end).format('HH:mm')} </PacketTag>
                          </Packet>
                        )
                      }else if(m.type === 'error'){
                        return(
                          <PacketError style={{backgroundColor:'red', width: 2, }}>
                             <p> {m.error} ({moment(m.time).format('HH:mm:ss')})</p>
                          </PacketError>
                        )
                      }else{
                        return(
                          <Packet style={{width: getWidthPercent(dummy_history[i].start, dummy_history[i].end) +'%'}}>
                             <PacketTag> {'시작 : ' + moment(dummy_history[i].start).format('HH:mm')} <br/>{'종료 : ' + moment(dummy_history[i].end).format('HH:mm')} </PacketTag>
                          </Packet>
                        )
                      }
                      
                    })
                  }
                </TimeBar>
                <img src={IMG_TIME} />
                </TimeBarWrapper>
                <ImgKey src={IMG_KEY} />
          </TimeLineBox>
        }
    </div>
  );
}

const PressBox = Styled.div`

`
//#fd6b00
const SummuryBox = Styled.div`
  
  div{
    margin-top: 10px;
    text-align: left;
    padding: 19px;
    color: #b3b3b3;
    background-color: #3c4353;
    border-radius: 6px;
    margin-bottom: 12px;
    font-size: 15px;
    p{
      font-size: 15px;
    }
  }
  margin-top: 24px;
`


const TimeBarWrapper = Styled.div`
  margin-top: 40px;
  background-color: #191d27;
  padding-top: 60px;
  padding-bottom: 60px;
  border-radius: 6px;
  font-size: 18px;
  text-align: center;
  img{
    width: 980px;

  }
 
`


const ImgKey = Styled.img`
  width: 200px;
  margin-right: 60px;
  margin-top: 17px;
  float: right;


`
const TimeBar = Styled.div`
  text-align: left;
  width: 960px;
  height: 44px;
  background-color: #717c90;
  border-radius: 6px; 
  display: inline-block;


`

const PacketError = Styled.div`
  height: 100%;
  display: inline-block;
  position: relative;
  p{
    position: absolute;
    top: -30px;
    color: red;
    font-size: 15px;
    font-weight: bold;
    white-space: nowrap;
    left: -10px;
  }
`
const Packet = Styled.div`
  height: 100%;
  display: inline-block;
  div{
    visibility: hidden;
  }
  &:hover{
    position: relative;
    div{
      visibility: visible;
    }
  }
`

const PacketTag = Styled.div`
  color: #252525;


    padding: 9px 19px;
    background-color: white;
    border-radius: 10px;
    font-size: 15px;
    position: absolute;
    top: -70px;
    min-width: 100px;
    left: -10px;

`

const MapBox = Styled.div`
  background-color: #17181c;
  padding: 10px;
  position: relative;
  border-radius: 6px;
  width: 70%;
  margin-right: 20px;
  img{
    width: 100%;
  }

`

const HintText = Styled.p`
  color: #515664;
  
`

const TimeLineBox = Styled.div`
    background-color: #2b2c3b;
    padding: 14px 19px 27px 14px;
    min-height: 370px;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 6px;
    p{
      text-align: left;
    }
  
`

const NoTimeDataBox = Styled.div`
    margin-top: 20px;
    color: #515664;
    font-size: 18px;
    padding: 12px;
    background-color: #252525;
`
const SideInfoBox = Styled.div`
  background-color: #17181c;
  padding: 12px 19px;
  border-radius: 6px;
  width: 30%;
  color: white;
  text-align: left;
  p{
    font-size: 18px;
  }
`
const MapFlexBox = Styled.div`
  display: flex;
  margin-top: 21px;
`
const PressSimbol = Styled.div`
  background-color: #717c90;
  border-radius: 6px;
  width: 50px;
  position: absolute;
  font-size: 10px;
  min-height: 40px;
  font-weight: bold;
  padding: 4px;
  text-align: center;
  cursor: pointer;
`

const PressSimbolSelected = Styled.div`
  background-color: ${POINT_COLOR};
  border-radius: 6px;
  width: 50px;
  position: absolute;
  font-size: 10px;
  min-height: 40px;
  font-weight: bold;
  padding: 4px;
  text-align: center;
  cursor: pointer;

`
export default ReadyTimeContainer;