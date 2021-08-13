import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x8019eA0358D78c26b61EdBc0146Af2c6b6bD7383"
);

export default instance;
