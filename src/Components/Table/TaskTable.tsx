import React, { useEffect, useCallback, useState } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH, BASE_URL, TOKEN_NAME} from '../../Common/configset'
import IC_REPLY from '../../Assets/Images/ic_reply_w.png'
import IC_CLOSE from '../../Assets/Images/ic_task_close.png'
import IC_DOC from '../../Assets/Images/ic_file_doc.png'
import IC_IMAGE from '../../Assets/Images/ic_file_img.png'

import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';

import IMG_PROFILE from '../../Assets/Images/img_profile.png'
import StatusDropdown from '../Dropdown/StatusDropdown';
import { postRequest, getRequest } from '../../Common/requestFunctions';

import CommentsContainer from '../../Containers/CommentsContainer';
import CommentList from '../List/CommentList';
import { dataSet } from '../../Common/dataset';
import { getToken } from '../../Common/tokenFunctions';
import TinyButtonLink from '../Button/TinyButtonLink';
import ReadOnlyInput from '../Input/ReadOnlyInput';
import ReadOnlyInputTask from '../Input/ReadOnlyInputTask';
import ProcessCard from '../Card/ProcessCard';

interface IProps{
    indexList: any,
    contents: ITask[],
    keyName: string,
    onClickEvent?: any,
    buttonName?: string,
}




const TaskTable = ({indexList, contents, keyName, onClickEvent ,buttonName}: IProps) => {

  const [openTarget, setOpenTarget] = useState<string>('');
  const [task, setTask]= useState<any>(null);
  const [replyList, setReplyList]= useState<IReply[]>([]);
  const [process, setProcess] = useState<IProcess[]>([]);
  const [oepnProcess, setOpenProcess] = useState<string>('');


  useEffect(()=>{
    setOpenTarget("")
  },[contents])

  
  /**
   * onChangeStock()
   * 생산자재 수량 변경
   * @param {string} pk id
   * @param {string} amount 수량
   * @returns X 
   */
  const onChangeStock = useCallback(async(pk, amount)=>{
  
   
    alert('테스트 : keyword - ' + pk + ' / ' + amount);
    return;
    if(pk  === ''){
      return;
    } 
    
  },[])

  /**
   * onClickOpenTask()
   * 작업지시서 열기
   * @param {string} pk 작업지시서 pk
   * @returns X
   */
  const onClickOpenTask = useCallback(async(pk: string)=>{
    if(pk === undefined || pk === ""){
      return;
    }
    setOpenTarget(pk)
    //alert(pk)

    const results = await getRequest('http://211.208.115:66:8087/api/v1/task/process?pk=' + openTarget, getToken(TOKEN_NAME))

    if(results === false){
      alert('8087 : 서버오류 데이터를 불러올 수 없습니다.')
    }else{
      if(results.status === 200){
        setTask(results.results)
       
        //setProcess(results.results.process)
        //setReplyList(results.results.replyList)
      }else{
        //TODO : 지울것
        alert('데이터를 불러올 수 없습니다.')
      }
    }
  
  },[openTarget, task]);



  useEffect(()=>{
   console.log(Object.keys(indexList))
  },[])

  return (
    <TableWrap>
      <table>
        <tbody>
          {/* 테이블 바디 */}
          {
            contents.map((v, i)=>{
              return(
                <>
              <tr key={i} onClick={()=>onClickOpenTask(v.pk)} style={{cursor:'pointer'}}>
                {
                  Object.keys(indexList).map((mv, mi)=>{
                    return(
                    <td className="p-limit" key={mv}>
                      <div style={{display:'flex',  whiteSpace: 'nowrap'}}>
                      {mv === 'status' ? <StatusDropdown pk={v['pk']} contents={['active', 'done', 'share', 'ready', 'stop']} select={v[mv]} onClickEvent={onClickEvent}/> : null}
                      {mi === 0  || mi === 1 ? '': 'ㅣ   '}
                      {mv === 'comments' ? <div><img src={IC_REPLY} style={{marginLeft:4, width:14, height:14, marginRight:4}}/></div> : null}
                    {mv === 'worker' ? <div><ImageBox src={v['worker'].photo === "" ? IMG_PROFILE : v['worker'].photo} />{v['worker'].name + ' ' + v['worker'].appointment}</div> : null}
                    {mv === 'amount' ?  v[mv] + ' 개': null}
                      {mv !== 'status' && mv !== 'worker' && mv!=='amount'? v[mv] : null}
                      </div>
                    </td>
                    )
                  })
                }
              
              </tr>
              <tr style={{backgroundColor:'#f4f6fa'}}>
                {
                  openTarget !== v.pk || task == null?
                  null
                  :
                  <td colSpan={15} style={{paddingLeft:8, color:'black'}} >
                      
                      <div className="div-no-scroll" style={{ maxHeight:700, overflow:'auto'}}>
                      {/* 헤더 */}
                      <div style={{ marginTop:24}}>
                        <div style={{float:'right', cursor:'pointer'}}>
                          <TinyButtonLink url={'/task/update?pk='+v.pk} name={'수정'}/>
                          <img onClick={()=>setOpenTarget('')} src={IC_CLOSE} style={{marginLeft:9, width:24, float:'right'}}/>
                        </div>
                        <div style={{display:'flex', paddingLeft:12}}>
                          <StatusDropdown pk={openTarget['pk']} contents={['active', 'done', 'share', 'ready', 'stop']} select={task.status} onClickEvent={onClickEvent}/>
                          <p className="p-bold p-limit" style={{marginLeft:30, fontSize:28, width:700, marginTop:4}}>{task.title}</p>

                        </div>
                        {/* 상세내용 */}
                        <div style={{paddingLeft:12,position:'relative'}}>
                        <p style={{float:'right', position:'absolute', right:0, top:21}}>작성일 : {task.created}</p>
                          <ReadOnlyInputTask title={'상세 업무내용'} value={task.description}/>
                          </div>  
                        </div>
                        {/* 공정내용 */}
                        <div style={{paddingLeft:12, minHeight:200, paddingTop:18}}>
                        <p className="p-bold">·  공정 관리 시스템</p>
                        <ProcessWrapBox>
                        {
                          process.map((v:IProcess, i:number)=>{
                            return(
                                <ProcessCard contents={v} onClickModify={onChangeStock} onClickEvent={setOpenProcess} openTarget={oepnProcess} />
                            )
                          })
                        }
                        </ProcessWrapBox>
                      
                        </div>

                        
                        {/* 댓글, 등록자, 파일 리스트 */}
                        <div style={{paddingLeft:12, marginBottom:12}}>
                        <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:18, marginTop:18,}}/>
                        <span className="p-bold" style={{width: 128, float:'left', display:'inline-block'}}>·  첨부 파일</span>
                        <div style={{ marginLeft:128, color:'black'}}>
            
                          <a style={{textAlign:'center', display:'inline-block', marginRight:11}}>
                            <img src={IC_DOC} style={{width:100, height:70, objectFit: 'cover'}}/>
                            <p className="p-limit" style={{width:95, fontSize:13}}>파일명.doc</p>
                          </a>
                          <a style={{textAlign:'center', display:'inline-block', marginRight:11}}>
                            <img src={IC_DOC} style={{width:100, height:70, objectFit: 'cover'}}/>
                            <p className="p-limit" style={{width:95, fontSize:13}}>파일명.doc</p>
                          </a>
                          <a style={{textAlign:'center', display:'inline-block', marginRight:11}}>
                            <img src={IC_IMAGE} style={{width:100, height:70, objectFit: 'cover'}}/>
                            <p className="p-limit" style={{width:95, fontSize:13}}>파일명.png</p>
                          </a>
                    
                        </div>
                        <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:18, marginTop:18,}}/>

                        <div>
                        {/* 관리자 */}
                        <div style={{width: 210, fontSize: 14,display:'inline-block'}}>
                          <div style={{ display:'flex'}}>
                          <span className="p-bold" style={{ width: 75, display:'inline-block',}}>·  관리자</span>
                             <ImageBox src={IMG_PROFILE} />
                            <span className="p-limit" style={{width: 90, display:'inline-block'}}>홍길동 과장</span>
                          </div>
                        </div>

                        {/* 작업 책임자 */}
                        <div style={{width: 225, fontSize: 14,display:'inline-block'}}>
                          <div style={{ display:'flex'}}>
                          <span className="p-bold" style={{ width: 102, display:'inline-block',}}>·  작업 책임자</span>
                             <ImageBox src={IMG_PROFILE} />
                            <span className="p-limit" style={{width: 102, display:'inline-block'}}>홍길동 과장</span>
                          </div>
                        </div>
                        <hr style={{border:'solid 0.5px #d3d3d3', marginBottom:18, marginTop:18,}}/>
                        {/* 참조자 */}
                        <div style={{width: '100%', fontSize: 14,display:'inline-block'}}>
                          <div style={{ display:'flex'}}>
                          <span className="p-bold" style={{ width: 100, display:'inline-block',}}>·  공유자</span>
                            <span className="p-limit" style={{width: 500, display:'inline-block'}}>홍길동 과장, 홍길동 과장, 홍길동 과장 </span>
                          </div>
                        </div>
                      
                        </div>
                        <CommentsContainer pk={openTarget}>
                            
                        </CommentsContainer>
                        </div>
                      
                      
                      </div>
                      
                  </td>
                }
              </tr>
              </>
              )
            })
          }
          
        </tbody>
      </table>
    </TableWrap>
      
  );
}
const ImageBox = Styled.img`
  border-radius: 10px;
  margin-right: 5px;
  margin-left: 5px;
  width: 20px;
  float: left;
  display: inline-block;
  height: 20px;
  object-fit: cover;
`

const ProcessWrapBox = Styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  text-align: left;
`


const TableWrap = Styled.div`
    display: flex;

    table {
      table-layout: fixed;
      max-width: 100%,
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      background-color: #f4f6fa;
      color: #252525;
      font-size: 14px;
      overflow-x: scroll;
      overflow: auto;
      background-color: ${BG_COLOR_SUB2};
      border-collapse:separate; 
      border-spacing: 0 1em;
    }
    tbody{
      max-width: 100%;
    }
    tr{
      box-sizing: border-box;
      border: 0;
      border-radius: 5px;
      vertical-align: middle;
      background-color: ${BG_COLOR_SUB};
      border: 1px;
      border-collapse: separate;
      border-spacing: 0 15px;
      margin-bottom: 12px;
    }
    td, th {
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap
      overflow: visible;
      vertical-align: middle;
      text-align: left;
      padding: 0;
      color: white;
    }
    td:first-of-type {
      width: 135px;
      min-width: 135px;
    }
    td:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
    td:last-child  { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
    td:last-child {
      padding-right:20px;
    }

    
`


export default TaskTable;