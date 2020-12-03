import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getMemberList} from "../../Api/mes/member";
import {useHistory} from "react-router-dom"
import NumberPagenation from "../../Components/Pagenation/NumberPagenation";
import {transferCodeToName} from "../../Common/codeTransferFunctions";
import Notiflix from "notiflix";
import OptimizedHeaderBox from "../../Components/Box/OptimizedHeaderBox";
import OptimizedTable from "../../Components/Table/OptimizedTable";
import BlackChildrenBox from "../../Components/Box/BlackChildrenBox";
import InAndOutHeader from "../../Components/Box/InAndOutHeader";
import InAndOutTable from "../../Components/Table/InAndOutTable";
import moment from "moment";

Notiflix.Loading.Init({svgColor: "#1cb9df",});

const MemberListContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [detailList, setDetailList] = useState<any>();
    const [filter, setFilter] = useState(-1)
    const [type, setType] = useState(10)
    const [selectTitle, setSelectTitle] = useState<number>(0);
    const [index, setIndex] = useState({material_name: "품목(품목명)"});
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectStock, setSelectStock] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const [subIndex, setSubIndex] = useState({writer: "출처"})
    const [selectDate, setSelectDate] = useState<string>(moment().format('YYYY-MM-DD'))

    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const [detailPage, setDetailPage] = useState<PaginationInfo>({
        current: 1
    })
    const history = useHistory()

    const indexList = {
        wip: {
            material_name: "아이디",
            current_stock: "유저명",
            location_name: ["권한", '관리자', '작업자'],
        }
    }

    const detailTitle = {
        wipDetail: {
            writer: "출처",
            stock_quantity: "입고 수량",
            before_quantity: "",
            date: "입고일"
        }
    }


    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/manage/member/register')
        },
        // {
        //     Name: '수정',
        // },
        {
            Name: '삭제',
            Link: () => 'postDelete()'
        }
    ]

    const onClick = useCallback((stock) => {
        if (stock.pk === selectPk) {
            setSelectPk(null);
            setSelectStock(null);
            setSelectValue(null);
        } else {
            setSelectPk(stock.pk);
            setSelectStock(stock.item_name);
            setSelectValue(stock)
            //TODO: api 요청
            getData(stock.pk)
        }

    }, [list, selectPk]);

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        if (pk === null) {
            return
        }
        const tempUrl = `${API_URLS['stock'].loadDetail}?pk=${pk}&page=${detailPage.current}&limit=6`
        const res = await getMemberList(tempUrl)

        setDetailList(res.info_list)
        setDetailPage({current: res.current_page, total: res.total_page})

    }, [detailList, detailPage])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle();
        const tempUrl = `${API_URLS['member'].list}?keyword=&page=${page.current}&limit=15&ordered=0`
        const res = await getMemberList(tempUrl)

        setList(res)
        setPage({current: res.current_page, total: res.total_page})
        Notiflix.Loading.Remove()
    }, [list, type, filter])


    useEffect(() => {
        getList()
        setIndex(indexList["wip"])
        setTitleEventList(titleeventdummy)
        // setList(dummy)
    }, [])

    useEffect(() => {
        getList()
        setSubIndex(detailTitle['wipDetail'])
    }, [page.current])

    return (
        <div>
            <OptimizedHeaderBox title={'사용자 리스트'} searchBarChange={(e) => setKeyword(e)}
                                searchButtonOnClick={() => ''} titleOnClickEvent={titleEventList}/>
            <OptimizedTable widthList={['264px', '96px', '96px']} indexList={index}
                            valueList={list}
                            mainOnClickEvent={onClick}
                            currentPage={page.current}
                            totalPage={page.total}
                            pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                            noChildren={true}
            >
            </OptimizedTable>
        </div>
    );
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default MemberListContainer;
