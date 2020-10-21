import React, {useCallback, useEffect, useState} from 'react';
import Styled from 'styled-components'
import {BG_COLOR_SUB2, TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import {getToken} from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions';
import AddInput from '../../Components/Input/AddInput';
import TextList from '../../Components/List/TextList';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchInput from '../../Components/Input/SearchInput';
import SearchedList from '../../Components/List/SearchedList';

interface IInfo {
    title: string,
    value: string,
}

// 공정 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const RegisterProcess = () => {

    const [pk, setPk] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    //검색관련
    const [isPoupup, setIsPoupup] = useState<boolean>(false);
    const [isSearched, setIsSearched] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');


    const [list, setList] = useState<ISearchedList[]>([]);
    const [checkList, setCheckList] = useState<ISearchedList[]>([]);
    const [searchList, setSearchList] = useState<ISearchedList[]>([]);

    const [isPoupup2, setIsPoupup2] = useState<boolean>(false);
    const [list2, setList2] = useState<ISearchedList[]>([]);
    const [checkList2, setCheckList2] = useState<ISearchedList[]>([]);
    const [searchList2, setSearchList2] = useState<ISearchedList[]>([]);

    const [isPoupup3, setIsPoupup3] = useState<boolean>(false);
    const [list3, setList3] = useState<ISearchedList[]>([]);
    const [checkList3, setCheckList3] = useState<ISearchedList[]>([]);
    const [searchList3, setSearchList3] = useState<ISearchedList[]>([]);

    const [isPoupup4, setIsPoupup4] = useState<boolean>(false);
    const [list4, setList4] = useState<ISearchedList[]>([]);
    const [checkList4, setCheckList4] = useState<ISearchedList[]>([]);
    const [searchList4, setSearchList4] = useState<ISearchedList[]>([]);


    useEffect(() => {
        //setIsSearched(true)
        //setSearchList(dataSet.materialList);
        //setSearchList3(dataSet.machineList);

        if (getParameter('pk') !== "") {
            setPk(getParameter('pk'))
            ////alert(`수정 페이지 진입 - pk :` + param)
            setIsUpdate(true)
            getData()
        }

    }, [])

    /**
     * getData()
     * 공정 조회
     * @param {string} url 요청 주소
     * @param {string} pk 자재 pk
     * @returns X
     */
    const getData = useCallback(async () => {

        const res = await getRequest('http://222.100.89.245:8299/api/v1/process/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {

            let tempList: IMaterial[] = new Array()
            let tempList2: IMold[] = new Array()
            let tempList3: IMachine[] = new Array()
            let tempList4: IMaterial[] = new Array()
            if (res.status === 200) {

                const data = res.results;
                setName(data.name);
                setList(new Array(data.material));
                if (data.mold !== "") {
                    setList2(new Array(data.mold));
                }
                setList3(new Array(data.machine));
                setList4(new Array(data.output));
            } else if (res.status === 1001 || res.data.status === 1002) {
                //TODO:  아이디 존재 확인
            } else {
                //TODO:  기타 오류
            }
        }
    }, [pk, name, list, list2, list3, list4]);

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
        e.preventDefault();
        //TODO: 지울것

        if (name == "" || list.length < 1 || list3.length < 1 || list4.length < 1) {
            //alert('공정이름, 원자재, 기계, 생산자재는 필수 항목입니다. ')
            return;
        }
        ////alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
        //return;
        const data = {
            name: name,
            material: list[0].pk,
            output: list4[0].pk,
            //material: 'v1_수민산업_material_1_null_자재자재',
            //output: 'v1_수민산업_material_1_null_자재자재',
            mold: list2.length > 0 ? list2[0].pk : null,
            machine: list3[0].pk
        }

        const res = await postRequest('http://222.100.89.245:8299/api/v1/process/register', data, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                setName('')
                setList([])
                setList2([])
                setList3([])
                setList4([])
            } else {
                //alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
                //TODO:  기타 오류
            }
        }

    }, [pk, name, list, list2, list3, list4])


    /**
     * onsubmitFormUpdate()
     * 공정 정보 수정
     * @param {string} url 요청 주소
     * @param {string} pk pk
     * @param {string} name 이름
     * @param {array} mold 금형 pk
     * @param {string} material 자재 pk
     * @param {string} output 생산품 pk
     * @param {string} machine 기계 pk
     * @returns X
     */
    const onsubmitFormUpdate = useCallback(async (e) => {
        e.preventDefault();

        if (name == "" || list.length < 1 || list3.length < 1 || list4.length < 1) {
            //alert('공정이름, 원자재, 기계, 생산자재는 필수 항목입니다. ')
            return;
        }
        ////alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
        //return;
        const data = {
            pk: getParameter('pk'),
            material: list[0].pk,
            output: list4[0].pk,
            //material: 'v1_수민산업_material_1_null_자재자재',
            //output: 'v1_수민산업_material_1_null_자재자재',
            mold: list2.length > 0 ? list2[0].pk : null,
            machine: list3[0].pk
        }
        const res = await postRequest('http://222.100.89.245:8299/api/v1/process/udpate', data, getToken(TOKEN_NAME))
        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                //alert('성공적으로 수정 되었습니다')
            } else {
                //TODO:  기타 오류
            }
        }

    }, [pk, name, list, list2, list3, list4])

    /**
     * onClickSearch()
     *  키워드 검색
     * @param {string} url 요청 주소
     * @param {string} keyword 검색 키워드
     * @returns X
     */
    const onClickSearch = useCallback(async (e) => {

        e.preventDefault();
        let type = "material";


        if (isPoupup === true) {
            type = 'material'
        } else if (isPoupup2 === true) {
            type = 'mold'
        } else if (isPoupup3 === true) {
            type = 'machine'
        } else if (isPoupup4 === true) {
            type = 'material'
        } else {
            return;
        }

        if (keyword === '' || keyword.length < 2) {
            //alert('2글자 이상의 키워드를 입력해주세요')

            return;
        }
        setIsSearched(true)

        const res = await getRequest(`http://222.100.89.245:8299/api/v1/common/search?keyword=${keyword}&type=${type}&orderBy=1`, getToken(TOKEN_NAME))
        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                const results = res.results;
                if (isPoupup === true) {
                    setSearchList(results);
                } else if (isPoupup2 === true) {
                    setSearchList2(results);
                } else if (isPoupup3 === true) {
                    setSearchList3(results);
                } else if (isPoupup4 === true) {
                    setSearchList4(results);
                } else {
                    return;
                }


            } else {
                //TODO:  기타 오류
            }
        }
    }, [keyword])
    return (
        <DashboardWrapContainer index={6}>
            <SubNavigation list={ROUTER_MENU_LIST[6]}/>
            <InnerBodyContainer>
                <Header title={isUpdate ? '공정 수정' : '공정 등록'}/>
                <WhiteBoxContainer>
                    <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm}>
                        <NormalInput title={'공정 이름 '} value={name} onChangeEvent={setName} description={'이름을 입력하세요'}/>
                        {/* 팝업 여는 버튼 + 재료 추가 */}
                        <AddInput title={'원자재 정보 '} icType="solo" onlyOne={list.length > 0 ? true : false}
                                  onChangeEvent={() => {
                                      setIsPoupup(true);
                                      setCheckList(list);
                                      setKeyword('')
                                  }
                                  }>
                            {
                                list.map((v: ISearchedList, i) => {
                                    return (
                                        <TextList key={i}
                                                  onClickSearch={() => {
                                                      setIsPoupup(true);
                                                      setKeyword('');
                                                      setIsSearched(false);
                                                  }}
                                                  onClickEvent={() => {
                                                      setList([])
                                                  }}
                                                  title={v.code !== undefined ? v.code : ""} name={v.name}/>
                                    )
                                })
                            }
                        </AddInput>


                        {/* 팝업 여는 버튼 + 기계 정보 추가 */}
                        <AddInput title={'사용 기계 '} icType="solo" onlyOne={list3.length > 0 ? true : false}
                                  onChangeEvent={() => {
                                      setIsPoupup3(true);
                                      setCheckList3(list3);
                                      setKeyword('')
                                  }
                                  }>
                            {
                                list3.map((v: ISearchedList, i) => {
                                    return (
                                        <TextList key={i}
                                                  onClickSearch={() => {
                                                      setIsPoupup3(true)
                                                      setKeyword('');
                                                      setIsSearched(false);
                                                  }}
                                                  onClickEvent={() => {
                                                      setList3([])
                                                  }}
                                                  title={v.code !== undefined ? v.code : ''} name={v.name}/>
                                    )
                                })
                            }
                        </AddInput>

                        <AddInput title={'사용 금형 (*프레스만)'} icType="solo" onlyOne={list2.length > 0 ? true : false}
                                  onChangeEvent={() => {
                                      setIsPoupup2(true);
                                      setCheckList2(list2);
                                      setKeyword('')
                                  }
                                  }>
                            {
                                list2.map((v: ISearchedList, i) => {
                                    return (
                                        <TextList key={i}
                                                  onClickSearch={() => {
                                                      setIsPoupup2(true)
                                                      setKeyword('');
                                                      setIsSearched(false);
                                                  }}
                                                  onClickEvent={() => {
                                                      setList2([])
                                                  }}
                                                  title={v.code !== undefined ? v.code : ''} name={v.name}/>
                                    )
                                })
                            }
                        </AddInput>
                        {/* 팝업 여는 버튼 + 재료 추가 */}
                        <AddInput title={'생산자재 정보 '} onlyOne={list4.length > 0 ? true : false} icType="solo"
                                  onChangeEvent={() => {
                                      setIsPoupup4(true);
                                      setCheckList4(list);
                                      setKeyword('')
                                  }
                                  }>
                            {
                                list4.map((v: ISearchedList, i) => {
                                    return (
                                        <TextList key={i}
                                                  onClickSearch={() => {
                                                      setIsPoupup4(true)
                                                      setKeyword('');
                                                      setIsSearched(false);
                                                  }}
                                                  onClickEvent={() => {
                                                      setList4([])
                                                  }}

                                                  title={v.code !== undefined ? v.code : ""} name={v.name}/>
                                    )
                                })
                            }
                        </AddInput>

                        <RegisterButton name={isUpdate ? '수정하기' : '등록하기'}/>
                    </form>
                </WhiteBoxContainer>

                {/* 재료 검색창 */}
                <SearchModalContainer
                    onClickEvent={ //닫혔을 때 이벤트
                        () => {
                            setIsPoupup(false);
                            setList(checkList);
                            setKeyword('')
                        }
                    }
                    isVisible={isPoupup} onClickClose={() => {
                    setIsPoupup(false);
                    setKeyword('');
                    setSearchList([]);
                    setIsSearched(false)
                }} title={'원자재 선택'}>
                    <SearchInput description={'키워드를 검색해주세요'} value={keyword}
                                 onChangeEvent={(e) => setKeyword(e.target.value)}
                                 onClickEvent={onClickSearch}/>
                    <div style={{width: '100%', marginTop: 20}}>
                        {
                            isSearched ?
                                searchList.map((v: ISearchedList, i) => {
                                    return (

                                        <SearchedList key={i} pk={v.pk} widths={['45%', '45']}
                                                      contents={[v.code, v.name]}
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

                {/* 금형 검색창 */}
                <SearchModalContainer
                    onClickEvent={ //닫혔을 때 이벤트
                        () => {
                            setIsPoupup2(false);
                            setList2(checkList2);
                            setKeyword('')
                        }
                    }
                    isVisible={isPoupup2} onClickClose={() => {
                    setIsPoupup2(false);
                    setKeyword('');
                    setIsSearched(false);
                    setSearchList2([]);
                }} title={'금형 선택'}>
                    <SearchInput description={'키워드를 검색해주세요'} value={keyword}
                                 onChangeEvent={(e) => setKeyword(e.target.value)}
                                 onClickEvent={onClickSearch}/>
                    <div style={{width: '100%', marginTop: 20}}>
                        {
                            isSearched ?
                                searchList2.map((v: ISearchedList, i) => {
                                    return (
                                        <SearchedList key={i} pk={v.pk} widths={['45%', '45']}
                                                      contents={[v.code, v.name]}
                                                      isIconDimmed={false}
                                                      isSelected={checkList2.find((k) => k.pk === v.pk) ? true : false}
                                                      onClickEvent={() => {

                                                          const tempList = checkList2.slice()
                                                          tempList.splice(0, 1, v)
                                                          setCheckList2(tempList)
                                                      }}
                                        />

                                    )
                                })
                                :
                                null
                        }
                    </div>
                </SearchModalContainer>


                {/* 기계 검색창 */}
                <SearchModalContainer
                    onClickEvent={ //닫혔을 때 이벤트
                        () => {
                            setIsPoupup3(false);
                            setList3(checkList3);
                            setKeyword('')
                        }
                    }
                    isVisible={isPoupup3} onClickClose={() => {
                    setIsPoupup3(false);
                    setKeyword('');
                    setSearchList3([]);
                    setIsSearched(false)
                }} title={'기계 선택'}>
                    <SearchInput description={'키워드를 검색해주세요'} value={keyword}
                                 onChangeEvent={(e) => setKeyword(e.target.value)}
                                 onClickEvent={onClickSearch}/>
                    <div style={{width: '100%', marginTop: 20}}>
                        {
                            isSearched ?
                                searchList3.map((v: ISearchedList, i) => {
                                    return (

                                        <SearchedList key={i} pk={v.pk} widths={['45%', '45']}
                                                      contents={[v.code, v.name]}
                                                      isIconDimmed={false}
                                                      isSelected={checkList3.find((k) => k.pk === v.pk) ? true : false}
                                                      onClickEvent={() => {
                                                          const tempList = checkList3.slice()
                                                          tempList.splice(0, 1, v)
                                                          setCheckList3(tempList)
                                                      }}
                                        />

                                    )
                                })
                                :
                                null
                        }
                    </div>
                </SearchModalContainer>


                {/* 재료 검색창 */}
                <SearchModalContainer
                    onClickEvent={ //닫혔을 때 이벤트
                        () => {
                            setIsPoupup4(false);
                            setList4(checkList4);
                            setKeyword('')
                        }
                    }
                    isVisible={isPoupup4} onClickClose={() => {
                    setIsPoupup4(false);
                    setKeyword('');
                    setSearchList4([]);
                    setIsSearched(false)
                }} title={'생산자재 선택'}>
                    <SearchInput description={'키워드를 검색해주세요'} value={keyword}
                                 onChangeEvent={(e) => setKeyword(e.target.value)}
                                 onClickEvent={onClickSearch}/>
                    <div style={{width: '100%', marginTop: 20}}>
                        {
                            isSearched ?
                                searchList4.map((v: ISearchedList, i) => {
                                    return (

                                        <SearchedList key={i} pk={v.pk} widths={['45%', '45']}
                                                      contents={[v.code, v.name]}
                                                      isIconDimmed={false}
                                                      isSelected={checkList4.find((k) => k.pk === v.pk) ? true : false}
                                                      onClickEvent={() => {
                                                          const tempList = checkList4.slice()
                                                          tempList.splice(0, 1, v)
                                                          setCheckList4(tempList)
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

    );
}
const FullPageDiv = Styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${BG_COLOR_SUB2}
`


export default RegisterProcess;
