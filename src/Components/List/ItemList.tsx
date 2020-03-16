import React, { useEffect, useState, useCallback } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import { useUser } from '../../Context/UserContext';
import IcButton from '../Button/IcButton';
import icPlus from '../../Assets/Images/ic_plus.png'
import icDelete from '../../Assets/Images/ic_minus.png'
import IconSquareButton from '../Button/IconSquareButton';
import IC_NEXT from '../../Assets/Images/ic_next_page.png';
import IC_BEFORE from '../../Assets/Images/ic_before_page.png';
import IC_REFRESH from '../../Assets/Images/ic_refresh.png';
import IC_ADD from '../../Assets/Images/ic_add.png';
import StatusCard from '../Card/StatusCard';
import DotPagenation from '../Pagenation/DotPagenation';
import SmallButton from '../Button/SmallButton';
interface Props{
    pk: string,
    title: string,
    description: string,
    contents: IStatus[],
    stock: number,
    onClickEvent: any,
}


const ItemList = ({ pk, description, title, contents, stock , onClickEvent}: Props) => {
    const [page, setPage]=useState<number>(1)
    const [status, setStatus] = useState<IStatus[]>([])
    /**
     * onClickChangePage()
     * 페이지 변경 (페이지네이션)
     * @param {string} index 페이지 번호
     * @returns X
     */
    const onClickChangePage = useCallback((index: number)=>{
        if(index < 1 || index > Math.ceil(stock/6)){
        return
        }
        setPage(index)
        console.log(index)
        //getStatus(index)
    },[page])

  useEffect(()=>{
   
  },[])

  return (
    
    <div style={{  color:'black',borderRadius:6 , paddingTop:20, backgroundColor: BG_COLOR_SUB}}>
        <div style={{color:'white', display:'flex', alignItems: 'center', textAlign:'left'}}>
            <p className="p-bold p-limit" style={{paddingLeft:30, width:'18%', display:'inline-block', fontSize:24}}>{title}</p>
            <p className=" p-limit" style={{width:'67%', display:'inline-block', fontSize:14}}>{description ===""? null : '| ' + description}</p>
            <div style={{width:'15%'}}>
                <SmallButton name={'수정하기'} onClickEvent={()=>{onClickEvent(pk)}}/>
            </div>
            
        </div>
        <div style={{  color:'black',height:'150',display:'flex', alignItems: 'center',justifyContent: 'center', marginBottom:15}}>
        <div style={{width:'4%'}}> 
            <img onClick={()=>onClickChangePage(page-1)} src={IC_BEFORE} style={{cursor:'pointer',width:24, margin:10}} />
        </div>
        <div className="p-limit" style={{marginTop: 25, width:'90%', marginBottom: 17, textAlign:'center'}}>
       {
           contents.length === 0 ?
           <div>
               <p style={{color:'white',marginTop:60, marginBottom:110}}>해당 라인에 연결된 데이터가 없습니다.</p>
            </div>
           :
           null
       }
        {
            contents.map((v: IStatus, index)=>{
                if( page*6-6 <= index && index < page*6){
                    return(
                        <StatusCard target={v}/>
                    )
                }
           
            })
        }
          
        <div style={{marginTop:7, }}>
            <DotPagenation stock={Math.ceil(stock/6)} selected={page} onClickEvent={onClickChangePage}/>
        </div>
        </div>
        
        <div style={{width:'4%'}}> 
            <img onClick={()=>onClickChangePage(page+1)} src={IC_NEXT} style={{cursor:'pointer',width:24, margin:10}} />
        </div>

        </div>
        
    </div>

  );
}


const ListWrapDiv = Styled.div`
  border: solid 0.5px #d3d3d3;
  background-color: #f4f6fa;
  font-size: 13px;
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  padding: 6px;
    padding-left: 10px;
`



export default ItemList;