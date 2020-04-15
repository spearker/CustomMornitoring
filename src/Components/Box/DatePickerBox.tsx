import React, { useEffect,useRef, useState, useCallback } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, TOKEN_NAME} from '../../Common/configset'
import icSearch from '../../Assets/Images/ic_search.png'
import IcButton from '../Button/IcButton';
import IconSquareButton from '../Button/IconSquareButton';
import IconSquareButtonGray from '../Button/IconSquareButtonGray';
import useOnclickOutside from 'react-cool-onclickoutside';
import Calendar from 'react-calendar';
import moment from 'moment';
import SmallButton from '../Button/SmallButton';
import { getToken } from '../../Common/tokenFunctions';
import { getRequest } from '../../Common/requestFunctions';

interface IProps{
  setListEvent: any,
    searchUrl: string,
    targetPk: string,
}
const DatePickerBox = ({setListEvent , searchUrl, targetPk}: IProps) => {
    const [to, setTo] = useState<string>(moment().format("YYYY-MM-DD"));
    const [from, setFrom] = useState<string>(moment().add(-7,"days").format("YYYY-MM-DD"));
    const [list, setList] = useState<any[]>([]);
    const [type, setType] = useState<number>(999);
  useEffect(()=>{
    //setTo(moment().format("YYYY-MM-DD")); 
    //setFrom(moment().add(-30,"days").format("YYYY-MM-DD")); 
   
    onClickSearch()
  },[])

  /**
   * onClickSearch()
   * 검색
   * @returns X
   */
  const onClickSearch = useCallback(async (e)=>{
   
   
    const results = await getRequest(searchUrl+ 'to=' + to +'&from='  + from +'&pk=' + targetPk, getToken(TOKEN_NAME))

    if(results === false){
      alert('해당 기간 데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      setList([])
    }else{
      if(results.status === 200){
        setList(results.results)
        setListEvent(results.results);
      }else{
        alert('해당 기간 데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        setList([])
      }
    }
  },[])
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    useOnclickOutside(ref,() => {
        setIsOpen(false);
        }
    );
    
    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
    const handleClickBtn2 = () => {
        setIsOpen2(!isOpen2);
    };
  return ( 
        <Box>
            <span className="p-bold" style={{marginRight: 12}}>기간 설정  </span>
            <InputBox onClick={()=>handleClickBtn2()}>{from === ""|| from === undefined ? "(전체 기간)" : from} </InputBox>

             <span> ~ </span>
             <InputBox onClick={()=>handleClickBtn()}>{to === ""|| to === undefined ? "(전체 기간)" : to} </InputBox>
            {
                isOpen ?
                <div style={{marginTop:11, color:'black'}}>

                <Calendar
                className={'to'}
                onChange={(date)=>{
                    setTo(moment(String(date)).format("YYYY-MM-DD")); 
                    handleClickBtn()
                }}
                value={to === "" ? moment().toDate() : moment(to).toDate() }
                 />
              </div>
              :
              null
            }
            {
                isOpen2 ?
                <div style={{marginTop:11, color:'black'}}>

                <Calendar
                className={'from'}
                onChange={(date)=>{
                    setFrom(moment(String(date)).format("YYYY-MM-DD")); 
                    handleClickBtn2()
                }}
                value={from === "" ? moment().toDate() : moment(from).toDate() }
                 />
              </div>
              :
              null
            }
             <div style={{display:'inline-block', alignItems:'center',  marginLeft: 24}}>
             <InputButton onClick={()=>{
                setTo(moment().format("YYYY-MM-DD")); 
                setFrom(moment().add(-91,"days").format("YYYY-MM-DD")); 
             }}>최근 3개월 </InputButton>
             <InputButton onClick={()=>{
                setTo(moment().format("YYYY-MM-DD")); 
                setFrom(moment().add(-30,"days").format("YYYY-MM-DD")); 
            }}>최근 1개월 </InputButton>
             <InputButton onClick={()=>{
              setTo(moment().format("YYYY-MM-DD")); 
              setFrom(moment().add(-7,"days").format("YYYY-MM-DD")); 
            }}>최근 1주 </InputButton>
             <InputButton  onClick={()=>{
                setTo(moment().format("YYYY-MM-DD")); 
                 setFrom(moment().format("YYYY-MM-DD")); 
            }}>오늘</InputButton>
             </div>
             <div style={{ display:'inline-block', float:'right', paddingRight:2, paddingBottom:3}}>
             <ButtonBox onClick={() => { onClickSearch()  }} >기간 조회</ButtonBox>
              
            </div>
        </Box> 
  );
}
const ButtonBox = Styled.button`
    padding: 7px 18px 7px 18px;
    color: black;
    border-radius: 5px;
    background-color: ${POINT_COLOR};
    border: 0;
    font-size: 14px;
    font-weight: bold;
`
const InputBox = Styled.div`
    border: solid 0.5px #aaaaaa;
    width: 140px;
    display: inline-block;
    color: #252525;
    padding: 4px;
    padding-left: 12px;
    background-color: white;
  

`



const InputButton = Styled.div`
    border: solid 0.5px #bbbbbb;
    text-align: center;
    min-width: 66px;
    margin-right: 6px;
    display: inline-block;
    color: #252525;
    padding: 4px;
    background-color: #ededed;

`
const Box = Styled.div`
    border-radius: 5px;
    padding: 16px;
    text-align: left;
    font-size: 14px;
    color: #252525;
    margin-top: 8px;
    margin-bottom: 18px;
    background-color: #f4f6fa

`


export default DatePickerBox;