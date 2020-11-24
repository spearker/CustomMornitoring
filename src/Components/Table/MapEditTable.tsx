import React, {useEffect} from "react";
import IcDropDownButton from "../../Assets/Images/ic_dropdown_white.png";
import Styled from "styled-components";

interface Props {
    indexList: indexList
    valueList: any[]
}

interface indexList {
    mapType: string
}

const MapEditTable = ({indexList, valueList}: Props) => {

    return (
        <div>
            <Title>
                <p className="p-bold" style={{fontSize: 20}}>지도 이미지 에디터</p>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{marginRight: 15}}>
                        <TitleButtonBox onClick={() => ''}
                                        style={{width: 90}}>등록하기</TitleButtonBox>
                    </div>
                </div>
            </Title>
            <TitleBar>
                {
                    Object.keys(indexList).map((v, i) => {
                        return (
                            <p key={v} className="p-limits">{indexList[v]}</p>
                        )
                    })
                }
            </TitleBar>
            {
                valueList !== undefined && valueList.length === 0
                    ? (
                        <ValueBar style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>데이터가
                            없습니다. </p>
                        </ValueBar>)
                    : valueList?.map((v, i) => {
                        /*
                        v:  {
                            pk: 'PK11212',
                            machine_name: '프레스 01',
                            machine_number: '000-000-00',
                            manufacturer_code: '공정 01',
                            machine_register_time: '2020.06.16 22:34:40',
                            more_Action: false
                        },
                        */
                        return (
                            <ValueBar key={i}
                                      style={{
                                          backgroundColor: '#353b48',
                                      }}>
                                {
                                    Object.keys(indexList).map((mv, mi) => {
                                        //mv : [pk , machin_list, machine_name ... ]
                                        return (
                                            typeof v[mv] === 'object' ?
                                                <select className="p-limits" style={{
                                                    backgroundColor: '#353b48',
                                                    borderColor: '#353b48',
                                                    marginLeft: 10
                                                }}>
                                                    {
                                                        Object.keys(v[mv]).map(m => {
                                                            return (
                                                                <option value={v[mv][m]}>{v[mv][m]}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                :
                                                <input key={`td-${i}-${mv}`}
                                                       className="p-limits"
                                                       value={v[mv] === '' || v[mv] === undefined || v[mv] === null ?
                                                           ''
                                                           :
                                                           v[mv]
                                                       }
                                                />

                                        )
                                    })
                                }
                            </ValueBar>

                        )
                    })
            }
        </div>
    )
}


const Title = Styled.div`
   text-align: left;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   margin-bottom: 15px;
   margin-top: 87px;
`

const TitleButtonBox = Styled.button`
    color: white;
    border-radius: 5px;
    background-color: #717c90;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    width: 70px;
    height: 30px;
`

const TitleBar = Styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #111319;
    width: 100%;
    max-height: 40px;
    min-height: 40px;
    align-items: center;
    p {
    text-align: left;
    color: #ffffff;
    font-size: 14px;
      &:first-child{
        padding-left: 20px;
      }
    }
`


const ValueBar = Styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: #353b48;
    width: 100%;
    max-height: 40px;
    min-height: 40px;
    align-items: center;
    select {
     height: 40px;
     background-color: #353b48;
     border-color: #353b48;
     text-align: left;
     color: #ffffff;
     font-size: 14px;
    }
    p {
    text-align: left;
    color: #ffffff;
    font-size: 14px;
      &:first-child{
        padding-left: 20px;
      }
    }
`


export default MapEditTable
