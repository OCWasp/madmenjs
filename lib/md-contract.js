import { ethers } from 'ethers'

const abi = [
  // 'function fetchAd(address publisher,uint placementId) view returns(tuple(address advertiser,uint campaign,uint creative,string url))',
  'function fetchAd(address publisher,uint placementId, uint random) view returns(tuple(address advertiser,uint campaign,uint creative,string url))',
  'function getPlacement(address publisher) view returns(tuple(uint id,string url,uint price)[])'
]

export default function (address, rpc) {
  const provider = new ethers.providers.JsonRpcProvider(rpc)
  return new ethers.Contract(address, abi, provider)
}
