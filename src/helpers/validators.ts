import owasp from 'owasp-password-strength-test'

const validators = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

  validateOWSPPassword: (password) => {
    const chkPassword = owasp.test(password)
    return (!((chkPassword.errors && chkPassword.errors.length) || !chkPassword.strong))
  }
}

export default validators