export const SF_ADDRESS = window.location.hostname

export const isLocalhost = () => {
  if (SF_ADDRESS === 'localhost') {
    return '203.234.183.22'
  } else {
    return '183.102.217.178'
  }
}

export const SF_ENDPOINT = `http://${isLocalhost()}:8299`
export const SF_ENDPOINT_EXCEL = `http://${isLocalhost()}:8399`
export const SF_ENDPOINT_ADMIN = `http://${isLocalhost()}:8286/api`
export const SF_ENDPOINT_FILE = `http://${isLocalhost()}:8099`
export const SF_ENDPOINT_RESOURCE = `http://${isLocalhost()}:8285/`
