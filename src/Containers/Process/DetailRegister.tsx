import React, {useCallback, useEffect, useState} from 'react'
import Styled from "styled-components";
import {Button, Header, Input, Select} from 'semantic-ui-react'
import ReactShadowScroll from 'react-shadow-scroll';
import {POINT_COLOR} from "../../Common/configset";
import IcButton from "../../Components/Button/IcButton";
import searchIcon from "../../Assets/Images/ic_search.png"
import PopupButtons from "../../Components/Button/PopupButtons";
import IcSearchButton from "../../Assets/Images/ic_search.png";
import IcPlushButton from "../../Assets/Images/plus_ic.png";
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import styled from "styled-components";
import {API_URLS, getSearchProcess, postProcessRegister} from "../../Api/mes/process";
import {transferCodeToName} from "../../Common/codeTransferFunctions";

interface IMachineData {
    machine_name: string,
    machine_type: number,
    mold_info: { mold_name: string, mold_pk: string }
}

interface IDetailRegister {
    pk: string,
    process_name: string,
    process_type: number,
    machines: IMachineData []
}

const ProcessDetailRegisterContainer = () => {
    const [processName, setProcessName] = useState<string>()
    const [searchData, setSearchData] = useState<string>()

    const [processList, setProcessList] = useState<IDetailRegister[]>([])
    const [machineList, setMachineList] = useState<IMachineData[]>([])

    const [processPKList, setProcessPKList] = useState<string[]>([])
    const [processDataList, setProcessDataList] = useState<{ name: string, type: number, machines: string }[]>([
        { name: '', type: -1, machines: '' }
    ])

    const getSearchProcessList = useCallback(async () => {
        const tempUrl = `${API_URLS['process'].search}?keyword=${searchData ? searchData : ''}`
        const resultData = await getSearchProcess(tempUrl);
        console.log(resultData)
        setProcessList(resultData.results)
    }, [searchData])

    const postProcessRegisterFunc = async () => {
        const tempUrl = `${API_URLS['segment'].register}`
        const resultData = await postProcessRegister(tempUrl, {name: processName, processes: processPKList});
        console.log(resultData)
    }

    useEffect(() => {
        getSearchProcessList()
    }, [])
    useEffect(() => {
        console.log(processPKList)
    }, [processPKList])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>공정별 세분화 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div style={{marginTop: 30}}>
                    <div>
                        <table style={{color: "black"}}>
                            <tr>
                                <td>• 세분화 공정명</td>
                                <td><Input placeholder="프로세스명 or 세분화 공정 명을 입력해 주세요." onChange={(e) => setProcessName(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{verticalAlign: 'top'}}>• 등록 공정 검색</td>
                                <td>
                                    <div style={{flexDirection: 'row', display: 'flex'}}>
                                        <div style={{ width: 360, height: 211, marginRight: 20 }}>
                                            <div style={{width: 360, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
                                                <SearchBox placeholder="검색어를 입력해주세요." style={{width: 360-28}} onChange={(e) => setSearchData(e.target.value)}/>
                                                <SearchButton style={{width: 32}} onClick={() => {

                                                }}>
                                                    <img src={IcSearchButton}/>
                                                </SearchButton>
                                            </div>
                                           <div style={{height: 169, width: 'calc(100%-20px)', backgroundColor: '#f4f6fa', border: '1px solid #b3b3b3'}}>
                                               <div>
                                                   <MachineTable style={{margin: 0, padding: 0}}>
                                                       <tr style={{borderBottom: '1px solid #b3b3b3', margin: 0, padding: 0}}>
                                                           <th><span>공정명</span></th>
                                                           <th><span>타입</span></th>
                                                           <th style={{width: 28}}></th>
                                                       </tr>
                                                       {
                                                           processList.map((v, i) => {
                                                               console.log(v)
                                                                return (
                                                                    <tr style={{borderBottom: '1px solid #b3b3b35f', padding: 0}}>
                                                                        <td><span>{v.process_name}</span></td>
                                                                        <td><span>{transferCodeToName('process', v.process_type)}</span></td>
                                                                        <td style={{width: 28, height: 28}}>
                                                                            <div>
                                                                                <SearchButton style={{
                                                                                    backgroundColor: '#00000000',
                                                                                    border: 0,
                                                                                    width: 28,
                                                                                    height: 28
                                                                                }} onClick={() => {
                                                                                    let tmpList = [...processPKList, v.pk]
                                                                                    let tmpList2 = processDataList
                                                                                    setProcessPKList(tmpList)
                                                                                    setMachineList(v.machines)

                                                                                    tmpList2.push({
                                                                                        name: v.process_name,
                                                                                        type: v.process_type,
                                                                                        machines: v.machines[0].machine_name + ' 외 ' + v.machines.length + '개'
                                                                                    })

                                                                                    setProcessDataList(tmpList2)

                                                                                }}>
                                                                                    <img src={IcPlushButton} style={{width: 28, height: 28}}/>
                                                                                </SearchButton>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                           })
                                                       }

                                                   </MachineTable>
                                               </div>
                                           </div>
                                        </div>
                                        <div style={{ backgroundColor: '#f4f6fa', width: 507, height: 191, padding: '10px 20px', border: '1px solid #b3b3b3'}}>
                                            <p style={{textAlign: 'left'}}>설정</p>
                                            {/*<ReactShadowScroll>*/}
                                                <div style={{height: 169, width: 'calc(100%-20px)', backgroundColor: '#f4f6fa'}}>
                                                    <MachineTable style={{margin: 0, padding: 0}}>
                                                        <tr style={{borderBottom: '1px solid #b3b3b3', margin: 0, padding: 0}}>
                                                            <th><span>기계명</span></th>
                                                            <th><span>금형명</span></th>
                                                        </tr>
                                                        {
                                                            machineList.map((v, i) => {
                                                                return (
                                                                    <tr style={{borderBottom: '1px solid #b3b3b35f'}}>
                                                                        <td><span>{v.machine_name}</span></td>
                                                                        <td><span>{ v.mold_info.mold_name && v.mold_info.mold_name}</span></td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </MachineTable>
                                                </div>
                                            {/*</ReactShadowScroll>*/}
                                        </div>
                                    </div>
                                    <div style={{paddingTop: 20, marginBottom: 10}}>
                                        <p style={{textAlign: 'left'}}>프로세스 순서</p>
                                    </div>
                                    <div>
                                        <HeaderTable>
                                            <div style={{width: 141}}>
                                                <p>공정명</p>
                                            </div>
                                            <div style={{width: 130}}>
                                                <p>타입</p>
                                            </div>
                                            <div style={{width: 638}}>
                                                <p>기계명</p>
                                            </div>
                                        </HeaderTable>
                                        <div style={{width: 929, height: 132, backgroundColor: '#f4f6fa', border: '1px solid #b3b3b3', marginTop: 10}}>
                                            <ReactShadowScroll style={{width: "100%", height: 132}}>
                                            {
                                                processDataList.map((v, i) => {
                                                    if(v.name === ''){
                                                        return
                                                    }
                                                    return (
                                                        <HeaderTable>
                                                            <div style={{width: 141}}>
                                                                <p>{v.name}</p>
                                                            </div>
                                                            <div style={{width: 130}}>
                                                                <p>{v.type}</p>
                                                            </div>
                                                            <div style={{width: 638}}>
                                                                <p>{v.machines}</p>
                                                            </div>
                                                        </HeaderTable>
                                                    )
                                                })
                                            }
                                            </ReactShadowScroll>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <ButtonWrap onClick={async () => {
                        postProcessRegisterFunc()
                    }}>
                        <div style={{width: 360, height: 46}}>
                            <p style={{fontSize: 18, marginTop: 8}}>등록하기</p>
                        </div>
                    </ButtonWrap>
                </div>
            </ContainerMain>
        </div>
    )
}

const ContainerMain = Styled.div`
    width: 1060px;
    height: 827px;
    border-radius: 6px;
    background-color: white;
    padding: 35px 20px 0 20px;
    .title {
        font-size: 18px;
        font-famaily: NotoSansCJKkr;
        font-weight: bold;
        color: #19b8df;
        text-align: left;
    }
    table{
        width: 100%;
        height: 100%;
    }
    td{
        font-famaily: NotoSansCJKkr;
        font-weight: bold;
        font-size: 15px;
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
        &:first-child{
            width: 133px;
            text-align: left;
        }
    }
    tr{
        height: 65px;
    }
`

const MachineTable = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
    tr{
        height: 28px;
        th{
            text-align: left;
        }
        td{
            text-align: left;
            border-spacing: 0px;
            height: 28px;
            padding: 0; 
            font-weight: normal; 
        }
    }
    
`

const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    margin-top: 24px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
`
const HeaderTable = styled.div`
    width: 909px;
    height: 28px;
    padding-left: 20px; 
    background-color: #f4f6fa;
    flex-direction: row;
    display: flex;
    border: 1px solid #b3b3b3;
    div{
        margin-top: 2px;
    }
    p{
        text-align: left;
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
const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`

export default ProcessDetailRegisterContainer
