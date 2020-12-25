import React, {useCallback, useEffect, useState} from "react";
import Styled from 'styled-components'
import IC_Dropup from "../../Assets/Images/ic_folder_open.png";
import IC_Dropdown from "../../Assets/Images/ic_folder_close.png";
import {API_URLS, excelPost, excelGet} from "../../Api/mes/basic";
import Notiflix from 'notiflix'
import OptimizedTable from "../../Components/Table/OptimizedTable";
import {SF_ENDPOINT_EXCEL} from "../../Api/SF_endpoint";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import BasicColorButton from "../../Components/Button/BasicColorButton";

interface Props {
    title: string
    pk: string | null
    clickValue: string
    FolderDelete: any
    FolderList: any[]
    getFolder: any
}

const FileDropdown: React.FunctionComponent<Props> = ({title, pk, clickValue, FolderDelete, FolderList, getFolder}) => {
    const [value, setValue] = useState<any>('')
    const [list, setList] = useState<any[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isFoloderOpen, setIsFolderOpen] = useState<boolean>(false)
    const [eventList, setEventList] = useState<any[]>([])
    const [uploadOpen, setUploadOpen] = useState<boolean>(false)
    const [selectFolder, setSelectFolder] = useState<string>('')
    const [selectFile, setSelectFile] = useState<{ name: string, pk: string }>({name: '', pk: ''})
    const [deleteFile, setDeleteFile] = useState<string>('')
    const [index, setIndex] = useState({file_name: '파일 명'})
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })

    const indexList = {
        document: {
            file_name: '파일명',
            time: '올린 시간',
        }
    }

    const event = [
        {
            Name: '다운로드',
            Width: '85px',
            Color: 'white',
            buttonWidth: '70px',
            Link: (v) => window.open(`${SF_ENDPOINT_EXCEL}/api/v1/document/file/download?file_pk=${v.file_pk}&token=${getToken(TOKEN_NAME)}`)
        },
        {
            Name: '파일 이동',
            Width: '85px',
            Color: 'white',
            buttonWidth: '70px',
            Link: (v) => {
                setUploadOpen(true);
                setSelectFile({name: v.file_name, pk: v.file_pk})
            }
        },
        {
            Name: '삭제',
            Width: '60px',
            Color: 'white',
            buttonWidth: '40px',
            Link: (v) => {
                setIsOpen(true);
                setDeleteFile(v.file_pk)
            }
        },
    ]

    const getFileList = useCallback(async () => {
        //TODO: 성공시

        if (value !== undefined && value !== null && value !== '') {
            Notiflix.Loading.Circle()
            const tempUrl = `${API_URLS['document'].fileList}?folder_pk=${value}&page=${page.current}&limit=5`
            const res = await excelGet(tempUrl)

            if (res) {
                setList(res.info_list)
                setPage({current: res.current_page, total: res.total_page})
            }
            Notiflix.Loading.Remove()
        }
    }, [list, page, value])

    const FileDelete = useCallback(async () => {
        //TODO: 성공시

        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['document'].fileDelete}`
        const res = await excelPost(tempUrl, {file_pk: deleteFile})

        if (res) {
            getFileList()
        }
        setIsOpen(false)
        Notiflix.Loading.Remove()

    }, [list, page, value, deleteFile])

    const FileMove = useCallback(async () => {
        //TODO: 성공시
        if (selectFolder === '') {
            alert('옮기실 폴더를 선택해주세요.')
            return
        }
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['document'].fileMove}`
        const res = await excelPost(tempUrl, {new_folder_pk: selectFolder, file_pk: selectFile.pk})

        if (res) {
            getFileList()
            getFolder()
            setUploadOpen(false)
        }
        Notiflix.Loading.Remove()

    }, [selectFolder, selectFile])

    useEffect(() => {
        getFileList()
        setEventList(event)
        setIndex(indexList['document'])
    }, [value])


    useEffect(() => {
        getFileList()
    }, [page.current])

    return (
        <div>
            <Dropdown>
                <div style={{display: 'flex'}}>
                    <div>
                        {pk === value ?
                            <img src={IC_Dropup} style={{width: 20, height: 15, marginRight: 10, alignSelf: "center"}}
                                 onClick={() => {
                                     setValue(null)
                                 }}
                            />
                            :
                            <img src={IC_Dropdown}
                                 style={{width: 20, height: 15, marginRight: 10, alignSelf: "center"}}
                                 onClick={() => {
                                     setValue(clickValue)
                                 }}
                            />
                        }
                    </div>
                    <p>{title}</p>
                </div>
                <div style={{width: '85px'}}>
                    <ButtonBox onClick={() => setIsFolderOpen(true)}
                               style={{
                                   width: '70px',
                                   color: 'white',
                                   backgroundColor: '#717c90',
                                   marginRight: '15px'
                               }}>{'폴더 삭제'}</ButtonBox>
                </div>
            </Dropdown>
            {pk === value &&
            <OptimizedTable widthList={['630px', '175px',]} indexList={index}
                            file={true}
                            noTitle={true}
                            mainOnClickEvent={(v) => Notiflix.Report.Success('파일명', `${v.file_name}`)}
                            valueList={list}
                            EventList={eventList}
                            currentPage={page.current}
                            totalPage={page.total}
                            pageOnClickEvent={(event, i) => setPage({...page, current: i})}
            />
            }
            {
                uploadOpen && <>
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
                            <p style={{
                                marginTop: 35,
                                fontSize: 20,
                                marginBottom: 20,
                                color: 'black',
                                whiteSpace: 'pre-line',
                            }}>{'옮기실 폴더를 선택해주시고 \n  확인을 눌러주세요.'}</p>
                            <select style={{
                                width: '300px',
                                height: '28px',
                                borderRadius: 5,
                                backgroundColor: '#353b48',
                                color: '#ffffff',
                                marginBottom: 20,
                                paddingLeft: 10,
                            }} onChange={(e) => setSelectFolder(e.target.value)}>
                                <option value={''}
                                        key={`folder`}>폴더를 선택해주세요.
                                </option>
                                {
                                    FolderList.map((v, i) => {
                                        return (
                                            <option value={v.folder_pk}
                                                    key={`${v.folder_pk}folder${i}`}>{v.folder_name}</option>
                                        )
                                    })}
                            </select>
                            <input type={'text'} placeholder={'파일명'} disabled
                                   style={{width: '300px', height: '20px', fontSize: 20, marginBottom: 40,}}
                                   value={selectFile.name}/>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <BasicColorButton color={'#e7e9eb'} width={'55%'} name={'취소'}
                                                  onClickEvent={() => setUploadOpen(false)}/>
                                <div style={{width: 12}}></div>
                                <BasicColorButton width={'45%'} name={'확인'} onClickEvent={
                                    () => {
                                        FileMove()
                                    }
                                }/>
                            </div>
                        </div>
                    </InnerBox>
                </>
            }
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
                            <p style={{
                                marginTop: 35,
                                fontSize: 20,
                                marginBottom: 20,
                                color: 'black',
                                whiteSpace: 'pre-line',
                            }}>{'파일을 정말로 삭제하시겠습니까?'}</p>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <BasicColorButton color={'#e7e9eb'} width={'45%'} name={'취소'}
                                                  onClickEvent={() => setIsOpen(false)}/>
                                <div style={{width: 12}}></div>
                                <BasicColorButton width={'45%'} name={'확인'} onClickEvent={
                                    () => {
                                        FileDelete()
                                    }
                                }/>
                            </div>
                        </div>
                    </InnerBox>
                </>
            }
            {
                isFoloderOpen && <>
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
                            <p style={{
                                marginTop: 35,
                                fontSize: 20,
                                marginBottom: 20,
                                color: 'black',
                                whiteSpace: 'pre-line',
                            }}>{'폴더를 정말로 삭제하시겠습니까?'}</p>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <BasicColorButton color={'#e7e9eb'} width={'45%'} name={'취소'}
                                                  onClickEvent={() => setIsFolderOpen(false)}/>
                                <div style={{width: 12}}></div>
                                <BasicColorButton width={'45%'} name={'확인'} onClickEvent={
                                    () => {
                                        FolderDelete(pk)
                                    }
                                }/>
                            </div>
                        </div>
                    </InnerBox>
                </>
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
    background-color: #0f1722;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
     font-family: NotoSansCJKkr;
     font-size: 18px;
     font-weight: bold;
    }
   
`

const ButtonBox = Styled.button`
    color: black;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 112px;
    height: 30px;
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

const ExcelUpload = Styled.button`
                                width: 82px;
                                height: 30px;
                                border-radius: 6px;
                                background-color: #717c90;
                                margin-bottom: 20px;
                                `


export default FileDropdown
