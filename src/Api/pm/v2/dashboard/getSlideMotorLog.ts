import axios from 'axios'
import { getToken } from '../../../../Common/tokenFunctions'
import { TOKEN_NAME } from '../../../../Common/configset'
import { SF_ENDPOINT } from '../../../SF_endpoint'

export default async (id: string | number, date: string) => {

  try {
    const response = await axios.get(`${SF_ENDPOINT}/api/v1/dashboard/press/slide/histories/${id}/${date}`, {
      headers: {
        authorization: getToken(TOKEN_NAME)
      }
    })

    if (response.data.status === 200) {
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
    console.log(`${SF_ENDPOINT}/api/v1/dashboard/press/${id} API Error`, error)
    return null
  }
}
