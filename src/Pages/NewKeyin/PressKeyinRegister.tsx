import React, { useCallback, useEffect, useState } from 'react'
import Styled from 'styled-components'
import { POINT_COLOR } from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import { useHistory } from 'react-router-dom'
import BigWhiteBoxContainer from '../../Containers/BigWhiteBoxContainer'
import InputHeader from '../../Components/Text/InputHeader'
import ColorInputWithText from '../../Components/Input/ColorInputWithText'
import EmptyPlace from '../../Components/Box/EmptyPlace'
import ManyButton from '../../Components/Button/ManyButton'
import { API_URLS, getBasicList, registerBasicItem } from '../../Api/mes/basic'
import TimeInput from '../../Components/Input/TimeInput'
import InputContainer from '../../Containers/InputContainer'
import HistoryPickerModal from '../../Components/Modal/HistoryPickerModal'

interface Time {
    totalWorkingTime: number,
    uptime: number,
    downtime: number,
    QDC: number,
    errortime: number
}

const regExp = (str) => {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    //특수문자 검증
    if (reg.test(str.replace(/(^0+)/, ""))) {
        //특수문자 제거후 리턴
        return str.replace(/(^0+)/, "").replace(reg, "");
    } else {
        //특수문자가 없으므로 본래 문자 리턴
        return str.replace(/(^0+)/, "");
    }
}

const numberPad = (n, width) => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

const timeForm = (second) => {
    const HH = Math.floor(Number(second) / 3600);
    const mm = Math.floor((Number(second) - HH * 3600) / 60);
    const ss = Number(second) - (HH * 3600 + mm * 60);

    return `${numberPad(HH, 2)}:${numberPad(mm, 2)}:${numberPad(ss, 2)}`;
}

const getTotalTime = (period) => {
    const date1 = period.split('~')[0].split(' ')[0].split('-');
    const date2 = period.split('~')[1].split(' ')[0].split('-');

    const dateTime1 = period.split('~')[0].split(' ')[1].split(':');
    const dateTime2 = period.split('~')[1].split(' ')[1].split(':');

    const startDate = new Date(date1[0], date1[1], date1[2], dateTime1[0], dateTime1[1]);
    const endDate = new Date(date2[0], date2[1], date2[2], dateTime2[0], dateTime2[1]);

    const elapsedTime = (endDate.getTime() - startDate.getTime()) / 1000;

    return elapsedTime
}

// 금형 등록, 업데이트
const PressKeyinRegister = ({ match }) => {

    const history = useHistory();
    const pk = match.params.pk;

    const [selectHistory, setSelectHistory] = useState<{
        amount: number
        machine_name: string
        machine_pk?: string
        material_name: string
        material_pk?: string
        pk: string
        scheduled?: string
        process_pk?: string
        process_name: string
        worked: string
        worker?: string
        worker_name: string
        total_defects?: number
    }>();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [spm, setSpm] = useState<'' | number>('');
    const [preset, setPreset] = useState<'' | number>('');
    const [time, setTime] = useState<Time>({
        totalWorkingTime: 0,
        uptime: 0,
        downtime: 0,
        QDC: 0,
        errortime: 0
    });

    useEffect(() => {
        if (pk !== undefined) {
            setIsUpdate(true);
            getData();
        }
    }, [])

    const getData = useCallback(async () => {
        if (pk === undefined) return;

        const tempUrl = `${API_URLS['keyin'].load}?pk=${pk}`
        const res = await getBasicList(tempUrl)

        if (res) {
            const data = res;
            
            setSelectHistory({
                amount: data.amount,
                machine_name: data.machine_name,
                material_name: data.material_name,
                pk: data.history_pk,
                process_name: data.process_name,
                scheduled: data.work_time,
                total_defects: data.defect_count,
                worked: data.work_time,
                worker_name: data.worker
            });
            setTime({
                totalWorkingTime: getTotalTime(data.work_time),
                uptime: data.run_time,
                downtime: data.stop_time,
                QDC: data.change_time,
                errortime: data.error_time
            });
            setSpm(data.spm);
            setPreset(data.preset_counter);

        }
    }, [selectHistory, time, spm, preset, pk])

    const onsubmitFormUpdate = useCallback(async () => {
        const data = {
            pk: pk,
            history_pk: selectHistory?.pk,
            run_time: timeForm(time.uptime),
            change_time: timeForm(time.QDC),
            error_time: timeForm(time.errortime),
            stop_time: timeForm(time.QDC + time.errortime),
            off_time: timeForm(time.totalWorkingTime - time.uptime - time.QDC - time.errortime),
            spm: String(spm),
            preset_counter: String(preset)
        }

        const tempUrl = `${API_URLS['keyin'].update}`
        const res = await registerBasicItem(tempUrl, data)

        if (res) {
            history.push('/pm/keyin/list')
        }
    }, [selectHistory, time, spm, preset, pk])

    const onsubmitForm = useCallback(async () => {
        if (selectHistory === undefined) {
            alert('작업이력은 필수 항목입니다. 반드시 선택해주세요');
        } else if (preset === 0 || preset === '') {
            alert('프리셋 카운터는 필수 항목입니다. 반드시 입력해주세요');
        } else if (spm === 0 || spm === '') {
            alert('SPM은 필수 항목입니다. 반드시 입력해주세요');
        } else {
            const data = {
                history_pk: selectHistory?.pk,
                run_time: timeForm(time.uptime),
                change_time: timeForm(time.QDC),
                error_time: timeForm(time.errortime),
                stop_time: timeForm(time.QDC + time.errortime),
                off_time: timeForm(time.totalWorkingTime - time.uptime - time.QDC - time.errortime),
                spm: String(spm),
                preset_counter: String(preset)
            }

            const tempUrl = `${API_URLS['keyin'].create}`
            const res = await registerBasicItem(tempUrl, data)

            if (res) {
                history.push('/pm/keyin/list')
            }
        }

    }, [selectHistory, time, spm, preset])

    return (
        <DashboardWrapContainer index={'basic'}>
            <InnerBodyContainer>
                <Header title={isUpdate ? '프레스 key-in 수정' : '프레스 key-in 등록'} />
                <BigWhiteBoxContainer>
                    <div>
                        <InputHeader title="필수 항목" />
                        <InputContainer title={'작업 이력'} width={133}>
                            <HistoryPickerModal keyinUrl={`${API_URLS['keyin'].historySearch}`} disabled={isUpdate} select={{ name: selectHistory?.worker_name, pk: selectHistory?.pk }}
                                onClickEvent={(e) => {

                                    if (e.worked) {
                                        setSelectHistory({ ...selectHistory, ...e });
                                        
                                        setTime({
                                            totalWorkingTime: getTotalTime(e.worked),
                                            uptime: 0,
                                            downtime: 0,
                                            QDC: 0,
                                            errortime: 0
                                        });
                                    } else {
                                        setSelectHistory(undefined);
                                        setTime({
                                            totalWorkingTime: 0,
                                            uptime: 0,
                                            downtime: 0,
                                            QDC: 0,
                                            errortime: 0
                                        })
                                    }
                                }}
                                text={'작업자명을 검색해주세요.'} buttonWid={30} isAllItem={true} outsideWidth={'calc(100% - 133px)'} width={'100%'} insideWidth={'calc(100% - 30px)'} textTop={3} />
                        </InputContainer>

                        {
                            selectHistory && selectHistory?.worked &&
                            <>
                                <ColorInputWithText title={'작업자'} value={selectHistory?.worker_name} readOnly
                                                    placeholder={'작업 이력을 선택해주세요'} />
                                <ColorInputWithText title={'공정명'} value={selectHistory?.process_name} readOnly
                                                    placeholder={'작업 이력을 선택해주세요'} />
                                <ColorInputWithText title={'품목(품목명)'} value={selectHistory?.material_name} readOnly
                                                    placeholder={'작업 이력을 선택해주세요'} />
                                <ColorInputWithText title={'기계'} value={selectHistory?.machine_name} readOnly
                                                    placeholder={'작업 이력을 선택해주세요'} />
                                <ColorInputWithText title={'총 생산량'} value={selectHistory?.amount} readOnly
                                                    placeholder={'작업 이력을 선택해주세요'} />
                                <ColorInputWithText title={'불량 개수'} value={selectHistory?.total_defects} readOnly
                                                    placeholder={'작업 이력을 선택해주세요'} />
                                <ColorInputWithText title={'작업 기간'} value={selectHistory?.worked} readOnly
                                                    placeholder={'작업 이력을 선택해주세요'} />

                                <TimeInput title={'총 작업시간'} readOnly onChangeEvent={(e) => setTime({ ...time, totalWorkingTime: e })}
                                           value={time.totalWorkingTime} />

                                <TimeInput title={'가동 시간'} onChangeEvent={(e) => setTime({ ...time, uptime: e })}
                                           value={time.uptime} max={time.totalWorkingTime - time.downtime} />
                                
                                <TimeInput title={'비가동 시간'} onChangeEvent={(e) => setTime({ ...time, downtime: e })}
                                           value={time.downtime} max={time.totalWorkingTime - time.uptime} min={time.QDC + time.errortime} />

                                <TimeInput title={'금형 교체 시간'} onChangeEvent={(e) => setTime({ ...time, QDC: e })}
                                           value={time.QDC} max={time.downtime - time.errortime} />

                                <TimeInput title={'에러 시간'} onChangeEvent={(e) => setTime({ ...time, errortime: e })}
                                           value={time.errortime} max={time.downtime - time.QDC} />

                                <TimeInput title={'off 시간'} readOnly value={time.totalWorkingTime - time.uptime - time.downtime} />
                            </>
                        }
                        <ColorInputWithText title={'SPM'} value={spm} onChangeEvent={(e) => setSpm(regExp(e))}
                                            placeholder={'SPM을 입력해주세요'} />

                        <ColorInputWithText title={'프리셋 카운트'} value={preset}
                                            onChangeEvent={(e) => {
                                                if (Number(e) <= 999999) setPreset(regExp(e));
                                            }} placeholder={'프리셋 카운트를 입력해주세요 (최대: 999,999)'} />

                        <EmptyPlace height={'40px'} />

                        <br />
                        {
                            isUpdate ?
                                <>
                                    <ManyButton
                                        nameList={['수정하기', '리스트 보기']}
                                        colorList={[{ text: '#666d79', bg: '#e7e9eb' }, {
                                            text: '#0d0d0d',
                                            bg: '#19b9df'
                                        }]}
                                        onClickEventList={[onsubmitFormUpdate, () => { history.push('/pm/keyin/list'); }]} />
                                </>
                                : <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <ButtonWrap onClick={async () => {
                                        await onsubmitForm()
                                    }}>
                                        <div style={{
                                            width: 360,
                                            height: 46,
                                            boxSizing: 'border-box',
                                            paddingTop: '9px'

                                        }}>
                                            <p style={{ fontSize: 18 }}>등록하기</p>
                                        </div>
                                    </ButtonWrap>
                                </div>
                        }
                    </div>
                </BigWhiteBoxContainer>
            </InnerBodyContainer>
        </DashboardWrapContainer>
    )
}

const ButtonWrap = Styled.button`
    border-radius: 5px;
     color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    width: 360px;
    height: 46px;
    box-sizing: border-box;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
`

export default PressKeyinRegister