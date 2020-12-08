import client from '../configs/basic'

/**
 * postBarcode()
 * 바코드 포스트 메소드 관리
 * @param {string} url 링크 주소
 * @param object
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const postBarcode = async (url: string, object: object) => {
  const temp: IServerData = await client.post(url, object)

  if (temp) {
    return temp.status
  }
}

/**
 * getBarcode()
 * 바코드 겟 메소드 관리
 * @param {string} url 링크 주소
 * @returns {object} data object
 * @author 정민
 * @version 0.1
 */
export const getKPIData = async (url: string) => {
  const temp: { result: any } = await client.get(url)

  if (temp) {
    return temp.result
  }
}


export const API_URLS = {
  kpi: {
    production: {
      facility_operational_improvement_rate: '/v1/kpi/production/facility-operational-improvement-rate',
      item_growth_rate: '/v1/kpi/production/item-growth-rate',
      target_attainment_rate: '/v1/kpi/production/target-attainment-rate',
    }
  },
}
