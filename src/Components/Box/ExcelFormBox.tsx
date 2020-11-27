import React, {useCallback, useState} from "react";
import Styled from 'styled-components'
import {uploadTempFile} from "../../Common/fileFuctuons";
import InputContainer from "../../Containers/InputContainer";
import {getRequest, postRequest} from "../../Common/requestFunctions";
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";

interface Props {
    title: string
    excelName: string
}

const ExcelFormBox: React.FunctionComponent<Props> = ({title, excelName}) => {

    const [file, setFile] = useState<any>(null)
    const [excelPk, setExcelPk] = useState<string>('')
    const [path, setPath] = useState<string | null>(null)
    const [materialList, setMaterialList] = useState<any[]>([])
    /**
     * addFile()
     * 파일 등록
     * @param {object(file)} event.target.files[0] 파일
     * @returns X
     */
    const addFile = useCallback(async (event: any): Promise<void> => {

        if (event.target.files[0] === undefined) {
            setFile(null)

            return
        }
        if (event.target.files[0].size < 10485760) { //파일 크기 10MB 이하
            setFile(event.target.files[0])
            console.log(event.target.files[0])
            const formData = new FormData()
            formData.append('file', event.target.files[0])

            const temp = await postRequest('http://192.168.0.21:7523/api/v1/format/upload?type=1', formData, getToken(TOKEN_NAME))
            if (temp === false) {

                setFile(null)

                return
            } else {
                setPath(temp)

            }

        } else {
            alert('10MB 이하의 파일만 업로드 가능합니다.')
            setFile(null)
            return
        }

    }, [file, path])


    const getList = useCallback(async () => {

        const temp = await getRequest('http://61.101.55.224:18900/api/v1/format/history/list', getToken(TOKEN_NAME))

        setMaterialList(temp.data)
    }, [materialList])


    React.useEffect(() => {
        getList()
    }, [])

    return (
        <div style={{display: 'flex'}}>
            <FormBox>
                <p>{title}</p>
                <ExcelUpload>
                    <label htmlFor={'file'}>업로드</label>
                </ExcelUpload>
                <FormDownload onClick={() => window.open('http://192.168.0.21:7523/api/v1/format/download?type=1')}>
                    양식 다운로드
                </FormDownload>
            </FormBox>
            <ExcelNameBox>
                <select className="p-limits" style={{
                    backgroundColor: '#353b48',
                    borderColor: '#353b48',
                    color: 'white'
                }} onChange={(e) => setExcelPk(e.target.value)}>
                    {
                        materialList === undefined ? <option>선택사항이 없습니다.</option> :
                            materialList.map(m => {
                                return (
                                    <option value={m.pk}>{m.file_name}</option>
                                )
                            })
                    }
                </select>
                <ExcelDownLoad
                    onClick={() => window.open(`http://61.101.55.224:18900/api/v1/format/history/download?pk=${excelPk}`)}>
                    다운로드
                </ExcelDownLoad>
                <input type="file" name="file" id={'file'} style={{display: 'none'}} onChange={addFile}/>
            </ExcelNameBox>
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
