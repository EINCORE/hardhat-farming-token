// import
// main function 
// calling of main function

// const { network } = require("hardhat")

// function deployFunc(hre) {
//     console.log("Hi!")
//     hre.getNamedAcoounts()
//     hre.deployments
// }
// module.exports.default = deployFunc()

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre

// const helperConfig = require("../helper-hardharhat-config")
// const networkConfig = helperConfig.networkConfig
const { networkConfig, developmentChains } = require("../helper-hardharhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // const address = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"

    // if chainId is X use address Y
    // if chainId is Z use address A

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // if the contract doesn't exist, we deploy a minimal version of 
    // for our local testing

    // well what happens when we want to change chains?
    // when going for localhost or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const farmToken = await deploy("FarmToken", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(farmToken.address, args)
    }
    log("-------------------------------------------------------")
}
module.exports.tags = ["all", "farmtoken"]