import Web3 from 'web3';

const web = new Web3('https://sepolia.infura.io/v3/f4f2f5cf43244fdf95f6bf89da328fbb');

// async function getMetamaskBalance() {
//   const balanceWei = await web.eth.getBalance('0xc94DEB32c46234b5fc313eD1D4C91c04d77C0218');
//   const balanceEth = web.utils.fromWei(balanceWei, 'ether');
//   console.log(balanceEth);
//   return balanceEth;
// }

async function transferEther() {
  const address1 = web.utils.toChecksumAddress('0xc94DEB32c46234b5fc313eD1D4C91c04d77C0218');
  const address2 = web.utils.toChecksumAddress('0xEFD1FB3DC9196B250E9CBD275D16D454da6F1FaA');

  const nonce = await web.eth.getTransactionCount(address1);

  const tx = {
    nonce: nonce,
    to: address2,
    value: web.utils.toWei('0.001', 'ether'),
    gas: 21000,
    gasPrice: web.utils.toWei('40', 'gwei')
  };

  const signedTx = await web.eth.accounts.signTransaction(tx, 'b5c6ee6f06e81579c7bd284b58af664d01be5ad85b1c882de1b50a81718ebaeb');

  const txReceipt = await web.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(txReceipt);
  return txReceipt.transactionHash;
}

const transferEth = () => {
    transferEther()
}

export default transferEth;