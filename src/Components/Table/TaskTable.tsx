import React, { useEffect } from 'react';
import Styled from 'styled-components'
import {BG_COLOR, BG_COLOR_SUB, SYSTEM_NAME, BG_COLOR_SUB2, COMPANY_LOGO, POINT_COLOR, MAX_WIDTH} from '../../Common/configset'
import IC_REPLY from '../../Assets/Images/ic_reply_w.png'
import { render } from '@testing-library/react';
import SmallButton from '../Button/SmallButton';

import IMG_PROFILE from '../../Assets/Images/img_profile.png'
import StatusDropdown from '../Dropdown/StatusDropdown';

interface IProps{
    indexList: any,
    contents: ITask[],
    keyName: string,
    onClickEvent?: any,
    buttonName?: string,
}


const TaskTable = ({indexList, contents, keyName, onClickEvent ,buttonName}: IProps) => {

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
              <tr key={i}>
                {
                  Object.keys(indexList).map((mv, mi)=>{
                    return(
                    <td className="p-limit" key={mv}>
                      <div style={{display:'flex'}}>
                      {mv === 'status' ? <StatusDropdown pk={v['pk']} contents={['active', 'done', 'share', 'ready', 'stop']} select={v[mv]} onClickEvent={onClickEvent}/> : null}
                      {mi === 0  || mi === 1 ? '': 'ㅣ   '}
                      {mv === 'comments' ? <div><img src={IC_REPLY} style={{marginLeft:4, width:14, height:14, marginRight:4}}/></div> : null}
                      {mv === 'worker' ? <ImageBox src={v['profile_img'] === "" ? IMG_PROFILE : v[mv]} /> : null}
                      {mv !== 'status' ? v[mv] : null}
                      </div>
                      
                    </td>
                    )
                  })
                }
              </tr>
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
  height: 20px;
  object-fit: cover;
`

const TableWrap = Styled.div`
    display: flex;
    table {
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
      padding-right:10px;
    }

    
`


export default TaskTable;