from web3 import Web3

web3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/f4f2f5cf43244fdf95f6bf89da328fbb'))


def get_metamask_balance(account_id):
    balance_wei = web3.eth.get_balance(account_id)
    balance_eth = web3.from_wei(balance_wei, 'ether')
    return balance_eth

def transfer_eth(from_account, to_account, private_key, eth_amount):
    address1 = Web3.to_checksum_address(from_account)
    address2 = Web3.to_checksum_address(to_account)

    nonce = web3.eth.get_transaction_count(address1)

    tx = {
        'nonce': nonce,
        'to': address2,
        'value': web3.to_wei(eth_amount, 'ether'),
        'gas': 21000,
        'gasPrice': web3.to_wei(40, 'gwei')
    }

    signed_tx = web3.eth.account.sign_transaction(tx, private_key)

    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

    return tx_hash.hex()
    

# print("Metamask Balance: ", get_metamask_balance('0xc94DEB32c46234b5fc313eD1D4C91c04d77C0218'))
# print("Transaction Hash: ", transfer_eth('0xc94DEB32c46234b5fc313eD1D4C91c04d77C0218', '0xEFD1FB3DC9196B250E9CBD275D16D454da6F1FaA', 'b5c6ee6f06e81579c7bd284b58af664d01be5ad85b1c882de1b50a81718ebaeb', 0.001))