import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BASE_URL, BG_COLOR_SUB2, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import {getToken} from '../../Common/tokenFunctions';
import NormalTable from '../../Components/Table/NormalTable';
import 'react-dropdown/style.css'
import BasicDropdown from '../../Components/Dropdown/BasicDropdown';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {getRequest} from '../../Common/requestFunctions';


const ProductList = () => {

    const [list, setList] = useState<IProduct[]>([]);
    const [option, setOption] = useState(0);

    const optionList = [
        "등록순", "이름순", "재고순"
    ]
    const index = {
        product_name: '제품 이름',
        product_code: '제품 번호',
        molds: '사용 금형',
        product_spec: '스펙',

    }

    /**
     * getList()
     * 목록 불러오기
     * @param {string} url
     * @returns X
     */
    const getList = useCallback(async () => {

        const results = await getRequest(BASE_URL + '/api/v1/product/list/0', getToken(TOKEN_NAME))

        if (results === false) {
            ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        } else {
            if (results.status === 200) {
                setList(results.results)
            } else {
                ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
            }
        }
    }, [list])

    /**
     * onClickFilter()
     * 리스트 필터 변경
     * @param {string} filter 필터 값
     * @returns X
     */
    const onClickFilter = useCallback(async (filter: number) => {
        setOption(filter)
        ////alert(`선택 테스트 : 필터선택 - filter : ${filter}` )

        const results = await getRequest(BASE_URL + '/api/v1/product/list/' + filter, getToken(TOKEN_NAME))

        if (results === false) {
            ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
        } else {
            if (results.status === 200) {
                setList(results.results)
            } else {
                ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
            }
        }
    }, [option])

    useEffect(() => {
        getList()

    }, [])

    const onClickModify = useCallback((id) => {

        window.location.href = `/update/product?pk=${id}`

    }, [])

    return (
        <DashboardWrapContainer index={6}>
            <SubNavigation list={ROUTER_MENU_LIST[0]}/>
            <InnerBodyContainer>
                <div style={{position: 'relative'}}>
                    <Header title={'생산제품 정보 리스트'}/>
                    <div style={{position: 'absolute', display: 'inline-block', top: 0, right: 0, zIndex: 4}}>
                        <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
                    </div>
                </div>

                <NormalTable widthList={['253px', '140px', '253px', '200px']} indexList={index} keyName={'pk'}
                             buttonName='수정하기' contents={list} onClickEvent={onClickModify}/>
            </InnerBodyContainer>
        </DashboardWrapContainer>

    );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default ProductList;
