import { Currency } from "@tatumio/api-client";
import { TatumFlowSDK } from "@tatumio/flow";
import Moralis from "moralis";

runSimulator();

async function runSimulator() {
    const name = "Damn Boi";
    const emailId = `check@xyz`;
    const prompt = `hehe`;

    await mintSimulator(name, emailId, prompt);
}

const flowSDK = TatumFlowSDK({
    apiKey: "9cc803a5-5b4b-45f3-9181-e2481aa80116",
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
    // send mail
    let body = `There's a new NFT in your hand.
                Check transaction hash : ${txHash}
                ${url}`;
}

async function nftMint(metadata) {
    const contractAddress = `9da6f73f-f4e2-4d81-bb2a-4cbb6e06fe56`;
    const account = `0xbeb95c3ebdf285d1`;
    const privateKey = `cf9a146a5272054918a731f1250243b6823f443bdb0a29149c33d218bd8b5d95`;

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
    await Moralis.start({
        apiKey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjZiNTdmMzlkLWYxY2QtNGRmMS1hNDFjLTM1ZWZiMmRmMWFlNiIsIm9yZ0lkIjoiMzQ4NjA4IiwidXNlcklkIjoiMzU4MzIyIiwidHlwZUlkIjoiM2JjOGQxNDYtY2ZhNS00ZTc5LTg3NWMtOGZhNTlhMGNkMGQyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODk1ODQwODcsImV4cCI6NDg0NTM0NDA4N30.dCAe9U6mtebq1wnUPQXgB_wQ3mvh7qYLep7fGeuw7Ec",
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
    let API_KEY = "bb_pr_7e5eb0cc69e41cc610d3896a3d76fb";
    let YOUR_TEMPLATE_ID = "E9YaWrZM2dVw5nRd74";
    let pfp =
        "https://s4.anilist.co/file/anilistcdn/character/large/b33701-038IQUdpkIYC.jpg";

    let data = {
        template: YOUR_TEMPLATE_ID,
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
            Authorization: `Bearer ${API_KEY}`,
        },
    });

    let res1 = await imageData.json();
    // console.log(res1)

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2500);

    let img = fetch(`https://api.bannerbear.com/v2/images/${res1.uid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    });

    let res = await img;
    let res2 = await res.json();

    let url = res2.image_url_png;
    // console.log(url);

    return url;
}
