import React, {useEffect} from 'react';

//페이지 헤더
interface IProps{
    title: string,
}
const SubHeader = ({title}: IProps) => {
  useEffect(()=>{

  },[])

  return (

        <div style={{textAlign:'left',display:'inline-block' }}>
            <p className="p-bold" style={{textAlign:'left',fontSize: 20, marginBottom:15, margin:0}}>{title}</p>
        </div>

  );
}



export default SubHeader;
