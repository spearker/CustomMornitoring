const company = localStorage.getItem('companyName')

const autoCustomType = () => {
  switch (company) {
    case '성화실업':
      return 'type_no_dashboard'
    default:
      return ''
  }
}

export default autoCustomType

