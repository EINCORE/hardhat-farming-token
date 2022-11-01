const { network, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardharhat-config")
const { assert } = require("chai")

developmentChains.includes(network.name) ? describe.skip :
    describe("FarmToken", async function () {
        let farmToken
        let deployer
        const sendValue = ethers.utils.parseEther("0.07") // 1ETH
        beforeEach(async function () {
            deployer = (await getNamedAccounts()).deployer
            farmToken = await ethers.getContract("FarmToken", deployer)
        })

        it("allows people to fund and withdraw", async function () {
            await farmToken.fund({ value: sendValue })
            await farmToken.withdraw()
            const endingBalance = await farmToken.provider.getBalance(
                farmToken.address
            )
            assert.equal(endingBalance.toString(), "0")
        })
    })
