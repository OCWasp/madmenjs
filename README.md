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

// default contract is deployed on polygon mumbai testnet
config.contract = '0x95AaFBCc74bC2c427f83f06B0b97D3aFC901d3fe'  // optional
config.chainRpc = 'https://rpc-mumbai.matic.today'  // optional

const madmen = await Madmen(config)

const ad = await madmen.getAd(placementId)  // Get Ad information
or
const ad = await madmen.setWidget(placementId, container)  // Insert Ad element to container by element id
```


