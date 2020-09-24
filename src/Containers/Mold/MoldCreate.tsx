import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMoldData,} from "../../Api/pm/preservation";


const CreateContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [eventList, setEventList] = useState<any[]>([]);
    const [detailList,setDetailList] = useState<any[]>([]);
    const [index, setIndex] = useState({ mold_name: '금형 이름' });
    const [subIndex, setSubIndex] = useState({ part_name: '부품명' })
    const [selectPk, setSelectPk ]= useState<any>(null);
    const [selectMold, setSelectMold ]= useState<any>(null);
    const [selectValue, setSelectValue ]= useState<any>(null);

    const indexList = {
        repair: {
            mold_name: '금형 명',
            mold_barcode: '금형 바코드 번호',
            charge_name: '제작 담당자',
            registered_date: '제작 일정',
            state: '제작 현황'
        }
    }


    const detailTitle = {
        repair: {
            part_name: '부품명',
            repair_content: '수리 내용',
            repair_status: '수리 상태',
            complete_date: '완료 날짜',
        },
    }

    const dummy = [
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '완료'
        },
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '완료'
        },
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '완료'
        },
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '완료'
        },
        {
            mold_name: '금형이름00',
            mold_location: '창고01',
            charge_name: '김담당',
            registered_date: '2020.07.07',
            complete_date: '2020.08.09',
            status: '완료'
        },
    ]

    const detaildummy = [
        {
            part_name: '부품명00',
            repair_content: '부품명00에 대한 수리내용은 본 내용과 같습니다.',
            repair_status: '완료',
            complete_date: '2020.08.09'
        },
    ]


    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white'
        },
    ]

    const titleeventdummy = [
        {
            Name: '삭제',
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
            // getData(mold.pk)
        }



    }, [list, selectPk]);

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
        setIndex(indexList["repair"])
        setList(dummy)
        setDetailList(detaildummy)
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setSubIndex(detailTitle['repair'])
    },[])

    return (
        <div>
            <OvertonTable
                title={'금형 제작 현황 리스트'}
                titleOnClickEvent={titleEventList}
                allCheckbox={true}
                indexList={index}
                valueList={list}
                EventList={eventList}
                clickValue={selectValue}
                checkBox={true}
                noChildren={true}>
                {
                    selectPk !== null ?
                        <LineTable title={'수리 현황'} contentTitle={subIndex} contentList={detailList}>
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

export default CreateContainer
