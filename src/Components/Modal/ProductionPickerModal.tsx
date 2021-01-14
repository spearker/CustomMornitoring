import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import IcSearchButton from '../../Assets/Images/ic_search.png'
import Modal from 'react-modal'
import ReactShadowScroll from 'react-shadow-scroll'
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from 'semantic-ui-react'
import {API_URLS, getProductionSearch} from '../../Api/mes/production'
import {transferCodeToName} from '../../Common/codeTransferFunctions'
import Pagination from '@material-ui/lab/Pagination'
import Notiflix from 'notiflix'
import RadioInput from '../Input/RadioInput'
import Check from '../../Assets/Images/ic_checkbox_y.png'
import RadioCheck from '../../Assets/Images/btn_radio_check.png'
import Radio from '../../Assets/Images/btn_radio.png'

//드롭다운 컴포넌트

interface IProps {
  select?: { name?: string, type?: string, pk?: string }
  selectRange?: { material_pk: string, material_name: string, material_type: string, location: string }[]
  onClickEvent: any
  text: string
  width?: boolean
  type?: number
  style?: any
  innerStyle?: any
  innerWidth?: string | number
  buttonWid?: string | number
  disabled?: boolean
  isType?: boolean
  multiSelect?: boolean
  isAllItem?: boolean
  noBasic?: boolean
  filter?: number
  useFilter?: boolean
}

const DummyItem = [
  {
    item_pk: '',
    item_name: '',
    item_type: ''
  }
]

Notiflix.Loading.Init({svgColor: '#1cb9df'})

const ProductionPickerModal = ({
                                 select,
                                 selectRange,
                                 onClickEvent,
                                 text,
                                 width,
                                 type,
                                 style,
                                 innerWidth,
                                 innerStyle,
                                 buttonWid,
                                 disabled,
                                 isType,
                                 multiSelect,
                                 isAllItem,
                                 noBasic,
                                 filter,
                                 useFilter
                               }: IProps) => {
  //const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOpen, setIsOpen] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [page, setPage] = useState<PaginationInfo>({
    current: 1,
  })
  const [selectMaterial, setSelectMaterial] = useState<{ material_pk: string, material_name: string, material_type: string, location: string }[]>([])
  const [indexList, setIndexList] = useState<number[]>([])
  const [productList, setProductList] = useState([
    {
      pk: '',
      material_name: '',
      material_type: '',
      location: '',
      name: '',
      type: '',
      location_name: ''
    }
  ])
  const [typeFilter, setTypeFilter] = useState<number>(-1)

  useEffect(() => {
    if (selectRange) {
      setSelectMaterial(selectRange)
    }
  }, [selectRange])

  useEffect(() => {
    getList(true)
    setSelectMaterial([])
  }, [typeFilter])

  useEffect(() => {
    getList()
  }, [select, page.current])

  // const ref = useOnclickOutside(() => {
  //     setIsOpen(false);
  // });

  const getList = useCallback(async (isSearch?: boolean) => {
    Notiflix.Loading.Circle()
    let tempUrl = ''
    if (filter) {
      tempUrl = `${API_URLS['material'].filter}?keyword=${searchName}&filter=${filter}&page=${isSearch ? 1 : page.current}&limit=10`
    } else {
      tempUrl = `${API_URLS['material'].search}?keyword=${searchName}&option=${type !== undefined ? type : 0}&filter=${useFilter ? type === -1 ? -1 : typeFilter : -1}&page=${isSearch ? 1 : page.current}&limit=10`
    }

    const resultData = await getProductionSearch(tempUrl)
    if (resultData) {
      setProductList(resultData.info_list)
      setPage({current: resultData.current_page, total: resultData.total_page})
    }
    Notiflix.Loading.Remove()
  }, [searchName, page, typeFilter])

  const handleClickBtn = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseEvent = () => {
    // setSearchName('');
    setIsOpen(false)
  }

  const 투입품목 = [{value: -1, title: '전체'}, {value: 10, title: '반제품'}, {value: 0, title: '원자재'}, {
    value: 1,
    title: '부재료'
  }] // 0
  const 생산품목 = [{value: -1, title: '전체'}, {value: 10, title: '반제품'}, {value: 30, title: '완제품'}] // 1

  return (
    <div style={style}>
      <div style={{
        position: 'relative',
        display: 'inline-block',
        zIndex: 0,
        width: innerWidth ? innerWidth : width ? 867 : 917,
        ...innerStyle
      }}>
        <BoxWrap disabled={disabled} onClick={() => {
          setIsOpen(true)
        }} style={{padding: 0, backgroundColor: '#f4f6fa'}} type={'button'}>
          <div style={{display: 'inline-block', height: 32, width: innerWidth ? innerWidth : 885}}>
            {
              select && select.name ? <p style={{marginTop: 5}}>&nbsp; {select.name}</p>
                : <p style={{marginTop: 5, color: '#b3b3b3'}}>&nbsp; {text}</p>
            }
          </div>
          {
            !disabled && <div style={{
              display: 'inline-block',
              backgroundColor: POINT_COLOR,
              width: buttonWid ? buttonWid : 32,
              height: buttonWid ? buttonWid : 32
            }}>
                <img style={{width: 20, height: 20, marginTop: 5}} src={IcSearchButton}/>
            </div>
          }
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
            zIndex: 100
          }
        }}
      >
        <div style={{width: 900}}>
          <div style={{width: 860, minHeight: 530, maxHeight: 'auto', padding: 20}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p style={{fontSize: 18, fontFamily: 'NotoSansCJKkr', fontWeight: 'bold'}}>• 품목(품목명) 검색</p>
              {useFilter && type !== -1 && <RadioBox>
                  <RadioInput title={''} width={0} line={false} target={typeFilter}
                              onChangeEvent={(e) => setTypeFilter(e)}
                              contents={type === 0 ? 투입품목 : 생산품목}/>
              </RadioBox>}
            </div>
            <div style={{width: 860, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
              <SearchBox placeholder="품목(품목명)을 입력해주세요." style={{flex: 96}}
                         value={searchName}
                         onChange={(e) => setSearchName(e.target.value)}
                         onKeyPress={(event) => event.key === 'Enter' && getList(true)}
                // onKeyDown={(e) => {
                //   if (e.keyCode === 13) {
                //     getList()
                //   }
                // }}
              />
              <SearchButton style={{flex: 4}} onClick={() => {
                getList(true)
              }}>
                <img src={IcSearchButton}/>
              </SearchButton>
            </div>
            <div style={{minHeight: 310, maxHeight: 'auto', width: 860, backgroundColor: '#f4f6fa'}}>
              <ReactShadowScroll>
                <MachineTable>
                  <tr>
                    <th style={{width: 138}}>&nbsp; 품목명</th>
                    <th style={{width: 130}}>품목 종류</th>
                    <th style={{width: 130}}>공장명</th>

                  </tr>
                  {productList !== undefined && productList.length === 0 ?
                    <tr>
                      <td colSpan={4} style={{textAlign: 'center'}}>데이터가 없습니다.</td>
                    </tr>
                    :
                    productList.map((v, i) => {
                      return (
                        <tr style={{
                          height: 32, backgroundColor: selectMaterial.findIndex(
                            (o) => {
                              return o.material_pk === v.pk
                            }
                          ) !== -1 ? POINT_COLOR : '#ffffff',
                        }} onClick={() => {
                          let isCancel: boolean = false
                          const tmpIndexList = indexList
                          const tmpSelectMaterial = selectMaterial
                          const i = tmpSelectMaterial.findIndex((o) => {
                            return o.material_name === v.material_name
                          })

                          if (i !== -1) {
                            isCancel = true
                          }

                          if (isCancel) {
                            tmpIndexList.splice(tmpIndexList.indexOf(i), 1)
                            tmpSelectMaterial.splice(i, 1)
                            setIndexList([...tmpIndexList])
                            return setSelectMaterial([...tmpSelectMaterial])
                          } else {
                            if (multiSelect) {
                              tmpIndexList.push(i)
                              tmpSelectMaterial.push({
                                material_pk: v.pk,
                                material_name: filter ? v.name : v.material_name,
                                material_type: filter ? v.type : v.material_type,
                                location: filter ? v.location_name : v.location
                              })
                              setIndexList([...tmpIndexList])
                              return setSelectMaterial([...tmpSelectMaterial])
                            } else {
                              tmpIndexList[0] = i
                              tmpSelectMaterial[0] = {
                                material_pk: v.pk,
                                material_name: filter ? v.name : v.material_name,
                                material_type: filter ? v.type : v.material_type,
                                location: filter ? v.location_name : v.location
                              }
                              setIndexList([...tmpIndexList])
                              return setSelectMaterial([...tmpSelectMaterial])
                            }
                          }
                        }}>
                          <td><span>&nbsp; {filter ? v.name : v.material_name}</span></td>
                          <td>
                            <span>{transferCodeToName('material', filter ? v.type : v.material_type)}</span>
                          </td>
                          <td><span>{filter ? v.location_name : v.location}</span></td>
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
            <CheckButton
              style={{left: 0, backgroundColor: '#e7e9eb'}}
              onClick={() => handleCloseEvent()}>
              <div>
                <span style={{color: '#666d79'}}>취소</span>
              </div>
            </CheckButton>
            <CheckButton style={{right: 0, backgroundColor: POINT_COLOR}} onClick={() => {
              if (multiSelect) {
                onClickEvent(selectMaterial)
              } else {
                if (isAllItem) {
                  onClickEvent(selectMaterial[0])
                } else {
                  if (noBasic) {
                    if (isType) {
                      if (selectMaterial[0]) {
                        onClickEvent({
                          name: selectMaterial[0].material_name,
                          type: selectMaterial[0].material_type,
                          material_pk: selectMaterial[0].material_pk
                        })
                      }
                    } else {
                      if (selectMaterial[0]) {
                        onClickEvent({
                          name: selectMaterial[0].material_name,
                          material_pk: selectMaterial[0].material_pk
                        })
                      }
                    }
                  } else {
                    onClickEvent({
                      name: selectMaterial[0].material_name,
                      pk: selectMaterial[0].material_pk
                    })
                  }
                }
              }

              handleCloseEvent()
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
    text-align: center;
    font-size: 13px;
    display: flex;
    p{
        text-align: left;
        font-size: 15px;
        font-weight: bold;
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

const InnerBoxWrap = Styled.button`
    padding: 5px 15px 4px 15px;
    border-radius: 0px;
    color: white;
    min-width: 100px;
    background-color: ${BG_COLOR_SUB};
    border: none;
    font-weight: bold;
    text-align: left;
    p{
        text-align: left;
     }
    font-size: 13px;
    img {
    margin-right: 7px;
    width: 14px;
    height: 14px;
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

export default ProductionPickerModal
