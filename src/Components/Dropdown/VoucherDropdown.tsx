import React from "react";
import Styled from "styled-components";
import IC_Dropdown from "../../Assets/Images/ic_dropdown_gray.png"
import IC_Dropup from "../../Assets/Images/ic_dropup_gray.png"


interface IProps {
    pk: string | null
    name: string
    clickValue?: string
    onClickEvent?: any
    children?: any
}

const VoucherDropdown = ({pk,name,clickValue,onClickEvent,children}:IProps) => {
    return(
        <div style={{paddingBottom:20}}>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <p style={{fontSize: 18, fontFamily: 'NotoSansCJKkr-Bold'}}>{name}</p>
                {clickValue === pk ?
                    <img src={IC_Dropdown} style={{width: 30, height: 15, paddingRight: 20,alignSelf:"center"}} onClick={() => (onClickEvent(pk))}/>
                    :
                    <img src={IC_Dropup} style={{width: 30, height: 15, paddingRight: 20,alignSelf:"center"}} onClick={() => (onClickEvent(pk))}/>
                }
            </div>
            <Line/>
            <div style={{padding: "0 20px 0 20px"}}>
                {clickValue === pk ?
                    (children === undefined || children === null ? null : children)
                    :
                    null
                }
            </div>
        </div>
    )
}


const Line = Styled.hr`
    margin: 10px 20px -12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default VoucherDropdown
