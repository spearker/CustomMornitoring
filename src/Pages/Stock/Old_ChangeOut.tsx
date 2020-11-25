import React, {useCallback, useEffect, useState} from 'react'
import {TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer'
import Header from '../../Components/Text/Header'
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer'
import RegisterButton from '../../Components/Button/RegisterButton'
import {getToken} from '../../Common/tokenFunctions'
import SubNavigation from '../../Components/Navigation/SubNavigation'
import {ROUTER_MENU_LIST} from '../../Common/routerset'
import InnerBodyContainer from '../../Containers/InnerBodyContainer'
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions'
import AddInput from '../../Components/Input/AddInput'
import NormalNumberInput from '../../Components/Input/NormalNumberInput'
import TextList from '../../Components/List/TextList'
import SearchModalContainer from '../../Containers/SearchModalContainer'
import SearchInput from '../../Components/Input/SearchInput'
import SearchedList from '../../Components/List/SearchedList'
import {uploadTempFile} from '../../Common/fileFuctuons'
import RadioInput from '../../Components/Input/RadioInput'
import DateInput from '../../Components/Input/DateInput'
import moment from 'moment'

interface IInfo {
    title: string,
    value: string,
}

// 재고 변경 페이지(출고)
const Old_ChangeOut = () => {

    const [pk, setPk] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [code, setCode] = useState<string>('')
    const [type, setType] = useState<number>(0)
    const [amount, setAmount] = useState<number>(0)
    const [targetPk, setTargetPk] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))
    //검색관련
    const [isPoupup, setIsPoupup] = useState<boolean>(false)
    const [isSearched, setIsSearched] = useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>('')


    const [list, setList] = useState<ISearchedList[]>([])
    const [checkList, setCheckList] = useState<ISearchedList[]>([])
    const [searchList, setSearchList] = useState<ISearchedList[]>([])

    const [isPoupup2, setIsPoupup2] = useState<boolean>(false)
    const [list2, setList2] = useState<ISearchedList[]>([])
    const [checkList2, setCheckList2] = useState<ISearchedList[]>([])
    const [searchList2, setSearchList2] = useState<ISearchedList[]>([])

    const [paths, setPaths] = useState<any[1]>([null])
    const [oldPaths, setOldPaths] = useState<any[1]>([null])


    useEffect(() => {
        //setIsSearched(true)
        //setSearchList(dataSet.materialList);
        //setSearchList3(dataSet.machineList);

        if (getParameter('pk') !== '') {
            setPk(getParameter('pk'))
            setIsUpdate(true)

        }

    }, [])


    /**
     * onsubmitForm()
     * 공정 정보 등록
     * @param {string} url 요청 주소
     * @param {string} name 이름
     * @param {string} mold 금형 pk
     * @param {string} material 자재 pk
     * @param {string} output 생산품 pk
     * @param {string} machine 기계 pk
     * @returns X
     */
    const onsubmitForm = useCallback(async (e) => {
        e.preventDefault()
        //TODO: 지울것

        ////alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
        //return;
        const data = {
            pk: pk == undefined || pk == '' ? list[0].pk : getParameter('pk'),
            date: date,
            amount: amount,
            reason: type,
            description: description,

        }

        const res = await postRequest('http://255.255.255.255:8299/api/v1/stock/out', data, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                setName('')
                setList([])
                setList2([])
                setAmount(0)
                setDate(moment().format('YYYY-MM-DD'))
            } else if (res.status === 1000) {
                //alert('수량을 다시 확인해주세요.')
            } else {
                //alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
                //TODO:  기타 오류
            }
        }

    }, [pk, list, list2, paths, amount])

    /**
     * addFiles()
     * 사진 등록
     * @param {object(file)} event.target.files[0] 파일
     * @returns X
     */
    const addFiles = async (event: any, index: number): Promise<void> => {
        if (event.target.files[0] === undefined) {

            return
        }
        if (event.target.files[0].type.includes('image')) { //이미지인지 판별

            const tempFile = event.target.files[0]
            const res = await uploadTempFile(event.target.files[0])

            if (res !== false) {
                const tempPatchList = paths.slice()
                tempPatchList[index] = res
                setPaths(tempPatchList)
                return
            } else {
                return
            }

        } else {

            //alert('이미지 형식만 업로드 가능합니다.')
        }

    }


    /**
     * onClickSearch()
     *  키워드 검색
     * @param {string} url 요청 주소
     * @param {string} keyword 검색 키워드
     * @returns X
     */
    const onClickSearch = useCallback(async (e) => {

        e.preventDefault()
        let type = 'material'

        if (isPoupup === true) {
            type = 'material'
        } else if (isPoupup2 === true) {
            type = 'barcode'
        } else {
            return
        }

        if (keyword === '' || keyword.length < 2) {
            //alert('2글자 이상의 키워드를 입력해주세요')

            return
        }
        setIsSearched(true)

        const res = await getRequest(`http://255.255.255.255:8299/api/v1/common/search?keyword=${keyword}&type=${type}&orderBy=1`, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                const results = res.results
                if (isPoupup === true) {
                    setSearchList(results)
                } else if (isPoupup2 === true) {
                    setSearchList2(results)
                }


            } else {
                //TODO:  기타 오류
            }
        }
    }, [keyword])

    return (
        <DashboardWrapContainer index={8}>
            <SubNavigation list={ROUTER_MENU_LIST[8]}/>
            <InnerBodyContainer>
                <Header title={'출고 등록'}/>
                <WhiteBoxContainer>
                    <form onSubmit={onsubmitForm}>
                        <RadioInput title={'출고 구분'} target={type} onChangeEvent={setType}
                                    contents={[{value: 0, title: '정상 출고'}, {value: 1, title: '생산'}, {
                                        value: 2,
                                        title: '불량'
                                    }, {value: 9, title: '기타 (오류정정)'}]}/>


                        {
                            pk == '' || pk == undefined ?

                                <AddInput title={'재고 품목 선택'} icType="solo" onlyOne={list.length > 0 ? true : false}
                                          onChangeEvent={() => {
                                              setIsPoupup(true)
                                              setCheckList(list)
                                              setKeyword('')
                                          }
                                          }>
                                    {
                                        list.map((v: ISearchedList, i) => {
                                            return (
                                                <TextList key={i}
                                                          onClickSearch={() => {
                                                              setIsPoupup(true)
                                                              setKeyword('')
                                                              setIsSearched(false)
                                                          }}
                                                          onClickEvent={() => {
                                                              setList([])
                                                          }}
                                                          title={v.code !== undefined ? v.code : ''} name={v.name}/>
                                            )
                                        })
                                    }
                                </AddInput>
                                :
                                null
                        }


                        <NormalNumberInput title={'입고 수량'} value={amount} onChangeEvent={setAmount}
                                           description={'불량 발생 수량을 입력해주세요'}/>

                        <DateInput title={'입고 날짜'} description={''} value={date} onChangeEvent={setDate}/>


                        <RegisterButton name={'등록하기'}/>
                    </form>
                </WhiteBoxContainer>

                {/* 상품-자재 검색창 */}
                <SearchModalContainer
                    onClickEvent={ //닫혔을 때 이벤트
                        () => {
                            setIsPoupup(false)
                            setList(checkList)
                            setKeyword('')
                        }
                    }
                    isVisible={isPoupup} onClickClose={() => {
                    setIsPoupup(false)
                    setKeyword('')
                    setSearchList([])
                    setIsSearched(false)
                }} title={'상품(자재) 선택'}>
                    <SearchInput description={'키워드를 검색해주세요'} value={keyword}
                                 onChangeEvent={(e) => setKeyword(e.target.value)}
                                 onClickEvent={onClickSearch}/>
                    <div style={{width: '100%', marginTop: 20}}>
                        {
                            isSearched ?
                                searchList.map((v: ISearchedList, i) => {
                                    return (

                                        <SearchedList key={i} pk={v.pk} widths={['52%', '52%']}
                                                      contents={[v.name, v.code !== undefined ? v.code : '']}
                                                      isIconDimmed={false}
                                                      isSelected={checkList.find((k) => k.pk === v.pk) ? true : false}
                                                      onClickEvent={() => {
                                                          const tempList = checkList.slice()
                                                          tempList.splice(0, 1, v)
                                                          setCheckList(tempList)
                                                      }}
                                        />

                                    )
                                })
                                :
                                null
                        }
                    </div>
                </SearchModalContainer>


            </InnerBodyContainer>
        </DashboardWrapContainer>

    )
}
export default Old_ChangeOut
