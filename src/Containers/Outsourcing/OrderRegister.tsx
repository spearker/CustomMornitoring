import React, { useCallback, useEffect, useState } from 'react';
import { POINT_COLOR, TOKEN_NAME } from '../../Common/configset'
import Header from '../../Components/Text/Header';
import WhiteBoxContainer from '../../Containers/WhiteBoxContainer';
import NormalInput from '../../Components/Input/NormalInput';
import RegisterButton from '../../Components/Button/RegisterButton';
import { getToken } from '../../Common/tokenFunctions';
import { getParameter, getRequest, postRequest } from '../../Common/requestFunctions';
import { uploadTempFile } from '../../Common/fileFuctuons';
import ListHeader from '../../Components/Text/ListHeader';
import { useHistory } from 'react-router-dom'
import ColorCalendarDropdown from "../../Components/Dropdown/ColorCalendarDropdown";
import InputContainer from "../InputContainer";
import Styled from "styled-components";
import ProductionPickerModal from "../../Components/Modal/ProductionPickerModal";
import NormalAddressInput from "../../Components/Input/NormalAddressInput";
import useObjectInput from "../../Functions/UseInput";
import OutsourcingPickerModal from "../../Components/Modal/OutsourcingRegister";
import NormalNumberInput from "../../Components/Input/NormalNumberInput";

// 발주 등록 페이지
// 주의! isUpdate가 true 인 경우 수정 페이지로 사용
interface Props {
  match: any;
  // chilren: string;
}

const OutsourcingRegister = ({ match }: Props) => {
  const history = useHistory()

  const [ selectDate, setSelectDate ] = useState<string>('')
  const [ pk, setPk ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const [ no, setNo ] = useState<number>();
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

  const [ paths, setPaths ] = useState<any[1]>([ null ]);
  const [ oldPaths, setOldPaths ] = useState<any[1]>([ null ]);


  const [ selectMaterial, setSelectMaterial ] = useState<{ name?: string, pk?: string }>()
  const [ selectOutsource, setSelectOutsource ] = useState<{ name?: string, pk?: string }>()
  const [ quantity, setQuantity ] = useState<number>(0)
  const [ unpaid, setUnpaid ] = useState<number>(0)
  const [ paymentCondition, setPaymentCondition ] = useState('')
  const [ inputData, setInputData ] = useObjectInput('CHANGE', {
    name: '',
    description: '',
    location: {
      postcode: '',
      roadAddress: '',
      detail: '',
    },

  });

  const [ isUpdate, setIsUpdate ] = useState<boolean>(false);


  useEffect(() => {
    if (match.params.pk) {
      ////alert(`수정 페이지 진입 - pk :` + param)
      setIsUpdate(true)
      getData()
    }

  }, [])


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
   * getData()
   * 기계 정보 수정을 위한 조회
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @returns X
   */
  const getData = useCallback(async () => {

    const res = await getRequest('http://183.99.194.242:8299/api/v1/outsourcing/order/load?pk=' + match.params.pk, getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200) {
        const data = res.results;
        setSelectOutsource({ name: data.company_name, pk: data.company_pk })
        setSelectMaterial({ name: data.product, pk: data.product_pk })
        setInputData('location', data.address)
        setQuantity(data.quantity)
        setUnpaid(data.unpaid)
        setSelectDate(data.due_date)
        setPaymentCondition(data.payment_condition)

      } else {
        //TODO:  기타 오류
      }
    }
  }, [ pk, selectOutsource, selectMaterial, selectDate, quantity, unpaid, paymentCondition, inputData ])

  /**
   * onsubmitFormUpdate()
   * 기계 정보 수정 요청
   * @param {string} url 요청 주소
   * @param {string} pk 기계 pk
   * @param {string} name 이름
   * @param {string} no 넘버
   * @param {object(file)} file 사진 파일
   * @param {string} info 상세정보
   * @param {string} made 제조정보
   * @param {string} type 종류
   * @param {string} madeNo 제조사넘버
   * @returns X
   */
  const onsubmitFormUpdate = useCallback(async () => {

    if (selectOutsource?.pk === '') {
      alert("외주처는 필수 항목입니다. 반드시 선택해주세요.")
      return;
    } else if (selectMaterial?.pk === '') {
      alert("품목은 필수 항목입니다. 반드시 선택해주세요.")
      return;
    } else if (quantity === null) {
      alert("수량은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (unpaid === null) {
      alert("미납 수량은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (paymentCondition === '') {
      alert("대급 지불조건은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (selectDate === '') {
      alert("납기일은 필수 항목입니다. 반드시 선택주세요.")
      return;
    } else if (inputData.location.postcode === '') {
      alert("공장 주소는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }


    const data = {
      pk: match.params.pk,
      company: selectOutsource?.pk,
      product: selectMaterial?.pk,
      quantity: quantity.toString(),
      unpaid: unpaid.toString(),
      due_date: selectDate,
      payment_condition: paymentCondition,
      address: inputData.location
      //info_list : infoList.length > 0 ? JSON.stringify(infoList) : null,

    };
    const res = await postRequest('http://183.99.194.242:8299/api/v1/outsourcing/oder/update/', data, getToken(TOKEN_NAME))

    if (res === false) {
      ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
    } else {
      if (res.status === 200) {
        //alert('성공적으로 수정 되었습니다')
        setIsUpdate(false)
        history.goBack()
      } else {
        ////alert('요청을 처리 할 수 없습니다 다시 시도해주세요.')
      }
    }

  }, [ pk, selectOutsource, selectMaterial, selectDate, quantity, unpaid, paymentCondition, inputData ])

  useEffect(() => {
    console.log(selectMaterial)
  }, [ selectMaterial ])
  /**
   * onsubmitForm()
   * 기계 정보 등록
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

    ////alert(JSON.stringify(infoList))
    if (selectOutsource?.pk === '') {
      alert("외주처는 필수 항목입니다. 반드시 선택해주세요.")
      return;
    } else if (selectMaterial?.pk === '') {
      alert("품목은 필수 항목입니다. 반드시 선택해주세요.")
      return;
    } else if (quantity === null) {
      alert("수량은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (unpaid === null) {
      alert("미납 수량은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (paymentCondition === '') {
      alert("대급 지불조건은 필수 항목입니다. 반드시 입력해주세요.")
      return;
    } else if (selectDate === '') {
      alert("납기일은 필수 항목입니다. 반드시 선택주세요.")
      return;
    } else if (inputData.location.postcode === '') {
      alert("공장 주소는 필수 항목입니다. 반드시 입력해주세요.")
      return;
    }

    const data = {
      company: selectOutsource?.pk,
      product: selectMaterial?.pk,
      quantity: quantity.toString(),
      unpaid: unpaid.toString(),
      due_date: selectDate,
      payment_condition: paymentCondition,
      address: inputData.location

    };

    console.log(inputData.location)

    const res = await postRequest('http://183.99.194.242:8299/api/v1/outsourcing/order/register', data, getToken(TOKEN_NAME))

    if (res === false) {
      //TODO: 에러 처리
    } else {
      if (res.status === 200) {
        //alert('성공적으로 등록 되었습니다')
        history.push('/outsourcing/order/list')

      } else {
        //TODO:  기타 오류
      }
    }

  }, [ selectOutsource, selectMaterial, selectDate, quantity, unpaid, paymentCondition, inputData ])


  return (
      <div>
        <Header title={isUpdate ? '발주 수정' : '발주 등록'}/>
        <WhiteBoxContainer>
          <ListHeader title="필수 항목"/>
          <InputContainer title={"외주처 명"} width={120}>
            <OutsourcingPickerModal select={selectOutsource}
                                    onClickEvent={(e) => {
                                      setSelectOutsource({ ...selectOutsource, ...e })
                                    }} text={"외주처 명을 검색해주세요."}/>
          </InputContainer>
          <InputContainer title={"품목(품목명)"} width={120}>
            <ProductionPickerModal select={selectMaterial}
                                   onClickEvent={(e) => {
                                     setSelectMaterial({ ...selectMaterial, ...e })
                                   }} text={"품목명을 검색해주세요."} type={1}/>
          </InputContainer>
          <NormalNumberInput title={'수량'} value={Number(quantity)} onChangeEvent={setQuantity}
                             description={'수량을 입력하세요.'} width={120}/>
          <NormalNumberInput title={'미납 수량'} value={Number(unpaid)} onChangeEvent={setUnpaid}
                             description={'미납 수량을 입력하세요.'} width={120}/>
          <NormalInput title={'대금 지불조건'} value={paymentCondition} onChangeEvent={setPaymentCondition}
                       description={'대금 지불조건을 입력해 주세요.'} width={120}/>
          <InputContainer title={"납기일"} width={120}>
            <div style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#f4f6fa',
              border: '0.5px solid #b3b3b3',
              height: 32
            }}>
              <div style={{ width: 817, display: 'table-cell' }}>
                <div style={{ marginTop: 5 }}>
                  {
                    selectDate === ''
                        ? <InputText>&nbsp; 납기일을 선택해 주세요.</InputText>
                        : <InputText style={{ color: '#111319' }}>&nbsp; {selectDate}</InputText>
                  }
                </div>
              </div>
              <ColorCalendarDropdown select={selectDate} onClickEvent={(select) => {
                setSelectDate(select)
              }} text={'날짜 선택'} type={'single'} customStyle={{ height: 32, marginLeft: 0 }}/>
            </div>
          </InputContainer>
          <NormalAddressInput title={'공장 주소'} value={inputData.location}
                              onChangeEvent={(input) => setInputData(`location`, input)}/>
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
          {isUpdate ?
              <div style={{ marginTop: 40, marginLeft: 340 }}>
                <ButtonWrap onClick={async () => {
                  await onsubmitFormUpdate()
                }}>
                  <div style={{ width: 360, height: 40 }}>
                    <p style={{ fontSize: 18, marginTop: 15 }}>수정하기</p>
                  </div>
                </ButtonWrap>
              </div>
              :
              <div style={{ marginTop: 40, marginLeft: 340 }}>
                <ButtonWrap onClick={async () => {
                  await onsubmitForm()
                }}>
                  <div style={{ width: 360, height: 40 }}>
                    <p style={{ fontSize: 18, marginTop: 15 }}>등록하기</p>
                  </div>
                </ButtonWrap>
              </div>
          }
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
    margin-bottom: 20px;
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

export default OutsourcingRegister;
