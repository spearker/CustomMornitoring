import React, { useCallback, useEffect, useState } from 'react';
import { POINT_COLOR, TOKEN_NAME } from '../../Common/configset'
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import RegisterButton from '../../Components/Button/RegisterButton';
import { getToken } from '../../Common/tokenFunctions';
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';
import { uploadTempFile } from '../../Common/fileFuctuons';
import ListHeader from '../../Components/Text/ListHeader';
import { useHistory } from 'react-router-dom'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import InputContainer from "../InputContainer";
import Styled from "styled-components";
import useObjectInput from "../../Functions/UseInput";
import NormalNumberInput from "../../Components/Input/NormalNumberInput";
import RegisterDropdown from "../../Components/Dropdown/RegisterDropdown";
import moment from "moment";
import { transferStringToCode } from "../../Common/codeTransferFunctions";


const typeDummy = [
  '정상 입고',
  '생산',
  '오류 정정',
]

const StockDummy = [
  '정상 입고',
  '생산',
  '오류 정정',
  '금형 제작'
]

interface Props {
  match: any;
  // chilren: string;
}

// 수주 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
const WarehousingRegisterContainer = ({ match }: Props) => {
  const history = useHistory()

  const [ selectDate, setSelectDate ] = useState<string>(moment().format('YYYY-MM-DD'))
  const [ pk, setPk ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const [ no, setNo ] = useState<number>();
  const [ amount, setAmount ] = useState<number>()
  const [ type, setType ] = useState<number>(0); //0: 법인, 1:개인
  const [ phone, setPhone ] = useState<string>('');
  const [ address, setAddress ] = useState<string>('');
  const [ fax, setFax ] = useState<string>('');
  const [ phoneM, setPhoneM ] = useState<string>('');
  const [ emailM, setEmailM ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ manager, setManager ] = useState<string>('');
  const [ ceo, setCeo ] = useState<string>('');
  const [ infoList, setInfoList ] = useState<IInfo[]>([]);
  const [ typeList, setTypelist ] = useState<string[]>(typeDummy)
  const [ stockList, setStockList ] = useState<string[]>(StockDummy)
  const [ selectType, setSelectType ] = useState<string>()

  const [ paths, setPaths ] = useState<any[1]>([ null ]);
  const [ oldPaths, setOldPaths ] = useState<any[1]>([ null ]);

  const [ isUpdate, setIsUpdate ] = useState<boolean>(false);

  const [ selectMaterial, setSelectMaterial ] = useState<{ name?: string, pk?: string }>()

  //생산품 검색
  const [ isPoupup, setIsPoupup ] = useState<boolean>(false);
  const [ isSearched, setIsSearched ] = useState<boolean>(false);
  const [ keyword, setKeyword ] = useState<string>('');
  const [ checkList, setCheckList ] = useState<IMaterial[]>([]);
  const [ list, setList ] = useState<IMaterial[]>([]);
  const [ searchList, setSearchList ] = useState<IMaterial[]>([]);

  const [ inputData, setInputData ] = useObjectInput('CHANGE', {
    name: '',
    description: '',
    location: {
      postcode: '',
      roadAddress: '',
      detail: '',
    },
  });

  useEffect(() => {
    if (getParameter('pk') !== "") {
      setPk(getParameter('pk'))
      ////alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
    }

  }, [])

  const onClickSearch = useCallback(async (e) => {
    ////alert('keyword')
    e.preventDefault();
    let type = "material";
    // //alert('keyword')
    if (isPoupup === true) {
      type = 'material'
    } else {
      return;
    }

    if (keyword === '' || keyword.length < 2) {
      //alert('2글자 이상의 키워드를 입력해주세요')

      return;
    }
    setIsSearched(true)

    const res = await getRequest(`http://112.168.150.239:8299/api/v1/${type}/search?keyword=` + keyword, getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200) {
        const results = res.results;
        if (isPoupup === true) {
          setSearchList(results);
        } else {
          return;
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


  /**
   * onsubmitForm()
   * 입고 등록
   * @param {string} url 요청 주소
   * @param {string} name 이름
   * @param {string} no 넘버
   * @param {string} info 상세정보
   * @param {string} made 제조정보
   * @param {string} type 종류
   * @param {string} madeNo 제조사넘버
   * @returns X
   */
  const onsubmitForm = useCallback(async () => {

    if (match.params.parts) {
      const data = {
        parts_pk: match.params.pk,
        amount: amount,
        type: transferStringToCode('material', selectType),
        date: selectDate
      };

      const res = await postRequest('http://112.168.150.239:8299/api/v1/stock/parts/warehousing/register', data, getToken(TOKEN_NAME))

      if (res === false) {
        //TODO: 에러 처리
      } else {
        if (res.status === 200) {
          //alert('성공적으로 등록 되었습니다')

          history.goBack()
        } else {
          //TODO:  기타 오류
        }
      }
    } else {
      const data = {
        material_pk: match.params.pk,
        amount: amount,
        type: transferStringToCode('material', selectType),
        date: selectDate
      };


      const res = await postRequest('http://112.168.150.239:8299/api/v1/stock/warehousing/register', data, getToken(TOKEN_NAME))

      if (res === false) {
        //TODO: 에러 처리
      } else {
        if (res.status === 200) {
          //alert('성공적으로 등록 되었습니다')

          history.goBack()
        } else {
          //TODO:  기타 오류
        }
      }
    }
  }, [ selectType, amount, selectDate ])


  useEffect(() => {
    console.log(amount)
  }, [ amount ])


  return (
      <div>
        <Header title={isUpdate ? '입고 수정' : "입고 등록"}/>
        <WhiteBoxContainer>
          <ListHeader title={match.params.name}/>
          <div style={{
            borderBottom: 'solid 0.5px #d3d3d3',
            display: 'flex',
            paddingTop: 17,
            paddingBottom: 17,
            verticalAlign: 'top'
          }}>
            <p style={{ fontSize: 14, marginTop: 5, fontWeight: 700, width: 120, display: 'inline-block' }}>· 입고 구분</p>
            <RegisterDropdown type={'string'} onClickEvent={(e: string) => setSelectType(e)} select={selectType}
                              contents={match.params.parts ? stockList : typeList} text={'입고 구분을 선택해 주세요'}
                              buttonWid={30}/>
          </div>
          <NormalNumberInput title={'입고 수량'} width={120} value={amount} onChangeEvent={(input) => setAmount(input)}
                             description={'입고 수량을 입력해주세요'}/>
          <InputContainer title={"입고 날짜"} width={120}>
            <div style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#f4f6fa',
              border: '0.5px solid #b3b3b3',
              height: 32
            }}>
              <div style={{ width: 'calc(100% - 100px)', display: 'table-cell' }}>
                <div style={{ marginTop: 5 }}>
                  {
                    selectDate === ''
                        ? <InputText>&nbsp; 입고 날짜를 선택해 주세요.</InputText>
                        : <InputText style={{ color: '#111319' }}>&nbsp; {selectDate}</InputText>
                  }
                </div>
              </div>
              <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {
                setSelectDate(select)
              }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0 }}/>
            </div>
          </InputContainer>
          {/* 자유항목 입력 창
             <FullAddInput title={'자유 항목'} onChangeEvent={()=>{
              const tempInfo = infoList.slice();
              tempInfo.push({title:`자유 항목 ${infoList.length + 1}`, value:""});
              setInfoList(tempInfo)
            }}>
              {
                infoList.map((v: IInfo, i)=>{
                  return(
                      <CustomIndexInput index={i} value={v}
                      onRemoveEvent={()=>{
                        const tempInfo = infoList.slice();
                        tempInfo.splice(i, 1)
                        setInfoList(tempInfo)
                      }}
                      onChangeEvent={(obj: IInfo)=>{
                        const tempInfo = infoList.slice();
                        tempInfo.splice(i, 1, obj)
                        setInfoList(tempInfo)
                      }}
                      />
                  )
                })
              }
              </FullAddInput>

            */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%"
          }}>
            <div style={{ marginTop: 180 }}>
              <ButtonWrap onClick={async () => {
                await onsubmitForm()
              }}>
                <div style={{ width: 360, height: 46, boxSizing: 'border-box', paddingTop: '9px' }}>
                  <p style={{ fontSize: 18 }}>등록하기</p>
                </div>
              </ButtonWrap>
            </div>
          </div>
        </WhiteBoxContainer>
      </div>
  );
}

const InputText = Styled.p`
    color: #b3b3b3;
    font-size: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: regular;
`

const ButtonWrap = Styled.button`
    padding: 4px 12px 4px 12px;
    border-radius: 5px;
    color: black;
    background-color: ${POINT_COLOR};
    border: none;
    font-weight: bold;
    font-size: 13px;
    img {
      margin-right: 7px;
      width: 14px;
      height: 14px;
    }
  `

export default WarehousingRegisterContainer
