import React, {useCallback, useState} from 'react'
import Styled from 'styled-components'
import {uploadTempFile} from '../../Common/fileFuctuons'
import InputContainer from '../../Containers/InputContainer'
import {getRequest, postRequest} from '../../Common/requestFunctions'
import {getToken} from '../../Common/tokenFunctions'
import {TOKEN_NAME} from '../../Common/configset'
import {SF_ENDPOINT_EXCEL} from '../../Api/SF_endpoint'

interface Props {
  title: string[]
}

const ExcelFormBox: React.FunctionComponent<Props> = ({title,}) => {

  /**엑셀 리스트**/
  const [rawMaterial, setRawMaterialList] = useState<any[]>([])
  const [semiProduct, setSemiProduct] = useState<any[]>([])
  const [subMaterialList, setSubMaterialList] = useState<any[]>([])
  const [finishedMaterialList, setFinishedMaterialList] = useState<any[]>([])
  const [moldList, setMoldList] = useState<any[]>([])

  const [excelList, setExcelList] = useState<any[][]>([])
  /**선택 엑셀**/
  const [selectRaw, setSelectRaw] = useState<string>('')
  const [selectSemi, setSelectSemi] = useState<string>('')
  const [selectSub, setSelectSub] = useState<string>('')
  const [selectFinished, setSelectFinished] = useState<string>('')
  const [selectMold, setSelectMold] = useState<string>('')


  const rawFile = useCallback(async (event: any, index: number) => {
    if (event.target.files[0] === undefined) {

      return
    }
    const formData = new FormData()
    formData.append('file', event.target.files[0])
    const temp = await postRequest(`${SF_ENDPOINT_EXCEL}/api/v1/format/upload?type=${index}`, formData, getToken(TOKEN_NAME))
    alert('업로드 되었습니다.')
    getList(0)
  }, [])


  const getList = useCallback(async (type) => {
    if (type === 'all') {
      title.map(async (value, index) => {
        const res = await getRequest(`${SF_ENDPOINT_EXCEL}/api/v1/format/history/list?type=${index}`, getToken(TOKEN_NAME))
        const tmp = excelList

        tmp.push(res.data)
        setExcelList([...tmp])
      })
    } else {
      const res = await getRequest(`${SF_ENDPOINT_EXCEL}/api/v1/format/history/list?type=${type}`, getToken(TOKEN_NAME))
      const tmp = excelList

      tmp[type] = res.data
      setExcelList([...tmp])
    }

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
    getList('all')
  }, [])

  return (
    <div>
      {title.map((excelName, index) => {
        return (
          <div style={{display: 'flex', marginBottom: '10px'}}>
            <FormBox>
              <p>{excelName}</p>
              <ExcelUpload>
                <label htmlFor={`file-${index}`}>업로드</label>
                <input type="file" name={`file-${index}`} id={`file-${index}`} style={{display: 'none'}}
                       onChange={(e) => rawFile(e, index)}/>
              </ExcelUpload>
              <FormDownload
                onClick={() => window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/download?type=${index}`)}>
                양식 다운로드
              </FormDownload>
            </FormBox>
            <ExcelNameBox>
              {/*{index === 0 &&*/}
              <select className="p-limits" style={{
                backgroundColor: '#353b48',
                borderColor: '#353b48',
                color: 'white'
              }} onChange={(e) => selectSwitch(e.target.value, index)}>
                <option value={''}>다운받을 파일을 선택해주세요.</option>
                {
                  excelList[index] === undefined ? <option>선택사항이 없습니다.</option> :
                    excelList[index].map(m => {
                      return (
                        <option value={m.pk}>{m.file_name}</option>
                      )
                    })
                }
              </select>
              {/*}*/}
              {/*{index === 0 &&*/}
              <div style={{display: 'flex'}}>
                <ExcelDownLoad
                  onClick={() => selectRaw !== undefined && selectRaw !== '' && window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/history/download?pk=${selectRaw}`)}>
                  다운로드
                </ExcelDownLoad>
                <IntegrationExcelDownLoad
                  onClick={() => window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/combination/download?type=0`)}>
                  통합 다운로드
                </IntegrationExcelDownLoad>
              </div>
              {/*}*/}
              {/*{index === 1 &&*/}
              {/*<div style={{display: 'flex'}}>*/}
              {/*    <ExcelDownLoad*/}
              {/*        onClick={() => selectSemi !== undefined && selectSemi !== '' && window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/history/download?pk=${selectSemi}`)}>*/}
              {/*        다운로드*/}
              {/*    </ExcelDownLoad>*/}
              {/*    <IntegrationExcelDownLoad*/}
              {/*        onClick={() => window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/combination/download?type=1`)}>*/}
              {/*        통합 다운로드*/}
              {/*    </IntegrationExcelDownLoad>*/}
              {/*</div>*/}
              {/*}*/}
              {/*{index === 2 &&*/}
              {/*<div style={{display: 'flex'}}>*/}
              {/*    <ExcelDownLoad*/}
              {/*        onClick={() => selectSub !== undefined && selectSub !== '' && window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/history/download?pk=${selectSub}`)}>*/}
              {/*        다운로드*/}
              {/*    </ExcelDownLoad>*/}
              {/*    <IntegrationExcelDownLoad*/}
              {/*        onClick={() => window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/combination/download?type=2`)}>*/}
              {/*        통합 다운로드*/}
              {/*    </IntegrationExcelDownLoad>*/}
              {/*</div>*/}
              {/*}*/}
              {/*{index === 3 &&*/}
              {/*<div style={{display: 'flex'}}>*/}
              {/*    <ExcelDownLoad*/}
              {/*        onClick={() => selectFinished !== undefined && selectFinished !== '' && window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/history/download?pk=${selectFinished}`)}>*/}
              {/*        다운로드*/}
              {/*    </ExcelDownLoad>*/}
              {/*    <IntegrationExcelDownLoad*/}
              {/*        onClick={() => window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/combination/download?type=3`)}>*/}
              {/*        통합 다운로드*/}
              {/*    </IntegrationExcelDownLoad>*/}
              {/*</div>*/}
              {/*}*/}
              {/*{index === 4 &&*/}
              {/*<div style={{display: 'flex'}}>*/}
              {/*    <ExcelDownLoad*/}
              {/*        onClick={() => selectMold !== undefined && selectMold !== '' && window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/history/download?pk=${selectMold}`)}>*/}
              {/*        다운로드*/}
              {/*    </ExcelDownLoad>*/}
              {/*    <IntegrationExcelDownLoad*/}
              {/*        onClick={() => window.open(`${SF_ENDPOINT_EXCEL}/api/v1/format/combination/download?type=4`)}>*/}
              {/*        통합 다운로드*/}
              {/*    </IntegrationExcelDownLoad>*/}
              {/*</div>*/}
              {/*}*/}
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

export default ExcelFormBox

