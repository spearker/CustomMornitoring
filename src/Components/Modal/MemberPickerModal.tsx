import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import Modal from 'react-modal'
import ReactShadowScroll from 'react-shadow-scroll'
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from 'semantic-ui-react'
import IcSearchButton from '../../Assets/Images/ic_search.png'
import {API_URLS, getMemberList} from '../../Api/mes/member'
import Pagination from '@material-ui/lab/Pagination'
import Notiflix from 'notiflix'
import RadioInput from '../Input/RadioInput'
import Check from '../../Assets/Images/ic_checkbox_y.png'
import RadioCheck from '../../Assets/Images/btn_radio_check.png'
import Radio from '../../Assets/Images/btn_radio.png'

//드롭다운 컴포넌트

interface IProps {
  select?: { name?: string, type?: number, pk?: string },
  onClickEvent: any
  text: string
  buttonWid?: string | number
  disabled?: boolean
  style?: any
  type?: string
  onChangeAuth?: (select: number) => void;
  auth?: number
}

const DummyMachine = [
  {
    pk: '',
    name: '',
  }
]

Notiflix.Loading.Init({svgColor: '#1cb9df'})

const regExp = /[\{\}\[\]\?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi
const MemberPickerModal = ({select, onClickEvent, text, buttonWid, disabled, style, type, auth, onChangeAuth}: IProps) => {
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOpen, setIsOpen] = useState(false)
  const [machineName, setMachineName] = useState('')

  const [machineList, setMachineList] = useState(DummyMachine)
  const [searchName, setSearchName] = useState<string>('')

  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })

  const [isFirst, setIsFirst] = useState<boolean>(false);
  const [saveKeyword, setSaveKeyword] = useState<string>('');

  const getList = useCallback(async (isSearch?: boolean) => {
    Notiflix.Loading.Circle()
    const tempUrl = auth !== undefined ? `${API_URLS['member'].list}?keyword=${saveKeyword}&page=${isSearch ? 1 : page.current}&limit=10&auth=${auth}` : `${API_URLS['member'].list}?keyword=${searchName}&page=${isSearch ? 1 : page.current}&limit=10`
    const resultData = await getMemberList(tempUrl)
    if (resultData) {
      setMachineList(resultData.info_list)
      setPage({current: resultData.current_page, total: resultData.total_page})
      setIsFirst(true)
    }
    Notiflix.Loading.Remove()
  }, [searchName, saveKeyword, isFirst, page, auth])


  const handleClickBtn = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if(isFirst){
      getList(true)
    }
    }, [auth, saveKeyword])

  useEffect(() => {
    getList()
  }, [page.current])

  return (
    <div>
      <div style={{display: 'inline-block', zIndex: 0, width: '100%', ...style}}>
        <BoxWrap disabled={disabled} onClick={() => {
          setIsOpen(true)
        }} style={{padding: 0, backgroundColor: '#f4f6fa'}}>
          <div style={{display: 'inline-block', height: 32, width: '100%'}}>
            {
              select && select.name ? <p style={{marginTop: 5}}>&nbsp; {select.name}</p>
                : <p style={{marginTop: 5, color: '#b3b3b3'}}>&nbsp; {text}</p>
            }
          </div>
          <div style={{
            display: 'inline-block',
            backgroundColor: POINT_COLOR,
            width: buttonWid ? buttonWid : 30,
            height: buttonWid ? buttonWid : 30
          }}>
            <img style={{width: 20, height: 20, marginTop: 5}} src={IcSearchButton}/>
          </div>

        </BoxWrap>
      </div>
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
              <p style={{
                fontSize: 18,
                fontFamily: 'NotoSansCJKkr',
                fontWeight: 'bold'
              }}>• {type ? type : '작업자'} 검색</p>
              {onChangeAuth !== undefined && 
                <RadioBox>
                  <RadioInput title={''} width={0} line={false} target={auth !== undefined ? auth : -1}
                              onChangeEvent={(e) => onChangeAuth(e)}
                              contents={[{value: -1, title: '모든 권한'}, {value: 0, title: '관리자'}, {
                                value: 1, title: '작업자'
                              }]} />
                </RadioBox>
              }

            </div>
            <div style={{width: 860, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
              <SearchBox
                placeholder={type ? `${type}명을 입력해주세요.` : '작업자명을 입력해주세요.'}
                style={{flex: 96}}
                value={searchName}
                onKeyPress={(event) => event.key === 'Enter' && setSaveKeyword(searchName)}
                onChange={(e) => {if(!e.target.value.match(regExp))setSearchName(e.target.value)}}/>
              <SearchButton style={{flex: 4}} onClick={() => setSaveKeyword(searchName)}>
                <img src={IcSearchButton}/>
              </SearchButton>
            </div>
            <div style={{minHeight: 310, maxHeight: 'auto', width: 860, backgroundColor: '#f4f6fa'}}>
              <ReactShadowScroll>
                <MachineTable>
                  <tr>
                    <th style={{width: 840}}>이름</th>
                  </tr>
                  {machineList !== undefined && machineList.length === 0 ?
                    <tr>
                      <td colSpan={5} style={{textAlign: 'center'}}>데이터가 없습니다.</td>
                    </tr>
                    :
                    machineList.map((v, i) => {
                      return (
                        <tr style={{
                          height: 32,
                          backgroundColor: select ? v.pk === select.pk ? POINT_COLOR : '#ffffff' : '#ffffff',
                        }} onClick={() => {
                          setMachineName(v.name)
                          return onClickEvent({name: v.name, pk: v.pk})
                        }}>
                          <td><span>{v.name}</span></td>
                        </tr>
                      )
                    })
                  }
                </MachineTable>
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
              if(onChangeAuth!== undefined) onChangeAuth(-1);
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
    width: 32px;
    height: 32px;
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
    border: 0/* 1.5px solid #00000040 */;
    border-radius: 4px;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    background: url(${Check}) left/18px no-repeat; 
    border: 0/* 1.5px solid orange */;
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

export default MemberPickerModal


