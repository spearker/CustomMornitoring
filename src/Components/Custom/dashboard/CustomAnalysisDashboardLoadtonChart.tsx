import React, {useEffect, useState} from 'react'
import InnerBodyContainer from '../../../Containers/InnerBodyContainer'
import Styled from 'styled-components'
import CustomLoadTon from '../loadton/CustomLoadtonCard'
import CustomMainMotorAngulargaugeChart from '../../../Containers/Custom/dashboard/CustomMainMotorAngulargaugeChart'
import CustomSlideMotorAngulargaugeChart from '../../../Containers/Custom/dashboard/CustomSlideMotorAngulargaugeChart'
import getYoodongDashboard from '../../../Api/custom/getYoodongDashboard'
import {YOUDONG_PRESS_CUSTOM_TYPE} from '../../../Common/@types/youdong'
import CustomMonitoringCard from '../loadton/CustomMonitoringCard'
import Modal from 'react-modal'
import {RotateSpinner} from 'react-spinners-kit'
import {useHistory} from 'react-router-dom'
import CustomAnalysisMonitoringCard from "../loadton/CustomAnalysisMonitoringCard";
import CustomAnalysisLoadTon from "../loadton/CustomAnalysisLoadtonCard";


interface Props {
    id: string
    first?: {
        loading: boolean,
        api: boolean
    }
}

const CustomAnalysisDashboardLoadtonChart: React.FunctionComponent<Props> = ({id, first}) => {
    const [isFirst, setIsFirst] = React.useState({
        loading: true,
        api: true
    })
    const [data, setData] = React.useState<YOUDONG_PRESS_CUSTOM_TYPE>()
    const [tonnageLimit, setTonnageLimit] = useState<number>()

    const history = useHistory()

    const getYoudongCustomDashboardData = async () => {
        if (id && first) {
            try {
                const response = await getYoodongDashboard(id, first.api)

                if (response !== null) {
                    if (response.status === 401) {
                        return history.push('/login?type=back')
                    } else if (response.status === 200) {
                        setData(response.data)

                        if (first.api) {
                            setTonnageLimit(response.data.loadton_data.tonnage_limit)

                            setIsFirst({
                                loading: false,
                                api: false
                            })
                        }
                    } else {
                        setTimeout(() => {
                            getYoudongCustomDashboardData()
                        }, 1000)
                    }
                }
            } catch (error) {
                console.log('catched error', error)
            }
        } else {
            try {
                const response = await getYoodongDashboard(id, isFirst.api)

                if (response !== null) {
                    if (response.status === 401) {
                        return history.push('/login?type=back')
                    } else if (response.status === 200) {
                        setData(response.data)

                        if (isFirst.api) {
                            setTonnageLimit(response.data.loadton_data.tonnage_limit)

                            setIsFirst({
                                loading: false,
                                api: false
                            })
                        }
                    } else {
                        setTimeout(() => {
                            getYoudongCustomDashboardData()
                        }, 1000)
                    }
                }
            } catch (error) {
                console.log('catched error', error)
            }
        }
    }

    useEffect(() => {
        const documentEvent: any = document

        documentEvent.body.style.zoom = .7
    }, [])


    useEffect(() => {
        const dashboard = setInterval(getYoudongCustomDashboardData, 1000)
        return () => {
            clearTimeout(dashboard)
        }
    }, [data])

    const Header = () => {
        return (
            <div style={{paddingTop: 50, paddingLeft: 10, marginBottom: 20}}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TitleText
                        style={{fontSize: 72}}>{data ? data.press_data.name + `(${tonnageLimit}t)` : '-'}</TitleText>
                </div>
            </div>
        )
    }

    const standardInfItem = (key: string, value: string, containerStyle?: object, fontValueStyle?: object, textColor?: string) => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 auto',
                fontWeight: 'bold',
                width: '70%',
                opacity: .8,
                marginBottom: 5,
                ...containerStyle,
            }}>
                <p style={{
                    textAlign: 'left',
                    fontSize: 48,
                    fontWeight: 'bold',
                    fontFamily: 'NotoSansCJKkr',
                    color: textColor ? textColor : 'white'
                }}>{key}</p>
                <TitleText
                    style={{
                        fontSize: 60,
                        ...fontValueStyle,
                        color: textColor ? textColor : 'white'
                    }}>{value}</TitleText>

            </div>
        )
    }

    const overTonCheck = () => {
        if (tonnageLimit) {
            if (data) {
                return data.loadton_data.total_ton > tonnageLimit ? tonnageLimit : 0
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const standardInfo = () => {
        return (
            <div style={{
                position: 'absolute',
                top: '25%',
                left: '17%',
                width: 900,
                display: 'flex',
                flexDirection: 'column',
            }}>
                {standardInfItem('Total', data ? Math.round(Number(data?.loadton_data.total_ton) * 10) / 10 + 't' : '-', {opacity: overTonCheck() ? 1 : .9,}, {fontSize: 72}, overTonCheck() ? '#ed4337' : '#fb9e70')}
                {standardInfItem('CH1 (좌)', data ? Math.round(Number(data?.loadton_data.ch1_ton) * 10) / 10 + 't' : '-', {marginBottom: 20}, {fontSize: 48}, '#3ad8c5')}
                {standardInfItem('CH2 (우)', data ? Math.round(Number(data?.loadton_data.ch2_ton) * 10) / 10 + 't' : '-', {}, {fontSize: 48}, '#5145c6')}
                {standardInfItem('일량', data ? Math.floor(data.loadton_data.press_power) + 'kgf.m' : '-', {
                    opacity: 1,
                    marginTop: 20
                }, {fontSize: 84}, pct === 0 ? '#fff' : (1 / pct >= 0 && 1 / pct < 0.5 ? '#fff' : (1 / pct >= 0.5 && 1 / pct < 0.8 ? 'green' : 'red')))}
            </div>
        )
    }

    const pct = Number(data?.loadton_data.total_ton) === 0 ? 0 : Number(tonnageLimit) / Number(data?.loadton_data.total_ton)

    const errorCodeFilter = () => {
        let style: { color: string, opacity: string } = {
            color: 'white',
            opacity: '.7'
        }

        if (data) {
            if (data.press_data.error_code.code !== '0')
                style = {
                    color: '#ed4337',
                    opacity: '1'
                }
        }

        return style
    }

    return (
        <React.Fragment>
            {
                isFirst.loading && <Modal
                    isOpen={isFirst.loading}
                    style={{
                        content: {
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            border: 'none',
                            top: '45%',
                            left: '50%',
                            right: 'auto',
                            width: 300,
                            height: 300,
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            padding: 100
                        },
                        overlay: {
                            background: 'rgba(0,0,0,.6)',
                            zIndex: 5
                        }
                    }}
                >
                    <div>
                        <RotateSpinner size={208} color={'rgba(255, 255, 255, .8)'} loading={isFirst.loading}/>
                    </div>
                </Modal>
            }
            <InnerBodyContainer styles={{
                width: '100%',
                height: '100%',
                marginLeft: '0',
                marginRight: '0'
            }}>
                {Header()}
                <ItemBox>
                    <div style={{display: 'flex'}}>
                        <div style={{
                            width: '13%',
                            paddingTop: 60,
                            paddingLeft: 20,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{
                                marginBottom: data ? data.press_data.error_code.code === '0' ? 20 : 100 : 20,
                                wordBreak: 'break-all'
                            }}>
                                <div style={{textAlign: 'center'}}>
                                    <Title>에러코드</Title>
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    <SubTitle
                                        style={errorCodeFilter()}>{data ? data.press_data.error_code.code === '0' ? '-' : data?.press_data.error_code.type : '-'}</SubTitle>
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: 300,
                                }}>
                                    <CustomMainMotorAngulargaugeChart value={data?.press_data.main_motor_current}/>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center', height: 330, marginTop: 50}}>
                                    <CustomSlideMotorAngulargaugeChart value={data?.press_data.slide_motor_current}/>
                                </div>
                                <div style={{justifyContent: 'center', height: 100, marginTop: 50}}>
                                    <div style={{textAlign: 'center'}}>
                                        <p style={{
                                            fontSize: "48px",
                                            fontWeight: 'bold',
                                            fontFamily: 'NotoSansCJKkr'
                                        }}>UPH</p>
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        <p style={{
                                            fontSize: "48px",
                                            fontWeight: 'bold',
                                            fontFamily: 'NotoSansCJKkr',
                                            marginTop: 50
                                        }}>{data?.press_data?.UPH}</p>
                                    </div>
                                </div>
                                {/*<div style={{display: 'flex', justifyContent: 'center', height: 300,}}>*/}
                                {/*    <CustomMaxUPHAngulargaugeChart maxValue={data?.press_data.max_UPH}*/}
                                {/*                                   value={Number(data?.press_data.UPH)}/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div style={{
                            width: '70%',
                        }}>
                            <CustomAnalysisLoadTon color={0} propData={data ? data.loadton_data : undefined}
                                                   overTonCheck={overTonCheck}
                                                   styles={{width: '100%', height: '50%'}}
                                                   tonnage_limit={tonnageLimit ? tonnageLimit : 0}/>
                            {standardInfo()}
                        </div>
                        <div style={{width: '13%',}}>
                            <CustomAnalysisMonitoringCard contents={data && data.press_data}/>
                        </div>
                    </div>
                </ItemBox>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
                    <div style={{display: 'flex'}}>
                        <p style={{
                            fontSize: "72px",
                            fontWeight: 'bold',
                            fontFamily: 'NotoSansCJKkr',
                            marginRight: '100px'
                        }}>금형명
                            : {data?.press_data?.mold_name}</p>
                        <p style={{fontSize: "72px", fontWeight: 'bold', fontFamily: 'NotoSansCJKkr'}}>품목명
                            : {data?.press_data?.material_name}</p>
                    </div>
                </div>
            </InnerBodyContainer>
            }

        </React.Fragment>
    )
}

const Title = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 48px;
  font-weight: bold;
`

const SubTitle = Styled.span`
  font-family: NotoSansCJKkr;
  font-size: 46px;
  opacity: .7;
  font-weight: bold;
`


const ItemBox = Styled.div`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`

const TitleText = Styled.p`
font-family: NotoSansCJKkr;
    text-align: center;
    font-weight: bold;
    font-size: 42px;
`

export default CustomAnalysisDashboardLoadtonChart

