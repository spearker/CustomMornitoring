import React, {useEffect} from 'react';
import Styled from 'styled-components'
import IC_DOC from '../../Assets/Images/ic_file_doc.png'

interface Props{
  url: string, //pk 의 역할을 대신합니다.
  name: string,
  data: any,
  type: string,
  onClickEvent?: any
}


// 파일 썸네일 카드
const FileTumbCard = ({ url, name, type , data, onClickEvent}: Props) => {



  useEffect(()=>{

  },[])

  return (
    <div style={{textAlign:'center', display:'inline-block', position:'relative', marginRight:11}}>
      <a href={onClickEvent !== undefined ? url :'null'} target='_blank' >
        <img src={type.includes('image') ? url : IC_DOC } style={{width:100, height:70, objectFit: 'cover'}}/>
        <p className="p-limit" style={{width:95, fontSize:13}}>{name}
      </p>
      </a>
      {onClickEvent !== undefined ?
      <div style={{position:'absolute', top:0, right:0, fontSize:12}}>
          <button style={{padding: '3px 6px 3px 6px', backgroundColor:'#d3d3d3'}} onClick={(e)=>onClickEvent(e)} >{'삭제'}</button>
      </div>
      : null}
    </div>
  );
}

const ImageBox = Styled.img`
  width: 75px;
  height: 100px;
  object-fit: cover;

`
const CardWrap = Styled.div`
  display: inline-block;
  position: relative;
  margin-right: 10px;
  margin-left: 10px
  color: #252525;
  text-align: center;
  width: 140px;
  background-color: white;
  height: 152px;
  margin-top:5px;
  margin-bottom: 5px;
`



export default FileTumbCard;
