import React, {useCallback, useEffect, useState,} from "react";
import Styled from "styled-components";
import OvertonTable from "../../Components/Table/OvertonTable";
import LineTable from "../../Components/Table/LineTable";
import {API_URLS, getStockList} from "../../Api/mes/manageStock";
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

const NewWipContainer = () => {

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
            material_name: "품목(품목명)",
            current_stock: "재고량",
            location_name: "보관장소",
            safe_stock: "안전재고",
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
        const res = await getStockList(tempUrl)

        setDetailList(res.info_list)
        setDetailPage({current: res.current_page, total: res.total_page})

    }, [detailList, detailPage])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle();
        const tempUrl = `${API_URLS['stock'].list}?type=${type}&filter=${filter}&page=${page.current}&limit=5`
        const res = await getStockList(tempUrl)

        const getStock = res.info_list.map((v, i) => {
            const material_type = transferCodeToName('material', v.material_type)
            const current_stock = v.current_stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            const safe_stock = v.safe_stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            return {...v, material_type: material_type, current_stock: current_stock, safe_stock: safe_stock}
        })

        setList(getStock)
        setPage({current: res.current_page, total: res.total_page})
        Notiflix.Loading.Remove()
    }, [list, type, filter])


    useEffect(() => {
        getList()
        setIndex(indexList["wip"])
        // setList(dummy)
    }, [])

    useEffect(() => {
        getList()
        setSubIndex(detailTitle['wipDetail'])
    }, [page.current])

    return (
        <div>
            <OptimizedHeaderBox title={'재공 재고 관리'} searchBarChange={(e) => setKeyword(e)}
                                searchButtonOnClick={() => ''}/>
            <OptimizedTable widthList={['264px', '120px', '120px', '156px']} indexList={index}
                            valueList={list}
                            clickValue={selectValue}
                            mainOnClickEvent={onClick}
                            currentPage={page.current}
                            totalPage={page.total}
                            pageOnClickEvent={(event, i) => setPage({...page, current: i})}
            >
                {selectPk !== null ?
                    <div>
                        <InAndOutHeader selectDate={selectDate} setSelectDate={setSelectDate} selectIndex={selectTitle}
                                        buttonList={['입고 현황', '출고 현황']}
                                        setSelectIndex={setSelectTitle}/>
                        <InAndOutTable indexList={subIndex} valueList={detailList}
                                       widthList={['240px', '88px', '580px', '96px']}
                                       currentPage={detailPage.current}
                                       totalPage={detailPage.total}
                                       pageOnClickEvent={(event, i) => setDetailPage({...detailPage, current: i})}>
                        </InAndOutTable>
                    </div>
                    :
                    <BlackChildrenBox/>
                }
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

export default NewWipContainer;
