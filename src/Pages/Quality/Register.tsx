import React, {useCallback, useEffect, useState} from 'react';
import {TOKEN_NAME} from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import {getToken} from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import {ROUTER_MENU_LIST} from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import {getParameter, getRequest, postRequest} from '../../Common/requestFunctions';
import AddInput from '../../Components/Input/AddInput';
import NormalNumberInput from '../../Components/Input/NormalNumberInput';
import TextList from '../../Components/List/TextList';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchInput from '../../Components/Input/SearchInput';
import SearchedList from '../../Components/List/SearchedList';
import {uploadTempFile} from '../../Common/fileFuctuons';
import OldFileInput from '../../Components/Input/OldFileInput';
import moment from 'moment';
import DateInput from '../../Components/Input/DateInput';

interface IInfo {
    title: string,
    value: string,
}

// 불량 자재 등록 페이지
const RegisterInferior = () => {

    const [pk, setPk] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));

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

    const [paths, setPaths] = useState<any[1]>([null]);
    const [oldPaths, setOldPaths] = useState<any[1]>([null]);


    useEffect(() => {
        //setIsSearched(true)
        //setSearchList(dataSet.materialList);
        //setSearchList3(dataSet.machineList);

        if (getParameter('pk') !== "") {
            setPk(getParameter('pk'))
            ////alert(`수정 페이지 진입 - pk :` + param)
            setIsUpdate(true)
            //getData()
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


            if (res.status === 200) {

                const data = res.results;
                setName(data.name);
                setList(new Array(data.material));
                //setList(new Array(data.s))

            } else if (res.status === 1001 || res.data.status === 1002) {
                //TODO:  아이디 존재 확인
            } else {
                //TODO:  기타 오류
            }
        }
    }, [pk, name, list, list2]);

    /**
     * onsubmitForm()
     * 불량 등록
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

        ////alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
        //return;
        const data = {
            pk: list[0].pk,
            date: date,
            amount: amount,
            reason: 2,
            description: description,
            photo: paths[0],


        }

        const res = await postRequest('http://222.100.89.245:8299/api/v1/stock/out', data, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                //alert('성공적으로 등록 되었습니다')
                setName('')
                setList([])
                setList2([])
                setAmount(0)
                setDescription('')
                setPaths([null])

            } else if (res.status === 1000) {
                //alert('수량을 다시 확인해주세요.')
            } else {
                //alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
                //TODO:  기타 오류
            }
        }

    }, [pk, list, list2, paths, amount, description, paths])


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

        if (list.length < 1 || list2.length < 1) {
            //alert('상품, 기준 바코드는 필수 항목입니다. ')
            return;
        }
        ////alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
        //return;
        const data = {
            pk: getParameter('pk'),
            material_pk: list[0].pk,
            barcode_pk: list2[0].pk,
            code: code,
            photo: paths[0],
            description: description,

        }
        const res = await postRequest('http://222.100.89.245:8299/api/v1/barcode/product/update' + getParameter('pk'), data, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
        } else {
            if (res.status === 200) {
                //alert('성공적으로 수정 되었습니다')
            } else {
                //TODO:  기타 오류
            }
        }

    }, [pk, name, list, list2, paths, code, description])

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
            type = 'barcode'
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
                }


            } else {
                //TODO:  기타 오류
            }
        }
    }, [keyword])


    /**
     * addFiles()
     * 사진 등록
     * @param {object(file)} event.target.files[0] 파일
     * @returns X
     */
    const addFiles = async (event: any, index: number): Promise<void> => {
        console.log(event.target.files[0]);
        console.log(index)
        if (event.target.files[0] === undefined) {

            return;
        }
        console.log(event.target.files[0].type);
        if (event.target.files[0].type.includes('image')) { //이미지인지 판별

            const tempFile = event.target.files[0];
            console.log(tempFile)
            const res = await uploadTempFile(event.target.files[0]);

            if (res !== false) {
                console.log(res)
                const tempPatchList = paths.slice()
                tempPatchList[index] = res;
                console.log(tempPatchList)
                setPaths(tempPatchList)
                return
            } else {
                return
            }

        } else {

            //alert('이미지 형식만 업로드 가능합니다.')
        }

    }


    return (
        <DashboardWrapContainer index={9}>
            <SubNavigation list={ROUTER_MENU_LIST[9]}/>
            <InnerBodyContainer>
                <Header title={isUpdate ? '불량 정보수정' : '불량자재 정보등록'}/>
                <WhiteBoxContainer>
                    <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm}>
                        {/* 팝업 여는 버튼 + 재료 추가 */}
                        <AddInput title={'불량 자재 선택'} icType="solo" onlyOne={list.length > 0 ? true : false}
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

                        <NormalNumberInput title={'발생 수량'} value={amount} onChangeEvent={setAmount}
                                           description={'불량 발생 수량을 입력해주세요'}/>

                        <DateInput title={'발생 날짜'} description={""} value={date} onChangeEvent={setDate}/>

                        <NormalInput title={'불량 사유'} value={description} onChangeEvent={setDescription}
                                     description={'불량 발생 사유 및 기타설명을 입력해주세요'}/>

                        <NormalFileInput title={'사진 첨부'} name={paths[0]} thisId={'machinePhoto0'}
                                         onChangeEvent={(e) => addFiles(e, 0)}
                                         description={isUpdate ? oldPaths[0] : '불량 자재 사진을 등록해주세요(선택)'}/>

                        {
                            isUpdate ?
                                <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={['']} isImage={true}/>

                                :
                                null
                        }

                        <RegisterButton name={isUpdate ? '수정하기' : '등록하기'}/>
                    </form>
                </WhiteBoxContainer>

                {/* 상품-자재 검색창 */}
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
                                                      contents={[v.name, v.code !== undefined ? v.code : ""]}
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

    );
}
export default RegisterInferior;
