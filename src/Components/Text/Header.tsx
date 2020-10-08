import React, {useEffect} from 'react';

//페이지 헤더
interface IProps{
    title: string,
}
const Header = ({title}: IProps) => {
  useEffect(()=>{

  },[])

  return (

        <div style={{textAlign:'left', }}>
            <p className="p-bold" style={{fontSize: 20, marginBottom:15, marginTop:87}}>{title}
             </p>
        </div>

  );
}



export default Header;
