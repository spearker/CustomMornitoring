import React, { useCallback, useEffect, useState } from 'react';
import { TOKEN_NAME } from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import NormalFileInput from '../../Components/Input/NormalFileInput';
import { getToken } from '../../Common/tokenFunctions';
import SubNavigation from '../../Components/Navigation/SubNavigation';
import { ROUTER_MENU_LIST } from '../../Common/routerset';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';
import AddInput from '../../Components/Input/AddInput';
import TextList from '../../Components/List/TextList';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchInput from '../../Components/Input/SearchInput';
import SearchedList from '../../Components/List/SearchedList';
import { uploadTempFile } from '../../Common/fileFuctuons';
import OldFileInput from '../../Components/Input/OldFileInput';

interface IInfo {
  title: string,
  value: string,
}

// 바코드- 상품 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const Old_ProductRegister = () => {

  const [ pk, setPk ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const [ isUpdate, setIsUpdate ] = useState<boolean>(false);
  const [ code, setCode ] = useState<string>('');
  //검색관련
  const [ isPoupup, setIsPoupup ] = useState<boolean>(false);
  const [ isSearched, setIsSearched ] = useState<boolean>(false);
  const [ keyword, setKeyword ] = useState<string>('');
  const [ list, setList ] = useState<ISearchedList[]>([]);
  const [ checkList, setCheckList ] = useState<ISearchedList[]>([]);
  const [ searchList, setSearchList ] = useState<ISearchedList[]>([]);

  const [ isPoupup2, setIsPoupup2 ] = useState<boolean>(false);
  const [ list2, setList2 ] = useState<ISearchedList[]>([]);
  const [ checkList2, setCheckList2 ] = useState<ISearchedList[]>([]);
  const [ searchList2, setSearchList2 ] = useState<ISearchedList[]>([]);

  const [ paths, setPaths ] = useState<any[1]>([ null ]);
  const [ oldPaths, setOldPaths ] = useState<any[1]>([ null ]);


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

    const res = await getRequest('http://183.99.194.242:8299/api/v1/barcode/product/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {


      if (res.status === 200) {

        const data = res.results;
        setPk(getParameter('pk'))
        setName(data.name);
        setList(new Array(data.material));
        setList2(new Array(data.basic_barcode))
        setCode(data.code);
        setOldPaths([ data.photo ]);

      } else if (res.status === 1001 || res.data.status === 1002) {
        //TODO:  아이디 존재 확인
      } else {
        //TODO:  기타 오류
      }
    }
  }, [ pk, list, list2, code, oldPaths ]);

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

    if (list.length < 1 || list2.length < 1) {
      //alert('상품, 기준 바코드는 필수 항목입니다. ')
      //return;
    }
    if (code.indexOf('_') !== -1) {
      //alert('언더바(_)를 사용 할 수 없습니다.')
      return;
    }
    ////alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
    //return;
    const data = {
      material_pk: list[0].pk,
      barcode_pk: list2[0].pk,
      code: code,
      photo: paths[0]
    }

    const res = await postRequest('http://183.99.194.242:8299/api/v1/barcode/product/register', data, getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
      //alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
    } else {
      if (res.status === 200) {
        //alert('성공적으로 등록 되었습니다')

        setList([])
        setList2([])
        setPaths([]);
        setCode('');


      } else if (res.status === 1000) {
        //alert('이미 바코드가 등록된 자재거나, 중복된 바코드 넘버 입니다.')
      } else {
        //alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
        //TODO:  기타 오류
      }
    }

  }, [ pk, list, list2, paths, code ])


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
    if (code.indexOf('_') !== -1) {
      //alert('언더바(_)를 사용 할 수 없습니다.')
      return;
    }
    ////alert('테스트 : 전송 - ' + amount + code + name + info + made + spec + info );
    //return;
    const data = {

      material_pk: list[0].pk,
      barcode_pk: list2[0].pk,
      code: code,
      photo: paths[0]

    }
    const res = await postRequest('http://183.99.194.242:8299/api/v1/barcode/product/update', data, getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
      //alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
    } else {
      if (res.status === 200) {
        //alert('성공적으로 수정 되었습니다')
      } else if (res.status === 1000) {
        //alert('이미 바코드가 등록된 자재거나, 중복된 바코드 넘버 입니다.')
      } else {
        //TODO:  기타 오류
        //alert('등록 실패하였습니다. 잠시후에 다시 시도해주세요.')
      }
    }

  }, [ pk, name, list, list2, paths, code ])

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

    const res = await getRequest(`http://183.99.194.242:8299/api/v1/common/search?keyword=${keyword}&type=${type}&orderBy=1`, getToken(TOKEN_NAME))

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
  }, [ keyword ])


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
      <DashboardWrapContainer index={4}>
        <SubNavigation list={ROUTER_MENU_LIST[4]}/>
        <InnerBodyContainer>
          <Header title={isUpdate ? '상품 바코드 수정' : '상품 바코드 등록'}/>
          <WhiteBoxContainer>
            <form onSubmit={isUpdate ? onsubmitFormUpdate : onsubmitForm}>
              {/* 팝업 여는 버튼 + 재료 추가 */}
              <AddInput title={'상품(자재) 선택'} icType="solo" onlyOne={list.length > 0 ? true : false}
                        onChangeEvent={() => {
                          setIsPoupup(true);
                          setCheckList(list);
                          setKeyword('')
                          setList([])
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
                                  title={v.name !== undefined ? v.name : ""} name={v.code}/>
                    )
                  })
                }
              </AddInput>

              <AddInput title={'기준 바코드 선택 '} icType="solo" onlyOne={list2.length > 0 ? true : false}
                        onChangeEvent={() => {
                          setIsPoupup2(true);
                          setCheckList2(list2);
                          setKeyword('');
                          setList2([]);
                        }}>
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
                                  title={v.name !== undefined ? v.name : ''} name={v.code}/>
                    )
                  })
                }
              </AddInput>
              <NormalInput title={'나머지 바코드'} value={code} onChangeEvent={setCode}
                           description={'기준 바코드 외의 나머지 코드를 입력해주세요'}/>


              <NormalFileInput title={'바코드 사진'} name={paths[0]} thisId={'machinePhoto0'}
                               onChangeEvent={(e) => addFiles(e, 0)}
                               description={isUpdate ? oldPaths[0] : '해당 상품의 바코드 이미지를 등록해주세요'}/>
              {
                isUpdate ?
                    <OldFileInput title={'기존 첨부 파일'} urlList={oldPaths} nameList={[ '' ]} isImage={true}/>

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
            <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e) => setKeyword(e.target.value)}
                         onClickEvent={onClickSearch}/>
            <div style={{ width: '100%', marginTop: 20 }}>
              {
                isSearched ?
                    searchList.map((v: ISearchedList, i) => {
                      return (

                          <SearchedList key={i} pk={v.pk} widths={[ '52%', '52%' ]}
                                        contents={[ v.name, v.code !== undefined ? v.code : "" ]} isIconDimmed={false}
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

          {/* 바코드 검색창 */}
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
          }} title={'기준 바코드 선택'}>
            <SearchInput description={'키워드를 검색해주세요'} value={keyword} onChangeEvent={(e) => setKeyword(e.target.value)}
                         onClickEvent={onClickSearch}/>
            <div style={{ width: '100%', marginTop: 20 }}>
              {
                isSearched ?
                    searchList2.map((v: ISearchedList, i) => {
                      return (
                          <SearchedList key={i} pk={v.pk} widths={[ '52%', '52%' ]}
                                        contents={[ v.name, v.code !== undefined ? v.code : '' ]} isIconDimmed={false}
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


        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}


export default Old_ProductRegister;
