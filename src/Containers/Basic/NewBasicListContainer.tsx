import React, {useCallback, useEffect, useState} from 'react'
import Header from '../../Components/Text/Header'
import 'react-dropdown/style.css'
import SmallButtonLink from '../../Components/Button/SmallButtonLink'
import InfoTable from '../../Components/Table/InfoTable'
import {API_URLS, deleteBasicList, getBasicList} from '../../Api/mes/basic'
import NumberPagenation from '../../Components/Pagenation/NumberPagenation'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Pagination from '@material-ui/lab/Pagination'
import Styled from 'styled-components'
import Notiflix from 'notiflix'
import OptimizedHeaderBox from '../../Components/Box/OptimizedHeaderBox'
import {useHistory} from 'react-router-dom'
import OptimizedTable from '../../Components/Table/OptimizedTable'
import OvertonTable from "../../Components/Table/OvertonTable";


interface Props {
    type: string
    onClickRegister: () => void
}

const optionList = [
    '등록순',
]

Notiflix.Loading.Init({svgColor: '#1cb9df',})
Notiflix.Report.Init({
    Failure: {
        svgColor: '#ff5549'
    }
})

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

// 리스트 부분 컨테이너
const NewBasicListContainer = ({type, onClickRegister}: Props) => {
    const history = useHistory()
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [list, setList] = useState<any>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [option, setOption] = useState(0)
    const [keyword, setKeyword] = useState<string>('')
    // const [page, setPage] = useState<number>(0);
    const [pageType, setPageType] = useState<string>(type)

    const titleEvent = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => onClickRegister(),
        },
        // {
        //     Name: '삭제',
        //     Link: () => null
        // }
    ]

    useEffect(() => {
        setPage({...page, current: 1})
        setKeyword('')
        setList([])
        setPageType(type)
    }, [type])

    useEffect(() => {
        getList(pageType)
    }, [pageType])

    const eventdummy = [
        {
            Name: '삭제',
            Width: '180px',
            Color: 'white',
            buttonWidth: '70px',
            Link: (v) => onClickDelete(v.pk)
        },
    ]

    /**
     * getList()
     * 목록 불러오기
     */
    const getList = useCallback(async (pageType, isSearch?: boolean) => {
        Notiflix.Loading.Circle()

        const tempUrl = `${API_URLS[pageType].list}?page=${isSearch ? 1 : page.current}&keyword=${keyword}&type=${option}&limit=15`
        const resultList = await getBasicList(tempUrl)
        if (resultList) {
            const getBasic = resultList.info_list.map((v, i) => {

                const Type = transferCodeToName(pageType, v[pageType + '_type'])
                return {...v, [pageType + '_type']: Type}
            })


            if (pageType !== 'factory' && pageType !== 'material' && pageType !== 'mold' && pageType !== 'parts') {
                setList(getBasic)
            }

            setPage({current: resultList.current_page, total: resultList.total_page})
            Notiflix.Loading.Remove(300)
        }
    }, [list, keyword, option, pageType, page])

    useEffect(() => {
        setEventList(eventdummy)
        getList(pageType)
            .then(() => Notiflix.Loading.Remove(300))
        setTitleEventList(titleEvent)
    }, [page.current])

    /**
     * onClickDelete()
     * 리스트 항목 삭제
     */
    const onClickDelete = useCallback(async (id) => {

        const tempUrl = `${API_URLS[pageType].delete}`
        const result = await deleteBasicList(tempUrl, id)
        if (result) {
            getList(pageType).then(() => Notiflix.Loading.Remove(300))
        }

    }, [list, pageType])

    /**
     * getListUrl()
     * 리스트 항목 클릭했을 때 이동하는 url return
     * @returns {string} link url
     */
    const getListUrl = useCallback(() => {

        if (pageType === '') {
            return `/basic/standard/barcode/update?pk=`
        } else {
            return `/basic/${pageType}/register?pk=`
        }

    }, [pageType])


    return (
        <>
            <div style={{position: 'relative'}}>
                <OptimizedHeaderBox title={`${LIST_INDEX[type].title ?? '항목 없음'}`}
                                    searchBarChange={(e) => {
                                        if (!e.match(regExp)) setKeyword(e)
                                    }}
                                    searchBarValue={keyword}
                                    searchButtonOnClick={() => getList(pageType, true).then(() => Notiflix.Loading.Remove(300))}
                                    titleOnClickEvent={titleEventList}/>
            </div>
            {
                pageType != null &&
                <OptimizedTable widthList={LIST_INDEX[pageType].width}
                                indexList={LIST_INDEX[pageType].index}
                                valueList={list}
                                EventList={eventList}
                                mainOnClickEvent={(v) => history.push(`/basic/${pageType}/register?pk=${v.pk}`)}
                                currentPage={page.current}
                                totalPage={page.total}
                                pageOnClickEvent={(event, i) => setPage({...page, current: i})}/>
            }
            {/*{*/}
            {/*    pageType !== null &&*/}
            {/*    <InfoTable*/}
            {/*        indexList={LIST_INDEX[pageType].index}*/}
            {/*        type={type}*/}
            {/*        pkKey={'pk'}*/}
            {/*        onClickLinkUrl={getListUrl()}*/}
            {/*        contents={list}*/}
            {/*        onClickRemove={onClickDelete}/>*/}
            {/*}*/}
        </>
    )
}

export const LIST_INDEX = {
    machine: {
        title: '기계 기본정보',
        width: ['220px', '220px', '220px', '220px'],
        index: {
            machine_name: '기계명',
            machine_type: '기계종류',
            manufacturer_code: '제조번호',
            location_name: '공장명'
        }
    },
    device: {
        title: '주변장치 기본정보',
        width: ['220px', '220px', '220px', '220px'],
        index: {
            device_name: '장치명',
            device_type: '장치종류',
            manufacturer_code: '제조번호',
            location_name: '공장명',
        }
    },
    material: {
        title: '품목 기본정보',
        width: ['320px', '96px', '157px', '112px', '115px'],
        index: {
            material_name: '품목명',
            material_type: '품목 종류',
            material_code: '품번',
            location_name: '기본위치',
            safe_stock: '안전재고'
        }
    },
    mold: {
        title: '금형 기본 정보',
        width: ['184px', '184px', '184px', '184px', '184px'],
        index: {
            mold_name: '금형명',
            mold_type: '금형 종류',
            limit: '최대타수',
            current: '현재타수',
            location_name: '기본위치'
        }
    },
    factory: {
        title: '공장 기본정보',
        width: ['180px', '450px', '80px', '120px'],
        index: {
            name: '공장명',
            roadAddress: '주소',
            postcode: '우편 번호',
            detail: '상세 주소',
        }
    },
    subdivided: {
        title: '공장 세분화',
        width: ['366px', '536px'],
        index: {
            subdivided_name: '부속 공장명',
            factory_name: '공장명',
        }
    },
    parts: {
        title: '부품 기본정보',
        width: ['184px', '184px', '184px', '184px', '184px'],
        index: {
            parts_name: '부품명',
            parts_type_name: '부품 종류 명',
            location_name: '공장명',
            parts_cost: '부품원가',
            parts_stock: '재고'
        }
    },
    barcode: {
        title: '바코드 표준',
        width: ['184px', '184px', '184px', '184px', '184px'],
        index: {
            barcode_name: '이름',
            main_type: '품목(품목명)',
            detail_type: '상세 품목',
            barcode_number: '바코드 번호',
            registered: '등록 날짜'
        }
    },
}


export default NewBasicListContainer

