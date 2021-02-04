import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import Modal from 'react-modal'
import {RotateSpinner} from 'react-spinners-kit'
import {useHistory} from 'react-router-dom'
import Notiflix from 'notiflix'
import {API_URLS, getLoadTonList} from "../../../Api/pm/monitoring";
import {changeStatusToColor, changeStatusToString} from "../../../Common/statusFunctions";
import PressStatusBox from "../PM_Monitoring/PressStatusBox";
import autoCustomType from "../../../AutoCustomSetting/autoCustomConfig";
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface Props {
    id: string
    first?: {
        loading: boolean,
        api: boolean
    }
    check?: boolean
    onChange?: () => void
}

Notiflix.Notify.Init({
    width: '400px',
    height: '300px',
    fontSize: '26px',
    fontFamily: 'NotoSansCJKkr-Bold',
    messageColor: '#000000'
})


const AntSwitch = withStyles((theme) => ({
    root: {
        width: 40,
        height: 22,
        padding: 0,
        display: 'flex',
        overflow: 'unset'
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 20,
        height: 20,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 12,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

const CustomAnalysisDashboardPressStatus: React.FunctionComponent<Props> = ({id, first, check, onChange}) => {
    const AddComma = (num) => {
        let tmpNum = num.toString().split('.')
        let regexp = /\B(?=(\d{3})+(?!\d))/g
        return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
    }
    const [isFirst, setIsFirst] = React.useState({
        loading: true,
        api: true
    })
    const [list, setList] = useState<any[]>([])

    const history = useHistory()

    const getYoudongCustomDashboardData = async () => {
        if (id && first) {
            try {
                const tempUrl = `${API_URLS['press'].slide}?number=${id}`
                const response = await getLoadTonList(tempUrl)

                if (response) {

                    setList(response.info_list)

                    if (first.api) {
                        setIsFirst({
                            loading: false,
                            api: false
                        })
                    } else {
                        setTimeout(() => {
                            getYoudongCustomDashboardData()
                        }, 5000)
                    }
                }
            } catch (error) {
                console.log('catched error', error)
            }
        } else {
            try {
                const tempUrl = `${API_URLS['press'].slide}?number=${id}`
                const response = await getLoadTonList(tempUrl)

                if (response) {
                    setList(response.info_list)

                    if (isFirst.api) {

                        setIsFirst({
                            loading: false,
                            api: false
                        })
                    } else {
                        setTimeout(() => {
                            getYoudongCustomDashboardData()
                        }, 5000)
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
        const dashboard = setInterval(getYoudongCustomDashboardData, 5000)
        return () => {
            clearTimeout(dashboard)
        }
    }, [list])

    return (
        <div>
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
            <ListBox>
                {autoCustomType() === 'hwain_trans' || autoCustomType() === 'jaewoo_material_trans' || autoCustomType() === 'teoul_trans' || autoCustomType() === 'atech_trans' || autoCustomType() === 'hangil_trans' || autoCustomType() === 'jeonghyun_trans' || autoCustomType() === 'daekwang_trans' || autoCustomType() === 'daeheung_trans' ?
                    <div style={{position: 'absolute', top: 15, right: 15}}>
                        <Typography component="div" style={{color: 'white', fontSize: '2rem'}}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>대시보드</Grid>
                                <Grid item>
                                    <AntSwitch checked={check} onChange={onChange} name="checkedC"/>
                                </Grid>
                                <Grid item>상태 모니터링</Grid>
                            </Grid>
                        </Typography>
                    </div>
                    :
                    <></>
                }
                {list === undefined ?
                    <p style={{color: 'white', fontSize: '30px', textAlign: 'center', width: '100%'}}>불러 올 수 있는 기계 정보가
                        없습니다.</p>
                    :
                    list.map((machineData, index) => (
                        <BoxContainer>
                            <div style={{display: 'flex'}}>
                                <MachineName>기계명 - {machineData.name}</MachineName>
                                <MaterialName>생산품목 - {machineData.material_name}</MaterialName>
                            </div>
                            <div style={{display: 'flex'}}>
                                <StatusBox style={{backgroundColor: changeStatusToColor(machineData.operation)}}>
                                    <p>{changeStatusToString(machineData.operation)}</p>
                                </StatusBox>
                                <div style={{height: '200px', display: 'flex', flexWrap: 'wrap',}}>
                                    <PressStatusBox title={'SPM'} value={machineData.spm} fontSize={'140px'} width={350}
                                                    height={450} titleFontSize/>
                                    <PressStatusBox title={'프리셋 카운터'} align={'center'} width={350} height={450}
                                                    value={autoCustomType() !== 'DS_trans' ? AddComma(machineData.preset_counter) + '\n/' + ` ${AddComma(machineData.preset_limit_counter)}` : AddComma(machineData.preset_counter)}
                                                    fontSize={'80px'} titleFontSize/>
                                    <PressStatusBox title={'종합 카운터'} width={350} height={450}
                                                    value={AddComma(machineData.total_counter)}
                                                    fontSize={'80px'} titleFontSize/>
                                    <PressStatusBox title={'기계 가동시간'} value={machineData.runtime} fontSize={'85px'}
                                                    width={350} height={450} titleFontSize/>
                                    <PressStatusBox title={'기계 비가동시간'} value={machineData.downtime} fontSize={'85px'}
                                                    width={350} height={450} titleFontSize/>
                                    <PressStatusBox title={'기계가동율'} value={`${machineData.percent}%`}
                                                    fontSize={'100px'} width={350} height={450} titleFontSize/>
                                    {autoCustomType() !== 'DS_trans' ?
                                        <>
                                            <PressStatusBox title={'금형명'} value={machineData.mold_name}
                                                            fontSize={'65px'} width={350} height={450} titleFontSize/>
                                            <PressStatusBox title={'생산 남은 시간'}
                                                            value={machineData.ETC === "-1" ? "∞" : machineData.ETC}
                                                            fontSize={'70px'} width={350} height={450} titleFontSize/>
                                        </>
                                        :
                                        <>
                                            <PressStatusBox title={'제품 규격'} value={''} fontSize={'30px'}
                                                            mold_spec={[machineData.material_spec_H, machineData.material_spec_W, machineData.material_spec_D]}
                                                            width={350} height={450} titleFontSize/>
                                            <PressStatusBox title={'금형명'} value={machineData.mold_name}
                                                            fontSize={'30px'} width={350} height={450} titleFontSize/>
                                        </>
                                    }
                                    <PressStatusBox title={'키캠상태'} value={machineData.keyCam} width={350} height={450}
                                                    titleFontSize
                                                    fontSize={machineData.keyCam === '안전 1행정' || machineData.keyCam === '슬라이드 조절' ? '50px' : '85px'}/>
                                    <PressStatusBox title={'생산수량'} width={350} height={450} titleFontSize
                                                    value={AddComma(machineData.production)}
                                                    fontSize={'75px'}/>
                                    <PressStatusBox title={'부하율'} value={`${machineData.load_factor}%`} width={350}
                                                    titleFontSize
                                                    height={450}
                                                    fontSize={'90px'}
                                                    titleColor={'#000000'}
                                                    valueColor={machineData.load_factor === 0 ? '#fff' : (machineData.load_factor < 50 ? '#fff' : (machineData.load_factor < 80 ? 'green' : 'red'))}/>
                                    <PressStatusBox title={'캐비티'} value={machineData.cavity} fontSize={'120px'}
                                                    width={350} height={450} titleFontSize/>
                                </div>
                            </div>
                            <ErrorMessage>{machineData.error === null || machineData.error === '' ? '' : `에러 - ${machineData.error}`}</ErrorMessage>
                        </BoxContainer>
                    ))
                }
            </ListBox>
        </div>
    )
}

const ListBox = Styled.div`
    position: fixed;
    overflow: auto;
    // -ms-overflow-style: none; /* IE and Edge */
    // scrollbar-width: none;
    // ::-webkit-scrollbar {
    //     display: none;
    // }
    background-image: linear-gradient(to right, #202e4a 0%, #0f1722 100%);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BoxContainer = Styled.div`
width: calc(100% - 300px);
height: calc(100% - 700px);
min-height: 1100px;
min-width: 2650px;
max-height: 746px;
max-width: 2300px;
border-radius: 6px;
background-color: #11131950;
padding: 8px;
font-weight: bold;
margin: 0 auto;
`

const MachineName = Styled.p`
font-family: NotoSansCJKkr;
font-size: 90px;
text-align: left;
color: #ffffff;
width: auto;
margin-right: 50px;
`

const MaterialName = Styled.p`
font-family: NotoSansCJKkr;
font-size: 90px;
text-align: left;
color: #ffffff;
width: auto;
`


const StatusBox = Styled.div`
width: 665px;
height: 928px;
border-radius: 6px;
margin-top: 10px;
margin-right: 25px;
justify-content: center;
display: flex;
align-items: center;
align-self:center;
p
{
    font-family:NotoSansCJKkr;
    font-size:150px;
    font-weight:bold;
     text-align: center;
}
`

const ErrorMessage = Styled.p`
padding-top: 8px;
font-family: NotoSansCJKkr;
font-size: 40px;
text-align: left;
color: red;
width: 904px;
`


export default CustomAnalysisDashboardPressStatus

