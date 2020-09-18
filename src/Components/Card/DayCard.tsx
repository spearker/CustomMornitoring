import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import moment from 'moment';
import 'moment/locale/ko';

interface Props{
  date: string,
  id: string,
  num: number,
  weekend: boolean,
  dim: boolean,
  on: boolean,
  onClickEvent: (id: string)=>void;
}


// 날짜 카드

const DayCard = ({ date, num,id,  weekend, on , dim, onClickEvent}: Props) => {



  useEffect(()=>{

  },[])

  return (
      <div onClick={weekend && dim ?  ()=>{} : ()=>onClickEvent(id) } style={{width:'100%'}}>
      {
          weekend ?
            dim ?
            <CardWrap>
                <p className="p-bold" style={{paddingBottom:9, marginTop:2,color:'#3d4555',textAlign:'left', fontSize:16, borderBottom:'1px solid #3d4555'}}>{moment(date).format('dd MM.DD')}</p>
                <p className="p-num" style={{fontSize:68, color:'#3d4555',marginTop:35}}></p>
            </CardWrap>
            :
            on ?
            <CardWrapOn>
                <p className="p-bold" style={{paddingBottom:9,textAlign:'left', fontSize:16, borderBottom:'1px solid #252525'}}>{moment(date).format('dd MM.DD')}</p>
                <p className="p-num" style={{fontSize:68, marginTop:35}}>{num === 0 ? '-' : String(num).padStart(2, '0') } </p>
            </CardWrapOn>
            :
            <CardWrap>
                <p className="p-bold" style={{paddingBottom:9, color:'white', marginTop:2,textAlign:'left', fontSize:16, borderBottom:'1px solid white'}}>{moment(date).format('dd MM.DD')}</p>
                <p className="p-num" style={{fontSize:68, color:'white',marginTop:35}}>{num === 0 ? '-' : String(num).padStart(2, '0') } </p>
            </CardWrap>
          :
          on ?
            <CardWrapOn>
                <p className="p-bold" style={{paddingBottom:9,textAlign:'left', fontSize:16, borderBottom:'1px solid #252525'}}>{moment(date).format('dd MM.DD')}</p>
                <p className="p-num" style={{fontSize:68, marginTop:35}}>{num === 0 ? '-' : String(num).padStart(2, '0') } </p>
            </CardWrapOn>
            :
            <CardWrap>
                <p className="p-bold" style={{paddingBottom:9, color:'white', marginTop:2,textAlign:'left', fontSize:16, borderBottom:'1px solid white'}}>{moment(date).format('dd MM.DD')}</p>
                <p className="p-num" style={{fontSize:68, color:'white',marginTop:35}}>{num === 0 ? '-' : String(num).padStart(2, '0') } </p>
            </CardWrap>

      }
      </div>

  );
}


const CardWrap = Styled.div`
        width: calc( 100% - 32px );
        text-align: center;
        cursor: pointer;
        background-color: ${BG_COLOR_SUB};
        height: 166px;
        padding: 16px;
        border-radius: 5px;
    `
const CardWrapOn = Styled.div`
    width: calc( 100% - 32px );
    cursor: pointer;
    text-align: center;
    background-color: ${POINT_COLOR};
    height: 166px;
    border-radius: 5px;
    padding: 16px;
`



export default DayCard;
