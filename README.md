# madmenjs
> https://madmen.app

## Install the dependencies
```bash
npm install madmenjs
```

### Usage
```
import Madmen from 'madmenjs'
....

const config = { publisher:'0x....'}

// default contract is deployed on polygon mainnet
config.contract = '0xDB4f1986b9eE542bEE65A2F4E3E6F854774e7aA7'  // optional
config.chainRpc = 'https://rpc-mumbai.matic.today'  // optional

const madmen = await Madmen(config)

const ad = await madmen.getAd(placementId)  // Get Ad information
or
const ad = await madmen.setWidget(placementId, container)  // Insert Ad element to container by element id
```


