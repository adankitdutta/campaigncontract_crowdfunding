import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xBAc18a99Cc5CbC0a428bD72B195bB91DdBcf1cD6"
);

export default instance;
