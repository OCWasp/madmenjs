import axios from 'axios'
import Utils from './utils'

export default function server (baseURL, config) {
  const client = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    responseType: 'json'
  })
  client.interceptors.response.use(response => response.status === 200 ? response.data : '')
  return {
    async getRecommend (publisher, placement) {
      try{
        const res = await client.get('/md/ppr', { params: { publisher, placement } })
        if (!res.data || !res.data.url) {
          return null;
        }
        res.data.url = Utils.toIpfsUrl(res.data.url, config.ipfs)
        res.data.type = 'IMAGE'
        return res.data
      }catch (e) {
        return null
      }
    },
    explore (ad, type = 'PV') {
      if (!ad) {
        return
      }
      const { publisher, advertiser, campaign, creative, placement } = ad
      client.post('/exp', {
        publisher,
        advertiser,
        campaign,
        creative,
        creativeName: ad.title,
        placement,
        type
      }).then(res => {}).catch(res => console.error(res))
    }
  }
}
