import React from 'react';

//페이지 헤더 위아래 조정가능
interface IProps{
    title: string,
    top?: string | number
    bottom?: string | number
}

const TopHeader = ({ title, top, bottom }: IProps) => {

  return (
        <p 
            className="p-bold" 
            style={{
                textAlign:'left', 
                marginTop: top !== undefined ? top : 0, 
                marginBottom: bottom !== undefined ? bottom : 0, 
                fontSize: 20
            }}>{title}</p>
  );
}

export default TopHeader;
