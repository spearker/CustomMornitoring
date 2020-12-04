import React from "react";
import Styled from "styled-components";

interface Props {
    machine: string
    material: string
}


const PressBox: React.FunctionComponent<Props> = ({machine, material}) => {
    return (
        <BoxContainer>
            <MachineName>기계명 - {machine}</MachineName>
        </BoxContainer>
    )
}

const BoxContainer = Styled.div`
  margin: 0 16px 16px 0;
  width: 904px;
  height: 256px;
  border-radius: 6px;
  background-color: #11131950;
  padding: 8px;
   font-weight: bold;
`

const MachineName = Styled.p`
  font-family: NotoSansCJKkr;
  font-size: 20px;
  text-align: left;
  color: #ffffff;
  width: 382px;
`

const MaterialName = Styled.p`
  
`

export default PressBox
