import Server from './server'
import Utils from './utils'
import axios from 'axios'
import setWidget from './widget'
import DefaultConfig from './config'
import MadmenContract from './md-contract'

const httpClient = axios.create()
httpClient.interceptors.response.use(response => response.status === 200 ? response.data : '')
const madmen = {
  cache: {},
  setWidget
}
let server
async function init (config = {}) {
  const { publisher, chainRpc = DefaultConfig.chainRpc, host = DefaultConfig.host, ipfs = DefaultConfig.ipfs, contract = DefaultConfig.contract } = config
  madmen.config = { publisher, chainRpc, host, ipfs, contract }
  madmen.contract = MadmenContract(contract, chainRpc)
  server = Server(host, madmen.config)
  await loadPlacement()
}
function convertUrl (url) {
  return Utils.toIpfsUrl(url, madmen.config.ipfs)
}

madmen.getAd = async function (placement) {
  if (this.cache[placement]) {
    return this.cache[placement]
  }
  const publisher = this.config.publisher
  const ad = await this.contract.fetchAd(publisher, placement)
  const campaign = ad.campaign.toNumber()
  let recommend
  if (!campaign && (recommend = await server.getRecommend(publisher, placement))) {
    return recommend
  }
  if (!campaign) {
    return madmen.placement[placement]
  }
  const meteUrl = convertUrl(ad.url)
  const info = await httpClient.get(meteUrl)
  info.url = convertUrl(info.url)
  info.metaUrl = meteUrl
  info.advertiser = ad.advertiser
  info.campaign = campaign
  info.creative = ad.creative.toNumber()
  info.placement = placement
  info.publisher = publisher
  this.cache[placement] = info
  server.explore(info)
  return info
}
async function loadPlacement () {
  madmen.placement = {}
  const ps = await madmen.contract.getPlacement(madmen.config.publisher)
  for (let i = 0; i < ps.length; i++) {
    const id = ps[i].id.toNumber()
    madmen.placement[id] = await httpClient.get(convertUrl(ps[i].url))
    madmen.placement[id].url = convertUrl(madmen.placement[id].url)
  }
}
madmen.adClick = function (placement) {
  server.explore(this.cache[placement], 'CLK')
}
export default async function (config) {
  if (!madmen.config) {
    await init(config)
  }
  return madmen
}
