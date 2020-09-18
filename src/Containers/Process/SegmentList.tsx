import React, {
    useEffect,
    useState,
    useContext,
    useCallback,
    ReactElement,
} from "react";
import Styled from "styled-components";
import DashboardWrapContainer from "../DashboardWrapContainer";
import SubNavigation from "../../Components/Navigation/SubNavigation";
import { ROUTER_MENU_LIST } from "../../Common/routerset";
import InnerBodyContainer from "../InnerBodyContainer";
import Header from "../../Components/Text/Header";
import ReactShadowScroll from "react-shadow-scroll";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {getRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import {API_URLS, getSegmentList, postProcessDelete, postSegmentDelete} from "../../Api/mes/process";
import {useHistory} from 'react-router-dom'
import {transferCodeToName} from "../../Common/codeTransferFunctions";


const SegmentListContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [deletePk, setDeletePk] = useState<({keys: string[]})>({keys: []});
    const [index, setIndex] = useState({ name: "공정별 세분화 명"});
    const [subIndex, setSubIndex] = useState({order: '공정 순서'})
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const history = useHistory();

    const indexList = {
        segment: {
            name: "공정별 세분화 명",
            status: "현황"
        }
    }


    const detailTitle = {
        segment: {
            order:'공정 순서',
            type: '공정 타입',
            detail_order: '상세 공정 순',
            machine_name: '기계명',
            mold_name: '사용 금형',
        },
    }

    const dummy = [
        {
            process_name: '프로세스명 01',
            material_name: '(품목)품목명',
            status: '진행중'
        },
        {
            process_name: '라인',
            material_name: '(품목)품목명',
            status: 'Off'
        },
        {
            process_name: '검수',
            material_name: '(품목)품목명',
            status: '에러'
        },
        {
            process_name: '라인',
            material_name: '(품목)품목명',
            status: '상태'
        },
        {
            process_name: '라인',
            material_name: '(품목)품목명',
            status: '상태'
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/process/detail/register')
        },
        {
            Name: '삭제',
            Link: ()=>postDelete()
        }
    ]



    const onClick = useCallback((mold) => {
        console.log('dsfewfewf',mold.pk,mold.mold_name);
        if(mold.pk === selectPk){
            setSelectPk(null);
            setSelectMold(null);
            setSelectValue(null);
        }else{
            setSelectPk(mold.pk);
            setSelectMold(mold.mold_name);
            setSelectValue(mold)
            //TODO: api 요청
            getData(mold.pk)
        }

    }, [list, selectPk]);

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

    const postDelete = useCallback(async () => {
        const tempUrl = `${API_URLS['segment'].delete}`
        const res = await postSegmentDelete(tempUrl, deletePk)
        console.log(res)

    },[deletePk])


    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['segment'].load}?pk=${pk}`
        const res = await getSegmentList(tempUrl)
        // name: "프로세스명"
        // pk: "2QQ90E_segment0"
        // processes: [{process_pk: "v1_SIZL_process_0_null_단발 공정", process_name: "단발 공정", process_type: "0",…}]
        // 0: {process_pk: "v1_SIZL_process_0_null_단발 공정", process_name: "단발 공정", process_type: "0",…}
        // machines: [{machine_type: 1, machine_names: "로드톤 프레스", mold_name: "-", machine_name: "로드톤 프레스"}]
        // order: 0
        // process_name: "단발 공정"
        // process_pk: "v1_SIZL_process_0_null_단발 공정"
        // process_type: "0"
        const getprocesses = res.processes.map((v,i)=>{
            console.log(v.process_type)
            const processType = transferCodeToName('process', Number(v.process_type))
            const machine_name = v.machines.map((v,i)=>{
                return v.machine_name
            })

            const mold_name = v.machines.map((v,i)=>{
                return v.mold_name
            })
            return {...v, order: (i+1)+'차', type: processType, detail_order: processType+' '+(i+1)+'차',machine_name: machine_name, mold_name: mold_name }
        })

        setDetailList(getprocesses)

    },[detailList])

    const getDelete = useCallback( async()=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['segment'].delete}`
        const res = await getSegmentList(tempUrl)


        setDetailList(res)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['segment'].list+'?page=1'}`
        const res = await getSegmentList(tempUrl)

        setList(res)

    },[list])

    useEffect(()=>{
        getList()
        setIndex(indexList["segment"])
        // setList(dummy)
        setTitleEventList(titleeventdummy)
        // setDetailList(detaildummy)
        setSubIndex(detailTitle['segment'])
    },[])

    return (
        <div>
            <OvertonTable
                title={'프로세스 리스트(공정별 세분화)'}
                allCheckOnClickEvent={allCheckOnClick}
                allCheckbox={true}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                checkOnClickEvent={checkOnClick}
                checkBox={true}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'상세보기'} contentTitle={subIndex} contentList={detailList} objectLine={true}>
                            <Line/>
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
        </div>
    );
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default SegmentListContainer;
