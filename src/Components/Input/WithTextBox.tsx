import React, {useEffect} from 'react'
import Styled from 'styled-components'
import EnrollmentBorderBox from '../Box/EnrollmentBorderBox'

//children은 div로 감싸서 사용
interface IProps {
    title: string
    children: any
    borderUse?: boolean
    padding?: string
    stretch?:boolean
}

const WithTextBox = ({title, children, borderUse, padding, stretch}: IProps) => {

    return (
        <EnrollmentBorderBox borderUse={borderUse} padding={padding}>
            <InputBox style={{alignItems: stretch ? 'stretch ' : 'center'}}>
                <div>
                    <div>
                        {title !== '' && <Dot/>}
                        <p>{title}</p>
                    </div>
                </div>
                {children}
            </InputBox>
        </EnrollmentBorderBox>
    )
}

const InputBox = Styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    *{
        box-sizing: border-box;
    }
    &>div{
        &:first-child{
            &>div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                &>p{
                    width: 122px;
                    font-size: 15px;
                    font-weight: bold;
                }
            }
        }
        &:not(:first-child){
            width: calc(100% - 133px);
            height: 28px;
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


export default WithTextBox
