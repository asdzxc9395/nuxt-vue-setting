export function errorHandlers(error) {
  console.error('errorHandlers', error)
  const status = error.status
  const code = error.code
  const message = error.message

  if (!status) {
    return $nuxt.$emit('on-alert', {text: $nuxt.$t('dialog.alert.network')})
  } else if (status === 400) {
    return $nuxt.$emit('on-alert', {text: $nuxt.$t('dialog.alert.required')})
  } else if (status === 500 && code.indexOf('T') !== -1
    || status === 401 && code.indexOf('T') !== -1) {
    return $nuxt.$emit('on-alerts', {
      text: message,
      isOkNg: false,
      action: () => {
        $nuxt.$store.dispatch('LOGOUT').then(() => {
          $nuxt.$auth.logout()
          window.location.href = '/login'
        })
      },
    })
  }

  return $nuxt.$emit('on-alert', {text: message})
}
