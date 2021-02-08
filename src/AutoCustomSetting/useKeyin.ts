import {isLocalhost} from '../Api/SF_endpoint'

export const CompaniesThatUseKeyin = () => {
    switch (isLocalhost().toString()) {
        case '175.207.144.234':
        case '121.173.205.139':
        case '221.165.109.93':
        case '210.113.232.249':
        case '211.228.163.231':
        case '121.150.81.201':
        case '106.252.226.157':
        case '115.22.101.32':
            return true
        default:
            return false
    }
}

export default CompaniesThatUseKeyin
