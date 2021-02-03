import React, {useEffect} from 'react'
import {DASHBOARD} from '../../../Common/@types/youdong'
import getYoodongPressList from '../../../Api/custom/getYoodongPressList'
import {useHistory} from 'react-router-dom'
import CustomDashboardLoadtonChart from '../../../Components/Custom/dashboard/CustomDashboardLoadtonChart'
import CustomErrorLogDashBoard from './CustomErrorLogDashBoard'
import CustomAnalysisDashboardLoadtonChart
    from '../../../Components/Custom/dashboard/CustomAnalysisDashboardLoadtonChart'
import CustomAnalysisDashboardPressStatus
    from '../../../Components/Custom/dashboard/CustomAnalysisDashboardPressStatus'
import autoCustomType from "../../../AutoCustomSetting/autoCustomConfig";

const CustomRotateDashboard: React.FunctionComponent = () => {
    const history = useHistory()
    const [dashChange, setDashChange] = React.useState<boolean>(false)
    const [pressList, setPressList] = React.useState<string[]>([])
    const [totalDashboard, setTotalDashboard] = React.useState<number>(-1)
    const [currentDashboard, setCurrentDashboard] = React.useState<number>(0)
    const [isFirst, setisFirst] = React.useState<({
        loading: boolean
        api: boolean
    })>({
        loading: true,
        api: true
    })

    const getPressList = async () => {
        const response = await getYoodongPressList()

        if (response !== null && response) {
            if (response.status === 401) {
                return history.push('/login?type=back')
            } else if (response.status === 200) {

                const pressCode = response.data.map((pressInfo: DASHBOARD) => {
                    return pressInfo.pk.split('machine')[1]
                })
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
                setisFirst({
                    loading: true,
                    api: true
                })
                setCurrentDashboard(currentDashboard + 1)
            }
        }, autoCustomType() === 'hwain_trans' ? 5000 : 30000)

        return () => clearInterval(rotatePage)

    }, [currentDashboard])

    return (
        <div>
            {currentDashboard === totalDashboard ?
                <CustomErrorLogDashBoard/>
                :
                (pressList[currentDashboard] === undefined ?
                        null
                        :
                        (autoCustomType() === 'hwain_trans' ?
                                (
                                    dashChange ?
                                        <CustomAnalysisDashboardPressStatus id={pressList[currentDashboard]}
                                                                            first={isFirst}
                                                                            check={dashChange}
                                                                            onChange={() => setDashChange(false)}
                                        />
                                        :
                                        <CustomAnalysisDashboardLoadtonChart id={pressList[currentDashboard]}
                                                                             first={isFirst}
                                                                             check={dashChange}
                                                                             onChange={() => setDashChange(true)}
                                        />
                                )
                                :
                                <CustomAnalysisDashboardLoadtonChart id={pressList[currentDashboard]}
                                                                     first={isFirst}
                                />
                        )
                )
            }
        </div>
    )

}

export default CustomRotateDashboard

