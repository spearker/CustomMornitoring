import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import CalendarDropdown from '../../Components/Dropdown/CalendarDropdown'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'
import {API_URLS, getDefectiveData} from '../../Api/pm/statistics'
import Notiflix from "notiflix";

Notiflix.Loading.Init({svgColor: "#1cb9df",});


const chartOption = {
    chart: {
        type: 'area',
        height: 350,
        toolbar: {
            show: true,
            tools: {
                download: false,
                selection: true,
                zoom: false,
                zoomin: true,
                zoomout: true,
            }
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        width: 2
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.35,
            opacityTo: 0,
        }
    },
    xaxis: {
        tickAmount: 10
    },
    grid: {
        borderColor: '#42444b',
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        }
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 20,
        labels: {
            show: true,
            formatter: (value) => {
                if (value === 100) {
                    return '(%)'
                } else {
                    if (value % 20 === 0) {
                        return Math.floor(value)
                    } else {
                        return
                    }
                }
            }
        },
    },
    legend: {
        show: false
    },
    tooltip: {
        enable: false
    }
}

const dummyData: { pressPk: string; insert_oil_time: { Xaxis: number[]; Yaxis: number[] } } = {
    pressPk: 'dummyPK1',
    insert_oil_time: {
        Xaxis: [0, 28, 29, 30, 1, 2, 3, 4, 0],
        Yaxis: [58, 55, 55, 60, 57, 58, 60, 55, 56],
    }
}

const DefectiveContainer = () => {
    const [data, setData] = React.useState(dummyData)
    const [list, setList] = useState<any[]>([])
    const [detailList, setDetailList] = useState<any>({
        pk: '',
        max_count: 0,
        current_count: 0,
    })
    const [index, setIndex] = useState({material_name: '품목(품목명)'})
    const [labels, setLabels] = useState([])
    const [series, setSeries] = useState([])
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [selectPk, setSelectPk] = useState<any>(null)
    const [selectIndex, setSelectIndex] = useState<number | null>(null)
    const [selectMold, setSelectMold] = useState<any>(null)
    const [selectValue, setSelectValue] = useState<any>(null)

    const [selectDate, setSelectDate] = useState({
        start: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
    })

    const indexList = {
        defective: {
            material_name: '품목(품목명)',
            checker: '검수자명',
            date: '불량 검수'
        }
    }

    const detaildummy = [
        {
            pk: 'PK1',
            max_count: 100,
            current_count: 20
        }
    ]

    const onClick = useCallback((mold, index) => {
        if (index === selectIndex) {
            // setSelectPk(null)
            // setSelectMold(null)
            // setSelectValue(null)
            // setSelectIndex(null)
        } else {
            setSelectPk(mold.pk)
            setSelectMold(mold.mold_name)
            setSelectValue(mold)
            setSelectIndex(index)
            //TODO: api 요청

        }


    }, [list, selectPk, selectIndex])

    useEffect(() => {
        if (selectValue) {
            getData(selectValue.material_pk)
        }
    }, [selectDate, selectValue])

    const getData = useCallback(async (pk) => {
        //TODO: 성공시
        const tempUrl = `${API_URLS['defective'].load}?pk=${pk}&from=${selectDate.start}&to=${selectDate.end}`
        const res = await getDefectiveData(tempUrl)


        setDetailList(res)

        let tmpArray = res.amounts.map((v) => {
            let value = 0
            if (v !== 0 && res.total_production !== 0) {
                value = Math.round(v / res.total_production * 10000) / 100
            }

            return value
        })


        //@ts-ignore
        setLabels([...res.dates])
        //@ts-ignore
        setSeries([...tmpArray])

    }, [detailList, selectValue, selectDate])

    const getList = useCallback(async () => { // useCallback
        //TODO: 성공시
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['defective'].list}?page=${page.current}&limit=5`
        const res = await getDefectiveData(tempUrl)

        setList(res.info_list)

        setPage({current: res.current_page, total: res.total_page})
        Notiflix.Loading.Remove()
    }, [list, page])

    useEffect(() => {
        getList()
        setIndex(indexList['defective'])
        setDetailList(detaildummy)
    }, [])

    useEffect(() => {
        getList()
    }, [page.current])

    return (
        <OvertonTable
            title={'프레스 불량률'}
            indexList={index}
            valueList={list}
            clickValue={selectValue}
            currentPage={page.current}
            totalPage={page.total}
            pageOnClickEvent={(event, i) => setPage({...page, current: i})}
            mainOnClickEvent={onClick}>
            {
                selectPk !== null ?
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div>
                            <LineContainer>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingTop: 10
                                }}>
                                    <p>생산량</p>
                                    <p>{detailList.total_production}<span>ea</span></p>
                                </div>
                            </LineContainer>
                            <CapacityContainer style={{paddingTop: 30, paddingBottom: 20}}>
                                <div>
                                    <p>전체 불량률</p>
                                    <p>{detailList.defect_percentage}%</p>
                                </div>
                                <div>
                                    <p>전체 불량 갯수</p>
                                    <p>{detailList.defect_amount}ea</p>
                                </div>
                            </CapacityContainer>
                        </div>
                        <GraphContainer>
                            {

                                <div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginLeft: 30,
                                        marginRight: 30,
                                        paddingTop: 25
                                    }}>
                                        <div style={{alignSelf: 'center', width: '40%'}}>
                                            <p>{selectValue.material_name} 불량률</p>
                                        </div>
                                        <CalendarDropdown type={'range'} selectRange={selectDate}
                                                          onClickEvent={(start, end) => setSelectDate({
                                                              start: start,
                                                              end: end ? end : ''
                                                          })} toDayLimit={true}></CalendarDropdown>
                                    </div>
                                    <ReactApexChart options={{...chartOption, labels: [' ', ...labels, '(일/day)']}}
                                                    type={'area'} height={444} width={630}
                                                    series={[{name: 'data', data: series}]}/>
                                </div>
                            }
                        </GraphContainer>
                    </div>
                    :
                    null
            }
        </OvertonTable>
    )
}

const CapacityContainer = Styled.div`
  width: 391px;
  height: 82px;
  border-radius: 6px;
  background-color: #202020;
  div{
    width: 190px;
    height: 80px;
    float: left;
    display: inline-block;
    &:first-child{
            border-right: 1px solid #ffffff;
            }
    p {
        font-family: NotoSansCJKkr-Bold;
        font-size: 42px;
         &:first-child{
            font-size: 15px;
            }
    }
  }
`

const LineContainer = Styled.div`
  margin-bottom: 20px;
  width: 391px;
  height: 100px;
  border-radius: 6px;
  background-color: #202020;
  p{
    font-family: NotoSansCJKkr-Bold;
    font-size: 40px;
    padding: 12px 20px 32px 20px;
     &:first-child{
           margin-top: 20px;
           font-size: 15px;
            }          
     span {
        font-size: 24px;
        font-family: NotoSansCJKkr-Bold;
    }
  }
`


const GraphContainer = Styled.div`
  margin-left: 20px;
  width: 650px;
  height: 522px;
  border-radius: 6px;
  background-color: #202020;
  p {
    font-size: 20px;
    font-family: NotoSansCJKkr-Bold;
    &:first-child{
            font-size: 15px;
            }
  }
  .apexcharts-tooltip{
        color: black;
    }
`

export default DefectiveContainer
