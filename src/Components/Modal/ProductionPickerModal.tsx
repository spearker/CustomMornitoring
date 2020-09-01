import React, {useCallback, useEffect, useRef, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import useOnclickOutside from 'react-cool-onclickoutside';
import IcSearchButton from "../../Assets/Images/ic_search.png";
import Modal from "react-modal";
import ReactShadowScroll from 'react-shadow-scroll';
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from "semantic-ui-react";
import {getItemSearch, API_URLS} from "../../Api/mes/manageStock";


//드롭다운 컴포넌트

interface IProps{
    select?: { name?:string, pk?: string },
    onClickEvent: any
    text: string
}

const DummyItem = [
    {
        item_pk: 'dummy01',
        item_name: '더미 품목 1',
        item_type: '더미 타입 1'
    },
    {
        item_pk: 'dummy02',
        item_name: '더미 품목 2',
        item_type: '더미 타입 1'
    },
    {
        item_pk: 'dummy03',
        item_name: '더미 품목 3',
        item_type: '더미 타입 2'
    },
    {
        item_pk: 'dummy04',
        item_name: '더미 품목 4',
        item_type: '더미 타입 2'
    },
    {
        item_pk: 'dummy05',
        item_name: '더미 품목 5',
        item_type: '더미 타입 5'
    },
    {
        item_pk: 'dummy06',
        item_name: '더미 품목 6',
        item_type: '더미 타입 5'
    },
]

const ProductionPickerModal = ({select, onClickEvent, text}: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);
    const [itemName, setItemName] = useState('')

    // const ref = useOnclickOutside(() => {
    //     setIsOpen(false);
    // });

    const getList = useCallback(async () => {
        const tempUrl = `${API_URLS['machine'].list}?item_name=${itemName}`
        const resultData = await getItemSearch(tempUrl);
        console.log(resultData)
    }, [itemName])

    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{
        console.log(select)
    },[select])

    return (
        <div>
            <div style={{position:'relative', display:'inline-block', zIndex:0, width: 917}}>
                <BoxWrap onClick={()=>{setIsOpen(true)}} style={{padding: 0, backgroundColor: '#f4f6fa'}}>
                    <div style={{display:'inline-block', height: 32, width: 885}}>
                        {
                            select ? <p onClick={()=>{setIsOpen(true)}} style={{marginTop: 5}}>&nbsp; {itemName}</p>
                                : <p onClick={()=>{setIsOpen(true)}} style={{marginTop:5, color: '#b3b3b3'}}>&nbsp; {text}</p>
                        }
                      
                    </div>
                    <div style={{display:'inline-block', backgroundColor: POINT_COLOR, width: 32, height: 32}}>
                        <img style={{ width: 20, height: 20, marginTop: 5}} src={IcSearchButton} onClick={()=>{setIsOpen(true)}}/>
                    </div>

                </BoxWrap>
            </div>
            <Modal
                isOpen={isOpen}
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
                       background: 'rgba(0,0,0,.6)'
                   }
                }}
            >
                <div style={{width: 900}}>
                    <div style={{width: 860, height: 440, padding: 20}}>
                        <p style={{fontSize: 18, fontFamily: 'NotoSansCJKkr', fontWeight: 'bold'}}>• 품목(품목명) 검색</p>
                        <div style={{width: 860, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
                            <SearchBox placeholder="품목(품목명)을 입력해주세요." style={{flex: 96}} onChange={(e) => setItemName(e.target.value)}/>
                            <SearchButton style={{flex: 4}}>
                                <img src={IcSearchButton}/>
                            </SearchButton>
                        </div>
                        <div style={{height: 340, width: 860, backgroundColor: '#f4f6fa'}}>
                            <ReactShadowScroll>
                                <MachineTable>
                                    <tr>
                                        <th style={{width: 278}}>&nbsp; 기계명</th>
                                        <th style={{width: 520}}>기계 종류</th>
                                        <th style={{width: 30}}></th>
                                    </tr>
                                    {
                                        DummyItem.map((v,i) => {
                                            return(
                                                <tr style={{height: 32}}>
                                                    <td><span>&nbsp; {v.item_name}</span></td>
                                                    <td><span>{v.item_type}</span></td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                setItemName(v.item_name)
                                                                return onClickEvent({name: v.item_name, pk: v.item_pk, type: v.item_type})
                                                            }}
                                                            style={{backgroundColor: select ? v.item_pk === select.pk ? POINT_COLOR : '#dfdfdf' : '#dfdfdf', width: 32, height: 32, margin: 0}}
                                                        >
                                                            <img src={ic_check} style={{width: 20, height: 20}}/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </MachineTable>
                            </ReactShadowScroll>
                        </div>
                    </div>
                    <div style={{width: 900}}>
                        <CheckButton style={{left: 0, backgroundColor: '#e7e9eb'}} onClick={() => {
                            onClickEvent({name: undefined, pk: undefined})
                            setIsOpen(false)
                        }}>
                            <div>
                                <span style={{color: '#666d79'}}>취소</span>
                            </div>
                        </CheckButton>
                        <CheckButton style={{right:0, backgroundColor: POINT_COLOR}} onClick={() => {setIsOpen(false)}}>
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

const BoxWrap = Styled.button`
    border: 1px solid #b3b3b3;
    color: black;
    width: 100%;
    height: 32px;
    background-color: white;
    font-weight: bold;
    text-algin: center;
    font-size: 13px;
    display: flex;
    p{
        text-align: left;
        font-size: 15px;
        font-weight: bold;
    }
`

const SearchBox = Styled(Input)`
    input{
        padding-left: 8px;
        font-famaily: NotoSansCJKkr;
        height: 28px;
        border: 0.5px solid #b3b3b3;
        width: calc( 100% - 8px );
        background-color: #f4f6fa;
        font-size: 15px;
        &::placeholder:{
            color: #b3b3b3;
        };
     }
`

const SearchButton = Styled.button`
    width: 32px;
    height: 32px;
    background-color: ${POINT_COLOR};
    img{
        width: 20px;
        height: 20px;
        margin-top: 5px;
    }
`

const InnerBoxWrap = Styled.button`
    padding: 5px 15px 4px 15px;
    border-radius: 0px;
    color: white;
    min-width: 100px;
    background-color: ${BG_COLOR_SUB};
    border: none;
    font-weight: bold;
    text-algin: left;
    p{
        text-algin: left;
     }
    font-size: 13px;
    img {
    margin-right: 7px;
    width: 14px;
    height: 14px;
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

const MachineTable = Styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
    tr{
        height: 32px;
        border: 1px solid #b3b3b3;
        padding: 0px;
        th{
            text-align: left;
        }
        td{
            border-spacing: 0px;
            height: 32px;
            padding: 0; 
        }
    }
    
`

export default ProductionPickerModal;
