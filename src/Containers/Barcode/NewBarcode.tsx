import React, { useCallback, useEffect, useState } from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import { API_URLS, getBarcode } from '../../Api/mes/barcode'
import { useHistory } from 'react-router-dom'
import { postProjectDelete } from '../../Api/mes/production'
import Notiflix from "notiflix";
import { SF_ENDPOINT_RESOURCE } from '../../Api/SF_endpoint'
import { loadBasicItem } from '../../Api/mes/basic'
import axios from 'axios'
import { getToken } from '../../lib/tokenFunctions'
import { TOKEN_NAME } from '../../Common/configset'

Notiflix.Loading.Init({svgColor: "#1cb9df",});

const NewBarcodeListContainer = () => {

    const [list, setList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([])
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [detailList, setDetailList] = useState<{
        barcode_img_name: string,
        barcode_img_url: string,
        barcode_number: string,
        description: string | null,
        detail_type: string,
        item_pk: string,
        lot_number: string,
        main_type: string,
        pk: string,
        registered: string
    }>({
        barcode_img_name: "",
        barcode_img_url: "",
        barcode_number: "",
        description: "",
        detail_type: "",
        item_pk: "",
        lot_number: "",
        main_type: "",
        pk: "",
        registered: ""
    })
    const [index, setIndex] = useState({main_type: '품목(품목명)'})
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)
    const [deletePk, setDeletePk] = useState<(string[])>([])
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const history = useHistory()

    const indexList = {
        barcode: {
            detail_type: '세부 항목',
            main_type: '기준 정보 항목',
            lot_number: '품번/Lot 번호',
            barcode_number: '바코드 번호',
            registered: '등록 날짜'
        }
    }

    const titleeventdummy = [
        {
            Name: '등록하기',
            Width: 90,
            Link: () => history.push('/new/barcode/register')
        },
        {
            Name: '삭제',
            Link: () => postDelete()
        }
    ]

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

    const arrayDelete = () => {
        while (true) {
            deletePk.pop()
            break
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

                    if (deletePk.indexOf(v.pk) === -1) {
                        tmpPk.push(v.pk)
                    }

                    tmpPk.map((vi, index) => {
                        if (deletePk.indexOf(v.pk) === -1) {
                            deletePk.push(vi)
                        }
                    })

                    if (tmpPk.length < deletePk.length) {
                        deletePk.shift()
                    }

                })
        }
    }, [deletePk])


    const checkOnClick = useCallback((Data) => {
        let IndexPk = deletePk.indexOf(Data.pk)
        {
            deletePk.indexOf(Data.pk) !== -1 ?
                deletePk.splice(IndexPk, 1)
                :
                deletePk.push(Data.pk)
        }
    }, [deletePk])

    const postDelete = useCallback(async () => {
        if (deletePk.length <= 0) {
            alert('삭제하실 항목을 선택해 주세요.')
            return
        }
        const tempUrl = `${API_URLS['barcode'].delete}`
        const res = await postProjectDelete(tempUrl, deletePk)

        if(res){
            arrayDelete()
            getList()
    
            setSelectPk(null)
        }
    }, [deletePk, selectPk])

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

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['barcode'].detailInfo}?pk=${pk}`
        const res = await getBarcode(tempUrl)
        if (res) {
            setDetailList(res)
        }
    }, [detailList])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle();
        const tempUrl = `${API_URLS['barcode'].list}?page=${page.current}&keyword=&limit=5`
        const res = await loadBasicItem(tempUrl)
        if (res) {
            setIsFirst(true)
            setList(res.info_list)
            setSelectPk(null)
            setPage({current: res.current_page, total: res.total_page})
            Notiflix.Loading.Remove()
        }
    }, [list, page, isFirst, selectPk])

    useEffect(() => {
        if (isFirst) {
            getList()
        }
    }, [page.current])

    useEffect(() => {
        getList()
        setIndex(indexList['barcode'])
        setTitleEventList(titleeventdummy)
    }, [])

    return (
        <div>
            <OvertonTable
                title={'바코드 현황'}
                widthList={[192, 136, 264, 256, 190]}
                allCheckOnClickEvent={allCheckOnClick}
                titleOnClickEvent={titleEventList}
                indexList={index}
                valueList={list}
                clickValue={selectValue}
                checkOnClickEvent={checkOnClick}
                currentPage={page.current}
                totalPage={page.total}
                pageOnClickEvent={(event, i) => setPage({...page, current: i})}
                mainOnClickEvent={onClick}>
                {
                    selectPk !== null ?
                    <>
                        <ButtonBox onClick={() => {
                            onBarcodeDownload(selectPk)
                        }}>바코드 이미지 다운로드</ButtonBox>
                        <LineTable title={' 바코드 이미지'}>
                            <BarcodeContainer>
                                <BarcodeImage>
                                    {detailList.barcode_img_url === '' && detailList.barcode_img_url === undefined ?
                                        <p>바코드 이미지가 없습니다.</p>
                                        :
                                        <img src={`${SF_ENDPOINT_RESOURCE}${detailList.barcode_img_url}`}
                                             style={{
                                                width: '100%', 
                                                height: '100%'}}
                                             onClick={() => window.location.href = `${SF_ENDPOINT_RESOURCE}${detailList.barcode_img_url}`}   />
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
                    </>
                    :
                    null
                }
            </OvertonTable>
        </div>
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

export default NewBarcodeListContainer
