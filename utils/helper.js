export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function validateURL(url) {
  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  var regex = new RegExp(expression)
  return url.match(regex)
}

export function validatePhoneNumber(phoneNumber) {
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
  return re.test(phoneNumber)
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const downloadQR = () => {
  const canvas = document.getElementById('qrcode')
  const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  let downloadLink = document.createElement('a')
  downloadLink.href = pngUrl
  downloadLink.download = 'qrcode.png'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}
