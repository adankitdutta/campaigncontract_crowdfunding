const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const dotenv = require("dotenv").config();

const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  process.env.PHRASE,
  process.env.RINKEBYAPI
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from accounts from ", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to :", result.options.address);
};

deploy();
