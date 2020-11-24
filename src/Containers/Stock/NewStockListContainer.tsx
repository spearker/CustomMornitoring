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

Notiflix.Loading.Init({svgColor: "#1cb9df",});

const NewStockListContainer = () => {

    const [list, setList] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [index, setIndex] = useState({material_name: "품목명"});
    const [BOMindex, setBOMIndex] = useState({item_name: "품목명00"});
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectStock, setSelectStock] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);
    const [subIndex, setSubIndex] = useState({writer: "작성자"})
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });
    const history = useHistory()

    const indexList = {
        stock_list: {
            material_name: "품목명",
            material_type: ["품목 종류", "원자재", "반제품", "완제품"],
            material_number: "품번",
            current_stock: "재고량",
            safe_stock: "안전재고",
            material_model: "모델",
        }
    }


    const onClick = useCallback((stock) => {
        console.log('dsfewfewf', stock.type);
        if (stock.pk === selectPk) {
            setSelectPk(null);
            setSelectStock(null);
            setSelectValue(null);
        } else {
            setSelectPk(stock.pk);
            setSelectStock(stock.item_name);
            setSelectValue(stock)
            //TODO: api 요청
            // getData(stock.pk)
        }

    }, [list, selectPk]);

    // const getData = useCallback(async (pk) => {
    //     //TODO: 성공시
    //     const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
    //     const res = await getMoldData(tempUrl)
    //
    //     setDetailList(res)
    //
    // }, [detailList])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle();
        const tempUrl = `${API_URLS['stock'].list}?type=-1&filter=-1&page=${page.current}&limit=15`
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
    }, [list, page])

    useEffect(() => {
        getList()
        setIndex(indexList["stock_list"])
        // setList(dummy)
    }, [])

    useEffect(() => {
        getList()
    }, [page.current])

    return (
        <div>
            <OptimizedHeaderBox title={'재고 현황'} searchBarChange={(e) => setKeyword(e)} searchButtonOnClick={() => ''}/>
            <OptimizedTable widthList={['264px', '96px', '160px', '120px', '120px', '156px']} indexList={index}
                            currentPage={page.current}
                            totalPage={page.total}
                            pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                            valueList={list}/>
        </div>
    );
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default NewStockListContainer;
