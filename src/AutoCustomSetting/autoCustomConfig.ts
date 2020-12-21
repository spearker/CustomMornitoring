import {SF_ADDRESS} from '../Api/SF_endpoint'

const autoCustomType = () => {
  switch (SF_ADDRESS.toString()) {
    case '121.172.236.236':
      return 'type_no_dashboard'
    case '121.173.205.139':
      return 'jaewoo_material_trans'
    case '106.248.33.213':
      return 'seain_material_trans'
    default:
      return ''
  }
}

export default autoCustomType

