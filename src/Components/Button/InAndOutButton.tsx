import React from "react";
import Styled from 'styled-components'


interface Props {
    title: string
    select?: boolean
}

const InAndOutButton: React.FunctionComponent<Props> = ({title, select}) => {
    return (
        <div>
            {select ?
                <OnButton>
                    <ButtonTitle>{title}</ButtonTitle>
                </OnButton>
                :
                <OffButton>
                    <ButtonTitle>{title}</ButtonTitle>
                </OffButton>
            }
        </div>
    )
}

const OnButton = Styled.button`
  width: 102px;
  height: 50px;
  border-bottom: 2px solid #19b9df;
  background-color: #19b9df50;
`

const OffButton = Styled.button`
  width: 102px;
  height: 50px;
`

const ButtonTitle = Styled.p`
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
`

export default InAndOutButton
