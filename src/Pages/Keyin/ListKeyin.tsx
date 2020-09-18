import React, {useState} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import TEMP_IMG_1 from '../../Assets/Dummy/keyin_list_1.svg'

import {useHistory} from 'react-router-dom';
import SubNavigation2 from '../../Components/Navigation/SubNavigation2';
import SearchInputSmall from '../../Components/Input/SearchInputSmall';

// 키인 리스트
const ListKeyin = ({ match }) => {

  const [list, setList] = useState<IMonitoringList[]>([]);
  const history = useHistory();
  const [keyword, setKeyword]= useState<string>('');
  const { id } = match.params;

  return (
      <DashboardWrapContainer index={10}>
        <SubNavigation2 list={[
           { name : '프레스 Key-in', url : '/keyin/list/프레스'},
        { name : '프레스 Key-in', url : '/keyin/list/프레스'},
        { name : '금형 Key-in', url : '/keyin/list/금형'},
        { name : '용접기 Key-in', url : '/keyin/list/용접기'},
        { name : '밀링 Key-in', url : '/keyin/list/밀링'},
        { name : '선반 Key-in', url : '/keyin/list/선반'},
        { name : 'tab Key-in', url : '/keyin/list/탭'},
        { name : '자재 Key-in', url : '/keyin/list/자재'},

      ]} key={String(id)}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
              <Header title={ id + ' Key-in 리스트'}/>
              <div style={{position:'absolute',display:'inline-block',top:0, right:0}}>
              <SearchInputSmall
                description={'검색어 입력'}
                value={keyword}
                onChangeEvent={(e)=>{setKeyword(e.target.value)}}
                onClickEvent={()=>{}}
                />
              </div>
          </div>

          <WrapBox>
            {
              id === '프레스' ?
              <>
              <img src={TEMP_IMG_1} />

              </>
              :
              null
            }
          </WrapBox>

        </InnerBodyContainer>

      </DashboardWrapContainer>

  );
}

const WrapBox = Styled.div`
    text-align: left;
    margin-top: 24px;
    position: relative;
    display: block;
    margin-bottom: 2px;
    img{
      width: 100%;
    }
`

export default ListKeyin;
