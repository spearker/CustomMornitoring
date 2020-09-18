import React from 'react';
import Styled, {css} from 'styled-components';
import moreGroupBtn from '../../Assets/Images/btn_more_group.png';

const HistoryTrs = ({ pres, onToggle, onToggle2 }) => {
    const { id, name, number, writer, date, moreAction, action, moreView } = pres;
  return (
      <>
            <Lists>
              <ListDiv>
                <Span1>{name}</Span1>
                <Span2>{number}</Span2>
                <Span3>{writer}</Span3>
                <Span4>{date}</Span4>
                <MoreLookBtnDiv>
                  <MoreLookBtn style={{
                        backgroundColor: moreAction ? '#19b9df' : '#717c90'
                    }}
                    onClick={() => onToggle(id)}
                  >자세히 보기</MoreLookBtn>
                </MoreLookBtnDiv>
              </ListDiv>
              <ListMoreDiv style={{
                display: moreAction ? 'block' : 'none'
              }}>
                <Table>
                  <thead>
                    <MoreTableTr>
                      <Th1>날짜</Th1>
                      <Th2>작성자</Th2>
                      <Th3>점검 항목</Th3>
                      <Th4>점검 내용</Th4>
                      <Th5>비고</Th5>
                      <Th6>
                        <button onClick={() => onToggle2(id)}>
                          <MoreImg src={moreGroupBtn} style={{
                              transform: action ? "rotate( 0deg )" : "rotate( 180deg )"
                          }} />
                        </button>
                      </Th6>
                    </MoreTableTr>
                  </thead>
                  <tbody>
                      {/* map으로 늘리기 */}
                      {
                        action ?
                        moreView.map(
                            (view, index) => (
                              <Tr key={index}>
                                  {console.log('true')}
                                <Td>{view.date}</Td>
                                <Td>{view.writer}</Td>
                                <Td>{view.checkList}</Td>
                                <Td>{view.inspectionContents}</Td>
                                <Td>{view.remark === "" ? '-' : view.remark}</Td>
                                <Td></Td>
                              </Tr>
                            )
                          )
                        :
                        <Tr>
                            {console.log('false')}
                            <Td>{moreView[0].date}</Td>
                            <Td>{moreView[0].writer}</Td>
                            <Td>{moreView[0].checkList}</Td>
                            <Td>{moreView[0].inspectionContents}</Td>
                            <Td>{moreView[0].remark === "" ? '-' : moreView[0].remark}</Td>
                            <Td></Td>
                        </Tr>
                      }
                  </tbody>
                </Table>
              </ListMoreDiv>
            </Lists>
    </>
  )
};


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

const Lists = Styled.div`
  margin-bottom: 6px;
`;

const ListDiv = Styled.div`
  display: table;
  width: 100%;
  height: 50px;
  background-color: #2b2c3b;
`;

const MoreLookBtnDiv = Styled.div`
  ${Display}
`;

const MoreLookBtn = Styled.button`
  width: 112px;
  height: 30px;
  object-fit: contain;
  border-radius: 6px;
`;

const ListMoreDiv = Styled.div`
  padding: 20px 20px 13.5px 20px;
  background-color: #515664;
`;

const Table = Styled.table`
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  margin: 0;
`;

const MoreTableTr = Styled.tr`
  border-bottom: 2px solid #717c90;
`;

const Tr = Styled.tr``;

const AllTh = css`
  padding-bottom: 12px;
`;

const Th1 = Styled.th`
  width: 174px;
  ${AllTh}
`;

const Th2 = Styled.th`
  width: 126px;
  ${AllTh}
`;

const Th3 = Styled.th`
  width: 162px;
  ${AllTh}
`;

const Th4 = Styled.th`
  width: 387px;
  ${AllTh}
`;

const Th5 = Styled.th`
  width: 191px;
  ${AllTh}
`;

const Th6 = Styled.th`
  width: 20px;
  ${AllTh}
`;

const MoreImg = Styled.img`
  width: 20px;
  height: 20px;
`;

const Td = Styled.td`
  padding: 12px 0;
`;


export default HistoryTrs;
