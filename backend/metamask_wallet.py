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
    
