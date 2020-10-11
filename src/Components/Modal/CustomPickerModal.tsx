import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import Modal from "react-modal";
import ReactShadowScroll from 'react-shadow-scroll';
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from "semantic-ui-react";
import IcSearchButton from "../../Assets/Images/ic_search.png";
import {API_URLS as PRODUCTION_URLS, getProjectList } from "../../Api/mes/production";
import {API_URLS as BASIC_URLS, getBasicList } from "../../Api/mes/basic";



interface IProps{
    select?: { name?:string, pk?: string },
    onClickEvent: any
    text: string
    type: string
}

const DummyMachine = {
    machine: {
        machine_name:'기계명',
        machine_type:'기계종류(코드)',
        manufacturer_code: '제조번호',
        location_name: "공장명"
    },
    device: {
        device_name: '장치명',
        device_type: '장치종류(코드)',
        manufacturer_code: '제조번호',
        location_name: '공장명',
    },
    mold: {
        mold_name: '금형이름',
        mold_type: '금형종류(코드)',
        limit: '최대타수',
        current: '현재타수',
        location_name: '공장명'
    },
    material: {
        material_name: '이름',
        material_type: '카테고리(코드)',
        location_name: '공장명',
        stock: '재고'
    },
    voucher: {
        material_name: '품목(품목명)',
        registerer: '등록자',
        supplier_name: '납품 업체',
        goal: '생산 할 수량',
        current_amount: '현재 생산 수량'
    }
}



const CustomPickerModal = ({select, onClickEvent, text, type}: IProps) => {
    //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    const [isOpen, setIsOpen] = useState(false);
    const [machineName, setMachineName] = useState('')

    const [customName, setCustomName] = useState(DummyMachine)
    const [customList, setCustomList] = useState<any[]>([])
    const [searchName, setSearchName] = useState<string>('')

    // const ref = useOnclickOutside(() => {
    //     setIsOpen(false);
    // });

    const getList = useCallback(async () => {
        if (type === 'machine') {
            const tempUrl = `${BASIC_URLS['machine'].list}?page=${page.current}&keyword=&type=0&limit=15`
            const resultData = await getBasicList(tempUrl);
            setCustomList(resultData.info_list)
        } else if (type === 'device') {
            const tempUrl = `${BASIC_URLS['device'].list}?page=${page.current}&keyword=&type=0&limit=15`
            const resultData = await getBasicList(tempUrl);
            setCustomList(resultData.info_list)
        } else if (type === 'mold') {
            const tempUrl = `${BASIC_URLS['mold'].list}?page=${page.current}&keyword=&type=0&limit=15`
            const resultData = await getBasicList(tempUrl);
            setCustomList(resultData.info_list)
        } else if (type === 'material') {
            const tempUrl = `${BASIC_URLS['material'].list}?page=${page.current}&keyword=&type=0&limit=15`
            const resultData = await getBasicList(tempUrl);
            setCustomList(resultData.info_list)
        } else if (type === 'voucher') {
            const tempUrl = `${PRODUCTION_URLS['chit'].list}?pk=''&page=${page.current}`
            const resultData = await getProjectList(tempUrl);
            setCustomList(resultData.info_list)
        }
    }, [searchName,type,customList])

    const handleClickBtn = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{
        getList()
    },[type])

    return (
        <div style={{borderBottom: 'solid 0.5px #d3d3d3'}}>
            <div style={{position:'relative', zIndex:0, width: 1040,}}>
                <div style={{ display:'flex', paddingTop:17, paddingBottom:17, verticalAlign: 'top'}}>
                    <p style={{fontSize: 14, marginTop:5, fontWeight: 700, width: 210}}>{'· 세부 항목'}</p>
                    <BoxWrap onClick={()=>{setIsOpen(true)}} style={{padding: 0, backgroundColor: '#f4f6fa'}}>
                        <div style={{display:'inline-block', height: 32, width: 832}}>
                            {console.log(select)}
                            {
                                select && select.name ? <p onClick={()=>{setIsOpen(true)}} style={{marginTop: 5}}>&nbsp; {select.name}</p>
                                    : <p onClick={()=>{setIsOpen(true)}} style={{marginTop:5, color: '#b3b3b3'}}>&nbsp; {text}</p>
                            }
                        </div>
                        <div style={{display:'inline-block', backgroundColor: POINT_COLOR, width: 32, height: 32}}>
                            <img style={{ width: 20, height: 20, marginTop: 5}} src={IcSearchButton} onClick={()=>{setIsOpen(true)}}/>
                        </div>
                    </BoxWrap>
                </div>
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
                        <p style={{fontSize: 18, fontFamily: 'NotoSansCJKkr', fontWeight: 'bold'}}>• 세부 항목 검색</p>
                        <div style={{width: 860, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
                            <SearchBox placeholder="항목명을 입력해주세요." style={{flex: 96}} onChange={(e) => setSearchName(e.target.value)}/>
                            <SearchButton style={{flex: 4}} onClick={() => getList()}>
                                <img src={IcSearchButton}/>
                            </SearchButton>
                        </div>
                        <div style={{height: 310, width: 860, backgroundColor: '#f4f6fa',overflowY:"scroll"}}>
                            <ReactShadowScroll>
                                <MachineTable>
                                    <tr>
                                    {Object.keys(customName).map((v)=>{
                                        return(
                                        v === type ?
                                            Object.keys(customName[v]).map(m => {
                                                return(
                                                <td>{customName[v][m]}</td>
                                                )})
                                            :
                                            null
                                        )
                                    })}
                                        <td></td>
                                    </tr>
                                    {customList !== undefined && customList.length === 0 ?
                                        <tr>
                                            {Object.keys(customName).map((v)=>{
                                                return(
                                                    v === type ?
                                                        <td  colSpan={Object.keys(customName[v]).length} style={{textAlign: 'center'}}>데이터가 없습니다.</td>
                                                        :
                                                        null
                                                )
                                            })}
                                        </tr>
                                        :
                                        <>
                                            {customList?.map((v,i) => {
                                                return Object.keys(customName).map((vi)=>{
                                                    return(
                                                        <tr>
                                                            {vi === type ?
                                                                Object.keys(customName[vi]).map(m => {
                                                                    return (
                                                                        <td key={v[m]}>{v[m]}</td>
                                                                    )
                                                                })
                                                                :
                                                                null
                                                            }
                                                            {
                                                            vi === type ?
                                                            Object.keys(customName[vi]).map((m,index) => {
                                                            return(
                                                            <td>
                                                            {index === 0 ?
                                                                <button onClick={() => {setMachineName(v[m])
                                                                    return onClickEvent({name: v[m], pk: v.pk})}}
                                                                        style={{backgroundColor: select ? v.pk === select.pk ? POINT_COLOR : '#dfdfdf' : '#dfdfdf', width: 32, height: 32, margin: 0}}
                                                                >
                                                                    <img src={ic_check}
                                                                         style={{width: 20, height: 20}}/>
                                                                </button> :
                                                                null
                                                            }
                                                            </td>
                                                            )
                                                        })
                                                            :
                                                            null
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            })}
                                        </>
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
    border: 1px solid #d3d3d3;
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
        font-family: NotoSansCJKkr;
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

export default CustomPickerModal;

