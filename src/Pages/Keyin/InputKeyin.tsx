import React, {useState} from 'react';
import Styled from 'styled-components'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import 'react-dropdown/style.css'
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import TEMP_IMG_1 from '../../Assets/Dummy/keyin_input_1.svg'
import {useHistory} from 'react-router-dom';
import SubNavigation2 from '../../Components/Navigation/SubNavigation2';
import MonitoringOptionButton from '../../Components/Button/MonitoringOptionButton';

//인풋 키인
const InputKeyin = ({ match }) => {

  const [list, setList] = useState<IMonitoringList[]>([]);
  const history = useHistory();
  const { id } = match.params;

  return (
      <DashboardWrapContainer index={10}>
        <SubNavigation2 list={[
           { name : '프레스 Key-in', url : '/keyin/input/프레스'},
        { name : '프레스 Key-in', url : '/keyin/input/프레스'},
        { name : '금형 Key-in', url : '/keyin/input/금형'},
        { name : '용접기 Key-in', url : '/keyin/input/용접기'},
        { name : '밀링 Key-in', url : '/keyin/input/밀링'},
        { name : '선반 Key-in', url : '/keyin/input/선반'},
        { name : 'tab Key-in', url : '/keyin/input/탭'},
        { name : '자재 Key-in', url : '/keyin/input/자재'},

      ]} key={String(id)}/>
        <InnerBodyContainer>
          <div style={{position:'relative'}}>
              <Header title={ id + ' Key-in 입력'}/>
              <div style={{position:'absolute',display:'inline-block',top:0, right:0}}>
              <MonitoringOptionButton title={'항목 선택'} color={'#b3b3b3'} onClickEvent={()=>{alert('현재 기능을 사용 할 수 없습니다.')}}/>
              <MonitoringOptionButton title={'항목 리스트 불러오기'} color={'#b3b3b3'} onClickEvent={()=>{alert('현재 기능을 사용 할 수 없습니다.')}}/>
              <MonitoringOptionButton title={'항목 리스트 저장'} color={'#b3b3b3'} onClickEvent={()=>{alert('현재 기능을 사용 할 수 없습니다.')}}/>
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

export default InputKeyin;
