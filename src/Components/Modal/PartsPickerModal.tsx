import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import dropdownButton from "../../Assets/Images/ic_dropdownbutton.png";
import Modal from "react-modal";
import ReactShadowScroll from 'react-shadow-scroll';
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from "semantic-ui-react";
import IcSearchButton from "../../Assets/Images/ic_search.png";
import {API_URLS, getSearchMachine} from "../../Api/mes/process";
import {transferCodeToName} from "../../Common/codeTransferFunctions";

//드롭다운 컴포넌트

interface IProps{
    select?: { name?:string, pk?: string },
    onClickEvent: any
    text: string
    width?: number
}

const PartsPickerModal = ({select, onClickEvent, text, width}: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, setIsOpen] = useState(false);
    const [machineName, setMachineName] = useState('')

    const [machineList, setMachineList] = useState<any[]>([{
        pk: '',
        parts_name: '',
        parts_type: '',
        parts_type_name: '',
        location_pk: '',
        location_name: '',
        parts_cost: '',
    }])
    const [searchName, setSearchName] = useState<string>('')

    // const ref = useOnclickOutside(() => {
    //     setIsOpen(false);
    // });

    const getList = useCallback(async () => {
        const tempUrl = `${API_URLS['parts'].search}?keyword=${searchName}&page=0&type=0`
        const resultData = await getSearchMachine(tempUrl);
        console.log(resultData)
        setMachineList(resultData.results.items)
    }, [searchName])

    useEffect(() => {
        console.log(searchName)
    },[searchName])


    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{
        getList()
    },[])

    return (
        <div>
            <div style={{position:'relative', display:'inline-block', zIndex:0, width: width ? width : 917}}>
                <BoxWrap onClick={()=>{setIsOpen(true)}} style={{padding: 0, backgroundColor: '#f4f6fa'}}>
                    <div style={{display:'inline-block', height: 32, width: 885}}>
                        {
                            select ? <p onClick={()=>{setIsOpen(true)}} style={{marginTop: 5}}>&nbsp; {machineName}</p>
                                : <p onClick={()=>{setIsOpen(true)}} style={{marginTop:5, color: '#b3b3b3'}}>&nbsp; {text}</p>
                        }

                    </div>
                    <div style={{display:'inline-block', backgroundColor: POINT_COLOR, width: 32, height: 32}}>
                        <SearchButton style={{flex: 4}} onClick={()=>{setIsOpen(true)}}>
                        <img src={IcSearchButton} />
                        </SearchButton>
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
                       background: 'rgba(0,0,0,.6)',
                       zIndex: 5
                   }
                }}
            >
                <div style={{width: 900}}>
                    <div style={{width: 860, height: 440, padding: 20}}>
                        <p style={{fontSize: 18, fontFamily: 'NotoSansCJKkr', fontWeight: 'bold'}}>• 부품 검색</p>
                        <div style={{width: 860, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
                            <SearchBox placeholder="부품명을 입력해 주세요." style={{flex: 96}} onChange={(e) => setSearchName(e.target.value)}/>
                            <SearchButton style={{flex: 4}} onClick={() => getList()}>
                                <img src={IcSearchButton}/>
                            </SearchButton>
                        </div>
                        <div style={{height: 310, width: 860, backgroundColor: '#f4f6fa',overflowY:"scroll"}}>
                            <ReactShadowScroll>
                                <MachineTable>
                                    <tr>
                                        <th style={{width: 100}}>부품명</th>
                                        <th style={{width: 100}}>부품종류</th>
                                        <th style={{width: 200}}>공장명</th>
                                        <th style={{width: 100}}>부품원가</th>
                                        <th style={{width: 30}}></th>
                                    </tr>
                                    {
                                        machineList.map((v,i) => {
                                            return(
                                                <tr style={{height: 32}}>
                                                    <td style={{width: 100}}>{v.parts_name}</td>
                                                    <td style={{width: 100}}>{v.parts_type_name}</td>
                                                    <td style={{width: 200}}>{v.location_name}</td>
                                                    <td style={{width: 100}}>{v.parts_cost}</td>
                                                    <td>
                                                        <button
                                                          onClick={() => {
                                                              setMachineName(v.parts_name)
                                                              return onClickEvent({name: v.parts_name, pk: v.pk})
                                                          }}
                                                          style={{backgroundColor: select ? v.pk === select.pk ? POINT_COLOR : '#dfdfdf' : '#dfdfdf', width: 32, height: 32, margin: 0}}
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

export default PartsPickerModal;
