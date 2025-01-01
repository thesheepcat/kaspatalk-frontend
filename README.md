# KaspaTalk frontend

You can run the frontend on a different machine than the one you are running the backend on.

## Activate the frontend from source code (on Linux Ubuntu/Mint)
- Get KaspaTalk up and running, following KaspaTalk backend repository instructions
- If you don't already have a private key and a testnet-11 address, download the genkeypair app from here https://github.com/kaspanet/kaspad/releases and run the following command:
  - ./genkeypair --testnet
- Save both information locally, for later
- Fund your address with a lot of small UTXOs (1 KAS each); every UTXO will be used to send a single message
- Open your terminal
- Git clone this repository
- Copy userSettings-example.js in the same folder and rename it to userSettings.js
- Open userSettings.js and modify USER_PRIVATE_KEY and BACKEND_NODE by adding your private key and the IP address of your machine running KaspaTalk backend
- Open the main folder and run the following commands to install all required dependecies:
  - npm install vite
  - npm install
- Activate the development server with the following command:
  - npm run dev
- On your Chrome/Chromium browser open http://localhost:5173/ 
- Starts the first conversation by cliking the "pen" button on the top of the sidepanel

**IMPORTANT**:
Always keep your browser "Developer mode" activated when using KaspaTalk frontend, in order to collect useful logs from the console