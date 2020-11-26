import React, {useCallback, useEffect, useState} from 'react'
import {TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import {getToken} from '../../Common/tokenFunctions'
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import {getRequest, postRequest} from '../../Common/requestFunctions'
import SmallButtonLink from '../../Components/Button/SmallButtonLink'
import InfoTable from '../../Components/Table/InfoTable'
import {SF_ENDPOINT} from "../../Api/SF_endpoint";
import OptimizedHeaderBox from "../../Components/Box/OptimizedHeaderBox";

// 표준 기준  정보 리스트
const BasicStandardList = () => {

    const [list, setList] = useState<any[]>([])
    const [option, setOption] = useState(0)
    const [keyword, setKeyword] = useState<string>('')

    const optionList = [
        '등록순',
    ]

    const index = {
        pk: 'PK',
        name: '항목명',
        category: '카테고리(코드값)',
        validation1: 'validation1(코드값)',
    }

    /**
     * getList()
     * 목록 불러오기
     */
    const getList = useCallback(async () => {

        const results = await getRequest(`${SF_ENDPOINT}/api/v1/item/list`, getToken(TOKEN_NAME))


        if (results === false) {
            ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        } else {
            if (results.status === 200) {
                setList(results.results)
            } else {
                ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
            }
        }
    }, [list, keyword, option])


    useEffect(() => {
        getList()

    }, [])


    const onClickModify = useCallback((id) => {

        window.location.href = `/update/machine?pk=${id}`

    }, [])


    const onClickDelete = useCallback(async (id) => {

        const results = await postRequest(`${SF_ENDPOINT}/api/v1/item/delete`, {pk: id}, getToken(TOKEN_NAME))
        const tg = id
        //console.log('--select id : ' + id)
        if (results === false) {
            //alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
        } else {
            if (results.status === 200 || results.status === '200') {
                //alert('해당 데이터가 성공적으로 삭제되었습니다.')
                setList(list.filter(v => v.pk !== tg))
            } else {
                //alert('요청을 처리 할 수없습니다. 잠시후 다시 이용하세요.')
            }
        }


    }, [list])

    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <OptimizedHeaderBox title={`표준 항목 관리`}/>
                
                <InfoTable indexList={index} type={'machine'} pkKey={'pk'} onClickLinkUrl="/basic/standard/update?pk="
                           contents={list} onClickRemove={onClickDelete}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>

    )
}


export default BasicStandardList

