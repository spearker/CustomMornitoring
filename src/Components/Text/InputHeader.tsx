import React from 'react';
import {POINT_COLOR} from '../../Common/configset'

//페이지 헤더 margin, padding없는 버전
interface IProps{
    title: string,
}

const InputHeader = ({title}: IProps) => {

  return (

        <div style={{textAlign:'left', }}>
            <p className="p-bold" style={{ fontSize: 18, color:POINT_COLOR }}>{title}</p>
        </div>

  );
}



export default InputHeader;
