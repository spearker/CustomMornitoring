import React, {useState} from "react";
import Styled from "styled-components";
import IC_Dropdown from "../../Assets/Images/ic_drop_down.png";
import IC_Dropup from "../../Assets/Images/ic_drop_up.png";

interface Props {
    title: string
    part?: boolean
    onClick?: () => void
    onClickDelete?: () => void
    children?: any
}


const MoldPartDropdown = ({title,part,onClick, onClickDelete, children}:Props) => {
    const [ dropdown, setDropdown ] = useState<boolean>(true)

    return(
        <div style={{marginTop: "34px"}}>
            <Title>
                <div>
                    {title}
                    {part ?
                        <>
                        <AddButton onClick={onClick && onClick}>
                            <p>파트 추가</p>
                        </AddButton>
                        <DeleteButton onClick={onClickDelete && onClickDelete}>
                        <p>파트 삭제</p>
                        </DeleteButton>
                        </>
                        :
                        null
                    }
                </div>
                <div>
                {dropdown ?
                    <img src={IC_Dropdown} style={{ width: "24px",height: "20px"}} onClick={() => setDropdown(false)}/>
                    :
                    <img src={IC_Dropup} style={{ width: "24px",height: "20px"}} onClick={() => setDropdown(true)}/>
                }
                </div>
            </Title>
            <Line/>
            <div>
                {dropdown ?
                    <div style={{color: 'black'}}>
                        {children == undefined || children === null ? <></> : children}
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

const Title = Styled.div`
  display: flex;
  flex-direction: row;
  font-family: NotoSansCJKkr-Bold;
  justify-content: space-between;
  font-size: 18px;
  color: #000000;
  align-items: center;
`

const AddButton = Styled.button`
  margin: 0 8px 0 15px;
  width: 80px;
  height: 20px;
  border-radius: 3px;
  background-color: #19b9df;
  p{
    font-family: NotoSansCJKkr-Bold;
    font-size: 13px;
  }
`

const DeleteButton = Styled.button`
  width: 80px;
  height: 20px;
  border-radius: 3px;
  background-color: #b3b3b3;
  p{
    font-family: NotoSansCJKkr-Bold;
    font-size: 13px;
  }
`

const Line = Styled.div`
    margin: 10px 3px 0 0;
    border-bottom: solid 0.5px #b3b3b3;
    height: 0.1px;
    background-color: #b3b3b3;
`

export default MoldPartDropdown
