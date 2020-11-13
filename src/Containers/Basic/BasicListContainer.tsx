import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../Components/Text/Header';
import 'react-dropdown/style.css'
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import InfoTable from '../../Components/Table/InfoTable';
import {API_URLS, deleteBasicList, getBasicList} from '../../Api/mes/basic';
import NumberPagenation from '../../Components/Pagenation/NumberPagenation';
import {transferCodeToName} from "../../Common/codeTransferFunctions";
import Pagination from "@material-ui/lab/Pagination";
import Styled from "styled-components";
import Notiflix from "notiflix";


interface Props {
    type: string
}

const optionList = [
    "등록순",
]


// 리스트 부분 컨테이너
const BasicListContainer = ({type}: Props) => {
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    });

    const [list, setList] = useState<any>([]);
    const [option, setOption] = useState(0);
    const [keyword, setKeyword] = useState<string>('');
    // const [page, setPage] = useState<number>(0);
    const [pageType, setPageType] = useState<string>(type);

    useEffect(() => {
        setPageType(type)
    }, [type])

    useEffect(() => {

        setList([])
        getList(pageType)

    }, [pageType])


    /**
     * getList()
     * 목록 불러오기
     */
    const getList = useCallback(async (pageType) => {
        const tempUrl = `${API_URLS[pageType].list}?page=${page.current}&keyword=${keyword}&type=${option}&limit=15`
        const resultList = await getBasicList(tempUrl);

        const getBasic = resultList.info_list.map((v, i) => {

            const Type = transferCodeToName(pageType, v[pageType + "_type"])
            console.log(v[pageType])
            return {...v, [pageType + "_type"]: Type}
        })

        setList(getBasic);

        setPage({current: resultList.current_page, total: resultList.total_page})

    }, [list, keyword, option, pageType, page])

    useEffect(() => {
        getList(pageType)
    }, [page.current])

    /**
     * onClickDelete()
     * 리스트 항목 삭제
     */
    const onClickDelete = useCallback(async (id) => {

        const tempUrl = `${API_URLS[pageType].delete}`
        const result = await deleteBasicList(tempUrl, id);
        if (result) {
            getList(pageType)
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
                <Header title={`${LIST_INDEX[type].title ?? '항목 없음'} 관리 `}/>
                <div style={{position: 'absolute', display: 'inline-block', top: 0, right: 0, zIndex: 4}}>
                    <SmallButtonLink name="+ 등록하기" link={`/basic/${pageType}/register`}/>
                </div>
            </div>
            {
                pageType !== null &&
                <InfoTable
                    indexList={LIST_INDEX[pageType].index}
                    type={type}
                    pkKey={'pk'}
                    onClickLinkUrl={getListUrl()}
                    contents={list}
                    onClickRemove={onClickDelete}/>
            }

            <PaginationBox>
                <Pagination count={page.total ? page.total : 0} page={page.current}
                            onChange={(event, i) => setPage({...page, current: i})} color={"primary"}
                            boundaryCount={1}/>
            </PaginationBox>
        </>
    );
}

export const LIST_INDEX = {
    machine: {
        title: '기계 기본정보',
        index: {
            machine_name: '기계명',
            machine_type: '기계종류(코드)',
            manufacturer_code: '제조번호',
            location_name: '공장명'
        }
    },
    device: {
        title: '주변장치 기본정보',
        index: {
            device_name: '장치명',
            device_type: '장치종류(코드)',
            manufacturer_code: '제조번호',
            location_name: '공장명',
        }
    },
    material: {
        title: '품목 기본정보',
        index: {
            material_name: '이름',
            material_type: '카테고리(코드)',
            location_name: '공장명',
            stock: '재고'
        }
    },
    mold: {
        title: '금형 기본 정보',
        index: {
            mold_name: '금형이름',
            mold_type: '금형종류(코드)',
            limit: '최대타수',
            current: '현재타수',
            location_name: '공장명'
        }
    },
    factory: {
        title: '공장 기본정보',
        index: {
            name: '공장명',
            location: '위치',
        }
    },
    subdivided: {
        title: '공장 세분화',
        index: {
            subdivided_name: '부속 공장명',
            factory_name: '공장명',
        }
    },
    parts: {
        title: '부품 기본정보',
        index: {
            parts_name: "부품명",
            parts_type_name: "부품 종류 명",
            location_name: "공장명",
            parts_cost: "부품원가"
        }
    },
    item: {
        title: '표준 항목',
        index: {
            category: '카테고리(코드)',
            name: '이름',
        }
    },
    document: {
        title: '표준 문서',
        index: {
            category: '카테고리(코드)',
            name: '이름',
        }
    },
    barcode: {
        title: '바코드 표준',
        index: {
            barcode_name: '이름',
            main_type: '품목(품목명)',
            detail_type: '상세 품목',
            barcode_number: '바코드 번호',
            registered: '등록 날짜'
        }
    },
}


const PaginationBox = Styled.div`
    padding-top: 10pt;
    display: flex;
    justify-content: center;
    .MuiButtonBase-root {
        color: white;
    }
    .MuiPaginationItem-root{
        color: white;
    }
`

export default BasicListContainer;

