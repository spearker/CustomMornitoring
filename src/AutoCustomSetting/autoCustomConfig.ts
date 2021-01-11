import {SF_ADDRESS} from '../Api/SF_endpoint'

const autoCustomType = () => {
  switch (SF_ADDRESS.toString()) {
    case '121.173.205.139':
      return 'jaewoo_material_trans'
    case '106.248.33.213':
      return 'seain_material_trans'
    case '192.168.0.149':
      return 'DS_trans'
    case '218.156.8.206':
    case '125.136.36.66':
    case '211.223.65.225':
    case '115.93.129.149':
    case '61.37.146.196':
      return 'gj_all_trans'
    default:
      return ''
  }
}

export default autoCustomType

