import React, {useCallback, useEffect, useState} from "react";
import Styled from 'styled-components'
import IC_Dropup from "../../Assets/Images/ic_dropup_gray.png";
import IC_Dropdown from "../../Assets/Images/ic_dropdown_gray.png";
import {API_URLS, getBasicList} from "../../Api/mes/basic";
import Notiflix from 'notiflix'
import OptimizedTable from "../Table/OptimizedTable";

interface Props {
    title: string
    pk: string | null
    clickValue: string
}

const FileDropdown: React.FunctionComponent<Props> = ({title, pk, clickValue}) => {
    const [value, setValue] = useState<any>('')
    const [list, setList] = useState<any[]>([])
    const [index, setIndex] = useState({file_name: '파일 명'})
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const indexList = {
        document: {
            file_name: '파일 명',
            time: '올린 시간',
        }
    }

    const getFileList = useCallback(async () => {
        //TODO: 성공시

        if (value !== undefined && value !== null && value !== '') {
            Notiflix.Loading.Circle()
            const tempUrl = `${API_URLS['document'].fileList}?folder_pk=${value}&page=${page.current}&limit=5`
            const res = await getBasicList(tempUrl)

            if (res) {
                setList(res.info_list)
                setPage({current: res.current_page, total: res.total_page})
            }
            Notiflix.Loading.Remove()
        }
    }, [list, page, value])

    useEffect(() => {
        getFileList()
        setIndex(indexList['document'])
    }, [value])

    return (
        <div>
            <Dropdown>
                <p>{title}</p>
                <div>
                    {pk === value ?
                        <img src={IC_Dropup} style={{width: 30, height: 15, paddingRight: 20, alignSelf: "center"}}
                             onClick={() => {
                                 setValue(null)
                             }}
                        />
                        :
                        <img src={IC_Dropdown} style={{width: 30, height: 15, paddingRight: 20, alignSelf: "center"}}
                             onClick={() => {
                                 setValue(clickValue)
                             }}
                        />
                    }
                </div>
            </Dropdown>
            {pk === value &&
            <OptimizedTable widthList={['900px', '200px',]} indexList={index}
                            valueList={list}
                            currentPage={page.current}
                            totalPage={page.total}
                            pageOnClickEvent={(event, i) => setPage({...page, current: i})}
            />
            }
        </div>
    )
}

const Dropdown = Styled.div`
    width: 1080px;
    height: 50px;
    margin-bottom: 15px;
    border-radius: 6px;
    padding: 0 10px;
    background-color: #111319;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
     font-family: NotoSansCJKkr;
     font-size: 18px;
     font-weight: bold;
    }
    div{
     cursor: pointer;
     width: 30px;
    }
`


export default FileDropdown
