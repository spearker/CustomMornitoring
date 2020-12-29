import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getProjectList, postProjectDelete} from '../../Api/mes/production'
import VoucherDropdown from '../../Components/Dropdown/VoucherDropdown'
import {useHistory} from 'react-router-dom'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import Notiflix from 'notiflix'

const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi
Notiflix.Loading.Init({svgColor: '#1cb9df',})

interface Props {
    match: any;
    // chilren: string;
}

const VoucherContainer = ({match}: Props) => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })

    const [list, setList] = useState<any[]>([])
    const [BOMlist, setBOMList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])

    const [searchValue, setSearchValue] = useState<any>('')
    const [detailList, setDetailList] = useState<any>({})
    const [index, setIndex] = useState({registerer_name: '등록자'})
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})

    const [BOMindex, setBOMIndex] = useState({material_name: '품목(품목명)'})
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const history = useHistory()

    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }

    const indexList = {
        voucher: {
            registerer_name: '등록자',
            supplier_name: '납품 업체',
            deadline: '납기일/생산일',
            material_name: '품목(품목명)',
            goal: '생산 목표 수량',
            current_amount: '현재 생산 수량'
        }
    }


    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/project/chit/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]


    const eventdummy = [
        {
            Name: '수정',
            Width: 60,
            Color: 'white'
        },
    ]

    const BOMtitle = {
        BOM: {
            material_name: '품목(품목명)',
            production: '제품 분류',
            goal: '생산 목표 수량',
            current_amount: '현재 생산 수량',
            remain_amount: '남은 생산 수량',
            safet_stock: '안전 재고'
        }
    }

    const BOMvalue = [
        {
            material_name: '품목명',
            production: '반제품',
            goal: 'N개',
            current_amount: 'N개',
            remain_amount: 'N개',
            safet_stock: '200개'
        },
        {
            material_name: '반재품 D',
            production: '원자재',
            goal: '500개',
            current_amount: '500개',
            remain_amount: '500개',
            safet_stock: '1000개'
        }
    ]

    const searchOnClick = useCallback(async () => {
        getList(true)

    }, [searchValue, page])


    const onClick = useCallback((mold) => {
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

    }, [list, selectPk])

    const arrayDelete = () => {
        while (true) {
            deletePk.pk.pop()
            if (deletePk.pk.length === 0) {
                break
            }
        }
    }

    const allCheckOnClick = useCallback((list) => {
        let tmpPk: string[] = []

        {
            list.length === 0 ?
                arrayDelete()
                :
                list.map((v, i) => {
                    arrayDelete()

                    if (deletePk.pk.indexOf(v.pk) === -1) {
                        tmpPk.push(v.pk)
                    }

                    tmpPk.map((vi, index) => {
                        if (deletePk.pk.indexOf(v.pk) === -1) {
                            deletePk.pk.push(vi)
                        }
                    })

                    if (tmpPk.length < deletePk.pk.length) {
                        deletePk.pk.shift()
                    }

                })
        }
    }, [deletePk])

    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.pk.indexOf(Data.pk)
        {
            deletePk.pk.indexOf(Data.pk) !== -1 ?
                deletePk.pk.splice(IndexPk, 1)
                :
                deletePk.pk.push(Data.pk)
        }
    }, [deletePk])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['chit'].load}?pk=${pk}`
        const res = await getProjectList(tempUrl)
        if (res) {
            setDetailList(res)
        }
    }, [detailList])

    const getList = useCallback(async (isSearch?: boolean) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = match.params.pk !== undefined ? `${API_URLS['chit'].list}?pk=${match.params.pk}&page=${isSearch ? 1 : page.current}&limit=5&keyword=${searchValue}` : `${API_URLS['chit'].list}?pk=&page=${isSearch ? 1 : page.current}&limit=5&keyword=${searchValue}`
        const res = await getProjectList(tempUrl)
        if (res) {
            const getVoucher = res.info_list.map((v, i) => {
                const current_amount = AddComma(v.current_amount)
                const goal = AddComma(v.goal)
                return {...v, current_amount: current_amount, goal: goal}
            })


            setPage({current: res.current_page, total: res.total_page})
            setList(getVoucher)
            Notiflix.Loading.Remove()
        }
    }, [list, page, match.params.pk, searchValue])

    useEffect(() => {
        getList()
    }, [page.current])

    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['chit'].delete}`
        const res = await postProjectDelete(tempUrl, deletePk)

        arrayDelete()
        getList()

    }, [deletePk])

    useEffect(() => {
        getList()
        setIndex(indexList['voucher'])
        setBOMIndex(BOMtitle['BOM'])
        setTitleEventList(titleeventdummy)
        // setList(dummy)
        setBOMList(BOMvalue)
        setEventList(eventdummy)
        // setDetailList(detaildummy)
    }, [match.params.pk])

    return (
        <div>
            <OvertonTable
                title={'전표 리스트'}
                searchValue={searchValue}
                // searchButtonOnClick={searchOnClick}
                searchBarChange={(e) => {
                    if (!e.match(regExp)) setSearchValue(e)
                }}
                titleOnClickEvent={titleEventList}
                mainOnClickEvent={onClick}
                allCheckOnClickEvent={allCheckOnClick}
                checkOnClickEvent={checkOnClick}
                indexList={index}
                valueList={list}
                // EventList={eventList}
                // clickValue={selectValue}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                noChildren={true}
            >
                {
                    selectPk !== null ?
                        <LineTable title={`${detailList.registerer_name} / ${detailList.supplier_name} 전표 자세히 보기`}>
                            <VoucherDropdown pk={'123'} name={'전표 바코드'} clickValue={'123'}>
                                <BarcodeContainer>
                                    <BarcodeImage>
                                        {detailList.barcode_photo === null ?
                                            <p> 바코드 이미지가 없습니다.</p>
                                            :
                                            <></>
                                        }
                                    </BarcodeImage>
                                    {/*<BarcodeNum>*/}
                                    {/*    <div>*/}
                                    {/*        <p>바코드 번호</p>*/}
                                    {/*        <p>{detailList.barcode_number === null ? "" : detailList.barcode_number}</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div>*/}
                                    {/*        <p>기준 바코드</p>*/}
                                    {/*        <p>{detailList.barcode_number === null ? "" : detailList.barcode_number}</p>*/}
                                    {/*    </div>*/}
                                    {/*</BarcodeNum>*/}
                                    {/*<ButtonBox>수정</ButtonBox>*/}
                                </BarcodeContainer>
                            </VoucherDropdown>
                            {/*<VoucherDropdown pk={'124'} name={'BOM'} clickValue={'124'}>*/}
                            {/*    <div style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>*/}
                            {/*        {*/}
                            {/*            Object.keys(BOMindex).map((v, i) => {*/}
                            {/*                console.log('sfsdfdsewwefwefwefwee', BOMindex[v])*/}
                            {/*                return (*/}
                            {/*                    <p key={v} className="p-limits"*/}
                            {/*                       style={{fontFamily: 'NotoSansCJKkr-Bold'}}>{BOMindex[v]}</p>*/}
                            {/*                )*/}
                            {/*            })*/}
                            {/*        }*/}
                            {/*    </div>*/}
                            {/*    {*/}
                            {/*        BOMvalue.map((v, i) => {*/}
                            {/*            return (*/}
                            {/*                <div style={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*                    {*/}
                            {/*                        Object.keys(BOMindex).map((mv, mi) => {*/}
                            {/*                            return (*/}
                            {/*                                <p key={`p-${i}-${mv}`} className="p-limits">{v[mv]}</p>*/}
                            {/*                            )*/}
                            {/*                        })*/}
                            {/*                    }*/}
                            {/*                </div>*/}
                            {/*            )*/}
                            {/*        })*/}
                            {/*    }*/}
                            {/*</VoucherDropdown>*/}
                        </LineTable>
                        :
                        null
                }
            </OvertonTable>
        </div>
    )
}

const BarcodeContainer = Styled.div`
                                            margin-top: 10px;
                                            padding: 10px;
                                            width: 96.3%;
                                            height: 184px;
                                            display: flex;
                                            flexDirection: row;
                                            `

const BarcodeImage = Styled.div`
                                            display: flex;
                                            width: 310px;
                                            height: 182px;
                                            background-color: #ffffff;
                                            justify-content: center;
                                            align-items: center;
                                            p {
                                            color: #b3b3b3;
                                            font-family: NotoSansCJKkr-Bold;
                                            }
                                            `

const BarcodeNum = Styled.div`
                                            padding: 140px 0px 10px 40px;
                                            color: white;
                                            width: 235px;
                                            height: 52px;
                                            div {
                                            font-family: NotoSansCJKkr-Bold;
                                            display: flex;
                                            flexDirection: row;
                                            p {
                                            &:first-child{
                                            padding-right: 10px;
                                            }
                                            }
                                            }
                                            `

const ButtonBox = Styled.button`
                                            margin-left: 40%;
                                            color: white;
                                            border-radius: 5px;
                                            background-color: #717c90;
                                            border: 0;
                                            font-size: 14px;
                                            font-weight: bold;
                                            width: 68px;
                                            height: 30px;
                                            `

export default VoucherContainer
