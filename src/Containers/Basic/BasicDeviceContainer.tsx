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

const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

// 리스트 부분 컨테이너
const BasicDeviceContainer = () => {
    const history = useHistory()
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [list, setList] = useState<any>([])
    const [eventList, setEventList] = useState<any[]>([])
    const [option, setOption] = useState(0)
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>('')
    // const [page, setPage] = useState<number>(0);

    const titleEvent = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/basic/device/register'),
        },
        // {
        //     Name: '삭제',
        //     Link: () => null
        // }
    ]


    useEffect(() => {
        getList()
        setTitleEventList(titleEvent)
        setEventList(eventdummy)
    }, [])

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
    const getList = useCallback(async (isSearch?: boolean) => {
        Notiflix.Loading.Circle()

        const tempUrl = `${API_URLS['device'].list}?page=${isSearch ? 1 : page.current}&keyword=${keyword}&type=${option}&limit=15`
        const resultList = await getBasicList(tempUrl)
        if (resultList) {
            const getBasic = resultList.info_list.map((v, i) => {

                const Type = transferCodeToName('device', v['device' + '_type'])
                return {...v, ['device' + '_type']: Type}
            })

            setList(getBasic)
            setPage({current: resultList.current_page, total: resultList.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, keyword, option, page])

    useEffect(() => {
        if (isFirst) {
            getList()
        }
    }, [page.current])

    /**
     * onClickDelete()
     * 리스트 항목 삭제
     */
    const onClickDelete = useCallback(async (id) => {

        const tempUrl = `${API_URLS['device'].delete}`
        const result = await deleteBasicList(tempUrl, id)
        if (result) {
            getList().then(() => Notiflix.Loading.Remove(300))
        }

    }, [list])


    return (
        <>
            <div style={{position: 'relative'}}>
                <OptimizedHeaderBox title={'주변장치 기본정보'}
                                    searchBarChange={(e) => {
                                        if (!e.match(regExp)) setKeyword(e)
                                    }}
                                    searchBarValue={keyword}
                                    searchButtonOnClick={() => getList(true).then(() => Notiflix.Loading.Remove(300))}
                                    titleOnClickEvent={titleEventList}/>
            </div>
            <OptimizedTable widthList={LIST_INDEX['device'].width}
                            indexList={LIST_INDEX['device'].index}
                            valueList={list}
                            EventList={eventList}
                            mainOnClickEvent={(v) => history.push(`/basic/device/register?pk=${v.pk}`)}
                            currentPage={page.current}
                            totalPage={page.total}
                            pageOnClickEvent={(event, i) => setPage({...page, current: i})}/>
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


export default BasicDeviceContainer

