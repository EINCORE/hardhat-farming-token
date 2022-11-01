const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const farmToken = await ethers.getContract("FarmToken", deployer)
    console.log("Funding Contract...")
    const transactionResponse = await farmToken.fund({
        value: ethers.utils.parseEther("0.07"),
    })
    await transactionResponse.wait(1)
    console.log("Funded!")
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error)
    process.exit(1)
})