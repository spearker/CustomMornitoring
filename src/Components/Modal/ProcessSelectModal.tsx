import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import IcSearchButton from "../../Assets/Images/ic_search.png";
import Modal from "react-modal";
import ReactShadowScroll from 'react-shadow-scroll';
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from "semantic-ui-react";
import {API_URLS, getProductionSearch} from "../../Api/mes/production";

//드롭다운 컴포넌트

interface IProps{
    data: any
    onClickEvent: any
    onCloseEvent: any
    isClose: boolean
}

const ProcessSelectModal = ({data, onClickEvent, onCloseEvent, isClose}: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    
    // const getList = useCallback(async () => {
    //     const tempUrl = `${API_URLS['material'].search}?keyword=${searchName}&option=${type ? type : 0}&page=${page.current}&limit=1000`
    //     const resultData = await getProductionSearch(tempUrl);

    //     setProductList(resultData.info_list)

    // }, [searchName])

    // const handleClickBtn = () => {
    //     setIsOpen(!isOpen);
    // };
    useEffect(()=>{
        
    },[])

    return (
        <div>
            <Modal
                isOpen={isClose}
                style={{
                   content : {
                       top                   : '50%',
                       left                  : '50%',
                       right                 : 'auto',
                       bottom                : 'auto',
                       marginRight           : '-50%',
                       transform             : 'translate(-50%, -50%)',
                       padding: 0
                   },
                   overlay:{
                       background: 'rgba(0,0,0,.6)',
                       zIndex: 5
                   }
                }}
            >
                <div>
                    <div>
                        내용
                    </div>
                    <div style={{width: 900}}>
                        <CheckButton style={{left: 0, backgroundColor: '#e7e9eb'}} onClick={() => {}}>
                            <div>
                                <span style={{color: '#666d79'}}>취소</span>
                            </div>
                        </CheckButton>
                        <CheckButton style={{right:0, backgroundColor: POINT_COLOR}} onClick={() => {onCloseEvent(false)}}>
                            <div>
                                <span style={{color: 'black'}}>확인</span>
                            </div>
                        </CheckButton>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

const CheckButton = Styled.button`
    position: absolute;
    bottom: 0px;
    height: 46px;
    width: 50%;
    div{
        width: 100%;
    }
    span{
        line-height: 46px;
        font-family: NotoSansCJKkr;
        font-weight: bold;
    }
`


export default ProcessSelectModal;
