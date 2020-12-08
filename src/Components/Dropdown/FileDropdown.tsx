import React from "react";
import Styled from 'styled-components'
import IC_Dropup from "../../Assets/Images/ic_dropup_gray.png";
import IC_Dropdown from "../../Assets/Images/ic_dropdown_gray.png";

interface Props {
    title: string
}

const FileDropdown: React.FunctionComponent<Props> = ({title}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true)

    return (
        <Dropdown>
            <p>{title}</p>
            <div>
                {isOpen ?
                    <img src={IC_Dropup} style={{width: 30, height: 15, paddingRight: 20, alignSelf: "center"}}
                         onClick={() => {

                         }}
                    />
                    :
                    <img src={IC_Dropdown} style={{width: 30, height: 15, paddingRight: 20, alignSelf: "center"}}
                         onClick={() => {

                         }}
                    />
                }
            </div>
        </Dropdown>
    )
}

const Dropdown = Styled.div`
    width: 1100px;
    height: 50px;
    border-radius: 6px;
    padding: 0 10px;
    background-color: #111319;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
     font-family: NotoSansCJKkr;
     font-size: 18px;
     font-weight: bold;
    }
    div{
     cursor: pointer;
     width: 30px;
    }
`


export default FileDropdown
