import logo from './res/logo.png'
import './res/style.css'

const defaultRatio = [600, 360]

export default async function (pid, eid, cover) {
  const container = document.getElementById(eid)
  if (!container) {
    return
  }
  container.innerHTML = ''
  const placement = this.placement[pid]
  const ratio = !placement.ratio ? defaultRatio : placement.ratio.split(/[xX\\*]/, 2)
  const ad = await this.getAd(pid)
  const div = createMainDiv(container, ad, cover)
  addTopRightLogo(div)
  if (ratio.length > 1 && ratio[0] / ratio[1] < 3) {
    addBottom(div, ad)
  }
  ad.isDefault = !ad.campaign
  return ad
}
function createMainDiv (container, ad, cover) {
  const div = document.createElement('div')
  div.setAttribute('class', 'md-main')
  div.style.backgroundSize = cover ? 'cover' : 'contain'
  div.style.backgroundImage = `url("${ad.url}")`
  div.onclick = () => window.open(ad.adLink, '_blank')
  container.append(div)
  return div
}
function addBottom (div, ad) {
  const bottom = document.createElement('div')
  bottom.setAttribute('class', 'md-bottom')
  const title = document.createElement('div')
  title.setAttribute('class', 'md-title')
  title.innerText = ad.title
  bottom.append(title)
  div.append(bottom)
  if (!ad.description) {
    return
  }
  const desc = document.createElement('div')
  bottom.append(desc)
  desc.innerText = ad.description
  desc.setAttribute('class', 'md-desc')
}
function addTopRightLogo (div) {
  const topRight = document.createElement('div')
  topRight.setAttribute('class', 'md-top-right')
  topRight.style.backgroundImage = `url("${logo}")`
  topRight.onclick = event => {
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true
    window.open('https://madmen.app', '_blank')
  }
  div.append(topRight)
}
