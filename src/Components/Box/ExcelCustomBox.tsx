import React, {useCallback, useState} from 'react'
import Styled from 'styled-components'
import {uploadTempFile} from '../../Common/fileFuctuons'
import InputContainer from '../../Containers/InputContainer'
import {getRequest, postRequest} from '../../Common/requestFunctions'
import {getToken} from '../../Common/tokenFunctions'
import {TOKEN_NAME} from '../../Common/configset'
import {SF_ENDPOINT_EXCEL} from '../../Api/SF_endpoint'
import {API_URLS, excelGet, excelItemsGet, excelPost, getBasicList,} from '../../Api/mes/basic'
import Notiflix from "notiflix";

Notiflix.Loading.Init({svgColor: "#1cb9df",});

interface Props {
    title: string[]
}

const ExcelCustomBox: React.FunctionComponent<Props> = ({title,}) => {

    /**엑셀 리스트**/
    const [rawMaterial, setRawMaterialList] = useState<any[]>([])
    const [semiProduct, setSemiProduct] = useState<any[]>([])
    const [subMaterialList, setSubMaterialList] = useState<any[]>([])
    const [finishedMaterialList, setFinishedMaterialList] = useState<any[]>([])
    const [moldList, setMoldList] = useState<any[]>([])
    /**선택 엑셀**/
    const [selectRaw, setSelectRaw] = useState<string>('')
    const [selectSemi, setSelectSemi] = useState<string>('')
    const [selectSub, setSelectSub] = useState<string>('')
    const [selectFinished, setSelectFinished] = useState<string>('')
    const [selectMold, setSelectMold] = useState<string>('')


    const rawFile = useCallback(async (event: any) => {
        Notiflix.Loading.Circle();

        if (event.target.files[0] === undefined) {
            alert('파일을 찾을 수 없습니다. 다시 업로드해주세요.')
            return Notiflix.Loading.Remove()
        }
        const formData = new FormData()
        formData.append('file', event.target.files[0])

        const tempUrl = `${API_URLS['format'].upload}?type=10`
        const temp = await excelPost(tempUrl, formData)
        if (temp) {
            alert('업로드 되었습니다.')
            getList(10)
            window.location.reload()
        }

        Notiflix.Loading.Remove()
    }, [])


    const semiFile = useCallback(async (event: any) => {
        Notiflix.Loading.Circle();

        if (event.target.files[0] === undefined) {
            alert('파일을 찾을 수 없습니다. 다시 업로드해주세요.')
            return Notiflix.Loading.Remove()
        }
        const formData = new FormData()
        formData.append('file', event.target.files[0])

        const tempUrl = `${API_URLS['format'].upload}?type=11`
        const temp = await excelPost(tempUrl, formData)
        if (temp) {
            alert('업로드 되었습니다.')
            getList(11)
            window.location.reload()
        }

        Notiflix.Loading.Remove()
    }, [])


    const getList = useCallback(async (type) => {
        Notiflix.Loading.Circle();
        if (type === 'all') {
            title.map(async (value, index) => {
                const tempUrl = `${API_URLS['format'].history}?type=${index === 0 ? 10 : 11}`
                const temp = await excelItemsGet(tempUrl)
                if (temp) {
                    switch (index) {
                        case 0:
                            setRawMaterialList(temp.data)
                            break
                        case 1:
                            setSemiProduct(temp.data)
                            break
                        default:
                            break
                    }
                }
            })
        } else {
            const tempUrl = `${API_URLS['format'].history}?type=${type}`
            const temp = await excelItemsGet(tempUrl)

            if (temp) {
                switch (type) {
                    case 0:
                        setRawMaterialList(temp.data)
                        break
                    case 1:
                        setSemiProduct(temp.data)
                        break
                    default:
                        break
                }
            }
        }

        Notiflix.Loading.Remove()

    }, [moldList])

    const selectSwitch = useCallback((value, index) => {
        switch (index) {
            case 0:
                setSelectRaw(value)
                break
            case 1:
                setSelectSemi(value)
                break
            default:
                break
        }

    }, [])

    React.useEffect(() => {
        getList('all')
    }, [])

    return (
        <div>
            {title.map((excelName, index) => {
                return (
                    <div style={{display: 'flex', marginBottom: '10px'}}>
                        <FormBox>
                            <p>{excelName}</p>
                            {index === 0 &&
                            <ExcelUpload>
                                <label htmlFor={'file'}>업로드</label>
                                <input type="file" name="file" id={'file'} style={{display: 'none'}}
                                       onChange={rawFile}/>
                            </ExcelUpload>
                            }
                            {index === 1 &&
                            <ExcelUpload>
                                <label htmlFor={'semiFile'}>업로드</label>
                                <input type="file" name="semiFile" id={'semiFile'} style={{display: 'none'}}
                                       onChange={semiFile}/>
                            </ExcelUpload>
                            }
                        </FormBox>
                        <ExcelNameBox>
                            {index === 0 &&
                            <select className="p-limits" style={{
                                backgroundColor: '#353b48',
                                borderColor: '#353b48',
                                color: 'white'
                            }} onChange={(e) => selectSwitch(e.target.value, index)}>
                                <option value={''}>다운받을 파일을 선택해주세요.</option>
                                {
                                    rawMaterial === undefined ? <option>선택사항이 없습니다.</option> :
                                        rawMaterial.map(m => {
                                            return (
                                                <option value={m.pk}>{m.file_name}</option>
                                            )
                                        })
                                }
                            </select>}
                            {index === 1 &&
                            <select className="p-limits" style={{
                                backgroundColor: '#353b48',
                                borderColor: '#353b48',
                                color: 'white'
                            }} onChange={(e) => selectSwitch(e.target.value, index)}>
                                <option value={''}>다운받을 파일을 선택해주세요.</option>
                                {
                                    semiProduct === undefined ? <option>선택사항이 없습니다.</option> :
                                        semiProduct.map(m => {
                                            return (
                                                <option value={m.pk}>{m.file_name}</option>
                                            )
                                        })
                                }
                            </select>}
                            {index === 0 &&
                            <div style={{display: 'flex'}}>
                                < ExcelDownLoad
                                    onClick={() => selectRaw !== undefined && selectRaw !== '' && window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/history/download?pk=${selectRaw}`)}>
                                    다운로드
                                </ExcelDownLoad>
                            </div>
                            }
                            {index === 1 &&
                            <div style={{display: 'flex'}}>
                                <ExcelDownLoad
                                    onClick={() => selectSemi !== undefined && selectSemi !== '' && window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/history/download?pk=${selectSemi}`)}>
                                    다운로드
                                </ExcelDownLoad>
                            </div>
                            }
                        </ExcelNameBox>
                    </div>
                )
            })}
        </div>
    )
}

const FormBox = Styled.div`
                                color: white;
                                width: 400px;
                                height: 50px;
                                border-radius: 6px;
                                background-color: #111319;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                margin-right: 16px;
                                padding: 0 16px;
                                p{
                                text-align:left;
                                width: 240px;
                                font-family: NotoSansCJKkr;
                                font-size: 14px;
                                font-weight: bold;
                                font-stretch: normal;
                                }
                                `

const FormDownload = Styled.button`
                                color: white;
                                width: 126px;
                                height: 30px;
                                border-radius: 6px;
                                background-color: #717c90;
                                font-family: NotoSansCJKkr;
                                font-size: 15px;
                                font-weight: bold;
                                font-stretch: normal;
                                font-style: normal;
                                `

const ExcelNameBox = Styled.div`
                                width: 704px;
                                height: 50px;
                                display: flex;
                                border-radius: 6px;
                                background-color: #353b48;
                                align-items: center;
                                padding: 0 16px;
                                p{
                                text-align: left;
                                width: 578px;
                                }
                                `

const ExcelDownLoad = Styled.button`
                                width: 96px;
                                height: 30px;
                                border-radius: 6px;
                                background-color: #717c90;
                                font-family: NotoSansCJKkr;
                                font-size: 15px;
                                font-weight: bold;
                                font-stretch: normal;
                                font-style: normal;
                                `

const IntegrationExcelDownLoad = Styled.button` 
                                margin-left: 10px; 
                                width: 114px;
                                height: 30px;
                                border-radius: 6px;
                                background-color: #717c90;
                                font-family: NotoSansCJKkr;
                                font-size: 15px;
                                font-weight: bold;
                                font-stretch: normal;
                                font-style: normal;
                                `

const ExcelUpload = Styled.button`
                                width: 82px;
                                height: 30px;
                                border-radius: 6px;
                                background-color: #717c90;
                                `

export default ExcelCustomBox
