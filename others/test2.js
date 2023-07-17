import Moralis from "moralis"

formURI("https://images.bannerbear.com/direct/E56OLrMKW0GMwl3oQj/requests/000/040/103/626/VA54EW2ZqQrX4x4PzegGPNXJl/b79c7f5883ed4a4c5c3f5909c6ddaf2fd888b981.png")

async function formURI(url) {
    await Moralis.start({
        apiKey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjZiNTdmMzlkLWYxY2QtNGRmMS1hNDFjLTM1ZWZiMmRmMWFlNiIsIm9yZ0lkIjoiMzQ4NjA4IiwidXNlcklkIjoiMzU4MzIyIiwidHlwZUlkIjoiM2JjOGQxNDYtY2ZhNS00ZTc5LTg3NWMtOGZhNTlhMGNkMGQyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODk1ODQwODcsImV4cCI6NDg0NTM0NDA4N30.dCAe9U6mtebq1wnUPQXgB_wQ3mvh7qYLep7fGeuw7Ec",
    });

    const uploadArray = [
        {
            path: "favResturants.json",
            content: {
                cover: url,
            },
        },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    const uri = response.result[0].path;

    console.log(uri);
}