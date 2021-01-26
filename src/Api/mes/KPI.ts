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
  const temp: { results: any } = await client.get(url)

  if (temp) {
    return temp.results
  }
}


export const API_URLS = {
  kpi: {
    production: {
      facility_operational_improvement_rate: '/v1/kpi/production/facility-operational-improvement-rate',
      manufacturing_leadTime_reduced_rate: '/v1/kpi/production/manufacturing-leadTime-reduced-rate',
      item_growth_rate: '/v1/kpi/production/item-growth-rate',
      target_attainment_rate: '/v1/kpi/production/target-attainment-rate',
      average_production_per_hour: '/v1/kpi/production/average-production-per-hour'
    },
    delivery: {
      delivery_compliance_improvement_rate: '/v1/kpi/delivery/delivery-compliance-improvement-rate',
      order_shipment_leadTime_reduced_rate: '/v1/kpi/delivery/order-shipment-leadTime-reduced-rate',
      stock_accuracy_improvement_rate: '/v1/kpi/delivery/stock-accuracy-improvement-rate',
    },
    quality: {
      defective_items_reduced_rate: '/v1/kpi/quality/defective-items-reduced-rate',
    },
    energy: {
      electric_saving_rate: '/v1/kpi/energy/electric-saving-rate'
    },
    cost: {
      // amount_of_on_process_material: '/v1/kpi/cost/amount-of-on-process-material',
      // stock_cost: '/v1/kpi/cost/stock-cost'
      disposal_costs_of_defective_material: '/v1/kpi/cost/disposal-costs-of-defective-material',
      production_cost_of_goods: '/v1/kpi/cost/production-cost-of-goods'
    }
  },
}
