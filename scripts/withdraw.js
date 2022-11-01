const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const farmToken = await ethers.getContract("FarmToken", deployer)
    console.log("Funding...")
    const transactionResponse = await farmToken.withdraw()
    await transactionResponse.wait(1)
    console.log("Got it back!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })