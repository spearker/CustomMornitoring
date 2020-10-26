import React, { useCallback, useEffect, useState } from 'react'
import Styled from 'styled-components'
import { getToken } from '../../Common/tokenFunctions'
import { getRequest } from '../../Common/requestFunctions'
import { useHistory } from 'react-router-dom'
import { TOKEN_NAME } from '../../Common/configset'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import * as _ from 'lodash'
import DateInput from '../../Components/Input/DateInput'
import ListHeader from '../../Components/Text/ListHeader'
import client from "../../Api/configs/basic";

const dummy = [
  { title: '이름...', type: 0, data: '', pk: 'qwdefgr' },
  { title: '이름...', type: 1, data: '', pk: 'wdqefgrt' },
  { title: '이름...', type: 1, data: '', pk: 'wqdefrgtr' },
  { title: '이름...', type: 0, data: '', pk: 'qdwefgr' },
  { title: '이름...', type: 0, data: '', pk: 'qdwefgr' },
]

interface Props {
  pk?: string | number,
  loadDataUrl?: string,
  onChangeEssential: any,
  onChangeOptional: any,
}

const DocumentFormatInputList = ({ pk, loadDataUrl, onChangeEssential, onChangeOptional }: Props) => {

  const [ essential, setEssential ] = useState<any[]>([])
  const [ optional, setOptional ] = useState<any[]>([])

  const history = useHistory()

  useEffect(() => {
    //setDocumentList(docDummy)
    //setEssential(dummy);
    //setOptional(dummy);
    if (pk === undefined) {
      getUpdateData()
    } else {
      getDocumentData()
    }

  }, [])

  const getDocumentData = useCallback(async () => {


    if (pk === null) {
      return
    }

    const res = await getRequest(`${client}/v1/document/form/load?pk=` + pk, getToken(TOKEN_NAME))
    if (res === false) {
      //TODO: 에러 처리
      // //alert('[SERVER EEROR] 문서 항목 조회가 불가능합니다. 1')
    } else {
      if (res.status === 200 || res.status === '200') {
        setEssential(res.results.essential.map((v) => {
          return ({ id: v.pk, type: v.validation1, data: '', title: v.item_name })
        }))
        setOptional(res.results.optional.map((v) => {
          return ({ id: v.pk, type: v.validation1, data: '', title: v.item_name })
        }))
        onChangeEssential(res.results.essential.map((v) => {
          return ({ id: v.pk, type: v.validation1, data: '', title: v.item_name })
        }))
        onChangeOptional(res.results.optional.map((v) => {
          return ({ id: v.pk, type: v.validation1, data: '', title: v.item_name })
        }))
      } else {
        //TODO:  기타 오류
        //alert('[STATUS EEROR] 문서 항목 조회가 불가능합니다.')
      }
    }
  }, [ essential, optional ])

  const getUpdateData = useCallback(async () => {
    ////alert(pk)

    const res = await getRequest(loadDataUrl!, getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
      // //alert('[SERVER EEROR] 문서 항목 조회가 불가능합니다. 2')
    } else {
      if (res.status === 200 || res.status === '200') {
        setEssential(res.results.essential.map((v) => {
          return ({ id: v.pk, type: v.validation1, data: v.value, title: v.item_name })
        }))
        setOptional(res.results.optional.map((v) => {
          return ({ id: v.pk, type: v.validation1, data: v.value, title: v.item_name })
        }))
        onChangeEssential(res.results.essential.map((v) => {
          return ({ id: v.pk, type: v.validation1, data: v.value, title: v.item_name })
        }))
        onChangeOptional(res.results.optional.map((v) => {
          return ({ id: v.pk, type: v.validation1, data: v.value, title: v.item_name })
        }))
      } else {
        //TODO:  기타 오류
        //alert('[STATUS EEROR] 문서 항목 조회가 불가능합니다.')
      }
    }
  }, [ essential, optional ])


  return (


      <>
        {essential.length !== 0 && <ListHeader title="문서 필수 항목"/>}
        {
          essential.map((v, i) => {
            if (v.type == 0) {
              return (
                  <NormalNumberInput title={v.title} value={v.data} description={''}
                                     onChangeEvent={(input) => {
                                       let temp = _.cloneDeep(essential)
                                       temp[i].data = input
                                       setEssential(temp)
                                       onChangeEssential(temp)
                                     }}/>
              )
            } else if (v.type == 1) {
              return (
                  <DateInput title={v.title} value={v.data} description={''} onChangeEvent={(input) => {
                    let temp = _.cloneDeep(essential)
                    temp[i].data = input
                    setEssential(temp)
                    onChangeEssential(temp)
                  }}/>
              )
            }
          })
        }
        <br/>
        {optional.length !== 0 && <ListHeader title="문서 선택 항목"/>}
        {
          optional.map((v, i) => {
            if (v.type == 0) {
              return (
                  <NormalNumberInput title={v.title} value={v.data} description={''}
                                     onChangeEvent={(input) => {
                                       let temp = _.cloneDeep(optional)
                                       temp[i].data = input
                                       setOptional(temp)
                                       onChangeOptional(temp)
                                     }}/>
              )
            } else if (v.type == 1) {
              return (
                  <DateInput title={v.title} value={v.data} description={''} onChangeEvent={(input) => {
                    let temp = _.cloneDeep(optional)
                    temp[i].data = input
                    setOptional(temp)
                    onChangeEssential(temp)
                  }}/>
              )
            }
          })
        }
      </>


  )
}
const TextNotice = Styled.p`
  font-size: 14px;
  color: gray;
  span{
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
  }
`


export default DocumentFormatInputList
