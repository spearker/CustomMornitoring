import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getMoldData,} from '../../Api/pm/statistics'
import LoadtoneBox from '../../Components/Box/LoadtoneBox'
import icCurrentValue from '../../Assets/Images/ic_current_down.png'
import Notiflix from "notiflix";

Notiflix.Loading.Init({svgColor: "#1cb9df",});

const MoldContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [index, setIndex] = useState({mold_name: '금형 명'})
    const [detailList, setDetailList] = useState<({ max_life: number, accumulate: number, mold_life: number, yesterday_count: number, percent: number })>({
        max_life: 0,
        accumulate: 0,
        mold_life: 0,
        yesterday_count: 0,
        percent: 0
    })
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)

    const indexList = {
        mold: {
            mold_name: '금형 명',
            manufacturer_name: '제조사 명',
            manufacturer_number: '제조 번호',
        }
    }

    // const dummy = [
    //     {
    //         mold_name: '금형 01',
    //         location_name: '(주)시즐',
    //         mold_number: '1234-123-1349(제조번호)',
    //     },
    //     {
    //         mold_name: '금형 02',
    //         location_name: '(주)시즐',
    //         mold_number: '1234-143-1349(제조번호)',
    //     },
    //     {
    //         mold_name: '금형 03',
    //         location_name: '(주)시즐',
    //         mold_number: '1234-153-1349(제조번호)',
    //     },
    //     {
    //         mold_name: '금형 04',
    //         location_name: '(주)시즐',
    //         mold_number: '1234-323-1349(제조번호)',
    //     },
    //     {
    //         mold_name: '금형 05',
    //         location_name: '(주)시즐',
    //         mold_number: '1234-523-1349(제조번호)',
    //     },
    // ]

    // const detaildummy = [
    //     {
    //         max_count: 50000,
    //         today_count: 1000,
    //         current_count: 38898
    //     },
    // ]

    const onClick = useCallback((mold) => {
        setDetailList({
            max_life: 0,
            accumulate: 0,
            mold_life: 0,
            yesterday_count: 0,
            percent: 0
        })
        if (mold.pk === selectPk) {
            setSelectPk(null)
            setSelectMold(null)
            setSelectValue(null)
        } else {
            setSelectPk(mold.pk)
            setSelectMold(mold.mold_name)
            setSelectValue(mold)
            //TODO: api 요청
            getData(mold.pk)
        }


    }, [list, selectPk, detailList])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['mold'].load}?pk=${pk}`
        const res = await getMoldData(tempUrl)

        setDetailList(res)

    }, [])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        console.log(page.current)
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['mold'].list}?page=${page.current}&limit=5`
        const res = await getMoldData(tempUrl)
        setList(res.info_list)

        setPage({current: res.current_page, total: res.total_page})
        Notiflix.Loading.Remove()
    }, [list, page.current])

    useEffect(() => {
        getList()
        setIndex(indexList['mold'])
        // setList(dummy)
        // setDetailList(detaildummy)

    }, [])

    useEffect(() => {
        getList()
    }, [page.current])


    return (
        <div>
            <OvertonTable
                title={'금형 타발 수'}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                        <LineTable title={selectMold}>
                            {
                                <CountingContainer>
                                    <div>
                                        <p>타수 카운팅</p>
                                    </div>
                                    <div>
                                        <MoldArrowContainer>
                                            <img src={icCurrentValue}
                                                 style={{marginLeft: detailList.percent >= 100 ? '98.8%' : detailList.percent - 1.2 + '%'}}>

                                            </img>
                                        </MoldArrowContainer>
                                        <MoldMaxBar>
                                            <div
                                                style={{width: detailList.percent >= 100 ? '100%' : detailList.percent + '%'}}>

                                            </div>
                                        </MoldMaxBar>
                                        <CountingNum>
                                            {[0, 1, 2, 3, 4, 5].map((v, i) => {

                                                const value = v *= (detailList.max_life / 5)
                                                return (
                                                    <span>{value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                                )
                                            })}
                                        </CountingNum>
                                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <span>(회)</span>
                                        </div>
                                    </div>
                                </CountingContainer>
                            }
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
            {
                selectPk !== null ?
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
                        <LoadtoneBox title={'누적 타수 카운팅'}>
                            <div style={{paddingTop: 30, paddingBottom: 22}}>
                                <BottomBox>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <p>{(detailList.accumulate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                        <p style={{marginTop: 22, paddingLeft: 7}}>회</p>
                                    </div>
                                </BottomBox>
                            </div>
                        </LoadtoneBox>
                        <LoadtoneBox title={'전일 타수 카운팅'}>
                            <div style={{paddingTop: 30, paddingBottom: 22}}>
                                <BottomBox>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <p>{(detailList.yesterday_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))}</p>
                                        <p style={{marginTop: 22, paddingLeft: 7}}>회</p>
                                    </div>
                                </BottomBox>
                            </div>
                        </LoadtoneBox>
                        <LoadtoneBox title={'남은 타수 카운팅'}>
                            <div style={{paddingTop: 30, paddingBottom: 22}}>
                                <BottomBox>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <p>{(detailList.mold_life).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                        <p style={{marginTop: 22, paddingLeft: 7}}>회</p>
                                    </div>
                                </BottomBox>
                            </div>
                        </LoadtoneBox>
                    </div>
                    :
                    null
            }
        </div>
    )
}

const CountingContainer = Styled.div`
   display: flex;
   flex-direction: row;
   margin-right: 20px;
   p {
    font-size: 14px;
      &:first-child{
      font-family: NotoSansCJKkr-Bold;
      }
   }
`
const MoldArrowContainer = Styled.div`
  margin-top: 1px;
  margin-left: 85px;
  width: 870px;
  height: 20px;
  border: 0;
  border-radius: 25px;
`

const MoldMaxBar = Styled.div`
  margin-top: 1px;
  margin-left: 85px;
  width: 870px;
  height: 20px;
  border: 0;
  border-radius: 25px;
  background-color: #1b2333;
  div {
    height: 20px;
    border: 0;
    border-radius: 25px;
    background-color: #fd6b00;
  }
`

const CountingNum = Styled.p`
   margin-left: 85px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   span {
      font-size: 14px;
   }
`

const BottomBox = Styled.div`
    display: inline-block;
    p {
        font-size: 20px;
         &:first-child{
            font-size: 40px;
            }
    }
`

export default MoldContainer
