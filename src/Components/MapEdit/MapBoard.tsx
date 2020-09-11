import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, { withTheme, DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom';
import ComponentMarker from './ComponentMarker';
import { toUnicode } from 'punycode';

interface Props{
    bg: any, //지도 경로
    xyList: any[],
    width: any,
    size: any,
    statusList?: any[],
}
const MapBoard = ({bg, xyList, width, size, statusList}:Props) => {

 
    return(
        <MapBoardWrapper style={{width: Number(width)}}  >
                <InnerWrapper>
                <img src={bg} style={{width: Number(width)}} />
                {
                     bg == '' &&
                    <p style={{color:'#555555'}}>도면 이미지를 업로드 해주세요</p>
                }
                <p>{width}</p>
            {
                xyList.map((v,i)=>{
                return(
                    <ComponentMarker 
                        status={ statusList == undefined ? 
                            undefined
                            :
                            statusList.find(f=> f.pk === v.pk ) !== undefined ?
                            statusList.find(f=> f.pk === v.pk )
                            :
                            undefined
                        } 
                        key={`marker-${i}`}
                        size={size}
                        left={v.left}
                        bottom={v.bottom}
                        pk={v.pk}
                        
                    >
                    </ComponentMarker>
                )
            })}


            </InnerWrapper>
        </MapBoardWrapper>
        
    )
}

const MapBoardWrapper = Styled.div`
    margin: 18px;
`

const InnerWrapper = Styled.div`
    border: 1px solid #dddddd;
    position: relative;
    p{
        text-align: center;
        text-overflow:ellipsis;
        white-space:nowrap;
        word-wrap:normal;
        width:100%;
        overflow:hidden;
    }

`

export default MapBoard;