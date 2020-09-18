import React, {useEffect} from 'react';
import Styled from 'styled-components'

//데이터가 없습니다.
interface IProps{
    title: string,
}
const Nodata = () => {
  useEffect(()=>{

  },[])

  return (

        <WrapBox style={{textAlign:'center', }}>
            <p className="p-bold" style={{fontSize: 20, padding: 14}}>
            등록된 발주 정보가 없습니다.
             </p>
        </WrapBox>

  );
}

const WrapBox = Styled.div`
  border-radius: 6px;
  background-color: #353b48;
  color: #666d79;
`

export default Nodata;
