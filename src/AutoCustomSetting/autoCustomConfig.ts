import {isLocalhost} from '../Api/SF_endpoint'

const autoCustomType = () => {
  switch (isLocalhost().toString()) {
    case '203.234.183.22':
      return 'test_server'
    case '121.173.205.139':
      return 'jaewoo_material_trans'
    case '121.172.236.236':
      return 'seonghwa_material_trans'
    case '106.248.33.213':
      return 'seain_material_trans'
    case '192.168.0.149':
      return 'DS_trans'
    case '115.93.129.149':
    case '125.136.36.66':
      return 'siheung'
    case '218.156.8.206':
    case '211.223.65.225':
    case '61.37.146.196':
      return 'gj_all_trans'
    case '175.207.144.234':
      return 'hwain_trans'
    case '222.100.89.245':
    case '183.102.217.178':
      return 'jaeil_js_trans'
    case '192.168.0.8':
    case '125.138.147.11':
    case '222.98.3.154':
    case '106.240.250.74':
    case '210.183.2.208':
      return 'jb_material_trans'
    case '221.165.109.93':
      return 'teoul_trans'
    case '210.113.232.249':
      return 'atech_trans'
    case '115.22.101.32':
      return 'hangil_trans'
    case '211.228.163.231':
      return 'jeonghyun_trans'
    case '121.150.81.201':
      return 'daekwang_trans'
    case '106.252.226.157':
      return 'daeheung_trans'
    default:
      return ''
  }
}

export default autoCustomType

