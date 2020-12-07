import React, {useEffect} from 'react'
import Styled from 'styled-components'
import IC_MINUS from '../../Assets/Images/ic_minus.png'


//바코드 규칙
interface IProps {
    title: string,
    value: string,
    onChangeEvent: any,
    onRemoveEvent: any,
}

const ModelRulesInput = ({title, value, onChangeEvent, onRemoveEvent}: IProps) => {
    useEffect(() => {

    }, [])

    return (

        <div style={{marginTop: 17, marginBottom: 17, display: 'flex', alignItems: 'center'}}>
            <p className="p-bold" style={{width: '20%', fontSize: 14, marginRight: 0}}>{title}</p>
            <InputBox style={{width: 'calc(100% - 40px)'}} type="text" value={value}
                      onChange={(e) => onChangeEvent(e.target.value)}
                      placeholder={'내용을 입력하세요.'}/>
            <img src={IC_MINUS} style={{width: 20, height: 20, marginLeft: 8, cursor: 'pointer'}}
                 onClick={onRemoveEvent}/>
        </div>

    )
}

const InputBox = Styled.input`
    border: solid 0.5px #d3d3d3;
    font-size: 14px;
    padding: 7px;
    padding-left: 10px;
    background-color: #f4f6fa;
`

const Wrapper = Styled.div`
    margin-top: 17px,
    margin-bottom: 17px,
    display:
    marginBottom:17, display:'flex', alignItems:'center'

`

export default ModelRulesInput
