import { AES } from 'crypto-js'

const useEncrypt = (token) => {
  const encryptToken = (token) => {
    if (!token) {
      return ''
    }
    const encrypted = AES.encrypt(token, process.env.AES_SECRET_KEY).toString()
    return encrypted
  }

  const encrypted = encryptToken(token)

  return { encrypted, encoded: encodeURIComponent(encrypted) }
}

export default useEncrypt
