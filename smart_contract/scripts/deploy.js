
const main = async () => {
  const transactionFactory = await hre.ethers.getContractFactory('Transactions')
  const transactionContract = await transactionFactory.deploy()

  await transactionContract.deployed()

  console.log('Transaction deployed to: ', transactionContract.address)
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
