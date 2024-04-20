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
