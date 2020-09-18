import React, {useCallback, useEffect, useState} from 'react';
import {TOKEN_NAME} from '../../Common/configset'
import {getToken} from '../../Common/tokenFunctions';
import {getRequest} from '../../Common/requestFunctions';
import AddInput from '../../Components/Input/AddInput';
import TextList from '../../Components/List/TextList';
import SearchModalContainer from '../../Containers/SearchModalContainer';
import SearchInput from '../../Components/Input/SearchInput';
import SearchedList from '../../Components/List/SearchedList';

interface Props {
  onChangeEvent: any,
  title: string,
  list: any[],
  searchUrl: string,
  option: number
  solo?: boolean,
  key: string,
  value: string,
}

// 검색해서 pk 를 담는 input container
const BasicSearchContainer = ({onChangeEvent, title, list, searchUrl,option ,solo, key, value}:Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keyword, setKeyword]= useState<string>('');
  const [searchedList, setSearchedList]= useState<any>([]);
  const [checkList, setCheckList]= useState<any>([]);

  useEffect(()=>{
      onSearchInit()
  },[isOpen])


  /**
   * onClickSearch()
   *  키워드 검색
   * @param {string} url 요청 주소
   * @param {string} keyword 검색 키워드
   * @returns X
   */
  const onClickSearch = useCallback(async(e?)=>{
    e.preventDefault()
      onSearchInit()

    // if(keyword  === '' || keyword.length < 2){
    //   //alert('2글자 이상의 키워드를 입력해주세요')
    //   return;
    // }

  },[keyword, searchedList])

    const onSearchInit = async () => {
        const res = await getRequest(`${searchUrl}keyword=${keyword}&option=${option}`, getToken(TOKEN_NAME))

        if(res === false){
            //TODO: 에러 처리
            // //alert('[SERVER ERROR] 조회가 불가능합니다.')
        }else{
            if(res.status === 200){
                const results = res.results;
                setSearchedList(results);

            }else{
                //TODO:  기타 오류
            }
        }
    }


  return (
      <>
        <AddInput title={title} icType="solo" onlyOne={list.length > 0 ? true: false} onChangeEvent={()=>{
                  setIsOpen(true);
                  setKeyword('')
                  setSearchedList([])}
                  }>
                {
                  list.map((v, i)=>{
                    return (
                        <TextList key={i}
                        onClickSearch={()=>{
                          setIsOpen(true);
                          setKeyword('');
                        }}
                        onClickEvent={()=>{
                          const temp = [...list].filter(f => f.pk !== v.pk)
                          onChangeEvent(temp)
                        }}
                        title={v[value]} name={''}/>
                    )
                  })
                }
                </AddInput>




        <SearchModalContainer
              onClickEvent={ //닫혔을 때 이벤트
                ()=>{
                setIsOpen(false);
                onChangeEvent(checkList);
                setKeyword('')}
            }
            isVisible={isOpen} onClickClose={()=>{setIsOpen(false); setKeyword(''); }} title={`${title} 검색`} >
              <SearchInput
                description={'키워드로 검색해주세요'}
                value={keyword}
                onChangeEvent={(e)=>setKeyword(e.target.value)}
                onClickEvent={onClickSearch}/>

                <form style={{width: '100%', marginTop:20}} onSubmit={onClickSearch}>
                  {
                    searchedList.map((v: ISearchedList, i)=>{
                      return (
                         <SearchedList key={i} pk={v.pk} widths={['80%']}
                            contents={[v[value]]}
                            isIconDimmed={false}
                            isSelected={checkList.find((k)=> k.pk === v.pk)? true : false }
                             onClickEvent={()=>{
                              if(!solo){
                                if(checkList.find((k)=> k.pk == v.pk)){
                                  setCheckList(checkList.filter(f=> f.pk !== v.pk));
                                }else{
                                  const tempList = [...checkList, v]
                                  tempList.push(v)
                                  setCheckList(tempList);
                                }

                              }else{
                                setCheckList([v])
                              }
                            }}
                          />

                      )})

                  }
                </form>
            </SearchModalContainer>

      </>

  );
}


export default BasicSearchContainer;
