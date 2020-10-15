import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, TOKEN_NAME} from '../../Common/configset'
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
import SmallButtonLink from '../../Components/Button/SmallButtonLink';
import SearchInputSmall from '../../Components/Input/SearchInputSmall';


const BarCodeList = () => {

  const [list, setList] = useState<IMold[]>([]);
  const [option, setOption] = useState(0);
  const [keyword, setKeyword] = useState<string>('');

  const optionList = [
    "등록순", "이름순"
  ]
  const index = {
    manufacturer:'발행사',
    product_code:'코드',
    mold_name: '이름',
    mold_label:'종류',
    mold_code:'번호',
  }

  /**
   * getSearchList()
   * 목록 검색
   * @param {string} url
   * @returns X
   */
  const getSearchList = useCallback(async (e)=>{
    e.preventDefault();

    const results = await getRequest('http://192.168.0.47:8299/api/v1/barcode/list?orderBy=' + option + '&keyword=' + keyword,getToken(TOKEN_NAME))

    if(results === false){
     ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
        setKeyword('')
      }else{
       ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list, option, keyword])

   /**
   * getList()
   * 목록 불러오기
   * @param {string} url
   * @returns X
   */
  const getList = useCallback(async ()=>{

    const results = await getRequest('http://192.168.0.47:8299/api/v1/barcode/list?orderBy=' + option + '&keyword=' + keyword,getToken(TOKEN_NAME))

    if(results === false){
     ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
       ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[list, option, keyword])

  /**
   * onClickFilter()
   * 리스트 필터 변경
   * @param {string} filter 필터 값
   * @returns X
   */
  const onClickFilter = useCallback(async (filter:number)=>{
    setOption(filter)
    ////alert(`선택 테스트 : 필터선택 - filter : ${filter}` )

    const results = await getRequest('http://192.168.0.47:8299/api/v1/barcode/list?orderBy=' + filter + '&keyword=' + keyword,getToken(TOKEN_NAME))

    if(results === false){
     ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
    }else{
      if(results.status === 200){
        setList(results.results)
      }else{
       ////alert('데이터를 불러 올 수 없습니다. 잠시후 이용하세요.')
      }
    }
  },[option, list, keyword])

  useEffect(()=>{
    getList()

  },[])
  const onClickModify = useCallback((id)=>{

    console.log('--select id : ' + id)
    window.location.href=`/update/design?pk=${id}`

  },[])

  return (
      <DashboardWrapContainer index={4}>
        <SubNavigation list={ROUTER_MENU_LIST[4]}/>
        <InnerBodyContainer>
        <div style={{position:'relative'}}>
            <Header title={`바코드 기본 정보 / 관리 (${list.length})`}/>
            <div style={{position:'absolute',display:'inline-block',top:0, right:0, zIndex:4}}>
              <SmallButtonLink name="+ 등록하기" link="/register/barcode"/>
              <BasicDropdown select={optionList[option]} contents={optionList} onClickEvent={onClickFilter}/>
            </div>
          </div>
          <SearchInputSmall
                description={'검색어 입력'}
                value={keyword}
                onChangeEvent={(e)=>{setKeyword(e.target.value)}}
                onClickEvent={getSearchList}
                />


          <NormalTable widthList={['140px', '140px','240px', '140px', '140px']} indexList={index} keyName={'pk'} buttonName='수정하기' contents={list} onClickEvent={onClickModify}/>
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


export default BarCodeList;
