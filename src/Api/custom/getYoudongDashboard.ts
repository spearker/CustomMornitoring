import axios from 'axios'
import { getToken } from "../../Common/tokenFunctions";
import { TOKEN_NAME } from "../../Common/configset";
import { setToken } from "../../lib/tokenFunctions";

const ENDPOINT = 'http://203.234.183.22:8299'

export default async (id: string | number, init: boolean) => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/dashboard/press/${id}?init=${init}`, {
      headers: {
        authorization: getToken(TOKEN_NAME)
      }
    })

    console.log('response', response.data)


    if (response.data.status === 200) {
      if (response.data.token) {
        setToken(TOKEN_NAME, response.data.token)
      }

      return response.data.results
    } else {
      return null
    }

  } catch (error) {
    console.log(`${ENDPOINT}/api/v1/dashboard/press/${id} API Error`, error)
  }
}
