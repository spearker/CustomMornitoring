import React, {useCallback, useEffect, useState} from "react";
import Header from "../../Components/Text/Header";
import OptimizedHeaderBox from "../../Components/Box/OptimizedHeaderBox";
import FileDropdown from "../../Components/Dropdown/FileDropdown";
import Styled from "styled-components";
import Notiflix from 'notiflix'
import IcCheck from "../../Assets/Images/ic_alert_check.png";
import BasicColorButton from "../../Components/Button/BasicColorButton";
import {useHistory} from "react-router-dom";
import {API_URLS, getBasicList, registerBasicItem} from "../../Api/mes/basic";
import {transferCodeToName} from "../../Common/codeTransferFunctions";

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const BasicDocumentListContainer: React.FunctionComponent = () => {

    const history = useHistory()
    const [list, setList] = useState<any[]>([])
    const [titleEventList, setTitleEventList] = useState<any[]>([]);

    const [folderName, setFolderName] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const titleeventdummy = [
        {
            Name: '문서 폴더 추가',
            Width: 120,
            Link: () => setIsOpen(true)
        },
        {
            Name: '문서 업로드',
            Width: 90,
            Link: () => ''
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
        const res = await registerBasicItem(tempUrl, {folder_name: folderName})

        if (res) {
            setIsOpen(false)
        }
        Notiflix.Loading.Remove()
    }, [folderName])


    const getFolderList = useCallback(async () => {
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['document'].folderList}`
        const res = await getBasicList(tempUrl)

        if (res) {
            setList(res)
        }
        Notiflix.Loading.Remove()
    }, [list])

    useEffect(() => {
        setTitleEventList(titleeventdummy)
        getFolderList()
    }, [])

    return (
        <div>
            <OptimizedHeaderBox title={'표준 문서 관리'} titleOnClickEvent={titleEventList}/>
            {list.map((folder) => (
                <div style={{marginBottom: '15px'}}>
                    <FileDropdown title={folder.folder_name} pk={folder.folder_pk} clickValue={folder.folder_pk}/>
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
                            }}>{'추가하실 문서 폴더명을 적어주시고 \n확인을 눌러주세요.'}</p>
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

export default BasicDocumentListContainer
