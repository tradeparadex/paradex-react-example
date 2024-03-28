import { useState } from "react";
import { ethers } from "ethers";
import * as Paradex from "@paradex/sdk";

import "./App.css";

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

function App() {
  const [address, setAddress] = useState("");

  async function handleClick() {
    // 1. Fetch Paradex config for the relevant environment
    const config = await Paradex.Config.fetchConfig("testnet"); // "testnet" | "mainnet"

    // 2. Get ethers signer (example with injected provider)
    const ethersProvider = new ethers.BrowserProvider(window.ethereum!);
    const ethersSigner = await ethersProvider.getSigner();

    // 3. Create Ethereum signer based on ethers signer
    const signer = Paradex.Signer.ethersSignerAdapter(ethersSigner);

    // 4. Initialize the account with config and Ethereum signer
    const account = await Paradex.Account.fromEthSigner({ config, signer });

    setAddress(account.address);
  }

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <div style={{ margin: "auto" }}>
        <button onClick={handleClick}>Request Paradex Account address</button>
      </div>
      <div>{address}</div>
    </div>
  );
}

export default App;
