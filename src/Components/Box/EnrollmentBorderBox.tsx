import React from 'react';
import Styled from 'styled-components';

//등록 페이지 인풋 감싸는 box
interface IProps{
    children: any
}

const EnrollmentBorderBox = ({children}: IProps) => {

  return (

        <Box>
            {children}
        </Box>

  );
}

const Box = Styled.div`
    padding: 18px 0;
    border-bottom: 0.5px solid rgb(211, 211, 211);
`;



export default EnrollmentBorderBox;
