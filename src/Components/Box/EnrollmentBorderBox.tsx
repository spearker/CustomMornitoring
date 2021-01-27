import React from 'react';
import Styled from 'styled-components';

//등록 페이지 인풋 감싸는 box
interface IProps{
    children: any
    borderUse?: boolean
    padding?: string
}

const EnrollmentBorderBox = ({children, borderUse, padding}: IProps) => {

  return (

        <Box style={{borderBottom: borderUse ? 0 : `0.5px solid rgb(211, 211, 211)`, padding: padding ? padding : '18px 0'}}>
            {children}
        </Box>

  );
}

const Box = Styled.div`
    
`;



export default EnrollmentBorderBox;
