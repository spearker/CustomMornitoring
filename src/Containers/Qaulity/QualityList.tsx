import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldData,} from "../../Api/pm/preservation";
import {getCustomerData} from "../../Api/mes/customer";
import QualityTableDropdown from "../../Components/Dropdown/QualityTableDropdown";


const QualityListContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [contentsList, setContentsList] = useState<any[]>(['품목명','공정명'])
    const [option, setOption] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<any>('')
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ material_name: '(품목)품목명' });
    const [subIndex, setSubIndex] = useState({ factory_name: '공정명' });
    const [checkIndex, setCheckIndex] = useState({ checker: '검사자' });
    const [checkDetail, setCheckDetail] = useState<any[]>([]);
    const [countIndex, setCountIndex] = useState({ total_count: '총 완료 개수' });
    const [countDetail, setCountDetail] = useState<any[]>([]);
    const [workerIndex, setWorkerIndex] = useState({ worker: '작업자' });
    const [workerDetail, setWorkerDetail] = useState<any[]>([]);
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    const indexList = {
        quality: {
            material_name: '품목(품목명)',
            factory_name: '공정명',
            total_count: '총 완료 개수',
            none_defective_count: '적격 개수',
            defective_count: '부적격 개수',
            state: '검수 여부'
        }
    }


    const detailTitle = {
       quality: {
           factory_name: '공정명',
           supplier_name: '납품 업체',
           date: '납기날짜',
        },
    }

    const detailTitle2 = {
        checker: {
            checker: '검사자',
            check_detail: '검사 내용',
            check_time: '검사 완료 시간',
        }
    }

    const detailTitle3 = {
        count: {
            total_count: '총 완료 개수',
            none_defective_count: '적격 개수',
            defective_count: '부적격 개수',
            state: '검수 여부'
        }
    }

    const detailTitle4 = {
        worker: {
            worker: '작업자',
            check_request: '검사 요청',
            check_request_time: '검사 요청 시간'
        }
    }

    const dummy = [
        {
            factory_name: '공정명 01',
            machine_name: '프레스 01',
            material_name: '(품목)품목명',
            request_time: '2020.00.00 00:00:00',
            status: '대기',
        },
        {
            factory_name: '공정명 02',
            machine_name: '프레스 02',
            material_name: '(품목)품목명',
            request_time: '2020.00.00 00:00:00',
            status: '완료',
        },
        {
            factory_name: '공정명 03',
            machine_name: '프레스 03',
            material_name: '(품목)품목명',
            request_time: '2020.00.00 00:00:00',
            status: '불량',
        },
        {
            factory_name: '공정명 04',
            machine_name: '프레스 04',
            material_name: '(품목)품목명',
            request_time: '2020.00.00 00:00:00',
            status: '완료',
        },
        {
            factory_name: '공정명 05',
            machine_name: '프레스 05',
            material_name: '(품목)품목명',
            request_time: '2020.00.00 00:00:00',
            status: '완료',
        },
    ]

    const detaildummy = [
        {
            factory_name: '공정 01',
            supplier_name: '(주)대한민국',
            date: '2020.08.09',
        },
    ]

    const detaildummy2 = [
        {
            checker: '김검사',
            check_detail: '검사 내용은 다음과 같습니다. 검사 내용검사 내용검사 내용검사 내용검사 내용 검사 \n' +
                '검사 내용 검사 내용 검사 내용 검사 내용 검사 내용 검사 내용 검사 내용 검사 내용\n' +
                '검사 내용 검사 내용 검사 내용 검사 내용 검사 내용 검사 내용 검사 내용 검사 내용',
            check_time: '2020.08.07 16:22:35',
        },
    ]

    const detaildummy3 = [
        {
            total_count: '9,999,999,999,999,999,999',
            none_defective_count: '9,999,999,999,999',
            defective_count: '999,999',
            state: '검수 완료'
        },
    ]

    const detaildummy4 = [
        {
            worker: '작업자',
            check_request: '검사 요청 내용은 다음과 같습니다. 검사 요청 내용 검사 요청 내용 검사 요청 내용 검사 요청 내용 \n' +
                '검사 요청 내용 검사 요청 내용 검사 요청 내용 검사 요청 내용 검사 요청 내용 검사 요청 내용 \n' +
                '검사 요청 내용 검사 요청 내용 검사 요청 내용 검사 요청 내용 검사 요청 내용 검사 요청 내용 ',
            check_request_time: '2020. 08. 07 16:22:55'
        },
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
            // getData(mold.pk)
        }
    }, [list, selectPk]);

    const optionChange = useCallback(async (filter:number)=>{
        setOption(filter)
        const tempUrl = `${API_URLS['customer'].list}?keyword=${searchValue}&type=${(filter+1)}&page=${page.current}`
        const res = await getCustomerData(tempUrl)

        setList(res.info_list)
        setPage({ current: res.current_page, total: res.total_page })
    },[option,searchValue])


    const searchChange = useCallback(async (search)=>{
        setSearchValue(search)

    },[searchValue])

    const searchOnClick = useCallback(async () => {

        const tempUrl = `${API_URLS['customer'].list}?keyword=${searchValue}&type=${(option+1)}&page=${page.current}`
        const res = await getCustomerData(tempUrl)

        setList(res.info_list)
        setPage({ current: res.current_page, total: res.total_page })

    },[searchValue,option])

    const getData = useCallback( async(pk)=>{
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    },[detailList])

    const getList = useCallback(async ()=>{ // useCallback
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].list}`
        const res = await getMoldData(tempUrl)

        setList(res)

    },[list])

    useEffect(()=>{
        // getList()
        setIndex(indexList["quality"])
        setList(dummy)
        setSubIndex(detailTitle['quality'])
        setDetailList(detaildummy)
        setCheckIndex(detailTitle2['checker'])
        setCheckDetail(detaildummy2)
        setCountIndex(detailTitle3['count'])
        setCountDetail(detaildummy3)
        setWorkerIndex(detailTitle4['worker'])
        setWorkerDetail(detaildummy4)

    },[])

    return (
        <div>
            <OvertonTable
                title={'제품 품질 현황'}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                mainOnClickEvent={onClick}
                noChildren={true}>
                {
                    selectPk !== null ?
                        <LineTable title={'제품 품질 현황 자세히 보기 : 품목명 00 _ 공정명 00 '}>
                            <QualityTableDropdown pk={'123'} clickValue={'123'} contentTitle={subIndex} contentList={detailList} widthList={['40%','45%','15%']}/>
                            <QualityTableDropdown pk={'123'} clickValue={'123'} contentTitle={checkIndex} contentList={checkDetail} widthList={['10%','75%','15%']}>
                                <div style={{marginTop: "70px",marginLeft: "10%", marginBottom: "50px"}}>
                                    <QualityTableDropdown pk={'123'} contentTitle={countIndex} contentList={countDetail} widthList={['32%','30%','19%','16%']}>

                                    </QualityTableDropdown>
                                </div>
                            </QualityTableDropdown>
                            <QualityTableDropdown pk={'123'} clickValue={'123'} contentTitle={workerIndex} contentList={workerDetail} widthList={['10%','75%','15%']}/>
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

export default QualityListContainer;
