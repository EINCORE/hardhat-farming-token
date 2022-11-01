const { network } = require("hardhat")
const { developmentChains, DECIMALS, ININTIAL_ANSWER } = require("../helper-hardharhat-config")

// const DECIMALS = 8

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const chainId = network.config.chainId
    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, ININTIAL_ANSWER],
        })
        log("Mocks deployed!")
        log("-------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]