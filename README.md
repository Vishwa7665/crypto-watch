# Crypto Price Tracking Project

## Overview

This project is a real-time cryptocurrency price tracking application. It fetches price data for various cryptocurrencies from an external API, stores the data in a MongoDB database, and displays the most recent price information on the frontend using Next.js and Redux.

## Features

- Real-time tracking of cryptocurrency prices
- Data fetched every 5 seconds and stored in MongoDB
- Dynamic table displaying the most recent 20 price entries
- Dropdown for selecting different cryptocurrencies
- Error handling and user-friendly error messages

## Technologies Used

- **Frontend**: Next.js, TypeScript, Redux, CSS
- **Backend**: Node.js, TypeScript, Express.js
- **Database**: MongoDB
- **APIs**: LiveCoinWatch

## Project Structure

### Frontend

- **`app/`**: Contains the main pages of the application.
  - `page.tsx`: Main page displaying the cryptocurrency price table and dropdown.
- **`components/`**: Reusable React components.
  - `DropdownComponent.tsx`: Dropdown component for selecting cryptocurrencies.
  - `TableComponent.tsx`: Table component for displaying price data.
- **`app/global.css`**: Contains global CSS file and specific styles for component.

### Backend

- **`server/src`**: Contains server-side logic.
  - `utils/fetchPriceAndSaveCryptoData.ts`: Fetches cryptocurrency prices and saves them to MongoDB.
  - `controllers/cryptoDataController.ts`: API endpoint to fetch price data for a single cryptocurrency.
- **`dbmodels/`**: Contains database models.
  - `models.ts`: Defines the MongoDB schema for storing price data.
- **`src/server.ts`**: Main entry point for the Node.js server.

### Redux

- **`lib/store/`**: Contains Redux setup and configuration.
  - `store.ts`: Configures and creates the Redux store.
- **`store/features/`**: Contains Redux slice files for different features.
  - `crypto/cryptoSlice.ts`: Manages cryptocurrency data and symbol state.

## Getting Started

### Prerequisites

- Node.js - version 20.11.0
- npm     - version 10.2.4
- nextjs  - version 14.2.5
- MongoDB instance

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/vishwa7665/crypto-watch.git
    cd crypto-watch
    ```

2. Set up environment variables:

    Create a `.env` file in the server directory and add the following:

    ```env
        PORT =3001
        MONGODB_URL = "mongodb://localhost:27017/CryptoWatch"

        # API Credentials
        LIVECOINWATCH_ENDPOINT = "https://api.livecoinwatch.com/coins/map"
        LIVECOINWATCH_API_KEY = <your_api_livecoinwatch_api_key_here>
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    npm install #Installs concurrently module
    npm run install-all #Installs dependencies in both client and server
    npm run watch #Starts client and server concurrently
    ```
    OR (If above process is not working then try installing manually by below commands and also follow steps 4 and 5 )

    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

4. Start the backend server:

    ```bash
        cd server
        npm run dev
    ```

5. Start the Next.js frontend:

    ```bash
        cd ../client
        npm run dev
    ```

### Usage

- Visit `http://localhost:3000` in your browser to access the application.
- Use the dropdown to select different cryptocurrencies and view their price data in real-time.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [LiveCoinWatch API](https://www.livecoinwatch.com/tools/api)
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Documentation](https://redux.js.org/)
