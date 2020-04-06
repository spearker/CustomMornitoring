import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import Logo from '../../Assets/Images/img_logo.png'
import InputContainer from '../../Containers/InputContainer';
import IMG_PROFILE from '../../Assets/Images/img_profile.png';
import IcRemove from '../../Assets/Images/ic_remove_profile.png';
import IMG_NONE from '../../Assets/Images/ic_profile_none.png';
import icDelete from '../../Assets/Images/ic_minus.png'
import IconSquareButton from '../Button/IconSquareButton';

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
        <div style={{fontSize:14, minWidth:'49%'}}>
        <div style={{  display:'flex', position:'relative',alignItems: 'center',paddingTop:17, paddingBottom:17}}>
        <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: 100, display:'inline-block'}}>{title === "" ? " " : `· ${title}`}</p>
            <div style={{display:'inline-block', textAlign:'center'}}>
                {
                isMultiRegistered && contents!==undefined? 
                contents.length === 0 ?
                <div>
                   
                </div>
                :
                contents.map((v, i)=>{
                    return(
                        <div key={i} style={{display:'inline-block', marginRight:10, textAlign:'left'}}>
                            <MemberTagDiv >
                                <p style={{marginLeft:7, textAlign:'left'}} className="p-limit">{v.name}</p>
                                <div onClick={()=>onRemoveEvent(i)} style={{marginLeft: 'auto',width:27}}>
                                    <IconSquareButton color="#e7e9eb" width="27px" imageSize="18px" image={icDelete} dim={true}/>  
                                </div> 
                            </MemberTagDiv>
                          
                        </div>
                    )
                })
                :
                    target !== undefined && target !== null? 
                    <div style={{display:'flex', alignItems: 'center'}}>
                        {
                            target.image === '' || target.image === null ?
                            <ImageBox src={IMG_NONE} />
                            :
                            <ImageBox src={target.image} />
                        }
                        <p className="p-limits" style={{marginLeft:8}}>{target.name}</p>
                    </div>
                    :
                    <div style={{display:'flex'}}>
                    <ImageBox src={IMG_NONE} />
                    <p className="p-limits" style={{marginLeft:8}}>&nbsp;</p>
                    </div>
                }
                 
            </div>
            {
                onChangeEvent !== undefined ? 
                <div style={{marginLeft:'auto'}}>
                     <button type="button" style={{padding: '3px 11px 3px 11px', backgroundColor:POINT_COLOR}} onClick={onChangeEvent}>{isMultiRegistered ? '추가' : '변경'}</button>
                </div>
                :
                null
            }   
           
        </div> 
        </div>
  );
}

const ImageBox = Styled.img`
  border-radius: 14px;
  min-width: 30px;
  width: 30px;
  height: 30px;
  object-fit: cover;
`
const MemberTagDiv = Styled.div`
  color: black;
  border: solid 0.5px #d3d3d3;
  background-color: #f4f6fa;
  display: flex;
  font-size: 14px;
  width: 120px;
  align-items: center; 
  justify-content: center; 

`


export default MemberInput;