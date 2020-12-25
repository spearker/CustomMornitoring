import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import InputContainer from '../../Containers/InputContainer';
import EnrollmentBorderBox from '../Box/EnrollmentBorderBox';

//웰컴, 로그인 페이지 네비게이션 컴포넌트

interface IProps{
    title: string,
    description: string,
    value: string
    thisId: string
    name: string
    onChangeEvent: any
    children?: any
    style?: any
}
const ColorFileInput = ({value, title, description, name, thisId, onChangeEvent, children, style}: IProps) => {
  useEffect(()=>{

  },[])

  return (
      <>
        <EnrollmentBorderBox>
            <InputBox>
                <Dot />
                <p>{title}</p>
                <div>
                    <p style={{color: value === "" ? '#11131970' : '#111319'}}>{value === '' ? description : value}</p>
                    <label htmlFor={thisId}><div><p>파일 선택</p></div></label>
                </div>
            </InputBox>
        </EnrollmentBorderBox>
        <input type="file" name="file" id={thisId} style={{display:'none'}} onChange={onChangeEvent}/>

        {/* <BodyDiv style={style}>
            <InputWrapBox>
                <input type="text" value={name} placeholder={description!==null ?description : ''} readOnly style={{textAlign:'left',border: 'solid 0.5px #d3d3d3', borderRight:0, width:'calc(100% - 90px)', padding:6, backgroundColor:'#f4f6fa', paddingLeft:8, fontSize:14}}/>
                <label htmlFor={thisId}  style={{border: 'solid 0.5px #d3d3d3', textAlign:'center', fontSize:14, width:84, paddingBottom:2 , paddingTop:4, backgroundColor:POINT_COLOR, paddingLeft:12, paddingRight:12, cursor:'pointer'}}>파일 선택</label>
            </InputWrapBox>
            {
                children !== undefined ?
                <div style={{marginTop:18, width:'calc(100% - 15px)'}}>
                {children}
                </div>
                :null
            }
        </BodyDiv>
        <input type="file" name="file" id={thisId} style={{display:'none'}} onChange={onChangeEvent}/> */}
        </>
  );
}

const InputBox = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    *{
        box-sizing: border-box;
    }
    &>p{
        width: 122px;
        font-size: 15px;
        font-weight: bold;
    }
    &>div{
        &:not(:first-child){
            position: relative;
            width: calc(100% - 133px);
            height: 28px;
            border: solid 0.5px #b3b3b3;
            background-color: #f4f6fa;
            padding: 0 0 0 10px;
            &>label{
                &>div{
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    top: 0;
                    right: 0; 
                    height: 100%;
                    width: 83px;
                    background-color: #19B9DF;
                    cursor: pointer;
                    &>p{
                        color: #0d0d0d;
                        font-size: 15px;
                        font-weight: 500;
                        text-align: center;
                    }
                }
            }
        }
    }
`

const Dot = Styled.div`
    width: 5px;
    height: 5px;
    margin-right: 6px;
    background-color: #111319;
    border-radius: 50%;
`

export default ColorFileInput;
