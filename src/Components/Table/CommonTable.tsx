import React from "react";
import Styled from "styled-components";
import {useHistory} from "react-router-dom";


interface Props {
  idKey?: string;
  indexList: any;
  clickLink?: string;
  onClickEvents?: any[];
  contents: any[];
}

const CommonTable = ({
  idKey,
  indexList,
  clickLink,
  onClickEvents,
  contents,
}: Props) => {

    const history = useHistory();

  return (
    <CommonTableWrapper>
      <table>
        <tbody>
          <tr>
            {Object.keys(indexList).map((v, i) => {
              return (
                <th key={v} className="p-limits">
                  {indexList[v]}
                </th>
              );
            })}
            {onClickEvents !== undefined && <th></th>}
          </tr>
          {/* 테이블 바디 */}

          {contents.map((v, i) => {
            return (
              <tr key={i} onClick={()=> clickLink !== undefined ? history.push(clickLink + '/' + v.pk) : {} }>
                {Object.keys(indexList).map((mv, mi) => {
                  return v[mv] !== undefined ? (
                    <td key={mv}>{typeof v[mv] == "string" || typeof v[mv] == "number" ? v[mv] :''}</td>
                  ) : null;
                })}
                {onClickEvents !== undefined &&
                  <td key={`td-${i}`}>
                    {onClickEvents.map((ev, ei) => {
                      return (
                          <button key={`td-${ei}`} onClick={()=>ev.event(v)}>{ev.name}</button>
                      );
                    })}
                  </td>
                  }
              </tr>
            );
          })}
        </tbody>
      </table>
    </CommonTableWrapper>
  );
};

const CommonTableWrapper = Styled.div`
    button{
      margin-left: 4px;
    }
    table{
        border-collapse: collapse;
        tr{
            &:first-child{
                border-bottom: 1.5px solid #dddddd;
            }
            &:hover{}
        }
        th{
            padding: 6px 11px 6px 0px;
        }
        td{
            cursor: pointer;
            padding: 6px 11px 6px 0px;
            min-width: 100px;
            padding-right: 11px;
        }
        text-align: left;
    }
`;
export default CommonTable;
