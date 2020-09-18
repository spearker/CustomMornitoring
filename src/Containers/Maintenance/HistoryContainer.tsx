import React, {useCallback, useEffect, useState} from 'react';
import Styled, {css} from 'styled-components'
import Header from "../../Components/Text/Header";
import searchBtnImg from '../../Assets/Images/btn_search.png';
import HistoryLists from './HistoryLists';

//보전 이력 관리


const MaintenanceHistoryContainer = () => {

  const [press, setPress] = useState([
    {
      id: '1',
      name: '프레스01',
      number: '000-456-789',
      writer: '홍길동',
      date: '2020-06-02',
      moreAction: false,
      action: false,
      moreView: [
        {
          date: '2020.06.02 (화)',
          writer: '홍길동',
          checkList: '오일',
          inspectionContents: '오일교체',
          remark: ''
        },{
          date: '2020.05.29 (금)',
          writer: '남길동',
          checkList: '부품',
          inspectionContents: '프레스 부품 0001 교체',
          remark: ''
        },
      ],
    },
    {
      id: '2',
      name: '프레스02',
      number: '000-000-00000',
      writer: '홍길동',
      date: '2020-05-26',
      moreAction: false,
      action: false,
      moreView: [
        {
          date: '2020.06.02 (화)',
          writer: '홍길동',
          checkList: '오일',
          inspectionContents: '오일교체',
          remark: ''
        },{
          date: '2020.05.29 (금)',
          writer: '남길동',
          checkList: '부품',
          inspectionContents: '프레스 부품 0001 교체',
          remark: ''
        },{
          date: '2020.05.29 (금)',
          writer: '남길동',
          checkList: '부품',
          inspectionContents: '프레스 부품 0001 교체',
          remark: ''
        },
      ]
    },
    {
      id: '3',
      name: '프레스03',
      number: '000-000-00000',
      writer: '홍길동',
      date: '2020-05-25',
      moreAction: false,
      action: false,
      moreView: [
        {
          date: '2020.06.02 (화)',
          writer: '홍길동',
          checkList: '오일',
          inspectionContents: '오일교체',
          remark: ''
        },{
          date: '2020.05.29 (금)',
          writer: '남길동',
          checkList: '부품',
          inspectionContents: '프레스 부품 0001 교체',
          remark: '아무말임시말'
        },
      ]
    },
    {
      id: '4',
      name: '프레스04',
      number: '000-000-00000',
      writer: '홍길동',
      date: '2020-05-25',
      moreAction: false,
      action: false,
      moreView: [
        {
          date: '2020.06.02 (화)',
          writer: '홍길동',
          checkList: '오일',
          inspectionContents: '오일교체',
          remark: ''
        }
      ]
    },
    {
      id: '5',
      name: '프레스05',
      number: '000-000-00000',
      writer: '홍길동',
      date: '2020-05-02',
      moreAction: false,
      action: false,
      moreView: [
        {
          date: '2020.06.02 (화)',
          writer: '홍길동',
          checkList: '오일',
          inspectionContents: '오일교체',
          remark: ''
        }
      ]
    },
    {
      id: '6',
      name: '프레스06',
      number: '000-000-00000',
      writer: '홍길동',
      date: '2020-05-02',
      moreAction: false,
      action: false,
      moreView: [
        {
          date: '2020.06.02 (화)',
          writer: '홍길동',
          checkList: '오일',
          inspectionContents: '오일교체',
          remark: ''
        }
      ]
    },
    {
      id: '7',
      name: '프레스07',
      number: '000-000-00000',
      writer: '홍길동',
      date: '2020-05-02',
      moreAction: false,
      action: false,
      moreView: [
        {
          date: '2020.06.02 (화)',
          writer: '홍길동',
          checkList: '오일',
          inspectionContents: '오일교체',
          remark: ''
        }
      ]
    }
  ]);

  useEffect(()=>{

  },[]);

  const onToggle = useCallback(id => {
    setPress(press.map(
        pres => pres.id === id
            ? { ...pres, moreAction: !pres.moreAction }
            : pres
    ));
  }, [press]);

  const onToggle2 = useCallback(id => {
    setPress(press.map(
        pres => pres.id === id
            ? { ...pres, action: !pres.action }
            : pres
    ));
  }, [press]);

  return (
    <div>
          <div style={{position:'relative'}}>

            <Header title={'보전 이력 관리'} />

            <HistorySearch>
              <HistorySearchInput placeholder="검색어를 입력해 주세요. " />
              <HistorySearchBtn>
                <HistoryBtnImgDiv>
                  <HistoryImg src={searchBtnImg} />
                </HistoryBtnImgDiv>
              </HistorySearchBtn>
            </HistorySearch>

          </div>
          <ListBox>
            <ListTitleDiv>
              <Span1>기계명</Span1>
              <Span2>기계 번호</Span2>
              <Span3>작성자</Span3>
              <Span4>최근 점검일</Span4>
              <Span5 />
            </ListTitleDiv>
            {
              press.map(
                (pres, index) => (
                  <HistoryLists key={index} pres={pres} onToggle={onToggle} onToggle2={onToggle2} />
                )
              )
            }

          </ListBox>
    </div>
  );
}

const HistorySearch = Styled.div`
  position: absolute;
  width: 360px;
  top: -4px;
  right: 0;
  display: inline-flex;
  border: solid 0.5px #b3b3b3;
  background-color: #f4f6fa;
`;

const HistorySearchInput = Styled.input`
  width: calc(100% - 36px);
  height: 36px;
  border: 0;
  padding: 0 0 0 20px;
`;

const HistorySearchBtn = Styled.button`
  width: 36px;
  height: 36px;
  border: solid 0.5px #b3b3b3;
  background-color: #19b9df;
`;

const HistoryBtnImgDiv = Styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    text-align: center;
`;

const HistoryImg = Styled.img`
  width: 18px;
  height: 18px;
`;

const ListBox = Styled.div`
  width: 1100px;
  text-align: left;
`;
const ListTitleDiv = Styled.div`
  display: table;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  background-color: #17181c;
  margin-bottom: 20px;
`;

const Display = css`
  display: table-cell;
  vertical-align: middle;
`;

const Span1 = Styled.p`
  padding-left: 20px;
  width: 306px;
  ${Display}
`;

const Span2 = Styled.p`
  width: 251px;
  ${Display}
`;

const Span3 = Styled.p`
  width: 194px;
  ${Display}
`;

const Span4 = Styled.p`
  width: 195px;
  ${Display}
`;

const Span5 = Styled.div`
  display: table-cell;
`;



export default MaintenanceHistoryContainer;
