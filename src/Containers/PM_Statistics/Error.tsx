import React, {useCallback, useEffect, useState} from 'react';
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getErrorData} from "../../Api/pm/statistics";
import Styled from "styled-components";


const ErrorContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [option, setOption] = useState(0);
    const [keyword, setKeyword] = useState<string>('');
    const [index, setIndex] = useState({pressName: '기계명'});
    const [subIndex, setSubIndex] = useState({keycamType: '키캠 상태'})
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMachine, setSelectMachine ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);


    const indexList = {
        error: {
            pressName: '기계명',
            pressNumber: '기계 번호',
            statement: '상태(에러명)',
            pressRegisterDate: '기계 등록 시간'
        }
    }

    const detailTitle = {
        error: {
            keycamType:'키캠 상태',
            loadton: '로드톤',
            slideHeight: '슬라이드 높이',
            pressErrorCode: '에러코드',
            errorTime: '시간',
            errorDate: '날짜'
        },
    }

    const onClick = useCallback(machine => {
        console.log(machine.pressPk,machine.pressName);
        if(machine.pressPk === selectPk){
            setSelectPk(null);
            setSelectMachine(null);
            setSelectValue(null);
        }else{
            setSelectPk(machine.pressPk);
            setSelectMachine(machine.pressName);
            setSelectValue(machine)
            //TODO: api 요청
            getData(machine.pressPk);
        }



    }, [list, selectPk]);

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['error'].load}?pk=${pk}`
        const res = await getErrorData(tempUrl)

        setDetailList(res.errorList)

    },[detailList])


    const getList = useCallback(async ()=>{ // useCallback
        const tempUrl = `${API_URLS['error'].list}?page=${page.current}&limit=15`
        const res = await getErrorData(tempUrl)

        setList(res.info_list)
        setPage({ current: res.current_page, total: res.total_page })
    },[list,page])

    useEffect(()=>{
        setIndex(indexList['error'])
        setSubIndex(detailTitle['error'])
        getList()
    },[])

    useEffect(()=>{
        getList()
    },[page.current])

    return (
        <OvertonTable
            title={'프레스 에러 로그'}
            indexList={index}
            valueList={list}
            currentPage={page.current}
            totalPage={page.total}
            pageOnClickEvent={(i: number) => setPage({...page, current: i}) }
            clickValue={selectValue}
            mainOnClickEvent={onClick}>
            {
                selectPk !== null ?
                    <LineTable title={selectMachine+' 상세 에러 로그'} contentTitle={subIndex} contentList={detailList}>
                        <Line/>
                    </LineTable>
                    :
                    null
            }
        </OvertonTable>
    );
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default ErrorContainer;
