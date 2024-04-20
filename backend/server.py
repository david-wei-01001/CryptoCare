import requests
import json

def get_nonprofits_by_cause(cause, api_key):
    base_url = "https://partners.every.org/v0.2/browse/"
    nonprofits = []
    page = 1
    while True:
        response = requests.get(f"{base_url}{cause}?apiKey={api_key}&page={page}&take=100")
        data = response.json()
        nonprofits.extend(data['nonprofits'])
        if page >= data['pagination']['pages']:
            break
        page += 1
    return nonprofits

def search_nonprofits_by_name(name, api_key):
    url = f"https://api.every.org/v0.2/nonprofits/search?name={name}&apiKey={api_key}"
    response = requests.get(url)
    return response.json()['nonprofits']

def get_nonprofit_details_by_ein(ein, api_key):
    url = f"https://api.every.org/v0.2/nonprofits/{ein}/details?apiKey={api_key}"
    response = requests.get(url)
    return response.json()

def filter_nonprofits_by_minimum_donation(nonprofits, min_donation):
    return [np for np in nonprofits if np.get('minimum_donation', float('inf')) <= min_donation]

def main():
    api_key = 'pk_live_e1cb482a00c0af01ab77898dbb56fe87'  # Replace with your actual API key
    causes = ['animals', 'environment', 'health', 'education']  # Add more causes as needed
    all_nonprofits = []
    
    for cause in causes:
        print(f"Fetching nonprofits for cause: {cause}")
        nonprofits = get_nonprofits_by_cause(cause, api_key)
        all_nonprofits.extend(nonprofits)
        print(f"Found {len(nonprofits)} nonprofits for cause {cause}")

    print(f"Total nonprofits fetched: {len(all_nonprofits)}")
    
    # Save the data to a JSON file
    with open('nonprofits.json', 'w') as file:
        json.dump(all_nonprofits, file, indent=4)
    print("Data saved to nonprofits.json")

if __name__ == "__main__":
    main()
