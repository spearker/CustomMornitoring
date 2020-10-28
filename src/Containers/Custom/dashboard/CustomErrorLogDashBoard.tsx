import React, { useEffect } from 'react'
import Styled from "styled-components";
import CustomErrorLogItem from "../../../Components/Custom/dashboard/CustomErrorLogItem";
import getYoodongErrorDashboard from "../../../Api/custom/getYoodongErrorDashboard";
import { YOUDONG_ERROR_DASHBOARD } from "../../../Common/@types/youdong";
import { RotateSpinner } from "react-spinners-kit";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

const CustomErrorLogDashBoard: React.FunctionComponent = () => {
  const [ state, setState ] = React.useState<YOUDONG_ERROR_DASHBOARD[]>();
  const [ isFirstLoad, setIsFirstLoad ] = React.useState(true);

  useEffect(() => {
    const documentEvent: any = document

    documentEvent.body.style.zoom = .6;
    getData().then(() => console.log('load success'))
  }, [])

  React.useEffect(() => {
    const interval = setInterval(() => {
      getData().then(() => console.log('load success'))
    }, 30000)

    return () => {
      console.log('-- monitoring end -- ')
      clearTimeout(interval);
    }
  }, [ state ])

  const history = useHistory()

  const getData = async () => {
    try {
      const response = await getYoodongErrorDashboard()

      if (response !== null && response) {
        if (response.status === 401) {
          return history.push('/login?type=back')
        } else if (response.status === 200) {
          setIsFirstLoad(false)
          setState(response.data)
        }
      }
    } catch (error) {
      console.log('catched error', error)
    }
  }

  console.log('isFirstLoad', isFirstLoad)

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
          state && state.map((data: YOUDONG_ERROR_DASHBOARD) => <CustomErrorLogItem data={data}
                                                                                    key={data.press_code}/>)
        }
      </DashboardWrapDiv>
  )
}

const DashboardWrapDiv = Styled.div`
    width: 99%;
    height: 100vh;
    display: flex;
    margin-left: 24px;
    background-image: linear-gradient(to right, #202e4a 0%, #0f1722 100%);
`

export default CustomErrorLogDashBoard
