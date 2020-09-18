import React from 'react';
import Styled from 'styled-components'
import {POINT_COLOR} from "../../../Common/configset";

//import Marker from './Marker';

interface Props{
    component: any,
    select?: string,
    status?: number,
    onChangeEvent?: any,
    item?: any,
    onChangeComponent?: any
}
const PressCMSMarker = ({component, select, onChangeEvent, item, onChangeComponent}:Props ) => {

    const {pk, machine_name, duty_cycle, current, machine_photo, left, bottom} = component;

    const PressStatusWrapper = Styled(Marker)`
        border: ${select !== undefined && String(select) == String(pk) ? `2px solid ${POINT_COLOR}` : '0' };
        width: 100px;
        left: ${Number(left)}%;
        bottom: ${Number(bottom)}%;
        
    `

    return(
        <PressStatusWrapper onClick={onChangeEvent!== undefined ? ()=>{
            onChangeEvent(pk)
            onChangeComponent(component)
        } : ()=>{}} >
            <TitleDiv>
                <p>{machine_name}</p>
            </TitleDiv>
            <InnerDiv>
                <img src={machine_photo}/>
                <div>
                    <table>
                        <tr>
                            <td><p>사용률</p></td>
                            <td><p style={{textAlign:'right'}}>{duty_cycle}%</p></td>
                        </tr>
                        <tr>
                            <td><p>전류량</p></td>
                            <td><p style={{textAlign:'right'}}>{current}A</p></td>
                        </tr>
                    </table>
                </div>
            </InnerDiv>
        </PressStatusWrapper>
    )
}
const Marker = Styled.div`
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    color: white;
    p{
        font-size: 12px;
        font-weight: bold;
        color: white;
        margin: 0;
    }
    table{
        width: calc(100% - 10px);
        p{
            color: black;
        }
    }
    position: absolute;
`
const InnerDiv = Styled.div`
    background-color: #d1d1d1;
    padding-bottom: 4px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    p{
        color: #252525;
    }
    img{
        height: 80px;
        margin: 0;
        width: 100px;
        object-fit: cover;
    }
`

const TitleDiv = Styled.div`
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #28aeae;
    padding-top: 4px;

    padding-bottom: 4px;
`
export default PressCMSMarker;
