import React, {useCallback, useEffect, useState} from 'react'
import 'react-dropdown/style.css'
import { API_URLS, loadBasicItem, registerBasicItem } from '../../Api/mes/basic'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Styled from 'styled-components'
import Notiflix from 'notiflix'
import OptimizedHeaderBox from '../../Components/Box/OptimizedHeaderBox'
import {useHistory} from 'react-router-dom'
import OptimizedTable from '../../Components/Table/OptimizedTable'
import LineTable from '../../Components/Table/LineTable'
import { SF_ENDPOINT_RESOURCE } from '../../Api/SF_endpoint'
import axios from 'axios'
import { getToken } from '../../lib/tokenFunctions'
import { TOKEN_NAME } from '../../Common/configset'

Notiflix.Loading.Init({svgColor: '#1cb9df',})
Notiflix.Report.Init({
    Failure: {
        svgColor: '#ff5549'
    }
})

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

// 리스트 부분 컨테이너
const NewBasicBarcodeContainer = () => {
    const history = useHistory()
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [list, setList] = useState<any>([])
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>('')
    const [saveKeyword, setSaveKeyword] = useState<string>('')
    const [deletePk, setDeletePk] = useState<({ pk: string[] })>({pk: []})

    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)

    const [detailList, setDetailList] = useState<{
        barcode_pk : string,
        item_pk: string,
        main_type: string,
        detail_type: string,
        barcode_number: string,
        barcode_img_url: string,
        registered: string,
        description: string | null
    }>({
        barcode_pk : '',
        item_pk: '',
        main_type: '',
        detail_type: '',
        barcode_number: '',
        barcode_img_url: '',
        registered: '',
        description: ''
    })

    const titleEvent = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/new/basic/barcode/register'),
        },
        {
            Name: '삭제',
            Width: 70,
            Link: () => postDelete(),
        }
    ]

    /**
     * getList()
     * 목록 불러오기
     */
    const getList = useCallback(async (isSearch?: boolean) => {
        Notiflix.Loading.Circle()

        const tempUrl = `${API_URLS['barcode'].list}?page=${isSearch ? 1 : page.current}&keyword=${saveKeyword}&limit=5`
        const resultList = await loadBasicItem(tempUrl)
        if (resultList) {
            const getBasic = resultList.info_list.map((v, i) => {

                const Type = transferCodeToName('barcode', v['barcode' + '_type'])
                return {...v, ['barcode' + '_type']: Type}
            })

            setList(getBasic)
            setIsFirst(true)
            setPage({current: resultList.current_page, total: resultList.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, keyword, saveKeyword, page])

    
    useEffect(() => {
        getList()
    }, [page.current])

    
    useEffect(() => {
        if (isFirst) {
            getList(true);
        }
    }, [saveKeyword])

    /**
     * onClickDelete()
     * 리스트 항목 삭제
     */
    const postDelete = useCallback(async () => {
        if (deletePk.pk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['barcode'].listDelete}`
        const res = await registerBasicItem(tempUrl, deletePk.pk)

        if(res){
            arrayDelete()
            getList()
        }
    }, [deletePk])
    

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

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['barcode'].load}?pk=${pk}`
        const res = await loadBasicItem(tempUrl)
        if (res) {
            setDetailList(res)
        }
    }, [detailList])

    const onClick = useCallback((barcode) => {
        if (barcode.pk === selectPk) {
            setSelectPk(null)
            setSelectValue(null)
        } else {
            setSelectPk(barcode.pk)
            setSelectValue(barcode)
            //TODO: api 요청
            getData(barcode.pk)
        }

    }, [list, selectPk])

    const onBarcodeDownload = useCallback(async (pk) => {
        //TODO: 성공시
        Notiflix.Loading.Circle();
        axios({
            method: 'GET',
            headers: { Authorization: getToken(TOKEN_NAME) },
            url: `http://61.101.55.224:8199/api/v1/barcode/imgDownload?pk=${pk}`,
            responseType: 'blob'
          }).then((response) => {
            let blob = new Blob([response.data], { type: 'image/png' }),
                downloadUrl = window.URL.createObjectURL(blob),
                filename = "",
                disposition = response.headers["content-disposition"];
        
            if (disposition && disposition.indexOf("attachment") !== -1) {
                let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
                    matches = filenameRegex.exec(disposition);
        
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, "");
                }
            }
        
            let a = document.createElement("a");
            if (typeof a.download === "undefined") {
                window.location.href = downloadUrl;
            } else {
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
            }
        }).catch((error) => {
            if (error && error.response && error.response.status) {
                if (error.response.status === 401) {
                  Notiflix.Report.Failure('요청 실패', '유효한 로그인이 아닙니다 다시 로그인해 주세요.', '닫기', () => window.location.href = '/login')
                } else if (error.response.status === 400) {
                  return Notiflix.Report.Failure('요청 실패', '입력한 값이 맞는지 확인해 주세요.', '닫기')
                } else if (error.response.status === 500) {
                  return Notiflix.Report.Failure('요청 실패', '서버에러입니다. 관리자에게 연락바랍니다.', '닫기')
                }
              } else {
                return Notiflix.Report.Failure('요청 실패', '알수 없는 에러입니다.', '닫기')
              }
        });
        Notiflix.Loading.Remove()
    }, [selectPk])

    return (
        <>
            <div style={{position: 'relative'}}>
                <OptimizedHeaderBox title={'바코드 표준 관리'}
                                    searchBarChange={(e) => {
                                        if (!e.match(regExp)) setKeyword(e)
                                    }}
                                    searchBarValue={keyword}
                                    searchButtonOnClick={() => setSaveKeyword(keyword)}
                                    titleOnClickEvent={titleEvent}/>
            </div>
            <OptimizedTable
                widthList={LIST_INDEX['barcode'].width}
                indexList={LIST_INDEX['barcode'].index}
                valueList={list}
                clickValue={selectValue}
                allCheckOnClickEvent={allCheckOnClick}
                checkOnClickEvent={checkOnClick}
                mainOnClickEvent={onClick}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}>
                {
                    selectPk !== null ?
                    <BlackBox>
                        <ButtonBox onClick={() => {
                            onBarcodeDownload(selectPk)
                        }}>바코드 이미지 다운로드</ButtonBox>
                        <LineTable title={'바코드 이미지'}>
                            <BarcodeContainer>
                                <BarcodeImage>
                                    {detailList.barcode_img_url === '' && detailList.barcode_img_url === undefined ?
                                        <p>바코드 이미지가 없습니다.</p>
                                        :
                                        <img src={`${SF_ENDPOINT_RESOURCE}${detailList.barcode_img_url}`}
                                             style={{width: '100%', height: '100%'}}/>
                                    }
                                </BarcodeImage>
                                <BarcodeNum>
                                    <div>
                                        <p>바코드 번호</p>
                                        <p>{detailList.barcode_number}</p>
                                    </div>
                                </BarcodeNum>
                            </BarcodeContainer>
                        </LineTable>
                    </BlackBox>
                        :
                        <BlackBox />
                }


            </OptimizedTable>
        </>
    )
}

const BarcodeContainer = Styled.div`
    padding: 10px;
    width: 96.3%;
    height: 184px;
    display: flex;
    flex-direction: row;
`

const BarcodeImage = Styled.div`
    display: flex;
    width: 370px;
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
    padding: 140px 0px 10px 10px;
    color: white;
    width: 600px;
    height: 52px;
    div {
        font-family: NotoSansCJKkr-Bold;
        display: flex;
        flex-direction: row;
        p {
            &:first-child{
                padding-right: 10px;
            }
        }
    }
`

const BlackBox = Styled.div`
    padding: 20px 20px 30px 20px;
    border-radius: 6px;
    background-color: #111319;
    margin-top: 20px;
`

const ButtonBox = Styled.button`
    float: right;
    color: white;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 188px;
    height: 30px;
`

export const LIST_INDEX = {
    barcode: {
        title: '바코드 표준',
        width: ['142px', '400px', '320px', '192px'],
        index: {
            main_type: '기준 정보 항목',
            detail_type: '세부 항목',
            barcode_number: '바코드 번호',
            registered: '등록 날짜'
        }
    },
}


export default NewBasicBarcodeContainer

