import axios from 'axios'
import {getToken} from "../../Common/tokenFunctions";
import {TOKEN_NAME} from "../../Common/configset";
import {setToken} from "../../lib/tokenFunctions";
import {SF_ENDPOINT} from "../SF_endpoint";

export default async () => {
    try {
        const response = await axios.get(`${SF_ENDPOINT}/api/v1/dashboard/press/errorlog`, {
            headers: {
                authorization: getToken(TOKEN_NAME)
            }
        })


        if (response.data.status === 200) {
            if (response.data.token) {
                setToken(TOKEN_NAME, response.data.token)
            }

            return {
                data: response.data.results,
                status: response.data.status
            }
        } else {
            return {
                status: response.data.status
            }
        }

    } catch (error) {
        console.log(`${SF_ENDPOINT}/api/v1/dashboard/errorlog API Error`, error)
    }
}
