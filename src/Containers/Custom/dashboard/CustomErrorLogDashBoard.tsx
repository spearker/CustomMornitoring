import React, { useEffect } from 'react'
import Styled from "styled-components";
import CustomErrorLogItem from "../../../Components/Custom/dashboard/CustomErrorLogItem";
import getYoudongErrorDashboard from "../../../Api/custom/getYoudongErrorDashboard";
import { YOUDONG_ERROR_CHART_ERROR_DATA, YOUDONG_ERROR_DASHBOARD } from "../../../Common/@types/youdong";

const dummy = new Array(5).fill('_').map(() => {
  return {
    machine_name: '제스텍 프레스',
    machine_code: '000-000-000',
    data: new Array(20).fill('_').map((_) => {
      return {
        error_status: '오버톤',
        error_time: '2020.06.16'
      }
    })
  }
})

const CustomErrorLogDashBoard: React.FunctionComponent = () => {
  const [ state, setState ] = React.useState<YOUDONG_ERROR_DASHBOARD[]>();

  useEffect(() => {
    getData().then(() => console.log('load success'))

    const documentEvent: any = document

    documentEvent.body.style.zoom = 1;
  }, [])

  const getData = async () => {
    const response = await getYoudongErrorDashboard()

    if (response !== null) {
      setState(response)
    }
  }


  return (
      <DashboardWrapDiv>
        {
          state && state.map((data: YOUDONG_ERROR_DASHBOARD) => <CustomErrorLogItem data={data} key={data.pressName}/>)
        }
      </DashboardWrapDiv>
  )
}

const DashboardWrapDiv = Styled.div`
    width: 100%;
    display: flex;
    background-image: linear-gradient(to right, #202e4a 0%, #0f1722 100%);
    margin: 56px;
`

export default CustomErrorLogDashBoard
