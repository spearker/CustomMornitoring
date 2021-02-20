import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import {API_URLS, getOutsourcingList, postOutsourcingDelete} from '../../Api/mes/outsourcing'
import {useHistory} from 'react-router-dom'
import Notiflix from 'notiflix'
import {postMoldState} from '../../Api/mes/manageMold'
import OptimizedLineTable from '../../Components/Table/OptimizedLineTable'
import BasicColorButton from '../../Components/Button/BasicColorButton'
import IcCheck from '../../Assets/Images/ic_alert_check.png'

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

const NewOrderContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [detailEventList, setDetaileventList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any[]>([])
    const [contentsList, setContentsList] = useState<any[]>(['거래처명', '제품명'])
    const [option, setOption] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<any>('')
    const [index, setIndex] = useState({company_name: '외주처 명'})
    const [subIndex, setSubIndex] = useState({manager: '작성자'})
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectMaterial, setSelectMaterial] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [detailData, setDetailData] = useState<any>(null);
    const [saveKeyword, setSaveKeyword] = useState<string>('')
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const history = useHistory()

    const indexList = {
        order: {
            company_name: '외주처 명',
            material_name: '제품 명',
            count: '수량',
            unpaid: '미납 수량',
            ceo_name: '대표자 명',
            registered: '등록 날짜'
        }
    }

    const detailTitle = {
        order: {
            manager: '작성자',
            due_date: '납기일',
            address: '회사 주소',
            payment_condition: '대금 지급 조건',
            status: '상태',
        },
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

    const optionChange = useCallback(async (filter: number) => {
        setOption(filter)
        getList(filter, true)
        setSearchValue('')
        setSaveKeyword('')
    }, [option, searchValue, list, saveKeyword])


    const searchChange = useCallback(async (search) => {
        setSearchValue(search)

    }, [searchValue])

    const searchOnClick = useCallback(async () => {
        getList(undefined, true)

    }, [searchValue, option])

    const onClick = useCallback((mold) => {
        console.log('onClick --> ', mold)
        if (mold.status === '진행중') {
            history.push(`/new/outsourcing/order/register/${mold.pk}`)
          } else {
            Notiflix.Report.Warning('수정 할 수 없음', '완료되지 않은 발주만 수정할 수 있습니다', '확인')
          }

    }, [list, selectPk])


    const eventdummy = [
        {
            Name: '수정',
            buttonWidth: 60,
            Color: 'white',
            Link: (v) => onClick(v) 
        },
        {
            buttonWidth: 98,
            Color: 'white',
            Link: (v) => {
                if(v.status === '진행중'){
                    setSelectPk(v.pk)
                    setIsOpen(true) 
                } else {
                    Notiflix.Report.Warning('완료 할 수 없음', '이미 완료처리된 발주입니다.', '확인')
                }
            },
            Name: '완료하기',
            Text: (v) => v.status === '진행중' ? undefined : '완료됨'
        }
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/new/outsourcing/order/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    const detaileventdummy = [
        {
            Name: '완료하기',
            Width: 90,
        },
    ]

    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['order'].delete}`
        const res = await postOutsourcingDelete(tempUrl, deletePk)

        arrayDelete()
        getList(undefined, true)
    }, [deletePk])


    const getComplete = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['order'].complete2}`
        const res = await postMoldState(tempUrl, {pk: pk})

        setSelectPk(null)
        setSelectValue(null)
        getList()
    }, [selectPk, selectValue])

    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }

    const getList = useCallback(async (filter?: number, isSearch?: boolean) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['order'].list2}?keyword=${filter !== undefined ? '' : saveKeyword}&type=${filter !== undefined ? filter : option}&page=${isSearch ? 1 : page.current}&limit=15`
        const res = await getOutsourcingList(tempUrl)
        if (res) {
            const orderList = res.info_list.map((v) => {
                const finished = v.status
                const material_name = `${AddComma(v.material_info[0].material_name)}${v.material_info.length > 1 ? `외 ${v.material_info.length-1}가지` : ''}`
                const count = AddComma(v.material_info[0].count)
                const unpaid = AddComma(v.material_info[0].unpaid)
                const status = v.status

                return {...v, finished: finished, material_name: material_name, count: count, unpaid: unpaid, status: status}
            })
            setIsFirst(true)
            setList(orderList)
            setSelectPk(null)
            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, page, option, searchValue])

    useEffect(() => {
        getList()
        setIndex(indexList['order'])
        setEventList(eventdummy)
        setTitleEventList(titleeventdummy)
        setDetaileventList(detaileventdummy)
        setSubIndex(detailTitle['order'])
    }, [])

    useEffect(() => {
        if (isFirst) {
            getList()
        }
    }, [page.current])

    useEffect(() => {
        if (isFirst) {
            getList(undefined, true)
        }
    }, [saveKeyword])


    return (
        <div>
            <OvertonTable
                title={'외주처 발주 리스트'}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                EventList={eventList}
                buttonState={true}
                clickValue={selectValue}
                allCheckOnClickEvent={allCheckOnClick}
                checkOnClickEvent={checkOnClick}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                dropDownContents={contentsList}
                dropDownOption={option}
                dropDownOnClick={optionChange}
                searchBarChange={(e) => {
                    if (!e.match(regExp)) setSearchValue(e)
                }}
                searchValue={searchValue}
                searchButtonOnClick={searchOnClick}
                mainOnClickEvent={(mold)=>{
                    if (mold.pk === selectPk) {
                        setSelectPk(null)
                        setSelectMaterial(null)
                        setSelectValue(null)
                        setDetailData(null)
                    } else {
                        setSelectPk(mold.pk)
                        setSelectMaterial(mold.product)
                        setSelectValue(mold)
                        //TODO: api 요청
                        // getData(mold.pk)
                        setDetailData(mold)
                    }
                }}>
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
                                        getComplete(selectPk)
                                        setIsOpen(false)
                                    }}/>
                                </div>
                            </div>
                        </InnerBox>
                    </>
                }
                {
                    detailData !== null ?
                        <OptimizedLineTable title={`${detailData.material_name} 자세히 보기`} contentTitle={subIndex}
                                            contentList={[detailData]}
                                            widthList={['100px', '100px', '400px', '350px', '50px']}>
                            <Line/>
                        </OptimizedLineTable>
                        :
                        null
                }
            </OvertonTable>
        </div>
    )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`


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


export default NewOrderContainer
