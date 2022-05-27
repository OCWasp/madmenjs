export default {
  toIpfsUrl (url, gateway) {
    gateway = gateway.endsWith('/') ? gateway : `${gateway}/`
    return !url ? '' : url.replace(/^ipfs:\/\//, gateway)
  }
}
