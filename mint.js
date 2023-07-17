import { Currency } from "@tatumio/api-client";
import { TatumFlowSDK } from "@tatumio/flow";
import Moralis from "moralis";
import dotenv from "dotenv";
dotenv.config();

runSimulator();

async function runSimulator() {
    const name = "Damn Boi";
    const emailId = `check@xyz`;
    const prompt = `hehe`;

    await mintSimulator(name, emailId, prompt);
}

const TatumApi = process.env["TATUM_API"];

const flowSDK = TatumFlowSDK({
    apiKey: TatumApi,
    testnet: true,
});

export async function mintSimulator(name, emailId, prompt) {
    const imageUrl = await createImage(name, prompt, emailId);
    console.log(imageUrl);
    const uri = await formURI(imageUrl);
    console.log(uri);
    const txHash = await nftMint(uri);
    console.log(txHash);
    // await sendMail(emailId, url, txHash)
}

async function sendMail(emailId, url, txHash) {
    let txUrl = `https://testnet.flowscan.org/transaction/${txHash}`

    let body = `There's a new NFT in your hand.
    Check transaction hash : ${txUrl}
    ${url}`;
    // send mail
}

async function nftMint(metadata) {
    const contractAddress = process.env["TATUM_CONTRACT_ADDRESS"];
    const account = process.env["TATUM_ACCOUNT"];
    const privateKey = process.env["TATUM_PRIVATE_KEY"];

    const nftMinted = await flowSDK.nft.send.mintSignedTransaction({
        chain: Currency.FLOW,
        contractAddress,
        account,
        to: account,
        privateKey,
        url: metadata,
    });

    console.log(
        `Minted nft with transaction ID: ${nftMinted.txId} and token ID: ${nftMinted.tokenId}`
    );

    return nftMinted.txId;
}

async function formURI(url) {
    const MoralisApi = process.env["MORALIS_API"];

    await Moralis.start({
        apiKey: MoralisApi,
    });

    const uploadArray = [
        {
            path: "prompts.json",
            content: {
                image: url,
            },
        },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    const uri = response.result[0].path;
    // console.log(uri);

    return uri;
}

async function createImage(name, emailId, prompt) {
    const BannerBearApi = process.env["BANNERBEAR_API"];
    const templateId = process.env["BANNERBEAR_TEMPLATE_ID"];
    const pfp = process.env["PFP_IMAGE"];

    let data = {
        template: templateId,
        modifications: [
            {
                name: "background",
                color: null,
            },
            {
                name: "tweet_background",
                color: null,
            },
            {
                name: "avatar",
                image_url: pfp,
            },
            {
                name: "name",
                text: name,
                color: null,
                background: null,
            },
            {
                name: "username",
                text: emailId,
                color: null,
                background: null,
            },
            {
                name: "tweet",
                text: prompt,
                color: null,
                background: null,
            },
        ],
        webhook_url: null,
        transparent: false,
        metadata: null,
    };

    let imageData = await fetch("https://api.bannerbear.com/v2/images", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BannerBearApi}`,
        },
    });

    let res1 = await imageData.json();

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2500);

    let img = fetch(`https://api.bannerbear.com/v2/images/${res1.uid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${BannerBearApi}`,
        },
    });

    let res = await img;
    let res2 = await res.json();

    let url = res2.image_url_png;
    // console.log(url);

    return url;
}
