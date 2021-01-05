import React, {useCallback, useEffect, useState} from "react";
import Header from "../../Components/Text/Header";
import OptimizedHeaderBox from "../../Components/Box/OptimizedHeaderBox";
import FileDropdown from "./FileDropdown";
import Styled from "styled-components";
import Notiflix from 'notiflix'
import IcCheck from "../../Assets/Images/ic_alert_check.png";
import BasicColorButton from "../../Components/Button/BasicColorButton";
import {useHistory} from "react-router-dom";
import {API_URLS, excelGet, excelPost} from "../../Api/mes/basic";

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const BasicDocumentListContainer: React.FunctionComponent = () => {

    const history = useHistory()
    const [list, setList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([]);
    const [selectFolder, setSelectFolder] = useState<string>('')
    const [folderName, setFolderName] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [uploadOpen, setUploadOpen] = useState<boolean>(false)
    const [uploadFile, setUploadFile] = useState<string>('')
    const titleeventdummy = [
        {
            Name: '문서 폴더 추가',
            Width: 120,
            Link: () => setIsOpen(true)
        },
        {
            Name: '문서 업로드',
            Width: 90,
            Link: () => setUploadOpen(true)
        },
        {
            Name: '문서 로그',
            Width: 90,
            Link: () => history.push('/basic/standard/list/document/log')
        },
    ]

    const CreateDocument = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['document'].create}`
        const res = await excelPost(tempUrl, {folder_name: folderName})

        if (res) {
            setIsOpen(false)
            setFolderName('')
            getFolderList()
        }
        Notiflix.Loading.Remove()
    }, [folderName])

    const FolderDelete = useCallback(async (folder) => {
        //TODO: 성공시

        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['document'].folderDelete}`
        const res = await excelPost(tempUrl, {folder_pk: folder})

        if (res) {
            getFolderList()
        }
        Notiflix.Loading.Remove()

    }, [list])

    const getFolderList = useCallback(async () => {
        //TODO: 성공시
        setList([])

        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['document'].folderList}`
        const res = await excelGet(tempUrl)

        if (res) {
            setList(res)
        }
        Notiflix.Loading.Remove()
    }, [list])


    const File = useCallback(async (event: any) => {
        if (event.target.files[0] === undefined) {

            return
        }

        if (event.target.files[0].size > 209715200) {
            Notiflix.Report.Failure('업로드 실패', '파일 용량이 200MB 이상 입니다.', '닫기', () => window.location.reload())
            return
        }

        if (selectFolder === '') {
            alert('업로드할 폴더를 선택해주세요.')
            window.location.reload();
            return
        }

        Notiflix.Loading.Circle()

        const formData = new FormData()
        formData.append('file', event.target.files[0])

        const tempUrl = `${API_URLS['document'].upload}?folder_pk=${selectFolder}`
        const temp = await excelPost(tempUrl, formData)


        if (temp) {
            getFolderList()
            setUploadOpen(false)
            setSelectFolder('')
        }
        Notiflix.Loading.Remove()
    }, [selectFolder])

    useEffect(() => {
        setTitleEventList(titleeventdummy)
        getFolderList()
    }, [])

    return (
        <div>
            <OptimizedHeaderBox title={'표준 문서 관리'} titleOnClickEvent={titleEventList}/>
            {list.map((folder) => (
                <div style={{marginBottom: '15px'}}>
                    <FileDropdown title={folder.folder_name} pk={folder.folder_pk} clickValue={folder.folder_pk}
                                  FolderDelete={FolderDelete} FolderList={list} getFolder={() => getFolderList()}/>
                </div>
            ))}
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
                            }}>{'추가하실 폴더명을 적어주시고 \n확인을 눌러주세요.'}</p>
                            <input type={'text'} placeholder={'폴더명'}
                                   style={{width: '300px', height: '20px', fontSize: 20, marginBottom: 40,}}
                                   value={folderName ? folderName : ''} onChange={(e) => {
                                setFolderName(e.target.value)
                            }}/>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <BasicColorButton color={'#e7e9eb'} width={'45%'} name={'취소'}
                                                  onClickEvent={() => setIsOpen(false)}/>
                                <div style={{width: 12}}></div>
                                <BasicColorButton width={'45%'} name={'확인'} onClickEvent={
                                    () => {
                                        CreateDocument()
                                    }
                                }/>
                            </div>
                        </div>
                    </InnerBox>
                </>
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
                                fontSize: 18,
                                marginBottom: 20,
                                color: 'black',
                                whiteSpace: 'pre-line',
                            }}>{'폴더명을 선택해주시고 \n 파일을 업로드 해주세요. (최대 200MB)'}</p>
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
                                    list.map((v, i) => {
                                        return (
                                            <option value={v.folder_pk}
                                                    key={`${v.folder_pk}folder${i}`}>{v.folder_name}</option>
                                        )
                                    })}
                            </select>
                            <ExcelUpload>
                                <label htmlFor={'File'}>업로드</label>
                                <input type="file" name="File" id={'File'} style={{display: 'none',}}
                                       onChange={File}/>
                            </ExcelUpload>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <BasicColorButton color={'#e7e9eb'} width={'100%'} name={'취소'}
                                                  onClickEvent={() => setUploadOpen(false)}/>
                                <div style={{width: 12}}></div>
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

const ExcelUpload = Styled.button`
                                width: 82px;
                                height: 30px;
                                border-radius: 6px;
                                background-color: #717c90;
                                margin-bottom: 20px;
                                `
export default BasicDocumentListContainer
