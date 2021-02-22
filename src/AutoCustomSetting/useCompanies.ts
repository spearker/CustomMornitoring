import {isLocalhost} from '../Api/SF_endpoint'

export const CompaniesThatLotOutsourcing = () => {
    switch (isLocalhost().toString()) {
        case '121.173.205.139':
            return true
        default:
            return false
    }
}

export const CompaniesThatUseLot = () => {
    switch (isLocalhost().toString()) {
        case '121.173.205.139':
            return true
        default:
            return false
    }
}

