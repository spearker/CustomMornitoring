import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getProcessList, postProcessDelete} from "../../Api/mes/process";
import {useHistory} from "react-router-dom";
import {transferCodeToName} from "../../Common/codeTransferFunctions";
import {postCustomerDelete} from "../../Api/mes/customer";
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import {keys} from "@material-ui/core/styles/createBreakpoints";

const ProcessListContainer = () => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    const [list, setList] = useState<any[]>([]);
    const [BOMlist, setBOMList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList, setDetailList] = useState<any>([]);
    const [deletePk, setDeletePk] = useState<({keys: string[]})>({keys: []});
    const [index, setIndex] = useState({ type: "타입" });
    const [BOMindex, setBOMIndex] = useState({ material_name: '품목(품목명)' });
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectProcess, setSelectProcess] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const [subIndex, setSubIndex] = useState({  machine_name: "테스트 프레스",})
    const history = useHistory();

    const indexList = {
        info_list: {
            type: "타입",
            name: "공정 명",
            status: "현황"
        }
    }

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/process/register')
        },
        {
            Name: '삭제',
            Link: ()=>postDelete()
        }
    ]

    const detailTitle = {
        processes:  {
            type: '공정명',
            machine_name: "기계",
            mold_name: "사용 금형"
        }
    }

    const onClick = useCallback((process) => {
        console.log('dsfewfewf', process.type);
        if (process.pk === selectPk) {
            setSelectPk(null);
            setSelectProcess(null);
            setSelectValue(null);
        } else {
            setSelectPk(process.pk);
            setSelectProcess(process.name);
            setSelectValue(process)
            //TODO: api 요청
            getData(process.pk)
        }

    }, [list, selectPk]);


    const allCheckOnClick = useCallback((list)=>{
        let tmpPk: string[] = []
        {list.length === 0 ?
            deletePk.keys.map((v,i)=>{
                deletePk.keys.pop()
            })
            :
            list.map((v, i) => {
                tmpPk.push(v.pk)
                deletePk.keys.push(tmpPk.toString())
            })
        }
    },[deletePk])

      const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.keys.indexOf(Data.pk)
        {deletePk.keys.indexOf(Data.pk) !== -1 ?
            deletePk.keys.splice(IndexPk,1)
            :
            deletePk.keys.push(Data.pk)
        }
    },[deletePk])

    const postDelete = useCallback(async () => {
        const tempUrl = `${API_URLS['process'].delete}`
        const res = await postProcessDelete(tempUrl, deletePk)
        console.log(res)

    },[deletePk])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['process'].load}?pk=${pk}`
        const res = await getProcessList(tempUrl)

        const getprocesses = res.processes.map((v,i)=>{
            const processType = transferCodeToName('process', res.type)
            return {...v, type: processType+' '+(i+1)+'차'}
        })
        console.log(getprocesses)
        setDetailList(getprocesses)

    }, [detailList])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['process'].list+'?page='}+${page.current}`
        const res = await getProcessList(tempUrl)

        const getprocesses = res.info_list.map((v,i)=>{
            const processType = transferCodeToName('process', v.type)
            return {...v, type: processType}
        })

        setPage({ current: res.current_page, total: res.total_page })
        setList(getprocesses)

    }, [list])

    useEffect(() => {
        // getList()
        setIndex(indexList["info_list"])
        setTitleEventList(titleeventdummy)
        // setList(dummy)
        // setDetailList(detailValue)
        setSubIndex(detailTitle['processes'])
    }, [])

    useEffect(() => {
        getList()
    }, [page.current])

    return (
        <div>
            <OvertonTable
                title={'공정 리스트'}
                titleOnClickEvent={titleEventList}
                allCheckOnClickEvent={allCheckOnClick}
                allCheckbox={true}
                checkOnClickEvent={checkOnClick}
                checkBox={true}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={selectProcess+' 상세 보기'} contentTitle={subIndex} contentList={detailList}>
                            <Line />
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
            <NumberPagenation stock={page.total ? page.total : 0} selected={page.current+1} onClickEvent={(i: number) => setPage({...page, current: i})}/>
        </div>
    );
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default ProcessListContainer;
