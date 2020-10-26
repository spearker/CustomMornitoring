import React, { useEffect } from 'react'
import Styled from "styled-components";
import CustomErrorLogItem from "../../../Components/Custom/dashboard/CustomErrorLogItem";
import getYoudongErrorDashboard from "../../../Api/custom/getYoudongErrorDashboard";
import { YOUDONG_ERROR_CHART_ERROR_DATA, YOUDONG_ERROR_DASHBOARD } from "../../../Common/@types/youdong";
import { RotateSpinner } from "react-spinners-kit";
import Modal from "react-modal";

const CustomErrorLogDashBoard: React.FunctionComponent = () => {
  const [ state, setState ] = React.useState<YOUDONG_ERROR_DASHBOARD[]>();
  const [ isFirstLoad, setIsFirstLoad ] = React.useState(false);

  useEffect(() => {
    getData().then(() => console.log('load success'))

    const documentEvent: any = document

    documentEvent.body.style.zoom = .9;
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
          isFirstLoad && <Modal
              isOpen={isFirstLoad}
              style={{
                content: {
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  border: 'none',
                  top: '45%',
                  left: '50%',
                  right: 'auto',
                  width: 300,
                  height: 300,
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  padding: 100
                },
                overlay: {
                  background: 'rgba(0,0,0,.6)',
                  zIndex: 5
                }
              }}
          >
            <div>
              <RotateSpinner size={208} color={'rgba(255, 255, 255, .8)'} loading={isFirstLoad}/>
            </div>
          </Modal>
        }

        {
          state && state.map((data: YOUDONG_ERROR_DASHBOARD) => <CustomErrorLogItem data={data} key={data.pressName}/>)
        }
      </DashboardWrapDiv>
  )
}

const DashboardWrapDiv = Styled.div`
    width: 100%;
    display: flex;
    margin-left: 24px;
    background-image: linear-gradient(to right, #202e4a 0%, #0f1722 100%);
`

export default CustomErrorLogDashBoard
