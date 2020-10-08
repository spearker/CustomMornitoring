import React, {useEffect} from 'react';

//페이지 헤더
interface IProps{
    title: string,
    isTurn: boolean
}

const HeaderLive = ({title, isTurn}: IProps) => {
  useEffect(()=>{

  },[])

  return (

        <div style={{textAlign:'left', }}>

            <p className="p-bold" style={{fontSize: 20, marginBottom:15, marginTop:87}}>
              {title}
              {/*{*/}
              {/*  isTurn?*/}
              {/*  <img className="rotating" src={icCircleRotate}  style={{ width:16, marginLeft:8,  display:'inline-block'  }} />*/}
              {/*  :*/}
              {/*  <img src={icCircleRotate}  style={{ width:16, marginLeft:8,  display:'inline-block'  }} />*/}
              {/*}*/}

            </p>
        </div>

  );
}



export default HeaderLive;
