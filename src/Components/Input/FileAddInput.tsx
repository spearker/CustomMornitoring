import React, {useEffect} from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from '../../Common/configset'
import InputContainer from '../../Containers/InputContainer';
import {uploadTempFile} from '../../Common/fileFuctuons';

interface IProps{
    title: string,
    description?: string ,
    value: any,
    onChangeEvent: any,
    target?: string
}

const FileAddInput = ({title, value,description, onChangeEvent, target}: IProps) => {

    useEffect(()=>{

  },[])


  const addFile = async (event: any): Promise<void> => {

    if(event.target.files[0] === undefined){
      return;
    }


    if(target !== undefined && !event.target.files[0].type.includes(target)){ //이미지인지 판별
        //alert('이미지 형식만 업로드 가능합니다.');
        return onChangeEvent('');
    }

    const res = await uploadTempFile(event.target.files[0]);

    if(res !== false){
        return onChangeEvent(res);
    }else{
        return onChangeEvent('');
    }


  }

  return (
      <>
        <InputContainer title={title}>
            <BodyDiv>
            <InputWrapBox>
                <input type="text" value={value} placeholder={description ?? ''} readOnly style={{textAlign:'right',border: 'solid 0.5px #d3d3d3', borderRight:0, width:'calc(100% - 90px)', padding:6, backgroundColor:'#f4f6fa', paddingLeft:8, fontSize:14}}/>
                <label htmlFor={title}  style={{border: 'solid 0.5px #d3d3d3', textAlign:'center', fontSize:14, width:84, paddingBottom:2 , paddingTop:4, backgroundColor:POINT_COLOR, paddingLeft:12, paddingRight:12, cursor:'pointer'}}>파일 선택</label>
            </InputWrapBox>

            </BodyDiv>
            <input type="file" name="file" id={title} style={{display:'none'}} onChange={addFile}/>
        </InputContainer>
        </>
  );
}
const BodyDiv =  Styled.div`
    font-size: 14px;
    width: calc(100% - 190px);
    padding: 0px;
`
const InputWrapBox = Styled.div`
    font-size: 14px;
    width: 100%;
    display: flex;
    background-color: #f4f6fa;
`


export default FileAddInput;
