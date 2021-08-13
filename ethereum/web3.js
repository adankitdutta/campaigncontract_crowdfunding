import Web3 from "web3";
import { RINKEBYAPI } from "./CONSTANTS";

let web3;

function loadWeb3() {
  if (window.ethereum) {
    try {
      window.web3 = new Web3(window.ethereum);
      return window.web3;
    } catch (error) {
      if (error.code === 4001) {
        window.alert("Permission denied!");
      }
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    return window.web3;
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying out Metamask!"
    );
  }
}

if (typeof window !== "undefined") {
  web3 = loadWeb3();
} // server side
else {
  const provider = new Web3.providers.HttpProvider(RINKEBYAPI);
  web3 = new Web3(provider);
}

export default web3;
