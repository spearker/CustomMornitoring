import React, { useEffect } from 'react';
import Styled from 'styled-components'
import { POINT_COLOR } from '../Common/configset'

//기본형 모달

interface IProps{
    title?: string,
    isVisible: boolean,
    children: any,
    tab1?: string ,
    tab2?: string ,
    selected?: number,
    onClickClose: ()=>void,
    onClickEvent: ()=>void,
}
const SearchModalContainer = ({title, tab1, tab2, selected, onClickClose, isVisible, children, onClickEvent,}: IProps) => {


  useEffect(()=>{

  },[])

  return (
        isVisible ?
            <>
            <WrapHoverBox onClick={onClickClose}/>
            <InnerBox>
                <div style={{position:'relative', backgroundColor:'#f4f6fa',  textAlign: 'left',minWidth:860, padding:'0px 20px 0px 20px'}}>
                    {
                        title!== undefined  && title !==null && title !=='' ?
                        <div style={{ paddingTop:20}}>
                             <p style={{fontWeight:'bold', color:'black', marginBottom:19}}>· {title}</p>
                        </div>

                        :
                        null
                    }
                    <div style={{paddingBottom:66, maxHeight:480, overflow:'auto'}}>
                    {children}
                    </div>

                    <div className="p-bold" style={{marginTop:60,width:'100%', position:'absolute', display:'flex', zIndex:4, bottom:0, left:0,  color:'black', justifyItems:'center', alignItems:'center',textAlign:'center', fontSize:14}}>
                        <div style={{ width:'50%', padding:9, backgroundColor: '#e7e9eb', color:'#717c90', cursor:'pointer'}} onClick={onClickClose}>
                            <p>취소</p>
                        </div>
                        <div style={{ width:'50%', padding:9,  cursor:'pointer',backgroundColor: POINT_COLOR}} onClick={onClickEvent}>
                            <p>등록</p>
                        </div>
                    </div>
                </div>

            </InnerBox>
            </>
        :
        null
  );
}



const WrapHoverBox = Styled.div`
    background-color: #00000090;
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 4;
`
const InnerBox = Styled.div`
    position: fixed;
    left: 50%;
    margin-left: -450px; 
    top: 50%;
    margin-top: -230px; 
    overflow: auto;
    z-index: 4;
    p{
        font-size: 14px;
    }
`

export default SearchModalContainer;
