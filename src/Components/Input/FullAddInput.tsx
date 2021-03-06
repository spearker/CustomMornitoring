import React, {useEffect} from 'react';
import Styled from 'styled-components'
import IcPlus from '../../Assets/Images/ic_plus.png'

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    onChangeEvent: ()=>void,
    children: any,
}
const FullAddInput = ({title, onChangeEvent, children}: IProps) => {
  useEffect(()=>{

  },[])

  return (

            <InnerBox>
                <div>
                {children}
                </div>
                <InputBox onClick={onChangeEvent}>
                    <img src={IcPlus} style={{width: 10, height: 10, marginRight:5}} />
                    <span className="p-bold" style={{paddingBottom:2, marginRight:10}}>{title+ ' 추가'}</span>
                </InputBox>
            </InnerBox>


  );
}

const InnerBox = Styled.div`
    width: 100%;
    border-bottom: solid 0.5px #d3d3d3;
`
const InputBox = Styled.a`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding-top: 6px;
    padding-bottom: 6px;
    align-items: center;
    display: flex;
    width: 100%;
    margin-top: 17px;
    margin-bottom: 18px;
    text-align: center;
    justify-content: center;
    width: 100%;
    background-color: #f4f6fa;

`


export default FullAddInput;
