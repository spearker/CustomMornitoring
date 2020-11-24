import React, {useContext, useEffect, useState, useCallback} from 'react';
import Styled, {withTheme, DefaultTheme} from 'styled-components'
import {useHistory} from 'react-router-dom';
import ComponentMarker from './ComponentMarker';
import {toUnicode} from 'punycode';
import SmallButton from "../Button/SmallButton";
import {POINT_COLOR} from "../../Common/configset";

interface Props {
    bg: any, //지도 경로
    xyList: any[],
    width: any,
    size: any,
    statusList?: any[],
    mapUpload?: any
}

const MapBoard = ({bg, xyList, width, size, statusList, mapUpload}: Props) => {


    return (
        <MapBoardWrapper style={{width: Number(width)}}>
            <InnerWrapper>
                <div style={{width: Number(width),}}>
                    {
                        bg == '' &&
                        <>
                            <p style={{
                                color: '#babcbf',
                                marginTop: 150,
                                fontSize: "20px",
                                marginBottom: 20,
                            }}>도면 이미지를
                                업로드 해주세요</p>
                            <UploadButton htmlFor={"map"}>도면 업로드</UploadButton>
                            <input type="file" name={'TEMP NAME'} id={"map"} style={{display: 'none'}}
                                   onChange={mapUpload}/>
                            <p style={{marginBottom: 130}}/>
                        </>
                    }
                </div>
                <img src={bg === '' ? null : bg} style={{width: Number(width)}}/>
                {
                    xyList.map((v, i) => {
                        return (
                            <ComponentMarker
                                status={statusList == undefined ?
                                    undefined
                                    :
                                    statusList.find(f => f.pk === v.pk) !== undefined ?
                                        statusList.find(f => f.pk === v.pk)
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
  margin-top:10px
`

const InnerWrapper = Styled.div`
    border: 1px solid #111319;
    background-color: #111319;
    position: relative;
    border-radius: 6px;
    p{
        text-align: center;
        text-overflow:ellipsis;
        white-space:nowrap;
        word-wrap:normal;
        width:100%;
        overflow:hidden;
    }

`

const UploadButton = Styled.label`
    padding: 7px 18px;
    color: black;
    border-radius: 5px;
    background-color:  ${POINT_COLOR};
    border: 0;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
`

export default MapBoard;
