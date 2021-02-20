import {isLocalhost} from '../Api/SF_endpoint'

export const CompaniesThatLotOutsourcing = () => {
    switch (isLocalhost().toString()) {
        case '121.173.205.139':
        case '192.168.0.50':
            return true
        default:
            return false
    }
}

