import React, {useCallback, useEffect, useState} from 'react'
import Styled from "styled-components";
import {Button, Header, Input, Select} from 'semantic-ui-react'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import moment from "moment";
import ModalDropdown from "../../Components/Dropdown/ModalDropdown";
import {POINT_COLOR} from "../../Common/configset";
import IcButton from "../../Components/Button/IcButton";
import searchImage from "../../Assets/Images/ic_search.png";
import dropdownButton from "../../Assets/Images/ic_dropdownbutton.png";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";
import MachinePickerModal from "../../Components/Modal/MachinePickerModal";
import {API_URLS, postProcessRegister} from "../../Api/mes/process";
import {machineCodes} from "../../Common/codeTransferFunctions";

const typeDummy = [
    '단발',
    '라인',
    '',
    '',
    '조립',
    '검수',
]

const productionDummy = [
    '더미 품목 1',
    '더미 품목 2',
    '더미 품목 3',
]

const listDummy = [
    { project_pk: 'dummy01', factory: '더미 업체 1', production: '더미 품목 1', planDate: {start: '2020-08-15', end: '2020-08-17'}},
    { project_pk: 'dummy02', factory: '더미 업체 1', production: '더미 품목 1', planDate: {start: '2020-08-15', end: '2020-08-17'}},
]

const ProcessRegisterContainer = () => {
    const [typeList, setTypeList] = useState<string[]>(typeDummy)

    const [processData, setProcessData] = useState<IProcessRegister>({
        type: 0,
        name: '',
        processes: [{machine_pk: '', recommend: 0}],
        description: ''
    })

    const [selectMachine, setSelectMachine] = useState<{ name?: string, pk?: string }>()

    const postContractRegisterData = useCallback(async () => {
        const tempUrl = `${API_URLS['process'].register}`
        const resultData = await postProcessRegister(tempUrl, processData);
        console.log(resultData)
    }, [processData])

    const changeType = async (e: number) => {
        if(e === 0){
            console.log("0번")
            await setProcessData({
                ...processData,
                processes: [{machine_pk: '', recommend: 0}]
            })
        }else if(e === 1){
            console.log("1번")
            await setProcessData({
                ...processData,
                processes: [{machine_pk: '', recommend: 0}, {machine_pk: '', recommend: 0}]
            })
        }else{
            console.log("나머지")
            await setProcessData({
                ...processData,
                processes: []
            })
        }    }

    useEffect(() => {
        changeType(processData.type)
    }, [processData.type])
    useEffect(() => {
        console.log(processData)
    }, [processData])

    return (
        <div>
            <div style={{position: 'relative', textAlign: 'left', marginTop: 48}}>
                <div style={{display: 'inline-block', textAlign: 'left', marginBottom: 23}}>
                    <span style={{fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: "bold"}}>공정 등록</span>
                </div>
            </div>
            <ContainerMain>
                <div>
                    <p className={'title'}>필수 항목</p>
                </div>
                <div>
                    <table style={{color: "black"}}>
                        <tr>
                            <td>• 타입</td>
                            <td>
                                <RegisterDropdown
                                    type={'number'}
                                    onClickEvent={async (e: number) =>  setProcessData({...processData, type: e})}
                                    select={typeList[processData.type]}
                                    contents={typeList} text={'타입을 선택해 주세요'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>• 공정명</td>
                            <td><Input placeholder="공장명을 입력해 주세요." onChange={(e) => setProcessData({...processData, name: e.target.value})}/></td>
                        </tr>
                        {
                            processData.processes && processData.processes.length !== 0
                                && processData.processes.map((v, i) => {
                                    return(
                                        <tr>
                                            <td>• {i+1}번 공정</td>
                                            <td><MachinePickerModal select={
                                                selectMachine && (selectMachine.name && selectMachine.pk) ? selectMachine : undefined
                                            } text={'기계명을 검색해 주세요'} onClickEvent={(e: {name?: string, pk?: string}) => {
                                                let tmpList = processData.processes
                                                if (tmpList && e.pk) {
                                                    tmpList[i] = {machine_pk: e.pk, recommend: 0}
                                                }

                                                console.log(tmpList)
                                                setSelectMachine(e)
                                                return setProcessData({...processData, processes: tmpList})
                                            }}/></td>
                                        </tr>
                                    )
                                })
                        }
                        {
                            processData.type !== 0 &&
                            <tr>
                                <td>{processData.processes && processData.processes.length !== 0 ? '' : '• 공정'}</td>
                                <td>
                                    <ProcessAddButton onClick={() => {
                                        let tmpList = processData.processes
                                        //@ts-ignore
                                        tmpList.push({machine_pk: '', recommend: 0})
                                        setProcessData({
                                            ...processData,
                                            processes: tmpList
                                        })
                                    }}>
                                        <div style={{width: 919, height: 34, backgroundColor: '#f4f6fa', border: '1px solid #b3b3b3'}}>
                                            <div style={{marginTop: 5}}>
                                                <p style={{color: '#b3b3b3', }}>+ 공정 추가</p>
                                            </div>
                                        </div>
                                    </ProcessAddButton>
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>• 설명</td>
                            <td><Input style={{width: 917,}} placeholder="설명을 입력해 주세요." onChange={(e) => setProcessData({...processData, description: e.target.value})}/></td>
                        </tr>
                    </table>
                </div>
                <div style={{marginTop: 72}}>
                    <ButtonWrap onClick={async () => {
                        await postContractRegisterData()
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
    height: auto;
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
        margin-top: 35px;
    }
    td{
        font-famaily: NotoSansCJKkr;
        font-weight: bold;
        font-size: 15px;
        input{
            padding-left: 8px;
            font-famaily: NotoSansCJKkr;
            height: 32px;
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

const CheckButton = Styled.button`
    position: absolute;
    bottom: 0px;
    height: 46px;
    width: 225px;
    div{
        width: 100%;
    }
    span{
        line-height: 46px;
        font-family: NotoSansCJKkr;
        font-weight: bold;
    }
`

const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    margin-bottom: 20px;
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
const ProcessAddButton = Styled.button`
    
`

export default ProcessRegisterContainer
