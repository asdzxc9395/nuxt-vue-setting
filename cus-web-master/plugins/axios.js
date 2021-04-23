export default function ({$axios, redirect, store}) {
  $axios.onRequest(config => {
    const accessToken = config.headers.common['Authorization']
    if (accessToken != undefined) {
      if (accessToken.indexOf('Bearer undefined') !== -1) {
        config.headers.common['Authorization'] = `${store.state.tokenVal}`
      }
    }
    config.headers.common['Accept'] = 'application/json'
    config.headers.common['Content-Type'] = 'application/json'
    return config
  })

  $axios.onResponse(response => {
    return response.data
  })

  $axios.onError(error => {
    console.error('onError', error)
    return Promise.reject({
      status: parseInt(error.response && error.response.status),
      code: error.response ? error.response.data.code : error.response.data.status,
      message: error.response ? error.response.data.message : error.response.data.error
    })
  })
}
