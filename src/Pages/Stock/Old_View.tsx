import React, { useCallback, useEffect, useState } from 'react';
import { TOKEN_NAME } from '../../Common/configset'
import DashboardWrapContainer from '../../Containers/DashboardWrapContainer';
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import { getToken } from '../../Common/tokenFunctions';
import InnerBodyContainer from '../../Containers/InnerBodyContainer';
import { getParameter, getRequest } from '../../Common/requestFunctions';
import OldFileInput from '../../Components/Input/OldFileInput';
import moment from 'moment';

interface IInfo {
  title: string,
  value: string,
}

// 자재 히스토리 상세 보기
const StockView = () => {

  const [ pk, setPk ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const [ amount, setAmount ] = useState<number>(0);
  const [ isUpdate, setIsUpdate ] = useState<boolean>(false);
  const [ code, setCode ] = useState<string>('');
  const [ description, setDescription ] = useState<string>('');
  const [ date, setDate ] = useState<string>(moment().format('YYYY-MM-DD'));
  const [ reason, setReason ] = useState<string>('');
  const [ register, setRegister ] = useState<string>('');
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
   * 조회
   * @param {string} url 요청 주소
   * @param {string} pk 자재 pk
   * @returns X
   */
  const getData = useCallback(async () => {

    const res = await getRequest('http://192.168.0.46:8299/api/v1/stock/history/view?pk=' + getParameter('pk'), getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {


      if (res.status === 200) {

        const data = res.results;
        setName(data.name);
        setAmount(data.amount);
        setDate(data.date);
        setRegister(data.register);
        setDescription(data.description);
        if (data.photo !== "") {
          setOldPaths([ data.photo ])

        }


      } else if (res.status === 1001 || res.data.status === 1002) {
        //TODO:  아이디 존재 확인
      } else {
        //TODO:  기타 오류
      }
    }
  }, [ pk, name, list, list2, description, oldPaths, date, amount ]);


  return (
      <DashboardWrapContainer>

        <InnerBodyContainer>
          <Header title={'입출고 기록'}/>
          <WhiteBoxContainer>
            <form>
              <NormalInput title={'자재 이름'} value={name} description={''}/>


              <NormalInput title={'수량'} value={String(amount)} description={''}/>

              <NormalInput title={'날짜'} description={""} value={date}/>
              {
                description == '' ?
                    <NormalInput title={'불량 사유'} value={description} description={''}/>
                    :

                    null
              } {
              oldPaths[0] !== null ?
                  <OldFileInput title={'첨부 파일'} urlList={oldPaths} nameList={[ '' ]} isImage={true}/>

                  :
                  null
            }

              <NormalInput title={'등록자'} value={register} description={''}/>


            </form>
          </WhiteBoxContainer>


        </InnerBodyContainer>
      </DashboardWrapContainer>

  );
}
export default StockView;
