import { uploadToIPFS, formURI } from "./getURI.js";
import { sendEmail } from "./sendEmail.js";

import { generateFlowWallet } from "@tatumio/tatum";
import { Currency, generateAddressFromXPub } from "@tatumio/tatum";
import { deployNFT, mintNFTWithUri } from "@tatumio/tatum";

mintNFT();

const apiKey = `9cc803a5-5b4b-45f3-9181-e2481aa80116`;
const mnemonic =
    "fabric recipe physical attend foam also inspire swear risk outside monkey palm mutual park civil peasant virtual angle curve tennis follow gym put transfer";
const privateKey = `460eba9fa43188fd4a81a5092e85d7aed73195a4bdba9a2dacf68ce84c538c32`;

async function createNFTSimulator() {
    const prompt =
        "This life is so beautiful, it just depends upon the perspective";
    const email = "anshsaxena4190@gmail.com";
    await mintNFT(prompt, email);
}

async function getXPub() {
    const apiKey = `9cc803a5-5b4b-45f3-9181-e2481aa80116`;
    const resp = await fetch(`https://api.tatum.io/v3/flow/wallet`, {
        method: "GET",
        headers: {
            "x-api-key": `${apiKey}`,
        },
    });

    const data = await resp.text();
    console.log(data);
    return data.xpub;
}

async function getPrivateKey() {
    const apiKey = `9cc803a5-5b4b-45f3-9181-e2481aa80116`;
    const mnemonic =
        "fabric recipe physical attend foam also inspire swear risk outside monkey palm mutual park civil peasant virtual angle curve tennis follow gym put transfer";

    const resp = await fetch(`https://api.tatum.io/v3/flow/wallet/priv`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": `${apiKey}`,
        },
        body: JSON.stringify({
            index: 1,
            mnemonic: `${mnemonic}`,
        }),
    });

    const data = await resp.text();
    console.log(data);
}

async function deploy(privKey, acc) {
    const apiKey = `9cc803a5-5b4b-45f3-9181-e2481aa80116`;

    const resp = await fetch(`https://api.tatum.io/v3/nft/deploy/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": `${apiKey}`,
        },
        body: JSON.stringify({
            "chain": "FLOW",
            "privateKey": `${privKey}`,
            "account": `${acc}`
        }),
    });

    const data = await resp.text();
    console.log(data);
}


async function mintNFT() {
    const mnemonic =
        "fabric recipe physical attend foam also inspire swear risk outside monkey palm mutual park civil peasant virtual angle curve tennis follow gym put transfer";
    const privateKey = `460eba9fa43188fd4a81a5092e85d7aed73195a4bdba9a2dacf68ce84c538c32`;

    const wallet = await generateFlowWallet(mnemonic);
    const account = await generateAddressFromXPub(
        Currency.FLOW,
        false,
        wallet.xpub,
        1
    );

    deploy(privateKey, account)

    console.log(account);
    console.log("hey");
}
