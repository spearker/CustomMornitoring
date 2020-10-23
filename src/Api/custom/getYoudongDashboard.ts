import axios from 'axios'
import {getToken} from '../../Common/tokenFunctions'
import {TOKEN_NAME} from '../../Common/configset'

const ENDPOINT = 'http://203.234.183.22:8299'

export default async (id: string | number) => {
  try {
    console.info('innnnnnnnnnnnnn')
    const response = await axios.get(`${ENDPOINT}/api/v1/dashboard/press/${id}`, {
      headers: {
        authorization: getToken(TOKEN_NAME)
      }
    })

    console.info('response', response)

  } catch (error) {
    console.log('dashboard/press error to youdong', error)
  }
}
