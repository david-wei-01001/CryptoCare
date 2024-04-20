import requests
from bitcoinlib.wallets import Wallet

def get_bitcoin_balance(address):
    # API for mainnet wallet
    api_url = f"https://blockstream.info/api/address/{address}/utxo"

    # API for testnet wallet
    # api_url = f"https://mempool.space/testnet/api/address/{address}/utxo"

    # Make the API call
    response = requests.get(api_url)

    total_balance = 0
    if response.status_code == 200:
        data = response.json()
        for utxo in data:
            total_balance += utxo["value"]
        # print(f"Total Balance: {total_balance} satoshis")
    else:
        print(f"Error: API request failed with status code {response.status_code}")

    return total_balance

def send_bitcoin(sender_wallet_name, recipient_address, amount):
    sender_wallet = Wallet(sender_wallet_name)
    # Convert BTC to satoshis
    amount_to_send_satoshis = int(amount * 100000000)
    # Create and sign transaction
    tx = sender_wallet.send_to(recipient_address, amount_to_send_satoshis)

    return tx

# print(get_bitcoin_balance("tb1p4s5766n3dartnljxqv0dta5ylcxtv7l4udxtletm0enayfqf99gsyk8263"))
