# GETTING STARTED
### Requirements

* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
   * You'll know you did it right if you can run git --version and you see a response like git version x.x.x

* [Nodejs](https://nodejs.org/en/)
    * You'll know you've installed nodejs right if you can run:
       * node --version and get an ouput like: vx.x.x

* [yarn](https://yarnpkg.com/getting-started/install) instead of npm
    * You'll know you've installed yarn right if you can run:
        * yarn --version and get an output like: x.x.x
        * You might need to [install it with npm](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) or corepack

### Quickstart
```
git clone https://github.com/EINCORE/hardhat-farming-token.git
yarn
```
### Usage
```
yarn hardhat deploy
```
### Testing 
```
yarn hardhat test
```
### Testing Coverage
```
yarn hardhat coverage
```

## Deployment to a testnet or mainnet
1. Setup environment variables

You'll want to set your GOERLI_RPC_URL and PRIVATE_KEY as environment variables. You can add them to a .env file, similar to what you see in .env.example.

* PRIVATE_KEY: The private key of your account [(like from metamask)](https://metamask.io/). NOTE: FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
    * [You can learn how to export it here.](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)
* GOERLI_RPC_URL: This is url of the goerli testnet node you're working with. You can get setup with one for free from [Alchemy](https://www.alchemy.com/)

2. Get testnet ETH
Head over to [faucets.chain.link](https://faucets.chain.link/) and get some tesnet ETH. You should see the ETH show up in your metamask.

3. Deploy
``` 
yarn hardhat deploy --network goerli
```

### Scripts
After deploy to a testnet or local net, you can run the scripts.
```
yarn hardhat run scripts/fund.js
```
Or
```
yarn hardhat run scripts/withdraw.js
```
### Estimate Gas
You can estimate how much gas things cost by running:
```
yarn hardhat test
```
And you'll see and output file called gas-report.txt

### Estimate gas cost in USD

To get a USD estimation of gas cost, you'll need a COINMARKETCAP_API_KEY environment variable. You can get one for free from [CoinMarketCap](https://pro.coinmarketcap.com/signup).

Then, uncomment the line coinmarketcap: COINMARKETCAP_API_KEY, in hardhat.config.js to get the USD estimation. Just note, everytime you run your tests it will use an API call, so it might make sense to have using coinmarketcap disabled until you need it. You can disable it by just commenting the line back out.

### Verify on etherscan 

If you deploy to a testnet or mainnet, you can verify it if you get an [API](https://etherscan.io/login?cmd=last) Key from Etherscan and set it as an environemnt variable named ETHERSCAN_API_KEY. You can pop it into your .env file as seen in the .env.example.

In it's current state, if you have your api key set, it will auto verify goerli contracts!

However, you can manual verify with:

```
yarn hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

### Linting 

To check linting / code formatting:

```
yarn lint
```
Or Fix
```
yarn lint:fix
```

### Formating 
```
yarn format
```

### Thank You 

If you appreciated this, feel free to follow me or donate!

ETH/Polygon/Avalanche/etc Address: 0x2834C5B18e9f99E092bdA22c685350A5199eacE5



![[Twitter](https://twitter.com/ein_punk)](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo)

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo/t.me/+PY48IVqpvfxiZjBh)
](https://t.me/+PY48IVqpvfxiZjBh)