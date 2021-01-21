import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import {API_URLS, getCustomerData, postCustomerDelete} from '../../Api/mes/customer'
import {useHistory} from 'react-router-dom'
import {getRequest} from '../../Common/requestFunctions'
import {getToken} from '../../Common/tokenFunctions'
import {TOKEN_NAME} from '../../Common/configset'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import Notiflix from 'notiflix'
import OptimizedHeaderBox from "../../Components/Box/OptimizedHeaderBox";

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

const ClientContainer = () => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })

    const [list, setList] = useState<any[]>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [index, setIndex] = useState({name: '거래처 명'})
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [option, setOption] = useState<number>(0)
    const [contentsList, setContentsList] = useState<any[]>(['거래처명', '대표자명'])
    const [searchValue, setSearchValue] = useState<any>('')
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})
    const [saveKeyword, setSaveKeyword] = useState<string>('')
    const history = useHistory()

    const indexList = {
        customer: {
            name: '거래처 명',
            telephone: '전화 번호',
            fax: '팩스 번호',
            ceo_name: '대표자',
            crn: '사업자 번호',
            registered: '등록 날짜',
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
        let mySet: Set<string> = new Set<string>()

        {
            list.length === 0 ?
                arrayDelete()
                :
                list.map((v, i) => {
                    arrayDelete()

                    if (deletePk.pk.indexOf(v.pk) === -1) {
                        mySet.add(v.pk)
                    }

                    mySet.forEach((vi) => {
                        if (deletePk.pk.indexOf(v.pk) === -1) {
                            deletePk.pk.push(vi)
                        }
                    })

                    if (mySet.size < deletePk.pk.length) {
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
        setSearchValue('')
        getList(filter, true)
    }, [option, searchValue, page])

    const eventdummy = [
        {
            Name: '수정',
            buttonWidth: 60,
            Color: 'white',
            Link: (v) => history.push(`/customer/register/${v.pk}`)
        },
    ]

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/customer/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['customer'].delete}`
        const res = await postCustomerDelete(tempUrl, deletePk)

        arrayDelete()
        getList(undefined, true)
    }, [deletePk])

    const getList = useCallback(async (filter?: number, isSearch?: boolean) => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['customer'].list}?keyword=${filter !== undefined ? '' : saveKeyword}&type=${filter !== undefined ? filter + 1 : option + 1}&page=${isSearch ? 1 : page.current}&limit=15`
        const res = await getCustomerData(tempUrl)
        if (res) {
            setIsFirst(true)
            setList(res.info_list)
            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [searchValue, option, list, page, saveKeyword])


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


    useEffect(() => {
        getList()
        setIndex(indexList['customer'])
        // setList(dummy)
        // setDetailList(detaildummy)
        setTitleEventList(titleeventdummy)
        setEventList(eventdummy)
    }, [])


    return (
        <div>
            <OvertonTable
                title={'거래처 리스트'}
                titleOnClickEvent={titleEventList}
                dropDownContents={contentsList}
                dropDownOption={option}
                dropDownOnClick={optionChange}
                searchBarChange={(e) => {
                    if (!e.match(regExp)) setSearchValue(e)
                }}
                searchValue={searchValue}
                searchButtonOnClick={() => setSaveKeyword(searchValue)}
                allCheckOnClickEvent={allCheckOnClick}
                indexList={index}
                valueList={list}
                EventList={eventList}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                checkOnClickEvent={checkOnClick}
                noChildren={true}>
            </OvertonTable>
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

export default ClientContainer
