import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import dropdownButton from '../../Assets/Images/ic_dropdownbutton.png'
import Modal from 'react-modal'
import ReactShadowScroll from 'react-shadow-scroll'
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from 'semantic-ui-react'
import IcSearchButton from '../../Assets/Images/ic_search.png'
import {API_URLS, getBarcode} from '../../Api/mes/barcode'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Pagination from '@material-ui/lab/Pagination'
import Notiflix from 'notiflix'
import WithTextBox from '../Input/WithTextBox'
import RadioInput from '../Input/RadioInput'
import Check from '../../Assets/Images/ic_checkbox_y.png'
import RadioCheck from '../../Assets/Images/btn_radio_check.png'
import Radio from '../../Assets/Images/btn_radio.png'

//드롭다운 컴포넌트

interface IProps {
  select?: { name?: string, pk?: string },
  onClickEvent: any
  text: string
  buttonWid?: string | number
  disabled?: boolean
}

Notiflix.Loading.Init({svgColor: '#1cb9df'})

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi
const LotPickerModal = ({select, onClickEvent, text, buttonWid, disabled}: IProps) => {
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [machineName, setMachineName] = useState('')
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })
  const [lotList, setLotList] = useState([{
    pk: '', // 품목 기본 정보 pk,
    material_name: '', // 품목명 (string),
    LOT: '', // 로트 번호 (string)
    current_stock: '', // 총 중량 (number),
    safe_stock: '', // 안전 재고 (number),
    location_name: '', // 보관 장소-공장명 or 부속 공장명 (string),
    texture: '', // 재질 (string),
    material_spec_W: '', // 폭 (string),
    material_spec_D: '', // 두께 (string)
    warehousing_date: '' // 입고일 (string)
  }])
  const [historyLotList, setHistoryLotList] = useState([{
    pk: '', //작업이력 pk (string),
    LOT: '', // 로트 번호 (string),
    material_name: '', // 목표(전표, 생산계획에 등록된) 생산 품목명 (string),
    current_stock: '', // 해당 품목의 현재 재고량 (number),
    achieved: '', // 현재 생산 수량 / 목표 생산 수량 (string),
    lately: '', // 최근 작업일 (string, yyyy-MM-dd HH:mm),
    worker_name: '' // 최근 작업자명 (string),
  }])

  const [searchName, setSearchName] = useState<string>('')

  const [isFirst, setIsFirst] = useState<boolean>(false);
  const [saveKeyword, setSaveKeyword] = useState<string>('');

  const [type, setType] = useState<number>(0);

  const getList = useCallback(async (isSearch?: boolean) => {
    Notiflix.Loading.Circle()
    const tempUrl = `${API_URLS['lot'].list}?keyword=${saveKeyword}&option=${type}&page=${isSearch ? 1 : page.current}&limit=15` //?keyword=${saveKeyword}&page=${isSearch ? 1 : page.current}&limit=10
    const resultData = await getBarcode(tempUrl)
    if (resultData) {
      if(type === 2){
        setHistoryLotList(resultData.info_list)
      } else {
          setLotList(resultData.info_list)
      }
      setPage({current: resultData.current_page, total: resultData.total_page})
    }
    setIsFirst(true)
    Notiflix.Loading.Remove()
  }, [searchName, saveKeyword, isFirst, page.current, page.total, type, historyLotList, lotList])

  useEffect(() => {
    setIsDisabled(disabled ? true : false)
  }, [disabled])


  const handleClickBtn = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    getList()
  }, [page.current])

  useEffect(() => {
      if(isFirst){
          getList(true)
      }
  }, [saveKeyword, type])
  
  return (
    <div>
        <WithTextBox title={'품번/Lot 번호'}>
                <InputBox 
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    if (disabled) {
                        return
                      } else {
                        setIsOpen(true)
                      }
                  }}>
                    <p
                      style={{
                        width: '100%', 
                        padding: '0 0 0 10px', 
                        color: select && select.name ? 'black' : '#b3b3b3', 
                        fontSize: 15,
                        marginTop: 2
                      }}
                    >{select && (select.name ? select.name : text)}</p>
                    <div style={{backgroundColor: 'rgb(25, 185, 223)', textAlign: 'center'}}>
                      <img alt="search" src={IcSearchButton} style={{width: 20, verticalAlign: 'middle'}} />
                    </div>
                </InputBox>
            </WithTextBox>

      <Modal
        isOpen={isOpen}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0
          },
          overlay: {
            background: 'rgba(0,0,0,.6)',
            zIndex: 5
          }
        }}
      >
        <div style={{width: 900}}>
          <div style={{width: 860, minHeight: 530, maxHeight: 'auto', padding: 20}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <p style={{fontSize: 18, fontFamily: 'NotoSansCJKkr', fontWeight: 'bold'}}>• 품번/Lot 번호 검색</p>
            <RadioBox>
                <RadioInput title={''} width={0} line={false} target={type}
                            onChangeEvent={(e) => {console.log(e); setType(e);}}
                            index={123}
                            contents={[
                                {value: 0, title: '원자재'}, 
                                {value: 1, title: '완제품'}, 
                                {value: 2, title: '작업이력'}
                            ]} />
            </RadioBox>
          </div>
            
            <div style={{width: 860, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
              <SearchBox placeholder="검색어를 입력해 주세요." style={{flex: 96}}
                         value={searchName}
                         onKeyPress={(event) => event.key === 'Enter' && setSaveKeyword(searchName)}
                         onChange={(e) => {if(!e.target.value.match(regExp))setSearchName(e.target.value)}}/>
              <SearchButton style={{flex: 4}} onClick={() => setSaveKeyword(searchName)}>
                <img src={IcSearchButton}/>
              </SearchButton>
            </div>
            <div style={{minHeight: 310, maxHeight: 'auto', width: 860, backgroundColor: '#f4f6fa'}}>
              <ReactShadowScroll>
                {  type === 2 ?
                    <MachineTable>
                  <tr>
                    <th style={{width: 400}}>LOT 번호</th>
                    <th style={{width: 150}}>생산 품목명</th>
                    <th style={{width: 300}}>작업자명</th>
                    <th style={{width: 300}}>작업일</th>
                  </tr>
                  {historyLotList !== undefined && historyLotList.length === 0 ?
                    <tr>
                      <td colSpan={4} style={{textAlign: 'center'}}>데이터가 없습니다.</td>
                    </tr>
                    :
                    historyLotList.map((v, i) => {
                      return (
                        <tr style={{
                          height: 32,
                          backgroundColor: select ? v.pk === select.pk ? POINT_COLOR : '#ffffff' : '#ffffff',
                        }} onClick={() => {
                          setMachineName(v.LOT)
                          return onClickEvent({name: v.LOT, pk: v.pk})
                        }}>
                          <td><span>{v.LOT}</span></td>
                          <td><span>{v.material_name}</span></td>
                          <td><span>{v.worker_name}</span></td>
                          <td><span>{v.lately}</span></td>
                        </tr>
                      )
                    })
                  }
                </MachineTable>
                :<MachineTable>
                <tr>
                  <th style={{width: 400}}>품목명</th>
                  <th style={{width: 150}}>LOT 번호</th>
                  <th style={{width: 300}}>공장명</th>
                  <th style={{width: 300}}>입고일</th>
                </tr>
                {lotList !== undefined && lotList.length === 0 ?
                  <tr>
                    <td colSpan={4} style={{textAlign: 'center'}}>데이터가 없습니다.</td>
                  </tr>
                  :
                  lotList.map((v, i) => {
                    return (
                      <tr style={{
                        height: 32,
                        backgroundColor: select ? v.pk === select.pk ? POINT_COLOR : '#ffffff' : '#ffffff',
                      }} onClick={() => {
                        setMachineName(v.LOT)
                        return onClickEvent({name: v.LOT, pk: v.pk})
                      }}>
                        <td><span>{v.material_name}</span></td>
                        <td><span>{v.LOT}</span></td>
                        <td><span>{v.location_name}</span></td>
                        <td><span>{v.warehousing_date}</span></td>
                      </tr>
                    )
                  })
                }
              </MachineTable>
                }
              </ReactShadowScroll>
              <PaginationBox>
                <Pagination count={page.total ? page.total : 0} page={page.current}
                            onChange={(event, i) => setPage({...page, current: i})}
                            boundaryCount={1} color={'primary'}/>
              </PaginationBox>
            </div>
          </div>
          <div style={{width: 900}}>
            <CheckButton style={{left: 0, backgroundColor: '#e7e9eb'}} onClick={() => {
              onClickEvent({name: undefined, pk: undefined})
              setIsOpen(false)
            }}>
              <div>
                <span style={{color: '#666d79'}}>취소</span>
              </div>
            </CheckButton>
            <CheckButton style={{right: 0, backgroundColor: POINT_COLOR}} onClick={() => {
              setIsOpen(false)
            }}>
              <div>
                <span style={{color: 'black'}}>확인</span>
              </div>
            </CheckButton>
          </div>
        </div>
      </Modal>

    </div>
  )
}

const BoxWrap = Styled.button`
    border: 1px solid #b3b3b3;
    color: black;
    width: 100%;
    height: 32px;
    background-color: white;
    font-weight: bold;
    text-algin: center;
    font-size: 13px;
    display: flex;
    p{
        text-align: left;
        font-size: 15px;
        font-weight: bold;
    }
`

const InnerBoxWrap = Styled.button`
    padding: 5px 15px 4px 15px;
    border-radius: 0px;
    color: white;
    min-width: 100px;
    background-color: ${BG_COLOR_SUB};
    border: none;
    font-weight: bold;
    text-algin: left;
    p{
        text-algin: left;
     }
    font-size: 13px;
    img {
    margin-right: 7px;
    width: 14px;
    height: 14px;
    }
`

const SearchBox = Styled(Input)`
    input{
        padding-left: 8px;
        font-family: NotoSansCJKkr;
        height: 28px;
        border: 0.5px solid #b3b3b3;
        width: calc( 100% - 8px );
        background-color: #f4f6fa;
        font-size: 15px;
        &::placeholder:{
            color: #b3b3b3;
        };
     }
`

const SearchButton = Styled.button`
    background-color: ${POINT_COLOR};
    img{
        width: 20px;
        height: 20px;
        margin-top: 5px;
    }
`

const CheckButton = Styled.button`
    position: absolute;
    bottom: 0px;
    height: 46px;
    width: 50%;
    div{
        width: 100%;
    }
    span{
        line-height: 46px;
        font-family: NotoSansCJKkr;
        font-weight: bold;
    }
`

const MachineTable = Styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
    tr{
        height: 32px;
        border: 1px solid #b3b3b3;
        padding: 0px;
        th{
            text-align: left;
        }
        td{
            border-spacing: 0px;
            height: 32px;
            padding: 0; 
        }
    }
    
`


const PaginationBox = Styled.div`
    height: 60px;
    padding-top: 5px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    position:relative;
    .MuiButtonBase-root {
        color: black;
    }
    .MuiPaginationItem-root{
        color: black;
    }
`


const InputBox = Styled.div`
    background-color: #f4f6fa;
    border: solid 0.5px #d3d3d3;
    display: flex;
    &>input{
        width: calc(100% - 28px);
        height: 100%;
        background-color: transparent;
        border: 0;
        padding: 0 10px;
    }
    &>button{
        width: 86px;
        height: 100%;
        background-color: rgb(25, 185, 223);
        border-left: 0.5px solid rgb(211, 211, 211);
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
    }
    &>div{
        &:not(.plusBtn){
            cursor: pointer;
            width: 28px;
            height: 100%;
            background-color: #B3B3B3;
            text-align: center;
            &>img{
                width: 25px;
                vertical-align: middle;
            }
        }
    }
    .plusBtn{
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 30%;
        &>img{
            width: 17px;
            height: 17px;
            margin-right: 5px;
        }
    }
`


const RadioBox = Styled.div`
  display: flex;
  align-items: center;
  *{
    align-items: center;
  }
  input::-ms-input-placeholder { color: #b3b3b3; }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    background: url(${Check}) left/18px no-repeat; 
    border: 0;
  }
  input[type="checkbox"] {
    display: none;
  }
  form label{
    font-size: 10px;
    font-weight: 700;
  }

  input[type="radio"]:not(old) {
      margin:0; padding:0; opacity:0; 
      background: url(${Radio}) left/24px no-repeat; 
      width:18px;
      height: 18px;
      
  } 
  input[type="radio"]:not(old) + label {
      width:18px;
      height: 18px;
      display: inline-block; 
      text-align: left;
      resize: cover; 
      background: url(${Radio}) left/24px no-repeat; 
      background-size: 18px 18px;
      line-height: 130%; vertical-align: top;
  }
  input[type="radio"]:not(old):checked + label {
    background: url(${RadioCheck}) left/24px no-repeat;
    background-size: 18px 18px; 
  }
`


export default LotPickerModal
