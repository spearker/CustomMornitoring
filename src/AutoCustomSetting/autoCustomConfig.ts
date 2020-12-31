import {SF_ADDRESS} from '../Api/SF_endpoint'

const autoCustomType = () => {
    switch (SF_ADDRESS.toString()) {
        case '121.173.205.139':
            return 'jaewoo_material_trans'
        case '106.248.33.213':
            return 'seain_material_trans'
        case '192.168.0.149':
            return 'DS_trans'
        default:
            return ''
    }
}

export default autoCustomType
