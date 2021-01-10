import React, {useCallback, useEffect, useState} from 'react'
import KPIBasicBox from '../../Components/Box/KPIBasicBox'
import KPICompareBox from '../../Components/Box/KPICompareBox'
import KPIMenuBox from '../../Components/Box/KPIMenuBox'
import KPIResultBox from '../../Components/Box/KPIResultBox'
import TopHeader from '../../Components/Text/TopHeader'
import {API_URLS, getKPIData} from '../../Api/mes/KPI'
import moment from 'moment'

interface Menu {
    name: string,
    api: string,
    tip: string
}

const menuList: {
    name: string,
    api: string,
    tip: string
}[] = [
    {name: '설비가동률', api: 'facility_operational_improvement_rate', tip: '계획 시간 동안 얼마나 설비가 효율적으로 가동됐는지 나타내는 지표.'}, // api key이름
    {name: '제조 리드타임', api: 'manufacturing_leadTime_reduced_rate', tip: '완제품으로 완성될 때 까지의 소요 시간.'},
    {name: '생산 품목', api: 'item_growth_rate', tip: '해당 기간에 생산된 총 품목수.'},
    {name: '생산 목표 달성률', api: 'target_attainment_rate', tip: '매출 목표 달성과 생산 목표 달성의 정도를 확인하는 지표.'},
    {name: '시간당 생산량', api: 'average_production_per_hour', tip: '완제품 기준으로 선택된 기간 내 작업된 제품들의 시간당 생산량을 확인하는 지표.'},
]

const subTitleList = {
    facility_operational_improvement_rate: {},
    manufacturing_leadTime_reduced_rate: {
        total: '총 리드타임',
        worked: '총 작업 이력 건 순'
    },
    item_growth_rate: {
        materials: '생산 품목 리스트'
    },
    target_attainment_rate: {
        total: '총 생산목표 수량',
        produced: '총 생산된 수량',
    }
}

const ProductionKPIContainer = () => {
    const [selectMenu, setSelectMenu] = useState<Menu>(menuList[0])
    const [type, setType] = useState<'month' | 'week' | 'day'>('day')
    const [compareView, setCompareView] = useState<boolean>(false)
    const [data, setData] = useState<any>({number: 100, increase: true})
    const [compareArr, setCompareArr] = useState<number[]>([0, 0])

    useEffect(() => {
        // getData();
    }, [selectMenu])

    const changeDate = (date: Date) => {
        return moment(date).format('YYYY-MM-DD')
    }

    const getData = async (from: Date, to: Date, index: number, pk?: string,) => {
        let tempUrl = ''
        if (selectMenu.api === 'manufacturing_leadTime_reduced_rate') {
            tempUrl = `${API_URLS['kpi'].production[selectMenu.api]}?material=${pk}`
        } else if (selectMenu.api === 'average_production_per_hour') {
            tempUrl = `${API_URLS['kpi'].production[selectMenu.api]}?material=${pk}&from=${changeDate(from)}&to=${changeDate(to)}`
        } else {
            tempUrl = `${API_URLS['kpi'].production[selectMenu.api]}?from=${changeDate(from)}&to=${changeDate(to)}`
        }
        const resultData = await getKPIData(tempUrl)
        if (resultData) {
            const tmpList = compareArr
            tmpList[index] = typeof resultData.data === 'string' ? Number(resultData.data.split(':')[0]) * 3600 + Number(resultData.data.split(':')[1]) * 60 + Number(resultData.data.split(':')[2]) : resultData.data
            setCompareArr([...tmpList])

            return resultData
        }
        return 0
    }

    useEffect(() => {
        setCompareView(false)
    }, [selectMenu])

    const onClose = () => {
        setCompareView(false)
        setData({})
    }

    return (
        <div style={{maxWidth: 1100}}>
            <TopHeader title={'생산지수(P)'} top={5} bottom={19}/>
            <KPIMenuBox menuList={menuList} onChangeEvent={(select: Menu) => setSelectMenu(select)} value={selectMenu}>
                <KPICompareBox type={type} setType={(type) => setType(type)} value={selectMenu}
                               getData={getData} index={0} subTitleList={subTitleList[selectMenu.api]}/>
                {
                    compareView
                        ? <>
                            <KPICompareBox type={type} getData={getData} subTitleList={subTitleList[selectMenu.api]}
                                           value={selectMenu} index={1}/>
                            <KPIResultBox onCloseEvent={() => onClose()} data={compareArr}/>
                        </>
                        : <KPIBasicBox style={{justifyContent: 'center', alignItems: 'center'}}>
                            <button onClick={() => setCompareView(true)}>비교하기</button>
                        </KPIBasicBox>
                }
            </KPIMenuBox>
        </div>
    )
}

export default ProductionKPIContainer
