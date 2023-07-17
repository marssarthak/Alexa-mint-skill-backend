// uid();
simulator();

async function simulator() {
    let name = "Buri Buri Zaemon"
    let username = "zaemonburiburi"
    let tweetText = "Just testing"
    await generate(name, username, tweetText);
}

async function generate(name, username, tweetText) {
    let API_KEY = "bb_pr_c6914195408fb22fb74576c7c2b07f";
    let YOUR_TEMPLATE_ID = "gdeyVMZOG0m2Z4QmW6";
    let pfp = "https://s4.anilist.co/file/anilistcdn/character/large/b33701-038IQUdpkIYC.jpg";

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
                text: username,
                color: null,
                background: null,
            },
            {
                name: "tweet",
                text: tweetText,
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

    console.log(url);
}

// async function uid(uidX) {
//     let API_KEY = "bb_pr_c6914195408fb22fb74576c7c2b07f";
//     let uid = "P0ev7XDZrzq2NxD46MjR9og8N";

//     let img = fetch(`https://api.bannerbear.com/v2/images/${uidX}`, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${API_KEY}`,
//         },
//     });

//     let res = await img;
//     let res2 = await res.json();

//     // console.log(res2);
//     let url = res2.image_url_png;

//     console.log(url);
// }
