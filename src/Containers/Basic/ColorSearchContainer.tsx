import React, {useCallback, useEffect, useState} from 'react';
import {TOKEN_NAME} from '../../Common/configset'
import {getToken} from '../../Common/tokenFunctions';
import {getRequest} from '../../Common/requestFunctions';
import AddInput from '../../Components/Input/AddInput';
import TextList from '../../Components/List/TextList';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchInput from '../../Components/Input/SearchInput';
import SearchedList from '../../Components/List/SearchedList';
import EnrollmentBorderBox from '../../Components/Box/EnrollmentBorderBox';
import Styled from 'styled-components';
import IcSearchButton from '../../Assets/Images/ic_search.png'
import Pagination from "@material-ui/lab/Pagination";

interface Props {
    listValue: string
    onChangeEvent: any,
    title: string,
    list: any[],
    searchUrl: string,
    option: number
    solo?: boolean,
    key: string,
    value: string,
    type?: string,
    placeholder?: string
}

// 검색해서 pk 를 담는 input container
const ColorSearchContainer = ({listValue, placeholder, type, onChangeEvent, title, list, searchUrl, option, solo, key, value}: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [searchedList, setSearchedList] = useState<any>([]);
    const [checkList, setCheckList] = useState<any>([]);
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    useEffect(() => {
        onSearchInit()
    }, [isOpen])


    /**
     * onClickSearch()
     *  키워드 검색
     * @param {string} url 요청 주소
     * @param {string} keyword 검색 키워드
     * @returns X
     */
    const onClickSearch = useCallback(async (e?) => {
        e.preventDefault()
        onSearchInit(true)

        // if(keyword  === '' || keyword.length < 2){
        //   //alert('2글자 이상의 키워드를 입력해주세요')
        //   return;
        // }

    }, [keyword, searchedList])

    const onSearchInit = async (isSearch?: boolean) => {
        const res = await getRequest(`${searchUrl}keyword=${keyword}&option=${option}&page=${isSearch ? 1 : page.current}&limit=10`, getToken(TOKEN_NAME))

        if (res === false) {
            //TODO: 에러 처리
            // //alert('[SERVER ERROR] 조회가 불가능합니다.')
        } else {
            if (res.status === 200) {
                const results = res.results;
                setSearchedList(results.info_list);
                setPage({current: results.current_page, total: results.total_page})
            } else {
                //TODO:  기타 오류
            }
        }
    }

    useEffect(() => {
        onSearchInit()
    }, [page.current])


    return (
        <>
            <EnrollmentBorderBox>
                <InputBox>
                    <Dot/>
                    <p>{title}</p>
                    <div onClick={() => {
                        setIsOpen(true);
                        setKeyword('')
                        setSearchedList([])
                    }}>
                        <p style={{color: value === "" ? '#11131970' : '#111319'}}>{value === '' ? placeholder : value}</p>
                        <div>
                            <img src={IcSearchButton} alt="search"/>
                        </div>
                    </div>
                </InputBox>
            </EnrollmentBorderBox>

            <SearchModalContainer
                onClickEvent={ //닫혔을 때 이벤트
                    () => {
                        setIsOpen(false);
                        onChangeEvent(checkList);
                        setKeyword('')
                    }
                }
                isVisible={isOpen} onClickClose={() => {
                setIsOpen(false);
                setKeyword('');
            }} title={`${title} 검색`}>
                <SearchInput
                    description={'키워드로 검색해주세요'}
                    value={keyword}
                    onChangeEvent={(e) => setKeyword(e.target.value)}
                    onClickEvent={onClickSearch}/>

                <form style={{width: '100%', marginTop: 20}} onSubmit={onClickSearch}>
                    {
                        searchedList.map((v: ISearchedList, i) => {
                            return (<>
                                    <SearchedList key={i} pk={v.pk} widths={['80%']}
                                                  contents={[v[listValue]]}
                                                  isIconDimmed={false}
                                                  isSelected={checkList.find((k) => k.pk === v.pk) ? true : false}
                                                  onClickEvent={() => {
                                                      if (!solo) {
                                                          if (checkList.find((k) => k.pk == v.pk)) {
                                                              setCheckList(checkList.filter(f => f.pk !== v.pk));
                                                          } else {
                                                              const tempList = [...checkList, v]
                                                              tempList.push(v)
                                                              setCheckList(tempList);
                                                          }

                                                      } else {
                                                          setCheckList([v])
                                                      }
                                                  }}
                                    />

                                </>
                            )
                        })

                    }
                </form>
                <PaginationBox>
                    <Pagination count={page.total ? page.total : 0} page={page.current}
                                onChange={(event, i) => setPage({...page, current: i})}
                                boundaryCount={1} color={'primary'}/>
                </PaginationBox>
            </SearchModalContainer>

        </>

    );
}

const InputBox = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    *{
        box-sizing: border-box;
    }
    &>p{
      width: 122px;
      font-size: 15px;
      font-weight: bold;
    }
    &>div{
        &:not(:first-child){
            width: calc(100% - 133px);
            height: 28px;
            border: solid 0.5px #b3b3b3;
            background-color: #f4f6fa;
            padding: 0 20px 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            cursor: pointer;
            &>p{
                font-size: 15px;
            }
            &>div{
                width: 28px;
                height: 100%;
                background-color: #19b9df;
                position: absolute;
                top: 0;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                &>img{
                    width: 18.3px;
                    height: 18.3px;
                }
            }
        }
    }

`

const Dot = Styled.div`
    width: 5px;
    height: 5px;
    margin-right: 6px;
    background-color: #111319;
    border-radius: 50%;
`

const PaginationBox = Styled.div`
    padding-top: 5px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    .MuiButtonBase-root {
        color: black;
    }
    .MuiPaginationItem-root{
        color: black;
    }
`

export default ColorSearchContainer;
