import React, {useCallback, useEffect, useState} from "react";
import CustomDashboardHeader from "../../../Components/Custom/dashboard/CustomDashboardHeader";
import Styled from "styled-components";
import CustomDashboardTable from "../../../Components/Custom/dashboard/CustomDashboardTable";
import CustomDashboardTargetTable from "../../../Components/Custom/dashboard/CustomDashboardTargetTable";
import PressBox from "../../../Components/Custom/PM_Monitoring/PressBox";
import {API_URLS, getLoadTonList} from "../../../Api/pm/monitoring";
import Notiflix from 'notiflix'
import LotProcessCard from "../../../Components/Card/LotProcessCard";

interface Contents {
    pk: string, // 세분화 공정 pk (String),
    state: string,
    name: string, // 세분화 공정명 (String),
    // process_names: string, // 등록된 공정들의 명 (String)
    process: Process[]
}

interface Process {
    ing: boolean,
    state: string,
    process_name: string, // 공정명 (String),
    machine_name: string, // 기계명 (String),
    mold_name: string, // 금형명 (String),
    input_material: {
        material_pk: string, // 품목 pk (string),
        material_name: string, // 품목명 (string),
        material_type: string, // 품목타입 (number),
        count: string, // BOM (number)
    }[], // 금형 투입 품목명 (String),
    output_material: {
        material_pk: string, // 품목 pk (string),
        material_name: string, // 품목명 (string),
        material_type: string, // 품목타입 (number),
        count: string, // BOM (number)
    }[] // 금형 생산 품목명 (String)
}

const dummy:Contents[] = [
    {
        pk: 'pk1', // 세분화 공정 pk (String),
        state: '중지',
        name: 'LOT명1', // 세분화 공정명 (String),
        process: [
            {   
                ing: false,
                state: '중지',
                process_name: '공정명1', // 공정명 (String),
                machine_name: '공정명1 기계', // 기계명 (String),
                mold_name: '공정명1 금형', // 금형명 (String),
                input_material: [
                    {
                        material_pk: 'input_material_pk1', // 품목 pk (string),
                        material_name: 'input_품목명1', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.015', // BOM (number)
                    },
                    {
                        material_pk: 'input_material_pk2', // 품목 pk (string),
                        material_name: 'input_품목명2', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.025', // BOM (number)
                    }
                ], // 금형 투입 품목명 (String),
                output_material: [
                    {
                        material_pk: 'output_material_pk1', // 품목 pk (string),
                        material_name: 'output_품목명1', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '1', // BOM (number)
                    }
                ]
            }
        ]
    },
    {
        pk: 'pk2', // 세분화 공정 pk (String),
        state: '진행중',
        name: 'LOT명2', // 세분화 공정명 (String),
        process: [
            {
                ing: true,
                state: '생산중',
                process_name: '공정명1', // 공정명 (String),
                machine_name: '공정명1 기계', // 기계명 (String),
                mold_name: '공정명1 금형', // 금형명 (String),
                input_material: [
                    {
                        material_pk: 'input_material_pk1', // 품목 pk (string),
                        material_name: 'input_품목명1', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.015', // BOM (number)
                    },
                    {
                        material_pk: 'input_material_pk2', // 품목 pk (string),
                        material_name: 'input_품목명2', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.025', // BOM (number)
                    },
                    {
                        material_pk: 'input_material_pk3', // 품목 pk (string),
                        material_name: 'input_품목명3', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.05', // BOM (number)
                    }
                ], // 금형 투입 품목명 (String),
                output_material: [
                    {
                        material_pk: 'output_material_pk1', // 품목 pk (string),
                        material_name: 'output_품목명1', // 품목명 (string),
                        material_type: '1', // 품목타입 (number),
                        count: '1', // BOM (number)
                    }
                ]
            }
        ]
    },
    {
        pk: 'pk3', // 세분화 공정 pk (String),
        state: '진행중',
        name: 'LOT명3', // 세분화 공정명 (String),
        process: [
            {
                ing: false,
                state: '완료',
                process_name: '공정명1', // 공정명 (String),
                machine_name: '공정명1 기계', // 기계명 (String),
                mold_name: '공정명1 금형', // 금형명 (String),
                input_material: [
                    {
                        material_pk: 'input_material_pk1', // 품목 pk (string),
                        material_name: 'input_품목명1', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.015', // BOM (number)
                    },
                    {
                        material_pk: 'input_material_pk2', // 품목 pk (string),
                        material_name: 'input_품목명2', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.025', // BOM (number)
                    }
                ], // 금형 투입 품목명 (String),
                output_material: [
                    {
                        material_pk: 'output_material_pk1', // 품목 pk (string),
                        material_name: 'output_품목명1', // 품목명 (string),
                        material_type: '1', // 품목타입 (number),
                        count: '1', // BOM (number)
                    }
                ]
            },
            {
                ing: true,
                state: '생산중',
                process_name: '공정명2', // 공정명 (String),
                machine_name: '공정명2 기계', // 기계명 (String),
                mold_name: '공정명2 금형', // 금형명 (String),
                input_material: [
                    {
                        material_pk: 'input_material_pk1', // 품목 pk (string),
                        material_name: 'input_품목명1', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.015', // BOM (number)
                    },
                    {
                        material_pk: 'input_material_pk2', // 품목 pk (string),
                        material_name: 'input_품목명2', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.025', // BOM (number)
                    }
                ], // 금형 투입 품목명 (String),
                output_material: [
                    {
                        material_pk: 'output_material_pk1', // 품목 pk (string),
                        material_name: 'output_품목명1', // 품목명 (string),
                        material_type: '1', // 품목타입 (number),
                        count: '1', // BOM (number)
                    }
                ]
            },
            {
                ing: false,
                state: '대기',
                process_name: '공정명3', // 공정명 (String),
                machine_name: '공정명3 기계', // 기계명 (String),
                mold_name: '공정명3 금형', // 금형명 (String),
                input_material: [
                    {
                        material_pk: 'input_material_pk1', // 품목 pk (string),
                        material_name: 'input_품목명1', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.015', // BOM (number)
                    },
                    {
                        material_pk: 'input_material_pk2', // 품목 pk (string),
                        material_name: 'input_품목명2', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.025', // BOM (number)
                    },
                    {
                        material_pk: 'input_material_pk3', // 품목 pk (string),
                        material_name: 'input_품목명3', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.05', // BOM (number)
                    }
                ], // 금형 투입 품목명 (String),
                output_material: [
                    {
                        material_pk: 'output_material_pk1', // 품목 pk (string),
                        material_name: 'output_품목명1', // 품목명 (string),
                        material_type: '1', // 품목타입 (number),
                        count: '1', // BOM (number)
                    },
                    {
                        material_pk: 'output_material_pk1-1', // 품목 pk (string),
                        material_name: 'output_품목명1-1', // 품목명 (string),
                        material_type: '1', // 품목타입 (number),
                        count: '1', // BOM (number)
                    }
                ]
            },
            {
                ing: false,
                state: '대기',
                process_name: '길고 긴 공정명 길고 긴 공정명 길고 긴 공정명4', // 공정명 (String),
                machine_name: '공정명4 기계', // 기계명 (String),
                mold_name: '공정명4 금형', // 금형명 (String),
                input_material: [
                    {
                        material_pk: 'input_material_pk1', // 품목 pk (string),
                        material_name: 'input_품목명1', // 품목명 (string),
                        material_type: '0', // 품목타입 (number),
                        count: '0.015', // BOM (number)
                    }
                ], // 금형 투입 품목명 (String),
                output_material: [
                    {
                        material_pk: 'output_material_pk1', // 품목 pk (string),
                        material_name: 'output_품목명1', // 품목명 (string),
                        material_type: '1', // 품목타입 (number),
                        count: '1', // BOM (number)
                    }
                ]
            }
        ]
    }
]

const LotMonitoringContainer = () => {
    const [list, setList] = useState<Contents[]>([])

    const getList = useCallback(async () => {
        //TODO: 성공시
        setList(dummy);
        return;
        const tempUrl = `${API_URLS['press'].status}`
        const res = await getLoadTonList(tempUrl)
        if (res) {
            setList(res.info_list)

            Notiflix.Loading.Remove()
        }
    }, [list])

    useEffect(() => {
        // Notiflix.Loading.Circle()
        getList()
        const interval = setInterval(() => {
            getList()
        }, 2500)
        return () => {
            clearTimeout(interval)
        }
    }, [])

    return (
        <Container>
            <CustomDashboardHeader title={'LOT 현황 모니터링'} sameDistance />
            <div style={{
                width: '100%',
                padding: '0 48px 24px 48px',
                boxSizing: 'border-box',
                display: 'grid',
                gridRowGap: 20,
                gridTemplateColumns: 'repeat(auto-fill, calc(50% - 10px))',
                justifyContent: 'space-between'
            }}>
                {list === undefined ?
                    <p style={{color: 'white', fontSize: '30px', textAlign: 'center', width: '100%'}}>불러 올 수 있는 정보가
                        없습니다.</p>
                    :
                    list.map((lotData, index) => (
                        <LotProcessCard key={`${lotData.pk}${index}`} contents={lotData} />
                    ))
                }
            </div>
        </Container>
    )
}


const Container = Styled.div`
  width: 100%;
  height: 100vh;
`


export default LotMonitoringContainer
