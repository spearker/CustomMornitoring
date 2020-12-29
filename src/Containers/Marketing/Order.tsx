import React, {useCallback, useEffect, useState,} from 'react'
import OvertonTable from '../../Components/Table/OvertonTable'
import {API_URLS, getMarketing, postMarketing} from '../../Api/mes/marketing'
import {useHistory} from 'react-router-dom'
import {postOutsourcingDelete} from '../../Api/mes/outsourcing'
import {usePopupDispatch} from '../../Context/PopupContext'
import IcCheck from '../../Assets/Images/ic_alert_check.png'
import IcX from '../../Assets/Images/ic_alert_x.png'
import BasicColorButton from '../../Components/Button/BasicColorButton'
import Styled from 'styled-components'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Notiflix from 'notiflix'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const OrderContainer = () => {
    const [list, setList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [index, setIndex] = useState({customer_name: '거래처 명'})
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMold, setSelectMold] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const history = useHistory()

    const indexList = {
        order: {
            customer_name: '거래처 명',
            material_name: '품목명',
            amount: '계약 수량',
            shipped: '출하 수량',
            left: '미납 수량',
            date: '수주 날짜',
            finished: '진행 상태',
        }
    }

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

    const getFinish = async (pk) => {
        const tempUrl = `${API_URLS['contract'].finish}`
        const res = await postMarketing(tempUrl, {
            key: pk
        })

        getList()

    }

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/marketing/contract/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    const eventdummy = [
        {
            Name: '수정',
            buttonWidth: 60,
            Color: 'white',
            Link: (v) => history.push(`/marketing/contract/modify/${v.pk}`)
        }, {
            Name: '완료',
            buttonWidth: 60,
            Color: 'white',
            Link: (v) => {
                setSelectPk(v.pk)
                setIsOpen(true)
            }
        }
    ]

    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['contract'].delete}`
        const res = await postMarketing(tempUrl, deletePk)

        arrayDelete()

        getList()
    }, [deletePk])

    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['contract'].list}?page=${page.current}&limit=15`
        const res = await getMarketing(tempUrl)
        if (res) {
            const orderList = res.info_list.map((v) => {
                const finished = v.finished === true ? '완료' : '진행중'
                const amount = AddComma(v.amount)

                return {...v, finished: finished, amount: amount}
            })
            setList(orderList)

            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, page])

    useEffect(() => {
        getList()
        setIndex(indexList['order'])
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
    }, [])

    useEffect(() => {
        getList()
    }, [page.current])


    return (
        <div>
            <OvertonTable
                title={'수주 리스트'}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                EventList={eventList}
                allCheckOnClickEvent={allCheckOnClick}
                checkOnClickEvent={checkOnClick}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                noChildren={true}>
            </OvertonTable>
            {
                isOpen && <>
                    <WrapHoverBox onClick={() => {
                    }}/>
                    <InnerBox>
                        <div style={{
                            position: 'relative',
                            backgroundColor: '#F5F6FA',
                            textAlign: 'center',
                            width: 320,
                            maxWidth: 320,
                            padding: '0px 20px 20px 20px'
                        }}>
                            <img src={IcCheck} style={{width: 110, marginTop: 40}}/>
                            <p style={{
                                marginTop: 35,
                                fontSize: 20,
                                marginBottom: 40,
                                color: 'black'
                            }}>{'완료 후에 취소 할 수 없습니다.\n완료하시겠습니까?'}</p>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <BasicColorButton color={'#e7e9eb'} width={'45%'} name={'취소'}
                                                  onClickEvent={() => setIsOpen(false)}/>
                                <div style={{width: 12}}></div>
                                <BasicColorButton width={'45%'} name={'확인'} onClickEvent={() => {
                                    getFinish(selectPk)
                                    setIsOpen(false)
                                }}/>
                            </div>
                        </div>
                    </InnerBox>
                </>
            }
        </div>
    )
}

const WrapHoverBox = Styled.div`
    background-color: #00000090;
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 5;
`
const InnerBox = Styled.div`
    position: fixed;
    left: 50%;
    margin-left: -180px; 
    top: 50%;
    z-index: 5;
    margin-top: -200px; 
    overflow: auto;
    p{
        font-size: 14px;
    }
`


export default OrderContainer
