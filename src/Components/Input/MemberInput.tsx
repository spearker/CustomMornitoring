import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';
import IMG_PROFILE from '../../Assets/Images/img_profile.png';
import IcRemove from '../../Assets/Images/ic_remove_profile.png';
import IMG_NONE from '../../Assets/Images/ic_profile_none.png';

interface IProps{
    title: string,
    contents?: {
        pk: string,
        name: string,
        image: string,
    }[],
    isMultiRegistered: boolean,
    onChangeEvent?: any,
    onRemoveEvent?: any,
    target?:{
        pk: string,
        name: string,
        image: string,
    },
    type?: string
}
const MemberInput = ({title, isMultiRegistered, contents, target, onChangeEvent, type, onRemoveEvent}: IProps) => {
  useEffect(()=>{
   
  },[])
  const buttonBox = Styled.button`
  padding: 3px 11px 3px 3px;
  background-color: ${POINT_COLOR};
`
  return ( 
        <div style={{display:'inline-block', fontSize:14}}>
        <div style={{  display:'flex', marginRight: 60 , position:'relative',paddingTop:17, paddingBottom:17, verticalAlign: 'top'}}>
        <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: 80, display:'inline-block',}}>{title === "" ? " " : `· ${title}`}</p>
            <div style={{display:'inline-block', textAlign:'center'}}>
                {
                !isMultiRegistered && contents!==undefined? 
                contents.length === 0 ?
                <>
                    <ImageBox src={IMG_NONE} />
                    <p style={{marginTop:8}}>&nbsp;</p>
                </>
                :
                contents.map((v, i)=>{
                    return(
                        <div key={i} style={{display:'inline-block', marginRight:10}}>
                            <div style={{position:'relative'}}>
                                <ImageBox src={v.image === '' || v.image === null ? IMG_PROFILE : v.image} />
                                <img src={IcRemove} onClick={()=>onRemoveEvent(i)} style={{cursor:'pointer', width:17, position:'absolute', top: 0, right:6}}/>
                            </div>
                             <p className="p-limits" style={{marginTop:8, minWidth:60, maxWidth:120}}>{v.name}</p>
                        </div>
                    )
                })
                :
                    target !== undefined && target !== null? 
                    <>
                    <ImageBox src={target.image === '' || target.image === null ? IMG_PROFILE : target.image} />
                    <p className="p-limits" style={{marginTop:8, minWidth:60, maxWidth:120}}>{target.name}</p>
                    </>
                    :
                    <>
                    <ImageBox src={IMG_NONE} />
                    <p style={{marginTop:8}}>&nbsp;</p>
                    </>
                }
            </div>
            {
                onChangeEvent !== undefined ? 
                <div style={{position:'absolute', bottom: 16, left:6}}>
                     <button style={{padding: '3px 11px 3px 11px', backgroundColor:POINT_COLOR}} onClick={onChangeEvent}>{isMultiRegistered ? '변경' : '등록 '}</button>
                </div>
                :
                null
            }
        </div> 
        </div>
  );
}

const InputBox = Styled.div`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 6px;
    padding-left: 10px;
    width: calc(100% - 200px);
    background-color: #f4f6fa;
`
const ImageBox = Styled.img`
  border-radius: 22px;
  width: 46px;
  height: 46px;
  object-fit: cover;
`

export default MemberInput;