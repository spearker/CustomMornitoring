import React, {useState} from 'react'
import moment from "moment";
import IMG_TIME from "../../Assets/Images/img_timeline.png";
import IMG_KEY from "../../Assets/Images/img_time_key_error.png";
import Styled from "styled-components";
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
        end: '2020-03-03 24:00:00',
        type: 'ready',
    },
]

const dummy_history2 = [
    {
        start: '2020-03-03 06:00:00',
        end: '2020-03-03 07:20:00',
        type: 'moldChange'
    },
]

const TODAY_START = new Date(moment().format('YYYY-MM-DD 00:00:00')).getTime();
const TODAY_END = new Date(moment().format('YYYY-MM-DD 24:00:00')).getTime();

const ReadyTimeStatisticsContainer = () => {
    const [selectedMachine, setSelectedMachine] = useState<any>({name: "프레스 01 (1000ton)", time: "00:00:00"});
    /// 더미데이이터 구현을 하더라고 api처럼 사용함

    let moldData = ''

    const getWidthPercent = ( start, end ) =>{
        return Math.floor((new Date(moment().format(end)).getTime() - new Date(moment().format(start)).getTime()) / (TODAY_END - TODAY_START) * 100)
    }

    return (
        <div>
            <TimeLineBox>
                <p style={{float: 'right'}}>{moment().format('YYYY. MM. DD')}</p>
                <p>{selectedMachine.name}</p>
                <p>총 1일 비가동 시 : {selectedMachine.time}</p>

                <TimeBarWrapper>
                    <TimeBar>
                        {
                            dummy_history.map((m, i)=>{
                                if(m.type === 'ready'){
                                    return(
                                        <>
                                            <Packet style={{width: getWidthPercent(dummy_history[i].start, dummy_history[i].end) +'%', backgroundColor: '#ff4f00'}}>
                                                <PacketTag> {'시작 : ' + moment(dummy_history[i].start).format('HH:mm')} <br/>{'종료 : ' + moment(dummy_history[i].end).format('HH:mm')} </PacketTag>
                                            </Packet>
                                        </>
                                    )
                                }else if(m.type === 'active'){
                                    return(
                                        <Packet style={{width: getWidthPercent(dummy_history[i].start, dummy_history[i].end) +'%'}}>
                                            <PacketTag> {'시작 : ' + moment(dummy_history[i].start).format('HH:mm')} <br/>{'종료 : ' + moment(dummy_history[i].end).format('HH:mm')} </PacketTag>
                                        </Packet>
                                    )
                                }else {
                                    return(
                                        <Packet style={{width: getWidthPercent(dummy_history[i].start, dummy_history[i].end) +'%'}}>
                                            <PacketTag> {'시작 : ' + moment(dummy_history[i].start).format('HH:mm')} <br/>{'종료 : ' + moment(dummy_history[i].end).format('HH:mm')} </PacketTag>
                                        </Packet>
                                    )
                                }

                            })
                        }
                        <TimeBarMold style={{top: 330}}>
                            {
                                dummy_history2.map((v, i) => {
                                    if(v.type === 'moldChange'){
                                        moldData = v.end
                                        return (<Packet style={{width: getWidthPercent(dummy_history2[i].start, dummy_history2[i].end) +'%', backgroundColor: '#5d00ffaa',
                                            marginLeft: i === 0 ? getWidthPercent("2020-03-03 00:00:00", dummy_history2[i].start)+"%" : getWidthPercent(moldData, dummy_history2[i].start)+"%"
                                        }}>
                                            <PacketTag> {'시작 : ' + moment(dummy_history2[i].start).format('HH:mm')} <br/>{'종료 : ' + moment(dummy_history2[i].end).format('HH:mm')} </PacketTag>
                                        </Packet>)
                                    }
                                })
                            }
                        </TimeBarMold>
                    </TimeBar>
                    <img src={IMG_TIME} />
                    <ImgKey>
                        <div style={{flex: 1, flexDirection:'row', marginLeft: 10, float: 'left'}}>
                            <div style={{width: 44, height: 18, backgroundColor: '#e9e9e9aa', float: "left", marginTop: 5}} />
                            <p>가동 시간</p>
                        </div>
                        <div style={{flex: 1, flexDirection:'row', marginLeft: 10, float: 'left'}}>
                            <div style={{width: 44, height: 18, backgroundColor: '#e9e9e9aa', float: "left", marginTop: 5}} />
                            <p>비가동 시간</p>
                        </div>
                        <div style={{flex: 1, flexDirection:'row', marginLeft: 10, float: 'left'}}>
                            <div style={{width: 44, height: 18, backgroundColor: '#e9e9e9aa', float: "left", marginTop: 5}} />
                            <p>금형 교체시간</p>
                        </div>
                    </ImgKey>
                </TimeBarWrapper>
            </TimeLineBox>
        </div>
    )
}

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

const ImgKey = Styled.div`
  margin-right: 60px;
  margin-top: 17px;
  float: left;


`
const TimeBar = Styled.div`
  text-align: left;
  width: 960px;
  height: 44px;
  background-color: #e9e9e9aa;
  border-radius: 6px; 
  display: inline-block;


`

const TimeBarMold = Styled.div`
  text-align: left;
  width: 960px;
  height: 44px;
  border-radius: 6px; 
  position: absolute;
 
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

export default ReadyTimeStatisticsContainer
