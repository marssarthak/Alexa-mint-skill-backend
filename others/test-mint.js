import { Currency } from '@tatumio/api-client'
import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: '9cc803a5-5b4b-45f3-9181-e2481aa80116', testnet: true })

nftMint()

export async function flowNftExample() {
  // Generate FLOW wallet
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateWallet
  const { mnemonic, xpub } = await flowSDK.wallet.generateWallet()

  // Generate address from xpub
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateAddress
  const { address: firstAddress } = await flowSDK.blockchain.generateAddress(xpub, 0)
  const { address: secondAddress } = await flowSDK.blockchain.generateAddress(xpub, 1)

  const account = firstAddress 
  // This account will receive NFT and burn it
  const secondAccount = secondAddress 

  console.log(`First account is ${account}`)
  console.log(`Second account is ${secondAccount}`)

  // Generate private key from mnemonic
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGeneratePubKeyPrivateKey
  const privateKey = await flowSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const secondPrivateKey = await flowSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1)

  // Deploy an NFT smart contract on the blockchain.
  // In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.
  // On FLOW you can deploy only once
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftDeployErc721
  const { txId } = (await flowSDK.nft.deployNFTSmartContract({
    chain: Currency.FLOW,
    account,
    // your private key of the address that has coins
    privateKey,
  })) 

  const transactionData = await flowSDK.blockchain.smartContractGetAddress(Currency.FLOW, txId)
  const contractAddress = transactionData.contractAddress 
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  console.log('')
  console.log(`${contractAddress} ${account} ${privateKey}`)

}


async function nftMint() {
  const contractAddress = `9da6f73f-f4e2-4d81-bb2a-4cbb6e06fe56`
  const account = `0xbeb95c3ebdf285d1`
  const privateKey =`cf9a146a5272054918a731f1250243b6823f443bdb0a29149c33d218bd8b5d95`
  const metadata = 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json'

  const nftMinted = (await flowSDK.nft.send.mintSignedTransaction({
    chain: Currency.FLOW,
    contractAddress,
    account,
    to: account,
    privateKey,
    // uploaded metadata from ipfs
    url: metadata,
  })) 

  console.log(`Minted nft with transaction ID: ${nftMinted.txId} and token ID: ${nftMinted.tokenId}`)
}
