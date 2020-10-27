import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import IcSearchButton from "../../Assets/Images/ic_search.png";
import Modal from "react-modal";
import ReactShadowScroll from 'react-shadow-scroll';
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from "semantic-ui-react";
import {API_URLS, getProductionSearch} from "../../Api/mes/production";
import XBtn from '../../Assets/Images/ic_task_close.png';
import DropImg from '../../Assets/Images/ic_dropdownbutton.png';
import icCheck from '../../Assets/Images/ic_check_on.png'
import icCheckDim from '../../Assets/Images/ic_check_dim.png'

//드롭다운 컴포넌트

interface IProps{
    data?: any
    onClickEvent?: any
    onCloseEvent?: any
    isClose?: boolean
}

const itemDummyList = [
    {
        pk: "material_pk_1",
        material_name: '품목1',
        material_type: 1,
        location: '제스텍',
    },
    {
        pk: "material_pk_2",
        material_name: '품목2',
        material_type: 2,
        location: '제스텍2',
    },
    {
        pk: "material_pk_3",
        material_name: '품목3',
        material_type: 3,
        location: '제스텍3',
    },{
        pk: "material_pk_4",
        material_name: '품목4',
        material_type: 4,
        location: '제스텍',
    },
    {
        pk: "material_pk_5",
        material_name: '품목5',
        material_type: 5,
        location: '제스텍',
    },
    {
        pk: "material_pk_6",
        material_name: '품목6',
        material_type: 6,
        location: '제스텍',
    },
    {
        pk: "material_pk_7",
        material_name: '품목7',
        material_type: 7,
        location: '제스텍',
    }
]

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

    const [itemList, setItemList] = useState<any[]>([]);
    const [isItemOpen, setIsItemOpen] = useState<boolean>(false);
    const [itemSelect, setItemSelect] = useState<any>({
        pk: "",
        material_name: '',
        material_type: 0,
        location: '',
    });


    useEffect(()=>{
        setItemList(itemDummyList)
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
                <PopupBox>
                    <div>
                        <div><img alt="x버튼" src={XBtn} /></div>
                        <h2>{data?.title !== undefined ? data?.title : '공정 A  품목 선택'}</h2>

                        <p className="smallTitle"><Dot/> 투입자재</p>
                        <SelectBox>
                            <div onClick={()=>setIsItemOpen(!isItemOpen)}><div style={{color: itemSelect.material_name === '' ? '#b3b3b3' : 'black'}}>{itemSelect.material_name === '' ? '품목(품목명)을 선택해 주세요.' : itemSelect.material_name}</div><img alt="drop" src={DropImg} /></div>
                            {
                                isItemOpen &&
                                <div>
                                    {
                                        itemList.map((v, i)=>(
                                            <><div key={i} onClick={()=>{setIsItemOpen(false); setItemSelect(v)}}><div>{v.material_name}</div><div style={{backgroundColor: itemSelect.material_name !== v.material_name ? '#dfdfdf' : '#19b9df'}}><img alt="drop" src={icCheck} /></div></div></>
                                        ))
                                    }
                                </div>
                            }
                        </SelectBox>
                        <div style={{marginBottom: '30px'}}></div>

                        <p className="smallTitle"><Dot/> 생산자재</p>
                        <SelectBox>
                            <div><div></div><img alt="drop" src={DropImg} /></div>
                            {
                                isItemOpen &&
                                <div>
                                    {
                                        itemList.map((v, i)=>(
                                            <><div key={i} onClick={()=>{setIsItemOpen(false); setItemSelect(v)}}><div>{v.material_name}</div><img alt="drop" src={DropImg} /></div></>
                                        ))
                                    }
                                </div>
                            }
                        </SelectBox>

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
                </PopupBox>
            </Modal>

        </div>
    );
}

const SelectBox = Styled.div`
    width: 100%;
    /* height: 28px; */
    &>div{
        color: #b3b3b3;
        &:first-child{
            cursor: pointer;
            display: flex;
            &>div{
                padding-left: 7px;
                width: calc(100% - 28px);
                border: solid 0.5px #b3b3b3;
                background-color: #f4f6fa;
                font-size: 15px;
                color: #b3b3b3;
                display: flex;
                align-items: center;
            }
            &>img{
                width: 28px;
                height: 100%;
            }
        }
        &:nth-child(2){
            overflow: auto;
            max-height: 140px;
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
            &>div{
                cursor: pointer;
                display: flex;
                height: 28px;
                &>div{
                    &:first-child{
                        padding-left: 7px;
                        width: calc(100% - 28px);
                        border: solid 0.5px #b3b3b360;
                        background-color: #fff;
                        color: #a0a0a0;
                        display: flex;
                        align-items: center;
                    }
                    &:nth-child(2){
                        width: 28px;
                        height: 100%;
                        text-align: center;
                        background-color: #dfdfdf;
                        &>img{
                            width: 20px;
                            vertical-align: middle;
                            
                        }
                    }
                }
                &:hover{
                    &>div{
                        &:first-child{
                            background-color: #a0a0a030;

                        }
                        &:nth-child(2){
                            background-color: #19b9df70 !important;
                        }
                    }   
                }
            }
        }

    }
`

const Dot = Styled.div`
    width: 5px;
    height: 5px;
    background-color: #3e3e3e;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
`

const PopupBox = Styled.div`
    background-color: #fff;
    border-radius: 6px;
    width: 100%;
    max-width: 414px;
    /* min-height: 350px; */
    border-radius: 6px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    box-sizing: border-box;
    *{
        box-sizing: border-box;
        font-family: NotoSansCJKkr;
    }
    h2{
        font-size: 22px;
        font-weight: bold;
        margin: 0 0 34px 0;
        padding: 0;
    }
    .smallTitle{
        font-size: 15px;
        font-weight: bold;
        text-align: left;
        color: #0d0d0d;
        margin: 0 0 15px 0;
    }
    &>div{
        &:first-child{
            padding: 20px 20px 82px 20px;
            &>div{
                &:first-child{
                    position: relative;
                    img{
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 25px;
                    }
                }
            }
        }
    }





`

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
