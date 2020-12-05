import React, {useCallback, useEffect, useState} from 'react'
import DashboardWrapContainer from '../../../Containers/DashboardWrapContainer'
import 'moment/locale/ko'
import InnerBodyContainer from '../../../Containers/InnerBodyContainer'
import CustomDashboardHeader from "../../../Components/Custom/dashboard/CustomDashboardHeader";
import CustomDashboardTable from "../../../Components/Custom/dashboard/CustomDashboardTable";
import CustomDashboardTargetTable from "../../../Components/Custom/dashboard/CustomDashboardTargetTable";
import OptimizedHeaderBox from "../../../Components/Box/OptimizedHeaderBox";
import {API_URLS, getLoadTonList} from "../../../Api/pm/monitoring";
import {transferCodeToName} from "../../../Common/codeTransferFunctions";
import Notiflix from "notiflix";
import InAndOutHeader from "../../../Components/Box/InAndOutHeader";
import InAndOutTable from "../../../Components/Table/InAndOutTable";
import BlackChildrenBox from "../../../Components/Box/BlackChildrenBox";
import OptimizedTable from "../../../Components/Table/OptimizedTable";
import {getStockList} from "../../../Api/mes/manageStock";

Notiflix.Loading.Init({svgColor: "#1cb9df",});


// 대시보드 메인 페이지
const NewDashboard = () => {
    const [index, setIndex] = useState({model: '모델'})
    const [list, setList] = useState<any[]>([])
    const [page, setPage] = useState<{ current: number, total?: number }>({current: 1})
    const [achievement, setAchievement] = useState<any[]>([])
    const [selectPk, setSelectPk] = useState<any>(null);
    const [selectValue, setSelectValue] = useState<any>(null);

    const indexList = {
        production: {
            model: '모델',
            material_name: '품명',
            goal: '목표수량',
            produced: '작업수량'
        }
    }

    const onClick = useCallback((stock) => {
        if (stock.pk === selectPk) {
            setSelectPk(null);
            setSelectValue(null);
        } else {
            setSelectPk(stock.pk);
            setSelectValue(stock)
            //TODO: api 요청
            // getData(stock.pk)
        }

    }, [list, selectPk]);

    // const getData = useCallback(async (pk) => {
    //     //TODO: 성공시
    //     if (pk === null) {
    //         return
    //     }
    //     const tempUrl = `${API_URLS['stock'].loadDetail}?pk=${pk}&page=${detailPage.current}&limit=6`
    //     const res = await getStockList(tempUrl)
    //
    //     setDetailList(res.info_list)
    //
    //     setDetailPage({current: res.current_page, total: res.total_page})
    //
    // }, [detailList, detailPage])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle();
        const tempUrl = `${API_URLS['project'].list}?page=${page.current}&limit=5`
        const res = await getLoadTonList(tempUrl)
        if (res) {
            const achieve = res.info_list.map((project) => {

                return project.achievement
            })
            setAchievement(achieve)

            setList(res.info_list)

            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, page])

    useEffect(() => {
        setIndex(indexList["production"])
        getList()
    }, [])

    return (
        <DashboardWrapContainer>
            <InnerBodyContainer>
                <OptimizedHeaderBox title={'PRESS 생산 현황 모니터링'}/>
                <div style={{display: 'flex'}}>
                    <div style={{margin: '0 16px 0 0'}}>
                        <CustomDashboardTable indexList={index} valueList={list} entiretyWidth={'800px'}
                                              alignList={['left', 'left', 'right', 'right']}
                                              widthList={['152px', '378px', '178px', '178px']}
                                              mainOnClickEvent={onClick}
                                              clickValue={selectValue}
                                              currentPage={page.current}
                                              totalPage={page.total}
                                              pageOnClickEvent={(event, i) => setPage({...page, current: i})}/>
                        {selectPk !== null ?
                            <div>
                                
                            </div>
                            :
                            <BlackChildrenBox/>
                        }
                    </div>
                    <CustomDashboardTargetTable valueList={achievement}/>
                </div>
            </InnerBodyContainer>
        </DashboardWrapContainer>

    )
}

export default NewDashboard
