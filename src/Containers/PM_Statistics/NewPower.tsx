import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import Styled from 'styled-components'
import ReactApexChart from 'react-apexcharts'
import ListRadioButton from '../../Components/Button/ListRadioButton'
import CalendarDropdown from '../../Components/Dropdown/CalendarDropdown'
import { API_URLS, getPowerList } from '../../Api/pm/statistics'
import NoDataCard from '../../Components/Card/NoDataCard'
import { usePopupDispatch } from '../../Context/PopupContext'
import BasicButton from '../../Components/Button/BasicButton'
import BasicGrayButtonLink from '../../Components/Button/BasicGrayButtonLink'
import AlertModal from '../../Components/Modal/AlertModal'
import { NewMyResponsiveLine } from '../../Components/LineChart/NewMyResponsiveLine'

const chartOption = {
    chart: {
        height: 350,
        type: 'area',
        toolbar: {
            show: true,
            tools: {
                download: false,
                selection: false,
                zoom: false,
                zoomin: true,
                zoomout: true,
                pan: false
            }
        },
    },
    colors: ['#dd4bbe', '#5145c6', '#158bdc', '#fb9e70', '#08d05f', '#f65f61', '#d8bf00'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    xaxis: {
        tickAmount: 20
    },
    yaxis: {
        min: 0,
        tickAmount: 25,
        labels: {
            formatter: (value, index) => {
                if (index === 25) {
                    return '(kW/h)'
                } else {
                    return Math.round(value)
                }

            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.58,
            opacityTo: 0,
            stops: [0, 90, 100]
        }
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        align: 'horizontal'
    },
    grid: {
        borderColor: '#42444b',
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } }
    },
    tooltip: {
        enable: false
    }

}


const chartColor = ["#dd4bbe", "#5145c6", "#158bdc", "#fb9e70", "#08d05f", "#f65f61", "#d8bf00"];

const NewPowerContainer = () => {
    const dispatchp = usePopupDispatch()

    const [data, setData] = useState<{ id: string, color: string, data: { x: string, y: number }[] }[]>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [selectDate, setSelectDate] = useState({
        start: moment().subtract(3, 'days').format('YYYY-MM-DD'),
        end: moment().subtract(1, 'days').format('YYYY-MM-DD')
    })

    const [max, setMax] = useState<number | 'auto'>(10);

    // let chart = new ApexCharts(el,)

    useEffect(() => {
        dispatchp({
            type: 'CHANGE_MODE',
            data: {
                mode: 'pm',
            }
        })
    }, [])

    const getData = async () => {
        setVisible(false);
        setLoading(true);

        const tempUrl = `${API_URLS['power'].list}?startDate=${selectDate.start}&endDate=${selectDate.end}`;
        const resultData = await getPowerList(tempUrl);

        // 실험
        let tempArray: any = {};
        let tmpArr: { id: string, color: string, data: { x: string, y: number }[] }[] = [];

        let maxNumber: number | 'auto' = 10;

        resultData.press_logs?.map(index => {
            if (tempArray[index.press_pk]) {
                tempArray = {
                    ...tempArray, [index.press_pk]: {
                        id: index.press_name,
                        data: [...tempArray[index.press_pk].data, {
                            x: index.date,
                            y: index.press_data
                        }]
                    }
                }
            } else {
                tempArray = {
                    ...tempArray, [index.press_pk]: {
                        id: index.press_name,
                        data: [{
                            x: index.date,
                            y: index.press_data
                        }]
                    }
                }
            }
            if (maxNumber < index.press_data) {
                maxNumber =  Math.ceil(index.press_data/10) * 10;
            }
        })

        setMax(maxNumber);

        Object.keys(tempArray).map((v, i) => {
            tmpArr = [...tmpArr, {
                id: tempArray[v].id,
                color: chartColor[i],
                data: tempArray[v].data
            }]
        })

        setData(tmpArr);
        // 끝
        setLoading(false)

    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <div style={{ position: 'relative', textAlign: 'left', marginTop: 87 }}>

                <div style={{ display: 'inline-block', textAlign: 'left', marginBottom: 23 }}>
                    <span style={{ fontSize: 20, marginRight: 18, marginLeft: 3, fontWeight: 'bold' }}>프레스 전력</span>
                </div>
            </div>
            {
                loading
                    ? <NoDataCard contents={'데이터를 불러오는 중입니다..'} height={740} />
                    : data.length !== 0 ?
                        <BlackContainer>
                            <div style={{ marginTop: 25, height: 80 }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className={'itemDiv'} style={{ float: 'left', display: 'inline-block' }}>
                                        <p style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>기간별 프레스 전력 비교</p>
                                    </div>
                                    <div style={{
                                        marginRight: 30,
                                        width: 620,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        marginTop: 30
                                    }}>
                                        {/*<ListRadioButton nameList={['일']} data={selectType} onClickEvent={(i) => {*/}
                                        {/*    if (i === 0) {*/}
                                        {/*        setSelectType([true, false])*/}
                                        {/*    } else {*/}
                                        {/*        setSelectType([false, true])*/}
                                        {/*    }*/}
                                        {/*}}/>*/}
                                        <div>
                                            <CalendarDropdown type={'single'} selectRange={selectDate}
                                                limitType={'electric'}
                                                onClickEvent={(date) => setSelectDate({
                                                    start: moment(date).subtract(2, 'days').format('YYYY-MM-DD'),
                                                    end: date
                                                })} />
                                            <p style={{ fontSize: 13 }}>기간 선택 후 검색버튼을 눌러주세요</p>
                                        </div>
                                        <div style={{ marginLeft: 20, height: 20 }}>
                                            <BasicGrayButtonLink width={'80px'} name={'검색'}
                                                onClick={() => setVisible(true)}></BasicGrayButtonLink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: 'calc(100% - 110px)' }}>
                                <NewMyResponsiveLine data={data} max={max} />
                            </div>
                        </BlackContainer>
                        :
                        <div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                height: 30,
                                float: 'right',
                                marginBottom: 20
                            }}>
                                <CalendarDropdown type={'single'} selectRange={selectDate} limitType={'electric'}
                                    onClickEvent={(date) => setSelectDate({
                                        start: moment(date).subtract(2, 'days').format('YYYY-MM-DD'),
                                        end: date
                                    })} />
                                <BasicGrayButtonLink width={'80px'} name={'검색'}
                                    onClick={() => setVisible(true)}></BasicGrayButtonLink>
                            </div>
                            <NoDataCard contents={'데이터를 불러오는 중입니다..'} height={740} />
                        </div>
            }
            {
                visible &&
                <AlertModal onClickClose={() => setVisible(false)} type={'normal'} contents={'해당 기간의 데이터를 검색하시겠습니까?'}
                    okFunc={() => getData()}></AlertModal>
            }
        </div>
    )
}

const BlackContainer = Styled.div`
    width: 1100px;
    height: 740px;
    background-color: #111319;
    border-radius: 6px;
   
    .itemDiv{
        height: 40px;
        width: 50%;
        p{
            font-size: 20px;
            font-weight: bold;
            padding-Top: 20px;
            text-Align: left;
            margin-left: 20px;
        }
    }
    .apexcharts-tooltip{
        color: black;
    }
`

export default NewPowerContainer
