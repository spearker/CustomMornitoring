import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getProjectList, postProjectDelete} from "../../Api/mes/production";
import FactoryBox from "../../Components/Box/FactoryBox";
import VoucherDropdown from "../../Components/Dropdown/VoucherDropdown";
import {useHistory} from "react-router-dom";
import {transferCodeToName} from "../../Common/codeTransferFunctions";
import {postSegmentDelete} from "../../Api/mes/process";
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'


const ScheduleContainer = () => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [detailTitleEventList, setDetailTitleEventList] = useState<any[]>([]);
    const [deletePk, setDeletePk] = useState<({keys: string[]})>({keys: []});
    const [detailList,setDetailList] = useState<{chit_list: any[], name: string, process: any[], state: boolean}>({chit_list: [],name: '', process: [], state: false});
    const [index, setIndex] = useState({manager_name:'계획자명'});
    const [voucherIndex, setVoucherIndex] = useState({registerer: "등록자"});
    const [voucherList, setVoucherList] = useState<any[]>([])
    const [process, setProcess ] = useState<any[]>([]);
    const [selectPk, setSelectPk ]= useState<any>(null);
    let sendPk = ''
    const [selectMaterial, setSelectMaterial ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const history = useHistory();

    useEffect(()=>{
        console.log(selectPk)
    },[selectPk])


    const indexList = {
        schedule: {
            manager_name: '계획자',
            material_name: '품목(품목명)',
            schedule: '일정',
            supplier_name: '납품 업체',
            amount: '총 수량',
            state: '현황'
        }
    }

    const detailDummy = [
        {
            machine_name: "기계명" ,
            mold_name: "금형명",
            input_material: "입력 자재(품목)명",
            output_material: "출력 자재(품목)명"
        }
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/project/production/register')
        },
        // {
        //     Name: '수정',
        // },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    const detailTitleEvent = [
        {
            Name: '생산 계획 배포',
            Width: 130,
            Link: () => getDistribute()
        }
    ]

    const allCheckOnClick = useCallback((list)=>{
        let tmpPk: string[] = []
        list.map((v,i)=>{
            console.log(v.pk)
            tmpPk.push(v.pk)
        })
        setDeletePk({...deletePk, keys: tmpPk})
    },[deletePk])

    const checkOnClick = useCallback((Data) => {
        deletePk.keys.push(Data.pk)
        console.log(deletePk.keys)
    },[deletePk])

    const voucherIndexList = {
        schedule: {
            registerer: "등록자",
            deadline: "납기일",
            goal: '목표 수량',
            current_amount: '작업 수량',
        }
    }


    const onClick = useCallback((segment) => {
        if(segment.pk === selectPk){
            setSelectPk(null);
            sendPk = ''
            setSelectMaterial(null);
            setSelectValue(null);
        }else{
            setSelectPk(segment.pk);
            sendPk = segment.pk
            setSelectMaterial(segment.material_name);
            setSelectValue(segment)
            //TODO: api 요청
            return getData(segment.pk)
        }
    }, [selectPk,selectMaterial,selectValue]);


    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['production'].dropdown}?pk=${pk}`
        const res = await getProjectList(tempUrl)

        setDetailList(res)
        const getSchedule = res.chit_list.map((v,i)=>{
                const current_amount = v.current_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                const goal = v.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            return {...v, current_amount: current_amount, goal: goal}
        })
        setVoucherList(getSchedule)
    },[selectPk, detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['production'].list}?from=${'2020-09-01'}&to=${'2020-09-20'}&page=${page.current}`
        const res = await getProjectList(tempUrl)
        const getprocesses = res.info_list.map((v,i)=>{

            const amount = v.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const statement =  v.state ? '배포됨' : '배포전'

            return {...v, state: statement, amount: amount}
        })

        setPage({ current: res.current_page, total: res.total_page })
        setList(getprocesses)

    },[list])

    const getDistribute = useCallback (async () => {
        //TODO: 성공시

        const tempUrl = `${API_URLS['production'].distribute}?pk=${sendPk}`
        const res = getProjectList(tempUrl)

        history.push('/project/chit/register')

    },[sendPk])

    const postDelete = useCallback(async () => {
        const tempUrl = `${API_URLS['production'].delete}`
        const res = await postProjectDelete(tempUrl, deletePk)
        console.log(res)

    },[deletePk])

    useEffect(()=>{
        getList()
        setIndex(indexList["schedule"])
        // setList(dummy)
        setTitleEventList(titleeventdummy)
        setProcess(detailDummy)
        setDetailTitleEventList(detailTitleEvent)
        // setDetailList(detaildummy)
        setVoucherIndex(voucherIndexList["schedule"])
        // setVoucherList(voucherdummy)
    },[])

    return (
        <div>
            <OvertonTable
                title={'생산 계획 리스트'}
                calendar={true}
                titleOnClickEvent={titleEventList}
                allCheckOnClickEvent={allCheckOnClick}
                allCheckbox={true}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                checkOnClickEvent={checkOnClick}
                checkBox={true}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                    <LineTable title={selectMaterial}  titleOnClickEvent={detailTitleEventList}>
                        <VoucherDropdown pk={'123'} name={'생산 계획 공정'} clickValue={'123'}>
                            <div style={{display:"flex", flexDirection: "row"}}>
                            {detailList.process.map((v,i)=>{
                                return(
                                        <FactoryBox title={v.process_name} inputMaterial={v.input_material} productionMaterial={v.output_material}/>
                                )})}
                            </div>
                        </VoucherDropdown>
                        <VoucherDropdown pk={'123'} name={'전표 리스트'} clickValue={'123'}>
                                <LineTable allCheckbox={true} contentTitle={voucherIndex} checkBox={true} contentList={voucherList}>
                                    <Line/>
                                </LineTable>
                        </VoucherDropdown>
                    </LineTable>
                    :
                    null
                }
            </OvertonTable>
            <NumberPagenation stock={page.total ? page.total : 0} selected={page.current} onClickEvent={(i: number) => setPage({...page, current: i})}/>
        </div>
    );
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default ScheduleContainer
