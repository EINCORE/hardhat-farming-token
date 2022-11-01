const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardharhat-config")


!developmentChains.includes(network.name) ? describe.skip :
    describe("FarmToken", async function () {
        let farmToken
        let deployer
        let mockV3Aggregator
        const sendValue = ethers.utils.parseEther("0.07") // 1 ETH
        beforeEach(async function () {
            // deploy our farmtoken contract
            // using Hardhat-deploy
            // const accounts = await ethers.getSigner()
            // const accountZero = accounts[0]
            deployer = (await getNamedAccounts()).deployer
            await deployments.fixture(["all"])
            farmToken = await ethers.getContract("FarmToken", deployer)
            mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
        })

        describe("constructor", async function () {
            it("sets the aggregator addresses correctly", async function () {
                const response = await farmToken.getPriceFeed()
                assert.equal(response, mockV3Aggregator.address)
            })
        })

        describe("fund", async function () {
            it("Fails if you don't send enough ETH", async function () {
                await expect(farmToken.fund()).to.be.revertedWith("You need to spend more ETH!")
            })
            it("Updates the amount funded data structure", async () => {
                await farmToken.fund({ value: sendValue })
                const response = await farmToken.getAddressToAmountFunded(deployer)
                assert.equal(response.toString(), sendValue.toString())
            })
            it("Adds funder to array of getFunder", async function () {
                await farmToken.fund({ value: sendValue })
                const funder = await farmToken.getFunder(0)
                assert.equal(funder, deployer)
            })
        })
        describe("withdraw", async function () {
            beforeEach(async function () {
                await farmToken.fund({ value: sendValue })
            })

            it("Withdraw ETH from a single founder", async function () {
                // Arrange
                const startingFarmTokenBalance = await farmToken.provider.getBalance(farmToken.address)
                const startingDeployerBalance = await farmToken.provider.getBalance(deployer)
                // Act
                const transactionResponse = await farmToken.withdraw()
                const transactionReceipt = await transactionResponse.wait(1)
                const { gasUsed, effectiveGasPrice } = transactionReceipt
                const gasCost = gasUsed.mul(effectiveGasPrice)

                const endingFarmTokenBalance = await farmToken.provider.getBalance(farmToken.address)
                const endingDeployerBalance = await farmToken.provider.getBalance(deployer)
                // Assert
                assert.equal(endingFarmTokenBalance, 0)
                assert.equal(startingFarmTokenBalance.add(startingDeployerBalance), endingDeployerBalance.add(gasCost).toString())
            })
            it("allows us to withdraw with multiple getFunder", async function () {
                const accounts = await ethers.getSigners()
                for (let i = 1; i < 6; i++) {
                    const farmTokenConnectedContract = await farmToken.connect(accounts[i])
                    await farmTokenConnectedContract.fund({ value: sendValue })
                }
                const startingFarmTokenBalance = await farmToken.provider.getBalance(farmToken.address)
                const startingDeployerBalance = await farmToken.provider.getBalance(deployer)

                const transactionResponse = await farmToken.withdraw()
                const transactionReceipt = await transactionResponse.wait(1)
                const { gasUsed, effectiveGasPrice } = transactionReceipt
                const gasCost = gasUsed.mul(effectiveGasPrice)

                const endingFarmTokenBalance = await farmToken.provider.getBalance(farmToken.address)
                const endingDeployerBalance = await farmToken.provider.getBalance(deployer)
                // Assert
                assert.equal(endingFarmTokenBalance, 0)
                assert.equal(startingFarmTokenBalance.add(startingDeployerBalance), endingDeployerBalance.add(gasCost).toString())

                await expect(farmToken.getFunder(0)).to.be.reverted

                for (i = 1; i < 6; i++) {
                    assert.equal(await farmToken.getAddressToAmountFunded(accounts[i].address), 0)
                }
            })

            it("Only allows the owner to withdraw", async function () {
                const accounts = await ethers.getSigners()
                const farmTokenConnectedContract = await farmToken.connect(accounts[1])
                await expect(farmTokenConnectedContract.withdraw()).to.be.revertedWithCustomError(farmToken, "FarmToken__NotOwner")
            })
            it("cheaperWithdraw testing...", async function () {
                const accounts = await ethers.getSigners()
                for (let i = 1; i < 6; i++) {
                    const farmTokenConnectedContract = await farmToken.connect(accounts[i])
                    await farmTokenConnectedContract.fund({ value: sendValue })
                }
                const startingFarmTokenBalance = await farmToken.provider.getBalance(farmToken.address)
                const startingDeployerBalance = await farmToken.provider.getBalance(deployer)

                const transactionResponse = await farmToken.cheaperWithdraw()
                const transactionReceipt = await transactionResponse.wait(1)
                const { gasUsed, effectiveGasPrice } = transactionReceipt
                const gasCost = gasUsed.mul(effectiveGasPrice)

                const endingFarmTokenBalance = await farmToken.provider.getBalance(farmToken.address)
                const endingDeployerBalance = await farmToken.provider.getBalance(deployer)
                // Assert
                assert.equal(endingFarmTokenBalance, 0)
                assert.equal(startingFarmTokenBalance.add(startingDeployerBalance), endingDeployerBalance.add(gasCost).toString())

                await expect(farmToken.getFunder(0)).to.be.reverted

                for (i = 1; i < 6; i++) {
                    assert.equal(await farmToken.getAddressToAmountFunded(accounts[i].address), 0)
                }
            })
            it("Withdraw ETH from a single founder", async function () {
                // Arrange
                const startingFarmTokenBalance = await farmToken.provider.getBalance(farmToken.address)
                const startingDeployerBalance = await farmToken.provider.getBalance(deployer)
                // Act
                const transactionResponse = await farmToken.cheaperWithdraw()
                const transactionReceipt = await transactionResponse.wait(1)
                const { gasUsed, effectiveGasPrice } = transactionReceipt
                const gasCost = gasUsed.mul(effectiveGasPrice)

                const endingFarmTokenBalance = await farmToken.provider.getBalance(farmToken.address)
                const endingDeployerBalance = await farmToken.provider.getBalance(deployer)
                // Assert
                assert.equal(endingFarmTokenBalance, 0)
                assert.equal(startingFarmTokenBalance.add(startingDeployerBalance), endingDeployerBalance.add(gasCost).toString())
            })
        })
    })