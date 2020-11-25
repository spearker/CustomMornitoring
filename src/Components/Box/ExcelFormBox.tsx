import React from "react";
import Styled from 'styled-components'

interface Props {
    title: string
    excelName: string
}

const ExcelFormBox: React.FunctionComponent<Props> = ({title, excelName}) => {
    return (
        <div style={{display: 'flex'}}>
            <FormBox>
                <p>{title}</p>
                <FormDownload>양식 다운로드</FormDownload>
            </FormBox>
            <ExcelNameBox>
                <p>{excelName}</p>
                <ExcelDownLoad>
                    다운로드
                </ExcelDownLoad>
                <ExcelUpload>
                    업로드
                </ExcelUpload>
            </ExcelNameBox>
        </div>
    )
}

const FormBox = Styled.div`
  color: white;
  width: 280px;
  height: 50px;
  border-radius: 6px;
  background-color: #111319;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 16px;
  padding: 0 16px;
  p{
   text-align:left;
   width: 120px;
   font-family: NotoSansCJKkr;
   font-size: 18px;
   font-weight: bold;
   font-stretch: normal;
  }
`

const FormDownload = Styled.button`
  color: white;
  width: 126px;
  height: 30px;
  border-radius: 6px;
  background-color: #717c90;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
`

const ExcelNameBox = Styled.div`
  width: 804px;
  height: 50px;
  display: flex;
  border-radius: 6px;
  background-color: #353b48;
  align-items: center;
  padding: 0 16px;
  p{
    text-align: left;
    width: 578px;
  }
`

const ExcelDownLoad = Styled.button`
  width: 96px;
  height: 30px;
  border-radius: 6px;
  background-color: #717c90;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  margin-right: 16px;
`

const ExcelUpload = Styled.button`
  width: 82px;
  height: 30px;
  border-radius: 6px;
  background-color: #717c90;
`

export default ExcelFormBox
