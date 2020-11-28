import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import IcSearchButton from '../../Assets/Images/ic_search.png'
import Modal from 'react-modal'
import ReactShadowScroll from 'react-shadow-scroll'
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from 'semantic-ui-react'
import {API_URLS, getProductionSearch} from '../../Api/mes/production'

//드롭다운 컴포넌트

interface IProps {
  select?: { name?: string, type?: string, pk?: string }
  selectRange?: { name?: string, type?: number, pk?: string }[]
  onClickEvent: any
  text: string
  width?: boolean
  type?: number
  style?: any
  innerWidth?: string | number
  buttonWid?: string | number
  disabled?: boolean
  isType?: boolean
  multiSelect?: boolean
  isAllItem?: boolean
}

const DummyItem = [
  {
    item_pk: '',
    item_name: '',
    item_type: ''
  }
]

const ProductionPickerModal = ({select, selectRange, onClickEvent, text, width, type, style, innerWidth, buttonWid, disabled, isType, multiSelect, isAllItem}: IProps) => {
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
    }
  ])

  // const ref = useOnclickOutside(() => {
  //     setIsOpen(false);
  // });

  const getList = useCallback(async () => {
    const tempUrl = `${API_URLS['material'].search}?keyword=${searchName}&option=${type ? type : 0}&page=${page.current}&limit=1000`
    const resultData = await getProductionSearch(tempUrl)

    setProductList(resultData.info_list)

  }, [searchName])

  const handleClickBtn = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    getList()
  }, [select])

  return (
    <div style={style}>
      <div style={{
        position: 'relative',
        display: 'inline-block',
        zIndex: 0,
        width: innerWidth ? innerWidth : width ? 867 : 917
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
          <div style={{
            display: 'inline-block',
            backgroundColor: POINT_COLOR,
            width: buttonWid ? buttonWid : 32,
            height: buttonWid ? buttonWid : 32
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
          <div style={{width: 860, height: 440, padding: 20}}>
            <p style={{fontSize: 18, fontFamily: 'NotoSansCJKkr', fontWeight: 'bold'}}>• 품목(품목명) 검색</p>
            <div style={{width: 860, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
              <SearchBox placeholder="품목(품목명)을 입력해주세요." style={{flex: 96}}
                         onChange={(e) => setSearchName(e.target.value)}/>
              <SearchButton style={{flex: 4}}>
                <img src={IcSearchButton}/>
              </SearchButton>
            </div>
            <div style={{height: 310, width: 860, backgroundColor: '#f4f6fa', overflowY: 'scroll'}}>
              <ReactShadowScroll>
                <MachineTable>
                  <tr>
                    <th style={{width: 138}}>&nbsp; 품목명</th>
                    <th style={{width: 130}}>품목 종류</th>
                    <th style={{width: 130}}>공장명</th>
                    <th style={{width: 30}}></th>
                  </tr>
                  {productList !== undefined && productList.length === 0 ?
                    <tr>
                      <td colSpan={4} style={{textAlign: 'center'}}>데이터가 없습니다.</td>
                    </tr>
                    :
                    productList.map((v, i) => {
                      return (
                        <tr style={{height: 32}}>
                          <td><span>&nbsp; {v.material_name}</span></td>
                          <td><span>{v.material_type}</span></td>
                          <td><span>{v.location}</span></td>
                          <td>
                            <button
                              onSubmit={() => {
                              }}
                              onClick={() => {
                                let isCancel: boolean = false
                                const tmpIndexList = indexList
                                const tmpSelectMaterial = selectMaterial

                                if (tmpIndexList.indexOf(i) !== -1) {
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
                                      material_name: v.material_name,
                                      material_type: v.material_type,
                                      location: v.location
                                    })
                                    setIndexList([...tmpIndexList])
                                    return setSelectMaterial([...tmpSelectMaterial])
                                  } else {
                                    tmpIndexList[0] = i
                                    tmpSelectMaterial[0] = {
                                      material_pk: v.pk,
                                      material_name: v.material_name,
                                      material_type: v.material_type,
                                      location: v.location
                                    }
                                    setIndexList([...tmpIndexList])
                                    return setSelectMaterial([...tmpSelectMaterial])
                                  }
                                }
                              }}
                              style={{
                                backgroundColor: indexList.indexOf(i) !== -1 ? POINT_COLOR : '#dfdfdf',
                                width: 32,
                                height: 32,
                                margin: 0
                              }}
                            >
                              <img src={ic_check} style={{width: 20, height: 20}}/>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </MachineTable>
              </ReactShadowScroll>
            </div>
          </div>
          <div style={{width: 900}}>
            <CheckButton style={{left: 0, backgroundColor: '#e7e9eb'}} onClick={() => setIsOpen(false)}>
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
                }
              }

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

export default ProductionPickerModal
