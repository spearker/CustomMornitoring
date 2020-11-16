import React, {useEffect} from "react";
import {DASHBOARD} from "../../../Common/@types/youdong";
import getYoodongPressList from "../../../Api/custom/getYoodongPressList";
import {useHistory} from "react-router-dom";
import CustomDashboardLoadtonChart from "../../../Components/Custom/dashboard/CustomDashboardLoadtonChart";
import CustomErrorLogDashBoard from "./CustomErrorLogDashBoard";


const CustomRotateDashboard: React.FunctionComponent = () => {
    const history = useHistory()
    const [pressList, setPressList] = React.useState<string[]>([])
    const [totalDashboard, setTotalDashboard] = React.useState<number>(-1)
    const [currentDashboard, setCurrentDashboard] = React.useState<number>(0)

    const getPressList = async () => {
        const response = await getYoodongPressList()

        if (response !== null && response) {
            if (response.status === 401) {
                return history.push('/login?type=back')
            } else if (response.status === 200) {

                const pressCode = response.data.map((pressInfo: DASHBOARD) => {
                    return pressInfo.pk.split('machine')[1]
                })
                console.log(pressCode)
                setPressList(pressCode)
                setTotalDashboard(response.data.length)
            }
        }
    }

    useEffect(() => {
        getPressList()
    }, [])

    useEffect(() => {
        const rotatePage = setInterval(() => {
            if (currentDashboard === totalDashboard) {
                setCurrentDashboard(0)
            } else {
                setCurrentDashboard(currentDashboard + 1)
            }
        }, 180000)

        return () => clearInterval(rotatePage);

    }, [currentDashboard])

    return (
        <div>
            {currentDashboard === totalDashboard ?
                <CustomErrorLogDashBoard/>
                :
                (pressList[currentDashboard] === undefined ?
                        null
                        :
                        <CustomDashboardLoadtonChart id={pressList[currentDashboard]}/>
                )
            }
        </div>
    )

}

export default CustomRotateDashboard
