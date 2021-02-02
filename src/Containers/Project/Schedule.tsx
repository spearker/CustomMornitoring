import React, {useCallback, useEffect, useState,} from 'react'
import Styled from 'styled-components'
import OvertonTable from '../../Components/Table/OvertonTable'
import LineTable from '../../Components/Table/LineTable'
import {API_URLS, getProjectList, postProjectDelete} from '../../Api/mes/production'
import FactoryBox from '../../Components/Box/FactoryBox'
import VoucherDropdown from '../../Components/Dropdown/VoucherDropdown'
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import next from '../../Assets/Images/ic_next_process.png'
import Notiflix from 'notiflix'
import OptimizedLineTable from '../../Components/Table/OptimizedLineTable'

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

Notiflix.Loading.Init({svgColor: '#1cb9df',})

const ScheduleContainer = () => {
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })
  const [detailPage, setDetailPage] = useState<PaginationInfo>({
    current: 1,
  })
  const [list, setList] = useState<any[]>([])
  const [titleEventList, setTitleEventList] = useState<any[]>([])
  const [detailTitleEventList, setDetailTitleEventList] = useState<any[]>([])
  const [deletePk] = useState<({ pk: string[] })>({pk: []})
  const [eventList, setEventList] = useState<any[]>([])
  const [detailList, setDetailList] = useState<{ chit_list: any[], name: string, process: any[], state: boolean }>({
    chit_list: [],
    name: '',
    process: [],
    state: false
  })
  const [selectDate, setSelectDate] = useState({
    start: moment().startOf('month').format('YYYY-MM-DD'),
    end: moment().endOf('month').format('YYYY-MM-DD')
  })
  const [index, setIndex] = useState({manager_name: '계획자명'})
  const [voucherDropdown, setVoucherDropdown] = useState<string>('')
  const [voucherDropdown2, setVoucherDropdown2] = useState<string>('')
  const [saveKeyword, setSaveKeyword] = useState<string>('')
  const [voucherIndex, setVoucherIndex] = useState({registerer_name: '등록자'})
  const [voucherList, setVoucherList] = useState<any[]>([])
  const [contentsList, setContentsList] = useState<any[]>(['계획자명', '생산 품목명', '납품 업체명'])
  const [option, setOption] = useState<number>(0)
  const [searchValue, setSearchValue] = useState<any>('')
  const [selectPk, setSelectPk] = useState<any>(null)
  const [isFirst, setIsFirst] = useState<boolean>(false)
  let sendPk = ''
  const [selectMaterial, setSelectMaterial] = useState<any>(null)
  const [selectValue, setSelectValue] = useState<any>(null)
  const history = useHistory()


  const indexList = {
    schedule: {
      project_name: '생산계획명',
      manager_name: '계획자',
      material_name: '품목(품목명)',
      schedule: '일정',
      supplier_name: '납품 업체',
      amount: '목표수량',
      state: '현황'
    }
  }

  const detailDummy = [
    {
      machine_name: '기계명',
      mold_name: '금형명',
      input_material: '입력 자재(품목)명',
      output_material: '출력 자재(품목)명'
    }
  ]

  const titleeventdummy = [
    {
      Name: '등록하기',
      Width: 90,
      Link: () => history.push('/project/production/register')
    },
    // {
    //     Name: '수정',
    // },
    {
      Name: '삭제',
      Link: () => Notiflix.Confirm.Show('경고', '데이터를 삭제하면 기존 데이터는 롤백됩니다. 그래도 삭제하시겠습니까?', '확인', '취소', () => postDelete(), () => {
      })
    }
  ]

  const eventdummy = [
    {
      Name: '수정',
      Width: 80,
      buttonWidth: 60,
      Color: 'white',
      Link: (v) => history.push(`/project/production/register/${v.pk}`)
    },
  ]

  const detailTitleEvent = [
    {
      Name: '생산 계획 배포',
      Width: 130,
      Link: () => getDistribute()
    }
  ]

  const arrayDelete = () => {
    while (true) {
      deletePk.pk.pop()
      if (deletePk.pk.length === 0) {
        break
      }
    }
  }

  const allCheckOnClick = useCallback((list) => {
    let tmpPk: string[] = []

    {
      list.length === 0 ?
        arrayDelete()
        :
        list.map((v, i) => {
          arrayDelete()

          if (deletePk.pk.indexOf(v.pk) === -1) {
            tmpPk.push(v.pk)
          }

          tmpPk.map((vi, index) => {
            if (deletePk.pk.indexOf(v.pk) === -1) {
              deletePk.pk.push(vi)
            }
          })

          if (tmpPk.length < deletePk.pk.length) {
            deletePk.pk.shift()
          }


        })
    }
  }, [deletePk])

  const checkOnClick = useCallback((Data) => {
    let IndexPk = deletePk.pk.indexOf(Data.pk)
    {
      deletePk.pk.indexOf(Data.pk) !== -1 ?
        deletePk.pk.splice(IndexPk, 1)
        :
        deletePk.pk.push(Data.pk)
    }
  }, [deletePk])

  const voucherIndexList = {
    schedule: {
      registerer_name: '등록자',
      deadline: '납기일',
      goal: '목표 수량',
      current_amount: '작업 수량',
    }
  }

  const AddComma = (num) => {
    let tmpNum = num.toString().split('.')
    let regexp = /\B(?=(\d{3})+(?!\d))/g
    return tmpNum[0].replace(regexp, ',') + (tmpNum[1] ? `.${tmpNum[1]}` : '')
  }

  const optionChange = useCallback(async (filter: number) => {
    setOption(filter)
    getList(filter, true)
    setSearchValue('')
    setSaveKeyword('')
  }, [option, searchValue, page, saveKeyword])

  const calendarOnClick = useCallback(async (start, end) => {
    setSelectDate({start: start, end: end ? end : ''})
    const tempUrl = `${API_URLS['production'].list}?from=${start}&to=${end}&page=1&keyword=${saveKeyword}&limit=5&type=${option}`
    const res = await getProjectList(tempUrl)
    if (res) {
      const getprocesses = res.info_list.map((v, i) => {

        const amount = AddComma(v.amount)
        const statement = v.state ? '배포됨' : '배포전'

        return {...v, state: statement, amount: amount}
      })

      setPage({current: res.current_page, total: res.total_page})
      setList(getprocesses)
    }
  }, [selectDate, page, searchValue, option, saveKeyword])

  const voucherOnClick = useCallback((voucher) => {
    if (voucher === 1) {
      voucherDropdown === '123' ?
        setVoucherDropdown('')
        :
        setVoucherDropdown('123')
    } else {
      voucherDropdown2 === '123' ?
        setVoucherDropdown2('')
        :
        setVoucherDropdown2('123')
    }
  }, [voucherDropdown, voucherDropdown2])

  const onClick = useCallback((segment) => {
    setDetailPage({...detailPage, current: 1})
    if (segment.pk === selectPk) {
      setSelectPk(null)
      sendPk = ''
      setSelectMaterial(null)
      setSelectValue(null)
    } else {
      setSelectPk(segment.pk)
      sendPk = segment.pk
      setSelectMaterial(segment.material_name)
      setSelectValue(segment)
      //TODO: api 요청
      return getData(segment.pk)
    }
  }, [selectPk, selectMaterial, selectValue])


  const getData = useCallback(async (pk) => {
    //TODO: 성공시
    const tempUrl = `${API_URLS['production'].dropdown}?pk=${pk}&page=${detailPage.current}&limit=15`
    const res = await getProjectList(tempUrl)
    if (res) {
      setDetailList(res)
      const getSchedule = res.chit_list.info_list.map((v, i) => {
        const current_amount = AddComma(v.current_amount)
        const goal = AddComma(v.goal)
        return {...v, current_amount: current_amount, goal: goal}
      })
      setDetailPage({current: res.chit_list.current_page, total: res.chit_list.total_page})
      setVoucherList(getSchedule)
    }
  }, [selectPk, detailList, detailPage])

  const getList = async (filter?: number, isSearch?: boolean) => { // useCallback
    //TODO: 성공시
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['production'].list}?from=${selectDate.start}&to=${selectDate.end}&page=${isSearch ? 1 : page.current}&keyword=${filter !== undefined ? '' : saveKeyword}&limit=5&type=${filter !== undefined ? filter : option}`
    const res = await getProjectList(tempUrl)
    if (res) {
      const getprocesses = res.info_list.map((v, i) => {

        const amount = AddComma(v.amount)
        const statement = v.state ? '배포됨' : '배포전'

        return {...v, state: statement, amount: amount}
      })
      setIsFirst(true)
      setSelectPk(null)
      setPage({current: res.current_page, total: res.total_page})
      setList([...getprocesses])
    }
    Notiflix.Loading.Remove()
  }


  useEffect(() => {
    if (isFirst) {
      getList()
    }
  }, [page.current])


  useEffect(() => {
    if (isFirst) {
      getList(undefined, true)
    }
  }, [saveKeyword])

  useEffect(() => {
    if (selectPk) {
      getData(selectPk)
    }
  }, [detailPage.current])

  const getDistribute = async () => {
    //TODO: 성공시

    const tempUrl = `${API_URLS['production'].distribute}?pk=${sendPk}`
    const res = getProjectList(tempUrl).then((res) => {
      if (res)
        window.location.reload()
    })

  }

  const postDelete = useCallback(async () => {
    if (deletePk.pk.length <= 0) {
      alert('삭제하실 항목을 선택해 주세요.')
      return
    }
    const tempUrl = `${API_URLS['production'].delete}`
    const res = await postProjectDelete(tempUrl, deletePk)

    arrayDelete()
    getList().then(() => Notiflix.Loading.Remove())
  }, [deletePk])


  // const resetDeletePk = useCallback(()=>{
  //   const tempDeletePk = {...deletePk,pk:[]}
  //   console.log('@@ tempDeletePk : ',tempDeletePk)
  //   setDeletePk(tempDeletePk)
  // },[deletePk])


  useEffect(() => {
    getList()
    setIndex(indexList['schedule'])
    // setList(dummy)
    setEventList(eventdummy)
    setTitleEventList(titleeventdummy)
    setDetailTitleEventList(detailTitleEvent)
    // setDetailList(detaildummy)
    setVoucherIndex(voucherIndexList['schedule'])
    // setVoucherList(voucherdummy)
  }, [])

  return (
    <div>
      <OvertonTable
        title={'생산 계획 리스트'}
        dropDownContents={contentsList}
        dropDownOption={option}
        dropDownOnClick={optionChange}
        searchValue={searchValue}
        searchButtonOnClick={() => setSaveKeyword(searchValue)}
        searchBarChange={(e) => {
          if (!e.match(regExp)) setSearchValue(e)
        }}
        selectDate={selectDate}
        EventList={eventList}
        calendarOnClick={calendarOnClick}
        titleOnClickEvent={titleEventList}
        allCheckOnClickEvent={allCheckOnClick}
        indexList={index}
        valueList={list}
        widthList={[200, 80, 200, 180, 250, 100, 80]}
        alignList={['center', 'center', 'center', 'center', 'center']}
        clickValue={selectValue}
        checkOnClickEvent={checkOnClick}
        mainOnClickEvent={onClick}
        currentPage={page.current}
        totalPage={page.total}
        pageOnClickEvent={(event, i) => setPage({...page, current: i})}
        calendarState={true}>
        {
          selectPk !== null ?
            <LineTable title={selectMaterial} titleOnClickEvent={detailTitleEventList}>
              <VoucherDropdown pk={'123'} name={'생산 계획 공정'} onClickEvent={() => voucherOnClick(1)}
                               clickValue={voucherDropdown}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}>
                  {detailList.process.length !== 0 ?
                    detailList.process.map((v, i) => {
                      if (detailList.process.length === i + 1) {
                        return (
                          <>
                            <FactoryBox title={v.process_name}
                                        inputMaterial={[...v.input_materials]}
                                        productionMaterial={v.output_materials}/>
                          </>)
                      } else {
                        console.log(v)
                        return (
                          <>
                            <FactoryBox title={v.process_name}
                                        inputMaterial={v.input_materials}
                                        productionMaterial={v.output_materials}/>
                            <img src={next}
                                 style={{
                                   width: 47,
                                   height: 17,
                                   marginLeft: 20,
                                   marginTop: 135,
                                   marginRight: 20
                                 }}/>
                          </>)
                      }
                    })
                    :
                    <p style={{
                      marginTop: 20,
                      width: '100%',
                      textAlign: 'center',
                      fontFamily: 'NotoSansCJKkr-Bold',
                      fontSize: '17px'
                    }}>조회 가능한 데이터가 없습니다.</p>
                  }
                </div>
              </VoucherDropdown>
              <VoucherDropdown pk={'123'} name={'전표 리스트'} onClickEvent={() => voucherOnClick(2)}
                               clickValue={voucherDropdown2}>
                <div style={{paddingTop: 20}}>
                  <OptimizedLineTable contentTitle={voucherIndex} contentList={voucherList}
                                      widthList={[300, 300, 300, 300]}
                                      pageOnClickEvent={(event, i) => setDetailPage({
                                        ...detailPage,
                                        current: i
                                      })}
                                      currentPage={detailPage.current} totalPage={detailPage.total}>
                    <Line/>
                  </OptimizedLineTable>
                </div>
              </VoucherDropdown>
            </LineTable>
            :
            null
        }
      </OvertonTable>
    </div>
  )
}

const Line = Styled.hr`
    margin: 10px 20px 12px 0px;
    border-color: #353b48;
    height: 1px;
    background-color: #353b48;
`

export default ScheduleContainer
