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
import InputContainer from '../../Containers/InputContainer'
import HistoryPickerModal from '../../Components/Modal/HistoryPickerModal'
import DateAndTimeBox from '../../Components/Box/DateAndTimeBox'

interface DateListArray {
    date: string,
    run_time: string,
    stop_time: string,
    spm: string,
    preset_counter: string
}

interface DateMax {
    max: number,
    firstDayMax: number,
    lastDayMax: number
}

// key-in 등록, 업데이트
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
    const [dateArray, setDateArray] = useState<DateListArray[]>([]);
    const [max, setMax] = useState<DateMax>({max: 0, firstDayMax: 0, lastDayMax: 0});

    useEffect(() => {
        if (pk !== undefined) {
            setIsUpdate(true);
            getData();
        }
    }, [])

    const getDateArray = (period) => {
        if(!period) {
            return [];
        }
        const date1 = period.split('~')[0].split(' ')[0];
        const date2 = period.split('~')[1].split(' ')[0];
    
        const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
       if(!(regex.test(date1) && regex.test(date2))) return [];
       let workingPeriod:DateListArray[] = [];
       let curDate = new Date(date1);
       while(curDate <= new Date(date2)) {
          workingPeriod.push({
                date: curDate.toISOString().split("T")[0],
                run_time: '00:00:00',
                stop_time: '00:00:00',
                spm: '',
                preset_counter: ''
            });
          curDate.setDate(curDate.getDate() + 1);
       }
       return workingPeriod;
    }
    
    const getTotalTime = (period, type) => {
        const date1 = period.split('~')[0].split(' ')[0].split('-');
        const date2 = period.split('~')[1].split(' ')[0].split('-');
    
        const dateTime1 = period.split('~')[0].split(' ')[1].split(':');
        const dateTime2 = period.split('~')[1].split(' ')[1].split(':');
    
        const startDate = new Date(date1[0], date1[1], date1[2], dateTime1[0], dateTime1[1]);
        const endDate = new Date(date2[0], date2[1], date2[2], dateTime2[0], dateTime2[1]);
    
        const elapsedTime = (endDate.getTime() - startDate.getTime()) / 1000;
    
        return type === 'max' ? elapsedTime : type === 'first' ? 86400 - secondForm(`${dateTime1[0]}:${dateTime1[1]}:00`) : secondForm(`${dateTime2[0]}:${dateTime2[1]}:00`)
    }
    
    const secondForm = (time) => {
        const dateTime = time.split(':');
    
        const second = Number(dateTime[0])*3600 + Number(dateTime[1])*60 + Number(dateTime[2]);
    
        return second;
    }
    
    const minusForm = (list) => {
        let number = 0;
        list.map((data) => {
            number = number + secondForm(data.run_time) + secondForm(data.stop_time);
        })
    
        return number;
    }

    const getData = useCallback(async () => {
        if (pk === undefined) return;

        const tempUrl = `${API_URLS['keyin'].load}?pk=${pk}`
        const res = await getBasicList(tempUrl)

        if (res) {
            const data = res;
            
            setSelectHistory({
                amount: data.amount,
                machine_pk: data.machine_pk,
                machine_name: data.machine_name,
                material_name: data.material_name,
                pk: data.history_pk,
                process_name: data.process_name,
                scheduled: data.work_time,
                total_defects: data.defect_count,
                worked: data.work_time,
                worker_name: data.worker
            });

            setDateArray(data.work_contents.sort(date_ascending));
            setMax({max: getTotalTime(data.work_time, 'max'), firstDayMax: getTotalTime(data.work_time, 'first'), lastDayMax: getTotalTime(data.work_time, 'last')});
        }
    }, [selectHistory, dateArray, pk, max])

    const onsubmitFormUpdate = useCallback(async () => {
        const data = {
            pk: pk,
            history_pk: selectHistory?.pk,
            machine_pk: selectHistory?.machine_pk,
            work_contents: dateArray
        }
        
        const tempUrl = `${API_URLS['keyin'].update}`
        const res = await registerBasicItem(tempUrl, data)

        if (res) {
            history.push('/pm/keyin/list')
        }
    }, [selectHistory, dateArray])

    const onsubmitForm = useCallback(async () => {
        if (selectHistory === undefined) {
            alert('작업이력은 필수 항목입니다. 반드시 선택해주세요');
        } else if(dateArray.filter(f => f.spm === '' || Number(f.spm) === 0).length > 0) {
            alert('SPM은 필수 항목입니다. 반드시 입력해주세요');
        } else if(dateArray.filter(f => f.preset_counter === '' || Number(f.preset_counter) === 0).length > 0) {
            alert('프리셋 카운터는 필수 항목입니다. 반드시 입력해주세요');
        } else {
            const data = {
                history_pk: selectHistory?.pk,
                machine_pk: selectHistory?.machine_pk,
                work_contents: dateArray
            }

            const tempUrl = `${API_URLS['keyin'].create}`
            const res = await registerBasicItem(tempUrl, data)

            if (res) {
                history.push('/pm/keyin/list')
            }
        }
    }, [selectHistory, dateArray])
    
    const date_ascending = (a, b) => {
        var dateA = new Date(a['date']).getTime();
        var dateB = new Date(b['date']).getTime();
        return dateA > dateB ? 1 : -1;
    };
    
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
                                        setDateArray(getDateArray(e.worked));
                                        setMax({max: getTotalTime(e.worked, 'max'), firstDayMax: getTotalTime(e.worked, 'first'), lastDayMax: getTotalTime(e.worked, 'last')});
                                    } else {
                                        setSelectHistory(undefined);
                                        setDateArray([]);
                                        setMax({max: 0, firstDayMax: 0, lastDayMax: 0});
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

                                {
                                   dateArray.length > 0 &&
                                    <>
                                        {
                                            dateArray.map((data, index) => (
                                                <DateAndTimeBox
                                                    key={`${data.date}${index}`} 
                                                    max={
                                                        index === 0 
                                                        ? max.firstDayMax > max.max - minusForm(dateArray.filter(f => f.date !== data.date)) 
                                                          ? max.max - minusForm(dateArray.filter(f => f.date !== data.date))
                                                          : max.firstDayMax
                                                        : index === dateArray.length - 1
                                                          ? max.lastDayMax > max.max - minusForm(dateArray.filter(f => f.date !== data.date))
                                                            ? max.max - minusForm(dateArray.filter(f => f.date !== data.date))
                                                            : max.lastDayMax
                                                          : 86400 > max.max - minusForm(dateArray.filter(f => f.date !== data.date))
                                                            ? max.max - minusForm(dateArray.filter(f => f.date !== data.date))
                                                            : 86400
                                                    }
                                                    data={data} 
                                                    onChangeEvent={(e) => {
                                                        const filter = dateArray.filter(f => f.date !== data.date);
                                                        setDateArray([...filter, e].sort(date_ascending));
                                                    }} /> 
                                            ))
                                        }
                                    </>
                                }
                            </>
                        }
                        <EmptyPlace height={'20px'} />

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

export default PressKeyinRegister;