import React from 'react'
import Styled from 'styled-components'

import tempImage from '../../../Assets/Images/temp_machine.png'

interface Props {
    pressList: IPressMachineType[]
    selectMachine: string
    onClickMachine: any
}


const CustomPressListCard: React.FunctionComponent<Props> = ({pressList, selectMachine, onClickMachine}) => {

    return (
        <div>
            <ChartListBox>
                <div style={{marginTop: 25, marginBottom: 23}}>
                    <p style={{textAlign: 'left', fontSize: 20, fontWeight: 'bold'}}>프레스 선택</p>
                </div>
                {pressList !== undefined && pressList.length === 0 ? (
                        <p style={{backgroundColor: '#353b48'}}><p style={{width: '100%', textAlign: 'center'}}>데이터가
                            없습니다. </p></p>) :
                    pressList.map((v, i) => {
                        if (selectMachine === v.pk) {
                            return (<ChartBorderMiniBox>
                                <div style={{
                                    width: 114,
                                    height: 100,
                                    marginLeft: 8,
                                    display: 'inline-block',
                                    float: 'left',
                                    paddingTop: 10
                                }}>
                                    <img src={v.machine_img ? v.machine_img : tempImage}
                                         style={{width: 114, height: 104, objectFit: 'cover'}}/>
                                </div>
                                <div style={{
                                    width: 150,
                                    height: 100,
                                    float: 'left',
                                    display: 'inline-block',
                                    marginTop: 10,
                                    marginLeft: 21
                                }}>
                                    <p style={{
                                        fontWeight: 'bold',
                                        textAlign: 'left'
                                    }}>{v.machine_name + '(' + v.machine_ton + 't)'}</p>
                                    <p style={{textAlign: 'left'}}>{v.manufacturer_code}</p>
                                </div>
                            </ChartBorderMiniBox>)
                        } else {
                            return (<ChartMiniBox onClick={() => {
                                onClickMachine(v.pk)
                            }}>
                                <div style={{
                                    width: 114,
                                    height: 100,
                                    marginLeft: 8,
                                    display: 'inline-block',
                                    float: 'left',
                                    paddingTop: 10
                                }}>
                                    <img src={v.machine_img ? v.machine_img : tempImage}
                                         style={{width: 114, height: 104, objectFit: 'cover'}}/>
                                </div>
                                <div style={{
                                    width: 150,
                                    height: 100,
                                    float: 'left',
                                    display: 'inline-block',
                                    marginTop: 10,
                                    marginLeft: 21
                                }}>
                                    <p style={{
                                        fontWeight: 'bold',
                                        textAlign: 'left'
                                    }}>{v.machine_name + '(' + v.machine_ton + 't)'}</p>
                                    <p style={{textAlign: 'left'}}>{v.manufacturer_code}</p>
                                </div>
                            </ChartMiniBox>)
                        }
                    })
                }
            </ChartListBox>
        </div>
    )
}

const ChartListBox = Styled.div`
    display: inline-block;
    width: 340px;
    height: 724px;
    padding: 0 21px 0 29px;
    background-color: #353b48;
    border-radius: 6px;
    float: left;
    overflow-y:scroll;
`

const ChartMiniBox = Styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
    margin-bottom: 20px;
    img{
        object - fit: resize;
    }
`

const ChartBorderMiniBox = Styled.div`
    width: 340px;
    height: 120px;
    border-radius: 6px;
    background-color: #111319;
    border: 4px solid #19b9df;
    margin-bottom: 20px;
`


export default CustomPressListCard

