import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getOutsourcingList, postOutsourcingDelete, postOutsourcingList} from "../../Api/mes/outsourcing";
import {useHistory} from "react-router-dom";
import {getCustomerData} from "../../Api/mes/customer";
import NumberPagenation from "../../Components/Pagenation/NumberPagenation";

const ContractContainer = () => {

    const [list, setList] = useState<any[]>([]);
    /* const [detailEventList, setDetaileventList] = useState<any[]>([]) */
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailEventList, setDetaileventList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any[]>([]);
    const [contentsList, setContentsList] = useState<any[]>(['거래처명','제품명'])
    const [option, setOption] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<any>('')
    const [index, setIndex] = useState({ company_name: '외주처' });
    const [subIndex, setSubIndex] = useState({ manager: '작성자' })
    const [deletePk, setDeletePk] = useState<({pk: string[]})>({pk: []});
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectMold, setSelectMold] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const history = useHistory();

    const indexList = {
        contract: {
            company_name: '외주처 명',
            product: '제품 명',
            quantity: '수량',
            unpaid: '미납 수량',
            ceo_name: '대표자 명',
            registered: '등록 날짜',
        }
    }


    const detailTitle = {
        contract: {
            manager: '작성자',
            due_date: '납기일',
            address: '회사 주소',
            payment_condition: '대금 지급 조건',
            status: '상태',
        },
    }

    const dummy = [
        {
            name: '외주처 01',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 02',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 03',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 04',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
        {
            name: '외주처 05',
            material_name: '제품명은 길어질수도',
            quantity: '1,000,000',
            ceo_name: '김대표',
            registered: '2020.06.16',
        },
    ]

    const detaildummy = [
        {
            writer: '김담당',
            delivery_date: '2020.08.09',
            address: '회사시 회사구 회사동 123-456 A동 01',
            payment_condition: '납품 후 100일 내 잔금',
            statement: '진행중',
        },
    ]

    const arrayDelete = () => {
        while(true){
            deletePk.pk.pop()
            if(deletePk.pk.length === 0){
                break;
            }
        }
    }

    useEffect(() => {
        console.log('deletePk.pk', deletePk.pk)
    })

    const allCheckOnClick = useCallback((list)=>{
        let tmpPk: string[] = []

        {list.length === 0 ?
          arrayDelete()
            :
            list.map((v, i) => {
                arrayDelete()

                if(deletePk.pk.indexOf(v.pk) === -1){
                    tmpPk.push(v.pk)
                }

                tmpPk.map((vi, index) => {
                    if(deletePk.pk.indexOf(v.pk) === -1){
                        deletePk.pk.push(vi)
                    }
                })

                if(tmpPk.length < deletePk.pk.length){
                    deletePk.pk.shift()
                }

                console.log('deletePk.pk', deletePk.pk)
            })
        }
    },[deletePk])

    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.pk.indexOf(Data.pk)
        {deletePk.pk.indexOf(Data.pk) !== -1 ?
            deletePk.pk.splice(IndexPk,1)
            :
            deletePk.pk.push(Data.pk)
        }
    },[deletePk])

    const optionChange = useCallback(async (filter:number)=>{
        setOption(filter)
        const tempUrl = `${API_URLS['contract'].list}?keyword=${searchValue}&type=${filter}&page=${page.current}&limit=15`
        const res = await getCustomerData(tempUrl)

        setList(res.info_list)
        setPage({ current: res.current_page, total: res.total_page })
    },[option,searchValue,page])


    const searchChange = useCallback(async (search)=>{
        setSearchValue(search)

    },[searchValue])

    const searchOnClick = useCallback(async () => {

        const tempUrl = `${API_URLS['contract'].list}?keyword=${searchValue}&type=${option}&page=${page.current}&limit=15`
        const res = await getCustomerData(tempUrl)

        setList(res.info_list)
        setPage({ current: res.current_page, total: res.total_page })

    },[searchValue,option,page])

    const onClick = useCallback((mold) => {
        console.log('dsfewfewf', mold.pk, mold.mold_name);
        if (mold.pk === selectPk) {
            setSelectPk(null);
            setSelectMold(null);
            setSelectValue(null);
        } else {
            setSelectPk(mold.pk);
            setSelectMold(mold.mold_name);
            setSelectValue(mold)
            //TODO: api 요청
            getData(mold.pk)
        }

    }, [list, selectPk]);

    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white',
            Link: (v)=>history.push(`/outsourcing/contract/register/${v.pk}`)
        }
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: ()=>history.push('/outsourcing/contract/register')
        },
        {
            Name: '삭제',
            Link: ()=>postDelete()
        }
    ]

    const detaileventdummy = [
        {
            Name: '수주 완료하기',
            Width: 90,
        },
    ]

    const postDelete = useCallback(async () => {
        const tempUrl = `${API_URLS['contract'].delete}`
        const res = await postOutsourcingDelete(tempUrl, deletePk)

        getList()
    },[deletePk])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['contract'].load}?pk=${pk}`
        const res = await getOutsourcingList(tempUrl)

        setDetailList([res])

    }, [detailList])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['contract'].list}?keyword=${searchValue}&type=${option}&page=${page.current}&limit=15`
        const res = await getOutsourcingList(tempUrl)

        setList(res.info_list)

    }, [list])

    useEffect(()=>{
        getList()
    },[page.current])


    useEffect(() => {
        getList()
        setIndex(indexList["contract"])
        // setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setDetaileventList(detaileventdummy)
        setSubIndex(detailTitle['contract'])
    }, [])

    return (
        <div>
            <OvertonTable
                title={'외주처 수주 리스트'}
                titleOnClickEvent={titleEventList}
                allCheckOnClickEvent={allCheckOnClick}
                dropDownContents={contentsList}
                dropDownOption={option}
                dropDownOnClick={optionChange}
                searchBarChange={searchChange}
                searchButtonOnClick={searchOnClick}
                indexList={index}
                valueList={list}
                EventList={eventList}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(i: number) => setPage({...page, current: i}) }
                checkOnClickEvent={checkOnClick}
                clickValue={selectValue}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={'자세히 보기'} contentTitle={subIndex} contentList={detailList}>
                            <Line />
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
    bcontract-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default ContractContainer
