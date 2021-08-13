import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xF8d1d330DCF660B30C9aE2c3E15C2d38c3f609F3"
);

export default instance;
