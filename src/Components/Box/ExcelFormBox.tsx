import React, {useCallback, useState} from "react";
import Styled from 'styled-components'
import {uploadTempFile} from "../../Common/fileFuctuons";
import InputContainer from "../../Containers/InputContainer";
import {getRequest, postRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";

interface Props {
    title: string[]
}

const ExcelFormBox: React.FunctionComponent<Props> = ({title,}) => {

    const [file, setFile] = useState<any>(null)
    const [path, setPath] = useState<string | null>(null)
    /**엑셀 리스트**/
    const [rawMaterial, setRawMaterialList] = useState<any[]>([])
    const [semiProduct, setSemiProduct] = useState<any[]>([])
    const [subMaterialList, setSubMaterialList] = useState<any[]>([])
    const [finishedMaterialList, setFinishedMaterialList] = useState<any[]>([])
    const [moldList, setMoldList] = useState<any[]>([])
    /**선택 엑셀**/
    const [selectRaw, setSelectRaw] = useState<any[]>([])
    const [selectSemi, setSelectSemi] = useState<any[]>([])
    const [selectSub, setSelectSub] = useState<any[]>([])
    const [selectFinished, setSelectFinished] = useState<any[]>([])
    const [selectMold, setSelectMold] = useState<any[]>([])


    /**
     * addFile()
     * 파일 등록
     * @param {object(file)} event.target.files[0] 파일
     * @returns X
     */
    const addFile = useCallback(async (event: any, index: number) => {

        if (event.target.files[0] === undefined) {
            setFile(null)
            return
        }
        setFile(event.target.files[0])
        // console.log(index)
        const formData = new FormData()
        formData.append('file', event.target.files[0])

        const temp = await postRequest(`http://192.168.0.21:7523/api/v1/format/upload?type=${index}`, formData, getToken(TOKEN_NAME))
        if (temp === false) {
            setFile(null)
            return
        } else {
            setPath(temp)
        }

    }, [file, path])

    const onChange =
        (index) =>
            (e) => {
                console.log(index)
                addFile(e, index)
            }


    const getList = useCallback(async () => {
        title.map(async (value, index) => {
            const temp = await getRequest(`http://61.101.55.224:18900/api/v1/format/history/list?type=${index}`, getToken(TOKEN_NAME))
            switch (index) {
                case 0:
                    setRawMaterialList(temp.data)
                    break
                case 1:
                    setSemiProduct(temp.data)
                    break
                case 2:
                    setSubMaterialList(temp.data)
                    break
                case 3:
                    setFinishedMaterialList(temp.data)
                    break
                case 4:
                    setMoldList(temp.data)
                    break
                default:
                    break
            }
        })

    }, [moldList])

    const selectSwitch = useCallback((value, index) => {
        switch (index) {
            case 0:
                setSelectRaw(value)
                break
            case 1:
                setSelectSemi(value)
                break
            case 2:
                setSelectSub(value)
                break
            case 3:
                setSelectFinished(value)
                break
            case 4:
                setSelectMold(value)
                break
            default:
                break
        }

    }, [])

    React.useEffect(() => {
        getList()
    }, [])

    return (
        <div>
            {title.map((excelName, index) => {
                return (
                    <div style={{display: 'flex', marginBottom: '10px'}}>
                        <FormBox>
                            <p>{excelName}</p>
                            <ExcelUpload>
                                <label htmlFor={'file'}>업로드</label>
                                <input type="file" name="file" id={'file'} style={{display: 'none'}}
                                       onChange={onChange(index)}/>
                            </ExcelUpload>
                            <FormDownload
                                onClick={() => window.open(`http://192.168.0.21:7523/api/v1/format/download?type=${index}`)}>
                                양식 다운로드
                            </FormDownload>
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
                                    subMaterialList === undefined ? <option>선택사항이 없습니다.</option> :
                                        subMaterialList.map(m => {
                                            return (
                                                <option value={m.pk}>{m.file_name}</option>
                                            )
                                        })
                                }
                            </select>}
                            {index === 2 &&
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
                            {index === 3 &&
                            <select className="p-limits" style={{
                                backgroundColor: '#353b48',
                                borderColor: '#353b48',
                                color: 'white'
                            }} onChange={(e) => selectSwitch(e.target.value, index)}>
                                <option value={''}>다운받을 파일을 선택해주세요.</option>
                                {
                                    finishedMaterialList === undefined ? <option>선택사항이 없습니다.</option> :
                                        finishedMaterialList.map(m => {
                                            return (
                                                <option value={m.pk}>{m.file_name}</option>
                                            )
                                        })
                                }
                            </select>}
                            {index === 4 &&
                            <select className="p-limits" style={{
                                backgroundColor: '#353b48',
                                borderColor: '#353b48',
                                color: 'white'
                            }} onChange={(e) => selectSwitch(e.target.value, index)}>
                                <option value={''}>다운받을 파일을 선택해주세요.</option>
                                {
                                    moldList === undefined ? <option>선택사항이 없습니다.</option> :
                                        moldList.map(m => {
                                            return (
                                                <option value={m.pk}>{m.file_name}</option>
                                            )
                                        })
                                }
                            </select>}
                            {index === 0 &&
                            <ExcelDownLoad
                                onClick={() => selectRaw !== undefined && selectRaw !== null && window.open(`http://61.101.55.224:18900/api/v1/format/history/download?pk=${selectRaw}`)}>
                                다운로드
                            </ExcelDownLoad>
                            }
                            {index === 1 &&
                            <ExcelDownLoad
                                onClick={() => selectSemi !== undefined && selectSemi !== null && window.open(`http://61.101.55.224:18900/api/v1/format/history/download?pk=${selectSemi}`)}>
                                다운로드
                            </ExcelDownLoad>
                            }
                            {index === 2 &&
                            <ExcelDownLoad
                                onClick={() => selectSub !== undefined && selectSub !== null && window.open(`http://61.101.55.224:18900/api/v1/format/history/download?pk=${selectSub}`)}>
                                다운로드
                            </ExcelDownLoad>
                            }
                            {index === 3 &&
                            <ExcelDownLoad
                                onClick={() => selectFinished !== undefined && selectFinished !== null && window.open(`http://61.101.55.224:18900/api/v1/format/history/download?pk=${selectFinished}`)}>
                                다운로드
                            </ExcelDownLoad>
                            }
                            {index === 4 &&
                            <ExcelDownLoad
                                onClick={() => selectMold !== undefined && selectMold !== null && window.open(`http://61.101.55.224:18900/api/v1/format/history/download?pk=${selectMold}`)}>
                                다운로드
                            </ExcelDownLoad>
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
   width: 120px;
   font-family: NotoSansCJKkr;
   font-size: 18px;
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

const ExcelUpload = Styled.button`
  width: 82px;
  height: 30px;
  border-radius: 6px;
  background-color: #717c90;
`

export default ExcelFormBox
