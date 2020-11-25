import React from 'react';
import Styled from 'styled-components';

// 공백 Box
interface IProps{
    height: string
}

const EnrollmentBorderBox = ({height}: IProps) => {

  return (
        <Box style={{height: height}} /> 
  );
}

const Box = Styled.div`
    padding: 0 !important;
    margin: 0 !important;
    border: 0 !important;
    background-color: transparent !important;
`;



export default EnrollmentBorderBox;
