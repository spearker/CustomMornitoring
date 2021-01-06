export const SF_ADDRESS = window.location.hostname

const isLocalhost = () => {
    if (SF_ADDRESS === '192.168.0.53') {
        return '192.168.0.50'
    } else {
        return SF_ADDRESS
    }
}

export const SF_ENDPOINT = `http://${isLocalhost()}:8299`
export const SF_ENDPOINT_EXCEL = `http://${isLocalhost()}:8399`
export const SF_ENDPOINT_ADMIN = `http://${isLocalhost()}:8286/api`
export const SF_ENDPOINT_FILE = `http://${isLocalhost()}:8099`
