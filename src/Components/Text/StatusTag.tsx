import React, {useCallback} from 'react';
import Styled from 'styled-components'


interface IProps{
    text: string,

}

const StatusTag = ({text}: IProps) => {


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
        }else if(status === 'off'){
            return '꺼짐'
        } else if(status === 'error'){
            return '에러'
        }else if(status ==='reservation'){
            return '예약'
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

    const BoxWrap = Styled.div`
        background-color: ${changeStatusToColor(text)};
        padding-top: 10px;
        padding-bottom: 10px;
        color: white;
        top: 0;
        text-align center;
        width: 90px;
        font-align center;
        font-size: 17px;
        left: 0;
        display: flex;
        border-radius: 6px;
    `

  return (

        <BoxWrap>
            <p className="p-bold" style={{width:'100%', display:'block', textAlign:'center'}} >{changeStatusToString(text)}</p>
        </BoxWrap>

  );
}



export default StatusTag;
