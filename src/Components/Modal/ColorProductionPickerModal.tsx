import React, {useCallback, useEffect, useState} from 'react'
import Styled from 'styled-components'
import {BG_COLOR_SUB, POINT_COLOR} from '../../Common/configset'
import IcSearchButton from '../../Assets/Images/ic_search.png'
import Modal from 'react-modal'
import ReactShadowScroll from 'react-shadow-scroll'
import ic_check from '../../Assets/Images/ic_check.png'
import {Input} from 'semantic-ui-react'
import Notiflix from 'notiflix'
import {API_URLS, getProductionSearch} from '../../Api/mes/production'
import EnrollmentBorderBox from '../Box/EnrollmentBorderBox'
import ColorOnlyDropdown from '../Dropdown/ColorOnlyDropdown'

//드롭다운 컴포넌트

interface IProps {
    placeholder: string
    value: string
    title: string
    select?: { name?: string, pk?: string }
    onClickEvent: any
    type?: number
    style?: any
    innerWidth?: string | number
    buttonWid?: string | number
    disabled?: boolean
    addIsOpen?: boolean // 앞에 add는 추가적 입력이 있을 경우 사용
    addInputType?: 'input' | 'select'
    addType?: string
    addPlaceholder?: string
    addValue?: string | number
    onAddChangeEvent?: any
    addUnit?: string
    addContents?: string[]
}

const DummyItem = [
    {
        item_pk: '',
        item_name: '',
        item_type: ''
    }
]

Notiflix.Loading.Init({svgColor: '#1cb9df'})

const ColorProductionPickerModal = ({title, placeholder, value, select, onClickEvent, type, style, innerWidth, buttonWid, disabled, addIsOpen, addInputType, addType, addPlaceholder, addValue, onAddChangeEvent, addUnit, addContents}: IProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [page, setPage] = useState<PaginationInfo>({
        current: 1,
    })
    const [productList, setProductList] = useState([
        {
            pk: '',
            material_name: '',
            material_type: '',
            location: '',
        }
    ])

    const getList = useCallback(async () => {
        Notiflix.Loading.Circle()
        const tempUrl = `${API_URLS['material'].search}?keyword=${searchName}&option=${type ? type : 0}&page=${page.current}&limit=10`
        const resultData = await getProductionSearch(tempUrl)
        if (resultData) {
            setProductList(resultData.info_list)
        }
    }, [searchName])

    useEffect(() => {
        getList()
    }, [select])

    return (
        <div style={style}>
            <EnrollmentBorderBox>
                <InputBox>
                    <Dot/>
                    <p>{title}</p>
                    <div onClick={() => {
                        setIsOpen(true)
                    }}>
                        <p style={{color: value === "" ? '#11131970' : '#111319'}}>{value === '' ? placeholder : value}</p>
                        <div>
                            <img src={IcSearchButton} alt="search"/>
                        </div>
                    </div>
                </InputBox>
                {addIsOpen && addInputType === 'input' && <InputBox style={{marginTop: 8}}>
                    <div style={{width: 11}}/>
                    <p>&nbsp;</p>
                    <div>
                        <input type={addType ? addType : 'text'} placeholder={addPlaceholder ? addPlaceholder : ''}
                               value={addValue ? addValue : ''} onChange={(e) => {
                            onAddChangeEvent(e.target.value)
                        }}/>
                        {addUnit && <p>{addUnit}</p>}
                    </div>
                </InputBox>}
                {addIsOpen && addInputType === 'select' && <InputBox style={{marginTop: 8}}>
                    <div style={{width: 11}}/>
                    <p>&nbsp;</p>
                    <ColorOnlyDropdown
                        list={addContents ? addContents : []}
                        value={addValue === 0 || !addValue ? '' : addValue}
                        onChangeEvent={(input: number) => {
                            onAddChangeEvent(input)
                        }} placeholder={addPlaceholder ? addPlaceholder : ''}/>
                </InputBox>}
            </EnrollmentBorderBox>

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
                        <p style={{fontSize: 18, fontFamily: 'NotoSansCJKkr', fontWeight: 'bold'}}>• 품목(품목명) 검색</p>
                        <div style={{width: 860, display: 'flex', flexDirection: 'row', marginBottom: 12}}>
                            <SearchBox placeholder="품목(품목명)을 입력해주세요." style={{flex: 96}}
                                       onChange={(e) => setSearchName(e.target.value)}/>
                            <SearchButton style={{flex: 4}}>
                                <img src={IcSearchButton}/>
                            </SearchButton>
                        </div>
                        <div style={{minHeight: 530, maxHeight: 'auto', width: 860, backgroundColor: '#f4f6fa'}}>
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
                                                                onClickEvent({
                                                                    type: v.material_type,
                                                                    pk: v.pk,
                                                                    name: v.material_name
                                                                })
                                                                if (onAddChangeEvent) {
                                                                    onAddChangeEvent('')
                                                                }
                                                            }}
                                                            style={{
                                                                backgroundColor: select ? v.pk === select.pk ? POINT_COLOR : '#dfdfdf' : '#dfdfdf',
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
                        <CheckButton style={{left: 0, backgroundColor: '#e7e9eb'}} onClick={() => {
                            onClickEvent({type: '', pk: '', name: ''})
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          font-size: 15px;
          cursor: pointer;
          &:not(.noStyle){
            padding: 0 20px 0 10px;
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
            &>input{
                width: 100%;
                height: 100%;
                border: 0;
                background-color: transparent;
                font-size: 15px;
                &::placeholder{
                    color: #11131970;
                    font-size: 15px;
                }
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

export default ColorProductionPickerModal
