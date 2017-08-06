const forge = require('node-forge');
const ApnsCertificate = require('../../build/src/index').ApnsCertificate;

function stripBase64Mime (base64) {
  return base64.substr(base64.indexOf(',') + 1, base64.length)
}

window.fileChangeEvent = function (files) {
  let reader = new FileReader()
  reader.onload = () => {
    try {
      const settings = new ApnsCertificate(
        stripBase64Mime(reader.result),
        prompt('Does the certificate require a password?')
      )

      Object.keys(settings).forEach(key => {
        const elm = document.getElementById(key);
        if (elm) {
          elm.value = JSON.stringify(settings[key]);
        }
      })

    } catch (err) {
      alert(err.message)
    }
  }

  reader.readAsDataURL(files[0])
}