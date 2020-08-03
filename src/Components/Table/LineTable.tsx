import React from "react";
import Styled from "styled-components";

interface Props {
    title?: string,
    contentTitle?: object
    contentList?: any[]
    children?: any
}

const LineTable: React.FunctionComponent<Props> = ({title,contentTitle,contentList,children}:Props) => {
    return(
        <ClickBar>
            <ClickTitle>{title}</ClickTitle>
            <ContentTitle>
                {contentTitle !== undefined ?
                    Object.keys(contentTitle).map((v, i) => {
                        console.log(v)
                        return (
                            <p key={v} className="p-limits">{contentTitle[v]}</p>
                        )
                    }) :
                    null
                }
            </ContentTitle>
            <div>
                {children == undefined  || children === null ? <></> : children }
            </div>
            {contentList !== undefined ?
                contentList.map((v, i) => {
                    {console.log('ㅇㅇㅇㅇ',v)}
                    return (
                        <Content key={i} >
                            { contentTitle !== undefined ?
                                Object.keys(contentTitle).map((mv, mi) => {
                                    return (
                                        v[mv] !== null && v[mv] !== undefined  ?
                                            <p key={mv} className="p-limits" >
                                                {
                                                    typeof v[mv] === 'object' ?
                                                        Object.keys(v[mv]).map(m => {
                                                            return  v[mv][m] + ' '
                                                        })
                                                        :
                                                        v[mv]
                                                }
                                            </p>
                                            :
                                            null
                                    )
                                }) :
                                null
                            }
                        </Content>
                    )
                }) :
                null
            }
        </ClickBar>
    )
}

const ClickBar = Styled.div`
    color: #ffffff
    width: 100%;
    text-align: left;
    max-height: 430px !important;
    min-height: 110px;
    overflow-y: scroll;
    border-radius: 6px;
`

const ClickTitle = Styled.p`
    font-size: 19px;
    font-family: NotoSansCJKkr-Bold;
`


const ContentTitle = Styled.div`
    font-family: NotoSansCJKkr-Bold;
    display: flex;
    flex-direction: row;  
    color: #ffffff
    font-size: 17px;
    width: 100%;
    align-items: center;
    text-align: left;
    margin-top: 30px;
`

const Content = Styled.div`
    font-family: NotoSansCJKkr-Bold;
    display: flex;
    flex-direction: row;  
    color: #ffffff;
    font-size: 17px;
    width: 100%;
    align-items: center;
    text-align: left;
    margin-top: 20px;
`

export default LineTable


